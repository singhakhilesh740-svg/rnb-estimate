/* ============================================================================
   R&B Estimate Builder — LETTER tab
   Saved estimates chuno → Dy.EE se EE ko perusal / Technical Sanction letter
   Output: Word (.docx, editable) + PDF + Print
   Depends on: app.js ($ , $$ , store, toast, esc, fmt0, download, savedEstimates)
               JSZip (docx), jsPDF + autoTable (pdf)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) PURE LETTER MODEL → OOXML  (koi DOM nahi — isliye test karna aasan hai)
   -------------------------------------------------------------------------- */

const LETTERHEAD = [
  { t: 'GOVERNMENT OF GUJARAT',                              b: true,  sz: 24 },
  { t: 'ROADS & BUILDINGS DEPARTMENT',                       b: true,  sz: 24 },
  { t: 'Office of the Deputy Executive Engineer',            b: true,  sz: 22 },
  { t: 'R & B Sub Division, Dahod',                          b: true,  sz: 22 },
  { t: 'Gadi Fort, Dahod, Taluka: Dahod, District: Dahod',   b: false, sz: 18 },
  { t: 'Phone: 02673-220227,  Email: rnbdahoddee@gmail.com', b: false, sz: 18 }
];

const PAGE = { w: 11906, h: 16838, mL: 1080, mR: 1080, mT: 720, mB: 720 };
const USABLE = PAGE.w - PAGE.mL - PAGE.mR;          // 9746 dxa
const COLS   = [800, 6546, 2400];                    // Sr / Work / Amount

const xesc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function xRun(text, o){
  o = o || {};
  const sz = o.sz || 22;
  const rPr = '<w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>' +
    (o.b ? '<w:b/><w:bCs/>' : '') + (o.u ? '<w:u w:val="single"/>' : '') +
    `<w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr>`;
  return `<w:r>${rPr}<w:t xml:space="preserve">${xesc(text)}</w:t></w:r>`;
}

function xPara(runs, o){
  o = o || {};
  let pPr = '<w:pPr>';
  if (o.border) {
    pPr += `<w:pBdr><w:bottom w:val="single" w:sz="${o.border}" w:space="0" w:color="000000"/></w:pBdr>`;
  }
  pPr += `<w:spacing w:before="${o.before || 0}" w:after="${o.after || 0}" ` +
         `w:line="${o.line || 240}" w:lineRule="${o.lineRule || 'auto'}"/>`;
  if (o.indent) pPr += `<w:ind w:firstLine="${o.indent}"/>`;
  if (o.align)  pPr += `<w:jc w:val="${o.align}"/>`;
  if (o.tabRight) pPr += `<w:tabs><w:tab w:val="right" w:pos="${USABLE}"/></w:tabs>`;
  pPr += '</w:pPr>';
  return `<w:p>${pPr}${Array.isArray(runs) ? runs.join('') : (runs || '')}</w:p>`;
}

function xCell(width, paras, o){
  o = o || {};
  const shd = o.fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${o.fill}"/>` : '';
  const bd  = o.noBorder ? '' :
    '<w:tcBorders>' + ['top', 'left', 'bottom', 'right']
      .map(s => `<w:${s} w:val="single" w:sz="6" w:space="0" w:color="000000"/>`).join('') +
    '</w:tcBorders>';
  return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${bd}${shd}` +
         `<w:vAlign w:val="center"/></w:tcPr>${paras}</w:tc>`;
}

function xTable(rows, widths, o){
  o = o || {};
  const look = o.noBorder
    ? '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']
        .map(s => `<w:${s} w:val="none" w:sz="0" w:space="0" w:color="auto"/>`).join('') + '</w:tblBorders>'
    : '';
  const grid = widths.map(w => `<w:gridCol w:w="${w}"/>`).join('');
  return `<w:tbl><w:tblPr><w:tblW w:w="${widths.reduce((a, b) => a + b, 0)}" w:type="dxa"/>` +
         `<w:jc w:val="center"/>${look}<w:tblLayout w:type="fixed"/></w:tblPr>` +
         `<w:tblGrid>${grid}</w:tblGrid>${rows.join('')}</w:tbl>`;
}

/* multi-line text → paragraphs */
function xBlock(text, o){
  return String(text || '').split('\n').map(l => xPara(xRun(l, o), o)).join('');
}

/* letter model → word/document.xml */
function buildLetterXml(M){
  const body = [];

  /* letterhead */
  LETTERHEAD.forEach(l => body.push(xPara(xRun(l.t, { b: l.b, sz: l.sz }), { align: 'center' })));
  body.push(xPara('', { border: 18, line: 40, lineRule: 'exact' }));   // thick rule
  body.push(xPara('', { border: 6,  line: 60, lineRule: 'exact' }));   // thin rule

  /* No. / Date row */
  body.push(xTable([
    '<w:tr>' +
      xCell(USABLE / 2, xPara(xRun('No: ' + (M.no || '____________'), { b: true })), { noBorder: true }) +
      xCell(USABLE / 2, xPara(xRun('Date: ' + (M.date || '____ / ____ / ' + M.year), { b: true }), { align: 'right' }), { noBorder: true }) +
    '</w:tr>'
  ], [USABLE / 2, USABLE / 2], { noBorder: true }));
  body.push(xPara('', { after: 120 }));

  /* To block */
  body.push(xPara(xRun('To,', { b: true })));
  M.to.forEach(l => body.push(xPara(xRun(l, { b: true }), { indent: 360 })));
  body.push(xPara('', { after: 120 }));

  /* Subject */
  body.push(xPara([xRun('Subject : ', { b: true }), xRun(M.subject, { b: true })],
    { align: 'both', after: 120 }));

  /* Reference (optional) */
  if (M.ref) {
    body.push(xPara([xRun('Reference : ', { b: true }), xRun(M.ref, { b: true })],
      { align: 'both', after: 120 }));
  }

  body.push(xPara(xRun('Sir,'), { after: 120 }));

  /* intro paragraph(s) */
  body.push(xBlock(M.intro, { align: 'both', indent: 480, after: 160, line: 288 }));

  /* works table */
  if (M.works.length) {
    const hdrCell = (w, t, al) => xCell(w, xPara(xRun(t, { b: true }), { align: al || 'center' }), { fill: 'D9D9D9' });
    const rows = ['<w:tr><w:trPr><w:tblHeader/></w:trPr>' +
      hdrCell(COLS[0], 'Sr. No.') + hdrCell(COLS[1], 'Name of Work') +
      hdrCell(COLS[2], 'Estimated Amount (Rs.)') + '</w:tr>'];

    M.works.forEach((w, i) => {
      rows.push('<w:tr>' +
        xCell(COLS[0], xPara(xRun(String(i + 1)), { align: 'center' })) +
        xCell(COLS[1], xPara(xRun(w.name), { align: 'both' })) +
        xCell(COLS[2], xPara(xRun(w.amountText), { align: 'right' })) +
      '</w:tr>');
    });

    rows.push('<w:tr>' +
      xCell(COLS[0] + COLS[1], xPara(xRun('Total', { b: true }), { align: 'right' }), { fill: 'D9D9D9' }) +
      xCell(COLS[2], xPara(xRun(M.totalText, { b: true }), { align: 'right' }), { fill: 'D9D9D9' }) +
    '</w:tr>');

    /* merged first cell of total row */
    rows[rows.length - 1] = rows[rows.length - 1].replace(
      `<w:tcW w:w="${COLS[0] + COLS[1]}" w:type="dxa"/>`,
      `<w:tcW w:w="${COLS[0] + COLS[1]}" w:type="dxa"/><w:gridSpan w:val="2"/>`);

    body.push(xTable(rows, COLS));
    body.push(xPara('', { after: 120 }));
  }

  /* closing paragraph(s) */
  body.push(xBlock(M.closing, { align: 'both', indent: 480, after: 200, line: 288 }));

  /* Encl. */
  if (M.encl) body.push(xPara(xRun('Encl.: ' + M.encl, { b: true }), { after: 120 }));

  /* space for seal + signature block (right half, centred) */
  for (let i = 0; i < 3; i++) body.push(xPara(''));
  body.push(xTable([
    '<w:tr>' +
      xCell(USABLE / 2, xPara(''), { noBorder: true }) +
      xCell(USABLE / 2, M.sign.map(l => xPara(xRun(l, { b: true }), { align: 'center' })).join(''), { noBorder: true }) +
    '</w:tr>'
  ], [USABLE / 2, USABLE / 2], { noBorder: true }));

  /* Copy to */
  if (M.copyTo && M.copyTo.length) {
    body.push(xPara('', { after: 120 }));
    body.push(xPara(xRun('Copy submitted to :', { b: true })));
    M.copyTo.forEach((c, i) => body.push(xPara(xRun((i + 1) + '. ' + c), { indent: 360 })));
  }

  const sect = `<w:sectPr><w:pgSz w:w="${PAGE.w}" w:h="${PAGE.h}"/>` +
    `<w:pgMar w:top="${PAGE.mT}" w:right="${PAGE.mR}" w:bottom="${PAGE.mB}" w:left="${PAGE.mL}" ` +
    `w:header="360" w:footer="360" w:gutter="0"/></w:sectPr>`;

  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    '<w:body>' + body.join('') + sect + '</w:body></w:document>';
}

const DOCX_PARTS = {
  '[Content_Types].xml':
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
    '</Types>',
  '_rels/.rels':
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>',
  'word/_rels/document.xml.rels':
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    '</Relationships>',
  'word/styles.xml':
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    '<w:docDefaults><w:rPrDefault><w:rPr>' +
    '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/>' +
    '</w:rPr></w:rPrDefault><w:pPrDefault><w:pPr>' +
    '<w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>' +
    '</w:pPr></w:pPrDefault></w:docDefaults>' +
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>' +
    '</w:styles>'
};

/* number → Indian words */
function rsWords(num){
  num = Math.round(Math.abs(Number(num) || 0));
  if (!num) return 'Zero';
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = n => n < 20 ? a[n] : (b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : ''));
  const three = n => (n > 99 ? a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + two(n % 100) : '') : two(n));
  const parts = [];
  const cr = Math.floor(num / 10000000); num %= 10000000;
  const lk = Math.floor(num / 100000);   num %= 100000;
  const th = Math.floor(num / 1000);     num %= 1000;
  if (cr) parts.push(three(cr) + ' Crore');
  if (lk) parts.push(three(lk) + ' Lakh');
  if (th) parts.push(three(th) + ' Thousand');
  if (num) parts.push(three(num));
  return parts.join(' ');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildLetterXml, DOCX_PARTS, rsWords };
}

/* --------------------------------------------------------------------------
   2) UI  (browser only)
   -------------------------------------------------------------------------- */
if (typeof document !== 'undefined') (function(){

  const LKEY = 'rnb_letter';
  const DEF = {
    type: 'perusal',            // perusal | ts
    no: '', date: '',
    subject: '', autoSub: true,
    ref: '', rateWord: 'auto',  // auto | arc | sor
    encl: 'Estimate (2 copies)',
    intro: '', closing: '', autoBody: true,
    picks: []                   // [{ id, name, amount }]
  };
  let L = Object.assign({}, DEF, store.get(LKEY, null) || {});
  const saveL = () => store.set(LKEY, L);
  const YEAR = new Date().getFullYear();

  const money = v => fmt0(Math.round(Number(v) || 0));

  /* ---------- auto text ---------- */
  function rateWord(){
    if (L.rateWord === 'arc') return 'Approved Rates';
    if (L.rateWord === 'sor') return 'Schedule of Rates (S.O.R.)';
    const rs = L.picks.map(p => (savedEstimates.find(s => s.id === p.id) || {}).rateSource);
    return rs.length && rs.every(r => r === 'sor') ? 'Schedule of Rates (S.O.R.)' : 'Approved Rates';
  }
  function autoSubject(){
    const n = L.picks.length;
    const lead = L.type === 'ts'
      ? 'Regarding Technical Sanction of'
      : 'Regarding perusal of';
    if (n === 1) return `${lead} estimate for the work "${L.picks[0].name}".`;
    return `${lead} estimates for the below mentioned works of R & B Sub Division, Dahod.`;
  }
  function autoIntro(){
    const n = L.picks.length, tot = totalAmt();
    const rw = rateWord();
    if (n === 1) {
      const w = L.picks[0];
      return `With reference to the above, the estimate for the work "${w.name}" amounting to Rs. ${money(w.amount)}/- ` +
             `(Rupees ${rsWords(w.amount)} Only) has been prepared as per the ${rw} and is submitted herewith ` +
             `for your kind perusal.`;
    }
    return `With reference to the above, the estimates for the below mentioned ${n} works, amounting to Rs. ${money(tot)}/- ` +
           `(Rupees ${rsWords(tot)} Only) in total, have been prepared as per the ${rw} and are submitted herewith ` +
           `for your kind perusal. The details are as under :-`;
  }
  function autoClosing(){
    const many = L.picks.length > 1;
    if (L.type === 'ts') {
      return `You are, therefore, requested to kindly peruse the above estimate${many ? 's' : ''} and accord ` +
             `Technical Sanction to the same at the earliest.`;
    }
    return `You are, therefore, requested to kindly peruse the above estimate${many ? 's' : ''} and accord ` +
           `Technical Sanction as well as Administrative Approval along with the necessary grant at the earliest, ` +
           `so that further action for execution of the work${many ? 's' : ''} may be taken in time.`;
  }
  const subjectText = () => (L.autoSub || !L.subject) ? autoSubject() : L.subject;
  const introText   = () => (L.autoBody || !L.intro)   ? autoIntro()   : L.intro;
  const closingText = () => (L.autoBody || !L.closing) ? autoClosing() : L.closing;
  const totalAmt    = () => L.picks.reduce((a, p) => a + (Number(p.amount) || 0), 0);

  function signLines(){
    const p = window.userProfile;
    if (p && p.post && p.sub) return [p.post, p.sub + ',', 'Dahod.'];
    return ['Deputy Executive Engineer', 'R & B Sub Division,', 'Dahod.'];
  }
  function toLines(){
    const div = (office && office.div) ? office.div : 'Dahod ( R&B ) Division, Dahod';
    return ['The Executive Engineer,', div.replace(/,\s*Dahod\s*$/i, ',').trim(), 'Dahod.'];
  }

  function model(){
    return {
      year: YEAR,
      no: L.no, date: L.date,
      to: toLines(),
      subject: subjectText(),
      ref: L.ref,
      intro: introText(),
      closing: closingText(),
      encl: L.encl,
      works: L.picks.map(p => ({ name: p.name, amountText: money(p.amount) })),
      totalText: money(totalAmt()),
      sign: signLines(),
      copyTo: []
    };
  }

  /* ---------- UI render ---------- */
  function renderLetter(){
    renderPickList();
    renderLetterPreview();
  }
  window.renderLetter = renderLetter;

  function renderPickList(){
    const box = $('#ltrPicks');
    if (!box) return;
    if (!savedEstimates.length) {
      box.innerHTML = '<div class="empty">Koi saved estimate nahi. Pehle estimate save karo (Preview & Export → Save).</div>';
      return;
    }
    const q = ($('#ltrSearch') && $('#ltrSearch').value || '').toLowerCase().trim();
    const view = savedEstimates.filter(s => !q ||
      (s.name || '').toLowerCase().includes(q) || (s.workName || '').toLowerCase().includes(q));

    box.innerHTML = '<div class="scroll"><table class="tbl" style="min-width:640px"><tr>' +
      '<th style="width:8%"></th><th style="width:62%">Estimate</th><th style="width:30%">Amount ₹</th></tr>' +
      view.map(s => {
        const on = L.picks.some(p => p.id === s.id);
        return `<tr>
          <td style="text-align:center"><input type="checkbox" data-lpick="${s.id}"${on ? ' checked' : ''}></td>
          <td><b>${esc(s.name)}</b><div style="font-size:10px;color:var(--ink-2)">${esc((s.workName || '').slice(0, 90))}</div></td>
          <td class="num mono">${money(s.amount)}</td></tr>`;
      }).join('') + '</table></div>';

    box.querySelectorAll('[data-lpick]').forEach(cb => cb.onchange = () => {
      const id = cb.dataset.lpick;
      const rec = savedEstimates.find(s => s.id === id);
      if (cb.checked) {
        if (!L.picks.some(p => p.id === id) && rec) {
          L.picks.push({ id, name: rec.workName && rec.workName !== '—' ? rec.workName : rec.name, amount: rec.amount || 0 });
        }
      } else {
        L.picks = L.picks.filter(p => p.id !== id);
      }
      saveL(); renderChosen(); renderLetterPreview();
    });
    renderChosen();
  }

  function renderChosen(){
    const box = $('#ltrChosen');
    if (!box) return;
    if (!L.picks.length) { box.innerHTML = '<div class="empty">Upar se estimate select karo — letter ke table me aa jayenge.</div>'; return; }
    box.innerHTML = '<div class="scroll"><table class="tbl" style="min-width:680px"><tr>' +
      '<th style="width:6%">Sr</th><th style="width:58%">Name of Work (letter me aisa hi chhapega)</th>' +
      '<th style="width:24%">Amount ₹</th><th style="width:12%"></th></tr>' +
      L.picks.map((p, i) => `<tr>
        <td class="num mono">${i + 1}</td>
        <td><input data-lname="${i}" value="${esc(p.name)}"></td>
        <td><input class="num mono" type="number" step="1" data-lamt="${i}" value="${Number(p.amount) || 0}"></td>
        <td style="white-space:nowrap">
          <button class="btn ghost" style="padding:3px 7px" data-lup="${i}">↑</button>
          <button class="btn danger" style="padding:3px 7px" data-lrm="${i}">×</button>
        </td></tr>`).join('') +
      `<tr><td colspan="2" class="num"><b>Total</b></td><td class="num mono"><b>${money(totalAmt())}</b></td><td></td></tr>` +
      '</table></div>';

    box.querySelectorAll('[data-lname]').forEach(inp => inp.oninput = e => {
      L.picks[+e.target.dataset.lname].name = e.target.value; saveL(); renderLetterPreview();
    });
    box.querySelectorAll('[data-lamt]').forEach(inp => inp.oninput = e => {
      L.picks[+e.target.dataset.lamt].amount = Number(e.target.value) || 0; saveL(); renderLetterPreview();
    });
    box.querySelectorAll('[data-lup]').forEach(b => b.onclick = () => {
      const i = +b.dataset.lup; if (i === 0) return;
      [L.picks[i - 1], L.picks[i]] = [L.picks[i], L.picks[i - 1]];
      saveL(); renderChosen(); renderLetterPreview();
    });
    box.querySelectorAll('[data-lrm]').forEach(b => b.onclick = () => {
      L.picks.splice(+b.dataset.lrm, 1); saveL(); renderPickList(); renderLetterPreview();
    });
  }

  function renderLetterPreview(){
    const box = $('#ltrPreview');
    if (!box) return;
    const M = model();
    /* auto fields UI me bhi dikhao */
    if (L.autoSub)  { const el = $('#ltrSubject'); if (el && document.activeElement !== el) el.value = M.subject; }
    if (L.autoBody) {
      const a = $('#ltrIntro'), b = $('#ltrClosing');
      if (a && document.activeElement !== a) a.value = M.intro;
      if (b && document.activeElement !== b) b.value = M.closing;
    }

    box.innerHTML = `
      <div class="ltr-page">
        ${LETTERHEAD.map(l => `<div class="lh" style="font-size:${l.sz / 2}pt;${l.b ? 'font-weight:700' : ''}">${esc(l.t)}</div>`).join('')}
        <div class="rule-thick" style="margin:6px 0 0"></div><div class="rule-thin"></div>
        <div class="ltr-row"><b>No: ${esc(M.no || '____________')}</b><b>Date: ${esc(M.date || '____ / ____ / ' + YEAR)}</b></div>
        <p><b>To,</b><br><span style="margin-left:18px"></span>${M.to.map(l => '<b>' + esc(l) + '</b>').join('<br>')}</p>
        <p><b>Subject : ${esc(M.subject)}</b></p>
        ${M.ref ? `<p><b>Reference : ${esc(M.ref)}</b></p>` : ''}
        <p>Sir,</p>
        ${M.intro.split('\n').map(t => `<p class="just">${esc(t)}</p>`).join('')}
        ${M.works.length ? `<table class="ltr-tbl">
          <tr><th>Sr. No.</th><th>Name of Work</th><th>Estimated Amount (Rs.)</th></tr>
          ${M.works.map((w, i) => `<tr><td style="text-align:center">${i + 1}</td><td>${esc(w.name)}</td>
             <td style="text-align:right">${esc(w.amountText)}</td></tr>`).join('')}
          <tr class="tot"><td colspan="2" style="text-align:right"><b>Total</b></td>
             <td style="text-align:right"><b>${esc(M.totalText)}</b></td></tr>
        </table>` : ''}
        ${M.closing.split('\n').map(t => `<p class="just">${esc(t)}</p>`).join('')}
        ${M.encl ? `<p><b>Encl.: ${esc(M.encl)}</b></p>` : ''}
        <div class="ltr-sign">${M.sign.map(l => '<b>' + esc(l) + '</b>').join('<br>')}</div>
      </div>`;
  }

  /* ---------- exports ---------- */
  async function makeDocx(){
    if (typeof JSZip === 'undefined') { toast('JSZip load nahi hua — internet on karke ek baar refresh karo.'); return; }
    const zip = new JSZip();
    Object.keys(DOCX_PARTS).forEach(k => zip.file(k, DOCX_PARTS[k]));
    zip.file('word/document.xml', buildLetterXml(model()));
    const blob = await zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE'
    });
    download(blob, letterFileName() + '.docx');
    toast('Word letter download ho gaya.');
  }

  function letterFileName(){
    const base = L.type === 'ts' ? 'TS_Letter' : 'Perusal_Letter';
    const first = (L.picks[0] && L.picks[0].name || '').replace(/[^\w\- ]+/g, '').replace(/\s+/g, '_').slice(0, 40);
    return base + (first ? '_' + first : '') + '_' + new Date().toISOString().slice(0, 10);
  }

  function makePdf(){
    const M = model();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const W = doc.internal.pageSize.getWidth(), Mg = 54;
    let y = 46;
    doc.setFont('helvetica', 'bold');
    LETTERHEAD.forEach(l => {
      doc.setFont('helvetica', l.b ? 'bold' : 'normal');
      doc.setFontSize(l.sz / 2 + 1);
      doc.text(l.t, W / 2, y, { align: 'center' }); y += l.sz / 2 + 5;
    });
    y += 2;
    doc.setLineWidth(2); doc.line(Mg, y, W - Mg, y); y += 4;
    doc.setLineWidth(0.5); doc.line(Mg, y, W - Mg, y); y += 20;

    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('No: ' + (M.no || '____________'), Mg, y);
    doc.text('Date: ' + (M.date || '____ / ____ / ' + YEAR), W - Mg, y, { align: 'right' }); y += 22;

    doc.text('To,', Mg, y); y += 14;
    M.to.forEach(l => { doc.text(l, Mg + 14, y); y += 14; });
    y += 8;

    const wrapB = (label, text, indent) => {
      doc.setFont('helvetica', 'bold');
      const lines = doc.splitTextToSize(label + text, W - 2 * Mg - (indent || 0));
      lines.forEach(l => { doc.text(l, Mg + (indent || 0), y); y += 14; });
      y += 6;
    };
    wrapB('Subject : ', M.subject, 0);
    if (M.ref) wrapB('Reference : ', M.ref, 0);

    doc.setFont('helvetica', 'normal');
    doc.text('Sir,', Mg, y); y += 18;

    const para = txt => {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
      doc.splitTextToSize(txt, W - 2 * Mg).forEach((l, i) => {
        doc.text(l, Mg + (i === 0 ? 24 : 0), y); y += 15;
      });
      y += 8;
    };
    M.intro.split('\n').forEach(para);

    if (M.works.length) {
      doc.autoTable({
        startY: y, margin: { left: Mg, right: Mg },
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 4, lineColor: 0, lineWidth: 0.5, textColor: 0 },
        headStyles: { fillColor: [217, 217, 217], textColor: 0, fontStyle: 'bold', halign: 'center' },
        head: [['Sr. No.', 'Name of Work', 'Estimated Amount (Rs.)']],
        body: M.works.map((w, i) => [String(i + 1), w.name, w.amountText]),
        foot: [[{ content: 'Total', colSpan: 2, styles: { halign: 'right' } }, M.totalText]],
        footStyles: { fillColor: [217, 217, 217], textColor: 0, fontStyle: 'bold', halign: 'right' },
        columnStyles: { 0: { halign: 'center', cellWidth: 45 }, 2: { halign: 'right', cellWidth: 110 } }
      });
      y = doc.lastAutoTable.finalY + 16;
    }
    M.closing.split('\n').forEach(para);
    if (M.encl) { doc.setFont('helvetica', 'bold'); doc.text('Encl.: ' + M.encl, Mg, y); y += 26; }

    y += 34;
    doc.setFont('helvetica', 'bold');
    const cx = W - Mg - 110;
    M.sign.forEach(l => { doc.text(l, cx, y, { align: 'center' }); y += 14; });
    doc.save(letterFileName() + '.pdf');
  }

  /* ---------- wiring ---------- */
  function bind(){
    const on = (sel, ev, fn) => { const el = $(sel); if (el) el[ev] = fn; };

    on('#ltrSearch', 'oninput', renderPickList);
    on('#ltrNo', 'oninput', e => { L.no = e.target.value; saveL(); renderLetterPreview(); });
    on('#ltrDate', 'oninput', e => { L.date = e.target.value; saveL(); renderLetterPreview(); });
    on('#ltrRef', 'oninput', e => { L.ref = e.target.value; saveL(); renderLetterPreview(); });
    on('#ltrEncl', 'oninput', e => { L.encl = e.target.value; saveL(); renderLetterPreview(); });
    on('#ltrRate', 'onchange', e => { L.rateWord = e.target.value; saveL(); renderLetterPreview(); });

    $$('#ltrTypeChips .chip').forEach(c => c.onclick = () => {
      L.type = c.dataset.ltype; saveL();
      $$('#ltrTypeChips .chip').forEach(x => x.setAttribute('aria-pressed', x === c));
      renderLetterPreview();
    });

    on('#ltrSubject', 'oninput', e => { L.subject = e.target.value; L.autoSub = false; saveL(); renderLetterPreview(); });
    on('#ltrIntro', 'oninput', e => { L.intro = e.target.value; L.autoBody = false; saveL(); renderLetterPreview(); });
    on('#ltrClosing', 'oninput', e => { L.closing = e.target.value; L.autoBody = false; saveL(); renderLetterPreview(); });
    on('#ltrAutoSub', 'onclick', () => { L.autoSub = true; L.subject = ''; saveL(); renderLetterPreview(); toast('Subject auto ho gaya.'); });
    on('#ltrAutoBody', 'onclick', () => { L.autoBody = true; L.intro = ''; L.closing = ''; saveL(); renderLetterPreview(); toast('Body text auto ho gaya.'); });

    on('#btnLtrDocx', 'onclick', makeDocx);
    on('#btnLtrPdf', 'onclick', makePdf);
    on('#btnLtrPrint', 'onclick', () => window.print());
    on('#btnLtrClear', 'onclick', () => {
      if (!confirm('Letter form khaali karna hai?')) return;
      L = Object.assign({}, DEF); saveL();
      ['#ltrNo', '#ltrDate', '#ltrRef', '#ltrSubject', '#ltrIntro', '#ltrClosing'].forEach(s => { const e = $(s); if (e) e.value = ''; });
      const en = $('#ltrEncl'); if (en) en.value = L.encl;
      renderLetter();
    });

    /* restore saved values */
    const setv = (sel, v) => { const e = $(sel); if (e && v != null) e.value = v; };
    setv('#ltrNo', L.no); setv('#ltrDate', L.date); setv('#ltrRef', L.ref); setv('#ltrEncl', L.encl);
    setv('#ltrRate', L.rateWord);
    $$('#ltrTypeChips .chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.ltype === L.type));

    /* tab switching — app.js apne 4 tabs handle karta hai, Letter hum */
    $$('nav.tabs button').forEach(b => b.addEventListener('click', () => {
      const sec = $('#tab-ltr'); if (!sec) return;
      sec.hidden = (b.dataset.tab !== 'ltr');
      if (b.dataset.tab === 'ltr') renderLetter();
    }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
