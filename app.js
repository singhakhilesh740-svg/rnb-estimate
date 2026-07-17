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

let roads  = store.get('rnb_roads', null) || ROADS_SEED.slice();
let items  = store.get('rnb_items', null) || ITEMS_SEED.slice();
let office = store.get('rnb_office', null) || {...OFFICE_DEFAULT};
let est    = store.get('rnb_est', null) ||
             { road:'', roadKm:'', workDesc:'', wcFrom:'', wcTo:'', prepBy:'', chkBy:'', qc:1, lc:0, lines:[] };
let catFilter = '';

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

/* ------------------------------- tabs ------------------------------- */
$$('nav.tabs button').forEach(b => b.onclick = () => {
  $$('nav.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  ['est','prev','data'].forEach(t => $('#tab-'+t).hidden = (t !== b.dataset.tab));
  if(b.dataset.tab === 'prev') renderPreview();
  if(b.dataset.tab === 'data'){ renderRoadsTable(); renderItemsTable(); }
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
      : '<div class="combo-empty">Kuch nahi mila.</div>';
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
function renderItemsTable(){
  const box = $('#itemsTable');
  if(!items.length){ box.innerHTML = '<div class="empty">Item list khali hai.</div>'; return; }
  box.innerHTML = `<div class="scroll"><table class="tbl" style="min-width:760px">
      <tr><th style="width:7%">It. No.</th><th style="width:50%">Item of work</th><th style="width:12%">Approved rate</th><th style="width:9%">Unit</th><th style="width:16%">Group</th><th></th></tr>` +
    items.map((it,i)=>`<tr>
      <td><input class="mono" data-ii="${i}" data-ik="itemNo" value="${esc(it.itemNo||'')}"></td>
      <td><textarea rows="2" data-ii="${i}" data-ik="desc">${esc(it.desc)}</textarea></td>
      <td><input class="num mono" type="number" step="any" data-ii="${i}" data-ik="rate" value="${it.rate ?? ''}"></td>
      <td><input class="mono" data-ii="${i}" data-ik="unit" value="${esc(it.unit||'')}"></td>
      <td><input data-ii="${i}" data-ik="cat" value="${esc(it.cat||'')}"></td>
      <td><button class="btn danger" style="padding:4px 8px" data-idel="${i}">×</button></td></tr>`).join('') +
    `</table></div><p class="hint">${items.length} items.</p>`;
  box.querySelectorAll('input,textarea').forEach(i => i.oninput = e => {
    items[+e.target.dataset.ii][e.target.dataset.ik] = e.target.value; store.set('rnb_items', items); });
  box.querySelectorAll('[data-idel]').forEach(b => b.onclick = () => {
    items.splice(+b.dataset.idel,1); store.set('rnb_items', items); renderItemsTable(); renderCatChips(); });
}
function renderCatChips(){
  const cats = [...new Set(items.map(i => i.cat).filter(Boolean))];
  $('#catChips').innerHTML = cats.map(c =>
    `<button class="chip" data-cat="${esc(c)}" aria-pressed="${catFilter === c}">${esc(c)}</button>`).join('') +
    (catFilter ? `<button class="chip" data-cat="" aria-pressed="false">Show all</button>` : '');
  $$('#catChips .chip').forEach(b => b.onclick = () => {
    catFilter = (b.dataset.cat === catFilter) ? '' : b.dataset.cat;
    renderCatChips(); $('#itemInput').focus();
  });
}
function refreshHints(){ $('#roadHint').textContent = `${roads.length} roads · ${items.length} items loaded.`; }

/* ------------------------------- excel import ------------------------------- */
let pendingRows = null, pendingKind = null;
const MAPS = {
  roads: [{k:'name', lbl:'Road name', hints:['road','name','work']},
          {k:'km', lbl:'Km (optional)', hints:['km','chainage'], opt:true}],
  items: [{k:'desc', lbl:'Item of work / description', hints:['item description','description','item of work','particular']},
          {k:'rate', lbl:'Approved rate', hints:['approved','rate']},
          {k:'unit', lbl:'Unit', hints:['unit','per']},
          {k:'itemNo', lbl:'Item no. (optional)', hints:['item no','sr','sl'], opt:true},
          {k:'cat', lbl:'Group (optional)', hints:['group','category','cat'], opt:true}]
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
  $('#mapTitle').textContent = kind === 'roads' ? 'Road list — match the columns' : 'Item list — match the columns';
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
    const key = pendingKind === 'roads' ? o.name : o.desc;
    if(!key || key.length < 3) return;
    if(pendingKind === 'items'){ o.rate = r2(n(String(o.rate).replace(/[^0-9.\-]/g,''))); if(!o.rate) return; }
    out.push(o);
  });
  if(!out.length){ toast('Valid data nahi mila.'); return; }
  if(pendingKind === 'roads'){ roads = roads.concat(out); store.set('rnb_roads', roads); renderRoadsTable(); }
  else { items = items.concat(out); store.set('rnb_items', items); renderItemsTable(); renderCatChips(); }
  $('#mapModal').style.display = 'none';
  toast(`${out.length} ${pendingKind} import ho gaye.`); refreshHints();
};
$('#fileRoads').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('roads', s)); e.target.value = ''; };
$('#fileItems').onchange = e => { if(e.target.files[0]) readSheet(e.target.files[0], s => s && openMapper('items', s)); e.target.value = ''; };
$('#btnAddRoad').onclick = () => { roads.unshift({name:'', km:''}); store.set('rnb_roads', roads); renderRoadsTable(); };
$('#btnAddItem').onclick = () => { items.unshift({itemNo:'', desc:'', rate:'', unit:'MT', cat:''}); store.set('rnb_items', items); renderItemsTable(); };
$('#btnResetData').onclick = () => {
  if(!confirm('Built-in roads aur items wapas load karein? Aapke manual changes chale jayenge.')) return;
  roads = ROADS_SEED.slice(); items = ITEMS_SEED.slice();
  store.set('rnb_roads', roads); store.set('rnb_items', items);
  renderRoadsTable(); renderItemsTable(); renderCatChips(); refreshHints(); toast('Built-in data reload ho gaya.');
};

/* ------------------------------- bind form ------------------------------- */
function bind(sel, key, cb){
  const el = $(sel); el.value = est[key] ?? '';
  el.oninput = () => { est[key] = el.value; save(); cb && cb(); };
}
['roadKm','workDesc','wcFrom','wcTo'].forEach(k => bind('#'+k, k, refreshWorkName));
bind('#prepBy','prepBy'); bind('#chkBy','chkBy');
$('#qcPct').value = est.qc; $('#qcPct').oninput = e => { est.qc = n(e.target.value); save(); refreshTotals(); };
$('#lcRate').value = est.lc; $('#lcRate').oninput = e => { est.lc = n(e.target.value); save(); };
$('#roadInput').value = est.road || '';

function bindOffice(sel, key){
  const el = $(sel); el.value = office[key];
  el.oninput = () => { office[key] = el.value; store.set('rnb_office', office); };
}
bindOffice('#divName','div'); bindOffice('#subDivName','sub'); bindOffice('#genDesc','desc');

makeCombo($('#roadInput'), $('#roadList'),
  () => roads.map(r => ({ label:r.name, meta: r.km ? 'Km ' + r.km : '', search: r.name + ' ' + (r.km||''), raw:r })),
  d => { est.road = d.raw.name;
         if(d.raw.km){ est.roadKm = d.raw.km; $('#roadKm').value = d.raw.km; }
         $('#roadInput').value = d.raw.name; save(); refreshWorkName(); $('#wcFrom').focus(); });

makeCombo($('#itemInput'), $('#itemList'),
  () => items.filter(it => !catFilter || it.cat === catFilter).map(it => ({
    label: it.desc.length > 150 ? it.desc.slice(0,150) + '…' : it.desc,
    meta: `No.${it.itemNo} · ₹ ${fmt(n(it.rate))} / ${it.unit}${it.cat ? ' · ' + it.cat : ''}`,
    search: [it.desc, it.unit, it.itemNo, it.cat].join(' '), raw: it })),
  d => { const it = d.raw;
    est.lines.push({ appRateNo: it.itemNo || '', desc: it.desc, rate: it.rate,
                     unit: it.unit || 'MT', cat: it.cat || '', sayOverride: null, rows:[blankRow()] });
    $('#itemInput').value = ''; save(); renderItemBlocks(); });

/* ------------------------------- preview ------------------------------- */
const previewData = () => ({ name: buildWorkName(), t: totals(),
  lines: est.lines.map((l, i) => ({ ...l, itemNo: i + 1, ...lineTotal(l) })) });

function renderPreview(){
  if(!est.road || !est.lines.length){
    $('#previewBox').innerHTML = '<div class="empty">Pehle road aur item select karo.</div>'; return; }
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

  // one 5-row block per item, mirroring the original merge pattern
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

  // Nos | x | Length | x | Width | x | Thick | x | Density  -> cols D,E,F,G,H,I,J,K,L
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
  if(!est.road || !est.lines.length){ toast('Road aur kam se kam ek item select karo.'); return; }
  const b = $('#btnXlsx'); b.disabled = true; b.textContent = 'Building…';
  try{
    const wb = await buildWorkbook();
    const buf = await wb.xlsx.writeBuffer();
    download(new Blob([buf], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), safeName() + '.xlsx');
  }catch(err){ toast('Excel banane me dikkat: ' + err.message); }
  b.disabled = false; b.textContent = 'Download Excel';
};

/* ------------------------------- pdf export ------------------------------- */
$('#btnPdf').onclick = () => {
  if(!est.road || !est.lines.length){ toast('Road aur kam se kam ek item select karo.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const p = previewData(), W = doc.internal.pageSize.getWidth(), M = 36;

  function head(title){
    doc.setFont('helvetica','bold'); doc.setFontSize(13);
    doc.text('ESTIMATE', W/2, 48, {align:'center'});
    doc.setFont('helvetica','normal'); doc.setFontSize(9);
    doc.text(office.div, W/2, 62, {align:'center'});
    doc.setLineWidth(2);   doc.line(M, 70, W-M, 70);
    doc.setLineWidth(0.5); doc.line(M, 74, W-M, 74);
    doc.setFont('helvetica','bold'); doc.setFontSize(10);
    doc.text(title, W/2, 90, {align:'center'});
    doc.setFont('helvetica','bold'); doc.setFontSize(8);
    const t = doc.splitTextToSize('Name of Work :- ' + p.name, W - 2*M);
    doc.text(t, M, 106);
    doc.setFont('helvetica','normal');
    return 106 + t.length*10 + 8;
  }
  function sign(y){
    const H = doc.internal.pageSize.getHeight();
    if(y > H - 66) return;
    const x = W * 0.72;
    doc.setFontSize(9);
    doc.text('Deputy Executive Engineer', x, y, {align:'center'});
    doc.text('R & B Sub Division,', x, y+12, {align:'center'});
    doc.text('Dahod.', x, y+24, {align:'center'});
  }

  // FACE
  let y = head('FACE');
  doc.autoTable({ startY:y, theme:'grid', styles:{font:'helvetica', fontSize:9, cellPadding:4},
    columnStyles:{ 0:{cellWidth:190, fontStyle:'bold'} },
    body:[ ['Division', office.div], ['Sub - Division', office.sub], ['Service Head', 'R & B'],
           ['Amount (Rs.)', fmt(p.t.say)], ['Administratively approved under No.', ''],
           ['Technically sanctioned under No.', ''], ['Estimate prepared by', est.prepBy],
           ['Estimate checked by', est.chkBy] ] });
  y = doc.lastAutoTable.finalY + 18;
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('GENERAL DESCRIPTION', M, y);
  doc.setFont('helvetica','normal'); doc.setFontSize(8);
  doc.text(doc.splitTextToSize(office.desc, W - 2*M), M, y + 14);

  // ABSTRACT
  doc.addPage(); y = head('ABSTRACT');
  doc.autoTable({ startY:y, theme:'grid',
    head:[['Item No.','Qty. & Unit','Item of Work','Rate','Per','Amount']],
    body: p.lines.map(l => [l.itemNo, fmt(l.say) + ' ' + l.unit, l.desc, fmt(n(l.rate)), l.unit, fmt(l.amount)]),
    foot: [ ['','','','','Total', fmt(p.t.total)], ['','','','', est.qc + ' % Q C', fmt(p.t.qc)],
            ['','','','','Total', fmt(p.t.grand)], ['','','','','Say', fmt0(p.t.say)] ],
    styles:{font:'helvetica', fontSize:7, cellPadding:3, valign:'middle', overflow:'linebreak'},
    headStyles:{fillColor:[18,58,94], textColor:255, fontSize:8, halign:'center'},
    footStyles:{fillColor:[238,243,248], textColor:20, fontStyle:'bold', halign:'right'},
    columnStyles:{ 0:{cellWidth:36, halign:'center'}, 1:{cellWidth:54, halign:'right'},
                   3:{cellWidth:46, halign:'right'}, 4:{cellWidth:30, halign:'center'},
                   5:{cellWidth:64, halign:'right'} } });
  sign(doc.lastAutoTable.finalY + 40);

  // MEASUREMENT
  doc.addPage(); y = head('MEASUREMENT');
  p.lines.forEach(l => {
    const kind = unitKind(l.unit), fl = FIELDS[kind];
    if(y > doc.internal.pageSize.getHeight() - 140){ doc.addPage(); y = head('MEASUREMENT'); }
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.text('Item No. ' + l.itemNo, M, y); y += 11;
    doc.setFont('helvetica','normal'); doc.setFontSize(7);
    const d = doc.splitTextToSize(l.desc, W - 2*M); doc.text(d, M, y); y += d.length*8 + 6;
    doc.autoTable({ startY:y, theme:'grid',
      head:[['Chainage', ...fl.map(k => FLABEL[k]), 'Qty', 'Unit']],
      body: l.rows.map(r => [r.ch, ...fl.map(k => r[k] === '' ? '' : n(r[k])), fmt(rowQty(r, kind)), l.unit]),
      foot: [ ['Total', ...fl.map(()=>''), fmt(l.qty), l.unit], ['Say', ...fl.map(()=>''), fmt(l.say), l.unit] ],
      styles:{font:'helvetica', fontSize:7.5, cellPadding:3, halign:'center'},
      headStyles:{fillColor:[18,58,94], textColor:255},
      footStyles:{fillColor:[238,243,248], textColor:20, fontStyle:'bold'},
      columnStyles:{ 0:{cellWidth:140, halign:'left'} } });
    y = doc.lastAutoTable.finalY + 16;
  });
  sign(y + 20);
  doc.save(safeName() + '.pdf');
};

$('#btnNew').onclick = () => {
  if(!confirm('Naya estimate shuru karein? Abhi ka data clear ho jayega.')) return;
  est = { road:'', roadKm:'', workDesc:'', wcFrom:'', wcTo:'', prepBy:est.prepBy, chkBy:est.chkBy, qc:1, lc:0, lines:[] };
  save();
  ['roadInput','roadKm','workDesc','wcFrom','wcTo'].forEach(id => $('#'+id).value = '');
  refreshWorkName(); renderItemBlocks(); renderPreview();
  $$('nav.tabs button')[0].click(); toast('Naya estimate ready.');
};

/* ------------------------------- init ------------------------------- */
store.set('rnb_roads', roads); store.set('rnb_items', items);
refreshHints(); refreshWorkName(); renderItemBlocks(); renderCatChips();
