/* ============================================================================
   R&B Estimate Builder — Google login + user profile + cloud saved estimates
   ----------------------------------------------------------------------------
   SETUP: neeche FB_CONFIG me apne Firebase project ki values paste karo.
   Jab tak placeholder hai, app bilkul pehle jaisa (offline, bina login) chalega.
   ========================================================================== */

const FB_CONFIG = {
  apiKey:            "AIzaSyB5F-DZISs1YKoCxsMNncXQdbIz-B_S08g",
  authDomain:        "rnb-estimation.firebaseapp.com",
  projectId:         "rnb-estimation",
  storageBucket:     "rnb-estimation.firebasestorage.app",
  messagingSenderId: "615247682343",
  appId:             "1:615247682343:web:ed6c3a0df93e1888182702"
};

/* admin — inko sab users ki estimates dikhengi (Firestore rules me bhi yahi email) */
const OWNER_EMAIL = '112ce0489@gmail.com';

const POSTS = [
  'Executive Engineer',
  'Deputy Executive Engineer',
  'Additional Assistant Engineer',
  'Assistant Engineer',
  'Deputy Engineer',
  'Work Assistant',
  'Technical Assistant',
  'Other'
];

/* global — app.js isko signature block ke liye padhta hai */
window.userProfile = store.get('rnb_profile', null);

(function(){
  const configured = !String(FB_CONFIG.apiKey).startsWith('PASTE');
  const loginBox   = $('#loginBox');
  const profBox    = $('#profileBox');
  const userChip   = $('#userChip');

  if(!configured){
    if(loginBox) loginBox.style.display = 'none';
    console.warn('[auth] FB_CONFIG abhi bhara nahi hai — login band, app offline mode me chal raha hai.');
    applyProfile(window.userProfile);          // purana profile ho to laagu kar do
    return;
  }
  if(typeof firebase === 'undefined'){
    console.warn('[auth] Firebase SDK load nahi hua — offline mode.');
    if(loginBox) loginBox.style.display = 'none';
    return;
  }

  let pushed = {};                       // id -> updated stamp already sent
  let timer  = null;

  firebase.initializeApp(FB_CONFIG);
  const auth = firebase.auth();
  const db   = firebase.firestore();
  let me = null;

  /* app ko tab tak dhaka do jab tak login na ho */
  const showLogin = () => { if(loginBox) loginBox.style.display = 'flex'; };
  const hideLogin = () => { if(loginBox) loginBox.style.display = 'none'; };
  showLogin();

  /* ------------------------------ sign in / out ------------------------------ */
  const gBtn = $('#btnGoogle');
  if(gBtn) gBtn.onclick = () => {
    const p = new firebase.auth.GoogleAuthProvider();
    p.setCustomParameters({ prompt: 'select_account' });
    $('#loginErr').textContent = '';
    auth.signInWithPopup(p).catch(err => {
      $('#loginErr').textContent = 'Login nahi hua: ' + (err && err.code ? err.code : err);
    });
  };
  const oBtn = $('#btnSignOut');
  if(oBtn) oBtn.onclick = () => {
    if(!confirm('Sign out karna hai? Local estimates device par rahengi.')) return;
    auth.signOut();
  };

  /* is browser ka local data kis account ka hai */
  const OWNER_KEY = 'rnb_saved_uid';

  function wipeLocalForOtherUser(){
    savedEstimates = [];
    currentSavedId = null;
    pushed = {};
    store.set('rnb_saved', savedEstimates);
    store.set('rnb_profile', null);
    window.userProfile = null;
    est = { mode:'', rateSource:'', road:'', roadList:[], workDescList:[],
            prepBy:'', chkBy:'', qc:1, lc:0, lines:[] };
    save();
    office = { ...OFFICE_DEFAULT };
    store.set('rnb_office', office);
    try{
      const d = $('#divName'), s = $('#subDivName'), g = $('#genDesc'), r = $('#roadInput'),
            p = $('#prepBy'), c = $('#chkBy');
      if(d) d.value = office.div; if(s) s.value = office.sub; if(g) g.value = office.desc;
      if(r) r.value = ''; if(p) p.value = ''; if(c) c.value = '';
      if(typeof renderItemBlocks === 'function') renderItemBlocks();
      if(typeof renderPreview    === 'function') renderPreview();
      if(typeof renderSavedTable === 'function') renderSavedTable();
      if(typeof refreshWorkName  === 'function') refreshWorkName();
    }catch(e){}
  }

  auth.onAuthStateChanged(async u => {
    me = u;
    if(!u){ hideChip(); showLogin(); return; }
    hideLogin();

    /* account switch — pichhle user ka koi bhi data is browser me nahi rehna chahiye */
    const prevUid = store.get(OWNER_KEY, null);
    if(prevUid && prevUid !== u.uid) wipeLocalForOtherUser();
    store.set(OWNER_KEY, u.uid);
    let prof = null;
    try{
      const snap = await db.collection('users').doc(u.uid).get();
      if(snap.exists) prof = snap.data();
    }catch(e){ console.warn('[auth] profile read fail', e); }

    if(!prof || !prof.name || !prof.post){ openProfile(u, prof); }
    else { setProfile(prof); await pullCloud(); }
  });

  /* ------------------------------ profile form ------------------------------ */
  function openProfile(u, prof){
    if(!profBox) return;
    $('#pfName').value = (prof && prof.name) || u.displayName || '';
    $('#pfSub').value  = (prof && prof.sub)  || office.sub || '';
    $('#pfDiv').value  = (prof && prof.div)  || office.div || '';
    const sel = $('#pfPost');
    sel.innerHTML = '<option value="">— Post chuno —</option>' +
      POSTS.map(p => `<option${(prof && prof.post) === p ? ' selected' : ''}>${esc(p)}</option>`).join('');
    $('#pfErr').textContent = '';
    profBox.style.display = 'flex';
  }

  const pfSave = $('#pfSave');
  if(pfSave) pfSave.onclick = async () => {
    const p = {
      name:  $('#pfName').value.trim(),
      post:  $('#pfPost').value.trim(),
      sub:   $('#pfSub').value.trim(),
      div:   $('#pfDiv').value.trim(),
      email: me ? me.email : '',
      uid:   me ? me.uid : '',
      updated: new Date().toISOString()
    };
    if(!p.name || !p.post || !p.sub || !p.div){
      $('#pfErr').textContent = 'Chaaro field bharna zaroori hai.'; return;
    }
    $('#pfErr').textContent = 'Save ho raha hai…';
    try{
      await db.collection('users').doc(me.uid).set(p, { merge:true });
      profBox.style.display = 'none';
      setProfile(p);
      await pullCloud();
      toast('Profile save ho gaya — ' + p.name);
    }catch(e){
      $('#pfErr').textContent = 'Save nahi hua: ' + (e && e.code ? e.code : e);
    }
  };
  const pfEdit = $('#btnEditProfile');
  if(pfEdit) pfEdit.onclick = () => { if(me) openProfile(me, window.userProfile); };

  function setProfile(p){
    window.userProfile = p;
    store.set('rnb_profile', p);
    applyProfile(p);
    showChip(p);
  }

  function showChip(p){
    if(!userChip) return;
    userChip.style.display = 'flex';
    $('#chipName').textContent = p.name;
    $('#chipPost').textContent = p.post;
  }
  function hideChip(){ if(userChip) userChip.style.display = 'none'; }

  /* --------------------------- cloud <-> local sync --------------------------- */
  const col = () => db.collection('users').doc(me.uid).collection('estimates');

  async function pullCloud(){
    if(!me) return;
    try{
      const snap = await col().get();
      let added = 0;
      snap.forEach(d => {
        const c = d.data();
        if(!c || !c.id) return;
        pushed[c.id] = c.updated;
        const local = savedEstimates.find(s => s.id === c.id);
        if(!local){ savedEstimates.push(c); added++; }
        else if((c.updated || '') > (local.updated || '')){ Object.assign(local, c); added++; }
      });
      savedEstimates.sort((a,b) => String(b.updated||'').localeCompare(String(a.updated||'')));
      store.set('rnb_saved', savedEstimates);
      if(typeof renderSavedTable === 'function') renderSavedTable();
      if(added) toast(added + ' estimate cloud se aayi.');
      pushCloud();                        // local-only wali cloud par bhej do
    }catch(e){ console.warn('[sync] pull fail', e); }
  }

  async function pushCloud(){
    if(!me) return;
    try{
      const here = new Set();
      for(const s of savedEstimates){
        here.add(s.id);
        if(pushed[s.id] !== s.updated){
          await col().doc(s.id).set(JSON.parse(JSON.stringify(s)));
          pushed[s.id] = s.updated;
        }
      }
      for(const id of Object.keys(pushed)){
        if(!here.has(id)){ await col().doc(id).delete(); delete pushed[id]; }
      }
      const dot = $('#syncDot');
      if(dot){ dot.textContent = '☁ synced'; setTimeout(() => { dot.textContent = '☁'; }, 2500); }
    }catch(e){ console.warn('[sync] push fail', e); }
  }

  /* app.js har save/delete ke baad persistSaved() bulata hai — usme cloud push jod do */
  const _persist = window.persistSaved;
  window.persistSaved = function(){
    _persist();
    if(!me) return;
    clearTimeout(timer);
    timer = setTimeout(pushCloud, 1200);
  };
})();

/* profile ko app ke office/prepBy me laagu karo */
function applyProfile(p){
  if(!p) return;
  if(p.div){ office.div = p.div; }
  if(p.sub){ office.sub = p.sub; }
  store.set('rnb_office', office);
  const dEl = $('#divName'), sEl = $('#subDivName');
  if(dEl) dEl.value = office.div;
  if(sEl) sEl.value = office.sub;
  if(p.name && !est.prepBy){
    est.prepBy = p.name;
    const pb = $('#prepBy'); if(pb) pb.value = p.name;
    save();
  }
}

/* Excel + PDF signature block — logged-in user ke hisaab se */
function signBlock(){
  const p = window.userProfile;
  if(p && p.post && p.sub) return [p.post, p.sub, ''];
  return ['Deputy Executive Engineer', 'R&B Sub Division', 'Dahod'];
}
