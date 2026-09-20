/* ============================================================================
   R&B Estimate Builder — AI Drawing Assistant (Multi-turn)
   ---------------------------------------------------------------------------
   Drawing upload karo → conversation chalu raho → jab chaho data extract karo
   ya sawaal puchho. Drawings memory me rehti hain jab tak chat clear na karo.
   Anthropic API key user ke browser (localStorage) me rehti hai.
   ========================================================================== */

(function(){
'use strict';

const API_URL  = 'https://api.anthropic.com/v1/messages';
const MODEL    = 'claude-sonnet-4-6';
const KEY_SLOT = 'rnb_ai_key';

/* ──────────────────────── helpers ──────────────────────── */
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const $ = s => document.querySelector(s);
const n = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };

/* ──────────────────────── field map ──────────────────────── */
const FIELD_MAP = {
  floors:         { id:'rcN',    meta:'rcc.N',   label:'No. of Floors (N)' },
  floorArea:      { id:'rcA',    meta:'rcc.A',   label:'Floor Area per floor (A) sqm' },
  totalColumns:   { id:'rcNC',   meta:'rcc.NC',  label:'Total No. of Columns (NC)' },
  loadIntensity:  { id:'rcIL',   meta:'rcc.IL',  label:'Load Intensity (IL) T/m²' },
  sbc:            { id:'rcSBC',  meta:'rcc.SBC', label:'Safe Bearing Capacity (SBC) T/m²' },
  qcFooring:      { id:'rcQC',   meta:'rcc.QC',  label:'Qty per Column footing (QC) m³' },
  foundationDepth:{ id:'rcDF',   meta:'rcc.DF',  label:'Depth of Foundation (DF) m' },
  typeOfStructure:{ id:'pcTypeStructure',  meta:'performa.typeOfStructure', label:'Type of Structure' },
  roomDetails:    { id:'pcRoomDetails',    meta:'performa.roomDetails',     label:'Room Details' },
  plinthHeight:   { id:'pcPlinthHeight',   meta:'performa.spec.plinthHeight', label:'Plinth Height' },
  floorHeight:    { id:'pcFloorHeight',    meta:'performa.spec.floorHeight',  label:'Floor Height' },
  foundation:     { id:'pcFoundation',    meta:'performa.spec.foundation',  label:'Foundation Type' },
  mainWalls:      { id:'pcMainWalls',     meta:'performa.spec.mainWalls',   label:'Main Walls' },
  balcony:        { id:'pcBalcony',       meta:'performa.spec.balcony',     label:'Balcony' },
  roofs:          { id:'pcRoofs',         meta:'performa.spec.roofs',       label:'Roofs / Slab' },
  flooring:       { id:'pcFlooring',      meta:'performa.spec.flooring',    label:'Flooring' },
  doors:          { id:'pcDoors',         meta:'performa.spec.doors',       label:'Doors' },
  windows:        { id:'pcWindows',       meta:'performa.spec.windows',     label:'Windows' },
  durnishing:     { id:'pcDurnishing',    meta:'performa.spec.durnishing',  label:'Durnishing / Furnishing' },
  walls:          { id:'pcWalls',         meta:'performa.spec.walls',       label:'Walls' },
  rccWorks:       { id:'pcRCCWorks',      meta:'performa.spec.rccWorks',    label:'RCC Works Mix' },
  terrace:        { id:'pcTerrace',       meta:'performa.spec.terrace',     label:'Terrace Treatment' },
  filling:        { id:'pcFilling',       meta:'performa.spec.filling',     label:'Filling' },
  painting:       { id:'pcPainting',      meta:'performa.spec.painting',    label:'Painting' },
  waterSupply:    { id:'pcWaterSupply',    meta:'performa.spec.waterSupply', label:'Water Supply' },
  drainage:       { id:'pcDrainage',      meta:'performa.spec.drainage',    label:'Drainage' },
  otherSpecials:  { id:'pcOtherSpecials',  meta:'performa.spec.otherSpecials',label:'Other Specials' },
  plinthAreaCost: { id:'pcPlinthAreaCost', meta:'performa.plinthAreaCost',  label:'Plinth Area Cost Rs/sqm' },
  carpetAreaCost: { id:'pcCarpetAreaCost', meta:'performa.carpetAreaCost',  label:'Carpet Area Cost Rs/sqm' },
  buildingDetails:{ id:'gdBuildingDetails', meta:'gd.buildingDetails', label:'Building Details' },
  workDetails:    { id:'gdWorkDetails',     meta:'gd.workDetails',     label:'Work Details' },
  sorYear:        { id:'gdSorYear',         meta:'gd.sorYear',         label:'SOR Year' },
  buildings:      { id:'__buildings__', meta:'performa.buildings', label:'Buildings (name + plinth area)' },
  columnSize:     { id:'__info__', meta:'rcc.columnSize',    label:'Column Size' },
  slabThickness:  { id:'__info__', meta:'rcc.slabThickness', label:'Slab Thickness mm' },
  beamDepth:      { id:'__info__', meta:'rcc.beamDepth',     label:'Beam Depth' },
};

/* ──────────────────────── system prompt ──────────────────────── */
const SYS_PROMPT = `You are an expert structural and civil engineering AI assistant for an Indian government R&B (Roads & Buildings) department estimate builder app.

You help the user by analyzing uploaded architectural/structural drawings (floor plans, sections, column layouts, beam schedules, etc.) and answering questions about them. You maintain context across the conversation — the user may upload one or more drawings and ask questions at any time.

You have TWO response modes:

MODE 1 — FREE CONVERSATION (default):
When the user asks questions, discusses the drawing, or wants explanations — respond naturally in Hinglish (Hindi-English mix). Be specific about what you see in the drawing. Mention dimensions, counts, labels you can read. If something is unclear, say so.

MODE 2 — AUTO-FILL EXTRACTION:
When the user says "fill karo", "extract karo", "auto-fill", "data nikal do", "form me daal do", or similar — return ONLY a JSON object (no markdown, no backticks, no text before/after) with these keys (include only what you can extract):

{
  "floors": <number of storeys, e.g. 2 for G+1>,
  "floorArea": <floor area per floor in sqm>,
  "totalColumns": <total columns>,
  "loadIntensity": <T/m², 2.0 residential, 3.0 commercial>,
  "sbc": <safe bearing capacity T/m²>,
  "qcFooring": <avg m³ per column footing>,
  "foundationDepth": <meters>,
  "typeOfStructure": "<description>",
  "roomDetails": "<rooms list>",
  "plinthHeight": "<e.g. 0.60 Mt.>",
  "floorHeight": "<e.g. 3.15 Mt>",
  "foundation": "<spec>",
  "mainWalls": "<spec>",
  "balcony": "<desc>",
  "roofs": "<spec>",
  "flooring": "<spec>",
  "doors": "<spec>",
  "windows": "<spec>",
  "walls": "<wall type>",
  "rccWorks": "<concrete grades>",
  "columnSize": "<e.g. 300x450 mm>",
  "slabThickness": <mm>,
  "beamDepth": "<e.g. 300x600 mm>",
  "buildings": [{"name":"<name>","area":<sqm>}],
  "buildingDetails": "<summary>",
  "workDetails": "<structural system>",
  "summary": "<2-3 line Hindi summary>"
}

Rules:
- For MODE 2, return ONLY the JSON — no other text.
- "summary" key is REQUIRED in JSON mode.
- Column count: count individual marks on plan or grid intersections.
- Floor area: calculate from dimensions if given.
- For residential: default IL=2.0, SBC=25 if not specified.
- Be honest — if something is unclear, say so or estimate and note it.
- You can reference any previously uploaded drawing in the conversation.
- If user asks about a specific measurement, be precise about what you see.`;

/* ──────────────────────── state ──────────────────────── */
let history = [];          // API messages: [{role, content}]
let drawings = [];         // [{name, thumb}] for UI display
let pendingFile = null;    // {base64, mediaType, name, thumbUrl}
let busy = false;

function getKey(){ return localStorage.getItem(KEY_SLOT) || ''; }
function setKey(k){ localStorage.setItem(KEY_SLOT, k || ''); }

/* ──────────────────────── CSS injection ──────────────────────── */
function injectCSS(){
  if($('#aiAssistCSS')) return;
  const s = document.createElement('style'); s.id = 'aiAssistCSS';
  s.textContent = `
  #aiFab{position:fixed;bottom:20px;right:20px;z-index:9999;width:56px;height:56px;
    border-radius:50%;background:#123a5e;color:#fff;border:0;cursor:pointer;
    box-shadow:0 3px 10px rgba(0,0,0,.25);font-size:24px;display:flex;align-items:center;justify-content:center;
    transition:transform .2s}
  #aiFab:hover{transform:scale(1.08)}
  #aiFab .badge{position:absolute;top:-2px;right:-2px;background:#c85a2e;color:#fff;
    font-size:10px;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;
    justify-content:center;font-weight:700}

  #aiPanel{position:fixed;bottom:20px;right:20px;z-index:10000;width:400px;max-width:calc(100vw - 24px);
    height:560px;max-height:calc(100vh - 40px);background:#fff;border:1px solid #b8c5d3;
    border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.18);display:none;flex-direction:column;
    font-family:system-ui,'Segoe UI',Arial,sans-serif;overflow:hidden}
  #aiPanel.open{display:flex}
  #aiPanel .hdr{background:#123a5e;color:#fff;padding:10px 14px;display:flex;align-items:center;
    justify-content:space-between;flex-shrink:0}
  #aiPanel .hdr h3{margin:0;font-size:14px;font-weight:600}
  #aiPanel .hdr button{background:0;border:0;color:#fff;font-size:18px;cursor:pointer;padding:0 4px;opacity:.85}
  #aiPanel .hdr button:hover{opacity:1}

  #aiDrawingBar{background:#eef2f7;padding:6px 12px;display:flex;gap:6px;align-items:center;
    overflow-x:auto;flex-shrink:0;border-bottom:1px solid #d5dde6;min-height:36px}
  #aiDrawingBar:empty{display:none}
  #aiDrawingBar .dthumb{width:32px;height:32px;border-radius:4px;object-fit:cover;border:2px solid #c5d0dc;
    cursor:pointer;flex-shrink:0}
  #aiDrawingBar .dthumb:hover{border-color:#c85a2e}
  #aiDrawingBar .dlbl{font-size:10px;color:#456;white-space:nowrap}

  #aiPanel .body{flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px}
  #aiPanel .foot{border-top:1px solid #dde4ec;padding:8px 10px;flex-shrink:0;display:flex;gap:6px;align-items:center}
  #aiPanel .foot input[type="file"]{display:none}
  #aiPanel .foot label{background:#eef2f7;border:1px solid #c5d0dc;border-radius:6px;padding:6px 8px;
    cursor:pointer;font-size:11px;font-weight:600;color:#123a5e;white-space:nowrap;flex-shrink:0}
  #aiPanel .foot label:hover{background:#dfe6ef}
  #aiPanel .foot .inp{flex:1;border:1px solid #c5d0dc;border-radius:6px;padding:7px 10px;font-size:13px;
    outline:0;font-family:inherit;min-width:0}
  #aiPanel .foot .inp:focus{border-color:#123a5e}
  #aiPanel .foot .send{background:#c85a2e;color:#fff;border:0;border-radius:6px;padding:7px 12px;
    font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0}
  #aiPanel .foot .send:hover{background:#a94a24}
  #aiPanel .foot .send:disabled{opacity:.5;cursor:default}

  .ai-msg{padding:8px 11px;border-radius:8px;font-size:13px;line-height:1.5;max-width:94%;word-break:break-word}
  .ai-msg.bot{background:#eef2f7;color:#1e2b3a;align-self:flex-start;border-bottom-left-radius:2px}
  .ai-msg.user{background:#123a5e;color:#fff;align-self:flex-end;border-bottom-right-radius:2px}
  .ai-msg.err{background:#fce4e4;color:#7a1f1f;align-self:flex-start}
  .ai-msg img{max-width:100%;max-height:140px;border-radius:6px;margin:4px 0}
  .ai-msg .tag{display:inline-block;background:#c85a2e;color:#fff;padding:1px 7px;border-radius:4px;
    font-size:10px;font-weight:700;margin-right:4px}

  .ai-fill-list{margin:6px 0 2px;padding:0;list-style:none;font-size:12px}
  .ai-fill-list li{display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid #eef1f5}
  .ai-fill-list li:last-child{border:0}
  .ai-fill-list .k{color:#456;min-width:110px;font-size:11px}
  .ai-fill-list .v{color:#123a5e;font-weight:600;flex:1;font-size:11px}
  .ai-fill-list .chk{width:14px;height:14px;accent-color:#c85a2e}

  .ai-btn{background:#c85a2e;color:#fff;border:0;padding:5px 12px;border-radius:5px;
    font-size:11px;font-weight:600;cursor:pointer;margin:3px 2px 0}
  .ai-btn:hover{background:#a94a24}
  .ai-btn.sec{background:#123a5e}
  .ai-btn.sec:hover{background:#0d2b46}

  .ai-key-form{display:flex;flex-direction:column;gap:8px;padding:4px 0}
  .ai-key-form input{border:1px solid #c5d0dc;border-radius:6px;padding:7px 10px;font-size:12px;
    font-family:monospace;outline:0}
  .ai-key-form button{background:#123a5e;color:#fff;border:0;padding:7px 14px;border-radius:6px;
    font-size:12px;font-weight:600;cursor:pointer}
  .ai-key-form .hint{font-size:11px;color:#678;margin:0}

  .ai-loading{display:flex;align-items:center;gap:8px;padding:8px 12px;background:#eef2f7;
    border-radius:8px;align-self:flex-start;font-size:13px;color:#456}
  .ai-loading .dot{width:7px;height:7px;background:#c85a2e;border-radius:50%;
    animation:aipulse .8s ease-in-out infinite alternate}
  .ai-loading .dot:nth-child(2){animation-delay:.15s}
  .ai-loading .dot:nth-child(3){animation-delay:.3s}
  @keyframes aipulse{0%{opacity:.3;transform:scale(.8)}100%{opacity:1;transform:scale(1.1)}}

  .ai-quick{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}
  .ai-qbtn{background:#fff;border:1px solid #c5d0dc;border-radius:14px;padding:3px 10px;
    font-size:11px;cursor:pointer;color:#123a5e;font-weight:500}
  .ai-qbtn:hover{background:#eef2f7;border-color:#123a5e}
  `;
  document.head.appendChild(s);
}

/* ──────────────────────── HTML injection ──────────────────────── */
function injectHTML(){
  if($('#aiFab')) return;

  const fab = document.createElement('button');
  fab.id = 'aiFab'; fab.title = 'AI Drawing Assistant';
  fab.innerHTML = '🤖';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.id = 'aiPanel';
  panel.innerHTML = `
    <div class="hdr">
      <h3>🤖 AI Drawing Assistant</h3>
      <div style="display:flex;gap:6px">
        <button id="aiKeyBtn" title="API Key">🔑</button>
        <button id="aiClearBtn" title="Clear chat + drawings">🗑</button>
        <button id="aiClose" title="Close">✕</button>
      </div>
    </div>
    <div id="aiDrawingBar"></div>
    <div class="body" id="aiBody"></div>
    <div class="foot">
      <input type="file" id="aiFile" accept="image/*,.pdf" multiple>
      <label for="aiFile" id="aiFileLbl">📎 Drawing</label>
      <input class="inp" id="aiInput" placeholder="Sawaal puchho ya 'fill karo' bolo…">
      <button class="send" id="aiSend">▶</button>
    </div>`;
  document.body.appendChild(panel);

  fab.onclick = togglePanel;
  $('#aiClose').onclick = () => panel.classList.remove('open');
  $('#aiKeyBtn').onclick = showKeyForm;
  $('#aiClearBtn').onclick = clearChat;
  $('#aiSend').onclick = sendMessage;
  $('#aiInput').onkeydown = e => { if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } };
  $('#aiFile').onchange = handleFiles;

  showWelcome();
}

function showWelcome(){
  addMsg('bot', `<b>Namaste!</b> Main aapka AI Drawing Assistant hoon. 🏗️

<b>Kaise use karo:</b>
1️⃣ 📎 se drawing upload karo (plan / section / column layout)
2️⃣ Sawal puchho — "kitne columns hain?", "beam size?", "floor area?"
3️⃣ Jab fill karna ho: <b>"fill karo"</b> ya <b>"extract karo"</b> bolo
4️⃣ Checkboxes se choose karo kya fill karna hai → Auto-Fill

📌 <b>Drawings memory me rehti hain</b> — baad me bhi sawaal puchh sakte ho.
📌 Multiple drawings upload kar sakte ho (plan + section + schedule).
⚠️ Pehli baar — 🔑 se Anthropic API key daalo.`);

  showQuickButtons();
}

/* ──────────────────────── quick action buttons ──────────────────────── */
function showQuickButtons(){
  const body = $('#aiBody');
  const d = document.createElement('div');
  d.className = 'ai-quick';
  const btns = [
    ['📎 Drawing upload karo', ''],
    ['Columns count karo', 'Drawing me total kitne columns hain? Har column ka label bhi batao.'],
    ['Beam sizes batao', 'Drawing me saare beam sizes list karo — label + dimensions.'],
    ['Floor area nikal do', 'Floor area calculate karo — length x width se, deductions ke saath.'],
    ['Room details', 'Har floor pe kaun kaun se rooms hain? Size ke saath batao.'],
    ['Fill karo ✅', 'Drawing se sab data extract karke auto-fill ke liye JSON me do.'],
  ];
  btns.forEach(([label, txt]) => {
    const b = document.createElement('button');
    b.className = 'ai-qbtn'; b.textContent = label;
    if(txt) b.onclick = () => { $('#aiInput').value = txt; sendMessage(); };
    else b.onclick = () => $('#aiFile').click();
    d.appendChild(b);
  });
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

/* ──────────────────────── panel toggle ──────────────────────── */
function togglePanel(){
  const p = $('#aiPanel');
  p.classList.toggle('open');
  if(p.classList.contains('open')) $('#aiInput').focus();
}

/* ──────────────────────── messages ──────────────────────── */
function addMsg(role, html){
  const body = $('#aiBody');
  const d = document.createElement('div');
  d.className = 'ai-msg ' + role;
  d.innerHTML = html;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
  return d;
}

function showLoading(){
  const body = $('#aiBody');
  const d = document.createElement('div');
  d.className = 'ai-loading'; d.id = 'aiLoading';
  d.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div> Soch raha hoon…';
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}
function hideLoading(){ const l = $('#aiLoading'); if(l) l.remove(); }

/* ──────────────────────── drawing bar (thumbnails) ──────────────────────── */
function refreshDrawingBar(){
  const bar = $('#aiDrawingBar');
  if(!bar) return;
  if(!drawings.length){ bar.innerHTML = ''; return; }
  bar.innerHTML = '<span class="dlbl">📐 ' + drawings.length + ' drawing' + (drawings.length>1?'s':'') + ':</span>' +
    drawings.map((d,i) => `<img class="dthumb" src="${d.thumb}" title="${esc(d.name)}" data-di="${i}">`).join('');
}

/* ──────────────────────── key form ──────────────────────── */
function showKeyForm(){
  const existing = getKey();
  addMsg('bot', `<div class="ai-key-form">
    <p class="hint">Anthropic API key daalo (sk-ant-…). <b>Sirf aapke browser</b> me save hogi.</p>
    <input id="aiKeyInp" type="password" placeholder="sk-ant-api03-…" value="${existing ? '••••••' + existing.slice(-4) : ''}">
    <button id="aiKeySave">💾 Save Key</button>
    ${existing ? '<button id="aiKeyClear" style="background:#c85a2e">🗑 Remove</button>' : ''}
  </div>`);
  setTimeout(() => {
    const sv = $('#aiKeySave');
    if(sv) sv.onclick = () => {
      const v = $('#aiKeyInp').value.trim();
      if(!v || v.startsWith('••')){ addMsg('bot', 'Key pehle se set hai.'); return; }
      if(!v.startsWith('sk-')){ addMsg('err', 'Key "sk-" se start honi chahiye.'); return; }
      setKey(v);
      addMsg('bot', '✅ API key save ho gayi. Ab drawing upload karo!');
    };
    const cl = $('#aiKeyClear');
    if(cl) cl.onclick = () => { setKey(''); addMsg('bot', '🗑 Key hata di.'); };
  }, 50);
}

/* ──────────────────────── clear chat ──────────────────────── */
function clearChat(){
  if(!confirm('Chat aur drawings clear karna hai? (API key nahi hategi)')) return;
  history = [];
  drawings = [];
  pendingFile = null;
  $('#aiBody').innerHTML = '';
  $('#aiFileLbl').textContent = '📎 Drawing';
  refreshDrawingBar();
  showWelcome();
}

/* ──────────────────────── file handling ──────────────────────── */
function handleFiles(e){
  const files = Array.from(e.target.files);
  if(!files.length) return;
  const maxMB = 10;

  files.forEach(f => {
    if(f.size > maxMB * 1024 * 1024){
      addMsg('err', `"${esc(f.name)}" bahut badi (max ${maxMB} MB).`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      let mediaType = f.type || 'image/jpeg';
      if(mediaType === 'application/pdf') mediaType = 'application/pdf';
      else if(!mediaType.startsWith('image/')) mediaType = 'image/jpeg';

      pendingFile = { base64, mediaType, name: f.name, thumbUrl: reader.result };

      /* show thumbnail in chat */
      if(mediaType.startsWith('image/')){
        addMsg('user', `<img src="${reader.result}" alt="${esc(f.name)}"><br><small>📐 ${esc(f.name)} (${(f.size/1024).toFixed(0)} KB)</small>`);
      } else {
        addMsg('user', `📄 <b>${esc(f.name)}</b> (${(f.size/1024).toFixed(0)} KB — PDF)`);
      }

      /* add to drawings memory */
      drawings.push({
        name: f.name,
        thumb: mediaType.startsWith('image/') ? reader.result : 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="4" fill="#123a5e"/><text x="16" y="22" text-anchor="middle" fill="#fff" font-size="16">📄</text></svg>'),
        base64, mediaType
      });
      refreshDrawingBar();
      $('#aiFileLbl').textContent = '📎 + Drawing';

      addMsg('bot', `Drawing mil gayi! Ab sawaal puchho ya <b>"fill karo"</b> bolo. Kuch quick options:`);
      showQuickButtons();
    };
    reader.onerror = () => addMsg('err', 'File padh nahi paaya.');
    reader.readAsDataURL(f);
  });
  e.target.value = '';
}

/* ──────────────────────── send message ──────────────────────── */
async function sendMessage(){
  if(busy) return;
  const key = getKey();
  if(!key){ addMsg('err', 'Pehle 🔑 se API key daalo.'); return; }

  const inp = $('#aiInput');
  const text = inp.value.trim();
  if(!text && !pendingFile){ addMsg('err', 'Drawing upload karo ya message likho.'); return; }

  /* build user content for THIS turn */
  const content = [];

  /* if there's a pending file, include it */
  if(pendingFile){
    if(pendingFile.mediaType === 'application/pdf'){
      content.push({ type:'document', source:{ type:'base64', media_type:'application/pdf', data: pendingFile.base64 }});
    } else {
      content.push({ type:'image', source:{ type:'base64', media_type: pendingFile.mediaType, data: pendingFile.base64 }});
    }
    pendingFile = null;
    $('#aiFileLbl').textContent = '📎 Drawing';
  }

  const userText = text || 'Maine ye drawing upload ki hai. Isko analyse karo — kya kya dikh raha hai, summarise karo.';
  content.push({ type:'text', text: userText });

  if(text) addMsg('user', esc(text));
  inp.value = '';

  /* add to history */
  history.push({ role:'user', content });

  busy = true;
  $('#aiSend').disabled = true;
  showLoading();

  try{
    /* Build messages — include ALL previously uploaded drawings as context
       in the first message if they're not already there.
       Strategy: keep full history as-is (images stay in their original turn). */
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        system: SYS_PROMPT,
        messages: history
      })
    });

    hideLoading();

    if(!resp.ok){
      const err = await resp.text();
      if(resp.status === 401) addMsg('err', 'API key galat/expired. 🔑 se naya daalo.');
      else if(resp.status === 429) addMsg('err', 'Rate limit — thodi der baad try karo.');
      else if(resp.status === 413 || (err && err.includes('too large')))
        addMsg('err', 'Drawing bahut badi. Chhoti resolution me try karo ya crop karo.');
      else addMsg('err', `API error ${resp.status}: ${err.slice(0,200)}`);
      /* remove failed user message from history */
      history.pop();
      return;
    }

    const data = await resp.json();
    const reply = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');

    if(!reply){ addMsg('err', 'Koi response nahi aaya.'); history.pop(); return; }

    /* add assistant reply to history */
    history.push({ role:'assistant', content: reply });

    /* try JSON parse — if it's auto-fill mode */
    let extracted = null;
    try{
      const clean = reply.replace(/```json|```/g,'').trim();
      if(clean.startsWith('{')) extracted = JSON.parse(clean);
    } catch(e){ /* not JSON — fine */ }

    if(extracted && extracted.summary){
      showExtracted(extracted);
    } else {
      /* regular conversation — render as HTML */
      const html = reply
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
      addMsg('bot', html);
    }

  } catch(e){
    hideLoading();
    history.pop();
    if(e.name === 'TypeError' && e.message.includes('fetch')){
      addMsg('err', 'Network error — internet ya CORS issue.');
    } else {
      addMsg('err', 'Error: ' + e.message);
    }
  } finally {
    busy = false;
    $('#aiSend').disabled = false;
  }
}

/* ──────────────────────── show extracted data ──────────────────────── */
function showExtracted(data){
  const summary = data.summary || 'Data extract ho gaya.';
  const dataCopy = Object.assign({}, data);
  delete dataCopy.summary;

  let html = `<span class="tag">AI Extract</span> ${esc(summary)}<br><br>`;
  html += '<b>Checkbox se select karo, phir Auto-Fill:</b>';
  html += '<ul class="ai-fill-list">';

  const uid = 'aif_' + Date.now();
  let idx = 0;
  for(const [key, val] of Object.entries(dataCopy)){
    if(val === null || val === undefined || val === '') continue;
    const fm = FIELD_MAP[key];
    if(!fm) continue;
    const display = (typeof val === 'object') ? JSON.stringify(val) : String(val);
    html += `<li>
      <input type="checkbox" class="chk" data-aik="${esc(key)}" checked id="${uid}_${idx}">
      <span class="k">${esc(fm.label)}</span>
      <span class="v" title="${esc(display)}">${esc(display.length > 50 ? display.slice(0,47)+'…' : display)}</span>
    </li>`;
    idx++;
  }
  html += '</ul>';
  if(!idx){
    html += '<p style="color:#888;font-size:12px">Koi fillable field nahi mila. Better drawing try karo ya specific cheez ke baare me puchho.</p>';
  } else {
    html += `<button class="ai-btn" id="${uid}_apply">✅ Auto-Fill (${idx})</button> `;
    html += `<button class="ai-btn sec" id="${uid}_all">Select All</button> `;
    html += `<button class="ai-btn sec" id="${uid}_none">Deselect All</button>`;
  }

  const msg = addMsg('bot', html);

  setTimeout(() => {
    const applyBtn = document.getElementById(uid + '_apply');
    if(applyBtn) applyBtn.onclick = () => {
      const checks = msg.querySelectorAll('.chk:checked');
      let filled = 0;
      checks.forEach(chk => {
        const k = chk.dataset.aik;
        if(dataCopy[k] !== undefined) filled += applyField(k, dataCopy[k]);
      });
      addMsg('bot', `✅ <b>${filled}</b> fields auto-fill ho gaye! Project tab check karo.`);
      if(typeof window.renderProject === 'function') window.renderProject();
      if(typeof window.projSave === 'function') window.projSave();
    };
    const allBtn = document.getElementById(uid + '_all');
    if(allBtn) allBtn.onclick = () => msg.querySelectorAll('.chk').forEach(c => c.checked = true);
    const noneBtn = document.getElementById(uid + '_none');
    if(noneBtn) noneBtn.onclick = () => msg.querySelectorAll('.chk').forEach(c => c.checked = false);
  }, 50);
}

/* ──────────────────────── auto-fill logic ──────────────────────── */
function applyField(key, value){
  const fm = FIELD_MAP[key];
  if(!fm) return 0;

  const el = fm.id.startsWith('__') ? null : document.getElementById(fm.id);
  if(el){
    el.value = (typeof value === 'number') ? value : String(value);
    el.dispatchEvent(new Event('input', {bubbles:true}));
  }

  if(fm.meta && window.project && window.project.meta){
    setNested(window.project.meta, fm.meta, value);
  }

  if(key === 'buildings' && Array.isArray(value) && window.project && window.project.meta){
    window.project.meta.performa.buildings = value.map(b => ({
      name: b.name || '', area: n(b.area) || 0
    }));
  }
  return 1;
}

function setNested(obj, path, value){
  const parts = path.split('.');
  let cur = obj;
  for(let i = 0; i < parts.length - 1; i++){
    if(!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length-1]] = value;
}

/* ──────────────────────── init ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectCSS();
  injectHTML();
});

})();
