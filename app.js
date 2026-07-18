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
const FRAMED = 'Estimate framed in the office of the Executive Engineer, Dahod (R&B ) Division , Dahod , for the probale expenses that will be incurred in  ';

let roads     = store.get('rnb_roads', null)     || ROADS_SEED.slice();
let items     = store.get('rnb_items', null)     || ITEMS_SEED.slice();
let sorItems  = store.get('rnb_sor_items', null) || (typeof SOR_SEED !== 'undefined' ? SOR_SEED.map(x=>({...x})) : []);
let buildings = store.get('rnb_buildings', null) || (typeof BUILDINGS_SEED !== 'undefined' ? BUILDINGS_SEED.slice() : []);
let workDescs = store.get('rnb_workdescs', null) || (typeof WORKDESCS_SEED !== 'undefined' ? WORKDESCS_SEED.map(x=>({...x})) : []);
let people    = store.get('rnb_people', null)    || (typeof PEOPLE_SEED !== 'undefined' ? PEOPLE_SEED.slice() : []);
let office    = store.get('rnb_office', null)     || {...OFFICE_DEFAULT};
let est       = store.get('rnb_est', null) ||
             { mode:'', rateSource:'arc', road:'', roadKm:'', workDesc:'', wcFrom:'', wcTo:'', prepBy:'', chkBy:'', qc:1, lc:0, lines:[] };
if(est.mode === undefined) est.mode = '';
if(est.rateSource === undefined) est.rateSource = 'arc';
let catFilter = '';
let dataItemsCat = '';   // Data tab: which ARC category is currently shown in items table

/* ------------------------------- mode config ------------------------------- */
const MODE = {
  road: {
    label:'Road', nameLabel:'Road name',
    namePh:'Type any word — Jhalod, Limkheda, SH.62, Sanjeli…',
    cats:['Hotmix / Road works','Jungle cutting & Geru'], list:()=>roads
  },
  building: {
    label:'Building', nameLabel:'Building / Work name',
    namePh:'Type building / work location…',
    cats:['Resi / Non-Resi Building'], list:()=>buildings
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
function save(){ store.set('rnb_est', est); }

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
  toast(MODE[m].label + ' estimate (' + (est.rateSource==='sor'?'SOR & RA':'ARC') + ')');
}
$$('#gateStepBased .opt').forEach(b => b.onclick = () => setBased(b.dataset.based));
$$('#gateStepMode .opt').forEach(b => b.onclick = () => setMode(b.dataset.mode));
$('#gateBack').onclick = () => showGateStep('based');
$('#btnMode').onclick = () => openGate('mode');   // "Change" button = mode-only

function applyModeUI(){
  const m = MODE[est.mode];
  $('#modeLbl').textContent = m ? m.label : '—';
  $('#roadInputLbl').textContent = m ? m.nameLabel : 'Name';
  $('#roadInput').placeholder = m ? m.namePh : '';
  $('#roadsCardTitle').textContent = 'Road list';
  $('#buildingsCardTitle').textContent = 'Building list';
  const showRoad = est.mode === 'road';
  $$('.road-only').forEach(el => el.style.display = showRoad ? '' : 'none');
  applyRateSourceUI();
  renderCatChips();
  refreshWorkName();
}

function applyRateSourceUI(){
  const rs = est.rateSource || 'arc';
  $$('#rateSrcChips .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.rs === rs));
  const isArc = rs === 'arc';
  $$('.arc-only').forEach(el => el.hidden = !isArc);
  $$('.sor-only').forEach(el => el.hidden = isArc);
  // Sync workDesc value into whichever input is visible
  const wd = est.workDesc || '';
  if($('#workDesc')) $('#workDesc').value = wd;
  if($('#workDescFree')) $('#workDescFree').value = wd;
  // Update item combo placeholder + hint
  const inp = $('#itemInput');
  if(inp){
    inp.placeholder = rs === 'sor' ? 'Search SOR items — code, chapter, description…'
                   : rs === 'ra'  ? 'Rate-analysis list khali hai — baad me add karenge.'
                   : 'Search any word — SDBC, wetmix, hotmix, WMM, GSB, tack coat…';
  }
  const cc = $('#catChips');
  if(cc){ cc.innerHTML = ''; if(isArc) renderCatChips(); }
}

$$('#rateSrcChips .chip').forEach(b => b.onclick = () => {
  est.rateSource = b.dataset.rs; save();
  applyRateSourceUI();
  refreshWorkName();
});

/* ------------------------------- tabs ------------------------------- */
$$('nav.tabs button').forEach(b => b.onclick = () => {
  $$('nav.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  ['est','prev','data'].forEach(t => $('#tab-'+t).hidden = (t !== b.dataset.tab));
  if(b.dataset.tab === 'prev') renderPreview();
  if(b.dataset.tab === 'data'){ showDataGrid(); }
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
  if(s.startsWith('hect')) return 'SQM';
  if(s.startsWith('rmt') || s.startsWith('mtr') || s === 'm' || s.startsWith('km')) return 'RMT';
  if(s.startsWith('no') || s.startsWith('each') || s.startsWith('hrs') || s.startsWith('hour')
     || s.startsWith('day') || s.startsWith('kg') || s.startsWith('ltr')) return 'NOS';
  return 'CUM';
}
const FIELDS = { MT:['nos','len','wid','thk','den'], CUM:['nos','len','wid','thk'],
                 SQM:['nos','len','wid'], RMT:['nos','len'], NOS:['nos'] };
const FLABEL = { nos:'Nos.', len:'Length', wid:'Width', thk:'Thick', den:'Density' };
const rowQty = (row, kind) => (FIELDS[kind] || FIELDS.CUM)
  .reduce((a,k) => a * (n(row[k]) || (k === 'nos' ? 1 : 0)), 1);
const blankRow = () => ({ ch:'', nos:'', len:'', wid:'', thk:'', den:'' });

/* ------------------------------- name of work ------------------------------- */
function buildWorkName(){
  if(!est.road) return '—';
  if(est.mode === 'building'){
    return String(est.road).trim();
  }
  const km = est.roadKm ? ` Km.${est.roadKm}` : '';
  const wc = (est.wcFrom || est.wcTo) ? `(working chainage ${est.wcFrom}-${est.wcTo})` : '';
  const wd = est.workDesc ? `(${est.workDesc})` : '';
  return `C.R. to ${est.road}${km}${wc}${wd}`;
}
const refreshWorkName = () => $('#workName').textContent = buildWorkName();

/* ------------------------------- totals ------------------------------- */
function lineTotal(line){
  const kind = unitKind(line.unit);
  const q = line.rows.reduce((a,r) => a + rowQty(r, kind), 0);
  const autoSay = Math.ceil(r2(q) * 10) / 10;              // R&B round-up: 111.09 -> 111.10
  const say = (line.sayOverride == null || line.sayOverride === '') ? autoSay : n(line.sayOverride);
  return { qty:r2(q), autoSay, say:r2(say), amount:r2(say * n(line.rate)) };
}
function totals(){
  const total = r2(est.lines.reduce((a,l) => a + lineTotal(l).amount, 0));
  const qc    = r2(total * n(est.qc) / 100);
  const grand = r2(total + qc);
  return { total, qc, grand, say: Math.ceil(grand/1000) * 1000 };
}
function refreshTotals(){
  const t = totals();
  $('#tTotal').textContent = fmt(t.total);
  $('#tQcLbl').textContent = `${est.qc} % Q C`;
  $('#tQc').textContent    = fmt(t.qc);
  $('#tGrand').textContent = fmt(t.grand);
  $('#tSay').textContent   = fmt0(t.say);
}

/* ------------------------------- item blocks ------------------------------- */
function renderItemBlocks(){
  const box = $('#itemBlocks');
  if(!est.lines.length){
    box.innerHTML = '<div class="empty">Koi item nahi. Upar search box se item chuno.</div>';
    refreshTotals(); return;
  }
  box.innerHTML = est.lines.map((l, li) => {
    const kind = unitKind(l.unit), f = FIELDS[kind] || FIELDS.CUM, lt = lineTotal(l);
    return `<div class="itemblock">
      <h3><span>Item No. ${li + 1}</span>
        <button class="btn danger" style="padding:4px 9px" data-rmline="${li}">Remove</button></h3>
      <div class="itemdesc">${esc(l.desc)}</div>
      <div>
        <span class="pill">Rate ₹ ${fmt(n(l.rate))}</span>
        <span class="pill">Per ${esc(l.unit)}</span>
        <span class="pill" style="padding:0 7px">Approved Rate no
          <input data-apr="${li}" value="${esc(l.appRateNo || '')}"
                 style="width:46px;display:inline-block;border:0;background:transparent;padding:3px 0;font-family:'IBM Plex Mono',monospace;font-size:11px"></span>
        ${l.cat ? `<span class="pill">${esc(l.cat)}</span>` : ''}
        <span class="pill">${f.map(k=>FLABEL[k]).join(' × ')}</span>
      </div>
      <div class="scroll"><table class="tbl" style="margin-top:8px">
        <tr><th style="min-width:150px">Chainage</th>${f.map(k=>`<th class="num">${FLABEL[k]}</th>`).join('')}<th class="num">Qty</th><th></th></tr>
        ${l.rows.map((r, ri) => `<tr>
          <td><input data-l="${li}" data-r="${ri}" data-k="ch" value="${esc(r.ch)}" placeholder="(scattered length )"></td>
          ${f.map(k=>`<td><input class="num mono" type="number" step="any" inputmode="decimal" data-l="${li}" data-r="${ri}" data-k="${k}" value="${r[k] ?? ''}"></td>`).join('')}
          <td class="num mono">${fmt(rowQty(r, kind))}</td>
          <td><button class="btn danger" style="padding:4px 8px" data-del="${li}:${ri}">×</button></td>
        </tr>`).join('')}
      </table></div>
      <div class="row-actions" style="margin-top:8px">
        <button class="btn ghost" data-addrow="${li}">+ Add row</button>
        <span class="pill" data-tot="${li}" style="margin-left:auto">Total ${fmt(lt.qty)} ${esc(l.unit)}</span>
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
    const tp = box.querySelector(`[data-tot="${li}"]`), ap = box.querySelector(`[data-amt="${li}"]`),
          sp = box.querySelector(`[data-say="${li}"]`);
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
  if(!roads.length){ box.innerHTML = '<div class="empty">Road list khali hai.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl"><tr><th style="width:78%">Road name</th><th>Km</th><th></th></tr>` +
    roads.map((r,i)=>`<tr>
      <td><input data-ri="${i}" data-rk="name" value="${esc(r.name)}"></td>
      <td><input class="mono" data-ri="${i}" data-rk="km" value="${esc(r.km||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-rdel="${i}">×</button></td></tr>`).join('') +
    `</table></div><p class="hint">${roads.length} roads.</p>`;
  box.querySelectorAll('input').forEach(i => i.oninput = e => {
    roads[+e.target.dataset.ri][e.target.dataset.rk] = e.target.value; store.set('rnb_roads', roads); });
  box.querySelectorAll('[data-rdel]').forEach(b => b.onclick = () => {
    roads.splice(+b.dataset.rdel,1); store.set('rnb_roads', roads); renderRoadsTable(); refreshHints(); });
}
let buildingKindFilter = '';  // '' | 'R' | 'NR'

function renderBuildingsTable(){
  const box = $('#buildingsTable');
  const chipBox = $('#buildingKindChips');
  if(chipBox){
    const counts = { R: buildings.filter(b=>b.kind==='R').length,
                     NR: buildings.filter(b=>b.kind==='NR').length,
                     '': buildings.length };
    chipBox.innerHTML =
      `<button class="chip" data-bk="" aria-pressed="${buildingKindFilter===''}">All (${counts['']})</button>` +
      `<button class="chip" data-bk="R" aria-pressed="${buildingKindFilter==='R'}">Residential (${counts.R})</button>` +
      `<button class="chip" data-bk="NR" aria-pressed="${buildingKindFilter==='NR'}">Non-Residential (${counts.NR})</button>`;
    chipBox.querySelectorAll('.chip').forEach(b => b.onclick = () => {
      buildingKindFilter = b.dataset.bk; renderBuildingsTable();
    });
  }
  if(!box) return;
  const view = buildings.map((r,i)=>({r,i})).filter(x => !buildingKindFilter || (x.r.kind||'')===buildingKindFilter);
  if(!view.length){ box.innerHTML = '<div class="empty">' + (buildingKindFilter ? 'Is category me koi building nahi.' : 'Building list khali hai — "Add building" dabao.') + '</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:640px"><tr><th style="width:75%">Building / Work name</th><th style="width:15%">Kind</th><th></th></tr>` +
    view.map(x => { const r=x.r, i=x.i; return `<tr>
      <td><input data-bi="${i}" data-bk="name" value="${esc(r.name)}"></td>
      <td><select data-bi="${i}" data-bk="kind">
        <option value=""${!r.kind?' selected':''}>—</option>
        <option value="R"${r.kind==='R'?' selected':''}>Residential</option>
        <option value="NR"${r.kind==='NR'?' selected':''}>Non-Residential</option>
      </select></td>
      <td><button class="btn danger" style="padding:4px 8px" data-bdel="${i}">×</button></td></tr>`;}).join('') +
    `</table></div><p class="hint">${view.length}${buildingKindFilter?' (filtered)':''} of ${buildings.length} buildings.</p>`;
  box.querySelectorAll('input,select').forEach(i => i.oninput = e => {
    buildings[+e.target.dataset.bi][e.target.dataset.bk] = e.target.value; store.set('rnb_buildings', buildings); });
  box.querySelectorAll('[data-bdel]').forEach(b => b.onclick = () => {
    buildings.splice(+b.dataset.bdel,1); store.set('rnb_buildings', buildings); renderBuildingsTable(); });
}
function renderItemsTable(){
  const box = $('#itemsTable');
  if(!box) return;
  const view = items.map((it,i) => ({it,i})).filter(x => !dataItemsCat || (x.it.cat||'') === dataItemsCat);
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
  const cats = [...new Set(items.map(i => i.cat).filter(c => c && allow.includes(c)))];
  $('#catChips').innerHTML = cats.map(c =>
    `<button class="chip" data-cat="${esc(c)}" aria-pressed="${catFilter === c}">${esc(c)}</button>`).join('') +
    (catFilter ? `<button class="chip" data-cat="" aria-pressed="false">Show all</button>` : '');
  $$('#catChips .chip').forEach(b => b.onclick = () => {
    catFilter = (b.dataset.cat === catFilter) ? '' : b.dataset.cat;
    renderCatChips(); $('#itemInput').focus();
  });
}
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
  if(pendingKind === 'roads'){ roads = roads.concat(out); store.set('rnb_roads', roads); renderRoadsTable(); }
  else if(pendingKind === 'buildings'){ buildings = buildings.concat(out); store.set('rnb_buildings', buildings); renderBuildingsTable(); }
  else if(pendingKind === 'sor'){ sorItems = sorItems.concat(out); store.set('rnb_sor_items', sorItems); renderSorCatChips(); renderSorTable(); }
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
  const cats = [...new Set(sorItems.map(i => i.cat).filter(Boolean))].sort();
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
  const view = sorItems.map((it,i) => ({it,i})).filter(x => !sorCatFilter || (x.it.cat||'') === sorCatFilter);
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
$('#btnAddSor').onclick = () => { sorItems.unshift({itemNo:'', desc:'', rate:'', unit:'MT', cat:''}); store.set('rnb_sor_items', sorItems); renderSorTable(); };
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
$('#btnAddRoad').onclick = () => { roads.unshift({name:'', km:''}); store.set('rnb_roads', roads); renderRoadsTable(); };
$('#btnAddBuilding').onclick = () => { buildings.unshift({name:''}); store.set('rnb_buildings', buildings); renderBuildingsTable(); };
$('#btnAddItem').onclick = () => { items.unshift({itemNo:'', desc:'', rate:'', unit:'MT', cat: dataItemsCat || ''}); store.set('rnb_items', items); renderItemsTable(); };
$('#btnAddWD').onclick = () => { workDescs.unshift({text:'', type: est.mode || 'both'}); store.set('rnb_workdescs', workDescs); renderWDTable(); };
$('#btnAddPerson').onclick = () => { people.unshift(''); store.set('rnb_people', people); renderPeopleTable(); };
$('#btnResetData').onclick = () => {
  if(!confirm('Built-in roads aur items wapas load karein? Aapke manual changes chale jayenge.')) return;
  roads = ROADS_SEED.slice(); items = ITEMS_SEED.slice();
  store.set('rnb_roads', roads); store.set('rnb_items', items);
  renderRoadsTable(); renderItemsTable(); renderCatChips(); refreshHints(); toast('Built-in data reload ho gaya.');
};

/* ------------------------------- bind form ------------------------------- */
$('#roadKm').value = est.roadKm || ''; $('#roadKm').oninput = () => { est.roadKm = $('#roadKm').value; save(); refreshWorkName(); };
$('#wcFrom').value = est.wcFrom || ''; $('#wcFrom').oninput = () => { est.wcFrom = $('#wcFrom').value; save(); refreshWorkName(); };
$('#wcTo').value   = est.wcTo   || ''; $('#wcTo').oninput   = () => { est.wcTo   = $('#wcTo').value;   save(); refreshWorkName(); };
$('#qcPct').value = est.qc; $('#qcPct').oninput = e => { est.qc = n(e.target.value); save(); refreshTotals(); };
$('#lcRate').value = est.lc; $('#lcRate').oninput = e => { est.lc = n(e.target.value); save(); };
$('#roadInput').value = est.road || '';

function bindOffice(sel, key){
  const el = $(sel); el.value = office[key];
  el.oninput = () => { office[key] = el.value; store.set('rnb_office', office); };
}
bindOffice('#divName','div'); bindOffice('#subDivName','sub'); bindOffice('#genDesc','desc');

/* road / building name combo — dynamic source + free text */
freeText($('#roadInput'), 'road', refreshWorkName);
makeCombo($('#roadInput'), $('#roadList'),
  () => (MODE[est.mode] ? MODE[est.mode].list() : []).map(r => ({
    label:r.name, meta: r.km ? 'Km ' + r.km : '', search: r.name + ' ' + (r.km||''), raw:r })),
  d => { est.road = d.raw.name;
         if(d.raw.km){ est.roadKm = d.raw.km; $('#roadKm').value = d.raw.km; }
         $('#roadInput').value = d.raw.name; save(); refreshWorkName();
         if(est.mode === 'road') $('#wcFrom').focus(); });

/* work description combo — dropdown + free text (ARC mode) */
freeText($('#workDesc'), 'workDesc', refreshWorkName);
makeCombo($('#workDesc'), $('#workDescList'),
  () => workDescs.filter(w => w.text && (w.type === est.mode || w.type === 'both'))
                 .map(w => ({ label:w.text, search:w.text, raw:w })),
  d => { est.workDesc = d.raw.text; $('#workDesc').value = d.raw.text; save(); refreshWorkName(); });

/* work description free-text (SOR / RA mode) — same est.workDesc key */
{
  const fi = $('#workDescFree');
  if(fi){
    fi.value = est.workDesc || '';
    fi.addEventListener('input', () => { est.workDesc = fi.value; save(); refreshWorkName(); });
  }
}

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
    const rs = est.rateSource || 'arc';
    if(rs === 'sor'){
      return sorItems.filter(it => it.desc).map(it => ({
        label: it.desc.length > 150 ? it.desc.slice(0,150) + '…' : it.desc,
        meta: `SOR ${it.itemNo} · ₹ ${fmt(n(it.rate))} / ${it.unit}${it.cat ? ' · ' + it.cat.replace(/^CH-/,'CH-') : ''}`,
        search: [it.desc, it.unit, it.itemNo, it.cat].join(' '), raw: it }));
    }
    if(rs === 'ra'){
      return [];  // RA list to be added later
    }
    // ARC (default) — filter by mode categories + optional chip
    return items.filter(it => (!MODE[est.mode] || MODE[est.mode].cats.includes(it.cat))
                          && (!catFilter || it.cat === catFilter)).map(it => ({
      label: it.desc.length > 150 ? it.desc.slice(0,150) + '…' : it.desc,
      meta: `No.${it.itemNo} · ₹ ${fmt(n(it.rate))} / ${it.unit}${it.cat ? ' · ' + it.cat : ''}`,
      search: [it.desc, it.unit, it.itemNo, it.cat].join(' '), raw: it }));
  },
  d => { const it = d.raw;
    est.lines.push({ appRateNo: it.itemNo || '', desc: it.desc, rate: it.rate,
                     unit: it.unit || 'MT', cat: it.cat || '', sayOverride: null, rows:[blankRow()] });
    $('#itemInput').value = ''; save(); renderItemBlocks(); });

/* ------------------------------- preview ------------------------------- */
const previewData = () => ({ name: buildWorkName(), t: totals(),
  lines: est.lines.map((l, i) => ({ ...l, itemNo: i + 1, ...lineTotal(l) })) });

function renderPreview(){
  if(!est.road || !est.lines.length){
    $('#previewBox').innerHTML = '<div class="empty">Pehle name aur item select karo.</div>'; return; }
  const p = previewData();
  $('#previewBox').innerHTML = `
    <h4>FACE</h4>
    <p><b>Name of Work :-</b> ${esc(p.name)}<br><br>
      Division : ${esc(office.div)}<br>Sub-Division : ${esc(office.sub)}<br>
      Service Head : R &amp; B<br>Amount : <span class="mono">Rs ${fmt(p.t.say)}</span><br>
      Estimate prepared by : ${esc(est.prepBy)}<br>Estimate checked by : ${esc(est.chkBy)}</p>
    <h4>abst. — Abstract</h4>
    <div class="scroll"><table class="tbl">
      <tr><th>Item No.</th><th>Qty. &amp; Unit</th><th>Item of Work</th><th>Rate</th><th>Per</th><th>Amount</th></tr>
      ${p.lines.map(l=>`<tr><td class="mono">${esc(l.itemNo)}</td>
        <td class="num mono">${fmt(l.say)} ${esc(l.unit)}</td>
        <td style="font-size:11px">${esc(l.desc.slice(0,200))}${l.desc.length>200?'…':''}</td>
        <td class="num mono">${fmt(n(l.rate))}</td><td>${esc(l.unit)}</td>
        <td class="num mono">${fmt(l.amount)}</td></tr>`).join('')}
      <tr><td colspan="5"><b>Total</b></td><td class="num mono"><b>${fmt(p.t.total)}</b></td></tr>
      <tr><td colspan="5" class="num">${est.qc} % Q C</td><td class="num mono">${fmt(p.t.qc)}</td></tr>
      <tr><td colspan="5" class="num"><b>Total</b></td><td class="num mono"><b>${fmt(p.t.grand)}</b></td></tr>
      <tr><td colspan="5" class="num"><b>Say</b></td><td class="num mono"><b>${fmt0(p.t.say)}</b></td></tr>
    </table></div>
    <h4>MES — Measurement</h4>
    ${p.lines.map(l => { const kind = unitKind(l.unit), f = FIELDS[kind];
      return `<p style="font-size:11px;margin:10px 0 4px"><b>Item No. ${esc(l.itemNo)}</b></p>
      <div class="scroll"><table class="tbl">
        <tr><th>Chainage</th>${f.map(k=>`<th class="num">${FLABEL[k]}</th>`).join('')}<th class="num">Qty</th><th>Unit</th></tr>
        ${l.rows.map(r=>`<tr><td>${esc(r.ch)}</td>${f.map(k=>`<td class="num mono">${r[k]===''?'':n(r[k])}</td>`).join('')}
          <td class="num mono">${fmt(rowQty(r,kind))}</td><td>${esc(l.unit)}</td></tr>`).join('')}
        <tr><td class="num"><b>Total</b></td>${f.map(()=>'<td></td>').join('')}<td class="num mono"><b>${fmt(l.qty)}</b></td><td>${esc(l.unit)}</td></tr>
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

async function buildWorkbook(){
  const p  = previewData();
  const wb = new ExcelJS.Workbook();
  wb.creator = 'R&B Sub Division, Dahod';
  const NAME = ' Name of Work : - ' + p.name + ' ';

  /* ---------- FACE ---------- */
  const f = wb.addWorksheet('FACE', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0 } });
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
  f.mergeCells('C11:E11'); put(f, 'C11', p.t.say, ARIAL(12, true), CTR, null, RS_FMT);
  put(f, 'B12', 'Administrtively approved under No.', ARIAL(11), {vertical:'top'});
  put(f, 'B13', 'Technically sanctioned under No.',   ARIAL(11), {vertical:'top'});
  put(f, 'B14', 'Estimate prepared by    ', ARIAL(11), {vertical:'top'});
  f.mergeCells('D14:F14'); put(f, 'D14', est.prepBy, ARIAL(11), {vertical:'top'});
  put(f, 'B15', 'Estimate checked by    ', ARIAL(11), {vertical:'top'});
  f.mergeCells('D15:F15'); put(f, 'D15', est.chkBy, ARIAL(11), {vertical:'top'});
  put(f, 'B16', 'Call or Authority            ', ARIAL(11), {vertical:'top'});
  f.mergeCells('A17:F17'); put(f, 'A17', 'GENERAL DESCRIPTION', ARIAL(11, true), CTRC);
  f.mergeCells('B18:F18'); put(f, 'B18', '           ' + office.desc, ARIAL(11), JUST);

  /* ---------- abst. ---------- */
  const a = wb.addWorksheet('abst.', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0 } });
  widths(a, [5.93, 12.81, 42.61, 12.54, 8.09, 16.72]);
  a.getRow(1).height = 43.5; a.getRow(2).height = 9; a.getRow(3).height = 20.1;
  a.getRow(4).height = 9.75; a.getRow(5).height = 45; a.getRow(6).height = 20.1;
  a.mergeCells('A1:F1'); put(a, 'A1', NAME, ARIAL(12, true), CTRC);
  a.mergeCells('A3:F3'); put(a, 'A3', 'ABSTRACT ', ARIAL(16, true), CTRC);
  a.mergeCells('A4:F4');
  ['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount']
    .forEach((h,i) => put(a, String.fromCharCode(65+i) + '5', h, ARIAL(12, true), CTRC, BOX));
  [1,2,3,4,5,6].forEach((v,i) => put(a, String.fromCharCode(65+i) + '6', v, ARIAL(12), CTRC, BOX));

  let r = 7;
  p.lines.forEach(l => {
    const top = r, bot = r + 4;
    a.mergeCells(`A${top}:A${bot}`); a.mergeCells(`E${top}:E${bot}`); a.mergeCells(`F${top}:F${bot}`);
    a.mergeCells(`B${top+1}:B${bot}`); a.mergeCells(`C${top}:C${top+2}`); a.mergeCells(`D${top}:D${top+2}`);
    put(a, 'A'+top, l.itemNo,  ARIAL(12), CTR, BOX);
    put(a, 'B'+top, l.say,     ARIAL(12), CTR, BOX, '0.00');
    put(a, 'B'+(top+1), l.unit, ARIAL(12), CTR, BOX);
    put(a, 'C'+top, l.desc,    ARIAL(12), JUST, {top:THIN, left:THIN, right:THIN});
    put(a, 'D'+top, n(l.rate), ARIAL(12), CTR, {top:THIN, left:THIN, right:THIN}, '0.00');
    put(a, 'E'+top, l.unit,    ARIAL(12), CTR, BOX);
    put(a, 'F'+top, l.amount,  ARIAL(12), {horizontal:'right', wrapText:true}, BOX, '0.00');
    put(a, 'C'+(top+3), 'L.C. included in approved rate', ARIAL(12), CTR, {left:THIN, right:THIN});
    put(a, 'D'+(top+3), n(est.lc), ARIAL(12), CTR, {left:THIN, right:THIN}, '0.00');
    put(a, 'C'+(top+4), 'Approved Rate no ' + (l.appRateNo || l.itemNo), ARIAL(12), CTR, {left:THIN, right:THIN, bottom:THIN});
    put(a, 'D'+(top+4), n(l.rate), ARIAL(12), CTR, {left:THIN, right:THIN, bottom:THIN}, '0.00');
    for(let i = top; i <= bot; i++) a.getRow(i).height = (i === top + 2) ? 219.75 : 20.1;
    r = bot + 1;
  });
  const rTot = r, rQc = r + 1, rGrand = r + 2, rSay = r + 4;
  a.mergeCells(`A${rTot}:E${rTot}`);
  put(a, 'A'+rTot, 'Total', ARIAL(12, true), RGT, BOX);
  put(a, 'F'+rTot, p.t.total, ARIAL(12, true), RGT, BOX, '0.00');
  put(a, 'D'+rQc, est.qc + ' % Q C', ARIAL(12, true), RGT, {top:THIN, bottom:THIN});
  put(a, 'F'+rQc, p.t.qc, ARIAL(12, true), RGT, BOX, '0.00');
  put(a, 'E'+rGrand, 'Total', ARIAL(12, true), RGT, {top:THIN, bottom:THIN});
  put(a, 'F'+rGrand, p.t.grand, ARIAL(12, true), RGT, BOX, '0.00');
  a.mergeCells(`A${rSay}:E${rSay}`);
  put(a, 'A'+rSay, 'Say', ARIAL(12, true), RGT, BOX);
  put(a, 'F'+rSay, p.t.say, ARIAL(12, true), RGT, BOX, '0.00');
  for(let i = rTot; i <= rSay; i++) a.getRow(i).height = 14.25;
  const sg = rSay + 8;
  ['Deputy Executive Engineer','R&B Sub Division','Dahod']
    .forEach((t,i) => put(a, 'C'+(sg+i), t, ARIAL(12), CTRC));

  /* ---------- MES ---------- */
  const m = wb.addWorksheet('MES ', { pageSetup:{ paperSize:9, orientation:'landscape', fitToPage:true, fitToWidth:1, fitToHeight:0 } });
  widths(m, [12.14, 4.99, 12.41, 8.09, 2.56, 9.57, 2.56, 9.84, 2.43, 10.11, 3.10, 9.44, 13.08, 7.95]);
  m.getRow(1).height = 15; m.getRow(2).height = 42; m.getRow(3).height = 21; m.getRow(4).height = 20.25;
  m.mergeCells('A1:N2'); put(m, 'A1', NAME, ARIAL(16), CTR);
  m.mergeCells('A4:N4'); put(m, 'A4', 'MEASUREMENT', ARIAL(16, true), {horizontal:'center'});

  const COLS = { nos:'D', len:'F', wid:'H', thk:'J', den:'L' };
  const XCOL = { nos:'E', len:'G', wid:'I', thk:'K' };
  let mr = 6;
  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind];
    put(m, 'A'+mr, 'Item No.', ARIAL(12, true), {horizontal:'center'});
    put(m, 'B'+mr, l.itemNo,   ARIAL(12, true), {horizontal:'center'});
    mr++;
    m.mergeCells(`A${mr}:N${mr}`); put(m, 'A'+mr, l.desc, ARIAL(12), JUST);
    m.getRow(mr).height = 109.5; mr++;
    put(m, 'A'+mr, 'Chainage ', ARIAL(12, true), {horizontal:'center'});
    fl.forEach(k => put(m, COLS[k] + mr, FLABEL[k], ARIAL(12, true), {horizontal:'center'}));
    mr++;
    m.mergeCells(`A${mr}:E${mr}`);
    if(fl.includes('thk')) put(m, 'J'+mr, 'Avg.', ARIAL(12), {horizontal:'center'});
    mr++;
    l.rows.forEach(row => {
      m.mergeCells(`A${mr}:C${mr}`);
      put(m, 'A'+mr, row.ch, ARIAL(12), CTRC);
      fl.forEach((k, i) => {
        put(m, COLS[k] + mr, n(row[k]), ARIAL(12), CTRC);
        if(i < fl.length - 1) put(m, XCOL[k] + mr, 'x', ARIAL(12), CTRC);
      });
      put(m, 'M'+mr, r2(rowQty(row, kind)), ARIAL(12), CTRC, null, '0.00');
      put(m, 'N'+mr, l.unit, ARIAL(12), CTRC);
      m.getRow(mr).height = 60; mr++;
    });
    put(m, 'L'+mr, 'Total', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, l.qty, ARIAL(12, true), CTRC, null, '0.00');
    put(m, 'N'+mr, l.unit, ARIAL(12, true), CTRC); mr++;
    put(m, 'L'+mr, 'Say', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, l.say, ARIAL(12, true), CTRC, null, '0.00');
    put(m, 'N'+mr, l.unit, ARIAL(12, true), CTRC);
    if(p.lines.length === 1) put(m, 'P'+mr, p.t.say, ARIAL(12, true), CTRC, null, '0.00');
    mr += 2;
  });
  if(p.lines.length > 1){
    put(m, 'L'+mr, 'Estimate Say', ARIAL(12, true), CTRC);
    put(m, 'M'+mr, p.t.say, ARIAL(12, true), CTRC, null, '0.00');
  }
  return wb;
}
function safeName(){
  return (est.road || 'Estimate').replace(/[^\w\- ]+/g,'').replace(/\s+/g,'_').slice(0,55)
    + (est.wcFrom ? '_' + (est.wcFrom + '-' + est.wcTo).replace(/\//g,'.') : '');
}
function download(blob, name){
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click();
  a.remove(); setTimeout(()=> URL.revokeObjectURL(url), 4000);
}
$('#btnXlsx').onclick = async () => {
  if(!est.road || !est.lines.length){ toast('Name aur kam se kam ek item select karo.'); return; }
  const b = $('#btnXlsx'); b.disabled = true; b.textContent = 'Building…';
  try{
    const wb = await buildWorkbook();
    const buf = await wb.xlsx.writeBuffer();
    download(new Blob([buf], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), safeName() + '.xlsx');
  }catch(err){ toast('Excel banane me dikkat: ' + err.message); }
  b.disabled = false; b.textContent = 'Download Excel';
};

/* ------------------------------- pdf export (mirrors the Excel sheets) ------------------------------- */
$('#btnPdf').onclick = () => {
  if(!est.road || !est.lines.length){ toast('Name aur kam se kam ek item select karo.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4', orientation:'portrait' });
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
  function signature(y, xCenter){
    doc.setFont('helvetica','normal'); doc.setFontSize(9);
    doc.text('Deputy Executive Engineer', xCenter, y,      {align:'center'});
    doc.text('R & B Sub Division,',        xCenter, y + 12, {align:'center'});
    doc.text('Dahod.',                     xCenter, y + 24, {align:'center'});
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

  const abody = [];
  abody.push(['1','2','3','4','5','6'].map(v => ({ content:v, styles:{halign:'center'} })));
  p.lines.forEach(l => {
    abody.push([
      { content:String(l.itemNo), rowSpan:5, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.say),       styles:{halign:'center'} },
      { content:l.desc, rowSpan:3, styles:{halign:'left', valign:'top'} },
      { content:fmt(n(l.rate)), rowSpan:3, styles:{halign:'center', valign:'middle'} },
      { content:l.unit, rowSpan:5, styles:{halign:'center', valign:'middle'} },
      { content:fmt(l.amount), rowSpan:5, styles:{halign:'right', valign:'middle'} }
    ]);
    abody.push([ { content:l.unit, rowSpan:4, styles:{halign:'center', valign:'middle'} } ]);
    abody.push([]);
    abody.push([ { content:'L.C. included in approved rate', styles:{halign:'center'} },
                 { content:fmt(n(est.lc)), styles:{halign:'center'} } ]);
    abody.push([ { content:'Approved Rate no ' + (l.appRateNo || l.itemNo), styles:{halign:'center'} },
                 { content:fmt(n(l.rate)), styles:{halign:'center'} } ]);
  });
  const B = fs => ({ fontStyle:'bold' , halign:'right', ...fs });
  abody.push([ { content:'Total', colSpan:5, styles:B() }, { content:fmt(p.t.total), styles:B() } ]);
  abody.push([ { content:'', colSpan:3, styles:{} }, { content:est.qc + ' % Q C', colSpan:2, styles:B() }, { content:fmt(p.t.qc), styles:B() } ]);
  abody.push([ { content:'', colSpan:4, styles:{} }, { content:'Total', styles:B() }, { content:fmt(p.t.grand), styles:B() } ]);
  abody.push([ { content:'Say', colSpan:5, styles:B() }, { content:fmt0(p.t.say), styles:B() } ]);

  doc.autoTable({
    startY:y, margin:{left:M, right:M}, theme:'grid',
    head:[['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount']],
    body:abody, styles:GRID, headStyles:HEAD,
    columnStyles:{ 0:{cellWidth:40, halign:'center'}, 1:{cellWidth:58, halign:'center'},
                   2:{cellWidth:235}, 3:{cellWidth:52, halign:'center'},
                   4:{cellWidth:38, halign:'center'}, 5:{cellWidth:92, halign:'right'} }
  });
  signature(doc.lastAutoTable.finalY + 44, M + 40 + 58 + 235/2);

  /* ================= MES (landscape, gridded) ================= */
  doc.addPage('a4','landscape');
  W = doc.internal.pageSize.getWidth(); M = 30;
  y = sheetTitle('MEASUREMENT', W, M);

  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind];
    if(y > doc.internal.pageSize.getHeight() - 120){ doc.addPage('a4','landscape'); y = sheetTitle('MEASUREMENT', W, M); }
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
      return { content:l.unit, styles:{halign:'center'} };
    }));
    body.push([ { content:'Total', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.qty), styles:{halign:'center', fontStyle:'bold'} },
                { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);
    body.push([ { content:'Say', colSpan:preQty, styles:{halign:'right', fontStyle:'bold'} },
                { content:fmt(l.say), styles:{halign:'center', fontStyle:'bold'} },
                { content:l.unit, styles:{halign:'center', fontStyle:'bold'} } ]);

    const usable = W - 2*M, xW = 14, qtyW = 72, unitW = 52, chainW = 150;
    const fieldW = (usable - chainW - qtyW - unitW - xW*(fl.length-1) - 1) / fl.length;
    const colStyles = {};
    cols.forEach((c,i) => colStyles[i] = { cellWidth:
      c.t==='chain'?chainW : c.t==='x'?xW : c.t==='qty'?qtyW : c.t==='unit'?unitW : fieldW });

    doc.autoTable({ startY:y, margin:{left:M, right:M}, theme:'grid',
      head:[header], body, styles:GRID, headStyles:HEAD, columnStyles:colStyles });
    y = doc.lastAutoTable.finalY + 16;
  });
  signature(y + 12, W - M - 120);

  doc.save(safeName() + '.pdf');
};

$('#btnNew').onclick = () => {
  if(!confirm('Naya estimate shuru karein? Abhi ka data clear ho jayega.')) return;
  est = { mode:est.mode, road:'', roadKm:'', workDesc:'', wcFrom:'', wcTo:'', prepBy:est.prepBy, chkBy:est.chkBy, qc:1, lc:0, lines:[] };
  save();
  ['roadInput','roadKm','workDesc','wcFrom','wcTo'].forEach(id => $('#'+id).value = '');
  refreshWorkName(); renderItemBlocks(); renderPreview();
  $$('nav.tabs button')[0].click(); toast('Naya estimate ready.');
};

/* ------------------------------- init ------------------------------- */
store.set('rnb_roads', roads); store.set('rnb_items', items);
store.set('rnb_buildings', buildings); store.set('rnb_workdescs', workDescs); store.set('rnb_people', people);
$('#workDesc').value = est.workDesc || '';
$('#prepBy').value = est.prepBy || '';
$('#chkBy').value = est.chkBy || '';
refreshHints(); refreshWorkName(); renderItemBlocks(); applyModeUI();
if(!est.mode) openGate();
