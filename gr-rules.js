/* ============================================================================
   R&B Estimate Builder — GR Rules Engine
   Circular BDG-4273/48535/(728)/Part-1/N (Dt. 19/08/2020), Govt. of Gujarat
   ---------------------------------------------------------------------------
   RCC member sizes, concrete grade & reinforcement auto-derivation.
   User sirf minimum inputs bhare — baaki GR tables se auto-fill.
   ========================================================================== */

(function(){
'use strict';

const $ = s => document.querySelector(s);
const num = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };

/* ─────────────────── TABLE 6: QC lookup (m³ per column footing) ───────────────────
   Rows = SBC (T/m²), Cols = Avg load on column CL (T). Bilinear interpolation. */
const QC_SBC  = [10,12.5,15,17.5,20,22.5,25,27.5,30,32.5,35,37.5,40,42.5,45,47.5,50,55,60,65];
const QC_LOAD = [30,40,50,60,80,90,100,125,150,175,200,225,250,275,300,325,350,375,400];
const QC_GRID = [
 [0.923,1.380,1.926,2.550,3.898,4.728,5.446,7.711,8.395,11.663,14.890,18.009,22.070,29.953,30.109,35.353,40.514,46.420,52.030],
 [0.741,1.043,1.926,1.953,2.095,3.532,4.237,6.074,6.869,9.102,11.365,14.212,17.458,20.153,23.955,27.381,31.691,35.762,40.824],
 [0.571,0.892,1.468,1.556,2.413,2.833,3.387,4.224,5.557,7.611,9.264,11.409,13.914,16.225,19.326,22.756,26.778,29.609,33.725],
 [0.501,0.698,1.247,1.353,1.997,2.484,2.806,3.933,4.614,6.013,7.806,9.614,11.859,13.756,16.350,19.202,21.920,25.299,23.727],
 [0.399,0.618,1.008,1.128,1.665,2.052,2.388,3.343,3.903,5.366,8.699,8.219,10.220,11.834,14.152,16.389,18.626,21.451,24.081],
 [0.370,0.550,0.903,1.016,1.519,1.755,2.152,2.902,3.540,4.514,5.775,7.384,9.105,10.598,12.158,14.333,16.373,18.952,21.515],
 [0.344,0.466,0.752,0.853,1.305,1.602,1.845,2.609,3.049,3.991,5.093,6.475,7.840,9.329,11.025,12.750,14.949,17.148,19.202],
 [0.313,0.431,0.696,0.780,1.180,1.562,1.602,2.303,2.762,3.566,4.704,6.023,7.208,8.366,9.817,11.683,13.018,15.219,16.919],
 [0.277,0.404,0.624,0.713,1.088,1.376,1.489,2.116,2.456,3.420,4.184,5.110,6.486,7.463,8.626,10.561,11.816,13.978,15.385],
 [0.266,0.374,0.523,0.624,0.948,1.120,1.314,1.957,2.312,3.049,3.911,4.822,5.649,6.850,8.032,9.521,10.936,13.705,14.700],
 [0.243,0.316,0.488,0.585,0.894,1.052,1.214,1.767,2.033,2.705,3.507,4.358,5.494,6.188,7.584,8.454,10.218,11.430,12.619],
 [0.230,0.290,0.454,0.546,0.843,1.005,1.151,1.720,1.951,2.569,3.263,4.071,4.989,5.816,6.957,7.993,9.447,10.677,11.919],
 [0.221,0.263,0.439,0.509,0.744,0.865,1.090,1.458,1.825,2.405,3.079,3.655,4.518,5.535,6.305,7.343,8.926,9.885,11.129],
 [0.199,0.266,0.374,0.489,0.670,0.823,0.974,1.386,1.620,2.201,2.795,3.526,4.423,4.960,5.806,7.005,8.224,9.340,10.444],
 [0.199,0.253,0.358,0.439,0.655,0.794,0.919,1.316,1.456,1.971,2.573,3.328,3.930,4.638,5.521,6.523,7.509,8.558,9.614],
 [0.188,0.243,0.346,0.408,0.631,0.746,0.868,1.248,1.392,1.888,2.472,3.204,3.790,4.435,5.109,5.953,7.329,8.171,9.154],
 [0.178,0.230,0.318,0.389,0.571,0.719,0.794,1.211,1.327,1.807,2.373,2.801,3.578,4.240,4.939,5.603,6.663,7.639,8.695],
 [0.160,0.209,0.303,0.359,0.512,0.613,0.720,1.061,1.229,1.584,2.083,2.584,3.198,3.814,4.517,5.141,5.974,6.785,7.759],
 [0.150,0.243,0.277,0.303,0.476,0.572,0.674,0.969,1.071,1.452,1.813,2.420,2.953,3.417,4.072,4.584,5.210,6.200,6.989],
 [0.143,0.179,0.221,0.292,0.441,0.496,0.572,0.992,0.947,1.382,1.891,2.181,2.580,2.936,3.657,4.330,4.857,5.502,6.543]
];

function interpIdx(arr, v){
  if(v <= arr[0]) return {i:0, j:0, f:0};
  if(v >= arr[arr.length-1]) return {i:arr.length-1, j:arr.length-1, f:0};
  for(let k=0;k<arr.length-1;k++){
    if(v >= arr[k] && v <= arr[k+1]){
      return {i:k, j:k+1, f:(v-arr[k])/(arr[k+1]-arr[k])};
    }
  }
  return {i:arr.length-1, j:arr.length-1, f:0};
}

function lookupQC(sbc, load){
  const r = interpIdx(QC_SBC, sbc);
  const c = interpIdx(QC_LOAD, load);
  const v00 = QC_GRID[r.i][c.i], v01 = QC_GRID[r.i][c.j];
  const v10 = QC_GRID[r.j][c.i], v11 = QC_GRID[r.j][c.j];
  const top = v00 + (v01-v00)*c.f;
  const bot = v10 + (v11-v10)*c.f;
  return Math.round((top + (bot-top)*r.f) * 1000) / 1000;
}

/* ─────────────────── TABLE 7: Column size by (load, span) ─────────────────── */
function columnSize(load, span){
  const byLoad = load<=75?0 : load<=125?1 : load<=200?2 : load<=250?3 : load<=350?4 : 5;
  const bySpan = span<=5?0 : span<=7.5?1 : span<=10?2 : span<=15?3 : 4;
  const idx = Math.max(byLoad, bySpan);
  return ['300x450','300x600','300x750','350x900','400x900','400x1000'][Math.min(idx,5)];
}

/* ─────────────────── TABLE 9: Beam size by span ─────────────────── */
function beamSize(span){
  const idx = span<=5?0 : span<=7.5?1 : span<=10?2 : span<=15?3 : 4;
  return ['300x450','300x600','300x750','300x900','300x1100'][idx];
}

/* ─────────────────── TABLE 8: Slab thickness (mm) by span + support ─────────────────── */
const SLAB_SPAN = [3.0,3.5,4.0,4.5,5.0];
const SLAB_GRID = {  /* [Oneway SS, Oneway Conti, Twoway SS, Twoway Conti] */
  onewaySS:   [140,160,180,210,230],
  onewayCont: [120,130,150,160,180],
  twowaySS:   [120,120,140,150,170],
  twowayCont: [120,120,120,140,150]
};
function slabThickness(span, type){
  const col = SLAB_GRID[type] || SLAB_GRID.twowayCont;
  if(span <= SLAB_SPAN[0]) return col[0];
  if(span >= SLAB_SPAN[SLAB_SPAN.length-1]){
    /* extrapolate slightly beyond 5.0 m at ~40mm per m */
    const extra = (span - 5.0) * 40;
    return Math.round(col[col.length-1] + extra);
  }
  const r = interpIdx(SLAB_SPAN, span);
  return Math.round(col[r.i] + (col[r.j]-col[r.i])*r.f);
}

/* ─────────────────── TABLE 10: Concrete grade by exposure (low/med rise) ───────────────────
   exposure: 'mild' | 'moderate' | 'extreme' */
function concreteGrades(exposure){
  const e = (exposure||'moderate').toLowerCase();
  const colFP = e==='mild'?'M 25': e==='extreme'?'M 30':'M 25';   // footing→plinth
  const colUp = e==='mild'?'M 20': e==='extreme'?'M 30':'M 25';   // plinth→FF & above
  const bs    = e==='mild'?'M 20': e==='extreme'?'M 30':'M 25';   // beams & slabs
  return [
    { item:'Footing PCC',                       grade:'M 15' },
    { item:'Column up to Plinth',               grade:colFP },
    { item:'Plinth Beam, Plinth Slab',          grade:bs   },
    { item:'Plinth Slab GF Column, GF Beam',    grade:colUp },
    { item:'GF Slab, Stair, Projections etc',   grade:bs   },
    { item:'other FF RCC items',                grade:colUp }
  ];
}

/* ─────────────────── TABLE 15: Reinforcement kg/m³ by zone + importance ─────────────────── */
const STEEL = {
  'V':   { hi:{footing:'50-60',columns:'325-375',beams:'200-240',slabs:'60-70'}, lo:{footing:'50-55',columns:'300-350',beams:'180-220',slabs:'60-70'} },
  'IV':  { hi:{footing:'40-50',columns:'300-350',beams:'180-220',slabs:'60-70'}, lo:{footing:'40-45',columns:'275-325',beams:'160-180',slabs:'60-70'} },
  'III': { hi:{footing:'40-45',columns:'275-325',beams:'160-180',slabs:'60-70'}, lo:{footing:'35-40',columns:'250-300',beams:'150-160',slabs:'60-70'} }
};
function steelPerCum(zone, I){
  const z = STEEL[zone] || STEEL['III'];
  return (I >= 1.2) ? z.hi : z.lo;
}
function midRange(s){ const p = String(s).split('-').map(Number); return p.length===2 ? (p[0]+p[1])/2 : Number(s)||0; }

/* Dahod district = Zone III (per circular "Remaining Districts") */
const DEFAULT_ZONE = 'III';

/* ─────────────────── main compute ─────────────────── */
function compute(inp){
  const N = num(inp.N), A = num(inp.A), NC = num(inp.NC), IL = num(inp.IL)||2.1;
  const SBC = num(inp.SBC), DF = num(inp.DF);
  const span = num(inp.span)||0, slabSpan = num(inp.slabSpan)||span;
  const support = inp.support || 'twowayCont';
  const exposure = inp.exposure || 'moderate';
  const zone = inp.zone || DEFAULT_ZONE;
  const I = num(inp.I) || 1.0;

  const AN = A * N;
  const AC = NC ? (AN / NC) : 0;
  const CL = AC * IL;
  const QC = (SBC && CL) ? lookupQC(SBC, CL) : 0;
  const TQ = QC * NC;
  const Ldash = (SBC && CL) ? (Math.sqrt(CL*1.1/SBC) + 0.30) : 0;
  const PCC = Ldash*Ldash*0.15*NC;
  const EXC = Ldash*Ldash*DF*NC;

  const col = columnSize(CL, span);
  const beam = beamSize(span);
  const slab = slabThickness(slabSpan, support);
  const grades = concreteGrades(exposure);
  const steel = steelPerCum(zone, I);

  return {
    AN, AC:round(AC), CL:round(CL), QC, TQ:round(TQ), Ldash:round(Ldash), PCC:round(PCC), EXC:round(EXC),
    columnSize:col, beamSize:beam, slabThickness:slab, grades, steel, zone, I, exposure
  };
}
function round(x){ return Math.round(x*1000)/1000; }

/* expose */
window.GR = { lookupQC, columnSize, beamSize, slabThickness, concreteGrades, steelPerCum, compute, applyToSheet, DEFAULT_ZONE, midRange };

/* ═══════════════════════════ UI PANEL ═══════════════════════════ */
function injectCSS(){
  if($('#grCSS')) return;
  const s = document.createElement('style'); s.id='grCSS';
  s.textContent = `
  #grPanel{border:1px solid #c9b98a;background:#fdf9ef;border-radius:8px;padding:12px 14px;margin:10px 0}
  #grPanel h3{margin:0 0 4px;font-size:14px;color:#7a5c1e}
  #grPanel .gr-sub{font-size:11px;color:#8a7a55;margin:0 0 10px}
  #grPanel .gr-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px 12px}
  #grPanel label{display:block;font-size:11px;color:#6a5a35;margin-bottom:2px;font-weight:600}
  #grPanel input,#grPanel select{width:100%;border:1px solid #d8cba0;border-radius:5px;padding:6px 8px;
    font-size:13px;outline:0;font-family:inherit;background:#fff}
  #grPanel input:focus,#grPanel select:focus{border-color:#8a6d3b}
  #grApply{background:#8a6d3b;color:#fff;border:0;border-radius:6px;padding:9px 18px;font-size:13px;
    font-weight:600;cursor:pointer;margin-top:12px}
  #grApply:hover{background:#725a2f}
  #grResult{margin-top:12px;font-size:12px}
  #grResult table{border-collapse:collapse;width:100%;font-size:12px}
  #grResult td,#grResult th{border:1px solid #d8cba0;padding:4px 8px;text-align:left}
  #grResult th{background:#f3ecd8;font-weight:600}
  #grResult .ok{color:#1c6b2b;font-weight:600}
  .gr-note{font-size:11px;color:#8a7a55;margin-top:8px;line-height:1.5}
  `;
  document.head.appendChild(s);
}

function panelHTML(){
  return `
  <h3>⚙ GR Auto-Calc — Circular BDG-4273/48535 (Dt. 19/08/2020)</h3>
  <p class="gr-sub">Neeche ki details bharo — QC, column/beam size, slab thickness, concrete grade aur steel <b>GR tables se auto</b> aa jayega.</p>
  <div class="gr-grid">
    <div><label>No. of Storeys (N) *</label><input id="grN" type="number" step="1" placeholder="e.g. 2 (G+1)"></div>
    <div><label>Floor Area / floor A (m²) *</label><input id="grA" type="number" step="0.01" placeholder="e.g. 180"></div>
    <div><label>Total Columns (NC) *</label><input id="grNC" type="number" step="1" placeholder="e.g. 20"></div>
    <div><label>Load Intensity IL (T/m²)</label><input id="grIL" type="number" step="0.1" value="2.1"></div>
    <div><label>SBC (T/m²) *</label><input id="grSBC" type="number" step="0.5" placeholder="soil report se"></div>
    <div><label>Foundation Depth DF (m) *</label><input id="grDF" type="number" step="0.1" placeholder="e.g. 1.5"></div>
    <div><label>Max Beam Span L (m) *</label><input id="grSpan" type="number" step="0.1" placeholder="e.g. 5.0"></div>
    <div><label>Slab Span (m)</label><input id="grSlabSpan" type="number" step="0.1" placeholder="khaali = beam span"></div>
    <div><label>Slab Support Type</label><select id="grSupport">
      <option value="twowayCont">Two-way Continuous</option>
      <option value="twowaySS">Two-way Simply Supported</option>
      <option value="onewayCont">One-way Continuous</option>
      <option value="onewaySS">One-way Simply Supported</option>
    </select></div>
    <div><label>Exposure Condition</label><select id="grExposure">
      <option value="moderate">Moderate</option>
      <option value="mild">Mild</option>
      <option value="extreme">Extreme</option>
    </select></div>
    <div><label>Earthquake Zone</label><select id="grZone">
      <option value="III">Zone III (Dahod default)</option>
      <option value="IV">Zone IV</option>
      <option value="V">Zone V</option>
    </select></div>
    <div><label>Importance Factor (I)</label><select id="grI">
      <option value="1.0">1.0 (ordinary building)</option>
      <option value="1.2">1.2 (important)</option>
      <option value="1.5">1.5 (critical)</option>
    </select></div>
  </div>
  <button id="grApply">⚙ Apply GR Rules → Fill RCC Sheet</button>
  <div id="grResult"></div>
  <p class="gr-note">* zaroori fields. Baaki GR circular se auto compute honge. QC = Table 6 (SBC × Load) se bilinear interpolation. Column size = Table 7, Beam = Table 9, Slab = Table 8, Concrete grade = Table 10, Steel = Table 15.</p>`;
}

function injectPanel(){
  const anchor = document.getElementById('rcComputed');
  if(!anchor) return false;
  if(document.getElementById('grPanel')) return true;
  const div = document.createElement('div');
  div.id = 'grPanel';
  div.innerHTML = panelHTML();
  anchor.parentNode.insertBefore(div, anchor);

  /* prefill from existing rcc fields if present */
  const rc = (window.project && window.project.meta && window.project.meta.rcc) || {};
  const set = (id,v) => { const e = document.getElementById(id); if(e && v!=null && v!=='') e.value = v; };
  set('grN', rc.N); set('grA', rc.A); set('grNC', rc.NC); set('grIL', rc.IL||2.1);
  set('grSBC', rc.SBC); set('grDF', rc.DF);

  document.getElementById('grApply').onclick = applyRules;
  return true;
}

/* Compute + fill RCC sheet from a plain inputs object. Reusable by the
   panel button AND the chatbot. Returns the computed result. */
function applyToSheet(inp){
  const r = compute(inp);
  const fill = (id,v) => { const e = document.getElementById(id); if(e){ e.value = v; e.dispatchEvent(new Event('input',{bubbles:true})); } };
  fill('rcN', num(inp.N)); fill('rcA', num(inp.A)); fill('rcNC', num(inp.NC));
  fill('rcIL', num(inp.IL)||2.1); fill('rcSBC', num(inp.SBC)); fill('rcDF', num(inp.DF));
  fill('rcQC', r.QC);
  fill('rcColumnSize', r.columnSize + ' mm');
  fill('rcBeamDepth', r.beamSize + ' mm');
  fill('rcSlabThickness', r.slabThickness);

  if(window.project && window.project.meta && window.project.meta.rcc){
    const rc = window.project.meta.rcc;
    rc.N=num(inp.N); rc.A=num(inp.A); rc.NC=num(inp.NC); rc.IL=num(inp.IL)||2.1;
    rc.SBC=num(inp.SBC); rc.DF=num(inp.DF); rc.QC=r.QC;
    rc.columnSize=r.columnSize+' mm'; rc.beamDepth=r.beamSize+' mm'; rc.slabThickness=r.slabThickness;
    rc.concreteMix = r.grades;
    rc.grSteel = r.steel; rc.grZone = r.zone; rc.grI = r.I;
  }
  if(typeof window.projSave === 'function') window.projSave();
  if(typeof window.renderProject === 'function') window.renderProject();
  return r;
}

function applyRules(){
  const inp = {
    N: $('#grN').value, A: $('#grA').value, NC: $('#grNC').value, IL: $('#grIL').value,
    SBC: $('#grSBC').value, DF: $('#grDF').value, span: $('#grSpan').value,
    slabSpan: $('#grSlabSpan').value, support: $('#grSupport').value,
    exposure: $('#grExposure').value, zone: $('#grZone').value, I: $('#grI').value
  };
  if(!num(inp.N) || !num(inp.A) || !num(inp.NC) || !num(inp.SBC) || !num(inp.span)){
    $('#grResult').innerHTML = '<p style="color:#b00">⚠ N, A, NC, SBC aur Beam Span zaroori hain.</p>';
    return;
  }
  const r = applyToSheet(inp);
  /* re-inject panel (renderProject may have rebuilt the RCC card) */
  setTimeout(() => { injectPanel(); showResult(r); }, 60);
  showResult(r);
}

function showResult(r){
  const box = document.getElementById('grResult');
  if(!box) return;
  box.innerHTML = `
    <p class="ok">✅ RCC sheet fill ho gaya (GR rules se). Neeche summary:</p>
    <table>
      <tr><th>Parameter</th><th>Value</th><th>Source</th></tr>
      <tr><td>Total floor area (A×N)</td><td>${r.AN} m²</td><td>Table 2</td></tr>
      <tr><td>Area per column (AC)</td><td>${r.AC} m²</td><td>A×N/NC</td></tr>
      <tr><td>Avg load per column (CL)</td><td>${r.CL} T</td><td>AC×IL</td></tr>
      <tr><td>Qty footing per column (QC)</td><td><b>${r.QC} m³</b></td><td>Table 6</td></tr>
      <tr><td>Total footing qty (TQ)</td><td>${r.TQ} m³</td><td>QC×NC</td></tr>
      <tr><td>Avg PCC length (L')</td><td>${r.Ldash} m</td><td>√(CL×1.1/SBC)+0.30</td></tr>
      <tr><td>Total PCC (0.15m)</td><td>${r.PCC} m³</td><td>L'²×0.15×NC</td></tr>
      <tr><td>Total excavation</td><td>${r.EXC} m³</td><td>L'²×DF×NC</td></tr>
      <tr><td>Column size</td><td><b>${r.columnSize} mm</b></td><td>Table 7</td></tr>
      <tr><td>Beam size</td><td><b>${r.beamSize} mm</b></td><td>Table 9</td></tr>
      <tr><td>Slab thickness</td><td><b>${r.slabThickness} mm</b></td><td>Table 8</td></tr>
    </table>
    <p style="margin:8px 0 2px"><b>Reinforcement (kg/m³) — Zone ${r.zone}, I=${r.I} (Table 15):</b></p>
    <table>
      <tr><th>Footing</th><th>Columns</th><th>Beams</th><th>Slabs</th></tr>
      <tr><td>${r.steel.footing}</td><td>${r.steel.columns}</td><td>${r.steel.beams}</td><td>${r.steel.slabs}</td></tr>
    </table>
    <p style="margin:8px 0 2px"><b>Concrete grades (Table 10, ${r.exposure}):</b></p>
    <table>${r.grades.map(g=>`<tr><td>${g.item}</td><td><b>${g.grade}</b></td></tr>`).join('')}</table>`;
}

/* ─────────────────── init: inject panel when Project tab renders ─────────────────── */
function tryInject(){ injectCSS(); injectPanel(); }

document.addEventListener('DOMContentLoaded', () => {
  /* Project tab dynamically banta hai — jab bhi Project tab dikhe, panel inject karo */
  const obs = new MutationObserver(() => { if(document.getElementById('rcComputed')) tryInject(); });
  obs.observe(document.body, { childList:true, subtree:true });
  /* also try on any nav click */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('nav.tabs button');
    if(b && b.dataset.tab === 'proj') setTimeout(tryInject, 120);
  });
  setTimeout(tryInject, 300);
});

})();
