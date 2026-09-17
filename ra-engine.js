/* ============================================================================
   R&B Estimate Builder — RATE ANALYSIS ENGINE
   ----------------------------------------------------------------------------
   1. Store      — library defaults + user edits/custom RAs, per district
   2. Editor     — Data → Rate Analysis: edit any component of any RA
   3. Estimate   — "Based on: RA" source; picked RAs get serial 1,2,3… per estimate
   4. Export     — RA annexure as its own Excel workbook and its own PDF
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ utils */
  const q  = (s, r) => (r || document).querySelector(s);
  const qq = (s, r) => Array.from((r || document).querySelectorAll(s));
  const numv = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };
  const r2 = v => Math.round((v + Number.EPSILON) * 100) / 100;
  const money = v => (Number(v) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const toastMsg = m => { if (typeof toast === 'function') toast(m); else console.log('[RA]', m); };

  const KINDS = ['SOR', 'MR', 'Quotation', 'Manual'];

  function district() {
    return (typeof activeDistrict === 'function')
      ? activeDistrict(window.userProfile) : 'Dahod';
  }
  function libFor(d) {
    if (typeof DISTRICT_RA_LIBRARY === 'undefined') return null;
    return DISTRICT_RA_LIBRARY[d] || DISTRICT_RA_LIBRARY['Dahod'] || null;
  }

  /* ------------------------------------------------------------- store layer */
  /* localStorage['rnb_ra_<District>'] = { edits:{id:RA}, deleted:[id], custom:[RA] } */
  const storeKey = () => 'rnb_ra_' + district();

  function readStore() {
    try {
      const raw = JSON.parse(localStorage.getItem(storeKey()) || '{}');
      return { edits: raw.edits || {}, deleted: raw.deleted || [], custom: raw.custom || [] };
    } catch (e) { return { edits: {}, deleted: [], custom: [] }; }
  }
  function writeStore(s) {
    try { localStorage.setItem(storeKey(), JSON.stringify(s)); }
    catch (e) { toastMsg('Storage full — kuch RA save nahi hue.'); }
  }

  /* Effective RA list = library defaults (minus deleted, plus edits) + custom */
  function raAll() {
    const lib = libFor(district());
    const s = readStore();
    const out = [];
    (lib && lib.rateAnalysis ? lib.rateAnalysis : []).forEach(base => {
      if (s.deleted.indexOf(base.id) >= 0) return;
      out.push(s.edits[base.id] ? JSON.parse(JSON.stringify(s.edits[base.id])) : JSON.parse(JSON.stringify(base)));
    });
    s.custom.forEach(c => { if (s.deleted.indexOf(c.id) < 0) out.push(JSON.parse(JSON.stringify(c))); });
    return out;
  }
  function raById(id) { return raAll().find(r => r.id === id) || null; }
  function isCustom(id) { return String(id).indexOf('ra_') === 0; }

  function raSave(ra) {
    const s = readStore();
    if (isCustom(ra.id)) {
      const i = s.custom.findIndex(c => c.id === ra.id);
      if (i >= 0) s.custom[i] = ra; else s.custom.push(ra);
    } else {
      s.edits[ra.id] = ra;
    }
    writeStore(s);
  }
  function raDelete(id) {
    const s = readStore();
    if (isCustom(id)) s.custom = s.custom.filter(c => c.id !== id);
    else if (s.deleted.indexOf(id) < 0) s.deleted.push(id);
    delete s.edits[id];
    writeStore(s);
  }
  function raResetOne(id) {
    const s = readStore();
    delete s.edits[id];
    s.deleted = s.deleted.filter(x => x !== id);
    writeStore(s);
  }
  function raResetAll() {
    localStorage.removeItem(storeKey());
  }
  function raIsEdited(id) {
    const s = readStore();
    return !!s.edits[id] || isCustom(id);
  }

  function newRA() {
    return {
      id: 'ra_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      itemNo: '', desc: 'New rate analysis', unit: 'Cum',
      basis: 'Per 1 unit', basisQty: 1, cp: 15, floors: false,
      pdfRate: null,
      components: [{ sr: 'A1', kind: 'SOR', code: '', page: '', label: '', unit: '', qty: 1, rate: 0, cpApply: false }]
    };
  }

  /* --------------------------------------------------- live rate resolution */
  /* Pulls the current SOR / Market / Quotation rate for a component, so that
     editing a market rate in the MR tab flows through to every RA using it. */
  function resolver(useLive) {
    if (!useLive) return null;
    return function (c) {
      try {
        if (c.kind === 'SOR' && c.code && typeof sorRateOf === 'function')
          return sorRateOf(window.userProfile, c.code, c.page);
        if (c.kind === 'MR' && c.label && typeof mrRateOf === 'function')
          return mrRateOf(window.userProfile, c.label);
        if (c.kind === 'Quotation' && c.label && typeof qRateOf === 'function')
          return qRateOf(window.userProfile, c.label);
      } catch (e) { /* fall through to stored rate */ }
      return null;
    };
  }
  let LIVE = true;   // toggled in the RA tab

  function calc(ra) { return raCompute(ra, resolver(LIVE)); }

  /* ================================================================== EDITOR */
  let curTab = 'list';      // list | edit | mr | quot | sor
  let editId = null;
  let draft = null;         // working copy while editing
  let search = '';

  function panel() { return document.getElementById('raPanel'); }

  function setCount() {
    const el = document.getElementById('cRA');
    if (el) el.textContent = raAll().length;
  }

  /* ----------------------------------------------------------- list view */
  function viewList() {
    let list = raAll();
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(r =>
        String(r.desc || '').toLowerCase().includes(s) ||
        String(r.topic || '').toLowerCase().includes(s) ||
        String(r.source || '').toLowerCase().includes(s) ||
        String(r.itemNo || '').toLowerCase().includes(s) ||
        String(r.id || '').toLowerCase().includes(s));
    }
    let h = `<div style="padding:8px 10px;display:flex;gap:8px;align-items:center;background:#f4f6fa;border-bottom:1px solid #dde;flex-wrap:wrap">
      <button class="btn" id="raNew" style="padding:4px 12px">+ New RA</button>
      <button class="btn ghost" id="raXlsxAll" style="padding:4px 12px">⬇ Excel (all)</button>
      <button class="btn ghost" id="raPdfAll" style="padding:4px 12px">⬇ PDF (all)</button>
      <label style="margin-left:auto;font-size:12px;display:flex;align-items:center;gap:5px">
        <input type="checkbox" id="raLive" ${LIVE ? 'checked' : ''}> Live SOR/MR rates
      </label>
      <button class="btn ghost" id="raResetAll" style="padding:4px 10px;font-size:11px;color:#b3402a">Reset all</button>
    </div>`;

    if (!list.length) return h + '<p style="padding:20px;color:#678">Koi RA nahi mila.</p>';

    h += '<table style="width:100%;border-collapse:collapse;font-size:13px">' +
      '<thead style="position:sticky;top:0;background:#eef;z-index:1"><tr>' +
      th('#', 'left', 42) + th('Item No.', 'left', 70) + th('Description', 'left') +
      th('Unit', 'left', 55) + th('Basis', 'left', 120) +
      th('Rate ₹', 'right', 90) + th('Source', 'right', 78) + th('', 'center', 96) +
      '</tr></thead><tbody>';

    list.forEach((ra, i) => {
      const c = calc(ra);
      const bg = i % 2 ? '#f9fafc' : '#fff';
      const edited = raIsEdited(ra.id);
      const drift = ra.pdfRate ? Math.abs(c.perUnit - ra.pdfRate) / ra.pdfRate * 100 : 0;
      h += `<tr style="background:${bg};border-bottom:1px solid #eef">
        <td style="padding:6px 8px;color:#89a">${i + 1}</td>
        <td style="padding:6px 8px">${esc(ra.itemNo || '—')}</td>
        <td style="padding:6px 8px">${esc(String(ra.desc || '').slice(0, 110))}${(ra.desc || '').length > 110 ? '…' : ''}
          ${edited ? '<span style="font-size:10px;background:#48c;color:#fff;padding:1px 5px;border-radius:3px;margin-left:5px">edited</span>' : ''}
          ${ra.floors ? '<span style="font-size:10px;background:#7a5;color:#fff;padding:1px 5px;border-radius:3px;margin-left:4px">floors</span>' : ''}</td>
        <td style="padding:6px 8px">${esc(ra.unit || '')}</td>
        <td style="padding:6px 8px;font-size:11px;color:#678">${esc(ra.basis || '')}</td>
        <td style="padding:6px 8px;text-align:right"><b>${money(c.perUnit)}</b></td>
        <td style="padding:6px 8px;text-align:right;font-size:11px;color:${drift > 2 ? '#b3402a' : '#789'}">${ra.pdfRate ? money(ra.pdfRate) : '—'}</td>
        <td style="padding:6px 8px;text-align:center;white-space:nowrap">
          <button class="btn ghost" data-ra-edit="${esc(ra.id)}" style="padding:2px 8px;font-size:11px">✏️</button>
          <button class="btn ghost" data-ra-dup="${esc(ra.id)}" style="padding:2px 8px;font-size:11px">⧉</button>
          <button class="btn ghost" data-ra-del="${esc(ra.id)}" style="padding:2px 8px;font-size:11px;color:#b3402a">🗑</button>
        </td>
      </tr>`;
    });
    return h + '</tbody></table>';
  }
  function th(t, al, w) {
    return `<th style="padding:6px 8px;text-align:${al};border-bottom:1px solid #ccd${w ? ';width:' + w + 'px' : ''}">${t}</th>`;
  }

  /* ----------------------------------------------------------- edit view */
  function viewEdit() {
    if (!draft) return '<p style="padding:20px">Koi RA select nahi hai.</p>';
    const c = calc(draft);
    let h = `<div style="padding:10px;background:#f4f6fa;border-bottom:1px solid #dde;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <button class="btn ghost" id="raBackList" style="padding:4px 12px">← List</button>
      <b style="font-size:13px">${isCustom(draft.id) ? 'Custom RA' : 'Library RA — ' + esc(draft.id)}</b>
      <span style="margin-left:auto"></span>
      <button class="btn" id="raSaveBtn" style="padding:4px 16px">💾 Save</button>
      <button class="btn ghost" id="raRevert" style="padding:4px 12px">↺ Revert to default</button>
    </div>

    <div style="padding:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;border-bottom:1px solid #eef">
      ${fld('Item No. (in estimate)', 'itemNo', draft.itemNo, 'text')}
      ${fld('Unit', 'unit', draft.unit, 'text')}
      ${fld('Basis (note)', 'basis', draft.basis, 'text')}
      ${fld('Basis Qty (divisor)', 'basisQty', draft.basisQty, 'number')}
      ${fld("Contractor's profit %", 'cp', draft.cp, 'number')}
      <label style="display:flex;flex-direction:column;gap:3px;font-size:12px;color:#456">
        <span>Floor-wise cascade</span>
        <span style="display:flex;align-items:center;gap:6px;padding-top:6px">
          <input type="checkbox" data-rah="floors" ${draft.floors ? 'checked' : ''}>
          <span style="font-size:11px">lift extra ₹
            <input type="number" step="0.01" data-ralift="rate" value="${draft.liftExtra ? draft.liftExtra.rate : ''}"
              style="width:78px;padding:2px 5px;border:1px solid #ccd;border-radius:4px" placeholder="0.00"></span>
        </span>
      </label>
    </div>

    <div style="padding:10px 12px;border-bottom:1px solid #eef">
      <label style="font-size:12px;color:#456;display:block;margin-bottom:3px">Description</label>
      <textarea data-rah="desc" rows="3" style="width:100%;padding:6px 8px;border:1px solid #ccd;border-radius:5px;font:inherit;font-size:13px">${esc(draft.desc || '')}</textarea>
    </div>

    <div style="padding:10px 12px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <b style="font-size:13px">Components</b>
        <button class="btn ghost" id="raAddComp" style="padding:2px 10px;font-size:11px">+ Add row</button>
        <span style="margin-left:auto;font-size:11px;color:#678">CP column = is component par contractor's profit lagega ya nahi</span>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:820px">
        <thead style="background:#eef"><tr>
          ${th('Sr', 'left', 50)}${th('Type', 'left', 92)}${th('Code / Label', 'left')}
          ${th('Page', 'left', 52)}${th('Unit', 'left', 62)}${th('Qty', 'right', 78)}
          ${th('Rate ₹', 'right', 92)}${th('Amount ₹', 'right', 96)}${th('CP', 'center', 38)}${th('', 'center', 34)}
        </tr></thead><tbody>`;

    c.rows.forEach((row, i) => {
      const bg = i % 2 ? '#f9fafc' : '#fff';
      const live = LIVE && row.kind !== 'Manual' && Number(row.rate) !== Number(draft.components[i].rate);
      h += `<tr style="background:${bg};border-bottom:1px solid #eef">
        <td style="padding:3px 5px"><input data-rc="${i}" data-rck="sr" value="${esc(row.sr)}" style="${inp(44)}"></td>
        <td style="padding:3px 5px">
          <select data-rc="${i}" data-rck="kind" style="${inp(86)}">
            ${KINDS.map(k => `<option${k === row.kind ? ' selected' : ''}>${k}</option>`).join('')}
          </select></td>
        <td style="padding:3px 5px">
          ${row.kind === 'SOR'
            ? `<input data-rc="${i}" data-rck="code" value="${esc(row.code)}" placeholder="SOR code" style="${inp(90)};margin-right:4px">
               <input data-rc="${i}" data-rck="label" value="${esc(row.label)}" placeholder="description" style="${inp(0)};width:calc(100% - 100px)">`
            : `<input data-rc="${i}" data-rck="label" value="${esc(row.label)}" placeholder="item name" style="${inp(0)};width:100%">`}
        </td>
        <td style="padding:3px 5px"><input data-rc="${i}" data-rck="page" value="${esc(row.page)}" style="${inp(44)}"></td>
        <td style="padding:3px 5px"><input data-rc="${i}" data-rck="unit" value="${esc(row.unit)}" style="${inp(54)}"></td>
        <td style="padding:3px 5px"><input type="number" step="0.001" data-rc="${i}" data-rck="qty" value="${row.qty}" style="${inp(70)};text-align:right"></td>
        <td style="padding:3px 5px"><input type="number" step="0.01" data-rc="${i}" data-rck="rate" value="${draft.components[i].rate}"
              style="${inp(84)};text-align:right${live ? ';border-color:#48c;background:#eef6ff' : ''}" title="${live ? 'Live rate in use: ' + money(row.rate) : ''}"></td>
        <td style="padding:3px 6px;text-align:right;font-weight:bold">${money(row.amount)}</td>
        <td style="padding:3px;text-align:center"><input type="checkbox" data-rc="${i}" data-rck="cpApply" ${row.cpApply ? 'checked' : ''}></td>
        <td style="padding:3px;text-align:center"><button class="btn ghost" data-rcdel="${i}" style="padding:1px 6px;font-size:11px;color:#b3402a">✕</button></td>
      </tr>`;
    });

    h += `</tbody><tfoot style="background:#f0f4f8;font-weight:bold">
        <tr><td colspan="7" style="padding:5px 8px;text-align:right">Subtotal</td>
            <td style="padding:5px 8px;text-align:right">${money(c.subtotal)}</td><td colspan="2"></td></tr>
        <tr><td colspan="7" style="padding:5px 8px;text-align:right">Add ${draft.cp || 0} % C.P. on ${money(c.cpBase)}</td>
            <td style="padding:5px 8px;text-align:right">${money(c.cpAmt)}</td><td colspan="2"></td></tr>
        <tr><td colspan="7" style="padding:5px 8px;text-align:right">Total</td>
            <td style="padding:5px 8px;text-align:right">${money(c.total)}</td><td colspan="2"></td></tr>
        <tr style="background:#dfeaf5"><td colspan="7" style="padding:6px 8px;text-align:right">Rate per ${esc(draft.unit || 'unit')} &nbsp;(÷ ${c.basisQty})</td>
            <td style="padding:6px 8px;text-align:right;font-size:14px">${money(c.perUnit)}</td><td colspan="2"></td></tr>
      </tfoot></table></div>`;

    if (c.floors) {
      h += '<div style="margin-top:10px;font-size:12px"><b>Floor-wise rates:</b> ' +
        Object.entries(c.floors).map(([k, v]) => `${esc(k)} = <b>${money(v)}</b>`).join(' · ') + '</div>';
    }
    if (draft.pdfRate) {
      const d = Math.abs(c.perUnit - draft.pdfRate);
      h += `<p style="margin-top:8px;font-size:12px;color:${d / draft.pdfRate > 0.02 ? '#b3402a' : '#678'}">
        Source estimate ka Say rate: <b>${money(draft.pdfRate)}</b> · abhi computed: <b>${money(c.perUnit)}</b>
        ${d > 0.5 ? ' — antar ₹' + money(d) : ' ✓'}</p>`;
    }
    return h + '</div>';
  }
  function inp(w) {
    return `padding:3px 5px;border:1px solid #ccd;border-radius:4px;font:inherit;font-size:12px${w ? ';width:' + w + 'px' : ''}`;
  }
  function fld(lbl, key, val, type) {
    return `<label style="display:flex;flex-direction:column;gap:3px;font-size:12px;color:#456">
      <span>${lbl}</span>
      <input type="${type}" ${type === 'number' ? 'step="0.01"' : ''} data-rah="${key}" value="${esc(val == null ? '' : val)}"
        style="padding:5px 7px;border:1px solid #ccd;border-radius:5px;font:inherit;font-size:13px">
    </label>`;
  }

  /* --------------------------------------------- MR / Quotation / SOR tabs */
  function rateTable(kind) {
    const lib = libFor(district());
    if (!lib) return '<p style="padding:20px;color:#a44">RA library load nahi hui.</p>';
    const isMR = kind === 'mr';
    let rows = (isMR ? lib.marketRates : lib.quotationRates) || [];
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(x => String(x.label || '').toLowerCase().includes(s));
    }
    if (!rows.length) return '<p style="padding:20px;color:#678">Koi item nahi mila.</p>';
    const getter = isMR ? mrRateOf : qRateOf;
    let h = `<p style="padding:8px 12px;margin:0;font-size:12px;color:#567;background:#eef">
      Yahan rate badloge to har us RA ka rate apne aap update ho jayega jisme ye component hai
      (agar upar "Live SOR/MR rates" on hai).</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead style="position:sticky;top:0;background:#eef;z-index:1"><tr>
      ${th(isMR ? 'Market item' : 'Quotation item', 'left')}${th('Unit', 'left', 70)}
      ${th('Default ₹', 'right', 100)}${th('Your rate ₹', 'right', 120)}${th('', 'center', 60)}
      </tr></thead><tbody>`;
    rows.forEach((x, i) => {
      const cur = getter(window.userProfile, x.label);
      const ovr = cur != null && Number(cur) !== Number(x.rate);
      h += `<tr style="background:${i % 2 ? '#f9fafc' : '#fff'};border-bottom:1px solid #eef">
        <td style="padding:6px 8px">${esc(x.label || '')}</td>
        <td style="padding:6px 8px">${esc(x.unit || '')}</td>
        <td style="padding:6px 8px;text-align:right;color:#789">${money(x.rate)}</td>
        <td style="padding:6px 8px;text-align:right">
          <input type="number" step="0.01" value="${cur != null ? cur : ''}" placeholder="${money(x.rate)}"
            data-rk="${isMR ? 'mr' : 'q'}" data-rlabel="${esc(x.label || '')}"
            style="width:108px;padding:4px 6px;border:1px solid ${ovr ? '#48c' : '#ccd'};border-radius:4px;text-align:right;font-weight:${ovr ? 'bold' : 'normal'}"></td>
        <td style="padding:6px 8px;text-align:center">
          <button class="btn ghost rate-save" data-rk="${isMR ? 'mr' : 'q'}" data-rlabel="${esc(x.label || '')}" style="padding:2px 9px;font-size:11px">💾</button></td>
      </tr>`;
    });
    return h + '</tbody></table>';
  }

  function sorTable() {
    const seen = new Map();
    raAll().forEach(ra => {
      (ra.components || []).forEach(c => {
        if (c.kind === 'SOR' && c.code && !seen.has(c.code))
          seen.set(c.code, { code: c.code, page: c.page || '', label: c.label || '' });
      });
    });
    let rows = Array.from(seen.values());
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(x => x.code.toLowerCase().includes(s) || String(x.label).toLowerCase().includes(s));
    }
    if (!rows.length) return '<p style="padding:20px;color:#678">Koi SOR code nahi mila.</p>';
    const d = district();
    let ovr = {}; try { ovr = JSON.parse(localStorage.getItem('rnb_sor_ovr_' + d) || '{}'); } catch (e) { }
    let h = `<p style="padding:8px 12px;margin:0;font-size:12px;color:#567;background:#eef">
      Sirf wahi SOR codes jo kisi RA me use hue hain. Blank = SOR 2024-25 ka default rate.</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead style="position:sticky;top:0;background:#eef;z-index:1"><tr>
      ${th('SOR code', 'left', 110)}${th('Page', 'left', 60)}${th('Description', 'left')}
      ${th('SOR 24-25 ₹', 'right', 110)}${th('Override ₹', 'right', 120)}${th('', 'center', 60)}
      </tr></thead><tbody>`;
    rows.forEach((x, i) => {
      const seed = (typeof SOR_SEED !== 'undefined') ? (SOR_SEED.find(s => s.itemNo === x.code) || {}).rate : null;
      const cur = ovr[x.code];
      h += `<tr style="background:${i % 2 ? '#f9fafc' : '#fff'};border-bottom:1px solid #eef">
        <td style="padding:6px 8px"><b>${esc(x.code)}</b></td>
        <td style="padding:6px 8px">${esc(x.page)}</td>
        <td style="padding:6px 8px;font-size:12px">${esc(String(x.label).slice(0, 90))}</td>
        <td style="padding:6px 8px;text-align:right;color:#789">${seed != null ? money(seed) : '—'}</td>
        <td style="padding:6px 8px;text-align:right">
          <input type="number" step="0.01" value="${cur != null ? cur : ''}" placeholder="${seed != null ? money(seed) : 'default'}"
            data-rk="sor" data-rlabel="${esc(x.code)}"
            style="width:108px;padding:4px 6px;border:1px solid ${cur != null ? '#48c' : '#ccd'};border-radius:4px;text-align:right"></td>
        <td style="padding:6px 8px;text-align:center">
          <button class="btn ghost rate-save" data-rk="sor" data-rlabel="${esc(x.code)}" style="padding:2px 9px;font-size:11px">💾</button></td>
      </tr>`;
    });
    return h + '</tbody></table>';
  }

  /* ------------------------------------------------------------ render/wire */
  function render() {
    const p = panel();
    if (!p) return;
    if (curTab === 'list') p.innerHTML = viewList();
    else if (curTab === 'edit') p.innerHTML = viewEdit();
    else if (curTab === 'mr') p.innerHTML = rateTable('mr');
    else if (curTab === 'quot') p.innerHTML = rateTable('q');
    else if (curTab === 'sor') p.innerHTML = sorTable();
    wire();
    setCount();
  }

  function wire() {
    const p = panel(); if (!p) return;

    /* list actions */
    const nb = q('#raNew', p);
    if (nb) nb.onclick = () => { draft = newRA(); editId = draft.id; curTab = 'edit'; render(); };
    const xl = q('#raXlsxAll', p); if (xl) xl.onclick = () => exportExcel(raAll(), 'Rate_Analysis_' + district());
    const pd = q('#raPdfAll', p);  if (pd) pd.onclick = () => exportPdf(raAll(), 'Rate Analysis — ' + district());
    const lv = q('#raLive', p);    if (lv) lv.onchange = () => { LIVE = lv.checked; render(); };
    const ra_ = q('#raResetAll', p);
    if (ra_) ra_.onclick = () => {
      if (!confirm('Sabhi RA edits mit jayenge aur library ke default wapas aa jayenge. Pakka?')) return;
      raResetAll(); toastMsg('Sab RA default par wapas.'); render();
    };
    qq('[data-ra-edit]', p).forEach(b => b.onclick = () => {
      const ra = raById(b.dataset.raEdit); if (!ra) return;
      draft = JSON.parse(JSON.stringify(ra)); editId = ra.id; curTab = 'edit'; render();
    });
    qq('[data-ra-dup]', p).forEach(b => b.onclick = () => {
      const ra = raById(b.dataset.raDup); if (!ra) return;
      const copy = JSON.parse(JSON.stringify(ra));
      copy.id = 'ra_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      copy.desc = (copy.desc || '') + ' (copy)';
      copy.pdfRate = null;
      raSave(copy); toastMsg('Copy ban gayi.'); render();
    });
    qq('[data-ra-del]', p).forEach(b => b.onclick = () => {
      const ra = raById(b.dataset.raDel); if (!ra) return;
      if (!confirm('"' + String(ra.desc).slice(0, 60) + '" hata dein?')) return;
      raDelete(ra.id); toastMsg('Hata diya.'); render();
    });

    /* edit actions */
    const bl = q('#raBackList', p);
    if (bl) bl.onclick = () => { curTab = 'list'; draft = null; render(); };
    const sv = q('#raSaveBtn', p);
    if (sv) sv.onclick = () => {
      if (!draft) return;
      draft.basisQty = numv(draft.basisQty) || 1;
      draft.cp = numv(draft.cp);
      raSave(draft); toastMsg('RA save ho gaya.'); curTab = 'list'; draft = null; render();
    };
    const rv = q('#raRevert', p);
    if (rv) rv.onclick = () => {
      if (!draft) return;
      if (isCustom(draft.id)) { toastMsg('Ye custom RA hai — default nahi hai.'); return; }
      if (!confirm('Is RA ke saare edits hata kar library default wapas laayein?')) return;
      raResetOne(draft.id); toastMsg('Default wapas aa gaya.'); curTab = 'list'; draft = null; render();
    };
    const ac = q('#raAddComp', p);
    if (ac) ac.onclick = () => {
      draft.components.push({ sr: 'A' + (draft.components.length + 1), kind: 'SOR', code: '', page: '', label: '', unit: '', qty: 1, rate: 0, cpApply: false });
      render();
    };
    qq('[data-rcdel]', p).forEach(b => b.onclick = () => {
      draft.components.splice(+b.dataset.rcdel, 1); render();
    });

    /* header fields */
    qq('[data-rah]', p).forEach(el => {
      const k = el.dataset.rah;
      const handler = () => {
        if (el.type === 'checkbox') draft[k] = el.checked;
        else if (k === 'basisQty' || k === 'cp') draft[k] = numv(el.value);
        else draft[k] = el.value;
        if (k === 'floors' || k === 'cp' || k === 'basisQty' || k === 'unit') render();
      };
      el.onchange = handler;
      if (el.tagName === 'TEXTAREA' || el.type === 'text') el.oninput = () => { draft[k] = el.value; };
    });
    const lift = q('[data-ralift]', p);
    if (lift) lift.onchange = () => {
      const v = numv(lift.value);
      draft.liftExtra = draft.liftExtra || { sorCode: '', page: '', rate: 0 };
      draft.liftExtra.rate = v; render();
    };

    /* component fields */
    qq('[data-rc]', p).forEach(el => {
      const i = +el.dataset.rc, k = el.dataset.rck;
      const commit = () => {
        const c = draft.components[i]; if (!c) return;
        if (el.type === 'checkbox') c[k] = el.checked;
        else if (k === 'qty' || k === 'rate') c[k] = numv(el.value);
        else c[k] = el.value;
        render();
      };
      if (el.tagName === 'SELECT' || el.type === 'checkbox') el.onchange = commit;
      else el.onchange = commit;   // recompute on blur, not every keystroke
    });

    /* MR / Quotation / SOR saves */
    qq('.rate-save', p).forEach(b => b.onclick = () => {
      const kind = b.dataset.rk, label = b.dataset.rlabel;
      const inp2 = p.querySelector(`input[data-rk="${CSS.escape(kind)}"][data-rlabel="${CSS.escape(label)}"]`);
      if (!inp2) return;
      const v = inp2.value.trim();
      if (kind === 'mr') saveMR(district(), label, v);
      else if (kind === 'q') saveQ(district(), label, v);
      else saveSORovr(district(), label, v);
      toastMsg('Saved: ' + label.slice(0, 40));
      render();
    });
  }

  /* ======================================================= ESTIMATE SUPPORT */
  /* Entries offered in the item picker when "Based on" = RA. An RA that has a
     floor cascade contributes one entry per floor, each with its own rate. */
  function pickerEntries() {
    const out = [];
    raAll().forEach(ra => {
      const c = calc(ra);
      if (c.floors) {
        Object.entries(c.floors).forEach(([floor, rate]) => {
          out.push({
            label: (ra.desc || '') + ' — ' + floor,
            meta: `RA${ra.topic ? ' · ' + ra.topic : ''} · ₹ ${money(rate)} / ${ra.unit}${ra.itemNo ? ' · item ' + ra.itemNo : ''}`,
            search: [ra.desc, ra.unit, ra.itemNo, ra.topic, ra.source, floor, 'RA'].join(' '),
            raw: { ra, rate, floor }
          });
        });
      } else {
        out.push({
          label: ra.desc || '',
          meta: `RA${ra.topic ? ' · ' + ra.topic : ''} · ₹ ${money(c.perUnit)} / ${ra.unit}${ra.itemNo ? ' · item ' + ra.itemNo : ''}`,
          search: [ra.desc, ra.unit, ra.itemNo, ra.topic, ra.source, 'RA'].join(' '),
          raw: { ra, rate: c.perUnit, floor: null }
        });
      }
    });
    return out;
  }

  /* RAs actually used by the current estimate, numbered 1..n in line order */
  function usedInEstimate() {
    if (typeof est === 'undefined' || !est || !Array.isArray(est.lines)) return [];
    const seen = new Map();
    est.lines.forEach(l => {
      if (!l.raId) return;
      if (!seen.has(l.raId)) seen.set(l.raId, { ra: raById(l.raId), lines: [] });
      const e = seen.get(l.raId);
      if (e.ra) e.lines.push(l);
    });
    return Array.from(seen.values())
      .filter(e => e.ra)
      .map((e, i) => ({ serial: i + 1, ra: e.ra, lines: e.lines }));
  }

  /* ============================================================ EXPORT: XLSX */
  const AR = (size, bold) => ({ name: 'Arial', size, bold: !!bold });
  const THIN2 = { style: 'thin' };
  const BOX2 = { top: THIN2, left: THIN2, bottom: THIN2, right: THIN2 };

  function raSheet(wb, entries, titleNote) {
    const ws = wb.addWorksheet('RA', {
      pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
    });
    [6, 9, 44, 8, 9, 11, 13, 14].forEach((w, i) => ws.getColumn(i + 1).width = w);
    let r = 1;
    ws.mergeCells(`A${r}:H${r}`);
    const t = ws.getCell(`A${r}`);
    t.value = 'RATE ANALYSIS';
    t.font = AR(16, true); t.alignment = { horizontal: 'center' };
    ws.getRow(r).height = 22; r++;
    if (titleNote) {
      ws.mergeCells(`A${r}:H${r}`);
      const n2 = ws.getCell(`A${r}`);
      n2.value = titleNote; n2.font = AR(10); n2.alignment = { horizontal: 'center', wrapText: true };
      ws.getRow(r).height = 26; r++;
    }
    r++;

    entries.forEach(({ serial, ra }) => {
      const c = calc(ra);
      /* item header */
      ws.mergeCells(`A${r}:H${r}`);
      const hc = ws.getCell(`A${r}`);
      hc.value = `R.A. No. ${serial}${ra.itemNo ? '   (Item No. ' + ra.itemNo + ')' : ''}   —   ${ra.desc || ''}`;
      hc.font = AR(11, true); hc.alignment = { wrapText: true, vertical: 'middle' };
      hc.border = BOX2;
      ws.getRow(r).height = Math.max(18, Math.ceil(String(hc.value).length / 95) * 14 + 6);
      r++;
      if (ra.basis) {
        ws.mergeCells(`A${r}:H${r}`);
        const bc = ws.getCell(`A${r}`);
        bc.value = 'Basis : ' + ra.basis + '     Unit : ' + (ra.unit || '');
        bc.font = AR(9); bc.border = BOX2;
        r++;
      }
      /* column heads */
      ['Sr', 'Type', 'Description / SOR code', 'Page', 'Unit', 'Qty', 'Rate', 'Amount']
        .forEach((h, i) => {
          const cell = ws.getCell(r, i + 1);
          cell.value = h; cell.font = AR(9, true); cell.border = BOX2;
          cell.alignment = { horizontal: i >= 5 ? 'right' : 'center', vertical: 'middle' };
        });
      r++;
      /* rows */
      c.rows.forEach(row => {
        const vals = [row.sr, row.kind,
          (row.kind === 'SOR' && row.code ? row.code + ' — ' : '') + (row.label || ''),
          row.page, row.unit, row.qty, row.rate, row.amount];
        vals.forEach((v, i) => {
          const cell = ws.getCell(r, i + 1);
          cell.value = v; cell.font = AR(9); cell.border = BOX2;
          cell.alignment = { horizontal: i >= 5 ? 'right' : (i === 2 ? 'left' : 'center'), wrapText: i === 2, vertical: 'top' };
          if (i >= 6) cell.numFmt = '#,##0.00';
          if (i === 5) cell.numFmt = '#,##0.000';
        });
        ws.getRow(r).height = Math.max(13, Math.ceil(String(vals[2]).length / 44) * 11 + 3);
        r++;
      });
      /* totals */
      const totRow = (lbl, val, bold) => {
        ws.mergeCells(`A${r}:G${r}`);
        const lc = ws.getCell(`A${r}`);
        lc.value = lbl; lc.font = AR(9, bold); lc.alignment = { horizontal: 'right' }; lc.border = BOX2;
        const vc = ws.getCell(r, 8);
        vc.value = val; vc.font = AR(9, bold); vc.numFmt = '#,##0.00';
        vc.alignment = { horizontal: 'right' }; vc.border = BOX2;
        r++;
      };
      totRow('Sub Total', c.subtotal, false);
      if (c.cpAmt) totRow(`Add ${ra.cp} % Contractor's Profit on ${money(c.cpBase)}`, c.cpAmt, false);
      totRow('Total', c.total, true);
      totRow(`Rate per ${ra.unit || 'unit'}  ( ÷ ${c.basisQty} )`, c.perUnit, true);
      if (c.floors) {
        ws.mergeCells(`A${r}:H${r}`);
        const fc = ws.getCell(`A${r}`);
        fc.value = 'Floor-wise : ' + Object.entries(c.floors).map(([k, v]) => k + ' = ' + money(v)).join('   ·   ');
        fc.font = AR(9); fc.border = BOX2; fc.alignment = { wrapText: true };
        r++;
      }
      r++;   // blank spacer between RAs
    });

    /* signature */
    r++;
    const sb = (typeof signBlock === 'function') ? signBlock()
      : ['Deputy Executive Engineer', 'R & B Sub Division,', 'Dahod.'];
    sb.forEach(line => {
      if (!line) return;
      ws.mergeCells(`F${r}:H${r}`);
      const sc = ws.getCell(`F${r}`);
      sc.value = line; sc.font = AR(10); sc.alignment = { horizontal: 'center' };
      r++;
    });
    return ws;
  }

  async function exportExcel(ras, fileName) {
    if (typeof ExcelJS === 'undefined') { toastMsg('ExcelJS load nahi hua.'); return; }
    const entries = ras.map((ra, i) => ({ serial: i + 1, ra }));
    if (!entries.length) { toastMsg('Koi RA nahi hai.'); return; }
    try {
      const wb = new ExcelJS.Workbook();
      wb.creator = 'R&B Sub Division, Dahod';
      raSheet(wb, entries, district() + ' district — ' + entries.length + ' rate analysis');
      const buf = await wb.xlsx.writeBuffer();
      dl(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        (fileName || 'Rate_Analysis') + '.xlsx');
      toastMsg('Excel ban gaya.');
    } catch (e) { toastMsg('Excel error: ' + e.message); }
  }

  /* ============================================================= EXPORT: PDF */
  function exportPdf(ras, title) {
    if (!window.jspdf) { toastMsg('jsPDF load nahi hua.'); return; }
    const entries = ras.map((ra, i) => ({ serial: i + 1, ra }));
    if (!entries.length) { toastMsg('Koi RA nahi hai.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
    const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 40;
    let y = 0;

    function head(first) {
      y = 46;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
      doc.text('RATE ANALYSIS', W / 2, y, { align: 'center' });
      y += 16;
      if (first && title) {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
        const l = doc.splitTextToSize(title, W - 2 * M);
        doc.text(l, W / 2, y, { align: 'center' });
        y += l.length * 11;
      }
      y += 8;
    }
    head(true);

    entries.forEach(({ serial, ra }) => {
      const c = calc(ra);
      if (y > H - 150) { doc.addPage('a4', 'portrait'); head(false); }

      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5);
      const hdr = doc.splitTextToSize(
        `R.A. No. ${serial}${ra.itemNo ? '   (Item No. ' + ra.itemNo + ')' : ''}   —   ${ra.desc || ''}`,
        W - 2 * M);
      doc.text(hdr, M, y); y += hdr.length * 11 + 2;
      if (ra.basis) {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
        doc.text('Basis : ' + ra.basis + '     Unit : ' + (ra.unit || ''), M, y); y += 11;
      }

      const body = c.rows.map(rw => [
        rw.sr, rw.kind,
        (rw.kind === 'SOR' && rw.code ? rw.code + ' — ' : '') + (rw.label || ''),
        rw.page || '', rw.unit || '',
        Number(rw.qty).toLocaleString('en-IN', { maximumFractionDigits: 3 }),
        money(rw.rate), money(rw.amount)
      ]);
      body.push([{ content: 'Sub Total', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } }, money(c.subtotal)]);
      if (c.cpAmt) body.push([{ content: `Add ${ra.cp} % C.P. on ${money(c.cpBase)}`, colSpan: 7, styles: { halign: 'right' } }, money(c.cpAmt)]);
      body.push([{ content: 'Total', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } }, money(c.total)]);
      body.push([{ content: `Rate per ${ra.unit || 'unit'}  ( ÷ ${c.basisQty} )`, colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: money(c.perUnit), styles: { fontStyle: 'bold' } }]);
      if (c.floors) {
        body.push([{ content: 'Floor-wise : ' + Object.entries(c.floors).map(([k, v]) => k + ' = ' + money(v)).join('   ·   '),
          colSpan: 8, styles: { halign: 'left', fontSize: 7 } }]);
      }

      doc.autoTable({
        startY: y, margin: { left: M, right: M }, theme: 'grid',
        styles: { font: 'helvetica', fontSize: 7.4, cellPadding: 2.5, lineColor: [0, 0, 0], lineWidth: 0.4,
                  textColor: [0, 0, 0], valign: 'top', overflow: 'linebreak' },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center',
                      lineColor: [0, 0, 0], lineWidth: 0.4 },
        head: [['Sr', 'Type', 'Description / SOR code', 'Page', 'Unit', 'Qty', 'Rate', 'Amount']],
        body,
        columnStyles: {
          0: { cellWidth: 22, halign: 'center' }, 1: { cellWidth: 44, halign: 'center' },
          2: { cellWidth: 'auto' }, 3: { cellWidth: 26, halign: 'center' },
          4: { cellWidth: 32, halign: 'center' }, 5: { cellWidth: 40, halign: 'right' },
          6: { cellWidth: 52, halign: 'right' }, 7: { cellWidth: 58, halign: 'right' }
        },
        didDrawPage: () => { }
      });
      y = doc.lastAutoTable.finalY + 14;
    });

    /* signature at the end */
    if (y > H - 90) { doc.addPage('a4', 'portrait'); y = 80; }
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    const sb = (typeof signBlock === 'function') ? signBlock()
      : ['Deputy Executive Engineer', 'R & B Sub Division,', 'Dahod.'];
    sb.forEach((t, i) => { if (t) doc.text(String(t), W - M - 90, y + 24 + i * 12, { align: 'center' }); });

    doc.save((title || 'Rate_Analysis').replace(/[^\w\- ]+/g, '').replace(/\s+/g, '_').slice(0, 60) + '.pdf');
    toastMsg('PDF ban gaya.');
  }

  function dl(blob, name) {
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* =============================== estimate-scoped RA exports (used RAs only) */
  function exportEstimateRAExcel() {
    const used = usedInEstimate();
    if (!used.length) { toastMsg('Is estimate me koi RA item nahi hai.'); return; }
    if (typeof ExcelJS === 'undefined') { toastMsg('ExcelJS load nahi hua.'); return; }
    const name = (typeof buildWorkName === 'function') ? buildWorkName() : '';
    (async () => {
      try {
        const wb = new ExcelJS.Workbook();
        wb.creator = 'R&B Sub Division, Dahod';
        raSheet(wb, used, name ? 'Name of Work : - ' + name : '');
        const buf = await wb.xlsx.writeBuffer();
        const fn = (typeof safeName === 'function' ? safeName() : 'Estimate') + '_RA.xlsx';
        dl(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fn);
        toastMsg(used.length + ' RA ka Excel ban gaya.');
      } catch (e) { toastMsg('Excel error: ' + e.message); }
    })();
  }
  function exportEstimateRAPdf() {
    const used = usedInEstimate();
    if (!used.length) { toastMsg('Is estimate me koi RA item nahi hai.'); return; }
    const name = (typeof buildWorkName === 'function') ? buildWorkName() : '';
    exportPdf(used.map(u => u.ra), name ? 'Name of Work : - ' + name : 'Rate Analysis');
  }

  /* ================================================================== BOOT */
  function boot() {
    /* sub-tab buttons */
    qq('.ra-sub-tab').forEach(b => b.onclick = () => {
      qq('.ra-sub-tab').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      curTab = b.dataset.raTab;
      if (curTab !== 'edit') draft = null;
      render();
    });
    const se = document.getElementById('raSearch');
    if (se) se.oninput = () => { search = se.value.trim(); render(); };

    const back = document.getElementById('btnRABack');
    if (back) back.onclick = () => {
      if (typeof showDataGrid === 'function') showDataGrid();
      else {
        const g = document.getElementById('dataGrid'), d = document.getElementById('dataDetail');
        if (g) g.hidden = false; if (d) d.hidden = true;
        qq('.data-view').forEach(v => v.hidden = true);
      }
    };

    const tile = document.querySelector('#dataGrid .data-tile[data-nav="ra"]');
    if (tile) tile.addEventListener('click', () => setTimeout(() => { curTab = 'list'; draft = null; render(); }, 20));

    /* estimate: RA export buttons */
    const bx = document.getElementById('btnRAXlsx');
    if (bx) bx.onclick = exportEstimateRAExcel;
    const bp = document.getElementById('btnRAPdf');
    if (bp) bp.onclick = exportEstimateRAPdf;

    setCount();
    console.log('[RA] engine ready —', raAll().length, 'RA for', district());
  }

  /* expose for app.js (item picker, line creation, export buttons) */
  window.RA = {
    all: raAll, byId: raById, calc, pickerEntries, usedInEstimate,
    exportExcel, exportPdf, exportEstimateRAExcel, exportEstimateRAPdf,
    render, district
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
