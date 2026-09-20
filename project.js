/* ============================================================================
   R&B Estimate Builder — Project (parent-level) module
   ----------------------------------------------------------------------------
   Adds:
     • Sub-estimates  — one parent project holds multiple sub-estimates.
                        Editing tab shows the currently active sub.
     • Face Sheet     — E2 style cover page with all identity fields.
     • G.D.           — General Description 9-row table.
     • Performa – C   — full 20-item Principal Features form.
     • RCC Calc       — one design-basis sheet for the whole project.
     • Recap          — grand recapitulation rolling up all sub-estimates.
   All parent data is stored under localStorage key rnb_project and, when
   auth.js is active, mirrored to Firestore alongside the estimate itself.
   ========================================================================== */

(function(){

  /* ------------------------------ default project ------------------------------ */
  const proj_defaults = () => ({
    active: 0,
    subs: [],                                /* filled from current est on first activation */
    meta: {
      face: {
        circle: '', division: '', subDivision: '',
        fundHead: '', majorHead: '', minorHead: '',
        departmentHead: '',
        preparedBy: '', checkedBy: '',
        gdShort: 'As per Attached Separate Sheet.'
      },
      gd: {
        budgetDetails: '',
        budgetCostProv: '',
        admApproval: '',
        mapDetails: '',
        buildingDetails: '',
        workDetails: 'R.C.C. Frame Structure building with R.C.C. Slab.',
        sorYear: '2024-25',
        otherDetails: ''
      },
      performa: {
        department: '',
        overallCost: 0,
        subEstNoExt: 0,
        buildings: [{ name: 'G.floor', area: 0 }],
        typeOfStructure: 'R C C Frame Structure',
        roomDetails: '',
        categoryType: '',
        spec: {
          foundation: 'R C C colomn Footing 1:1:2',
          mainWalls:  '23 cm Thick Brick masonary walls',
          balcony:    'Cantilever beam slab',
          plinthHeight: '0.60 Mt.',
          floorHeight:  '3.15 Mt',
          roofs:        'R C C Slab CC 1:1.5:3',
          flooring:     'As per plan',
          doors:        '',
          cupBoards:    '',
          windows:      '',
          durnishing:   '',
          walls:        'Brick masonary walls & half walls',
          rccWorks:     'Mix C.C. as per Items',
          terrace:      'China mosic type Indian type waterproofing treatment.',
          filling:      'Partly form excaved available and remaining selected soil from out side',
          painting:     'All the interior walls of rooms finished with plastic emulsion and Exterior Finish shall be painted with acrylic paint.',
          waterSupply:  'PVC Water tanks in terrace and other 1 lac capacity sump well',
          drainage:     'As per necessity',
          otherSpecials:''
        },
        generalStrength: '1:1.5:3 and 1:1:2',
        plinthAreaCost:  0,
        carpetAreaCost:  0,
        budgetProvision: '',
        necessity: 'As per separate sheet',
        otherReasons: '',
        countersigned: 'Yes .. Plan Attached',
        officeBuildingArea: '',
        residentialBuildingArea: 'Yes',
        landAvailability: { a: 'Yes', b: '', c: '', d: '' },
        permissions:  '',
        recoverable:  { anyLocal: '', central: '', other: '' }
      },
      rcc: {
        projectName: '',
        letterRef: 'BDG / 4273 / 38535 / (728) / Part-1 / N Dt. 12-10-2006',
        N: 2,               /* stories including GF */
        A: 0,               /* floor area per floor */
        NC: 0,              /* no. of columns */
        IL: 2.1,            /* load intensity T/m² */
        SBC: 30,            /* safe bearing capacity T/m² */
        QC: 0,              /* qty of footing per column m³ (Table 3 lookup, editable) */
        DF: 1.5,            /* depth of foundation m */
        columnSize:    '300x600 (as per plan)',
        slabThickness: 150,
        beamDepth:     '300x600 (as per plan)',
        concreteMix: [
          { item: 'Footing PCC',                       grade: 'M 15' },
          { item: 'Column up to Plinth',               grade: 'M 25' },
          { item: 'Plinth Beam, Plinth Slab',          grade: 'M 25' },
          { item: 'Plinth Slab GF Column, GF Beam',    grade: 'M 20' },
          { item: 'GF Slab, Stair, Projections etc',   grade: 'M 25' },
          { item: 'other FF RCC items',                grade: 'M 25' }
        ]
      },
      recap: {
        extras: [                            /* additional civil rows apart from sub-estimates */
          /* { name:'Deduct Credit Compound Wall', amount:-34641, sign:-1 } */
        ],
        qcPct: 1,
        wcPct: 1,
        gstPct: 18,
        lumpSum: [
          { name: 'Furniture',                            amount: 0 },
          { name: 'Electrification work & Steet Light 10%', amount: 0 },
          { name: 'GEB, Gas Connection Charges',          amount: 0 }
        ]
      }
    }
  });

  /* ---------- persistence ---------- */
  window.project = store.get('rnb_project', null) || proj_defaults();
  /* migration: guarantee the shape */
  (function(){
    const d = proj_defaults();
    if(!window.project.meta) window.project.meta = d.meta;
    ['face','gd','performa','rcc','recap'].forEach(k => {
      if(!window.project.meta[k]) window.project.meta[k] = d.meta[k];
    });
    if(!Array.isArray(window.project.subs)) window.project.subs = [];
    if(typeof window.project.active !== 'number') window.project.active = 0;
  })();

  function projSave(){
    /* keep the currently-being-edited est in the active slot */
    if(window.project.subs.length && window.project.subs[window.project.active]){
      window.project.subs[window.project.active].est = JSON.parse(JSON.stringify(est));
    }
    store.set('rnb_project', window.project);
  }
  window.projSave = projSave;

  /* ---------- active-sub bookkeeping ---------- */
  function activateSub(idx){
    if(idx < 0 || idx >= window.project.subs.length) return;
    /* stash the est currently in memory back to its slot */
    if(window.project.subs[window.project.active]){
      window.project.subs[window.project.active].est = JSON.parse(JSON.stringify(est));
    }
    window.project.active = idx;
    est = JSON.parse(JSON.stringify(window.project.subs[idx].est));
    /* sub-estimate: no QC/GST — only LC. Charges roll up in Recap. */
    est.qc = 0; est.gst = 0;
    /* app.js state resets after swap */
    save();
    projSave();
    if(typeof applyModeUI    === 'function') applyModeUI();
    if(typeof renderItemBlocks === 'function') renderItemBlocks();
    if(typeof refreshWorkName  === 'function') refreshWorkName();
    if(typeof renderPreview    === 'function') renderPreview();
    const rEl = document.getElementById('roadInput'); if(rEl) rEl.value = est.road || '';
    const pEl = document.getElementById('prepBy');    if(pEl) pEl.value = est.prepBy || '';
    const cEl = document.getElementById('chkBy');     if(cEl) cEl.value = est.chkBy || '';
    const lEl = document.getElementById('lcRate');    if(lEl) lEl.value = est.lc || 0;
    if(typeof refreshTotals === 'function') refreshTotals();
    renderProject();
    toast('Switched to sub-estimate: ' + (window.project.subs[idx].name || ('Sub ' + (idx+1))));
  }
  window.activateSub = activateSub;

  function ensureFirstSub(){
    if(window.project.subs.length) return;
    const seed = JSON.parse(JSON.stringify(est));
    seed.qc = 0; seed.gst = 0;              /* sub-estimate: no QC/GST — only LC */
    window.project.subs.push({ name: 'Main Building', est: seed });
    window.project.active = 0;
    projSave();
  }

  function addSub(name){
    if(!window.project.subs.length) ensureFirstSub();
    /* stash current */
    if(window.project.subs[window.project.active]){
      window.project.subs[window.project.active].est = JSON.parse(JSON.stringify(est));
    }
    const blank = {
      mode: est.mode || 'building',
      rateSource: est.rateSource || 'sor',
      road: '', roadList: [], workDescList: [],
      prepBy: est.prepBy || '', chkBy: est.chkBy || '',
      qc: 0, lc: n(est.lc) || 0, gst: 0,     /* sub-estimate: no QC/GST — only LC. Charges roll up in Recap. */
      lines: []
    };
    window.project.subs.push({ name: (name || '').trim() || ('Sub ' + (window.project.subs.length+1)), est: blank });
    window.project.active = window.project.subs.length - 1;
    est = JSON.parse(JSON.stringify(blank));
    save(); projSave();
    if(typeof applyModeUI === 'function') applyModeUI();
    if(typeof renderItemBlocks === 'function') renderItemBlocks();
    if(typeof refreshWorkName === 'function') refreshWorkName();
    if(typeof renderPreview === 'function') renderPreview();
    ['roadInput','prepBy','chkBy'].forEach(id => { const e = document.getElementById(id); if(e) e.value = ''; });
    renderProject();
  }

  function deleteSub(idx){
    if(idx < 0 || idx >= window.project.subs.length) return;
    if(window.project.subs.length <= 1){ toast('Kam se kam ek sub-estimate rakhna zaroori hai.'); return; }
    if(!confirm('Delete sub-estimate "' + (window.project.subs[idx].name || ('Sub '+(idx+1))) + '" ? Uske items bhi chale jayenge.')) return;
    window.project.subs.splice(idx, 1);
    if(window.project.active >= window.project.subs.length) window.project.active = window.project.subs.length - 1;
    /* reload the (now new) active into est */
    est = JSON.parse(JSON.stringify(window.project.subs[window.project.active].est));
    save(); projSave();
    if(typeof applyModeUI === 'function') applyModeUI();
    if(typeof renderItemBlocks === 'function') renderItemBlocks();
    if(typeof refreshWorkName === 'function') refreshWorkName();
    if(typeof renderPreview === 'function') renderPreview();
    renderProject();
  }

  function renameSub(idx){
    if(idx < 0 || idx >= window.project.subs.length) return;
    const cur = window.project.subs[idx].name || '';
    const nm = prompt('Sub-estimate ka naam:', cur);
    if(nm === null) return;
    window.project.subs[idx].name = (nm || '').trim() || cur;
    projSave(); renderProject();
  }

  function moveSub(idx, dir){
    const t = idx + dir;
    if(idx < 0 || idx >= window.project.subs.length || t < 0 || t >= window.project.subs.length) return;
    const tmp = window.project.subs[idx];
    window.project.subs[idx] = window.project.subs[t];
    window.project.subs[t] = tmp;
    if(window.project.active === idx) window.project.active = t;
    else if(window.project.active === t) window.project.active = idx;
    projSave(); renderProject();
  }

  /* per-sub total (Say value) so recap can roll it up.
     E2 format: sub abstract me sirf Total -> Say. Koi QC, koi GST nahi —
     sirf LC har item ki approved rate me load hoti hai. QC/WC/GST Recap me
     ek baar lagte hain. */
  function subTotal(sub){
    if(!sub || !sub.est || !Array.isArray(sub.est.lines)) return 0;
    const lc  = n(sub.est.lc)  || 0;
    let total = 0;
    sub.est.lines.forEach(l => {
      try{ total += (typeof lineTotal === 'function' ? lineTotal(l, lc, 0).amount : 0); }
      catch(e){}
    });
    /* Say = ceiling to nearest 1000 (no QC, no GST here) */
    return Math.ceil(total / 1000) * 1000;
  }
  window.projSubTotal = subTotal;

  /* recap: build civil rows from subs + extras, apply QC/WC/GST, add lumpsum */
  function buildRecapRows(){
    const m = window.project.meta.recap;
    const civil = [];
    (window.project.subs || []).forEach((s, i) => {
      civil.push({ name: (s.name || 'Sub'), amount: subTotal(s), sub: true, subIdx: i });
    });
    (m.extras || []).forEach(x => {
      civil.push({ name: x.name || '', amount: n(x.amount) * (x.sign === -1 ? -1 : 1) });
    });
    const totalA = civil.reduce((a,c) => a + n(c.amount), 0);
    const qc     = totalA * n(m.qcPct) / 100;
    const wc     = totalA * n(m.wcPct) / 100;
    const gst    = totalA * n(m.gstPct) / 100;
    const subTot = totalA + qc + wc + gst;
    const lump   = (m.lumpSum || []).reduce((a,l) => a + n(l.amount), 0);
    const total  = subTot + lump;
    const say    = Math.ceil(total / 1000) * 1000;
    return { civil, totalA, qc, wc, gst, subTot, lumpSum: m.lumpSum || [], lump, total, say };
  }
  window.projBuildRecap = buildRecapRows;

  /* ================================================================
     UI  —  the Project tab
     ============================================================== */

  function projTabHTML(){
    return `
      <section id="tab-proj" hidden>

        <div class="card">
          <h2>Project (parent)</h2>
          <div class="grid g2">
            <div><label for="prjName">Name of Work (parent)</label>
              <input id="prjName" placeholder="Construction of Principle judge Family Court (E-2 Type Category) Dist-Dahod"></div>
            <div><label for="prjPreparedBy">Estimate Prepared By</label>
              <input id="prjPreparedBy" placeholder="Name / designation"></div>
            <div><label for="prjCheckedBy">Estimate Checked By</label>
              <input id="prjCheckedBy" placeholder="Name / designation"></div>
            <div><label for="prjCircle">Circle</label>
              <input id="prjCircle" placeholder="Vadodara (R&amp;B) Circle, Vadodara"></div>
          </div>
          <div class="grid g2" style="margin-top:10px">
            <div><label for="prjFundHead">Fund Head</label>       <input id="prjFundHead"></div>
            <div><label for="prjMajorHead">Major Head</label>     <input id="prjMajorHead"></div>
            <div><label for="prjMinorHead">Minor Head</label>     <input id="prjMinorHead"></div>
            <div><label for="prjDeptHead">Department Head</label> <input id="prjDeptHead"></div>
          </div>
          <p class="hint">Parent-level fields Face Sheet, G.D., Performa – C, RCC calc aur Recap — sab me use hote hain.
            Sub-estimates individual abstract + MES rakhte hain. Recap unhe apne aap roll-up karta hai.</p>
        </div>

        <div class="card">
          <h2>Sub-Estimates</h2>
          <div id="prjSubs"></div>
          <div class="row-actions" style="margin-top:8px">
            <button class="btn accent" id="prjAddSub">+ Add sub-estimate</button>
          </div>
          <p class="hint">Har sub-estimate ka apna abstract + MES rehta hai. Currently active sub-estimate hi Estimate tab me edit hota hai — <b>Switch</b> se change karo.</p>
        </div>

        <div class="card">
          <h2>General Description</h2>
          <div class="grid g2">
            <div><label>Budget Details</label>
              <textarea id="gdBudgetDetails" rows="2" placeholder="Work included in Law Department Budget Item. Page No. …, has provision of … lacs"></textarea></div>
            <div><label>Budget Cost &amp; Provision</label>
              <textarea id="gdBudgetCostProv" rows="2" placeholder="L.S. Budget cost -- Rs. … Lacs &amp; has provision of … lacs"></textarea></div>
            <div><label>Addministrative Approval</label>
              <textarea id="gdAdmApproval" rows="2" placeholder="Department wide Letter No. … Dtd. …  Amt. Rs. … CR"></textarea></div>
            <div><label>Map Details</label>
              <textarea id="gdMapDetails" rows="2" placeholder="Plans prepared by Deputy Architect Gandhinagar which received wide letter No. … Dtd. …"></textarea></div>
            <div><label>Building Details</label>
              <textarea id="gdBuildingDetails" rows="2" placeholder="Providing Dining hall, Kitchen, bedroom, waiting, Toilet, store, Servent Room, office etc."></textarea></div>
            <div><label>Work Details</label>
              <textarea id="gdWorkDetails" rows="2"></textarea></div>
            <div><label>S.O.R Year</label>
              <input id="gdSorYear"></div>
            <div><label>Other Details</label>
              <textarea id="gdOtherDetails" rows="2"></textarea></div>
          </div>
        </div>

        <div class="card">
          <h2>Performa – C</h2>
          <div class="grid g2">
            <div><label>1. Name of Department for which the building is proposed</label>
              <input id="pcDept" placeholder="Law Department"></div>
            <div><label>6. Type of structure</label>
              <input id="pcTypeStructure"></div>
            <div><label>7. Details of Rooms (IN case of administrative public building provision made in area of as)</label>
              <textarea id="pcRoomDetails" rows="2"></textarea></div>
            <div><label>8. Category Type</label>
              <input id="pcCategoryType" placeholder="E2-Type Quarters"></div>
          </div>

          <h3 style="margin-top:14px">5. Provision of Buildings</h3>
          <div id="pcBuildings"></div>
          <button class="btn ghost" id="pcAddBuilding" style="margin-top:6px">+ Add building row</button>

          <h3 style="margin-top:14px">9. Specification adopted for the structure</h3>
          <div class="grid g2">
            <div><label>(i) Foundation</label><input id="pcFoundation"></div>
            <div><label>(ii) for Main walls</label><input id="pcMainWalls"></div>
            <div><label>(iii) for Balcony</label><input id="pcBalcony"></div>
            <div><label>(iv) Plinth Height</label><input id="pcPlinthHeight"></div>
            <div><label>(v) Super Structure floor height</label><input id="pcFloorHeight"></div>
            <div><label>(vi) Roofs</label><input id="pcRoofs"></div>
            <div><label>(vII) Flooring</label><textarea id="pcFlooring" rows="2"></textarea></div>
            <div><label>(viii) Doors</label><textarea id="pcDoors" rows="2"></textarea></div>
            <div><label>(ix) Cup Boards</label><input id="pcCupBoards"></div>
            <div><label>(x) Windows</label><input id="pcWindows"></div>
            <div><label>(xi) Durnishing</label><textarea id="pcDurnishing" rows="2"></textarea></div>
            <div><label>(xii) Walls</label><input id="pcWalls"></div>
            <div><label>(xiii) R.C.C. Works</label><input id="pcRccWorks"></div>
            <div><label>(xiv) Terrace</label><input id="pcTerrace"></div>
            <div><label>(xv) Type of Filling</label><textarea id="pcFilling" rows="2"></textarea></div>
            <div><label>(xvi) painting</label><textarea id="pcPainting" rows="2"></textarea></div>
            <div><label>(xvii) Water Supply</label><input id="pcWaterSupply"></div>
            <div><label>(xviii) Drainage</label><input id="pcDrainage"></div>
            <div><label>(xix) Any Other Specials</label><input id="pcOtherSpecials"></div>
          </div>

          <h3 style="margin-top:14px">Cost / Provision</h3>
          <div class="grid g2">
            <div><label>4. Sub estimate without external water supply and sanitary arrangement and internal road wire fencing and electrical installation (Rs.)</label>
              <input id="pcSubEstNoExt" class="mono" type="number" step="0.01"></div>
            <div><label>10. General Strength adopted</label>
              <input id="pcGeneralStrength"></div>
            <div><label>11A. Cost of Plinth Area Rs. Per Sqm.</label>
              <input id="pcPlinthAreaCost" class="mono" type="number" step="0.01"></div>
            <div><label>11B. Cost of Carpet Area Rs. Per Sqm.</label>
              <input id="pcCarpetAreaCost" class="mono" type="number" step="0.01"></div>
            <div><label>12. Budget Provision for the year</label>
              <input id="pcBudgetProvision"></div>
            <div><label>13. Necessity of the Building</label>
              <input id="pcNecessity"></div>
            <div><label>14. Any Other Specific reasons</label>
              <textarea id="pcOtherReasons" rows="2"></textarea></div>
            <div><label>15. Has the department countersigned the plan and has it been approved in principal by department?</label>
              <input id="pcCountersigned"></div>
            <div><label>16. In the case of Office building whether the area is as per srander designed by the Government and whether the area is calculated for specific category of staff.</label>
              <input id="pcOfficeBldgArea"></div>
            <div><label>17. In case of residential building whethe the area is according with the standerd laid area is appropriate category of staff.</label>
              <input id="pcResidentialBldgArea"></div>
          </div>

          <h3 style="margin-top:14px">18. Land availability</h3>
          <div class="grid g2">
            <div><label>A. Is land available Alredy available</label><input id="pcLandA"></div>
            <div><label>B. Government land is available and proposal of land is yet to be submitted.</label><input id="pcLandB"></div>
            <div><label>C. If land is not available action been taken to acquire land</label><input id="pcLandC"></div>
            <div><label>D. When is land is likely to be available.</label><input id="pcLandD"></div>
            <div><label>19. If any permission necessary from any local body / necessary from town planing authority.</label>
              <input id="pcPermissions"></div>
          </div>

          <h3 style="margin-top:14px">20. If any amount recoverable</h3>
          <div class="grid g2">
            <div><label>i. Any Local Body</label><input id="pcRecLocal"></div>
            <div><label>ii. Central Government</label><input id="pcRecCentral"></div>
            <div><label>iii. Any Other Privete resource if so please quate the relevant.</label><input id="pcRecOther"></div>
          </div>
        </div>

        <div class="card">
          <h2>Calculation of RCC Member Section &amp; Reinforcement</h2>
          <div class="grid g2">
            <div><label>2. No. of Stories Including G.F. (N)</label>
              <input id="rcN" class="mono" type="number" step="1"></div>
            <div><label>3. Floor Area of Each Floor (A) m²  <span class="hint" style="display:inline">(Including Cantilever Projection)</span></label>
              <input id="rcA" class="mono" type="number" step="0.01"></div>
            <div><label>5. Total No.s of Columns (NC)</label>
              <input id="rcNC" class="mono" type="number" step="1"></div>
            <div><label>6. Load intensity of structure (IL) T/M²</label>
              <input id="rcIL" class="mono" type="number" step="0.01"></div>
            <div><label>9. S.B.C. (T/M²)</label>
              <input id="rcSBC" class="mono" type="number" step="0.01"></div>
            <div><label>10. Avg Qty of Footing per column (m³) <span class="hint" style="display:inline">(From Table No. 3)</span></label>
              <input id="rcQC" class="mono" type="number" step="0.001"></div>
            <div><label>Depth of Foundation (DF) m</label>
              <input id="rcDF" class="mono" type="number" step="0.01"></div>
            <div><label>A. Column Size (as per Table No. 4)</label>
              <input id="rcColumnSize"></div>
            <div><label>B. Slab Thickness (mm) — Continuous one Way Slab (Table No. 5)</label>
              <input id="rcSlabThickness" class="mono" type="number" step="1"></div>
            <div><label>C. Beam Depth (as per Table No. 6)</label>
              <input id="rcBeamDepth"></div>
            <div><label>Letter Ref.</label>
              <input id="rcLetterRef"></div>
          </div>
          <p class="hint">Computed values (Total Floor Area, AC, CL, TQ, L', PCC, Excavation) live me neeche dikhaate hain.</p>
          <div id="rcComputed" style="margin-top:8px"></div>

          <h3 style="margin-top:14px">Concrete Mix (Table No. 7)</h3>
          <div id="rcMix"></div>
        </div>

        <div class="card">
          <h2>Recapitulation</h2>
          <div id="recapPreview"></div>

          <h3 style="margin-top:12px">Additional Civil Rows (deducts, credits, extras)</h3>
          <div id="rcpExtras"></div>
          <button class="btn ghost" id="rcpAddExtra" style="margin-top:6px">+ Add extra civil row</button>

          <h3 style="margin-top:14px">Charges</h3>
          <div class="grid g3">
            <div><label>Quality Control Charge %</label>
              <input id="rcpQcPct" class="mono" type="number" step="0.01"></div>
            <div><label>Work Charge &amp; Contingency Charge %</label>
              <input id="rcpWcPct" class="mono" type="number" step="0.01"></div>
            <div><label>GST % on A</label>
              <input id="rcpGstPct" class="mono" type="number" step="0.01"></div>
          </div>

          <h3 style="margin-top:14px">(B) Lump Sum Provision Including GST</h3>
          <div id="rcpLump"></div>
          <button class="btn ghost" id="rcpAddLump" style="margin-top:6px">+ Add lump sum row</button>
        </div>

      </section>`;
  }

  function ensureTab(){
    const nav = document.querySelector('nav.tabs');
    if(!nav || document.querySelector('nav.tabs [data-tab="proj"]')) return;
    /* insert Project tab as 2nd item, after Estimate */
    const btn = document.createElement('button');
    btn.setAttribute('role','tab'); btn.dataset.tab = 'proj'; btn.textContent = 'Project';
    const est_btn = nav.querySelector('[data-tab="est"]');
    if(est_btn && est_btn.nextSibling) nav.insertBefore(btn, est_btn.nextSibling);
    else nav.appendChild(btn);
    /* insert section */
    const main = document.querySelector('main') || document.body;
    const wrap = document.createElement('div');
    wrap.innerHTML = projTabHTML();
    main.insertBefore(wrap.firstElementChild, document.getElementById('tab-prev'));
    /* wire tab click — reuse existing tab controller if any */
    btn.addEventListener('click', () => {
      document.querySelectorAll('nav.tabs button').forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
      document.querySelectorAll('main > section').forEach(s => s.hidden = (s.id !== 'tab-proj'));
      renderProject();
    });
  }

  /* ---------- form binding ---------- */

  function bindMeta(){
    const m = window.project.meta;
    const f = m.face, g = m.gd, p = m.performa, rc = m.rcc;

    /* face */
    setV('prjCircle', f.circle);
    setV('prjFundHead', f.fundHead);
    setV('prjMajorHead', f.majorHead);
    setV('prjMinorHead', f.minorHead);
    setV('prjDeptHead', f.departmentHead);
    setV('prjPreparedBy', f.preparedBy);
    setV('prjCheckedBy', f.checkedBy);
    setV('prjName', p.projectNameOverride || '');

    onV('prjCircle',      v => { f.circle = v; projSave(); });
    onV('prjFundHead',    v => { f.fundHead = v; projSave(); });
    onV('prjMajorHead',   v => { f.majorHead = v; projSave(); });
    onV('prjMinorHead',   v => { f.minorHead = v; projSave(); });
    onV('prjDeptHead',    v => { f.departmentHead = v; projSave(); });
    onV('prjPreparedBy',  v => { f.preparedBy = v; projSave(); });
    onV('prjCheckedBy',   v => { f.checkedBy = v; projSave(); });
    onV('prjName',        v => { p.projectNameOverride = v; projSave(); });

    /* gd */
    setV('gdBudgetDetails',    g.budgetDetails);
    setV('gdBudgetCostProv',   g.budgetCostProv);
    setV('gdAdmApproval',      g.admApproval);
    setV('gdMapDetails',       g.mapDetails);
    setV('gdBuildingDetails',  g.buildingDetails);
    setV('gdWorkDetails',      g.workDetails);
    setV('gdSorYear',          g.sorYear);
    setV('gdOtherDetails',     g.otherDetails);
    onV('gdBudgetDetails',   v => { g.budgetDetails = v; projSave(); });
    onV('gdBudgetCostProv',  v => { g.budgetCostProv = v; projSave(); });
    onV('gdAdmApproval',     v => { g.admApproval = v; projSave(); });
    onV('gdMapDetails',      v => { g.mapDetails = v; projSave(); });
    onV('gdBuildingDetails', v => { g.buildingDetails = v; projSave(); });
    onV('gdWorkDetails',     v => { g.workDetails = v; projSave(); });
    onV('gdSorYear',         v => { g.sorYear = v; projSave(); });
    onV('gdOtherDetails',    v => { g.otherDetails = v; projSave(); });

    /* performa */
    setV('pcDept',           p.department);
    setV('pcTypeStructure',  p.typeOfStructure);
    setV('pcRoomDetails',    p.roomDetails);
    setV('pcCategoryType',   p.categoryType);
    setV('pcSubEstNoExt',    p.subEstNoExt || '');
    setV('pcGeneralStrength',p.generalStrength);
    setV('pcPlinthAreaCost', p.plinthAreaCost || '');
    setV('pcCarpetAreaCost', p.carpetAreaCost || '');
    setV('pcBudgetProvision',p.budgetProvision);
    setV('pcNecessity',      p.necessity);
    setV('pcOtherReasons',   p.otherReasons);
    setV('pcCountersigned',  p.countersigned);
    setV('pcOfficeBldgArea', p.officeBuildingArea);
    setV('pcResidentialBldgArea', p.residentialBuildingArea);
    setV('pcLandA', p.landAvailability.a);
    setV('pcLandB', p.landAvailability.b);
    setV('pcLandC', p.landAvailability.c);
    setV('pcLandD', p.landAvailability.d);
    setV('pcPermissions', p.permissions);
    setV('pcRecLocal',   p.recoverable.anyLocal);
    setV('pcRecCentral', p.recoverable.central);
    setV('pcRecOther',   p.recoverable.other);
    onV('pcDept',           v => { p.department = v; projSave(); });
    onV('pcTypeStructure',  v => { p.typeOfStructure = v; projSave(); });
    onV('pcRoomDetails',    v => { p.roomDetails = v; projSave(); });
    onV('pcCategoryType',   v => { p.categoryType = v; projSave(); });
    onV('pcSubEstNoExt',    v => { p.subEstNoExt = n(v); projSave(); });
    onV('pcGeneralStrength',v => { p.generalStrength = v; projSave(); });
    onV('pcPlinthAreaCost', v => { p.plinthAreaCost = n(v); projSave(); });
    onV('pcCarpetAreaCost', v => { p.carpetAreaCost = n(v); projSave(); });
    onV('pcBudgetProvision',v => { p.budgetProvision = v; projSave(); });
    onV('pcNecessity',      v => { p.necessity = v; projSave(); });
    onV('pcOtherReasons',   v => { p.otherReasons = v; projSave(); });
    onV('pcCountersigned',  v => { p.countersigned = v; projSave(); });
    onV('pcOfficeBldgArea', v => { p.officeBuildingArea = v; projSave(); });
    onV('pcResidentialBldgArea', v => { p.residentialBuildingArea = v; projSave(); });
    onV('pcLandA', v => { p.landAvailability.a = v; projSave(); });
    onV('pcLandB', v => { p.landAvailability.b = v; projSave(); });
    onV('pcLandC', v => { p.landAvailability.c = v; projSave(); });
    onV('pcLandD', v => { p.landAvailability.d = v; projSave(); });
    onV('pcPermissions', v => { p.permissions = v; projSave(); });
    onV('pcRecLocal',   v => { p.recoverable.anyLocal = v; projSave(); });
    onV('pcRecCentral', v => { p.recoverable.central = v; projSave(); });
    onV('pcRecOther',   v => { p.recoverable.other = v; projSave(); });

    /* performa specs */
    Object.keys(p.spec).forEach(k => {
      const id = 'pc' + k[0].toUpperCase() + k.slice(1);
      setV(id, p.spec[k]);
      onV(id, v => { p.spec[k] = v; projSave(); });
    });

    /* rcc */
    setV('rcN', rc.N); setV('rcA', rc.A); setV('rcNC', rc.NC);
    setV('rcIL', rc.IL); setV('rcSBC', rc.SBC); setV('rcQC', rc.QC || '');
    setV('rcDF', rc.DF); setV('rcColumnSize', rc.columnSize);
    setV('rcSlabThickness', rc.slabThickness); setV('rcBeamDepth', rc.beamDepth);
    setV('rcLetterRef', rc.letterRef);
    ['rcN','rcA','rcNC','rcIL','rcSBC','rcQC','rcDF','rcSlabThickness'].forEach(id => {
      onV(id, v => { rc[id.slice(2).charAt(0).toLowerCase() + id.slice(3)] = n(v); projSave(); renderRCComputed(); });
    });
    /* the above lowercases the first char after 'rc': rcNC -> nC (wrong). Fix explicit map: */
    const rcMap = { rcN:'N', rcA:'A', rcNC:'NC', rcIL:'IL', rcSBC:'SBC', rcQC:'QC', rcDF:'DF', rcSlabThickness:'slabThickness' };
    Object.keys(rcMap).forEach(id => {
      onV(id, v => { rc[rcMap[id]] = n(v); projSave(); renderRCComputed(); });
    });
    onV('rcColumnSize', v => { rc.columnSize = v; projSave(); });
    onV('rcBeamDepth',  v => { rc.beamDepth  = v; projSave(); });
    onV('rcLetterRef',  v => { rc.letterRef  = v; projSave(); });

    /* recap % */
    const r = m.recap;
    setV('rcpQcPct',  r.qcPct);
    setV('rcpWcPct',  r.wcPct);
    setV('rcpGstPct', r.gstPct);
    onV('rcpQcPct',  v => { r.qcPct  = n(v); projSave(); renderRecapPreview(); });
    onV('rcpWcPct',  v => { r.wcPct  = n(v); projSave(); renderRecapPreview(); });
    onV('rcpGstPct', v => { r.gstPct = n(v); projSave(); renderRecapPreview(); });
  }

  function setV(id, v){ const el = document.getElementById(id); if(el) el.value = (v == null ? '' : v); }
  function onV(id, cb){
    const el = document.getElementById(id); if(!el) return;
    el.addEventListener('input', e => cb(e.target.value));
    el.addEventListener('change', e => cb(e.target.value));
  }

  /* ---------- performa buildings rows ---------- */
  function renderPCBuildings(){
    const p = window.project.meta.performa;
    const wrap = document.getElementById('pcBuildings');
    if(!wrap) return;
    const total = (p.buildings || []).reduce((a,b) => a + n(b.area), 0);
    wrap.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:520px">' +
      '<tr><th style="width:60%">Name of buildings</th><th class="num" style="width:26%">Plinth Area (Sqmt)</th><th></th></tr>' +
      (p.buildings || []).map((b,i) => `<tr>
        <td><input data-pcb="name" data-i="${i}" value="${esc(b.name || '')}"></td>
        <td><input data-pcb="area" data-i="${i}" class="mono" type="number" step="0.01" value="${b.area === 0 || b.area == null ? '' : b.area}"></td>
        <td><button class="btn danger" style="padding:3px 9px" data-pcbrem="${i}">×</button></td>
      </tr>`).join('') +
      `<tr><td class="num"><b>Total</b></td><td class="num mono"><b>${fmt(total)} Sqmt</b></td><td></td></tr>` +
      '</table></div>';
    wrap.querySelectorAll('[data-pcb]').forEach(el => el.addEventListener('input', e => {
      const i = +e.target.dataset.i, k = e.target.dataset.pcb;
      if(!p.buildings[i]) p.buildings[i] = { name:'', area:0 };
      p.buildings[i][k] = (k === 'area' ? n(e.target.value) : e.target.value);
      projSave(); renderPCBuildings();
    }));
    wrap.querySelectorAll('[data-pcbrem]').forEach(b => b.onclick = () => {
      p.buildings.splice(+b.dataset.pcbrem, 1);
      if(!p.buildings.length) p.buildings.push({ name:'', area:0 });
      projSave(); renderPCBuildings();
    });
    const add = document.getElementById('pcAddBuilding');
    if(add) add.onclick = () => { p.buildings.push({ name:'', area:0 }); projSave(); renderPCBuildings(); };
  }

  /* ---------- rcc computed pane ---------- */
  function rccCompute(){
    const rc = window.project.meta.rcc;
    const N = n(rc.N), A = n(rc.A), NC = n(rc.NC), IL = n(rc.IL), SBC = n(rc.SBC), QC = n(rc.QC), DF = n(rc.DF);
    const totalFloorArea = A * N;
    const AC = NC > 0 ? (A * N / NC) : 0;
    const CL = AC * IL;
    const TQ = QC * NC;
    const Lprime = SBC > 0 ? Math.sqrt((CL * 1.1) / SBC) + 0.30 : 0;
    const Tp = 0.15;
    const pcc = Lprime * Lprime * Tp * NC;
    const excav = Lprime * Lprime * DF * NC;
    return { N, A, NC, IL, SBC, QC, DF, totalFloorArea, AC, CL, TQ, Lprime, Tp, pcc, excav };
  }
  window.projRCCCompute = rccCompute;

  function renderRCComputed(){
    const box = document.getElementById('rcComputed');
    if(!box) return;
    const c = rccCompute();
    box.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:520px">' +
      `<tr><td style="width:70%">4. Total Floor Area of Structure (m²)  = A × N</td><td class="num mono">${fmt(c.totalFloorArea)}</td></tr>` +
      `<tr><td>7. Total Floor Area supported by each column (m²)  = A×N / NC</td><td class="num mono">${fmt(c.AC)}</td></tr>` +
      `<tr><td>8. Total Average load on each column (T)  CL = AC × IL</td><td class="num mono">${fmt(c.CL)}</td></tr>` +
      `<tr><td>11. Total Quantity of Footings (m³)  TQ = QC × NC</td><td class="num mono">${fmt(c.TQ)}</td></tr>` +
      `<tr><td>12. Avg Length for P.C.C. lean Concrete (m)  L' = √((CL×1.1)/SBC) + 0.30</td><td class="num mono">${fmt(c.Lprime)}</td></tr>` +
      `<tr><td>13. Avg Quantity of P.C.C. (T' = 0.15) m³  = L' × L' × T' × NC</td><td class="num mono">${fmt(c.pcc)}</td></tr>` +
      `<tr><td>14. Total Excavation for footings (m³)  = L' × L' × DF × NC</td><td class="num mono">${fmt(c.excav)}</td></tr>` +
      '</table></div>';
  }

  /* ---------- rcc concrete mix rows ---------- */
  function renderRCMix(){
    const rc = window.project.meta.rcc;
    const wrap = document.getElementById('rcMix');
    if(!wrap) return;
    wrap.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:520px">' +
      '<tr><th style="width:8%">Sr</th><th style="width:56%">Item</th><th style="width:24%">Grade of Concrete</th><th></th></tr>' +
      (rc.concreteMix || []).map((row,i) => `<tr>
        <td class="mono">${i+1}</td>
        <td><input data-rcm="item"  data-i="${i}" value="${esc(row.item || '')}"></td>
        <td><input data-rcm="grade" data-i="${i}" value="${esc(row.grade || '')}"></td>
        <td><button class="btn danger" style="padding:3px 9px" data-rcmrem="${i}">×</button></td>
      </tr>`).join('') +
      '</table></div>' +
      '<button class="btn ghost" id="rcMixAdd" style="margin-top:6px">+ Add mix row</button>';
    wrap.querySelectorAll('[data-rcm]').forEach(el => el.addEventListener('input', e => {
      const i = +e.target.dataset.i, k = e.target.dataset.rcm;
      rc.concreteMix[i][k] = e.target.value; projSave();
    }));
    wrap.querySelectorAll('[data-rcmrem]').forEach(b => b.onclick = () => {
      rc.concreteMix.splice(+b.dataset.rcmrem, 1); projSave(); renderRCMix();
    });
    const add = document.getElementById('rcMixAdd');
    if(add) add.onclick = () => { rc.concreteMix.push({ item:'', grade:'' }); projSave(); renderRCMix(); };
  }

  /* ---------- recap ---------- */
  function renderRecapPreview(){
    const box = document.getElementById('recapPreview');
    if(!box) return;
    const r = buildRecapRows();
    box.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:660px">' +
      '<tr><th style="width:6%">S No.</th><th style="width:56%">Description</th><th class="num" style="width:20%">Amount in Rs.</th><th style="width:18%">Estimate</th></tr>' +
      '<tr><td colspan="4" style="background:#eef2f7"><b>(A) Civil Works;</b></td></tr>' +
      r.civil.map((c,i) => `<tr>
        <td class="mono">${i+1}</td>
        <td>${esc(c.name)}${c.sub?' <span class="pill" style="padding:1px 6px">sub</span>':''}</td>
        <td class="num mono">${fmt(c.amount)}</td>
        <td>${c.sub ? `<button class="btn ghost" style="padding:3px 8px" data-rcprep="${c.subIdx}">Prepare ✎</button>` : ''}</td>
      </tr>`).join('') +
      `<tr><td></td><td class="num"><b>Total A</b></td><td class="num mono"><b>${fmt(r.totalA)}</b></td><td></td></tr>` +
      `<tr><td></td><td class="num">Quality control Charge ${fmt(window.project.meta.recap.qcPct)}%</td><td class="num mono">${fmt(r.qc)}</td><td></td></tr>` +
      `<tr><td></td><td class="num">Work charge &amp; Contingency Charge ${fmt(window.project.meta.recap.wcPct)}%</td><td class="num mono">${fmt(r.wc)}</td><td></td></tr>` +
      `<tr><td></td><td class="num">GST ${fmt(window.project.meta.recap.gstPct)}% on A</td><td class="num mono">${fmt(r.gst)}</td><td></td></tr>` +
      `<tr><td></td><td class="num"><b>Sub Total</b></td><td class="num mono"><b>${fmt(r.subTot)}</b></td><td></td></tr>` +
      '<tr><td colspan="4" style="background:#eef2f7"><b>(B) Lump Sum Provision Including GST;</b></td></tr>' +
      r.lumpSum.map((l,i) => `<tr>
        <td class="mono">${r.civil.length + 1 + i}</td>
        <td>${esc(l.name)}</td>
        <td class="num mono">${fmt(n(l.amount))}</td>
        <td></td>
      </tr>`).join('') +
      `<tr><td></td><td class="num"><b>Total</b></td><td class="num mono"><b>${fmt(r.total)}</b></td><td></td></tr>` +
      `<tr><td></td><td class="num"><b>Say</b></td><td class="num mono"><b>${fmt(r.say)}</b></td><td></td></tr>` +
      '</table></div>' +
      '<p class="hint">Har sub-estimate ke saamne <b>Prepare ✎</b> dabao — us sub ka Abstract + Measurement Sheet Estimate tab me khul jayega.</p>';

    /* Prepare button → activate that sub and jump to the Estimate tab */
    box.querySelectorAll('[data-rcprep]').forEach(b => b.onclick = () => {
      const idx = +b.dataset.rcprep;
      if(typeof activateSub === 'function') activateSub(idx);
      const estBtn = document.querySelector('nav.tabs button[data-tab="est"]');
      if(estBtn) estBtn.click();
      window.scrollTo(0, 0);
    });
  }

  function renderRecapExtras(){
    const wrap = document.getElementById('rcpExtras');
    if(!wrap) return;
    const r = window.project.meta.recap;
    wrap.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:540px">' +
      '<tr><th style="width:60%">Description</th><th class="num" style="width:22%">Amount (Rs.)</th><th style="width:12%">Sign</th><th></th></tr>' +
      (r.extras || []).map((x,i) => `<tr>
        <td><input data-rxk="name" data-i="${i}" value="${esc(x.name || '')}"></td>
        <td><input data-rxk="amount" data-i="${i}" class="mono" type="number" step="0.01" value="${x.amount === 0 || x.amount == null ? '' : x.amount}"></td>
        <td>
          <select data-rxk="sign" data-i="${i}">
            <option value="1"${(x.sign||1) === 1 ? ' selected':''}>+ Add</option>
            <option value="-1"${x.sign === -1 ? ' selected':''}>− Deduct</option>
          </select>
        </td>
        <td><button class="btn danger" style="padding:3px 9px" data-rxrem="${i}">×</button></td>
      </tr>`).join('') +
      '</table></div>';
    wrap.querySelectorAll('[data-rxk]').forEach(el => el.addEventListener('input', e => {
      const i = +e.target.dataset.i, k = e.target.dataset.rxk;
      if(!r.extras[i]) r.extras[i] = { name:'', amount:0, sign:1 };
      r.extras[i][k] = (k === 'amount' ? n(e.target.value) : (k === 'sign' ? +e.target.value : e.target.value));
      projSave(); renderRecapPreview();
    }));
    wrap.querySelectorAll('[data-rxrem]').forEach(b => b.onclick = () => {
      r.extras.splice(+b.dataset.rxrem, 1); projSave(); renderRecapExtras(); renderRecapPreview();
    });
    const add = document.getElementById('rcpAddExtra');
    if(add) add.onclick = () => { r.extras.push({ name:'', amount:0, sign:1 }); projSave(); renderRecapExtras(); renderRecapPreview(); };
  }

  function renderRecapLump(){
    const wrap = document.getElementById('rcpLump');
    if(!wrap) return;
    const r = window.project.meta.recap;
    wrap.innerHTML =
      '<div class="scroll"><table class="tbl" style="min-width:540px">' +
      '<tr><th style="width:70%">Description</th><th class="num" style="width:22%">Amount (Rs.)</th><th></th></tr>' +
      (r.lumpSum || []).map((l,i) => `<tr>
        <td><input data-rlk="name"   data-i="${i}" value="${esc(l.name || '')}"></td>
        <td><input data-rlk="amount" data-i="${i}" class="mono" type="number" step="0.01" value="${l.amount === 0 || l.amount == null ? '' : l.amount}"></td>
        <td><button class="btn danger" style="padding:3px 9px" data-rlrem="${i}">×</button></td>
      </tr>`).join('') +
      '</table></div>';
    wrap.querySelectorAll('[data-rlk]').forEach(el => el.addEventListener('input', e => {
      const i = +e.target.dataset.i, k = e.target.dataset.rlk;
      if(!r.lumpSum[i]) r.lumpSum[i] = { name:'', amount:0 };
      r.lumpSum[i][k] = (k === 'amount' ? n(e.target.value) : e.target.value);
      projSave(); renderRecapPreview();
    }));
    wrap.querySelectorAll('[data-rlrem]').forEach(b => b.onclick = () => {
      r.lumpSum.splice(+b.dataset.rlrem, 1); projSave(); renderRecapLump(); renderRecapPreview();
    });
    const add = document.getElementById('rcpAddLump');
    if(add) add.onclick = () => { r.lumpSum.push({ name:'', amount:0 }); projSave(); renderRecapLump(); renderRecapPreview(); };
  }

  /* ---------- sub-estimates list ---------- */
  function renderSubs(){
    const box = document.getElementById('prjSubs');
    if(!box) return;
    if(!window.project.subs.length){
      box.innerHTML =
        '<div class="empty">Abhi tak koi sub-estimate nahi. + Add sub-estimate se shuru karo — pahle sub-estimate me currently jo estimate open hai, wahi copy hoke aayega.</div>';
    } else {
      box.innerHTML =
        '<div class="scroll"><table class="tbl" style="min-width:620px">' +
        '<tr><th style="width:6%">#</th><th style="width:44%">Name</th><th class="num" style="width:18%">Amount ₹</th><th style="width:8%">Items</th><th></th></tr>' +
        window.project.subs.map((s,i) => {
          const t = subTotal(s), nL = (s.est && s.est.lines) ? s.est.lines.length : 0;
          const isA = window.project.active === i;
          return `<tr${isA?' style="background:#fff3e0"':''}>
            <td class="mono">${i+1}</td>
            <td><b>${esc(s.name || 'Sub '+(i+1))}</b>${isA?' <span class="pill" style="padding:1px 6px">active</span>':''}</td>
            <td class="num mono">${fmt(t)}</td>
            <td class="num mono">${nL}</td>
            <td>
              ${isA ? '' : `<button class="btn ghost" style="padding:3px 8px" data-psw="${i}">Switch</button>`}
              <button class="btn ghost" style="padding:3px 8px" data-prn="${i}">Rename</button>
              <button class="btn ghost" style="padding:3px 8px" data-pup="${i}">↑</button>
              <button class="btn ghost" style="padding:3px 8px" data-pdn="${i}">↓</button>
              <button class="btn danger" style="padding:3px 8px" data-pdel="${i}">×</button>
            </td>
          </tr>`;
        }).join('') +
        '</table></div>';
      box.querySelectorAll('[data-psw]').forEach(b => b.onclick = () => activateSub(+b.dataset.psw));
      box.querySelectorAll('[data-prn]').forEach(b => b.onclick = () => renameSub(+b.dataset.prn));
      box.querySelectorAll('[data-pup]').forEach(b => b.onclick = () => moveSub(+b.dataset.pup, -1));
      box.querySelectorAll('[data-pdn]').forEach(b => b.onclick = () => moveSub(+b.dataset.pdn,  1));
      box.querySelectorAll('[data-pdel]').forEach(b => b.onclick = () => deleteSub(+b.dataset.pdel));
    }
    const btn = document.getElementById('prjAddSub');
    if(btn) btn.onclick = () => {
      /* first activation: seed with the current est */
      if(!window.project.subs.length){
        ensureFirstSub();
        renderProject();
        toast('Current estimate ko pehla sub-estimate bana diya. Ab + Add sub-estimate se aur add karo.');
        return;
      }
      const nm = prompt('Naye sub-estimate ka naam (jaise "Compound Wall", "Internal Road", "Sump"):', '');
      if(nm === null) return;
      addSub(nm);
    };
  }

  /* Estimate tab ke top par ek banner — batata hai ki abhi kaunsa
     sub-estimate edit ho raha hai aur Name of Work Project se aa raha hai. */
  function syncEstBanner(){
    const est_sec = document.getElementById('tab-est');
    if(!est_sec) return;
    let bn = document.getElementById('projEstBanner');
    const hasSubs = window.project && Array.isArray(window.project.subs) && window.project.subs.length;
    if(!hasSubs){ if(bn) bn.remove(); return; }
    const sub = window.project.subs[window.project.active] || {};
    const pName = (typeof projectName === 'function' ? projectName() : '') || '—';
    if(!bn){
      bn = document.createElement('div');
      bn.id = 'projEstBanner';
      bn.className = 'card';
      bn.style.cssText = 'border-left:4px solid #c85a2e;background:#fff6f0';
      est_sec.insertBefore(bn, est_sec.firstElementChild);
    }
    bn.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">' +
        '<div>' +
          '<div style="font-size:12px;color:#8a4b2c;text-transform:uppercase;letter-spacing:.05em">Sub-estimate ' +
            (window.project.active + 1) + ' / ' + window.project.subs.length + '</div>' +
          '<div style="font-size:16px;font-weight:700;color:#123a5e">' + esc(sub.name || ('Sub ' + (window.project.active+1))) + '</div>' +
          '<div style="font-size:12px;color:#456;margin-top:2px">Name of Work: <b>' + esc(pName) + '</b> <span style="color:#888">(Project tab se — yahan likhne ki zaroorat nahi)</span></div>' +
        '</div>' +
        '<button class="btn ghost" id="projEstBackBtn" style="padding:5px 12px">← Project tab</button>' +
      '</div>';
    const back = document.getElementById('projEstBackBtn');
    if(back) back.onclick = () => {
      const pb = document.querySelector('nav.tabs button[data-tab="proj"]');
      if(pb) pb.click();
    };
  }
  window.syncEstBanner = syncEstBanner;

  function renderProject(){
    ensureTab();
    bindMeta();
    renderPCBuildings();
    renderRCComputed();
    renderRCMix();
    renderRecapExtras();
    renderRecapLump();
    renderRecapPreview();
    renderSubs();
    syncEstBanner();
  }
  window.renderProject = renderProject;

  /* ================================================================
     Excel + PDF  sheet builders
     ============================================================== */

  function ExH(size, bold){ return { name:'Arial', size, bold: !!bold }; }
  const CTR_MID = { horizontal:'center', vertical:'middle', wrapText:true };
  const CTR_TOP = { horizontal:'center', vertical:'top',    wrapText:true };
  const LFT_MID = { horizontal:'left',   vertical:'middle', wrapText:true };
  const LFT_TOP = { horizontal:'left',   vertical:'top',    wrapText:true };
  const RGT_MID = { horizontal:'right',  vertical:'middle', wrapText:true };
  const _THIN = { style:'thin' };
  const BOX_ = { top:_THIN, left:_THIN, bottom:_THIN, right:_THIN };
  const RS_ = '_("Rs"* #,##0.00_);_("Rs"* \\(#,##0.00\\);_("Rs"* "-"??_);_(@_)';

  function _put(ws, addr, val, font, align, border, numFmt){
    const c = ws.getCell(addr);
    c.value = val; if(font) c.font = font; if(align) c.alignment = align;
    if(border) c.border = border; if(numFmt) c.numFmt = numFmt;
  }
  function _widths(ws, arr){ arr.forEach((w,i) => ws.getColumn(i+1).width = w); }

  function projectName(){
    return (window.project.meta.face && window.project.meta.performa &&
            window.project.meta.performa.projectNameOverride) ||
           (typeof buildWorkName === 'function' ? buildWorkName() : (est.road || 'Estimate'));
  }
  window.projName = projectName;

  /* ---------- FACE sheet — parent-level ---------- */
  function faceSheet(wb){
    const rec = buildRecapRows();
    const say = rec.say;
    const f = window.project.meta.face;
    const ws = wb.addWorksheet('FACE', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.7, right:0.5, top:0.6, bottom:0.5, header:0.3, footer:0.3 } } });
    _widths(ws, [4, 30, 3, 45]);

    let r = 2;
    ws.mergeCells(`A${r}:D${r}`); _put(ws, `A${r}`, 'FACE   SHEET', ExH(14, true), { horizontal:'center', vertical:'middle', underline:true }); ws.getRow(r).height = 30; r += 2;

    const rows = [
      ['CIRCLE',                f.circle || (office.div ? office.div.replace(/division/i, 'Circle') : 'R&B Circle')],
      ['DIVISION',              office.div || ''],
      ['SUB – DIVISION',        office.sub || ''],
      ['FUND HEAD',             f.fundHead || ''],
      ['MAJOR HEAD',            f.majorHead || ''],
      ['MINOR HEAD',            f.minorHead || ''],
      ['DEPARTMENT HEAD',       f.departmentHead || ''],
      ['NAME OF WORK',          projectName()],
      ['',''],
      ['ESTIMATED COST',        { rich: 'Rs. ' + fmt(say) }],
      ['ESTIMATE PREPARED BY',  f.preparedBy || (est.prepBy || '')],
      ['ESTIMATE CHECKED BY',   f.checkedBy  || (est.chkBy || '')]
    ];
    rows.forEach(([k, v]) => {
      _put(ws, `B${r}`, k, ExH(11, k === 'NAME OF WORK' || k === 'ESTIMATED COST'), LFT_TOP);
      _put(ws, `C${r}`, k ? ':' : '', ExH(11), CTR_TOP);
      _put(ws, `D${r}`, (v && v.rich) ? v.rich : (v || ''), ExH(11, k === 'NAME OF WORK' || k === 'ESTIMATED COST'), LFT_TOP);
      ws.getRow(r).height = k === 'NAME OF WORK' ? 34 : 20;
      r++;
    });
    r += 2;
    ws.mergeCells(`A${r}:D${r}`);
    _put(ws, `A${r}`, 'GENERAL DESCRIPTION', ExH(12, true), { horizontal:'center', vertical:'middle', underline:true });
    ws.getRow(r).height = 24; r += 2;
    ws.mergeCells(`A${r}:D${r}`);
    _put(ws, `A${r}`, f.gdShort || 'As per Attached Separate Sheet.', ExH(11), { horizontal:'center', vertical:'middle', wrapText:true });
    ws.getRow(r).height = 22;
  }
  window.projFaceSheet = faceSheet;

  /* ---------- GD sheet ---------- */
  function gdSheet(wb){
    const g = window.project.meta.gd;
    const ws = wb.addWorksheet('G.D.', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.5, right:0.5, top:0.5, bottom:0.5, header:0.3, footer:0.3 } } });
    _widths(ws, [4, 26, 4, 50]);

    let r = 2;
    ws.mergeCells(`A${r}:D${r}`); _put(ws, `A${r}`, 'GENERAL DESCRIPTION', ExH(13, true), { horizontal:'center', vertical:'middle', underline:true });
    ws.getRow(r).height = 26; r += 2;

    const rows = [
      ['Name of work',              projectName()],
      ['Budget Details',            g.budgetDetails],
      ['Budget Cost & Provision',   g.budgetCostProv],
      ['Addministrative Approval',  g.admApproval],
      ['Map Details',               g.mapDetails],
      ['Building Details',          g.buildingDetails],
      ['Work Details',              g.workDetails],
      ['S.O.R Year',                g.sorYear],
      ['Other Details',             g.otherDetails]
    ];
    rows.forEach((row, i) => {
      _put(ws, `A${r}`, i + 1, ExH(11), CTR_MID, BOX_);
      _put(ws, `B${r}`, row[0], ExH(11), LFT_MID, BOX_);
      _put(ws, `C${r}`, ':-',   ExH(11), CTR_MID, BOX_);
      _put(ws, `D${r}`, row[1] || '', ExH(11), LFT_MID, BOX_);
      const chars = String(row[1] || '').length;
      ws.getRow(r).height = Math.max(30, Math.ceil(chars / 50) * 16);
      r++;
    });

    /* signatures */
    r += 3;
    const sig = (typeof signDEE === 'function' ? signDEE() : ['Deputy Executive Engineer', 'R&B Sub Division', office.sub || 'Dahod']);
    const sigE= (typeof signEE  === 'function' ? signEE()  : ['Executive Engineer', 'R&B Division', office.div || 'Dahod']);
    for(let i=0;i<3;i++){
      _put(ws, `A${r+i}`, sig[i]  || '', ExH(11, i === 0), { horizontal:'center', vertical:'middle' });
      ws.mergeCells(`A${r+i}:B${r+i}`);
      _put(ws, `C${r+i}`, sigE[i] || '', ExH(11, i === 0), { horizontal:'center', vertical:'middle' });
      ws.mergeCells(`C${r+i}:D${r+i}`);
    }
  }
  window.projGDSheet = gdSheet;

  /* ---------- Performa – C ---------- */
  function performaSheet(wb){
    const p = window.project.meta.performa;
    const face = window.project.meta.face;
    const rec = buildRecapRows();
    const ws = wb.addWorksheet('Performa-C', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.5, right:0.5, top:0.5, bottom:0.5, header:0.3, footer:0.3 } } });
    _widths(ws, [4, 30, 3, 22, 22]);

    let r = 2;
    ws.mergeCells(`A${r}:E${r}`); _put(ws, `A${r}`, 'PERFORMA - C', ExH(14, true), { horizontal:'center', vertical:'middle', underline:true });
    ws.getRow(r).height = 26; r += 2;
    ws.mergeCells(`A${r}:E${r}`); _put(ws, `A${r}`, 'Principal features of the Project ( to accompany to Building )', ExH(11, true), LFT_MID);
    ws.getRow(r).height = 20; r += 2;
    _put(ws, `A${r}`, 'Name of Work :', ExH(11, true), LFT_TOP);
    ws.mergeCells(`B${r}:E${r}`); _put(ws, `B${r}`, projectName(), ExH(11, true), LFT_TOP);
    ws.getRow(r).height = 30; r += 2;

    function row(no, label, val, bold){
      _put(ws, `A${r}`, no, ExH(11), { horizontal:'center', vertical:'top' });
      _put(ws, `B${r}`, label, ExH(11, bold), LFT_TOP);
      _put(ws, `C${r}`, ':',   ExH(11), CTR_TOP);
      ws.mergeCells(`D${r}:E${r}`);
      _put(ws, `D${r}`, val == null ? '' : val, ExH(11, bold), LFT_TOP);
      const chars = String(val || '').length + String(label || '').length;
      ws.getRow(r).height = Math.max(20, Math.ceil(chars / 60) * 16);
      r++;
    }

    row(1, 'Name of the Department for which the building is proposed', p.department);
    row(2, 'Name of Work :-', projectName());
    row(3, 'Overrall Cost',       'Rs. ' + fmt(rec.say), true);
    row(4, 'Sub estimate without external water supply and sanitary arrangement and internal road wire fencing and electrical installation', 'Rs. ' + fmt(n(p.subEstNoExt)));

    /* 5. buildings table */
    _put(ws, `A${r}`, 5, ExH(11), { horizontal:'center', vertical:'top' });
    _put(ws, `B${r}`, 'Provision of Building', ExH(11), LFT_TOP);
    _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
    _put(ws, `D${r}`, 'Name of buildings', ExH(11, true), CTR_MID, BOX_);
    _put(ws, `E${r}`, 'Plinth Area',       ExH(11, true), CTR_MID, BOX_);
    r++;
    let totalArea = 0;
    (p.buildings || []).forEach(b => {
      _put(ws, `D${r}`, b.name || '', ExH(11), LFT_MID, BOX_);
      _put(ws, `E${r}`, n(b.area),    ExH(11), RGT_MID, BOX_, '0.00');
      totalArea += n(b.area);
      r++;
    });
    _put(ws, `D${r}`, 'Total', ExH(11, true), RGT_MID, BOX_);
    _put(ws, `E${r}`, totalArea + ' Sqmt', ExH(11, true), RGT_MID, BOX_);
    r += 2;

    row(6, 'Type of structure', p.typeOfStructure);
    row(7, 'Details of Rooms ( IN case of administrative public building provision made in area of as ..... )', p.roomDetails);
    row(8, 'Category Type', p.categoryType);

    /* 9. Specification */
    _put(ws, `A${r}`, 9, ExH(11), { horizontal:'center', vertical:'top' });
    _put(ws, `B${r}`, 'Specification adoted for the structure', ExH(11), LFT_TOP);
    _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
    r++;
    const spec = p.spec, sList = [
      ['(i)',    'Foundation',                    spec.foundation],
      ['(ii)',   'for Main walls',                spec.mainWalls],
      ['(iii)',  'for Balcony',                   spec.balcony],
      ['(iv)',   'Plinth Height',                 spec.plinthHeight],
      ['(v)',    'Supper Structure floor height', spec.floorHeight],
      ['(vi)',   'Roofs',                         spec.roofs],
      ['(vII)',  'Flooring',                      spec.flooring],
      ['(viii)', 'Doors',                         spec.doors],
      ['(ix)',   'Cup Boards',                    spec.cupBoards],
      ['(x)',    'Windows',                       spec.windows],
      ['(xi)',   'Durnishing',                    spec.durnishing],
      ['(xii)',  'Walls',                         spec.walls],
      ['(xiii)', 'R.C.C. Works',                  spec.rccWorks],
      ['(xiv)',  'Terrace',                       spec.terrace],
      ['(xv)',   'Type of Filling',               spec.filling],
      ['(xvi)',  'painting',                      spec.painting],
      ['(xvii)', 'Water Supply',                  spec.waterSupply],
      ['(xviii)','Drainage',                      spec.drainage],
      ['(xix)',  'Any Other Specials',            spec.otherSpecials]
    ];
    sList.forEach(([n_, k, v]) => {
      _put(ws, `B${r}`, n_ + '  ' + k, ExH(11), LFT_TOP);
      _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
      ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, v || '', ExH(11), LFT_TOP);
      ws.getRow(r).height = Math.max(20, Math.ceil(String(v||'').length / 60) * 16);
      r++;
    });

    row(10, 'General Strengh adopted', p.generalStrength);
    row(11, 'A. Cost of Plinth Area Rs. Per Sqm. :   ' + fmt(n(p.plinthAreaCost)) + '     B. Cost of Carpet Area Rs. Per Sqm. :   ' + fmt(n(p.carpetAreaCost)), '');
    row(12, 'Budget Provision for the year', p.budgetProvision);
    row(13, 'Neccessity of the Building', p.necessity);
    row(14, 'Any Other Specific reasons', p.otherReasons);
    row(15, 'Has the department countersigned the plan and has it been approved in principal by department ?', p.countersigned);
    row(16, 'In the case of Office building whether the area is as per srander designed by the Government and whether the area is calculated for specific category of staff.', p.officeBuildingArea);
    row(17, 'In case of residential building whethe the area is according with the standerd laid area is appropriate category of staff.', p.residentialBuildingArea);

    /* 18. Land availability sub-rows */
    _put(ws, `A${r}`, 18, ExH(11), { horizontal:'center', vertical:'top' });
    _put(ws, `B${r}`, 'A   Is land available Alredy available', ExH(11), LFT_TOP);
    _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
    ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, p.landAvailability.a || '', ExH(11), LFT_TOP); r++;
    [['B','Government land is available and proposal of land is yet to be submitted.', p.landAvailability.b],
     ['C','If land is not available action been taken to acquire land',                p.landAvailability.c],
     ['D','When is land is likely to be available.',                                    p.landAvailability.d]
    ].forEach(([n_, k, v]) => {
      _put(ws, `B${r}`, n_ + '   ' + k, ExH(11), LFT_TOP);
      _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
      ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, v || '', ExH(11), LFT_TOP);
      ws.getRow(r).height = Math.max(20, Math.ceil(String(v||'').length / 60) * 16); r++;
    });

    row(19, 'If any permission necessary from any local body / necessary from town planing authority.', p.permissions);

    /* 20. Recoverable */
    _put(ws, `A${r}`, 20, ExH(11), { horizontal:'center', vertical:'top' });
    _put(ws, `B${r}`, 'If any amount recoverable', ExH(11), LFT_TOP);
    _put(ws, `C${r}`, '', ExH(11), CTR_TOP); r++;
    [['i.',   'Any Local Body',                                                        p.recoverable.anyLocal],
     ['ii.',  'Central Government',                                                    p.recoverable.central],
     ['iii.', 'Any Other Privete resource if so please quate the relevant.',           p.recoverable.other]
    ].forEach(([n_, k, v]) => {
      _put(ws, `B${r}`, n_ + '  ' + k, ExH(11), LFT_TOP);
      _put(ws, `C${r}`, ':', ExH(11), CTR_TOP);
      ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, v || '', ExH(11), LFT_TOP); r++;
    });

    r += 2;
    const sig = (typeof signDEE === 'function' ? signDEE() : ['Deputy Executive Engineer', 'R&B Sub Division', office.sub || 'Dahod']);
    const sigE= (typeof signEE  === 'function' ? signEE()  : ['Executive Engineer', 'R&B Division', office.div || 'Dahod']);
    for(let i=0;i<3;i++){
      ws.mergeCells(`A${r+i}:B${r+i}`);
      _put(ws, `A${r+i}`, sig[i] || '',  ExH(11, i===0), { horizontal:'center', vertical:'middle' });
      ws.mergeCells(`D${r+i}:E${r+i}`);
      _put(ws, `D${r+i}`, sigE[i] || '', ExH(11, i===0), { horizontal:'center', vertical:'middle' });
    }
  }
  window.projPerformaSheet = performaSheet;

  /* ---------- RCC calc sheet ---------- */
  function rccSheet(wb){
    const rc = window.project.meta.rcc;
    const c = rccCompute();
    const ws = wb.addWorksheet('RCC Calc', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.5, right:0.5, top:0.5, bottom:0.5, header:0.3, footer:0.3 } } });
    _widths(ws, [6, 42, 3, 22, 4]);

    let r = 2;
    ws.mergeCells(`A${r}:E${r}`);
    _put(ws, `A${r}`, 'Calculation of RCC Member Section and Quantity of Reinforcement for Estimate as per Govt. letter No. ' + (rc.letterRef || ''), ExH(12, true), CTR_MID);
    ws.getRow(r).height = 40; r += 2;

    /* header */
    _put(ws, `A${r}`, 'Sr. No.',     ExH(11, true), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Description', ExH(11, true), CTR_MID, BOX_);
    _put(ws, `C${r}`, '',            ExH(11, true), CTR_MID, BOX_);
    ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, 'Calculation Values', ExH(11, true), CTR_MID, BOX_);
    r++;

    const rows = [
      [1,  'Name of Project',                                                       ':', projectName()],
      [2,  'No. of Stories Including G.F.',                                        'N', c.N],
      [3,  'Floor Area of Each Floor (m²)  (Including Cantilever Projection)',     'A', c.A],
      [4,  'Total Floor Area of Structure (m²)',                                   'A X N', c.totalFloorArea],
      [5,  'Total No.s of Columns',                                                'NC',    c.NC],
      [6,  'Load intensity of structure 2.1 (T/M²)',                               'IL',    c.IL],
      [7,  'Total Floor Area supported by each columns (m²)',                      'AC=A X N / NC', c.AC],
      [8,  'Total Average load on each column (T)',                                'CL = AC X IL',  c.CL],
      [9,  'S.B.C. (T/M²)',                                                        'SBC',           c.SBC],
      [10, 'Average Quantity of Footing for each column.(From Table No. 3) m³',    'Q.C. (SBC = 20 T/m³ & Load 250 T)', c.QC],
      [11, 'Total Quantity of Footings (m³)',                                      'TQ = QC X NC',  c.TQ],
      [12, "Average Length for P.C.C. lean Concrete (m)",                          "L' = √((CL X 1.1)/SBC) + 0.30", c.Lprime],
      [13, "Average Quantity of P.C.C. (T' = 0.15) (m³)",                          "L' X L' X T' X NC", c.pcc],
      [14, "Total Excavation for footings for average Depth of Foundation (DF) (m³)", "L' X L' X DF X NC", c.excav]
    ];
    rows.forEach(([no, k, sym, v]) => {
      _put(ws, `A${r}`, no,  ExH(11), CTR_MID, BOX_);
      _put(ws, `B${r}`, k,   ExH(11), LFT_MID, BOX_);
      _put(ws, `C${r}`, ':', ExH(11), CTR_MID, BOX_);
      _put(ws, `D${r}`, sym, ExH(11), LFT_MID, BOX_);
      _put(ws, `E${r}`, (typeof v === 'number') ? (Math.round(v * 100000) / 100000) : (v || ''),
           ExH(11), (typeof v === 'number' ? RGT_MID : LFT_MID), BOX_,
           (typeof v === 'number' ? '0.00###' : null));
      ws.getRow(r).height = Math.max(20, Math.ceil(String(k).length / 40) * 15);
      r++;
    });

    /* A / B / C rows */
    [['A', 'Column Size as per Table No. 4',                                     rc.columnSize],
     ['B', 'Slab Thickness as per Table No. 5 (Considering Continuous one Way Slab)', String(rc.slabThickness || '')],
     ['C', 'Beam Depth as per Table No. 6',                                      rc.beamDepth]
    ].forEach(([no, k, v]) => {
      _put(ws, `A${r}`, no,  ExH(11), CTR_MID, BOX_);
      _put(ws, `B${r}`, k,   ExH(11), LFT_MID, BOX_);
      _put(ws, `C${r}`, ':', ExH(11), CTR_MID, BOX_);
      ws.mergeCells(`D${r}:E${r}`);
      _put(ws, `D${r}`, v || '', ExH(11), LFT_MID, BOX_);
      ws.getRow(r).height = Math.max(20, Math.ceil(String(k).length / 40) * 15);
      r++;
    });

    /* Concrete Mix header */
    ws.mergeCells(`A${r}:E${r}`);
    _put(ws, `A${r}`, 'Concrete Mix as per Table No. 7', ExH(11, true), CTR_MID, BOX_);
    ws.getRow(r).height = 20; r++;

    _put(ws, `A${r}`, 'Sr. No.',           ExH(11, true), CTR_MID, BOX_);
    ws.mergeCells(`B${r}:C${r}`); _put(ws, `B${r}`, 'Item', ExH(11, true), CTR_MID, BOX_);
    ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, 'Grade of Concrete', ExH(11, true), CTR_MID, BOX_);
    r++;
    (rc.concreteMix || []).forEach((row, i) => {
      _put(ws, `A${r}`, i + 1, ExH(11), CTR_MID, BOX_);
      ws.mergeCells(`B${r}:C${r}`); _put(ws, `B${r}`, row.item || '',  ExH(11), LFT_MID, BOX_);
      ws.mergeCells(`D${r}:E${r}`); _put(ws, `D${r}`, row.grade || '', ExH(11), CTR_MID, BOX_);
      r++;
    });

    r += 2;
    const sig = (typeof signDEE === 'function' ? signDEE() : ['Deputy Executive Engineer', 'R&B Sub Division', office.sub || 'Dahod']);
    const sigE= (typeof signEE  === 'function' ? signEE()  : ['Executive Engineer', '( R & B ) Division', office.div || 'Dahod']);
    for(let i=0;i<3;i++){
      ws.mergeCells(`A${r+i}:B${r+i}`);
      _put(ws, `A${r+i}`, sig[i] || '',  ExH(11, i===0), { horizontal:'center', vertical:'middle' });
      ws.mergeCells(`D${r+i}:E${r+i}`);
      _put(ws, `D${r+i}`, sigE[i] || '', ExH(11, i===0), { horizontal:'center', vertical:'middle' });
    }
  }
  window.projRCCSheet = rccSheet;

  /* ---------- Recap sheet ---------- */
  function recapSheet(wb){
    const rec = buildRecapRows();
    const m = window.project.meta.recap;
    const ws = wb.addWorksheet('Recap', { pageSetup:{ paperSize:9, orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0,
      margins:{ left:0.5, right:0.5, top:0.5, bottom:0.5, header:0.3, footer:0.3 } } });
    _widths(ws, [6, 55, 20]);

    let r = 2;
    ws.mergeCells(`A${r}:C${r}`); _put(ws, `A${r}`, 'Name Of Work:-', ExH(11, true), LFT_MID); ws.getRow(r).height = 20; r++;
    ws.mergeCells(`A${r}:C${r}`); _put(ws, `A${r}`, projectName(), ExH(12, true), CTR_MID); ws.getRow(r).height = 26; r++;
    ws.mergeCells(`A${r}:C${r}`); _put(ws, `A${r}`, 'RECAPITULATION SHEET', ExH(13, true), { horizontal:'center', vertical:'middle', underline:true }); ws.getRow(r).height = 24; r += 2;

    _put(ws, `A${r}`, 'S No.', ExH(11, true), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Description', ExH(11, true), CTR_MID, BOX_);
    _put(ws, `C${r}`, 'Amount in Rs.', ExH(11, true), CTR_MID, BOX_);
    r++;

    ws.mergeCells(`A${r}:C${r}`); _put(ws, `A${r}`, '(A)   Civil Works;', ExH(11, true), LFT_MID, BOX_); r++;

    rec.civil.forEach((row, i) => {
      _put(ws, `A${r}`, i + 1,       ExH(11), CTR_MID, BOX_);
      _put(ws, `B${r}`, row.name || '', ExH(11), LFT_MID, BOX_);
      _put(ws, `C${r}`, n(row.amount), ExH(11), RGT_MID, BOX_, '#,##0.00');
      r++;
    });
    _put(ws, `A${r}`, '', ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Total A', ExH(11, true), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.totalA, ExH(11, true), RGT_MID, BOX_, '#,##0.00'); r++;

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Quality control Charge ' + (m.qcPct) + '%', ExH(11), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.qc, ExH(11), RGT_MID, BOX_, '#,##0.00'); r++;

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Work charge & Contingency Charge  ' + (m.wcPct) + '%', ExH(11), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.wc, ExH(11), RGT_MID, BOX_, '#,##0.00'); r++;

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'GST ' + (m.gstPct) + '% on A', ExH(11), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.gst, ExH(11), RGT_MID, BOX_, '#,##0.00'); r++;

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Sub Total', ExH(11, true), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.subTot, ExH(11, true), RGT_MID, BOX_, '#,##0.00'); r++;

    ws.mergeCells(`A${r}:C${r}`); _put(ws, `A${r}`, '(B)  Lump Sum Provision Including GST;', ExH(11, true), LFT_MID, BOX_); r++;

    (m.lumpSum || []).forEach((l, i) => {
      _put(ws, `A${r}`, rec.civil.length + 1 + i, ExH(11), CTR_MID, BOX_);
      _put(ws, `B${r}`, l.name || '', ExH(11), LFT_MID, BOX_);
      _put(ws, `C${r}`, n(l.amount),  ExH(11), RGT_MID, BOX_, '#,##0.00'); r++;
    });

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Total', ExH(11, true), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.total, ExH(11, true), RGT_MID, BOX_, '#,##0.00'); r++;

    _put(ws, `A${r}`, '',  ExH(11), CTR_MID, BOX_);
    _put(ws, `B${r}`, 'Say', ExH(11, true), RGT_MID, BOX_);
    _put(ws, `C${r}`, rec.say, ExH(11, true), RGT_MID, BOX_, '#,##0.00'); r++;

    r += 2;
    const sig = (typeof signDEE === 'function' ? signDEE() : ['Deputy Executive Engineer', 'R&B Sub Division', office.sub || 'Dahod']);
    const sigE= (typeof signEE  === 'function' ? signEE()  : ['Executive Engineer', 'R&B Division', office.div || 'Dahod']);
    for(let i=0;i<3;i++){
      _put(ws, `A${r+i}`, sig[i]  || '', ExH(11, i===0), { horizontal:'center', vertical:'middle' });
      ws.mergeCells(`A${r+i}:B${r+i}`);
      _put(ws, `C${r+i}`, sigE[i] || '', ExH(11, i===0), { horizontal:'center', vertical:'middle' });
    }
  }
  window.projRecapSheet = recapSheet;

  /* ---------- PDF helpers ---------- */
  function pdfHelpers(doc){
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    return { W, H, M: 46 };
  }
  window.projPDFHelpers = pdfHelpers;

  /* ---------- Add all project pages to a jsPDF doc ---------- */
  function pdfPages(doc){
    const rec = buildRecapRows();

    /* FACE */
    let { W, H, M } = pdfHelpers(doc);
    doc.setFont('helvetica','bold'); doc.setFontSize(14);
    doc.text('FACE   SHEET', W/2, 70, { align:'center' });
    doc.setLineWidth(0.4); doc.line(W/2 - 60, 74, W/2 + 60, 74);
    doc.setFont('helvetica','normal'); doc.setFontSize(11);
    let y = 100;
    const f = window.project.meta.face;
    const rows = [
      ['CIRCLE',                f.circle || (office.div ? office.div.replace(/division/i, 'Circle') : 'R&B Circle')],
      ['DIVISION',              office.div || ''],
      ['SUB – DIVISION',        office.sub || ''],
      ['FUND HEAD',             f.fundHead || ''],
      ['MAJOR HEAD',            f.majorHead || ''],
      ['MINOR HEAD',            f.minorHead || ''],
      ['DEPARTMENT HEAD',       f.departmentHead || ''],
      ['NAME OF WORK',          projectName(), true],
      ['ESTIMATED COST',        'Rs. ' + fmt(rec.say), true],
      ['ESTIMATE PREPARED BY',  f.preparedBy || est.prepBy || ''],
      ['ESTIMATE CHECKED BY',   f.checkedBy  || est.chkBy  || '']
    ];
    const lx = M + 6, cx = M + 200, vx = M + 210;
    rows.forEach(([k, v, bold]) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.text(k, lx, y);
      doc.text(':', cx, y);
      const t = doc.splitTextToSize(String(v || ''), W - vx - M);
      doc.text(t, vx, y);
      y += Math.max(20, t.length * 14);
    });
    y += 20;
    doc.setFont('helvetica','bold'); doc.setFontSize(12);
    doc.text('GENERAL DESCRIPTION', W/2, y, { align:'center' });
    doc.line(W/2 - 92, y + 3, W/2 + 92, y + 3);
    y += 20;
    doc.setFont('helvetica','normal'); doc.setFontSize(11);
    doc.text(f.gdShort || 'As per Attached Separate Sheet.', W/2, y, { align:'center' });

    /* GD */
    doc.addPage('a4','portrait');
    y = 60;
    doc.setFont('helvetica','bold'); doc.setFontSize(13);
    doc.text('GENERAL DESCRIPTION', W/2, y, { align:'center' });
    doc.line(W/2 - 110, y + 3, W/2 + 110, y + 3);
    y += 24;
    const g = window.project.meta.gd;
    const gdRows = [
      ['1', 'Name of work',              projectName()],
      ['2', 'Budget Details',            g.budgetDetails],
      ['3', 'Budget Cost & Provision',   g.budgetCostProv],
      ['4', 'Addministrative Approval',  g.admApproval],
      ['5', 'Map Details',               g.mapDetails],
      ['6', 'Building Details',          g.buildingDetails],
      ['7', 'Work Details',              g.workDetails],
      ['8', 'S.O.R Year',                g.sorYear],
      ['9', 'Other Details',             g.otherDetails]
    ];
    doc.autoTable({
      startY: y, margin: { left: M, right: M }, theme:'grid',
      head: [['Sr.', 'Description', ':-', 'Value']],
      body: gdRows.map(r => [r[0], r[1], ':-', r[2] || '']),
      styles: { font:'helvetica', fontSize: 10, cellPadding: 6, lineColor:[0,0,0], lineWidth:0.4, valign:'middle' },
      headStyles: { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center' },
      columnStyles: { 0:{ cellWidth:26, halign:'center' }, 1:{ cellWidth:150 }, 2:{ cellWidth:20, halign:'center' }, 3:{ cellWidth:'auto' } }
    });
    const sigY = doc.lastAutoTable.finalY + 42;
    pdfSignPair(doc, sigY, M, W);

    /* Performa - C */
    doc.addPage('a4','portrait');
    y = 60;
    doc.setFont('helvetica','bold'); doc.setFontSize(14);
    doc.text('PERFORMA - C', W/2, y, { align:'center' });
    doc.line(W/2 - 68, y + 3, W/2 + 68, y + 3);
    y += 22;
    doc.setFontSize(11); doc.setFont('helvetica','normal');
    doc.text('Principal features of the Project ( to accompany to Building )', W/2, y, { align:'center' });
    y += 18;
    doc.setFont('helvetica','bold');
    const nmT = doc.splitTextToSize('Name of Work : ' + projectName(), W - 2*M);
    doc.text(nmT, M, y); y += nmT.length * 14 + 6;
    doc.setFont('helvetica','normal');

    const p = window.project.meta.performa;
    const pcBody = [
      ['1',  'Name of Department for which building is proposed', p.department],
      ['2',  'Name of Work',                                       projectName()],
      ['3',  'Overrall Cost',                                     'Rs. ' + fmt(rec.say)],
      ['4',  'Sub estimate without ext.water supply, sanitary, internal road, wire fencing & electrical installation', 'Rs. ' + fmt(n(p.subEstNoExt))],
      ['5',  'Provision of Building',                             (p.buildings || []).map(b => `${b.name || ''}: ${fmt(n(b.area))} Sqmt`).join('   ')],
      ['6',  'Type of structure',                                  p.typeOfStructure],
      ['7',  'Details of Rooms (admin. public building provision made in area of as)', p.roomDetails],
      ['8',  'Category Type',                                      p.categoryType]
    ];
    const spec = p.spec;
    const sSpec =
      `(i)  Foundation: ${spec.foundation}\n` +
      `(ii) for Main walls: ${spec.mainWalls}\n` +
      `(iii) for Balcony: ${spec.balcony}\n` +
      `(iv) Plinth Height: ${spec.plinthHeight}\n` +
      `(v)  Super Structure floor height: ${spec.floorHeight}\n` +
      `(vi) Roofs: ${spec.roofs}\n` +
      `(vII) Flooring: ${spec.flooring}\n` +
      `(viii) Doors: ${spec.doors}\n` +
      `(ix)  Cup Boards: ${spec.cupBoards}\n` +
      `(x)   Windows: ${spec.windows}\n` +
      `(xi)  Durnishing: ${spec.durnishing}\n` +
      `(xii) Walls: ${spec.walls}\n` +
      `(xiii) R.C.C. Works: ${spec.rccWorks}\n` +
      `(xiv) Terrace: ${spec.terrace}\n` +
      `(xv)  Type of Filling: ${spec.filling}\n` +
      `(xvi) painting: ${spec.painting}\n` +
      `(xvii) Water Supply: ${spec.waterSupply}\n` +
      `(xviii) Drainage: ${spec.drainage}\n` +
      `(xix)  Any Other Specials: ${spec.otherSpecials}`;
    pcBody.push(['9',  'Specification adoted for the structure', sSpec]);
    pcBody.push(['10', 'General Strengh adopted',                p.generalStrength]);
    pcBody.push(['11', 'A. Cost of Plinth Area Rs./Sqm ; B. Cost of Carpet Area Rs./Sqm', 'A: ' + fmt(n(p.plinthAreaCost)) + '   B: ' + fmt(n(p.carpetAreaCost))]);
    pcBody.push(['12', 'Budget Provision for the year',           p.budgetProvision]);
    pcBody.push(['13', 'Neccessity of the Building',              p.necessity]);
    pcBody.push(['14', 'Any Other Specific reasons',              p.otherReasons]);
    pcBody.push(['15', 'Has the department countersigned the plan and has it been approved in principal by department ?', p.countersigned]);
    pcBody.push(['16', 'In the case of Office building whether the area is as per srander designed by the Government and whether the area is calculated for specific category of staff.', p.officeBuildingArea]);
    pcBody.push(['17', 'In case of residential building whethe the area is according with the standerd laid area is appropriate category of staff.', p.residentialBuildingArea]);
    pcBody.push(['18', 'Land availability',
      `A  Is land available Alredy available:  ${p.landAvailability.a}\nB  Government land is available and proposal of land is yet to be submitted:  ${p.landAvailability.b}\nC  If land is not available action been taken to acquire land:  ${p.landAvailability.c}\nD  When is land is likely to be available:  ${p.landAvailability.d}`]);
    pcBody.push(['19', 'If any permission necessary from any local body / town planing authority.', p.permissions]);
    pcBody.push(['20', 'If any amount recoverable',
      `i.   Any Local Body:  ${p.recoverable.anyLocal}\nii.  Central Government:  ${p.recoverable.central}\niii. Any Other Privete resource:  ${p.recoverable.other}`]);

    doc.autoTable({
      startY: y, margin: { left: M, right: M }, theme: 'grid',
      body: pcBody,
      styles: { font:'helvetica', fontSize: 9, cellPadding: 5, lineColor:[0,0,0], lineWidth:0.4, valign:'top' },
      columnStyles: { 0:{ cellWidth:22, halign:'center' }, 1:{ cellWidth:200 }, 2:{ cellWidth:'auto' } }
    });
    pdfSignPair(doc, doc.lastAutoTable.finalY + 40, M, W);

    /* RCC */
    doc.addPage('a4','portrait');
    y = 56;
    const rc = window.project.meta.rcc, c = rccCompute();
    doc.setFont('helvetica','bold'); doc.setFontSize(11);
    const rcT = doc.splitTextToSize('Calculation of RCC Member Section and Quantity of Reinforcement for Estimate as per Govt. letter No. ' + (rc.letterRef || ''), W - 2*M);
    doc.text(rcT, W/2, y, { align:'center' }); y += rcT.length * 13 + 10;

    const rccBody = [
      ['1',  'Name of Project', ':', projectName()],
      ['2',  'No. of Stories Including G.F.',                         'N',                     String(c.N)],
      ['3',  'Floor Area of Each Floor (m²)',                         'A',                     fmt(c.A)],
      ['4',  'Total Floor Area of Structure (m²)',                    'A X N',                 fmt(c.totalFloorArea)],
      ['5',  'Total No.s of Columns',                                 'NC',                    String(c.NC)],
      ['6',  'Load intensity of structure (T/M²)',                    'IL',                    fmt(c.IL)],
      ['7',  'Total Floor Area supported by each columns (m²)',       'AC = A×N / NC',         fmt(c.AC)],
      ['8',  'Total Average load on each column (T)',                 'CL = AC × IL',          fmt(c.CL)],
      ['9',  'S.B.C. (T/M²)',                                         'SBC',                   fmt(c.SBC)],
      ['10', 'Avg Qty of Footing per column (m³)  From Table No. 3',  'Q.C.',                  fmt(c.QC)],
      ['11', 'Total Quantity of Footings (m³)',                        'TQ = QC × NC',         fmt(c.TQ)],
      ['12', "Avg Length for P.C.C. lean Concrete (m)",                "L' = √((CL×1.1)/SBC) + 0.30", fmt(c.Lprime)],
      ['13', "Avg Quantity of P.C.C. (T' = 0.15) (m³)",                "L' × L' × T' × NC",    fmt(c.pcc)],
      ['14', "Total Excavation for footings (m³)",                     "L' × L' × DF × NC",    fmt(c.excav)],
      ['A',  'Column Size as per Table No. 4',                        ':', rc.columnSize],
      ['B',  'Slab Thickness as per Table No. 5 (Continuous one Way Slab)', ':', String(rc.slabThickness)],
      ['C',  'Beam Depth as per Table No. 6',                         ':', rc.beamDepth]
    ];
    doc.autoTable({
      startY: y, margin: { left: M, right: M }, theme:'grid',
      head: [['Sr.','Description','','Calculation Values']],
      body: rccBody,
      styles: { font:'helvetica', fontSize: 9, cellPadding: 5, lineColor:[0,0,0], lineWidth:0.4, valign:'middle' },
      headStyles: { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center' },
      columnStyles: { 0:{ cellWidth:26, halign:'center' }, 1:{ cellWidth:210 }, 2:{ cellWidth:80, halign:'center' }, 3:{ cellWidth:'auto', halign:'right' } }
    });
    /* mix */
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 6, margin: { left: M, right: M }, theme:'grid',
      head: [[{ content:'Concrete Mix as per Table No. 7', colSpan:3, styles:{ halign:'center', fontStyle:'bold' } }],
             ['Sr.','Item','Grade of Concrete']],
      body: (rc.concreteMix || []).map((row, i) => [i+1, row.item || '', row.grade || '']),
      styles: { font:'helvetica', fontSize: 9, cellPadding: 5, lineColor:[0,0,0], lineWidth:0.4 },
      headStyles: { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center' },
      columnStyles: { 0:{ cellWidth:26, halign:'center' }, 1:{ cellWidth:270 }, 2:{ cellWidth:'auto', halign:'center' } }
    });
    pdfSignPair(doc, doc.lastAutoTable.finalY + 42, M, W);

    /* Recap */
    doc.addPage('a4','portrait');
    y = 60;
    doc.setFont('helvetica','bold'); doc.setFontSize(11);
    doc.text('Name Of Work:-', M, y); y += 14;
    const nmR = doc.splitTextToSize(projectName(), W - 2*M);
    doc.setFontSize(12); doc.text(nmR, W/2, y, { align:'center' }); y += nmR.length * 14 + 6;
    doc.setFontSize(13); doc.text('RECAPITULATION SHEET', W/2, y, { align:'center' });
    doc.line(W/2 - 92, y + 3, W/2 + 92, y + 3);
    y += 18;

    const rBody = [];
    rBody.push([{ content:'(A)  Civil Works;', colSpan:3, styles:{ fontStyle:'bold', fillColor:[238,242,247] } }]);
    rec.civil.forEach((row, i) => rBody.push([String(i+1), row.name || '', { content: fmt(n(row.amount)), styles:{ halign:'right' } }]));
    rBody.push([{ content:'', styles:{} }, { content:'Total A', styles:{ halign:'right', fontStyle:'bold' } }, { content: fmt(rec.totalA), styles:{ halign:'right', fontStyle:'bold' } }]);
    rBody.push([{ content:'' }, { content:'Quality control Charge '  + (m.qcPct)  + '%', styles:{ halign:'right' } }, { content: fmt(rec.qc), styles:{ halign:'right' } }]);
    rBody.push([{ content:'' }, { content:'Work charge & Contingency ' + (m.wcPct) + '%', styles:{ halign:'right' } }, { content: fmt(rec.wc), styles:{ halign:'right' } }]);
    rBody.push([{ content:'' }, { content:'GST '                       + (m.gstPct) + '% on A', styles:{ halign:'right' } }, { content: fmt(rec.gst), styles:{ halign:'right' } }]);
    rBody.push([{ content:'' }, { content:'Sub Total', styles:{ halign:'right', fontStyle:'bold' } }, { content: fmt(rec.subTot), styles:{ halign:'right', fontStyle:'bold' } }]);
    rBody.push([{ content:'(B)  Lump Sum Provision Including GST;', colSpan:3, styles:{ fontStyle:'bold', fillColor:[238,242,247] } }]);
    (m.lumpSum || []).forEach((l, i) => rBody.push([String(rec.civil.length + 1 + i), l.name || '', { content: fmt(n(l.amount)), styles:{ halign:'right' } }]));
    rBody.push([{ content:'' }, { content:'Total', styles:{ halign:'right', fontStyle:'bold' } }, { content: fmt(rec.total), styles:{ halign:'right', fontStyle:'bold' } }]);
    rBody.push([{ content:'' }, { content:'Say', styles:{ halign:'right', fontStyle:'bold' } }, { content: fmt(rec.say), styles:{ halign:'right', fontStyle:'bold' } }]);

    doc.autoTable({
      startY: y, margin: { left: M, right: M }, theme:'grid',
      head: [['S No.', 'Description', 'Amount in Rs.']],
      body: rBody,
      styles: { font:'helvetica', fontSize: 10, cellPadding: 5, lineColor:[0,0,0], lineWidth:0.4, valign:'middle' },
      headStyles: { fillColor:[255,255,255], textColor:[0,0,0], fontStyle:'bold', halign:'center' },
      columnStyles: { 0:{ cellWidth:40, halign:'center' }, 1:{ cellWidth:340 }, 2:{ cellWidth:'auto', halign:'right' } }
    });
    pdfSignPair(doc, doc.lastAutoTable.finalY + 42, M, W);
  }
  window.projPDFPages = pdfPages;

  function pdfSignPair(doc, y, M, W){
    doc.setFont('helvetica','bold'); doc.setFontSize(11);
    const sig = (typeof signDEE === 'function' ? signDEE() : ['Deputy Executive Engineer', 'R&B Sub Division', office.sub || 'Dahod']);
    const sigE= (typeof signEE  === 'function' ? signEE()  : ['Executive Engineer', 'R&B Division', office.div || 'Dahod']);
    for(let i=0;i<3;i++){
      doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
      doc.text(sig[i]  || '', M + 100,     y + i*13, { align:'center' });
      doc.text(sigE[i] || '', W - M - 100, y + i*13, { align:'center' });
    }
  }
  window.projPDFSignPair = pdfSignPair;

  /* ================================================================
     Auto-render when the Project tab becomes visible
     ============================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    /* create the tab immediately so users can find it */
    ensureTab();
    /* keep tab-proj in sync: any nav click that isn't the Project tab
       hides the Project section (mirrors how letter.js manages tab-ltr).
       Delegated on document so it also catches the dynamically-added
       Project button and the tab buttons bound before it existed. */
    document.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('nav.tabs button');
      if(!b) return;
      const sec = document.getElementById('tab-proj');
      if(sec) sec.hidden = (b.dataset.tab !== 'proj');
      if(b.dataset.tab === 'proj') setTimeout(renderProject, 0);
      if(b.dataset.tab === 'est' && typeof syncEstBanner === 'function') setTimeout(syncEstBanner, 0);
    });
  });

  /* also expose activate-from-anywhere */
  window.openProject = () => {
    ensureTab();
    const b = document.querySelector('nav.tabs [data-tab="proj"]');
    if(b) b.click();
    else renderProject();
  };
})();
