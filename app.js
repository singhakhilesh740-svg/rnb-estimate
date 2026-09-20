/* R&B Dahod — Estimate Builder */

/* ------------------------------- storage ------------------------------- */
const mem = {};
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : (k in mem ? mem[k] : d); }
             catch(e){ return (k in mem) ? mem[k] : d; } },
  set(k, v){ mem[k] = v; try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

const OFFICE_DEFAULT = {
  div: 'Dahod ( R&B ) Division, Dahod',
  sub: 'R&B  sub Divison , Dahod',
  desc: 'Varius Roads under Dahod Sub Division,  Dist. Dahod are importent Roads which is joining Talukas & NHAI.  Before monsoon season in selected length road surface is washout hence paver patta / patchwork is required. So, Estimate is Prepared on basis of current SOR of Dahod  District & Non SOR item are supported with detailed rate analysis.'
};
/* ------------------------------- division scoping -------------------------------
   Har data item apni division ka hota hai. Jo purana data bina div ke hai wo
   Dahod ka maana jata hai. User apni profile me jo division bharega, usi
   division ka data use dikhega. */
const HOME_DIV = 'Dahod';
const DIV_STOP = new Set(['r','b','rb','rnb','and','division','divison','sub','office','of','the','dept',
                          'department','roads','buildings','road','building','state','gujarat','circle']);
function divKey(s){
  const out = [];
  String(s || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).forEach(w => {
    if(w && !DIV_STOP.has(w) && !out.includes(w)) out.push(w);
  });
  return out.join('-');
}
function myDiv(){
  const p = window.userProfile;
  return (p && p.div) || (typeof office !== 'undefined' && office.div) || HOME_DIV;
}
const myDivKey = () => divKey(myDiv()) || divKey(HOME_DIV);
/* item is division ka hai? (bina div wala purana data = Dahod) */
const divOK = it => divKey(it && it.div ? it.div : HOME_DIV) === myDivKey();

const FRAMED = 'Estimate framed in the office of the Executive Engineer, Dahod (R&B ) Division , Dahod , for the probale expenses that will be incurred in  ';

/* seed data versions — bump when data.js seeds change, to force-refresh stale localStorage */
const SEED_VERSIONS = { buildings: 4, sor: 3, divisions: 1 };
function seedGet(key, seedName, seed){
  const verKey = 'rnb_seedver_' + seedName;
  const savedVer = store.get(verKey, 0);
  const wanted = SEED_VERSIONS[seedName];
  const stored = store.get(key, null);
  // If seed version changed OR nothing stored, (re)load from seed
  if(savedVer !== wanted || stored === null){
    store.set(verKey, wanted);
    if(seed){ store.set(key, seed); return seed.map(x => (typeof x === 'object' ? {...x} : x)); }
  }
  return stored;
}

let roads     = store.get('rnb_roads', null)     || ROADS_SEED.slice();
let items     = store.get('rnb_items', null)     || ITEMS_SEED.slice();
/* top-up: naye seed items (jo stored list me nahi hai) add karo — user ke edits safe rehte hain */
(function topUpItems(){
  try{
    const k = it => (it.cat || '') + '||' + (it.itemNo || '');
    const have = new Set(items.map(k));
    const add = ITEMS_SEED.filter(it => !have.has(k(it)));
    if(add.length){ items = items.concat(add.map(x => ({...x}))); store.set('rnb_items', items); }
  }catch(e){}
})();
/* SOR list: naya seed aane par sirf seed-items refresh hote hain —
   user ke khud ke jode hue items delete nahi hote */
let sorItems = (function(){
  const SEED = (typeof SOR_SEED !== 'undefined') ? SOR_SEED : [];
  const stored = store.get('rnb_sor_items', null);
  const ver = store.get('rnb_seedver_sor', 0);
  if(!stored || !stored.length){
    store.set('rnb_seedver_sor', SEED_VERSIONS.sor);
    store.set('rnb_sor_items', SEED);
    return SEED.map(x => ({...x}));
  }
  if(ver !== SEED_VERSIONS.sor){
    const map = new Map(SEED.map(it => [String(it.itemNo || '').trim(), it]));
    const seen = new Set();
    const merged = stored.map(it => {
      const k = String(it.itemNo || '').trim();
      const s = map.get(k);
      if(!s) return it;                       // user ka apna item — waisa hi rehne do
      seen.add(k);
      return {...it, desc: s.desc, rate: s.rate, unit: s.unit, cat: s.cat};
    });
    SEED.forEach(it => { const k = String(it.itemNo || '').trim(); if(!seen.has(k)) merged.push({...it}); });
    store.set('rnb_seedver_sor', SEED_VERSIONS.sor);
    store.set('rnb_sor_items', merged);
    return merged;
  }
  return stored;
})();
let buildings = seedGet('rnb_buildings', 'buildings', typeof BUILDINGS_SEED !== 'undefined' ? BUILDINGS_SEED : []);
let workDescs = store.get('rnb_workdescs', null) || (typeof WORKDESCS_SEED !== 'undefined' ? WORKDESCS_SEED.map(x=>({...x})) : []);
let people    = store.get('rnb_people', null)    || (typeof PEOPLE_SEED !== 'undefined' ? PEOPLE_SEED.slice() : []);
/* ---- divisions & sub divisions master list (dropdown ke liye) ---- */
let divisions = seedGet('rnb_divisions', 'divisions',
                        typeof DIVISIONS_SEED !== 'undefined' ? DIVISIONS_SEED : []);
function divSubs(name){
  const k = divKey(name);
  const d = divisions.find(x => divKey(x.div) === k);
  return d && Array.isArray(d.subs) ? d.subs.slice() : [];
}
/* user ne 'Other' me jo type kiya wo list me jod do — agli baar dropdown me aa jayega */
function addDivision(divName, subName){
  if(!divName) return;
  const k = divKey(divName);
  let d = divisions.find(x => divKey(x.div) === k);
  if(!d){ d = { div: divName.trim(), subs: [] }; divisions.push(d); }
  if(subName && !d.subs.some(s => divKey(s) === divKey(subName))) d.subs.push(subName.trim());
  divisions.sort((a,b) => a.div.localeCompare(b.div));
  store.set('rnb_divisions', divisions);
}

let office    = store.get('rnb_office', null)     || {...OFFICE_DEFAULT};
let est       = store.get('rnb_est', null) ||
             { mode:'', rateSource:'', road:'', roadList:[], workDesc:'', prepBy:'', chkBy:'', qc:1, lc:0, gst:0, lines:[] };
if(est.mode === undefined) est.mode = '';
if(est.rateSource === undefined) est.rateSource = '';
if(est.gst === undefined) est.gst = 0;
if(est.lc  === undefined) est.lc  = 0;
/* migrate old single-road fields → roadList array */
if(!Array.isArray(est.roadList)) est.roadList = [];
if(est.roadList.length === 0 && est.mode === 'road' && (est.road || est.roadKm || est.wcFrom || est.wcTo)){
  est.roadList = [{ name: est.road || '', km: est.roadKm || '', wcFrom: est.wcFrom || '', wcTo: est.wcTo || '' }];
}
/* migrate single workDesc string → workDescList array (multiple work descriptions) */
if(!Array.isArray(est.workDescList)){
  est.workDescList = (est.workDesc && est.workDesc.trim()) ? [est.workDesc.trim()] : [];
}
/* one-time: users who set a mode before the Based→Mode wizard existed get asked once */
if(!store.get('rnb_wizard_seen', false)){
  store.set('rnb_wizard_seen', true);
  est.rateSource = '';   // clear so the gate opens at the Based step on this load
}
let catFilter = '';
let dataItemsCat = '';   // Data tab: which ARC category is currently shown in items table

/* ------------------------------- mode config ------------------------------- */
const MODE = {
  road: {
    label:'Road', nameLabel:'Road name',
    namePh:'Type any word — Jhalod, Limkheda, SH.62, Sanjeli…',
    cats:['Hotmix / Road works','Jungle cutting & Geru','Road Furniture'], list:()=>roads.filter(divOK)
  },
  building: {
    label:'Building', nameLabel:'Building / Work name',
    namePh:'Type building / work location…',
    cats:['Resi / Non-Resi Building'], list:()=>buildings.filter(divOK)
  }
};

/* ------------------------------- helpers ------------------------------- */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const n   = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };
const r2  = v => Math.round((v + Number.EPSILON) * 100) / 100;
const fmt = v => (v || 0).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
const fmt0= v => (v || 0).toLocaleString('en-IN', {maximumFractionDigits:0});
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(m){ const t = $('#toast'); t.textContent = m; t.style.display='block';
  clearTimeout(t._t); t._t = setTimeout(()=> t.style.display='none', 2800); }
function save(){
  store.set('rnb_est', est);
  /* if a parent project is active, keep the active sub's slot in sync so
     Excel/PDF builds always see the latest edits */
  if(window.project && Array.isArray(window.project.subs) && window.project.subs.length &&
     window.project.subs[window.project.active]){
    window.project.subs[window.project.active].est = JSON.parse(JSON.stringify(est));
    store.set('rnb_project', window.project);
  }
}

/* ------------------------------- mode gate (2-step wizard) ------------------------------- */
function openGate(step){
  $('#modeGate').classList.add('open');
  showGateStep(step || 'based');
}
function closeGate(){ $('#modeGate').classList.remove('open'); }
function showGateStep(s){
  $('#gateStepBased').hidden = s !== 'based';
  $('#gateStepMode').hidden  = s !== 'mode';
}
function setBased(rs){
  est.rateSource = rs; save();
  applyRateSourceUI();
  showGateStep('mode');
}
function setMode(m){
  est.mode = m; save(); closeGate(); applyModeUI();
  toast(MODE[m].label + ' estimate (' + (rsKey()==='sor'?'SOR + RA':'ARC') + ')');
}
$$('#gateStepBased .opt').forEach(b => b.onclick = () => setBased(b.dataset.based));
$$('#gateStepMode .opt').forEach(b => b.onclick = () => setMode(b.dataset.mode));
$('#gateBack').onclick = () => showGateStep('based');
$('#btnMode').onclick = () => openGate('based');   // "Change" = full wizard from Based step

function applyModeUI(){
  const m = MODE[est.mode];
  $('#modeLbl').textContent = m ? m.label : '—';
  $('#roadInputLbl').textContent = m ? m.nameLabel : 'Name';
  $('#roadInput').placeholder = m ? m.namePh : '';
  $('#roadsCardTitle').textContent = 'Road list';
  $('#buildingsCardTitle').textContent = 'Building list';
  const showRoad = est.mode === 'road';
  $$('.road-only').forEach(el => el.style.display = showRoad ? '' : 'none');
  $$('.building-only').forEach(el => el.hidden = showRoad);
  if(showRoad){
    if(!est.roadList || !est.roadList.length) est.roadList = [{ name:'', km:'', wcFrom:'', wcTo:'' }];
    renderRoadEntries();
    renderWorkDescEntries();
  }
  applyRateSourceUI();
  renderCatChips();
  refreshWorkName();
}

/* ---- multi-road entries (road mode) ---- */
function fillRoadsDatalist(){
  const dl = $('#roadsDatalist');
  if(!dl) return;
  dl.innerHTML = roads.map(r => `<option value="${esc(r.name)}"></option>`).join('');
}
function renderRoadEntries(){
  const box = $('#roadEntries');
  if(!box) return;
  fillRoadsDatalist();
  box.innerHTML = est.roadList.map((r, i) => `
    <div class="road-entry">
      <div class="re-head">
        <span class="re-num">Road ${i + 1}</span>
        ${est.roadList.length > 1 ? `<button class="btn danger" style="padding:3px 9px" data-rrm="${i}">Remove</button>` : ''}
      </div>
      <div class="re-grid">
        <div>
          <label style="margin-bottom:3px">Road name</label>
          <input list="roadsDatalist" data-rk="name" data-ri="${i}" value="${esc(r.name || '')}"
                 placeholder="Jhalod, Limkheda, SH.62…" autocomplete="off">
        </div>
        <div>
          <label style="margin-bottom:3px">Km</label>
          <input class="mono" data-rk="km" data-ri="${i}" value="${esc(r.km || '')}" placeholder="0/0-8/700">
        </div>
        <div>
          <label style="margin-bottom:3px">Chainage from</label>
          <input class="mono" data-rk="wcFrom" data-ri="${i}" value="${esc(r.wcFrom || '')}" placeholder="7/700">
        </div>
        <div>
          <label style="margin-bottom:3px">Chainage to</label>
          <input class="mono" data-rk="wcTo" data-ri="${i}" value="${esc(r.wcTo || '')}" placeholder="8/00">
        </div>
      </div>
    </div>`).join('');
  box.querySelectorAll('input[data-rk]').forEach(inp => inp.oninput = e => {
    const i = +e.target.dataset.ri, k = e.target.dataset.rk;
    est.roadList[i][k] = e.target.value;
    // keep est.road in sync with first road (used for filenames / guards)
    est.road = (est.roadList[0] && est.roadList[0].name) || '';
    save(); refreshWorkName();
  });
  box.querySelectorAll('[data-rrm]').forEach(b => b.onclick = () => {
    est.roadList.splice(+b.dataset.rrm, 1);
    if(!est.roadList.length) est.roadList = [{ name:'', km:'', wcFrom:'', wcTo:'' }];
    est.road = (est.roadList[0] && est.roadList[0].name) || '';
    save(); renderRoadEntries(); refreshWorkName();
  });
}

/* ---- multiple work descriptions (road mode) ---- */
function fillWorkDescDatalist(){
  const dl = $('#workDescDatalist');
  if(!dl) return;
  const opts = workDescs.filter(w => w.text && (w.type === est.mode || w.type === 'both'));
  dl.innerHTML = opts.map(w => `<option value="${esc(w.text)}"></option>`).join('');
}
function renderWorkDescEntries(){
  const box = $('#workDescEntries');
  if(!box) return;
  if(!est.workDescList || !est.workDescList.length) est.workDescList = [''];
  fillWorkDescDatalist();
  const ph = (rsKey() === 'arc')
    ? 'Choose or type — Providing SDBC Paver Patta…'
    : 'Type work description for this estimate…';
  box.innerHTML = est.workDescList.map((d, i) => `
    <div class="wd-entry">
      <input list="workDescDatalist" data-wdi="${i}" value="${esc(d || '')}" placeholder="${esc(ph)}" autocomplete="off">
      ${est.workDescList.length > 1 ? `<button class="btn danger" style="padding:5px 10px" data-wdrm="${i}">×</button>` : ''}
    </div>`).join('');
  box.querySelectorAll('input[data-wdi]').forEach(inp => inp.oninput = e => {
    est.workDescList[+e.target.dataset.wdi] = e.target.value;
    save(); refreshWorkName();
  });
  box.querySelectorAll('[data-wdrm]').forEach(b => b.onclick = () => {
    est.workDescList.splice(+b.dataset.wdrm, 1);
    if(!est.workDescList.length) est.workDescList = [''];
    save(); renderWorkDescEntries(); refreshWorkName();
  });
}

function applyRateSourceUI(){
  const rs = rsKey();
  const bl = $('#basedLbl');
  if(bl) bl.textContent = rs === 'sor' ? 'SOR + RA' : 'ARC';
  $$('#rateSrcChips .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.rs === rs));
  const isArc = rs === 'arc';
  if(est.rateSource === 'ra'){ est.rateSource = 'sor'; save(); }   // legacy estimates
  $$('.arc-only').forEach(el => el.hidden = !isArc);
  $$('.sor-only').forEach(el => el.hidden = isArc);
  // re-render work description entries (placeholder/datalist depend on mode)
  if(est.mode === 'road') renderWorkDescEntries();
  // Update item combo placeholder + hint
  const inp = $('#itemInput');
  if(inp){
    inp.placeholder = rs === 'sor'
                   ? 'Search SOR + Rate Analysis — code, chapter, description, RA topic…'
                   : 'Search any word — SDBC, wetmix, hotmix, WMM, GSB, tack coat…';
  }
  const cc = $('#catChips');
  if(cc){ cc.innerHTML = ''; if(isArc) renderCatChips(); else if(rs === 'sor') renderChapChips(); }
  if(typeof refreshRAExportBtns === 'function') refreshRAExportBtns();
}

/* RA annexure export buttons — visible only when the estimate uses RA items */
function refreshRAExportBtns(){
  const box = document.getElementById('raExportRow');
  if(!box) return;
  const has = Array.isArray(est.lines) && est.lines.some(l => l.raId);
  box.hidden = !has;
}

$$('#rateSrcChips .chip').forEach(b => b.onclick = () => {
  est.rateSource = b.dataset.rs; save();
  applyRateSourceUI();
  refreshWorkName();
});

/* ------------------------------- tabs ------------------------------- */
$$('nav.tabs button').forEach(b => b.onclick = () => {
  $$('nav.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  ['est','prev','saved','data'].forEach(t => $('#tab-'+t).hidden = (t !== b.dataset.tab));
  if(b.dataset.tab === 'prev') renderPreview();
  if(b.dataset.tab === 'data'){ showDataGrid(); }
  if(b.dataset.tab === 'saved') renderSavedTable();
  window.scrollTo(0,0);
});

/* ------------------------------- combobox ------------------------------- */
function highlight(text, q){
  let out = esc(text);
  q.trim().split(/\s+/).filter(Boolean).forEach(w=>{
    out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')','ig'), '<b>$1</b>');
  });
  return out;
}
const matches = (hay, q) => q.toLowerCase().trim().split(/\s+/).filter(Boolean)
  .every(w => hay.toLowerCase().includes(w));

function makeCombo(input, list, getData, onPick){
  let idx = -1;
  function open(){
    const q = input.value;
    const data = getData().filter(d => matches(d.search, q)).slice(0, 80);
    list._data = data; idx = -1;
    list.innerHTML = data.length
      ? data.map((d,i)=>`<div class="combo-opt" data-i="${i}">${highlight(d.label,q)}${d.meta?`<span class="meta">${esc(d.meta)}</span>`:''}</div>`).join('')
      : '<div class="combo-empty">Kuch nahi mila — jo type kiya wahi use hoga.</div>';
    list.classList.add('open');
    list.querySelectorAll('.combo-opt').forEach(el =>
      el.onmousedown = e => { e.preventDefault(); list.classList.remove('open'); onPick(data[+el.dataset.i]); });
  }
  input.addEventListener('focus', open);
  input.addEventListener('input', open);
  input.addEventListener('blur', () => setTimeout(()=> list.classList.remove('open'), 150));
  input.addEventListener('keydown', e => {
    const opts = [...list.querySelectorAll('.combo-opt')];
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
      e.preventDefault();
      if(!list.classList.contains('open')) return open();
      idx += (e.key === 'ArrowDown' ? 1 : -1);
      if(idx < 0) idx = opts.length - 1;
      if(idx >= opts.length) idx = 0;
      opts.forEach((o,i)=> o.classList.toggle('active', i === idx));
      opts[idx] && opts[idx].scrollIntoView({block:'nearest'});
    } else if(e.key === 'Enter' && idx >= 0 && list._data){
      e.preventDefault(); list.classList.remove('open'); onPick(list._data[idx]);
    } else if(e.key === 'Escape'){ list.classList.remove('open'); }
  });
}
/* free-typing capture (coexists with makeCombo) */
function freeText(input, key, cb){
  input.value = est[key] ?? '';
  input.addEventListener('input', () => { est[key] = input.value; save(); cb && cb(); });
}

/* ------------------------------- units ------------------------------- */
function unitKind(u){
  const s = String(u||'').toLowerCase().replace(/[^a-z]/g,'');
  if(s.startsWith('mt') || s === 'tonne' || s === 'ton') return 'MT';
  if(s.startsWith('cum')) return 'CUM';
  if(s.startsWith('sqm')) return 'SQM';
  if(s.startsWith('hect') || s.startsWith('hac')) return 'SQM';   // hectare measured as area (sqm) then converted
  if(s.startsWith('rmt') || s.startsWith('mtr') || s === 'm' || s.startsWith('km')) return 'RMT';
  if(s.startsWith('no') || s.startsWith('each') || s.startsWith('hrs') || s.startsWith('hour')
     || s.startsWith('day') || s.startsWith('kg') || s.startsWith('ltr')) return 'NOS';
  return 'CUM';
}
/* how many measured base-units make ONE output unit.
   e.g. Hectare: measure area in sqm, then divide by 10000 to get hectares */
function unitDivisor(u){
  const s = String(u||'').toLowerCase().replace(/[^a-z]/g,'');
  if(s.startsWith('hect') || s.startsWith('hac')) return 10000;   // sqm -> hectare
  if(s.startsWith('km')) return 1000;                              // metre -> km
  if(s.startsWith('quintal') || s === 'qtl') return 100;          // kg -> quintal (if measured in kg)
  return 1;
}
/* the unit in which the measurement rows are computed (before conversion) */
function measuredUnit(kind){
  return { MT:'MT', CUM:'Cu.m', SQM:'Sqm', RMT:'Rmt', NOS:'Nos' }[kind] || 'Cu.m';
}
const FIELDS = { MT:['nos','len','wid','thk','den'], CUM:['nos','len','wid','thk'],
                 SQM:['nos','len','wid'], RMT:['nos','len'], NOS:['nos'] };
const FLABEL = { nos:'Nos.', len:'Length', wid:'Width', thk:'Thick', den:'Density' };
const rowQty = (row, kind) => (FIELDS[kind] || FIELDS.CUM)
  .reduce((a,k) => a * (n(row[k]) || (k === 'nos' ? 1 : 0)), 1);
const blankRow = () => ({ ch:'', nos:'', len:'', wid:'', thk:'', den:'' });

/* ------------------------------- name of work ------------------------------- */
function buildWorkName(){
  /* project mode: har sub-estimate ka "Name of Work" parent project se
     aata hai (Project tab → Name of Work). Sub ka apna naam titleSuffix
     ke roop me alag se lagta hai. */
  if(window.project && Array.isArray(window.project.subs) && window.project.subs.length){
    const ov = window.project.meta && window.project.meta.performa &&
               window.project.meta.performa.projectNameOverride;
    if(ov && String(ov).trim()) return String(ov).trim();
  }
  if(est.mode === 'building'){
    if(!est.road) return '—';
    return String(est.road).trim();
  }
  // road mode — one or more roads, each with its own km + working chainage
  const list = (est.roadList || []).filter(r => (r.name || '').trim());
  if(!list.length) return '—';
  const descs = (est.workDescList || []).map(d => (d || '').trim()).filter(Boolean);
  const wd = descs.length ? ` (${descs.join(' & ')})` : '';
  const part = r => {
    const km = r.km ? ` Km.${r.km}` : '';
    const wc = (r.wcFrom || r.wcTo) ? `(working chainage ${r.wcFrom || ''}-${r.wcTo || ''})` : '';
    return `${r.name.trim()}${km}${wc}`;
  };
  if(list.length === 1) return `C.R. to ${part(list[0])}${wd}`;
  const joined = list.map((r,i) => `(${i+1}) ${part(r)}`).join('  ');
  return `C.R. to ${joined}${wd}`;
}
const refreshWorkName = () => $('#workName').textContent = buildWorkName();

/* ------------------------------- totals ------------------------------- */
function lineTotal(line, lcPctArg, gstPctArg){
  const kind = unitKind(line.unit);
  const div = unitDivisor(line.unit);
  const measured = line.rows.reduce((a,r) => a + rowQty(r, kind), 0);  // in base measured unit (e.g. sqm)
  const q = measured / div;                                            // converted to output unit (e.g. hectare)
  const autoSay = Math.ceil(r2(q) * 10) / 10;                          // R&B round-up: 111.09 -> 111.10
  const say = (line.sayOverride == null || line.sayOverride === '') ? autoSay : n(line.sayOverride);
  /* Rate loadings — E2 format: approved rate = base rate + GST% + LC%, and
     amount is on the loaded approved rate. lcPctArg / gstPctArg let
     project.js roll up a non-active sub with that sub's own est.lc/est.gst. */
  const baseRate = n(line.rate);
  const gstPct   = (gstPctArg != null) ? n(gstPctArg) : (n(est.gst) || 0);
  const lcPct    = (lcPctArg  != null) ? n(lcPctArg)  : (n(est.lc)  || 0);
  const gstAmt   = r2(baseRate * gstPct / 100);
  const lcAmt    = r2(baseRate * lcPct / 100);
  const apprRate = r2(baseRate + gstAmt + lcAmt);
  return { measured:r2(measured), qty:r2(q), autoSay, say:r2(say),
           baseRate:r2(baseRate), gstPct, gstAmt, lcPct, lcAmt, apprRate,
           amount:r2(say * apprRate) };
}
function totals(){
  const total = r2(est.lines.reduce((a,l) => a + lineTotal(l).amount, 0));
  const qc    = r2(total * n(est.qc) / 100);
  const grand = r2(total + qc);
  return { total, qc, grand, say: Math.ceil(grand/1000) * 1000 };
}
function subActive(){
  return !!(window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1
            && window.project.subs[window.project.active]);
}
function refreshTotals(){
  const t = totals();
  const sub = subActive();
  const qcWrap = $('#qcFieldWrap'), qcRow = $('#qcTotRow'), grRow = $('#grandTotRow');
  /* Sub-estimate me QC/Grand nahi (wo Recap me) — sirf LC + Say. Standalone
     estimate me pehle jaisa Total -> QC -> Grand -> Say. */
  if(qcWrap) qcWrap.style.display = sub ? 'none' : '';
  if(qcRow)  qcRow.style.display  = sub ? 'none' : '';
  if(grRow)  grRow.style.display  = sub ? 'none' : '';
  $('#tTotal').textContent = fmt(t.total);
  if(!sub){
    $('#tQcLbl').textContent = `${est.qc} % Q C`;
    $('#tQc').textContent    = fmt(t.qc);
    $('#tGrand').textContent = fmt(t.grand);
  }
  $('#tSay').textContent = fmt0(sub ? Math.ceil(t.total / 1000) * 1000 : t.say);
}

/* ------------------------------- item blocks ------------------------------- */
function renderItemBlocks(){
  if(typeof refreshRAExportBtns === 'function') setTimeout(refreshRAExportBtns, 0);
  const box = $('#itemBlocks');
  if(!est.lines.length){
    box.innerHTML = '<div class="empty">Koi item nahi. Upar search box se item chuno.</div>';
    refreshTotals(); return;
  }
  box.innerHTML = est.lines.map((l, li) => {
    const kind = unitKind(l.unit), f = FIELDS[kind] || FIELDS.CUM, lt = lineTotal(l);
    const mUnit = measuredUnit(kind);
    const div = unitDivisor(l.unit);
    const converted = div !== 1;
    return `<div class="itemblock">
      <h3><span>Item No. ${li + 1}</span>
        <button class="btn danger" style="padding:4px 9px" data-rmline="${li}">Remove</button></h3>
      <div class="itemdesc">${(l.shortDesc && String(l.desc||'').length > 220)
        ? `<b>${esc(l.shortDesc)}</b><details style="margin-top:4px"><summary style="cursor:pointer;font-size:11px;color:#567">Full description (estimate me yahi jayegi)</summary><div style="margin-top:4px">${esc(l.desc)}</div></details>`
        : esc(l.desc)}</div>
      <div>
        <span class="pill">Rate ₹ ${fmt(n(l.rate))}</span>
        <span class="pill">Per ${esc(l.unit)}</span>
        <span class="pill" style="padding:0 7px">Approved Rate no
          <input data-apr="${li}" value="${esc(l.appRateNo || '')}"
                 style="width:46px;display:inline-block;border:0;background:transparent;padding:3px 0;font-family:'IBM Plex Mono',monospace;font-size:11px"></span>
        ${l.cat ? `<span class="pill">${esc(l.cat)}</span>` : ''}
        <span class="pill">${f.map(k=>FLABEL[k]).join(' × ')} → ${esc(mUnit)}</span>
        ${converted ? `<span class="pill" style="background:#fff3e0;border-color:#e2571f;color:#b3402a">Output ${esc(l.unit)} = ${esc(mUnit)} ÷ ${fmt0(div)}</span>` : ''}
      </div>
      <div class="scroll"><table class="tbl" style="margin-top:8px">
        <tr><th style="min-width:150px">Chainage</th>${f.map(k=>`<th class="num">${FLABEL[k]}</th>`).join('')}<th class="num">Qty (${esc(mUnit)})</th><th></th></tr>
        ${l.rows.map((r, ri) => `<tr>
          <td><input data-l="${li}" data-r="${ri}" data-k="ch" value="${esc(r.ch)}" placeholder="(scattered length )"></td>
          ${f.map(k=>`<td><input class="num mono" type="number" step="any" inputmode="decimal" data-l="${li}" data-r="${ri}" data-k="${k}" value="${r[k] ?? ''}"></td>`).join('')}
          <td class="num mono">${fmt(rowQty(r, kind))}</td>
          <td><button class="btn danger" style="padding:4px 8px" data-del="${li}:${ri}">×</button></td>
        </tr>`).join('')}
      </table></div>
      <div class="row-actions" style="margin-top:8px">
        <button class="btn ghost" data-addrow="${li}">+ Add row</button>
        <span class="pill" data-mtot="${li}">Measured ${fmt(lt.measured)} ${esc(mUnit)}</span>
        <span class="pill" data-tot="${li}" style="${converted?'background:#fff3e0;border-color:#e2571f;color:#b3402a':''}">Total ${fmt(lt.qty)} ${esc(l.unit)}</span>
        <span class="pill" style="padding:0 7px">Say
          <input class="num mono" type="number" step="any" inputmode="decimal" data-say="${li}"
                 value="${l.sayOverride ?? lt.autoSay}" style="width:80px;display:inline-block;border:0;background:transparent;padding:3px 0">
          ${esc(l.unit)}</span>
        <span class="pill" data-amt="${li}">Amount ₹ ${fmt(lt.amount)}</span>
      </div>
    </div>`;
  }).join('');

  function refreshLine(li){
    const l = est.lines[li], lt = lineTotal(l);
    const kind = unitKind(l.unit), mUnit = measuredUnit(kind);
    const tp = box.querySelector(`[data-tot="${li}"]`), ap = box.querySelector(`[data-amt="${li}"]`),
          sp = box.querySelector(`[data-say="${li}"]`), mp = box.querySelector(`[data-mtot="${li}"]`);
    if(mp) mp.textContent = `Measured ${fmt(lt.measured)} ${mUnit}`;
    if(tp) tp.textContent = `Total ${fmt(lt.qty)} ${l.unit}`;
    if(ap) ap.textContent = `Amount ₹ ${fmt(lt.amount)}`;
    if(sp && document.activeElement !== sp && (l.sayOverride == null || l.sayOverride === '')) sp.value = lt.autoSay;
    refreshTotals();
  }
  box.querySelectorAll('input[data-k]').forEach(inp => inp.oninput = e => {
    const li = +e.target.dataset.l, ri = +e.target.dataset.r;
    est.lines[li].rows[ri][e.target.dataset.k] = e.target.value;
    save();
    const kind = unitKind(est.lines[li].unit);
    const tds = e.target.closest('tr').querySelectorAll('td');
    tds[FIELDS[kind].length + 1].textContent = fmt(rowQty(est.lines[li].rows[ri], kind));
    refreshLine(li);
  });
  box.querySelectorAll('input[data-say]').forEach(inp => inp.oninput = e => {
    const li = +e.target.dataset.say;
    est.lines[li].sayOverride = e.target.value === '' ? null : e.target.value;
    save(); refreshLine(li);
  });
  box.querySelectorAll('input[data-apr]').forEach(inp => inp.oninput = e => {
    est.lines[+e.target.dataset.apr].appRateNo = e.target.value; save();
  });
  box.querySelectorAll('[data-addrow]').forEach(b => b.onclick = () => {
    est.lines[+b.dataset.addrow].rows.push(blankRow()); save(); renderItemBlocks(); });
  box.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    const [li, ri] = b.dataset.del.split(':').map(Number);
    if(est.lines[li].rows.length > 1) est.lines[li].rows.splice(ri, 1);
    save(); renderItemBlocks(); });
  box.querySelectorAll('[data-rmline]').forEach(b => b.onclick = () => {
    est.lines.splice(+b.dataset.rmline, 1); save(); renderItemBlocks(); });
  refreshTotals();
}

/* ------------------------------- data tables ------------------------------- */
function renderRoadsTable(){
  const box = $('#roadsTable');
  const view = roads.map((r,i)=>({r,i})).filter(x => divOK(x.r));
  if(!view.length){ box.innerHTML = '<div class="empty">' + esc(myDiv()) + ' ke liye koi road nahi. “Add road” ya Excel import karo.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl"><tr><th style="width:78%">Road name</th><th>Km</th><th></th></tr>` +
    view.map(x=>{ const r=x.r, i=x.i; return `<tr>
      <td><input data-ri="${i}" data-rk="name" value="${esc(r.name)}"></td>
      <td><input class="mono" data-ri="${i}" data-rk="km" value="${esc(r.km||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-rdel="${i}">×</button></td></tr>`;}).join('') +
    `</table></div><p class="hint">${view.length} roads — ${esc(myDiv())}.</p>`;
  box.querySelectorAll('input').forEach(i => i.oninput = e => {
    roads[+e.target.dataset.ri][e.target.dataset.rk] = e.target.value; store.set('rnb_roads', roads); });
  box.querySelectorAll('[data-rdel]').forEach(b => b.onclick = () => {
    roads.splice(+b.dataset.rdel,1); store.set('rnb_roads', roads); renderRoadsTable(); refreshHints(); });
}
let buildingKindFilter = '';    // '' | 'R' | 'NR'
let buildingTalukaFilter = '';  // '' | taluka
let buildingDeptFilter = '';    // '' | dept

function renderBuildingsTable(){
  const box = $('#buildingsTable');
  // Apply all three filters
  const applyF = b => divOK(b)
                   && (!buildingKindFilter   || (b.kind||'')===buildingKindFilter)
                   && (!buildingTalukaFilter || (b.taluka||'')===buildingTalukaFilter)
                   && (!buildingDeptFilter   || (b.dept||'')===buildingDeptFilter);

  const chipBox = $('#buildingKindChips');
  if(chipBox){
    const mineB = buildings.filter(divOK);
    const R  = mineB.filter(b=>b.kind==='R').length;
    const NR = mineB.filter(b=>b.kind==='NR').length;
    const talukas = [...new Set(mineB.map(b=>b.taluka).filter(Boolean))].sort();
    const depts   = [...new Set(mineB.map(b=>b.dept).filter(Boolean))].sort();
    chipBox.innerHTML =
      `<div class="chips" style="margin-bottom:8px">
        <button class="chip" data-bk="" aria-pressed="${buildingKindFilter===''}">All (${mineB.length})</button>
        <button class="chip" data-bk="R" aria-pressed="${buildingKindFilter==='R'}">Residential (${R})</button>
        <button class="chip" data-bk="NR" aria-pressed="${buildingKindFilter==='NR'}">Non-Residential (${NR})</button>
      </div>
      <div class="grid g2" style="gap:8px;margin-bottom:4px">
        <div>
          <label style="margin-bottom:3px">Taluka filter</label>
          <select id="bTalukaSel">
            <option value="">All talukas</option>
            ${talukas.map(t=>`<option value="${esc(t)}"${buildingTalukaFilter===t?' selected':''}>${esc(t)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="margin-bottom:3px">Department filter</label>
          <select id="bDeptSel">
            <option value="">All departments</option>
            ${depts.map(d=>`<option value="${esc(d)}"${buildingDeptFilter===d?' selected':''}>${esc(d)}</option>`).join('')}
          </select>
        </div>
      </div>`;
    chipBox.querySelectorAll('.chip').forEach(b => b.onclick = () => {
      buildingKindFilter = b.dataset.bk; renderBuildingsTable();
    });
    const tSel = $('#bTalukaSel'), dSel = $('#bDeptSel');
    if(tSel) tSel.onchange = () => { buildingTalukaFilter = tSel.value; renderBuildingsTable(); };
    if(dSel) dSel.onchange = () => { buildingDeptFilter = dSel.value; renderBuildingsTable(); };
  }

  if(!box) return;
  const view = buildings.map((r,i)=>({r,i})).filter(x => applyF(x.r));
  if(!view.length){ box.innerHTML = '<div class="empty">Is filter me koi building nahi.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:820px"><tr>
      <th style="width:44%">Building / Work name</th><th style="width:13%">Kind</th>
      <th style="width:16%">Taluka</th><th style="width:19%">Department</th><th></th></tr>` +
    view.map(x => { const r=x.r, i=x.i; return `<tr>
      <td><input data-bi="${i}" data-bk="name" value="${esc(r.name)}"></td>
      <td><select data-bi="${i}" data-bk="kind">
        <option value=""${!r.kind?' selected':''}>—</option>
        <option value="R"${r.kind==='R'?' selected':''}>Resi</option>
        <option value="NR"${r.kind==='NR'?' selected':''}>Non-Resi</option>
      </select></td>
      <td><input data-bi="${i}" data-bk="taluka" value="${esc(r.taluka||'')}"></td>
      <td><input data-bi="${i}" data-bk="dept" value="${esc(r.dept||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-bdel="${i}">×</button></td></tr>`;}).join('') +
    `</table></div><p class="hint">${view.length}${(buildingKindFilter||buildingTalukaFilter||buildingDeptFilter)?' (filtered)':''} buildings — ${esc(myDiv())}.</p>`;
  box.querySelectorAll('input,select').forEach(i => i.oninput = e => {
    buildings[+e.target.dataset.bi][e.target.dataset.bk] = e.target.value; store.set('rnb_buildings', buildings); });
  box.querySelectorAll('[data-bdel]').forEach(b => b.onclick = () => {
    buildings.splice(+b.dataset.bdel,1); store.set('rnb_buildings', buildings); renderBuildingsTable(); });
}
function renderItemsTable(){
  const box = $('#itemsTable');
  if(!box) return;
  const view = items.map((it,i) => ({it,i}))
    .filter(x => divOK(x.it) && (!dataItemsCat || (x.it.cat||'') === dataItemsCat));
  if(!view.length){ box.innerHTML = '<div class="empty">' + (dataItemsCat ? 'Is category me koi item nahi. “Add item” dabao.' : 'Item list khali hai.') + '</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:760px">
      <tr><th style="width:7%">It. No.</th><th style="width:50%">Item of work</th><th style="width:12%">Approved rate</th><th style="width:9%">Unit</th><th style="width:16%">Group</th><th></th></tr>` +
    view.map(x=>{ const it=x.it, i=x.i; return `<tr>
      <td><input class="mono" data-ii="${i}" data-ik="itemNo" value="${esc(it.itemNo||'')}"></td>
      <td><textarea rows="2" data-ii="${i}" data-ik="desc">${esc(it.desc)}</textarea></td>
      <td><input class="num mono" type="number" step="any" data-ii="${i}" data-ik="rate" value="${it.rate ?? ''}"></td>
      <td><input class="mono" data-ii="${i}" data-ik="unit" value="${esc(it.unit||'')}"></td>
      <td><input data-ii="${i}" data-ik="cat" value="${esc(it.cat||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-idel="${i}">×</button></td></tr>`;}).join('') +
    `</table></div><p class="hint">${view.length} of ${items.length} items${dataItemsCat ? ' (filtered)' : ''}.</p>`;
  box.querySelectorAll('input,textarea').forEach(i => i.oninput = e => {
    items[+e.target.dataset.ii][e.target.dataset.ik] = e.target.value; store.set('rnb_items', items); });
  box.querySelectorAll('[data-idel]').forEach(b => b.onclick = () => {
    items.splice(+b.dataset.idel,1); store.set('rnb_items', items); renderItemsTable(); renderCatChips(); });
}
function renderWDTable(){
  const box = $('#wdTable');
  if(!workDescs.length){ box.innerHTML = '<div class="empty">Koi work description nahi — “Add work description” dabao.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl"><tr><th style="width:70%">Work description</th><th>Type</th><th></th></tr>` +
    workDescs.map((w,i)=>`<tr>
      <td><input data-wi="${i}" data-wk="text" value="${esc(w.text)}"></td>
      <td><select data-wi="${i}" data-wk="type">
        ${['road','building','both'].map(t=>`<option value="${t}" ${w.type===t?'selected':''}>${t}</option>`).join('')}
      </select></td>
      <td><button class="btn danger" style="padding:4px 8px" data-wdel="${i}">×</button></td></tr>`).join('') +
    `</table></div><p class="hint">${workDescs.length} entries.</p>`;
  box.querySelectorAll('input,select').forEach(i => i.oninput = e => {
    workDescs[+e.target.dataset.wi][e.target.dataset.wk] = e.target.value; store.set('rnb_workdescs', workDescs); });
  box.querySelectorAll('[data-wdel]').forEach(b => b.onclick = () => {
    workDescs.splice(+b.dataset.wdel,1); store.set('rnb_workdescs', workDescs); renderWDTable(); });
}
function renderPeopleTable(){
  const box = $('#peopleTable');
  if(!people.length){ box.innerHTML = '<div class="empty">Koi name nahi — “Add name” dabao.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl"><tr><th>Name</th><th></th></tr>` +
    people.map((p,i)=>`<tr>
      <td><input data-pi="${i}" value="${esc(p)}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-pdel="${i}">×</button></td></tr>`).join('') +
    `</table></div><p class="hint">${people.length} names.</p>`;
  box.querySelectorAll('input').forEach(i => i.oninput = e => {
    people[+e.target.dataset.pi] = e.target.value; store.set('rnb_people', people); });
  box.querySelectorAll('[data-pdel]').forEach(b => b.onclick = () => {
    people.splice(+b.dataset.pdel,1); store.set('rnb_people', people); renderPeopleTable(); });
}
function renderCatChips(){
  const allow = MODE[est.mode] ? MODE[est.mode].cats : [];
  const cats = [...new Set(items.filter(divOK).map(i => i.cat).filter(c => c && allow.includes(c)))];
  $('#catChips').innerHTML = cats.map(c =>
    `<button class="chip" data-cat="${esc(c)}" aria-pressed="${catFilter === c}">${esc(c)}</button>`).join('') +
    (catFilter ? `<button class="chip" data-cat="" aria-pressed="false">Show all</button>` : '');
  $$('#catChips .chip').forEach(b => b.onclick = () => {
    catFilter = (b.dataset.cat === catFilter) ? '' : b.dataset.cat;
    renderCatChips(); $('#itemInput').focus();
  });
}
/* SOR chapter chips — item search box ke neeche */
let chapFilter = '';
/* SOR aur RA ab ek hi source hain. Purane estimates me rateSource 'ra' ho sakta
   hai — use 'sor' ki tarah treat karo. chapFilter === RA_ONLY => sirf RA dikhao. */
const RA_ONLY  = '__RA__';      // RA branch khula — saari RA
const SOR_ALL  = '__SOR__';     // SOR branch khula — saare chapters
const RA_TOPIC = 'RA::';        // RA::<topic> — ek RA topic
function rsKey(){ const rs = est.rateSource || 'arc'; return rs === 'ra' ? 'sor' : rs; }
function raEntries(){
  return (window.RA && window.RA.pickerEntries) ? window.RA.pickerEntries() : [];
}
const chapNo = c => { const m = String(c).match(/^CH-(\d+)([A-Z]?)/); return m ? [+m[1], m[2] || ''] : [999, '']; };
function chapLabel(c){
  const parts = String(c).split(': ');
  const code = parts[0] || c;
  let name = (parts[1] || '').toLowerCase().replace(/\b\w/g, m => m.toUpperCase());
  const mech = /MECHANISED/i.test(c), man = /MANUAL/i.test(c);
  name = name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  if(mech) name += ' (Mech.)';
  if(man)  name += ' (Manual)';
  return code + ' · ' + name;
}
function raTopics(){
  const m = {};
  raEntries().forEach(e => {
    const t = (e.raw && e.raw.ra && e.raw.ra.topic) || 'Other';
    m[t] = (m[t] || 0) + 1;
  });
  return Object.keys(m).sort().map(k => [k, m[k]]);
}

function renderChapChips(){
  const box = $('#catChips');
  if(!box) return;
  const mine = sorItems.filter(divOK);
  const cats = [...new Set(mine.map(i => i.cat).filter(Boolean))]
    .sort((a,b) => { const A = chapNo(a), B = chapNo(b); return A[0]-B[0] || A[1].localeCompare(B[1]); });
  const raCount = raEntries().length;
  const f = chapFilter || '';
  const chip = (val, label, count, on) =>
    `<button class="chip" data-chap="${esc(val)}" aria-pressed="${!!on}">${label}` +
    (count != null ? ` <span style="opacity:.6">${count}</span>` : '') + `</button>`;
  const back = (val, label) => `<button class="chip" data-chap="${esc(val)}" aria-pressed="false">${label}</button>`;

  let h = '';
  if(f === RA_ONLY || f.startsWith(RA_TOPIC)){
    /* ---- RA branch ---- */
    h = back('', '← Wapas') +
        chip(RA_ONLY, '🧮 Saari RA', raCount, f === RA_ONLY) +
        raTopics().map(([t,c]) => chip(RA_TOPIC + t, esc(t), c, f === RA_TOPIC + t)).join('');
  } else if(f === SOR_ALL || (f && f !== RA_ONLY)){
    /* ---- SOR branch ---- */
    if(!cats.length){
      box.innerHTML = back('', '← Wapas') + '<p class="hint" style="margin:6px 0 0">' + esc(myDiv()) +
        ' ka SOR abhi upload nahi hua. Data → SOR me Excel import karo — chapter chips apne aap ban jayenge.</p>';
      wireChapChips(); return;
    }
    const count = c => mine.filter(i => i.cat === c).length;
    h = back('', '← Wapas') +
        chip(SOR_ALL, '📘 Saare chapters', mine.length, f === SOR_ALL) +
        cats.map(c => chip(c, esc(chapLabel(c)), count(c), f === c)).join('');
  } else {
    /* ---- top level: sirf do chips ---- */
    h = (raCount ? chip(RA_ONLY, '🧮 Rate Analysis', raCount, false) : '') +
        chip(SOR_ALL, '📘 SOR 2024-25', mine.length, false);
  }
  box.innerHTML = h;
  wireChapChips();
}

function wireChapChips(){
  $$('#catChips .chip').forEach(b => b.onclick = () => {
    const v = b.dataset.chap;
    chapFilter = (v === chapFilter) ? (v === RA_ONLY || v === SOR_ALL ? '' : (v.startsWith(RA_TOPIC) ? RA_ONLY : SOR_ALL)) : v;
    renderChapChips(); $('#itemInput').focus();
  });
}
/* profile me division badle to lists refresh */
window.onDivChange = function(){
  chapFilter = ''; catFilter = '';
  applyRateSourceUI();
  if(typeof renderSorCatChips === 'function') renderSorCatChips();
  if(typeof renderSorTable === 'function') renderSorTable();
  refreshHints();
};

function refreshHints(){ $('#roadHint').textContent = `${roads.length} roads · ${buildings.length} buildings · ${items.length} items loaded.`; }

/* ------------------------------- excel import ------------------------------- */
let pendingRows = null, pendingKind = null;
const MAPS = {
  roads: [{k:'name', lbl:'Road name', hints:['road','name','work']},
          {k:'km', lbl:'Km (optional)', hints:['km','chainage'], opt:true}],
  buildings: [{k:'name', lbl:'Building / Work name', hints:['building','name','work','location']}],
  items: [{k:'desc', lbl:'Item of work / description', hints:['item description','description','item of work','particular']},
          {k:'rate', lbl:'Approved rate', hints:['approved','rate']},
          {k:'unit', lbl:'Unit', hints:['unit','per']},
          {k:'itemNo', lbl:'Item no. (optional)', hints:['item no','sr','sl'], opt:true},
          {k:'cat', lbl:'Group (optional)', hints:['group','category','cat'], opt:true}],
  sor:   [{k:'desc', lbl:'Item of work / description', hints:['description','item of work','particular']},
          {k:'rate', lbl:'Rate', hints:['rate','amount']},
          {k:'unit', lbl:'Unit', hints:['unit','per']},
          {k:'itemNo', lbl:'SOR No. (optional)', hints:['sor no','item no','sr','sl','no'], opt:true},
          {k:'cat', lbl:'Group (optional)', hints:['group','category','cat','chapter'], opt:true}]
};
function readSheet(file, cb){
  const fr = new FileReader();
  fr.onload = e => {
    try{
      const wb = XLSX.read(new Uint8Array(e.target.result), {type:'array'});
      let best = null;
      wb.SheetNames.forEach(nm => {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[nm], {header:1, blankrows:false, defval:''});
        if(!best || rows.length > best.rows.length) best = {name:nm, rows};
      });
      cb(best);
    }catch(err){ toast('File padh nahi paya: ' + err.message); }
  };
  fr.readAsArrayBuffer(file);
}
function openMapper(kind, sheet){
  pendingKind = kind;
  let hr = 0, bs = -1;
  sheet.rows.slice(0,15).forEach((r,i)=>{ const s = r.filter(c => String(c).trim() !== '').length; if(s > bs){ bs = s; hr = i; } });
  const headers = sheet.rows[hr].map((h,i)=> String(h).replace(/\s+/g,' ').trim() || `Column ${i+1}`);
  pendingRows = sheet.rows.slice(hr + 1);
  $('#mapTitle').textContent =
    kind === 'roads' ? 'Road list — match the columns' :
    kind === 'buildings' ? 'Building list — match the columns' :
    kind === 'sor' ? 'SOR — match the columns' :
    'Item list — match the columns';
  $('#mapFields').innerHTML = MAPS[kind].map(f => {
    let sel = -1;
    headers.forEach((h,i)=>{ if(sel < 0 && f.hints.some(x => h.toLowerCase().includes(x))) sel = i; });
    return `<div><label>${f.lbl}</label><select data-f="${f.k}"><option value="-1">— none —</option>
      ${headers.map((h,i)=>`<option value="${i}" ${i===sel?'selected':''}>${esc(h)}</option>`).join('')}</select></div>`;
  }).join('');
  $('#mapModal').style.display = 'flex';
}
$('#mapCancel').onclick = () => $('#mapModal').style.display = 'none';
$('#mapOk').onclick = () => {
  const map = {}; $$('#mapFields select').forEach(s => map[s.dataset.f] = +s.value);
  const spec = MAPS[pendingKind];
  const missing = spec.filter(f => !f.opt && map[f.k] < 0);
  if(missing.length){ toast('Ye column choose karo: ' + missing.map(m => m.lbl).join(', ')); return; }
  const out = [];
  pendingRows.forEach(r => {
    const o = {};
    spec.forEach(f => o[f.k] = map[f.k] >= 0 ? String(r[map[f.k]] ?? '').replace(/\s+/g,' ').trim() : '');
    const key = (pendingKind === 'items' || pendingKind === 'sor') ? o.desc : o.name;
    if(!key || key.length < 3) return;
    if(pendingKind === 'items' || pendingKind === 'sor'){ o.rate = r2(n(String(o.rate).replace(/[^0-9.\-]/g,''))); if(!o.rate) return; }
    out.push(o);
  });
  if(!out.length){ toast('Valid data nahi mila.'); return; }
  out.forEach(o => { if(!o.div) o.div = myDiv(); });
  if(pendingKind === 'roads'){ roads = roads.concat(out); store.set('rnb_roads', roads); renderRoadsTable(); }
  else if(pendingKind === 'buildings'){ buildings = buildings.concat(out); store.set('rnb_buildings', buildings); renderBuildingsTable(); }
  else if(pendingKind === 'sor'){ out.forEach(o => { if(!o.div) o.div = myDiv(); }); sorItems = sorItems.concat(out); store.set('rnb_sor_items', sorItems); renderSorCatChips(); renderSorTable(); }
  else { items = items.concat(out); store.set('rnb_items', items); renderItemsTable(); renderCatChips(); }
  $('#mapModal').style.display = 'none';
  toast(`${out.length} ${pendingKind} import ho gaye.`); refreshHints();
};
$('#fileRoads').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('roads', s)); e.target.value = ''; };
$('#fileBuildings').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('buildings', s)); e.target.value = ''; };
$('#fileItems').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('items', s)); e.target.value = ''; };
$('#fileSor').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('sor', s)); e.target.value = ''; };

/* ------------------------------- SOR items table ------------------------------- */
let sorCatFilter = '';

function renderSorCatChips(){
  const box = $('#sorCatChips');
  if(!box) return;
  const cats = [...new Set(sorItems.filter(divOK).map(i => i.cat).filter(Boolean))].sort();
  box.innerHTML = cats.map(c =>
    `<button class="chip" data-scat="${esc(c)}" aria-pressed="${sorCatFilter===c}">${esc(c.replace(/^CH-\d+[A-Z]?: /,''))}</button>`
  ).join('') + (sorCatFilter ? `<button class="chip" data-scat="" aria-pressed="false">Show all</button>` : '');
  box.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    sorCatFilter = (b.dataset.scat === sorCatFilter) ? '' : b.dataset.scat;
    renderSorCatChips(); renderSorTable();
  });
}
function renderSorTable(){
  const box = $('#sorTable');
  if(!box) return;
  const view = sorItems.map((it,i) => ({it,i}))
    .filter(x => divOK(x.it) && (!sorCatFilter || (x.it.cat||'') === sorCatFilter));
  if(!view.length){ box.innerHTML = '<div class="empty">SOR list khali hai — category select karo ya "Add SOR item" dabao.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:800px">
      <tr><th style="width:7%">SOR No.</th><th style="width:48%">Item of work</th><th style="width:10%">Rate</th><th style="width:8%">Unit</th><th style="width:20%">Chapter</th><th></th></tr>` +
    view.map(x=>{ const it=x.it, i=x.i; return `<tr>
      <td><input class="mono" data-si="${i}" data-sk="itemNo" value="${esc(it.itemNo||'')}"></td>
      <td><textarea rows="2" data-si="${i}" data-sk="desc">${esc(it.desc)}</textarea></td>
      <td><input class="num mono" type="number" step="any" data-si="${i}" data-sk="rate" value="${it.rate??''}"></td>
      <td><input class="mono" data-si="${i}" data-sk="unit" value="${esc(it.unit||'')}"></td>
      <td><input data-si="${i}" data-sk="cat" value="${esc(it.cat||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-sdel="${i}">×</button></td></tr>`;}).join('') +
    `</table></div><p class="hint">${view.length}${sorCatFilter?' (filtered)':''} of ${sorItems.length} SOR items.</p>`;
  box.querySelectorAll('input,textarea').forEach(i => i.oninput = e => {
    sorItems[+e.target.dataset.si][e.target.dataset.sk] = e.target.value; store.set('rnb_sor_items', sorItems); });
  box.querySelectorAll('[data-sdel]').forEach(b => b.onclick = () => {
    sorItems.splice(+b.dataset.sdel,1); store.set('rnb_sor_items', sorItems); renderSorTable(); renderSorCatChips(); });
}
$('#btnAddSor').onclick = () => { sorItems.unshift({itemNo:'', desc:'', rate:'', unit:'MT', cat:'', div: myDiv()}); store.set('rnb_sor_items', sorItems); renderSorTable(); };
$('#btnClearSor').onclick = () => {
  if(!sorItems.length) return;
  if(!confirm('Saare SOR items delete karne hain?')) return;
  sorItems = []; store.set('rnb_sor_items', sorItems); sorCatFilter=''; renderSorCatChips(); renderSorTable(); toast('SOR list clear ho gayi.');
};

/* ------------------------------- Data-tab navigation ------------------------------- */
function showDataGrid(){
  $('#dataGrid').hidden = false;
  $('#dataDetail').hidden = true;
  $$('.data-view').forEach(el => el.hidden = true);
  const cR = $('#cRoads'), cB = $('#cBldg');
  if(cR) cR.textContent = roads.length;
  if(cB) cB.textContent = buildings.length;
}
function showDataView(name){
  $('#dataGrid').hidden = true;
  $('#dataDetail').hidden = false;
  $$('.data-view').forEach(el => el.hidden = el.dataset.view !== name);
  if(name === 'rate'){ showRateSub('menu'); }
  else if(name === 'roads') renderRoadsTable();
  else if(name === 'buildings') renderBuildingsTable();
  else if(name === 'people') renderPeopleTable();
  else if(name === 'workdesc') renderWDTable();
  window.scrollTo(0,0);
}
function showRateSub(sub){
  $('#rateMenu').hidden = sub !== 'menu';
  $('#arcItems').hidden = sub !== 'arc-items';
  $('#sorView').hidden  = sub !== 'sor';
  const crumb = $('#rateCrumb');
  if(crumb) crumb.textContent =
    sub === 'menu'      ? 'Rate' :
    sub === 'arc-items' ? 'Rate › ARC' + (dataItemsCat ? ' › ' + dataItemsCat : '') :
    sub === 'sor'       ? 'Rate › SOR' : 'Rate';
  if(sub === 'arc-items'){
    const t = $('#arcCatTitle');
    if(t) t.textContent = 'ARC — Approved Rate List' + (dataItemsCat ? ' · ' + dataItemsCat : '');
    renderArcCatChips();
    renderItemsTable();
  }
  if(sub === 'sor'){ renderSorCatChips(); renderSorTable(); }
  window.scrollTo(0,0);
}

function renderArcCatChips(){
  const box = $('#arcCatChips');
  if(!box) return;
  const cats = [...new Set(items.map(i => i.cat).filter(Boolean))].sort();
  box.innerHTML = cats.map(c =>
    `<button class="chip" data-acat="${esc(c)}" aria-pressed="${dataItemsCat===c}">${esc(c)}</button>`
  ).join('') + (dataItemsCat ? `<button class="chip" data-acat="" aria-pressed="false">Show all</button>` : '');
  box.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    dataItemsCat = (b.dataset.acat === dataItemsCat) ? '' : b.dataset.acat;
    renderArcCatChips(); renderItemsTable();
    const t = $('#arcCatTitle'); if(t) t.textContent = 'ARC — Approved Rate List' + (dataItemsCat ? ' · ' + dataItemsCat : '');
    const crumb = $('#rateCrumb'); if(crumb) crumb.textContent = 'Rate › ARC' + (dataItemsCat ? ' › ' + dataItemsCat : '');
  });
}

$$('#dataGrid .data-tile').forEach(b => b.onclick = () => showDataView(b.dataset.nav));
$$('#tab-data .back').forEach(b => b.onclick = () => showDataGrid());
$$('#rateMenu .data-tile').forEach(b => b.onclick = () => {
  showRateSub(b.dataset.rate === 'arc' ? 'arc-items' : 'sor');
});
// override the generic "back" on Rate view so it goes step-by-step
$$('.data-view[data-view="rate"] .back').forEach(b => b.onclick = () => {
  if(!$('#arcItems').hidden){ showRateSub('menu'); return; }
  if(!$('#sorView').hidden){ showRateSub('menu'); return; }
  showDataGrid();
});
$('#btnAddRoad').onclick = () => { roads.unshift({name:'', km:'', div: myDiv()}); store.set('rnb_roads', roads); renderRoadsTable(); };
$('#btnAddBuilding').onclick = () => { buildings.unshift({name:'',kind:'', div: myDiv()}); store.set('rnb_buildings', buildings); renderBuildingsTable(); };
$('#btnResetBuildings').onclick = () => {
  if(typeof BUILDINGS_SEED === 'undefined') return;
  if(!confirm('PRB Dahod ki 390 buildings wapas load karein? Aapke manual changes chale jayenge.')) return;
  buildings = BUILDINGS_SEED.map(x=>({...x}));
  store.set('rnb_buildings', buildings);
  store.set('rnb_seedver_buildings', SEED_VERSIONS.buildings);
  buildingKindFilter = '';
  renderBuildingsTable(); refreshHints();
  toast('PRB building list reload ho gayi (390 buildings).');
};
$('#btnAddItem').onclick = () => { items.unshift({itemNo:'', desc:'', rate:'', unit:'MT', cat: dataItemsCat || '', div: myDiv()}); store.set('rnb_items', items); renderItemsTable(); };
$('#btnAddWD').onclick = () => { workDescs.unshift({text:'', type: est.mode || 'both'}); store.set('rnb_workdescs', workDescs); renderWDTable(); };
$('#btnAddPerson').onclick = () => { people.unshift(''); store.set('rnb_people', people); renderPeopleTable(); };
$('#btnResetData').onclick = () => {
  if(!confirm('Built-in roads aur items wapas load karein? Aapke manual changes chale jayenge.')) return;
  roads = ROADS_SEED.slice(); items = ITEMS_SEED.slice();
  store.set('rnb_roads', roads); store.set('rnb_items', items);
  renderRoadsTable(); renderItemsTable(); renderCatChips(); refreshHints(); toast('Built-in data reload ho gaya.');
};

/* ------------------------------- bind form ------------------------------- */
$('#qcPct').value = est.qc; $('#qcPct').oninput = e => { est.qc = n(e.target.value); save(); refreshTotals(); };
$('#lcRate').value = est.lc; $('#lcRate').oninput = e => { est.lc = n(e.target.value); save(); refreshTotals(); if(typeof renderPreview==='function') renderPreview(); };
$('#roadInput').value = est.road || '';
$('#btnAddRoadEntry').onclick = () => {
  est.roadList.push({ name:'', km:'', wcFrom:'', wcTo:'' });
  save(); renderRoadEntries(); refreshWorkName();
};

function bindOffice(sel, key){
  const el = $(sel); el.value = office[key];
  el.oninput = () => { office[key] = el.value; store.set('rnb_office', office); };
}
bindOffice('#divName','div'); bindOffice('#subDivName','sub'); bindOffice('#genDesc','desc');

/* building name combo — dynamic source + free text (building mode) */
freeText($('#roadInput'), 'road', refreshWorkName);
makeCombo($('#roadInput'), $('#roadList'),
  () => (MODE[est.mode] ? MODE[est.mode].list() : []).map(r => ({
    label:r.name, meta: r.km ? 'Km ' + r.km : '', search: r.name + ' ' + (r.km||''), raw:r })),
  d => { est.road = d.raw.name;
         $('#roadInput').value = d.raw.name; save(); refreshWorkName(); });

/* + Add work description button (multiple descriptions per work) */
$('#btnAddWorkDesc').onclick = () => {
  if(!Array.isArray(est.workDescList)) est.workDescList = [];
  est.workDescList.push('');
  save(); renderWorkDescEntries(); refreshWorkName();
};

/* prepared-by / checked-by combos — dropdown + free text */
freeText($('#prepBy'), 'prepBy');
makeCombo($('#prepBy'), $('#prepList'),
  () => people.filter(Boolean).map(p => ({ label:p, search:p, raw:p })),
  d => { est.prepBy = d.raw; $('#prepBy').value = d.raw; save(); });
freeText($('#chkBy'), 'chkBy');
makeCombo($('#chkBy'), $('#chkList'),
  () => people.filter(Boolean).map(p => ({ label:p, search:p, raw:p })),
  d => { est.chkBy = d.raw; $('#chkBy').value = d.raw; save(); });

/* item combo — source depends on est.rateSource (arc / sor / ra) */
makeCombo($('#itemInput'), $('#itemList'),
  () => {
    const rs = rsKey();
    if(rs === 'sor'){
      /* RA pehle, phir SOR — chip se jo branch khula hai wahi dikhega */
      const f = chapFilter || '';
      const raBranch  = (f === '' || f === RA_ONLY || f.startsWith(RA_TOPIC));
      const sorBranch = (f === '' || f === SOR_ALL || (f && f !== RA_ONLY && !f.startsWith(RA_TOPIC)));
      const raTopic = f.startsWith(RA_TOPIC) ? f.slice(RA_TOPIC.length) : '';
      const sorCat  = (f && f !== SOR_ALL && f !== RA_ONLY && !f.startsWith(RA_TOPIC)) ? f : '';

      const ra = !raBranch ? [] : raEntries().filter(e =>
        !raTopic || (e.raw && e.raw.ra && (e.raw.ra.topic || '') === raTopic));
      const sor = !sorBranch ? [] :
        sorItems.filter(it => it.desc && divOK(it) && (!sorCat || it.cat === sorCat)).map(it => ({
          label: it.desc.length > 150 ? it.desc.slice(0,150) + '…' : it.desc,
          meta: `SOR ${it.itemNo} · ₹ ${fmt(n(it.rate))} / ${it.unit}${it.cat ? ' · ' + it.cat.replace(/^CH-/,'CH-') : ''}`,
          search: [it.desc, it.unit, it.itemNo, it.cat].join(' '), raw: it }));
      return ra.concat(sor);
    }
    // ARC (default) — filter by mode categories + optional chip
    return items.filter(it => divOK(it) && (!MODE[est.mode] || MODE[est.mode].cats.includes(it.cat))
                          && (!catFilter || it.cat === catFilter)).map(it => ({
      label: it.desc.length > 150 ? it.desc.slice(0,150) + '…' : it.desc,
      meta: `No.${it.itemNo} · ₹ ${fmt(n(it.rate))} / ${it.unit}${it.cat ? ' · ' + it.cat : ''}`,
      search: [it.desc, it.unit, it.itemNo, it.cat].join(' '), raw: it }));
  },
  d => { const it = d.raw;
    if(it && it.ra){
      // picked from the Rate Analysis library — estimate line par poori description jaati hai
      const full = String(it.ra.longDesc || it.ra.desc || '');
      est.lines.push({ appRateNo: it.ra.itemNo || '', desc: full + (it.floor ? ' \u2014 ' + it.floor : ''),
                       shortDesc: it.ra.desc || '',
                       rate: it.rate, unit: it.ra.unit || 'Cum', cat: 'Rate Analysis',
                       raId: it.ra.id, raFloor: it.floor || null, sayOverride: null, rows:[blankRow()] });
    } else {
      est.lines.push({ appRateNo: it.itemNo || '', desc: it.desc, rate: it.rate,
                       unit: it.unit || 'MT', cat: it.cat || '', sayOverride: null, rows:[blankRow()] });
    }
    $('#itemInput').value = ''; save(); renderItemBlocks(); });

/* ------------------------------- preview ------------------------------- */
const previewData = () => ({ name: buildWorkName(), t: totals(),
  lines: est.lines.map((l, i) => ({ ...l, itemNo: i + 1, ...lineTotal(l) })) });

function renderPreview(){
  const hasProj = window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1;
  if((!hasProj && !est.road) || !est.lines.length){
    $('#previewBox').innerHTML = '<div class="empty">Pehle name aur item select karo.</div>'; return; }
  const p = previewData();
  const subSay = Math.ceil(p.t.total / 1000) * 1000;
  const totalBlock = hasProj
    ? `<tr><td colspan="5"><b>Total</b></td><td class="num mono"><b>${fmt(p.t.total)}</b></td></tr>
       <tr><td colspan="5" class="num"><b>Say</b></td><td class="num mono"><b>${fmt0(subSay)}</b></td></tr>`
    : `<tr><td colspan="5"><b>Total</b></td><td class="num mono"><b>${fmt(p.t.total)}</b></td></tr>
       <tr><td colspan="5" class="num">${est.qc} % Q C</td><td class="num mono">${fmt(p.t.qc)}</td></tr>
       <tr><td colspan="5" class="num"><b>Total</b></td><td class="num mono"><b>${fmt(p.t.grand)}</b></td></tr>
       <tr><td colspan="5" class="num"><b>Say</b></td><td class="num mono"><b>${fmt0(p.t.say)}</b></td></tr>`;
  $('#previewBox').innerHTML = `
    <h4>FACE</h4>
    <p><b>Name of Work :-</b> ${esc(p.name)}<br><br>
      Division : ${esc(office.div)}<br>Sub-Division : ${esc(office.sub)}<br>
      Service Head : R &amp; B<br>Amount : <span class="mono">Rs ${fmt(hasProj ? subSay : p.t.say)}</span><br>
      Estimate prepared by : ${esc(est.prepBy)}<br>Estimate checked by : ${esc(est.chkBy)}</p>
    <h4>abst. — Abstract</h4>
    <div class="scroll"><table class="tbl">
      <tr><th>Item No.</th><th>Qty. &amp; Unit</th><th>Item of Work</th><th>Rate</th><th>Per</th><th>Amount</th></tr>
      ${p.lines.map(l=>`<tr><td class="mono">${esc(l.itemNo)}</td>
        <td class="num mono">${fmt(l.say)} ${esc(l.unit)}</td>
        <td style="font-size:11px">${esc(l.desc.slice(0,200))}${l.desc.length>200?'…':''}</td>
        <td class="num mono">${fmt(l.apprRate)}</td><td>${esc(l.unit)}</td>
        <td class="num mono">${fmt(l.amount)}</td></tr>`).join('')}
      ${totalBlock}
    </table></div>
    <h4>MES — Measurement</h4>
    ${p.lines.map(l => { const kind = unitKind(l.unit), f = FIELDS[kind], mUnit = measuredUnit(kind), div = unitDivisor(l.unit);
      return `<p style="font-size:11px;margin:10px 0 4px"><b>Item No. ${esc(l.itemNo)}</b></p>
      <div class="scroll"><table class="tbl">
        <tr><th>Chainage</th>${f.map(k=>`<th class="num">${FLABEL[k]}</th>`).join('')}<th class="num">Qty</th><th>Unit</th></tr>
        ${l.rows.map(r=>`<tr><td>${esc(r.ch)}</td>${f.map(k=>`<td class="num mono">${r[k]===''?'':n(r[k])}</td>`).join('')}
          <td class="num mono">${fmt(rowQty(r,kind))}</td><td>${esc(mUnit)}</td></tr>`).join('')}
        <tr><td class="num"><b>Total measured</b></td>${f.map(()=>'<td></td>').join('')}<td class="num mono"><b>${fmt(l.measured)}</b></td><td>${esc(mUnit)}</td></tr>
        ${div!==1 ? `<tr><td class="num" colspan="${f.length+1}" style="color:#b3402a">÷ ${fmt0(div)} (${esc(mUnit)} → ${esc(l.unit)})</td><td class="num mono"><b>${fmt(l.qty)}</b></td><td>${esc(l.unit)}</td></tr>` : ''}
        <tr><td class="num"><b>Say</b></td>${f.map(()=>'<td></td>').join('')}<td class="num mono"><b>${fmt(l.say)}</b></td><td>${esc(l.unit)}</td></tr>
      </table></div>`; }).join('')}`;
}

/* ------------------------------- excel export (exact format) ------------------------------- */
const ARIAL = (size, bold) => ({ name:'Arial', size, bold: !!bold });
const CTR  = { horizontal:'center', vertical:'top',    wrapText:true };
const CTRC = { horizontal:'center', vertical:'center', wrapText:true };
const JUST = { horizontal:'justify', vertical:'top',   wrapText:true };
const RGT  = { horizontal:'right',   vertical:'top',   wrapText:true };
const THIN = { style:'thin' };
const BOX  = { top:THIN, left:THIN, bottom:THIN, right:THIN };
const RS_FMT = '_("Rs"* #,##0.00_);_("Rs"* \\(#,##0.00\\);_("Rs"* "-"??_);_(@_)';

function put(ws, addr, val, font, align, border, numFmt){
  const c = ws.getCell(addr);
  if(val !== undefined && val !== null) c.value = val;
  if(font) c.font = font;
  if(align) c.alignment = align;
  if(border) c.border = border;
  if(numFmt) c.numFmt = numFmt;
  return c;
}
function widths(ws, arr){ arr.forEach((w,i) => ws.getColumn(i+1).width = w); }

/* estimate the row height needed to show `text` inside a cell/merge that is
   `colChars` Excel-width-units wide, at the given font size (pt). Accounts for
   word-wrap and explicit newlines. Arial ~ 1 char ≈ 1 width-unit; a line ≈ size*1.35 pt. */
function textHeight(text, colChars, size){
  const s = String(text == null ? '' : text);
  /* width units Calibri-11 par based hain — bade font me kam chars fit hote hain */
  const perLine = Math.max(4, Math.floor(colChars * 1.14 * (11 / (size || 11))));
  let lines = 0;
  s.split(/\r?\n/).forEach(para => {
    // wrap each paragraph on word boundaries roughly by perLine
    const words = para.split(/\s+/);
    let cur = 0, used = false;
    words.forEach(w => {
      const add = (cur ? 1 : 0) + w.length;
      if(cur + add > perLine && cur > 0){ lines++; cur = w.length; }
      else cur += add;
      used = true;
    });
    lines += (cur > 0 || !used) ? 1 : 0;
  });
  lines = Math.max(1, lines);
  const lineH = size * 1.30;
  return Math.ceil(lines * lineH + 4);   // + small padding
}
/* set a single row's height to fit its text (never below `min`) */
function fitRow(ws, rowNo, text, colChars, size, min){
  ws.getRow(rowNo).height = Math.max(min || 14.25, textHeight(text, colChars, size || 11));
}

async function _buildOneSubSheets(wb, opts){
  opts = opts || {};
  const includeFace  = opts.includeFace !== false;
  const abstName     = opts.abstName    || 'abst.';
  const mesName      = opts.mesName     || 'MES ';
  const titleSuffix  = opts.titleSuffix || '';
  const noCharges    = !!opts.noCharges;   // project mode: sub abstract me QC/WC/GST nahi — wo Recap me
  const p  = previewData();
  /* In project mode the "Name of Work" comes from the parent project, and a
     sub heading (e.g. "Sub Estimate No. 1 : Main Building") sits above the
     sheet. In single mode workName falls back to the estimate's own name. */
  const workName = opts.workName || p.name;
  const subLabel = opts.subLabel || '';
  const NAME = ' Name of Work : - ' + workName + ' ';

  /* ---------- FACE (only in single-estimate mode) ---------- */
  let f = null;
  if(includeFace){
  f = wb.addWorksheet('FACE', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0 } });
  widths(f, [4.31, 28.45, 4.31, 15.10, 9.17, 18.74]);
  [40.5,24.95,24.95,24.95,24.95,24.95,24.95,24.95,60.75,82.5,14.25,28.5,27.75,21.75,24.95,24.95,36.75,93]
    .forEach((h,i) => f.getRow(i+1).height = h);
  f.mergeCells('A1:F1');  put(f, 'A1', 'ESTIMATE', ARIAL(18, true), CTR);
  const faceRows = [
    ['Division                  ', office.div], ['Sub - Division           ', office.sub],
    ['Fund Head             ', ''], ['Major Head            ', ''], ['Minor Head            ', ''],
    ['Service Head         ', 'R & B'], ['Department Head   ', '']
  ];
  faceRows.forEach(([lbl, val], i) => {
    const r = i + 2;
    put(f, 'B'+r, lbl, ARIAL(11), {vertical:'top'});
    put(f, 'C'+r, ':',  ARIAL(11), {vertical:'top'});
    if(val) put(f, 'D'+r, val, ARIAL(11), {vertical:'top'});
  });
  f.mergeCells('B9:F9');   put(f, 'B9', '                            ' + FRAMED, ARIAL(11), JUST);
  f.mergeCells('B10:F10'); put(f, 'B10', NAME, ARIAL(12, true), CTR);
  f.mergeCells('B11:F11'); put(f, 'B11', p.t.say, ARIAL(12, true), CTR, null, RS_FMT);
  // B9..F9 spans cols B-F ≈ 28.45+4.31+15.10+9.17+18.74 = 75.77 wide
  const faceWide = 75.77;
  fitRow(f, 9,  '                            ' + FRAMED, faceWide, 11, 40);
  fitRow(f, 10, NAME, faceWide, 12, 30);
  put(f, 'B12', 'Administrtively approved under No.', ARIAL(11), {vertical:'top'});
  put(f, 'B13', 'Technically sanctioned under No.',   ARIAL(11), {vertical:'top'});
  put(f, 'B14', 'Estimate prepared by    ', ARIAL(11), {vertical:'top'});
  f.mergeCells('D14:F14'); put(f, 'D14', est.prepBy, ARIAL(11), {vertical:'top'});
  put(f, 'B15', 'Estimate checked by    ', ARIAL(11), {vertical:'top'});
  f.mergeCells('D15:F15'); put(f, 'D15', est.chkBy, ARIAL(11), {vertical:'top'});
  put(f, 'B16', 'Call or Authority            ', ARIAL(11), {vertical:'top'});
  f.mergeCells('A17:F17'); put(f, 'A17', 'GENERAL DESCRIPTION', ARIAL(11, true), CTRC);
  f.mergeCells('B18:F18'); put(f, 'B18', '           ' + office.desc, ARIAL(11), JUST);
  fitRow(f, 18, '           ' + office.desc, faceWide, 11, 40);
  }
  /* ---------- abst. ---------- */
  const a = wb.addWorksheet(abstName, { pageSetup:{ paperSize:9, orientation:'portrait',
      fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.35, right:0.35, top:0.45, bottom:0.4, header:0.2, footer:0.2 } } });
  widths(a, [5.4, 8.4, 65.5, 9.4, 5.4, 12.4]);   // desc sabse chaudi, amount utni hi jitni zaroori
  a.getRow(1).height = 43.5; a.getRow(2).height = subLabel ? 18 : 9; a.getRow(3).height = 20.1;
  a.getRow(4).height = 9.75; a.getRow(5).height = 45; a.getRow(6).height = 20.1;
  a.mergeCells('A1:F1'); put(a, 'A1', NAME, ARIAL(12, true), CTRC);
  a.mergeCells('A2:F2'); if(subLabel) put(a, 'A2', subLabel, ARIAL(12, true), CTRC);
  a.mergeCells('A3:F3'); put(a, 'A3', 'ABSTRACT ', ARIAL(16, true), CTRC);
  a.mergeCells('A4:F4');
  ['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount']
    .forEach((h,i) => put(a, String.fromCharCode(65+i) + '5', h, ARIAL(12, true), CTRC, BOX));
  [1,2,3,4,5,6].forEach((v,i) => put(a, String.fromCharCode(65+i) + '6', v, ARIAL(12), CTRC, BOX));

  let r = 7;
  const amtCells = [], qtyRefCells = [];
  /* A4 portrait, fitToWidth ke baad upalabdh height (approx) — pehle page par
     title/heading rows ki height already ~150pt use ho chuki hai */
  const PAGE_PT = 770;
  let pageUsed = 150;

  /* har item = 3 row: (1) description ki apni poori row, (2) L.C., (3) Approved Rate.
     Description kisi merge me nahi hai, isliye height kam padne par bhi text
     kabhi doosre item par nahi chadhta. */
  p.lines.forEach(l => {
    /* rate loadings — only the ones that apply (E2 shows loadings present) */
    const loadings = [];
    if(n(l.gstPct) > 0) loadings.push({ lbl: fmt0(l.gstPct) + '% GST', pct: n(l.gstPct), amt: l.gstAmt });
    if(n(l.lcPct)  > 0) loadings.push({ lbl: fmt0(l.lcPct)  + '% LC',  pct: n(l.lcPct),  amt: l.lcAmt  });
    /* rows in this item block: base + each loading + approved(always) */
    const nRows = 1 + loadings.length + 1;
    const top = r, bot = r + nRows - 1;
    const apprRow = bot;                              // approved-rate row = last row
    amtCells.push('F' + top); qtyRefCells.push('B' + top);
    a.mergeCells(`A${top}:A${bot}`); a.mergeCells(`E${top}:E${bot}`); a.mergeCells(`F${top}:F${bot}`);
    a.mergeCells(`B${top+1}:B${bot}`);

    const dLen = String(l.desc || '').length;
    const dFs  = dLen > 4000 ? 8 : dLen > 2500 ? 9 : 11;

    put(a, 'A'+top, l.itemNo, ARIAL(11), CTRC, BOX);
    put(a, 'B'+top, l.say,    ARIAL(11), CTRC, BOX, '0.00');
    put(a, 'B'+(top+1), l.unit, ARIAL(11), CTRC, BOX);
    put(a, 'C'+top, l.desc,   ARIAL(dFs), JUST, BOX);
    put(a, 'D'+top, l.baseRate, ARIAL(11), CTRC, BOX, '0.00');   // base (SOR) rate
    put(a, 'E'+top, l.unit,   ARIAL(11), CTRC, BOX);
    /* amount = Say x Approved Rate (loaded) — approved rate cell = D(apprRow) */
    put(a, 'F'+top, { formula:`ROUND(B${top}*D${apprRow},2)`, result:l.amount },
        ARIAL(11), {horizontal:'right', vertical:'center', wrapText:true}, BOX, '0.00');

    /* each loading on its own row (GST, then LC) */
    const loadCells = [];
    loadings.forEach((ld, k) => {
      const rw = top + 1 + k;
      put(a, 'C'+rw, ld.lbl, ARIAL(11), CTRC, BOX);
      put(a, 'D'+rw, { formula:`ROUND(D${top}*${ld.pct}/100,2)`, result:ld.amt }, ARIAL(11), CTRC, BOX, '0.00');
      loadCells.push('D'+rw);
    });
    /* approved rate = base + all loadings */
    const apprF = loadCells.length ? `D${top}+` + loadCells.join('+') : `D${top}`;
    put(a, 'C'+apprRow, 'Approved Rate no ' + (l.appRateNo || l.itemNo), ARIAL(11), CTRC, BOX);
    put(a, 'D'+apprRow, { formula:`ROUND(${apprF},2)`, result:l.apprRate }, ARIAL(11), CTRC, BOX, '0.00');

    /* description row ki height — 15% extra margin taki text kabhi kate nahi */
    const descH = Math.ceil(textHeight(l.desc, 65.5, dFs) * 1.04);
    a.getRow(top).height = Math.max(20, descH);
    for(let rw = top + 1; rw <= bot; rw++) a.getRow(rw).height = 18;
    const blockH = a.getRow(top).height + (nRows - 1) * 18;

    if(pageUsed > 150 && pageUsed + blockH > PAGE_PT){
      a.getRow(top - 1).addPageBreak();       // break item se THEEK pehle
      pageUsed = 0;
    }
    pageUsed += blockH;
    r = bot + 1;
  });
  const sumF = amtCells.length ? 'ROUND(' + amtCells.join('+') + ',2)' : '0';
  let rSay;
  if(noCharges){
    /* sub-estimate abstract (project mode): sirf Total -> Say. QC/WC/GST Recap me. */
    const rTot = r; rSay = r + 2;
    a.mergeCells(`A${rTot}:E${rTot}`);
    put(a, 'A'+rTot, 'Total', ARIAL(11, true), RGT, BOX);
    put(a, 'F'+rTot, { formula:sumF, result:p.t.total }, ARIAL(11, true), RGT, BOX, '0.00');
    a.mergeCells(`A${rSay}:E${rSay}`);
    put(a, 'A'+rSay, 'Say', ARIAL(11, true), RGT, BOX);
    put(a, 'F'+rSay, { formula:`CEILING(F${rTot},1000)`, result:Math.ceil(p.t.total/1000)*1000 },
        ARIAL(11, true), RGT, BOX, '0.00');
    a.abstSayCell = 'F' + rSay;
    for(let i = rTot; i <= rSay; i++) a.getRow(i).height = 14.25;
  } else {
    /* single-estimate abstract (legacy): Total -> QC% -> Grand -> Say */
    const rTot = r, rQc = r + 1, rGrand = r + 2; rSay = r + 4;
    a.mergeCells(`A${rTot}:E${rTot}`);
    put(a, 'A'+rTot, 'Total', ARIAL(11, true), RGT, BOX);
    put(a, 'F'+rTot, { formula:sumF, result:p.t.total }, ARIAL(11, true), RGT, BOX, '0.00');
    put(a, 'D'+rQc, est.qc + ' % Q C', ARIAL(11, true), RGT, {top:THIN, bottom:THIN});
    put(a, 'F'+rQc, { formula:`ROUND(F${rTot}*${n(est.qc)}/100,2)`, result:p.t.qc }, ARIAL(11, true), RGT, BOX, '0.00');
    put(a, 'E'+rGrand, 'Total', ARIAL(11, true), RGT, {top:THIN, bottom:THIN});
    put(a, 'F'+rGrand, { formula:`ROUND(F${rTot}+F${rQc},2)`, result:p.t.grand }, ARIAL(11, true), RGT, BOX, '0.00');
    a.mergeCells(`A${rSay}:E${rSay}`);
    put(a, 'A'+rSay, 'Say', ARIAL(11, true), RGT, BOX);
    put(a, 'F'+rSay, { formula:`CEILING(F${rGrand},1000)`, result:p.t.say }, ARIAL(11, true), RGT, BOX, '0.00');
    a.abstSayCell = 'F' + rSay;
    for(let i = rTot; i <= rSay; i++) a.getRow(i).height = 14.25;
  }
  const sg = rSay + 8;
  (typeof abstSignBlock === 'function' ? abstSignBlock() : ['Deputy Executive Engineer','R&B Sub Division','Dahod'])
    .forEach((t,i) => { a.mergeCells(`D${sg+i}:F${sg+i}`); put(a, 'D'+(sg+i), t, ARIAL(12), CTRC); });

  /* FACE ka amount abstract ke Say se juda rahe */
  if(includeFace && f){
    put(f, 'B11', { formula:`'${abstName}'!${a.abstSayCell}`, result:p.t.say }, ARIAL(12, true), CTR, null, RS_FMT);
  }

  /* ---------- MES ---------- */
  const m = wb.addWorksheet(mesName, { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0 } });
  widths(m, [12.14, 4.99, 12.41, 8.09, 2.56, 9.57, 2.56, 9.84, 2.43, 10.11, 3.10, 9.44, 13.08, 7.95]);
  m.getRow(1).height = 15; m.getRow(2).height = 42; m.getRow(3).height = subLabel ? 20 : 21; m.getRow(4).height = 20.25;
  m.mergeCells('A1:N2'); put(m, 'A1', NAME, ARIAL(16), CTR);
  m.mergeCells('A3:N3'); if(subLabel) put(m, 'A3', subLabel, ARIAL(12, true), {horizontal:'center'});
  m.mergeCells('A4:N4'); put(m, 'A4', 'MEASUREMENT', ARIAL(16, true), {horizontal:'center'});

  const mesSayCells = [];
  const COLS = { nos:'D', len:'F', wid:'H', thk:'J', den:'L' };
  const XCOL = { nos:'E', len:'G', wid:'I', thk:'K' };
  const mesWide = 108.27;   // A:N total width units
  let mr = 6;
  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind], mUnit = measuredUnit(kind), div = unitDivisor(l.unit);
    put(m, 'A'+mr, 'Item No.', ARIAL(12, true), {horizontal:'center'});
    put(m, 'B'+mr, l.itemNo,   ARIAL(12, true), {horizontal:'center'});
    mr++;
    m.mergeCells(`A${mr}:N${mr}`); put(m, 'A'+mr, l.desc, ARIAL(12), JUST);
    fitRow(m, mr, l.desc, mesWide, 12, 18); mr++;
    put(m, 'A'+mr, 'Chainage ', ARIAL(12, true), {horizontal:'center'});
    fl.forEach(k => put(m, COLS[k] + mr, FLABEL[k], ARIAL(12, true), {horizontal:'center'}));
    mr++;
    m.mergeCells(`A${mr}:E${mr}`);
    if(fl.includes('thk')) put(m, 'J'+mr, 'Avg.', ARIAL(12), {horizontal:'center'});
    mr++;
    const qtyCells = [];
    l.rows.forEach(row => {
      m.mergeCells(`A${mr}:C${mr}`);
      put(m, 'A'+mr, row.ch, ARIAL(12), CTRC);
      fl.forEach((k, i) => {
        put(m, COLS[k] + mr, n(row[k]), ARIAL(12), CTRC);
        if(i < fl.length - 1) put(m, XCOL[k] + mr, 'x', ARIAL(12), CTRC);
      });
      /* Qty = Nos x Length x Width x Thick … (formula) */
      const prod = fl.map(k => COLS[k] + mr).join('*');
      qtyCells.push('M' + mr);
      put(m, 'M'+mr, { formula:`ROUND(${prod},2)`, result:r2(rowQty(row, kind)) }, ARIAL(12), CTRC, null, '0.00');
      put(m, 'N'+mr, mUnit, ARIAL(12), CTRC);
      fitRow(m, mr, row.ch || '', 29.5, 12, 18); mr++;   // fit chainage text, min 18pt
    });
    const sumQ = qtyCells.length ? `ROUND(SUM(${qtyCells[0]}:${qtyCells[qtyCells.length-1]}),2)` : '0';
    put(m, 'L'+mr, div !== 1 ? 'Total ('+mUnit+')' : 'Total', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, { formula:sumQ, result:l.measured }, ARIAL(12, true), CTRC, null, '0.00');
    put(m, 'N'+mr, mUnit, ARIAL(12, true), CTRC);
    const measRow = mr; mr++;
    let qtyRow = measRow;
    if(div !== 1){
      put(m, 'L'+mr, '÷ '+fmt0(div), ARIAL(12, true), CTRC);
      put(m, 'M'+mr, { formula:`ROUND(M${measRow}/${div},4)`, result:l.qty }, ARIAL(12, true), CTRC, null, '0.0000');
      put(m, 'N'+mr, l.unit, ARIAL(12, true), CTRC); qtyRow = mr; mr++;
    }
    put(m, 'L'+mr, 'Say', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, (l.sayOverride == null || l.sayOverride === '')
        ? { formula:`CEILING(M${qtyRow},0.1)`, result:l.say } : l.say,
        ARIAL(12, true), CTRC, null, '0.00');
    put(m, 'N'+mr, l.unit, ARIAL(12, true), CTRC);
    mesSayCells.push('M' + mr);
    if(p.lines.length === 1) put(m, 'P'+mr, p.t.say, ARIAL(12, true), CTRC, null, '0.00');
    mr += 2;
  });
  /* abstract ki Qty = MES ka Say (formula) */
  qtyRefCells.forEach((cell, i) => {
    if(!mesSayCells[i]) return;
    const c = a.getCell(cell);
    c.value = { formula:`'${mesName}'!${mesSayCells[i]}`, result:p.lines[i].say };
  });

  if(p.lines.length > 1){
    put(m, 'L'+mr, 'Estimate Say', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, p.t.say, ARIAL(12, true), CTRC, null, '0.00');
  }
}

/* ---- project-aware wrapper ------------------------------------------------
   Agar project.subs me multiple sub-estimates hain, to Face/GD/Performa/RCC
   parent level pe pehle aayenge, phir har sub ke apne abst_<i>+MES_<i>, and
   Recap sheet last me. Warna purana behaviour (single Face+abst+MES).
------------------------------------------------------------------------- */
async function buildWorkbook(){
  const wb = new ExcelJS.Workbook();
  wb.creator = 'R&B Sub Division, Dahod';
  const hasProj = window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1;

  if(hasProj){
    /* stash current est back to active slot so live edits are captured */
    const savedEst = JSON.parse(JSON.stringify(est));
    const savedIdx = window.project.active;
    if(window.project.subs[savedIdx]) window.project.subs[savedIdx].est = savedEst;

    /* parent identity sheets first */
    if(typeof projFaceSheet     === 'function') projFaceSheet(wb);
    if(typeof projGDSheet       === 'function') projGDSheet(wb);
    if(typeof projPerformaSheet === 'function') projPerformaSheet(wb);
    if(typeof projRCCSheet      === 'function') projRCCSheet(wb);

    /* Recap sits right after RCC calc — before the first sub-estimate */
    if(typeof projRecapSheet === 'function') projRecapSheet(wb);

    /* per-sub abst + MES + RA (RA immediately after that sub's MES) */
    const projWorkName = (typeof projName === 'function' ? projName() : '');
    for(let i = 0; i < window.project.subs.length; i++){
      const sub = window.project.subs[i];
      est = JSON.parse(JSON.stringify(sub.est));
      /* Excel sheet names: max 31 chars, cannot contain :\/?*[] */
      const cleanN = String(sub.name || ('Sub ' + (i+1))).replace(/[:\\/?*\[\]]/g, ' ').slice(0, 18);
      await _buildOneSubSheets(wb, {
        includeFace: false,
        noCharges:   true,
        abstName:    ('abst.' + (i+1) + ' ' + cleanN).slice(0, 30).trim(),
        mesName:     ('MES ' + (i+1) + ' ' + cleanN).slice(0, 30).trim(),
        titleSuffix: sub.name || ('Sub ' + (i+1)),
        workName:    projWorkName,
        subLabel:    'Sub Estimate No. ' + (i+1) + ' :  ' + (sub.name || ('Sub ' + (i+1)))
      });
      /* RA used in this sub — placed directly after its measurement sheet */
      if(window.RA && typeof window.RA.addUsedRASheet === 'function'){
        const nm = (typeof projName === 'function' ? projName() : '');
        window.RA.addUsedRASheet(
          wb,
          ('RA ' + (i+1) + ' ' + cleanN).slice(0, 30).trim(),
          (nm ? 'Name of Work : - ' + nm : '') + '   [' + (sub.name || ('Sub ' + (i+1))) + ']'
        );
      }
    }
    /* restore */
    est = savedEst;
  } else {
    await _buildOneSubSheets(wb, { includeFace: true });
  }

  return wb;
}

/* Abstract sheet ka signature hamesha Deputy Executive Engineer ka —
   chahe logged-in profile ka post kuch bhi ho (AE, DEE, etc). Sub-division
   aur place profile se aate hain. */
function abstSignBlock(){
  let b = (typeof signBlock === 'function')
        ? signBlock().slice()
        : ['Deputy Executive Engineer', 'R & B Sub Division,', 'Dahod.'];
  b[0] = 'Deputy Executive Engineer';
  return b;
}
function safeName(){
  if(window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1 && typeof projName === 'function'){
    const pn = String(projName() || 'Project').replace(/[^\w\- ]+/g,'').replace(/\s+/g,'_').slice(0,60);
    return pn || 'Project';
  }
  const first = (est.roadList && est.roadList[0]) || {};
  const wc = first.wcFrom || first.wcTo;
  return (est.road || first.name || 'Estimate').replace(/[^\w\- ]+/g,'').replace(/\s+/g,'_').slice(0,55)
    + (wc ? '_' + ((first.wcFrom||'') + '-' + (first.wcTo||'')).replace(/\//g,'.') : '');
}
function download(blob, name){
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click();
  a.remove(); setTimeout(()=> URL.revokeObjectURL(url), 4000);
}
$('#btnXlsx').onclick = async () => {
  const hasProj = window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1;
  if(!hasProj && (!est.road || !est.lines.length)){
    toast('Name aur kam se kam ek item select karo.'); return;
  }
  const b = $('#btnXlsx'); b.disabled = true; b.textContent = 'Building…';
  try{
    const wb = await buildWorkbook();
    const buf = await wb.xlsx.writeBuffer();
    download(new Blob([buf], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), safeName() + '.xlsx');
  }catch(err){ toast('Excel banane me dikkat: ' + err.message); }
  b.disabled = false; b.textContent = 'Download Excel';
};

/* ---- helper: draws only abst.+MES pages for the CURRENT est into an
        existing jsPDF doc (caller manages est swap + addPage). Used by
        project-mode PDF export where each sub-estimate contributes one
        abst+MES appendix. Mirrors the abst/MES sections of btnPdf below. */
function _drawAbstAndMesPDF(doc, subName, workName, subNo){
  const p = previewData();
  const GRID = { font:'helvetica', fontSize:8, cellPadding:3, lineColor:[0,0,0], lineWidth:0.5,
                 textColor:[0,0,0], valign:'middle', overflow:'linebreak' };
  const HEAD = { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center',
                 lineColor:[0,0,0], lineWidth:0.5 };
  const wName    = workName || p.name;
  const subHead  = subNo ? ('Sub Estimate No. ' + subNo + ' :  ' + (subName || ('Sub ' + subNo)))
                         : (subName ? String(subName) : '');
  function sheetTitle(title, W, M){
    const y0 = 46; doc.setFont('helvetica','bold'); doc.setFontSize(9);
    const nm = doc.splitTextToSize('Name of Work : - ' + wName, W - 2*M);
    doc.text(nm, W/2, y0, {align:'center'});
    let y1 = y0 + nm.length*11 + 4;
    if(subHead){
      doc.setFontSize(9); doc.text(subHead, W/2, y1, {align:'center'}); y1 += 13;
    }
    doc.setFontSize(14); doc.text(title, W/2, y1, {align:'center'});
    return y1 + 14;
  }
  function signature(y, xCenter, forceBlock){
    doc.setFont('helvetica','normal'); doc.setFontSize(9);
    const sb = forceBlock || (typeof signBlock === 'function' ? signBlock()
                : ['Deputy Executive Engineer','R & B Sub Division,','Dahod.']);
    sb.forEach((t,i) => { if(t) doc.text(String(t), xCenter, y + i*12, {align:'center'}); });
  }
  /* ------- abst. ------- */
  let W = doc.internal.pageSize.getWidth(), M = 40;
  let y = sheetTitle('ABSTRACT', W, M);
  const A_HEAD = ['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount'];
  const A_COLS = { 0:{cellWidth:28, halign:'center'}, 1:{cellWidth:42, halign:'center'},
                   2:{cellWidth:309}, 3:{cellWidth:46, halign:'center'},
                   4:{cellWidth:26, halign:'center'}, 5:{cellWidth:64, halign:'right'} };
  const PH = doc.internal.pageSize.getHeight(), BOT = 60;
  const itemRows = l => {
    const loads = [];
    if(n(l.gstPct) > 0) loads.push([fmt0(l.gstPct) + '% GST', fmt(l.gstAmt)]);
    if(n(l.lcPct)  > 0) loads.push([fmt0(l.lcPct)  + '% LC',  fmt(l.lcAmt)]);
    const N = 1 + loads.length + 1;                 // base row + loadings + approved row
    const rows = [];
    rows.push([
      { content:String(l.itemNo), rowSpan:N, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.say),       styles:{halign:'center'} },
      { content:l.desc,           styles:{halign:'left', valign:'top'} },
      { content:fmt(l.baseRate),  styles:{halign:'center', valign:'middle'} },
      { content:l.unit, rowSpan:N, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.amount), rowSpan:N, styles:{halign:'right', valign:'middle'} }
    ]);
    const tail = loads.slice();
    tail.push(['Approved Rate no ' + (l.appRateNo || l.itemNo), fmt(l.apprRate)]);
    const tailCount = tail.length;                  // = N-1
    tail.forEach((t, idx) => {
      const row = [];
      if(idx === 0) row.push({ content:l.unit, rowSpan:tailCount, styles:{halign:'center', valign:'middle'} });
      row.push({ content:t[0], styles:{halign:'center'} });
      row.push({ content:t[1], styles:{halign:'center'} });
      rows.push(row);
    });
    return rows;
  };
  const blockRowCount = l => {
    let c = 2;                                       // base + approved
    if(n(l.gstPct) > 0) c++;
    if(n(l.lcPct)  > 0) c++;
    return c;
  };
  const blockH = l => {
    doc.setFont('helvetica','normal'); doc.setFontSize(GRID.fontSize);
    const lines = doc.splitTextToSize(String(l.desc || ''), A_COLS[2].cellWidth - 2*GRID.cellPadding).length;
    const rowH = GRID.fontSize + 2*GRID.cellPadding + 2;
    const N = blockRowCount(l);
    return Math.max(N * rowH, lines * (GRID.fontSize * 1.15) + 2*GRID.cellPadding) + (N - 1) * rowH;
  };
  const drawRows = (rows, needHead) => {
    doc.autoTable({ startY:y, margin:{left:M, right:M}, theme:'grid',
      head: needHead ? [A_HEAD, ['1','2','3','4','5','6']] : [],
      body: rows, styles:GRID, headStyles:HEAD, columnStyles:A_COLS, rowPageBreak:'avoid' });
    y = doc.lastAutoTable.finalY;
  };
  let needHead = true;
  p.lines.forEach(l => {
    const h = blockH(l);
    if(y + h > PH - BOT){
      doc.addPage('a4','portrait');
      y = sheetTitle('ABSTRACT', W, M);
      needHead = true;
    }
    drawRows(itemRows(l), needHead);
    needHead = false;
  });
  const B = fs => ({ fontStyle:'bold' , halign:'right', ...fs });
  /* sub-estimate abstract (project mode): sirf Total -> Say. QC/WC/GST Recap me. */
  const subSay = Math.ceil(p.t.total / 1000) * 1000;
  const totRows = [
    [ { content:'Total', colSpan:5, styles:B() }, { content:fmt(p.t.total), styles:B() } ],
    [ { content:'Say', colSpan:5, styles:B() }, { content:fmt0(subSay), styles:B() } ]
  ];
  if(y + 5 * (GRID.fontSize + 2*GRID.cellPadding + 2) > PH - BOT){
    doc.addPage('a4','portrait'); y = sheetTitle('ABSTRACT', W, M); needHead = true;
  }
  drawRows(totRows, needHead);
  signature(doc.lastAutoTable.finalY + 44, M + 390, (typeof abstSignBlock === 'function' ? abstSignBlock() : null));

  /* ------- MES ------- */
  doc.addPage('a4','portrait');
  W = doc.internal.pageSize.getWidth(); M = 34;
  y = sheetTitle('MEASUREMENT', W, M);
  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind], mUnit = measuredUnit(kind), div = unitDivisor(l.unit);
    if(y > doc.internal.pageSize.getHeight() - 120){ doc.addPage('a4','portrait'); y = sheetTitle('MEASUREMENT', W, M); }
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('Item No. ' + l.itemNo, M, y); y += 12;
    doc.setFont('helvetica','normal'); doc.setFontSize(8);
    const d = doc.splitTextToSize(l.desc, W - 2*M); doc.text(d, M, y, {maxWidth:W - 2*M, align:'justify'}); y += d.length*9 + 6;
    const cols = [{t:'chain'}];
    fl.forEach((k,i) => { cols.push({t:'field', k}); if(i < fl.length - 1) cols.push({t:'x'}); });
    cols.push({t:'qty'}); cols.push({t:'unit'});
    const header = cols.map(c => c.t==='chain'?'Chainage':c.t==='field'?FLABEL[c.k]:c.t==='x'?'':c.t==='qty'?'Qty':'Unit');
    const preQty = cols.length - 2;
    const body = l.rows.map(row => cols.map(c => {
      if(c.t==='chain') return { content:row.ch || '', styles:{halign:'left'} };
      if(c.t==='field') return { content:row[c.k]===''?'':String(n(row[c.k])), styles:{halign:'center'} };
      if(c.t==='x')     return { content:'x', styles:{halign:'center'} };
      if(c.t==='qty')   return { content:fmt(rowQty(row, kind)), styles:{halign:'center'} };
      return { content:mUnit, styles:{halign:'center'} };
    }));
    body.push([ { content: div!==1 ? 'Total ('+mUnit+')' : 'Total', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.measured), styles:{halign:'center', fontStyle:'bold'} },
                { content:mUnit, styles:{halign:'center', fontStyle:'bold'} } ]);
    if(div !== 1){
      body.push([ { content:'÷ '+fmt0(div)+' ('+mUnit+' -> '+l.unit+')', colSpan:preQty, styles:{halign:'right', fontStyle:'bold', textColor:[179,64,42]} },
                  { content:fmt(l.qty), styles:{halign:'center', fontStyle:'bold'} },
                  { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);
    }
    body.push([ { content:'Say', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.say), styles:{halign:'center', fontStyle:'bold'} },
                { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);
    const usable = W - 2*M, xW = 9, qtyW = 54, unitW = 38, chainW = 96;
    const fieldW = Math.max(28, (usable - chainW - qtyW - unitW - xW*(fl.length-1) - 1) / fl.length);
    const colStyles = {};
    cols.forEach((c,i) => colStyles[i] = { cellWidth:
      c.t==='chain'?chainW : c.t==='x'?xW : c.t==='qty'?qtyW : c.t==='unit'?unitW : fieldW });
    doc.autoTable({ startY:y, margin:{left:M, right:M}, theme:'grid',
      head:[header], body, styles:{...GRID, fontSize:7, cellPadding:2}, headStyles:HEAD, columnStyles:colStyles });
    y = doc.lastAutoTable.finalY + 16;
  });
  signature(y + 12, W - M - 130);
}

/* ------------------------------- pdf export (mirrors the Excel sheets) ------------------------------- */
$('#btnPdf').onclick = () => {
  const hasProj = window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1;
  if(!hasProj && (!est.road || !est.lines.length)){
    toast('Name aur kam se kam ek item select karo.'); return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4', orientation:'portrait' });

  /* project mode: parent pages first (Face/GD/Performa/RCC/Recap), then
     an appendix of abst+MES per sub-estimate. Each sub swaps est temporarily. */
  if(hasProj){
    const savedEst = JSON.parse(JSON.stringify(est));
    if(typeof projPDFPages === 'function') projPDFPages(doc);
    const projWorkName = (typeof projName === 'function' ? projName() : '');
    window.project.subs.forEach((sub, idx) => {
      est = JSON.parse(JSON.stringify(sub.est));
      if(!est.lines || !est.lines.length) return;
      doc.addPage('a4','portrait');
      _drawAbstAndMesPDF(doc, sub.name || ('Sub ' + (idx+1)), projWorkName, idx+1);
      /* RA used in this sub — right after its measurement sheet */
      if(window.RA && typeof window.RA.appendEstimateRA === 'function'){
        window.RA.appendEstimateRA(doc,
          (projWorkName ? 'Name of Work : - ' + projWorkName : 'Rate Analysis') + '   [Sub Estimate No. ' + (idx+1) + ' : ' + (sub.name || ('Sub ' + (idx+1))) + ']');
      }
    });
    est = savedEst;
    doc.save(safeName() + '.pdf');
    return;
  }

  /* single-estimate mode (legacy) */
  const p = previewData();
  const GRID = { font:'helvetica', fontSize:8, cellPadding:3, lineColor:[0,0,0], lineWidth:0.5,
                 textColor:[0,0,0], valign:'middle', overflow:'linebreak' };
  const HEAD = { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center',
                 lineColor:[0,0,0], lineWidth:0.5 };

  /* ---- centered title above a sheet ---- */
  function sheetTitle(title, W, M){
    const y0 = 46;
    doc.setFont('helvetica','bold'); doc.setFontSize(9);
    const nm = doc.splitTextToSize('Name of Work : - ' + p.name, W - 2*M);
    doc.text(nm, W/2, y0, {align:'center'});
    const y1 = y0 + nm.length*11 + 6;
    doc.setFontSize(14); doc.text(title, W/2, y1, {align:'center'});
    return y1 + 14;
  }
  function signature(y, xCenter, forceBlock){
    doc.setFont('helvetica','normal'); doc.setFontSize(9);
    const sb = forceBlock || (typeof signBlock === 'function' ? signBlock()
                : ['Deputy Executive Engineer','R & B Sub Division,','Dahod.']);
    sb.forEach((t,i) => { if(t) doc.text(String(t), xCenter, y + i*12, {align:'center'}); });
  }

  /* ================= FACE (portrait, text only — no grid, like Excel) ================= */
  let W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 46;
  doc.setFont('helvetica','bold'); doc.setFontSize(18);
  doc.text('ESTIMATE', W/2, 60, {align:'center'});
  let y = 92; const lx = M + 6, cx = M + 150, vx = M + 165, lh = 20;
  doc.setFontSize(11);
  [['Division', office.div], ['Sub - Division', office.sub], ['Fund Head',''],
   ['Major Head',''], ['Minor Head',''], ['Service Head','R & B'], ['Department Head','']]
   .forEach(([lbl,val]) => {
     doc.setFont('helvetica','normal');
     doc.text(lbl, lx, y); doc.text(':', cx, y);
     if(val) doc.text(String(val), vx, y);
     y += lh;
   });
  y += 6;
  doc.setFont('helvetica','normal'); doc.setFontSize(10);
  const framed = doc.splitTextToSize('        ' + FRAMED, W - 2*M);
  doc.text(framed, M, y, {maxWidth:W - 2*M, align:'justify'}); y += framed.length*13 + 8;
  doc.setFont('helvetica','bold'); doc.setFontSize(11);
  const nmF = doc.splitTextToSize('Name of Work : - ' + p.name, W - 2*M);
  doc.text(nmF, W/2, y, {align:'center'}); y += nmF.length*14 + 6;
  doc.setFontSize(12); doc.text('Rs. ' + fmt0(p.t.say), W/2, y, {align:'center'}); y += 24;
  doc.setFont('helvetica','normal'); doc.setFontSize(11);
  doc.text('Administrtively approved under No.', lx, y); y += lh;
  doc.text('Technically sanctioned under No.',   lx, y); y += lh;
  doc.text('Estimate prepared by', lx, y); doc.text(':', cx, y); if(est.prepBy) doc.text(String(est.prepBy), vx, y); y += lh;
  doc.text('Estimate checked by',  lx, y); doc.text(':', cx, y); if(est.chkBy)  doc.text(String(est.chkBy),  vx, y); y += lh;
  doc.text('Call or Authority', lx, y); y += lh + 8;
  doc.setFont('helvetica','bold'); doc.text('GENERAL DESCRIPTION', W/2, y, {align:'center'}); y += 16;
  doc.setFont('helvetica','normal'); doc.setFontSize(10);
  const gd = doc.splitTextToSize('        ' + office.desc, W - 2*M);
  doc.text(gd, M, y, {maxWidth:W - 2*M, align:'justify'});

  /* ================= abst. (portrait, gridded) ================= */
  doc.addPage('a4','portrait');
  W = doc.internal.pageSize.getWidth(); M = 40;
  y = sheetTitle('ABSTRACT', W, M);

  /* ek item = 5 row ka block. Har block alag table me chhapta hai taki
     page badalne par item beech me se na kate. */
  const A_HEAD = ['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount'];
  const A_COLS = { 0:{cellWidth:28, halign:'center'}, 1:{cellWidth:42, halign:'center'},
                   2:{cellWidth:309}, 3:{cellWidth:46, halign:'center'},
                   4:{cellWidth:26, halign:'center'}, 5:{cellWidth:64, halign:'right'} };
  /* har item apne table me — page badalte waqt item kabhi beech se nahi katega */
  const PH = doc.internal.pageSize.getHeight(), BOT = 60;
  const itemRows = l => {
    const loads = [];
    if(n(l.gstPct) > 0) loads.push([fmt0(l.gstPct) + '% GST', fmt(l.gstAmt)]);
    if(n(l.lcPct)  > 0) loads.push([fmt0(l.lcPct)  + '% LC',  fmt(l.lcAmt)]);
    const N = 1 + loads.length + 1;
    const rows = [];
    rows.push([
      { content:String(l.itemNo), rowSpan:N, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.say),       styles:{halign:'center'} },
      { content:l.desc,           styles:{halign:'left', valign:'top'} },
      { content:fmt(l.baseRate),  styles:{halign:'center', valign:'middle'} },
      { content:l.unit, rowSpan:N, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.amount), rowSpan:N, styles:{halign:'right', valign:'middle'} }
    ]);
    const tail = loads.slice();
    tail.push(['Approved Rate no ' + (l.appRateNo || l.itemNo), fmt(l.apprRate)]);
    const tailCount = tail.length;
    tail.forEach((t, idx) => {
      const row = [];
      if(idx === 0) row.push({ content:l.unit, rowSpan:tailCount, styles:{halign:'center', valign:'middle'} });
      row.push({ content:t[0], styles:{halign:'center'} });
      row.push({ content:t[1], styles:{halign:'center'} });
      rows.push(row);
    });
    return rows;
  };
  const blockRowCount = l => {
    let c = 2;
    if(n(l.gstPct) > 0) c++;
    if(n(l.lcPct)  > 0) c++;
    return c;
  };
  const blockH = l => {
    doc.setFont('helvetica','normal'); doc.setFontSize(GRID.fontSize);
    const lines = doc.splitTextToSize(String(l.desc || ''), A_COLS[2].cellWidth - 2*GRID.cellPadding).length;
    const rowH = GRID.fontSize + 2*GRID.cellPadding + 2;
    const N = blockRowCount(l);
    return Math.max(N * rowH, lines * (GRID.fontSize * 1.15) + 2*GRID.cellPadding) + (N - 1) * rowH;
  };
  const drawRows = (rows, needHead) => {
    doc.autoTable({ startY:y, margin:{left:M, right:M}, theme:'grid',
      head: needHead ? [A_HEAD, ['1','2','3','4','5','6']] : [],
      body: rows, styles:GRID, headStyles:HEAD, columnStyles:A_COLS, rowPageBreak:'avoid' });
    y = doc.lastAutoTable.finalY;
  };
  let needHead = true;
  p.lines.forEach(l => {
    const h = blockH(l);
    if(y + h > PH - BOT){                      // is page par item nahi samayega
      doc.addPage('a4','portrait');
      y = sheetTitle('ABSTRACT', W, M);
      needHead = true;
    }
    drawRows(itemRows(l), needHead);
    needHead = false;
  });

  const B = fs => ({ fontStyle:'bold' , halign:'right', ...fs });
  const totRows = [
    [ { content:'Total', colSpan:5, styles:B() }, { content:fmt(p.t.total), styles:B() } ],
    [ { content:'', colSpan:3, styles:{} }, { content:est.qc + ' % Q C', colSpan:2, styles:B() }, { content:fmt(p.t.qc), styles:B() } ],
    [ { content:'', colSpan:4, styles:{} }, { content:'Total', styles:B() }, { content:fmt(p.t.grand), styles:B() } ],
    [ { content:'Say', colSpan:5, styles:B() }, { content:fmt0(p.t.say), styles:B() } ]
  ];
  if(y + 5 * (GRID.fontSize + 2*GRID.cellPadding + 2) > PH - BOT){
    doc.addPage('a4','portrait'); y = sheetTitle('ABSTRACT', W, M); needHead = true;
  }
  drawRows(totRows, needHead);

  signature(doc.lastAutoTable.finalY + 44, M + 390, (typeof abstSignBlock === 'function' ? abstSignBlock() : null));   // right side (under Rate/Per/Amount block)

  /* ================= MES (portrait, gridded) ================= */
  doc.addPage('a4','portrait');
  W = doc.internal.pageSize.getWidth(); M = 34;
  y = sheetTitle('MEASUREMENT', W, M);

  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind], mUnit = measuredUnit(kind), div = unitDivisor(l.unit);
    if(y > doc.internal.pageSize.getHeight() - 120){ doc.addPage('a4','portrait'); y = sheetTitle('MEASUREMENT', W, M); }
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('Item No. ' + l.itemNo, M, y); y += 12;
    doc.setFont('helvetica','normal'); doc.setFontSize(8);
    const d = doc.splitTextToSize(l.desc, W - 2*M); doc.text(d, M, y, {maxWidth:W - 2*M, align:'justify'}); y += d.length*9 + 6;

    // build columns: Chainage | (field | x)... | Qty | Unit
    const cols = [{t:'chain'}];
    fl.forEach((k,i) => { cols.push({t:'field', k}); if(i < fl.length - 1) cols.push({t:'x'}); });
    cols.push({t:'qty'}); cols.push({t:'unit'});
    const header = cols.map(c => c.t==='chain'?'Chainage':c.t==='field'?FLABEL[c.k]:c.t==='x'?'':c.t==='qty'?'Qty':'Unit');
    const preQty = cols.length - 2;

    const body = l.rows.map(row => cols.map(c => {
      if(c.t==='chain') return { content:row.ch || '', styles:{halign:'left'} };
      if(c.t==='field') return { content:row[c.k]===''?'':String(n(row[c.k])), styles:{halign:'center'} };
      if(c.t==='x')     return { content:'x', styles:{halign:'center'} };
      if(c.t==='qty')   return { content:fmt(rowQty(row, kind)), styles:{halign:'center'} };
      return { content:mUnit, styles:{halign:'center'} };
    }));
    body.push([ { content: div!==1 ? 'Total ('+mUnit+')' : 'Total', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.measured), styles:{halign:'center', fontStyle:'bold'} },
                { content:mUnit, styles:{halign:'center', fontStyle:'bold'} } ]);
    if(div !== 1){
      body.push([ { content:'÷ '+fmt0(div)+' ('+mUnit+' -> '+l.unit+')', colSpan:preQty, styles:{halign:'right', fontStyle:'bold', textColor:[179,64,42]} },
                  { content:fmt(l.qty), styles:{halign:'center', fontStyle:'bold'} },
                  { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);
    }
    body.push([ { content:'Say', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.say), styles:{halign:'center', fontStyle:'bold'} },
                { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);

    // portrait fit: usable ≈ 527pt. Thin separators, compact chainage/qty/unit.
    const usable = W - 2*M, xW = 9, qtyW = 54, unitW = 38, chainW = 96;
    const fieldW = Math.max(28, (usable - chainW - qtyW - unitW - xW*(fl.length-1) - 1) / fl.length);
    const colStyles = {};
    cols.forEach((c,i) => colStyles[i] = { cellWidth:
      c.t==='chain'?chainW : c.t==='x'?xW : c.t==='qty'?qtyW : c.t==='unit'?unitW : fieldW });

    doc.autoTable({ startY:y, margin:{left:M, right:M}, theme:'grid',
      head:[header], body, styles:{...GRID, fontSize:7, cellPadding:2}, headStyles:HEAD, columnStyles:colStyles });
    y = doc.lastAutoTable.finalY + 16;
  });
  signature(y + 12, W - M - 130);

  doc.save(safeName() + '.pdf');
};

/* ------------------------------- saved estimates (localStorage) ------------------------------- */
let savedEstimates = store.get('rnb_saved', null) || [];
let currentSavedId = null;   // if the loaded estimate came from a saved record

function persistSaved(){ store.set('rnb_saved', savedEstimates); }
function estStamp(){ return new Date().toISOString(); }
function prettyDate(iso){
  try{ const d = new Date(iso);
    return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) + ' ' +
           d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  }catch(e){ return iso; }
}

$('#btnSave').onclick = () => {
  const hasProj = window.project && Array.isArray(window.project.subs) && window.project.subs.length >= 1;
  if(!hasProj && !est.lines.length && !est.road){ toast('Pehle estimate banao, phir save karo.'); return; }
  const projNm = (hasProj && typeof projName === 'function') ? projName() : '';
  const defName = projNm || (buildWorkName() === '—' ? (est.road || 'Estimate') : buildWorkName());
  const name = prompt('Estimate ka naam (save ke liye):', currentSavedId
    ? (savedEstimates.find(s=>s.id===currentSavedId)?.name || defName)
    : defName);
  if(name === null) return;   // cancelled
  const nm = (name || defName).trim() || defName;

  /* keep the currently-being-edited est in the active project slot so
     the snapshot below picks it up */
  if(hasProj && typeof projSave === 'function') projSave();

  const projSnap = hasProj ? JSON.parse(JSON.stringify(window.project)) : null;
  const projAmt  = hasProj && typeof projBuildRecap === 'function' ? projBuildRecap().say : 0;

  const snapshot = JSON.parse(JSON.stringify(est));   // deep copy of active est
  const t = totals();
  const amountForList = hasProj ? projAmt : t.say;

  if(currentSavedId){
    const rec = savedEstimates.find(s => s.id === currentSavedId);
    if(rec){
      rec.name = nm; rec.est = snapshot; rec.updated = estStamp();
      rec.amount = amountForList; rec.workName = hasProj ? projNm : buildWorkName();
      rec.mode = est.mode; rec.rateSource = est.rateSource;
      if(projSnap) rec.project = projSnap; else delete rec.project;
      persistSaved(); toast('Estimate update ho gaya: ' + nm); renderSavedTable(); return;
    }
  }
  const id = 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
  const rec = {
    id, name: nm, est: snapshot, created: estStamp(), updated: estStamp(),
    amount: amountForList, workName: hasProj ? projNm : buildWorkName(),
    mode: est.mode, rateSource: est.rateSource
  };
  if(projSnap) rec.project = projSnap;
  savedEstimates.unshift(rec);
  currentSavedId = id;
  persistSaved();
  toast('Estimate save ho gaya: ' + nm);
  renderSavedTable();
};

function loadSaved(id){
  const rec = savedEstimates.find(s => s.id === id);
  if(!rec) return;
  est = JSON.parse(JSON.stringify(rec.est));
  if(est.mode === undefined) est.mode = '';
  if(est.rateSource === undefined) est.rateSource = 'arc';
  if(!Array.isArray(est.roadList)) est.roadList = [];
  if(est.roadList.length === 0 && est.mode === 'road' && (est.road || est.roadKm || est.wcFrom || est.wcTo)){
    est.roadList = [{ name: est.road || '', km: est.roadKm || '', wcFrom: est.wcFrom || '', wcTo: est.wcTo || '' }];
  }
  if(!Array.isArray(est.workDescList)){
    est.workDescList = (est.workDesc && est.workDesc.trim()) ? [est.workDesc.trim()] : [];
  }
  /* restore parent project if it was saved along with this record */
  if(rec.project){
    window.project = JSON.parse(JSON.stringify(rec.project));
    if(!Array.isArray(window.project.subs)) window.project.subs = [];
    if(typeof window.project.active !== 'number') window.project.active = 0;
    /* sync the active sub's est with the freshly-loaded est */
    if(window.project.subs[window.project.active]){
      window.project.subs[window.project.active].est = JSON.parse(JSON.stringify(est));
    }
    store.set('rnb_project', window.project);
  } else {
    /* record has no project → clear any lingering project so single-est
       mode is honoured */
    window.project = { active:0, subs:[], meta: (window.project && window.project.meta) ||
                       { face:{}, gd:{}, performa:{buildings:[],spec:{},landAvailability:{},recoverable:{}}, rcc:{concreteMix:[]}, recap:{extras:[],lumpSum:[]} } };
    store.set('rnb_project', window.project);
  }
  currentSavedId = id;
  save();
  // repopulate inputs
  $('#roadInput').value = est.road || '';
  $('#prepBy').value = est.prepBy || '';
  $('#chkBy').value = est.chkBy || '';
  applyModeUI(); refreshHints(); refreshWorkName(); renderItemBlocks(); renderPreview();
  if(typeof renderProject === 'function') renderProject();
  $$('nav.tabs button')[0].click();
  toast('Loaded: ' + rec.name);
}

function deleteSaved(id){
  const rec = savedEstimates.find(s => s.id === id);
  if(!rec) return;
  if(!confirm('Delete "' + rec.name + '"? Wapas nahi aayega.')) return;
  savedEstimates = savedEstimates.filter(s => s.id !== id);
  if(currentSavedId === id) currentSavedId = null;
  persistSaved(); renderSavedTable();
  toast('Deleted.');
}

async function downloadSavedExcel(id){
  const rec = savedEstimates.find(s => s.id === id);
  if(!rec) return;
  const prevEst = est, prevId = currentSavedId;
  est = JSON.parse(JSON.stringify(rec.est));      // temporarily swap in
  try{
    const wb = await buildWorkbook();
    const buf = await wb.xlsx.writeBuffer();
    const safe = (rec.name || 'Estimate').replace(/[^\w\- ]+/g,'').replace(/\s+/g,'_').slice(0,55);
    download(new Blob([buf], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), safe + '.xlsx');
  }catch(e){ toast('Excel banane me dikkat aayi.'); }
  finally{ est = prevEst; currentSavedId = prevId; }
}

let savedSearchQ = '';
function renderSavedTable(){
  const box = $('#savedTable');
  if(!box) return;
  const q = savedSearchQ.trim().toLowerCase();
  const view = savedEstimates.filter(s =>
    !q || (s.name||'').toLowerCase().includes(q) || (s.workName||'').toLowerCase().includes(q));
  if(!savedEstimates.length){
    box.innerHTML = '<div class="empty">Abhi koi estimate save nahi. Preview & Export tab me "Save estimate" dabao.</div>';
    return;
  }
  if(!view.length){ box.innerHTML = '<div class="empty">Search se kuch match nahi hua.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:820px"><tr>
      <th style="width:34%">Name</th><th style="width:10%">Type</th><th style="width:13%">Amount ₹</th>
      <th style="width:18%">Saved</th><th style="width:25%">Actions</th></tr>` +
    view.map(s => {
      const cur = s.id === currentSavedId;
      return `<tr${cur?' style="background:#fff3e0"':''}>
        <td><b>${esc(s.name)}</b>${cur?' <span class="pill" style="padding:1px 6px">current</span>':''}
            <div style="font-size:10px;color:var(--ink-2)">${esc((s.workName||'').slice(0,80))}</div></td>
        <td style="font-size:11px">${esc((s.mode||'').slice(0,4))}${s.rateSource?' / '+esc(s.rateSource.toUpperCase()):''}</td>
        <td class="num mono">${fmt0(s.amount||0)}</td>
        <td style="font-size:11px">${esc(prettyDate(s.updated||s.created))}</td>
        <td>
          <button class="btn ghost" style="padding:4px 8px" data-load="${s.id}">Load</button>
          <button class="btn" style="padding:4px 8px" data-xls="${s.id}">Excel</button>
          <button class="btn danger" style="padding:4px 8px" data-sdel="${s.id}">×</button>
        </td></tr>`;
    }).join('') +
    `</table></div><p class="hint">${view.length}${q?' (filtered)':''} of ${savedEstimates.length} saved.</p>`;
  box.querySelectorAll('[data-load]').forEach(b => b.onclick = () => loadSaved(b.dataset.load));
  box.querySelectorAll('[data-xls]').forEach(b => b.onclick = () => downloadSavedExcel(b.dataset.xls));
  box.querySelectorAll('[data-sdel]').forEach(b => b.onclick = () => deleteSaved(b.dataset.sdel));
}

$('#savedSearch').oninput = e => { savedSearchQ = e.target.value; renderSavedTable(); };

$('#btnExportAll').onclick = () => {
  if(!savedEstimates.length){ toast('Kuch save nahi hai.'); return; }
  const blob = new Blob([JSON.stringify(savedEstimates, null, 2)], {type:'application/json'});
  download(blob, 'RNB_estimates_backup_' + new Date().toISOString().slice(0,10) + '.json');
};

$('#fileImportSaved').onchange = e => {
  const f = e.target.files[0]; e.target.value = '';
  if(!f) return;
  const fr = new FileReader();
  fr.onload = () => {
    try{
      const arr = JSON.parse(fr.result);
      if(!Array.isArray(arr)) throw 0;
      let added = 0;
      arr.forEach(rec => {
        if(rec && rec.id && rec.est){
          if(!savedEstimates.some(s => s.id === rec.id)){ savedEstimates.push(rec); added++; }
        }
      });
      persistSaved(); renderSavedTable();
      toast(added + ' estimate import ho gaye.');
    }catch(err){ toast('Invalid backup file.'); }
  };
  fr.readAsText(f);
};

/* new estimate → clear current-saved link and reset */
$('#btnNew').onclick = () => {
  if(!confirm('Naya estimate shuru karein? Abhi ka data clear ho jayega.')) return;
  currentSavedId = null;
  est = { mode:'', rateSource:'', road:'', roadList:[], workDescList:[], prepBy:est.prepBy, chkBy:est.chkBy, qc:1, lc:0, gst:0, lines:[] };
  save();
  ['roadInput'].forEach(id => { const el = $('#'+id); if(el) el.value = ''; });
  refreshWorkName(); renderItemBlocks(); renderPreview();
  $$('nav.tabs button')[0].click();
  openGate('based');   // fresh estimate → ask Based, then Road/Building
};

/* ------------------------------- init ------------------------------- */
store.set('rnb_roads', roads); store.set('rnb_items', items);
store.set('rnb_buildings', buildings); store.set('rnb_workdescs', workDescs); store.set('rnb_people', people);
$('#prepBy').value = est.prepBy || '';
$('#chkBy').value = est.chkBy || '';
refreshHints(); refreshWorkName(); renderItemBlocks(); applyModeUI();
if(!est.mode || !est.rateSource) openGate('based');


/* ==================== import items from a saved estimate ==================== */
(function(){
  const modal = $('#impModal');
  const btn   = $('#btnImportSaved');
  if(!modal || !btn) return;

  let pickedId = null;

  const closeImp = () => { modal.style.display = 'none'; };
  const openImp  = () => { pickedId = null; modal.style.display = 'flex'; renderImp(); };

  function renderImp(){
    const body = $('#impBody');
    const rec  = pickedId ? savedEstimates.find(s => s.id === pickedId) : null;

    /* ---- step 1: pick a saved estimate ---- */
    if(!rec){
      $('#impTitle').textContent = 'Import from saved estimate';
      $('#impHint').textContent  = 'Kaunse estimate se items lene hai wo chuno.';
      $('#impAdd').hidden = true; $('#impBack').hidden = true;

      if(!savedEstimates.length){
        body.innerHTML = '<div class="empty">Abhi koi estimate save nahi hai. Pehle koi estimate save karo.</div>';
        return;
      }
      body.innerHTML =
        '<input id="impSearch" placeholder="Saved estimate search — naam ya road…" autocomplete="off">' +
        '<div class="scroll" style="margin-top:10px;max-height:48vh"><table class="tbl" style="min-width:460px">' +
        '<tr><th style="width:54%">Name</th><th>Items</th><th>Type</th><th></th></tr>' +
        savedEstimates.map(s => {
          const nLines = (s.est && Array.isArray(s.est.lines)) ? s.est.lines.length : 0;
          const hay = ((s.name || '') + ' ' + (s.workName || '')).toLowerCase();
          return `<tr data-hay="${esc(hay)}">
            <td><b>${esc(s.name)}</b>
                <div style="font-size:10px;color:var(--ink-2)">${esc((s.workName || '').slice(0,70))}</div></td>
            <td class="num mono">${nLines}</td>
            <td style="font-size:11px">${esc((s.mode || '').slice(0,4))}${s.rateSource ? ' / ' + esc(s.rateSource.toUpperCase()) : ''}</td>
            <td><button class="btn ghost" style="padding:4px 8px" data-pick="${s.id}"${nLines ? '' : ' disabled'}>Open</button></td>
          </tr>`;
        }).join('') + '</table></div>';

      const si = $('#impSearch');
      si.oninput = e => {
        const q = e.target.value.trim().toLowerCase();
        body.querySelectorAll('tr[data-hay]').forEach(tr => {
          tr.style.display = (!q || tr.dataset.hay.includes(q)) ? '' : 'none';
        });
      };
      body.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => { pickedId = b.dataset.pick; renderImp(); });
      return;
    }

    /* ---- step 2: pick items from that estimate ---- */
    const lines = Array.isArray(rec.est && rec.est.lines) ? rec.est.lines : [];
    $('#impTitle').textContent = 'Items — ' + rec.name;
    $('#impHint').textContent  = 'Jo items chahiye tick karo. Import ke baad sab edit ho sakta hai.';
    $('#impAdd').hidden = false; $('#impBack').hidden = false;

    body.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:14px;font-size:12px;margin-bottom:10px">' +
      '<label><input type="checkbox" id="impAll" checked> Sab select</label>' +
      '<label><input type="checkbox" id="impMeas" checked> Measurement rows bhi copy karo</label>' +
      '<label><input type="checkbox" id="impRate"> Rate list se latest rate lo</label>' +
      '</div><div class="scroll" style="max-height:46vh"><table class="tbl" style="min-width:520px">' +
      '<tr><th style="width:6%"></th><th style="width:56%">Item</th><th>Unit</th><th>Rate ₹</th><th>Qty</th><th>Rows</th></tr>' +
      lines.map((l, i) => {
        let qty = 0;
        try { qty = lineTotal(l).say; } catch(e){}
        const nRows = Array.isArray(l.rows) ? l.rows.length : 0;
        return `<tr>
          <td><input type="checkbox" data-i="${i}" checked></td>
          <td style="font-size:12px">${esc(String(l.desc || '').slice(0,150))}
              ${l.appRateNo ? `<div style="font-size:10px;color:var(--ink-2)">No.${esc(String(l.appRateNo))}</div>` : ''}</td>
          <td style="font-size:11px">${esc(l.unit || '')}</td>
          <td class="num mono">${fmt(n(l.rate))}</td>
          <td class="num mono">${fmt(qty)}</td>
          <td class="num mono">${nRows}</td>
        </tr>`;
      }).join('') + '</table></div>';

    $('#impAll').onchange = e => {
      body.querySelectorAll('input[data-i]').forEach(c => c.checked = e.target.checked);
    };
  }

  btn.onclick = openImp;
  $('#impCancel').onclick = closeImp;
  $('#impBack').onclick   = () => { pickedId = null; renderImp(); };
  modal.onclick = e => { if(e.target === modal) closeImp(); };

  $('#impAdd').onclick = () => {
    const rec = savedEstimates.find(s => s.id === pickedId);
    if(!rec) return;
    const body      = $('#impBody');
    const withMeas  = $('#impMeas') ? $('#impMeas').checked : true;
    const useLatest = $('#impRate') ? $('#impRate').checked : false;
    const picks = Array.from(body.querySelectorAll('input[data-i]:checked')).map(c => +c.dataset.i);
    if(!picks.length){ toast('Kam se kam ek item select karo.'); return; }

    picks.forEach(i => {
      const src = rec.est.lines[i];
      if(!src) return;
      const cp = JSON.parse(JSON.stringify(src));
      if(useLatest){
        const m = items.find(it => it.desc === cp.desc)
               || items.find(it => String(it.itemNo || '') === String(cp.appRateNo || '') && (it.cat || '') === (cp.cat || ''));
        if(m){ cp.rate = m.rate; cp.unit = m.unit || cp.unit; cp.appRateNo = m.itemNo || cp.appRateNo; }
      }
      if(!withMeas){ cp.rows = [blankRow()]; cp.sayOverride = null; }
      if(!Array.isArray(cp.rows) || !cp.rows.length) cp.rows = [blankRow()];
      est.lines.push(cp);
    });

    save(); renderItemBlocks(); closeImp();
    toast(picks.length + ' item import ho gaye — ab edit kar sakte ho.');
  };
})();
