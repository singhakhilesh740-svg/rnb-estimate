/* ============================================================================
   R&B Estimate Builder — RATE ANALYSIS LIBRARY  (district-wise, editable)
   ----------------------------------------------------------------------------
   Source seed: Principle Judge Family Court E-2 Type (Dahod) + SOR 2024-25.
   These are DEFAULTS only. User edits live in localStorage via ra-engine.js
   (key: rnb_ra_<District>) and always win over these defaults.

   RA object shape
     id        unique key ('lib_<n>' for seeded, 'ra_<ts>' for user-created)
     itemNo    the estimate item number this RA backs (free text, optional)
     desc      item description
     unit      unit of the finished item (Cum / Sqm / Rmt / No …)
     basis     human note, e.g. "Per 3.35 Cum footing"
     basisQty  the divisor — total cost / basisQty = rate per unit
     cp        contractor's profit %, applied only to components with cpApply
     floors    true if the item cascades GF → FF → SF … using liftExtra
     liftExtra { sorCode, page, rate } — per-floor lift add-on, per unit
     pdfRate   the Say rate printed in the source estimate (reference only)
     components[]
       sr      serial label shown in the print-out (A1, B2 …)
       kind    'SOR' | 'MR' | 'Quotation' | 'Manual'
       code    SOR item code (kind SOR only)
       page    SOR page number (kind SOR only)
       label   description of the component
       unit    component unit
       qty     quantity consumed for basisQty of the finished item
       rate    component rate
       cpApply whether contractor's profit applies to this component

   Formula
     subtotal = Σ (qty × rate)
     cpBase   = Σ (qty × rate) where cpApply
     total    = subtotal + cpBase × cp / 100
     rate     = total / basisQty
   ========================================================================== */

const DISTRICT_RA_LIBRARY = {
  'Dahod': {
    district: 'Dahod',
    rateAnalysis: [
        {
            "id": "lib_1",
            "libNo": "1",
            "itemNo": "8",
            "desc": "CC M-250 for Foundations, footings, Mass concrete (footing)",
            "unit": "Cum",
            "basis": "Per 3.35 Cum footing",
            "basisQty": 3.35,
            "cp": 0,
            "pdfRate": 4556,
            "floors": false,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001AA",
                    "page": "59",
                    "label": "Form work: columns/pillars/posts/struts upto floor two level",
                    "unit": "Sqm",
                    "qty": 6.3,
                    "rate": 186.24,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05025AA",
                    "page": "42",
                    "label": "RMC M-250 for foundations/footings/mass concrete",
                    "unit": "Cum",
                    "qty": 3.35,
                    "rate": 4205.16,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_2",
            "libNo": "2",
            "itemNo": "9",
            "desc": "CC M-250 for columns up to Plinth level",
            "unit": "Cum",
            "basis": "Per 0.71 Cum column",
            "basisQty": 0.71,
            "cp": 0,
            "pdfRate": 7605,
            "floors": false,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "60",
                    "label": "Form work: columns upto floor two level",
                    "unit": "Sqm",
                    "qty": 6.62,
                    "rate": 323.29,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05025DA",
                    "page": "42",
                    "label": "CC M-250 excluding formwork for columns",
                    "unit": "Cum",
                    "qty": 0.71,
                    "rate": 4590.29,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_3",
            "libNo": "3",
            "itemNo": "11",
            "desc": "CC M-200 for Columns, pillars, posts & struts",
            "unit": "Cum",
            "basis": "Per 1.01 Cum column",
            "basisQty": 1.01,
            "cp": 0,
            "pdfRate": 7571,
            "floors": true,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001G1",
                    "page": "60",
                    "label": "Form work: columns upto floor two level",
                    "unit": "Sqm",
                    "qty": 9.45,
                    "rate": 323.39,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05024DA",
                    "page": "42",
                    "label": "CC M-200 excluding formwork for columns",
                    "unit": "Cum",
                    "qty": 1.01,
                    "rate": 4544.94,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_4",
            "libNo": "4",
            "itemNo": "13",
            "desc": "CC M-250 for Ground & Plinth Beams",
            "unit": "Cum",
            "basis": "Per 1.13 Cum beam",
            "basisQty": 1.13,
            "cp": 0,
            "pdfRate": 5964,
            "floors": false,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001H1",
                    "page": "60",
                    "label": "Form work: sides & soffits of beams/haunching/cantilever",
                    "unit": "Sqm",
                    "qty": 7.95,
                    "rate": 209.95,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05025C",
                    "page": "42",
                    "label": "CC M-250 excluding formwork for beams",
                    "unit": "Cum",
                    "qty": 1.13,
                    "rate": 4485.93,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_5",
            "libNo": "5",
            "itemNo": "14",
            "desc": "CC M-150 for Plinth Slab",
            "unit": "Cum",
            "basis": "Per 0.10 Cum slab",
            "basisQty": 0.1,
            "cp": 0,
            "pdfRate": 4907,
            "floors": false,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001B1",
                    "page": "60",
                    "label": "Form work: flat surfaces soffits of slabs/landings",
                    "unit": "Sqm",
                    "qty": 0.4,
                    "rate": 270.9,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "5023CA",
                    "page": "41",
                    "label": "CC M-150 excluding formwork slabs/landings/lintels/beams",
                    "unit": "Cum",
                    "qty": 0.1,
                    "rate": 3823.14,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_6",
            "libNo": "6",
            "itemNo": "15",
            "desc": "CC M-200 for Ground Floor Beams",
            "unit": "Cum",
            "basis": "Per 0.72 Cum beam",
            "basisQty": 0.72,
            "cp": 0,
            "pdfRate": 6191,
            "floors": true,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "61",
                    "label": "Form work: sides & soffits of beams/hanchings",
                    "unit": "Sqm",
                    "qty": 6.0,
                    "rate": 209.95,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05024C",
                    "page": "41",
                    "label": "CC M-200 excluding formwork slabs/beams/lintels",
                    "unit": "Cum",
                    "qty": 0.72,
                    "rate": 4440.58,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_7",
            "libNo": "7",
            "itemNo": "17",
            "desc": "CC M-200 for Ground Floor Slab",
            "unit": "Cum",
            "basis": "Per 1.35 Cum slab",
            "basisQty": 1.35,
            "cp": 0,
            "pdfRate": 6608,
            "floors": true,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001B1A",
                    "page": "60",
                    "label": "Form work: flat surfaces soffits of slabs/landings",
                    "unit": "Sqm",
                    "qty": 10.8,
                    "rate": 270.9,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "5024CA",
                    "page": "42",
                    "label": "CC M-200 excluding formwork slabs/beams/lintels",
                    "unit": "Cum",
                    "qty": 1.35,
                    "rate": 4440.58,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_8",
            "libNo": "8",
            "itemNo": "19",
            "desc": "CC M-200 for Chhajja (weather shades)",
            "unit": "Cum",
            "basis": "Per 0.09 Cum chhajja",
            "basisQty": 0.09,
            "cp": 0,
            "pdfRate": 6714,
            "floors": true,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001LA",
                    "page": "62",
                    "label": "Form work: chullah hoods/weather shades/chhajjas/corbels",
                    "unit": "Sqm",
                    "qty": 1.19,
                    "rate": 171.87,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05024C",
                    "page": "41",
                    "label": "CC M-200 excluding formwork slabs/beams/lintels",
                    "unit": "Cum",
                    "qty": 0.09,
                    "rate": 4440.58,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_9",
            "libNo": "9",
            "itemNo": "21",
            "desc": "CC M-200 for Lintel",
            "unit": "Cum",
            "basis": "Per 0.0414 Cum lintel",
            "basisQty": 0.0414,
            "cp": 0,
            "pdfRate": 8707,
            "floors": true,
            "components": [
                {
                    "sr": "A1",
                    "kind": "SOR",
                    "code": "09001H2",
                    "page": "61",
                    "label": "Form work: sides & soffits of Beams/Lintels exceeding 1M depth",
                    "unit": "Sqm",
                    "qty": 0.636,
                    "rate": 277.67,
                    "cpApply": false
                },
                {
                    "sr": "A2",
                    "kind": "SOR",
                    "code": "05024C",
                    "page": "42",
                    "label": "CC M-200 excluding formwork slabs/beams/lintels",
                    "unit": "Cum",
                    "qty": 0.0414,
                    "rate": 4440.58,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_10",
            "libNo": "10",
            "itemNo": "23",
            "desc": "CC M-200 for Stair case (GF→FF)",
            "unit": "Cum",
            "basis": "Per 1.63 Cum stair",
            "basisQty": 1.63,
            "cp": 0,
            "pdfRate": 6341,
            "floors": true,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024EA",
                    "page": "42",
                    "label": "CC M-200 for stair (excl formwork/reinforcement)",
                    "unit": "Cum",
                    "qty": 1.63,
                    "rate": 4699.2,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001M",
                    "page": "67",
                    "label": "Form work (ord timber) for stair",
                    "unit": "Sqm",
                    "qty": 10.13,
                    "rate": 264.13,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_10A",
            "libNo": "10A",
            "itemNo": "",
            "desc": "CC M-200 for RCC Parapet Wall",
            "unit": "Cum",
            "basis": "Per 1.44 Cum parapet",
            "basisQty": 1.44,
            "cp": 0,
            "pdfRate": 6876,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024B",
                    "page": "42",
                    "label": "CC M-200 for walls from foundation top upto floor two level",
                    "unit": "Cum",
                    "qty": 1.44,
                    "rate": 4466.94,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001QA",
                    "page": "67",
                    "label": "Form work (ord timber) for walls",
                    "unit": "Sqm",
                    "qty": 13.65,
                    "rate": 254.1,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_11",
            "libNo": "11",
            "itemNo": "",
            "desc": "90 cm high SS 304 railing (50mm handrail, 38mm balusters)",
            "unit": "Rmt",
            "basis": "Per 3.50 Rmt",
            "basisQty": 3.5,
            "cp": 15,
            "pdfRate": 3683,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "M714",
                    "page": "24",
                    "label": "50mm dia SS pipe (handrail)",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 1004.24,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "38mm dia SS pipe (baluster support)",
                    "unit": "Rmt",
                    "qty": 3.6,
                    "rate": 580.0,
                    "cpApply": true
                },
                {
                    "sr": "C",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "25mm horizontal SS pipe",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 180.0,
                    "cpApply": true
                },
                {
                    "sr": "D",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "18.75mm SS support pipe",
                    "unit": "Rmt",
                    "qty": 10.5,
                    "rate": 250.0,
                    "cpApply": true
                },
                {
                    "sr": "E",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Round SS ball at top",
                    "unit": "No",
                    "qty": 2.0,
                    "rate": 300.0,
                    "cpApply": true
                },
                {
                    "sr": "F",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge — prep & fixing",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 500.0,
                    "cpApply": true
                }
            ],
            "topic": "SS railing"
        },
        {
            "id": "lib_12",
            "libNo": "12",
            "itemNo": "25",
            "desc": "TMT Bar 500D reinforcement (avg for all floors)",
            "unit": "Kg",
            "basis": "Weighted avg across GF & FF quantities",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 77,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "05014C",
                    "page": "39",
                    "label": "For G.F. — SOR I.No.05014C",
                    "unit": "Kg",
                    "qty": 35315.0,
                    "rate": 76.65,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "05014C+05016A",
                    "page": "39",
                    "label": "For F.F. — 05014C + one 05016A extra",
                    "unit": "Kg",
                    "qty": 7235.0,
                    "rate": 76.65,
                    "cpApply": false
                }
            ],
            "topic": "RCC"
        },
        {
            "id": "lib_13",
            "libNo": "13",
            "itemNo": "31",
            "desc": "20mm double coat mala cement plaster (interior)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 336.6,
            "floors": true,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17017",
                    "page": "105",
                    "label": "20mm double coat mala cement plaster",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 287.83,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "17004",
                    "page": "103",
                    "label": "Floating coat",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 48.77,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "17007A",
                "page": "104",
                "rate": 24.22
            },
            "topic": "Plaster"
        },
        {
            "id": "lib_14",
            "libNo": "14",
            "itemNo": "33",
            "desc": "10mm smooth cement plaster on ceiling (CM 1:4)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 211.82,
            "floors": true,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17001B",
                    "page": "102",
                    "label": "10mm plastering",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 134.1,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "17006",
                    "page": "104",
                    "label": "Extra for ceiling",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 26.41,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "17004",
                    "page": "103",
                    "label": "Floating coat",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 51.31,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "17007A",
                "page": "104",
                "rate": 24.22
            },
            "topic": "Plaster"
        },
        {
            "id": "lib_15",
            "libNo": "15",
            "itemNo": "",
            "desc": "Cinder filling in sunks in 15cm layers (all floors)",
            "unit": "Cum",
            "basis": "Per 10 Cum",
            "basisQty": 10.0,
            "cp": 15,
            "pdfRate": 484,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Supply of cinder",
                    "unit": "Cum",
                    "qty": 10.0,
                    "rate": 225.0,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "3.2.10",
                    "page": "-",
                    "label": "Extra lead 10 km",
                    "unit": "Cum",
                    "qty": 10.0,
                    "rate": 119.35,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Male mazdoor",
                    "unit": "No",
                    "qty": 1.5,
                    "rate": 505.0,
                    "cpApply": true
                }
            ],
            "topic": "Filling"
        },
        {
            "id": "lib_16",
            "libNo": "16",
            "itemNo": "42",
            "desc": "CC M-200 for RCC Coping",
            "unit": "Cum",
            "basis": "Per 1 Cum coping (size 0.30×0.15)",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 5325,
            "floors": true,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "5024AA",
                    "page": "42",
                    "label": "CC M-200 for coping",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 3920.39,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "9001H1A",
                    "page": "61",
                    "label": "Form work for coping",
                    "unit": "Sqm",
                    "qty": 6.69,
                    "rate": 209.95,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "topic": "RCC"
        },
        {
            "id": "lib_17",
            "libNo": "17",
            "itemNo": "",
            "desc": "Jindal E(30mm) Four track aluminium window",
            "unit": "Sqm",
            "basis": "Per 2.16 Sqm window (1.8×1.2)",
            "basisQty": 2.16,
            "cp": 15,
            "pdfRate": 4265,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M686+M687",
                    "page": "23",
                    "label": "Aluminium sections (Jindal E-30mm) — 4-track: 21198+21204+20993+20553+20550",
                    "unit": "Kg",
                    "qty": 26.08,
                    "rate": 199.15,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M552",
                    "page": "20",
                    "label": "5mm thick plain float glass",
                    "unit": "Sqm",
                    "qty": 2.27,
                    "rate": 211.86,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "22",
                    "label": "Rubber gasket",
                    "unit": "Sqm",
                    "qty": 13.86,
                    "rate": 7.63,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 500.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "L007",
                    "page": "4",
                    "label": "Labour for fixing glass in frame & window in wall",
                    "unit": "Sqm",
                    "qty": 2.16,
                    "rate": 801.0,
                    "cpApply": true
                }
            ],
            "topic": "Windows"
        },
        {
            "id": "lib_18",
            "libNo": "18",
            "itemNo": "",
            "desc": "Jindal E(30mm) Three track aluminium window",
            "unit": "Sqm",
            "basis": "Per 1.62 Sqm window (1.35×1.2)",
            "basisQty": 1.62,
            "cp": 15,
            "pdfRate": 4041.2,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M686+M687",
                    "page": "23",
                    "label": "Aluminium sections — 3-track: 21203+20837+20993+20553+20550",
                    "unit": "Kg",
                    "qty": 17.63,
                    "rate": 199.15,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M552",
                    "page": "20",
                    "label": "5mm thick plain float glass",
                    "unit": "Sqm",
                    "qty": 1.7,
                    "rate": 211.86,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "22",
                    "label": "Rubber gasket",
                    "unit": "Sqm",
                    "qty": 9.69,
                    "rate": 7.63,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 450.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "L007",
                    "page": "4",
                    "label": "Labour for fixing glass & window in wall",
                    "unit": "Sqm",
                    "qty": 1.62,
                    "rate": 801.0,
                    "cpApply": true
                }
            ],
            "topic": "Windows"
        },
        {
            "id": "lib_19",
            "libNo": "19",
            "itemNo": "",
            "desc": "Jindal E(30mm) Two track aluminium window",
            "unit": "Sqm",
            "basis": "Per 1.32 Sqm window (1.2×1.1)",
            "basisQty": 1.32,
            "cp": 15,
            "pdfRate": 3515.5,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M686+M687",
                    "page": "23",
                    "label": "Aluminium sections — 2-track: 21217+20835+20993+20553+20550",
                    "unit": "Kg",
                    "qty": 11.24,
                    "rate": 199.15,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M552",
                    "page": "20",
                    "label": "5mm thick plain float glass",
                    "unit": "Sqm",
                    "qty": 1.39,
                    "rate": 211.86,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "22",
                    "label": "Rubber gasket",
                    "unit": "Sqm",
                    "qty": 5.88,
                    "rate": 7.63,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 400.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "L007",
                    "page": "4",
                    "label": "Labour for fixing glass & window in wall",
                    "unit": "Sqm",
                    "qty": 1.32,
                    "rate": 801.0,
                    "cpApply": true
                }
            ],
            "topic": "Windows"
        },
        {
            "id": "lib_20",
            "libNo": "20",
            "itemNo": "",
            "desc": "Aluminium Ventilator with louvre (Jindal 4605)",
            "unit": "Sqm",
            "basis": "Per 1.35 Sqm ventilator (1.8×0.75)",
            "basisQty": 1.35,
            "cp": 15,
            "pdfRate": 2706,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M904",
                    "page": "28",
                    "label": "Aluminium sections — outer frame + louvre channels",
                    "unit": "Kg",
                    "qty": 8.26,
                    "rate": 199.15,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M550",
                    "page": "19",
                    "label": "3mm thick glass for louvre glazing",
                    "unit": "Sqm",
                    "qty": 1.26,
                    "rate": 144.07,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for fixing glass in frame & window in wall",
                    "unit": "Sqm",
                    "qty": 1.35,
                    "rate": 1000.0,
                    "cpApply": true
                }
            ],
            "topic": "Windows"
        },
        {
            "id": "lib_21",
            "libNo": "21",
            "itemNo": "",
            "desc": "50mm specially designed wooden main door (hollow flush, teak frame, laminated)",
            "unit": "Sqm",
            "basis": "Per 5.76 Sqm door (2.4×2.4)",
            "basisQty": 5.76,
            "cp": 15,
            "pdfRate": 5230,
            "floors": false,
            "components": [
                {
                    "sr": "1a",
                    "kind": "SOR",
                    "code": "10001A",
                    "page": "63",
                    "label": "Teakwood door frame",
                    "unit": "Cum",
                    "qty": 0.073,
                    "rate": 60419.0,
                    "cpApply": true
                },
                {
                    "sr": "1b",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Teakwood batten 12×50mm",
                    "unit": "Rmt",
                    "qty": 15.12,
                    "rate": 25.0,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M782",
                    "page": "25",
                    "label": "6mm ply (waterproof, both sides)",
                    "unit": "Sqm",
                    "qty": 11.52,
                    "rate": 288.14,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M788",
                    "page": "25",
                    "label": "1mm thick lamination (both sides)",
                    "unit": "Sqm",
                    "qty": 11.52,
                    "rate": 296.81,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M201",
                    "page": "11",
                    "label": "Fevicol",
                    "unit": "Kg",
                    "qty": 4.0,
                    "rate": 152.24,
                    "cpApply": true
                },
                {
                    "sr": "5a",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Screw, Khili etc",
                    "unit": "LS",
                    "qty": 2,
                    "rate": 200.0,
                    "cpApply": true
                },
                {
                    "sr": "5b",
                    "kind": "SOR",
                    "code": "M704",
                    "page": "23",
                    "label": "Floor spring",
                    "unit": "No",
                    "qty": 2,
                    "rate": 1800.85,
                    "cpApply": true
                },
                {
                    "sr": "5c",
                    "kind": "SOR",
                    "code": "M710",
                    "page": "23",
                    "label": "SS Aldrop 30cm ASIS 304",
                    "unit": "No",
                    "qty": 2,
                    "rate": 396.61,
                    "cpApply": true
                },
                {
                    "sr": "5d",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "SS Pipe Handle 60cm ASIS 316",
                    "unit": "No",
                    "qty": 4,
                    "rate": 1150.0,
                    "cpApply": false
                },
                {
                    "sr": "5e",
                    "kind": "SOR",
                    "code": "M706",
                    "page": "15",
                    "label": "SS Stopper 30cm ASIS 304",
                    "unit": "No",
                    "qty": 2,
                    "rate": 180.51,
                    "cpApply": true
                },
                {
                    "sr": "5f",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Godrej locking system",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1850.0,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for preparing door",
                    "unit": "Sqm",
                    "qty": 5.76,
                    "rate": 500.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "19009B+19011",
                    "page": "110",
                    "label": "Primer + two coats enamel on teakwood frame & edges",
                    "unit": "Sqm",
                    "qty": 1.07,
                    "rate": 137.15,
                    "cpApply": true
                }
            ],
            "topic": "Doors"
        },
        {
            "id": "lib_22",
            "libNo": "22",
            "itemNo": "50",
            "desc": "35mm Flush Door single shutter (factory made, IS 12623 grade one)",
            "unit": "Sqm",
            "basis": "Per 2.10 Sqm door (1.0×2.1)",
            "basisQty": 2.1,
            "cp": 15,
            "pdfRate": 4901,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10001A",
                    "page": "63",
                    "label": "Teakwood batten around door",
                    "unit": "Cum",
                    "qty": 0.003,
                    "rate": 60419.0,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "10011",
                    "page": "91",
                    "label": "35mm flush shutter",
                    "unit": "Sqm",
                    "qty": 2.1,
                    "rate": 1811.62,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M788",
                    "page": "25",
                    "label": "1mm lamination (both sides)",
                    "unit": "Sqm",
                    "qty": 4.2,
                    "rate": 296.61,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M201",
                    "page": "11",
                    "label": "Favicol",
                    "unit": "Kg",
                    "qty": 2.0,
                    "rate": 152.54,
                    "cpApply": true
                },
                {
                    "sr": "5a",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Screw, Khili etc",
                    "unit": "LS",
                    "qty": 2,
                    "rate": 200.0,
                    "cpApply": true
                },
                {
                    "sr": "5b",
                    "kind": "SOR",
                    "code": "M735",
                    "page": "16",
                    "label": "SS Hinges",
                    "unit": "No",
                    "qty": 3,
                    "rate": 64.0,
                    "cpApply": true
                },
                {
                    "sr": "5c",
                    "kind": "SOR",
                    "code": "M709",
                    "page": "23",
                    "label": "SS Aldrop 20cm ASIS 304",
                    "unit": "No",
                    "qty": 1,
                    "rate": 324.58,
                    "cpApply": true
                },
                {
                    "sr": "5d",
                    "kind": "SOR",
                    "code": "M712",
                    "page": "24",
                    "label": "SS Handle 15cm ASIS 304",
                    "unit": "No",
                    "qty": 2,
                    "rate": 75.42,
                    "cpApply": true
                },
                {
                    "sr": "5e",
                    "kind": "SOR",
                    "code": "M707",
                    "page": "23",
                    "label": "SS Stopper 20cm ASIS 304",
                    "unit": "No",
                    "qty": 1,
                    "rate": 126.27,
                    "cpApply": true
                },
                {
                    "sr": "5f",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Godrej locking system",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1500.0,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for preparing door",
                    "unit": "Sqm",
                    "qty": 2.1,
                    "rate": 500.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Polish work",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 200.0,
                    "cpApply": true
                },
                {
                    "sr": "8",
                    "kind": "SOR",
                    "code": "M048",
                    "page": "6",
                    "label": "Deduction — Aluminium butt hinges (deduct)",
                    "unit": "No",
                    "qty": -2,
                    "rate": 20.25,
                    "cpApply": true
                }
            ],
            "topic": "Doors"
        },
        {
            "id": "lib_23",
            "libNo": "23",
            "itemNo": "73",
            "desc": "FRP frame 100×50 & 35mm depress panel FRP door (D5)",
            "unit": "Sqm",
            "basis": "Substitution (A−B)",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 2789,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10038",
                    "page": "60",
                    "label": "FRP frame 125×65mm & 35mm depress panel (base SOR)",
                    "unit": "Sqm",
                    "qty": 1,
                    "rate": 2589.15,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add: FRP frame 100×50",
                    "unit": "Sqm",
                    "qty": 1,
                    "rate": 1050.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Deduct: FRP frame 125×65",
                    "unit": "Sqm",
                    "qty": -1,
                    "rate": 850.0,
                    "cpApply": false
                }
            ],
            "topic": "Doors"
        },
        {
            "id": "lib_24",
            "libNo": "24",
            "itemNo": "",
            "desc": "GVT vitrified 600×600 tile flooring (substitution)",
            "unit": "Sqm",
            "basis": "Substitution over base SOR flooring",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 1638,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14022A",
                    "page": "130",
                    "label": "P&L 24\"×24\" vitrified 8mm thick (base SOR)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1401.75,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M691",
                    "page": "36",
                    "label": "Deduct: vitrified granite tile 8-10mm",
                    "unit": "Sqm",
                    "qty": -1.15,
                    "rate": 310.17,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Add: GVT vitrified 60×60",
                    "unit": "Sqm",
                    "qty": 1.15,
                    "rate": 515.2,
                    "cpApply": false
                }
            ],
            "topic": "Flooring"
        },
        {
            "id": "lib_25",
            "libNo": "25",
            "itemNo": "",
            "desc": "GVT vitrified 600×600 tile Skirting/Dedo",
            "unit": "Sqm",
            "basis": "Substitution over base SOR dedo",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 1346,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14008CA",
                    "page": "95",
                    "label": "P&L 24\"×24\" vitrified 8mm skirting (base SOR)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1109.27,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M691",
                    "page": "23",
                    "label": "Deduct: vitrified granite tile 8-10mm",
                    "unit": "Sqm",
                    "qty": -1.15,
                    "rate": 310.17,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Add: GVT vitrified 60×60",
                    "unit": "Sqm",
                    "qty": 1.15,
                    "rate": 515.2,
                    "cpApply": false
                }
            ],
            "topic": "Flooring"
        },
        {
            "id": "lib_26",
            "libNo": "26",
            "itemNo": "",
            "desc": "Matt Finished Glazed 300×300 tile flooring + 3mm groove epoxy",
            "unit": "Sqm",
            "basis": "Substitution + epoxy add-on",
            "basisQty": 1,
            "cp": 15,
            "pdfRate": 1413,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14008CA",
                    "page": "95",
                    "label": "Base SOR flooring 24\"×24\" 8mm",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1109.27,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M691",
                    "page": "23",
                    "label": "Deduct: vitrified granite tile 8-10mm",
                    "unit": "Sqm",
                    "qty": -1.15,
                    "rate": 310.17,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Add: matt glazed 300×300",
                    "unit": "Sqm",
                    "qty": 1.15,
                    "rate": 484.2,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "3mm groove epoxy grouting",
                    "unit": "Rmt",
                    "qty": 6.0,
                    "rate": 15.0,
                    "cpApply": true
                }
            ],
            "topic": "Flooring"
        },
        {
            "id": "lib_27",
            "libNo": "27",
            "itemNo": "",
            "desc": "Matt Finished Glazed 300×900 dedo + 3mm groove epoxy",
            "unit": "Sqm",
            "basis": "Substitution + epoxy add-on",
            "basisQty": 1,
            "cp": 15,
            "pdfRate": 1582,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14008CA",
                    "page": "95",
                    "label": "Base SOR dedo 24\"×24\" 8mm",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1109.27,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M691",
                    "page": "23",
                    "label": "Deduct: vitrified granite tile 8-10mm",
                    "unit": "Sqm",
                    "qty": -1.15,
                    "rate": 310.17,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Add: matt glazed 300×900",
                    "unit": "Sqm",
                    "qty": 1.15,
                    "rate": 645.6,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "3mm groove epoxy grouting",
                    "unit": "Rmt",
                    "qty": 5.0,
                    "rate": 15.0,
                    "cpApply": true
                }
            ],
            "topic": "Flooring"
        },
        {
            "id": "lib_28",
            "libNo": "28",
            "itemNo": "86",
            "desc": "Machine cut Granite 18mm treads/risers with nosing moulding",
            "unit": "Sqm",
            "basis": "Per 0.71 Sqm step (0.68 net + wastage)",
            "basisQty": 0.71,
            "cp": 15,
            "pdfRate": 2629,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "P&L Granite 18mm thick",
                    "unit": "Sqm",
                    "qty": 0.71,
                    "rate": 1347.46,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "2011A",
                    "page": "32",
                    "label": "12mm CM 1:3 bases",
                    "unit": "Cum",
                    "qty": 0.09,
                    "rate": 3533.05,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "23",
                    "label": "Round moulding on exposed edge",
                    "unit": "Rmt",
                    "qty": 1.5,
                    "rate": 85.0,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — fixing granite + 3 grooves",
                    "unit": "Rmt",
                    "qty": 0.71,
                    "rate": 322.8,
                    "cpApply": true
                }
            ],
            "topic": "Stone work"
        },
        {
            "id": "lib_29",
            "libNo": "29",
            "itemNo": "62",
            "desc": "18mm Granite cladding on sills/around openings",
            "unit": "Sqm",
            "basis": "Per 2.52 Sqm",
            "basisQty": 2.52,
            "cp": 15,
            "pdfRate": 2609,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm thick Granite",
                    "unit": "Sqm",
                    "qty": 2.65,
                    "rate": 1347.46,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "2007A",
                    "page": "85",
                    "label": "10mm thick CM 1:3",
                    "unit": "Cum",
                    "qty": 0.03,
                    "rate": 3508.27,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — fixing with slurry+adhesive",
                    "unit": "Sqm",
                    "qty": 2.52,
                    "rate": 376.6,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 8.4,
                    "rate": 85.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Mirror polishing",
                    "unit": "Sqm",
                    "qty": 2.65,
                    "rate": 150.0,
                    "cpApply": true
                }
            ],
            "topic": "Stone work"
        },
        {
            "id": "lib_30",
            "libNo": "30",
            "itemNo": "63",
            "desc": "MS Safety Grill for windows/doors (assume 20 kg/Sqm)",
            "unit": "Kg",
            "basis": "Per 20 Kg = 1 Sqm",
            "basisQty": 20.0,
            "cp": 0,
            "pdfRate": 114,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10025AA",
                    "page": "67",
                    "label": "Cost of grill fabrication",
                    "unit": "Kg",
                    "qty": 20.0,
                    "rate": 109.22,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "110",
                    "label": "Priming coat",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 35.56,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19005",
                    "page": "110",
                    "label": "Oil painting two coats",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 69.47,
                    "cpApply": false
                }
            ],
            "topic": "Steel work"
        },
        {
            "id": "lib_31",
            "libNo": "31",
            "itemNo": "72",
            "desc": "UPVC SWR Type B 75mm pipe (from 110mm base SOR)",
            "unit": "Rmt",
            "basis": "Substitution — 110mm base + swap to 75mm",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 752,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "23067",
                    "page": "139",
                    "label": "110mm UPVC SWR Type B (base)",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 888.9,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M805",
                    "page": "25",
                    "label": "Deduct: UPVC SWR 110mm dia",
                    "unit": "Rmt",
                    "qty": -1.15,
                    "rate": 262.71,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M803",
                    "page": "25",
                    "label": "Add: UPVC SWR 75mm dia",
                    "unit": "Rmt",
                    "qty": 1.15,
                    "rate": 143.22,
                    "cpApply": false
                }
            ],
            "topic": "Drainage"
        },
        {
            "id": "lib_32",
            "libNo": "32",
            "itemNo": "73",
            "desc": "PVC SWR Cowl went 75mm dia",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 15.5,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M835",
                    "page": "26",
                    "label": "PVC SWR Vent Cowl 75mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 9.32,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for cowl",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 4.0,
                    "cpApply": true
                }
            ],
            "topic": "Drainage"
        },
        {
            "id": "lib_33",
            "libNo": "33",
            "itemNo": "74",
            "desc": "PVC SWR Cowl went 110mm dia",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 28.5,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M836",
                    "page": "26",
                    "label": "PVC SWR Vent Cowl 110mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 19.49,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for cowl",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 5.0,
                    "cpApply": true
                }
            ],
            "topic": "Drainage"
        },
        {
            "id": "lib_34",
            "libNo": "34",
            "itemNo": "",
            "desc": "European WC pan with flush tank + jet spray + seat cover",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 3024.48,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "23010",
                    "page": "-",
                    "label": "European WC pan Vitreous china",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1343.38,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "23017",
                    "page": "-",
                    "label": "Plastic seat cover with hinge & rubber",
                    "unit": "No",
                    "qty": 1,
                    "rate": 288.45,
                    "cpApply": false
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "M738",
                    "page": "-",
                    "label": "Jet spray Heavy Duty SS 304 60cm long",
                    "unit": "No",
                    "qty": 1,
                    "rate": 305.93,
                    "cpApply": true
                },
                {
                    "sr": "D",
                    "kind": "SOR",
                    "code": "23032B",
                    "page": "-",
                    "label": "CP Brass half turn flush cock 25mm",
                    "unit": "No",
                    "qty": 1,
                    "rate": 261.16,
                    "cpApply": false
                },
                {
                    "sr": "E",
                    "kind": "SOR",
                    "code": "M216",
                    "page": "-",
                    "label": "Flush tank",
                    "unit": "No",
                    "qty": 1,
                    "rate": 677.97,
                    "cpApply": true
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_35",
            "libNo": "35",
            "itemNo": "50",
            "desc": "Orissa Type WC pan 580mm with P/S trap + flush valve",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 1933,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "M626",
                    "page": "22",
                    "label": "WC Squatting Orissa Type pan",
                    "unit": "No",
                    "qty": 1,
                    "rate": 677.97,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "23011",
                    "page": "133",
                    "label": "S or P Trap",
                    "unit": "No",
                    "qty": 1,
                    "rate": 350.48,
                    "cpApply": false
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "23016",
                    "page": "134",
                    "label": "GI inlet connections",
                    "unit": "No",
                    "qty": 1,
                    "rate": 41.31,
                    "cpApply": false
                },
                {
                    "sr": "D",
                    "kind": "SOR",
                    "code": "23032B",
                    "page": "136",
                    "label": "CP Brass half turn flush cock 25mm",
                    "unit": "No",
                    "qty": 1,
                    "rate": 261.16,
                    "cpApply": false
                },
                {
                    "sr": "E",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "All fitting & labour charge",
                    "unit": "No",
                    "qty": 1,
                    "rate": 500.0,
                    "cpApply": false
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_36",
            "libNo": "36",
            "itemNo": "64",
            "desc": "Ceramic tabletop wash basin 450×400×135 with pop-up",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 5942,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Ceramic tabletop washbasin",
                    "unit": "No",
                    "qty": 1,
                    "rate": 3200.0,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Polyamide braided connection pipe 12mm",
                    "unit": "No",
                    "qty": 1,
                    "rate": 610.0,
                    "cpApply": true
                },
                {
                    "sr": "C",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Waste coupling ceramic pop-up 32mm",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1410.0,
                    "cpApply": false
                },
                {
                    "sr": "D",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Fitting charges (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 150.0,
                    "cpApply": false
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_37",
            "libNo": "37",
            "itemNo": "",
            "desc": "Wall Mixer 3-in-1 chrome plated",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 3882,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Wall Mixer 3-in-1",
                    "unit": "No",
                    "qty": 1,
                    "rate": 3245.0,
                    "cpApply": true
                },
                {
                    "sr": "C",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Fitting charges (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 150.0,
                    "cpApply": false
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_38",
            "libNo": "38",
            "itemNo": "60",
            "desc": "Angle Cock with wall flange",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 898,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Angle Cock with wall flange",
                    "unit": "No",
                    "qty": 1,
                    "rate": 650.0,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Fitting charges (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 150.0,
                    "cpApply": false
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_39",
            "libNo": "39",
            "itemNo": "87",
            "desc": "Wash Basin Platform: Black Granite top + Kota stone supports",
            "unit": "Sqm",
            "basis": "Per 1.5 Sqm (2.0×0.75)",
            "basisQty": 1.5,
            "cp": 15,
            "pdfRate": 3176.91,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M490",
                    "page": "18",
                    "label": "25mm thick Kota stone (vertical supports)",
                    "unit": "Sqm",
                    "qty": 2.25,
                    "rate": 198.31,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm Black Granite (horizontal + patti)",
                    "unit": "Sqm",
                    "qty": 1.65,
                    "rate": 1347.46,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "02007A",
                    "page": "32",
                    "label": "12mm CM 1:3 bases",
                    "unit": "Cum",
                    "qty": 0.02,
                    "rate": 3508.87,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 7.65,
                    "rate": 85.0,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — fixing",
                    "unit": "Sqm",
                    "qty": 1.5,
                    "rate": 650.0,
                    "cpApply": false
                }
            ],
            "topic": "Stone platform"
        },
        {
            "id": "lib_40",
            "libNo": "40",
            "itemNo": "89",
            "desc": "Brick masonry inspection chamber 455×610 with precast RCC cover (deduct CI)",
            "unit": "No",
            "basis": "Substitution: base SOR + RCC cover − CI cover",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 3141,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "24016A",
                    "page": "144",
                    "label": "Base SOR: 455×610×450 chamber with CI cover (upto 10 ton)",
                    "unit": "No",
                    "qty": 1,
                    "rate": 2903.89,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Precast RCC cover",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1050.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M113",
                    "page": "8",
                    "label": "Deduct: CI cover with frame",
                    "unit": "No",
                    "qty": -1,
                    "rate": 812.71,
                    "cpApply": false
                }
            ],
            "topic": "Drainage"
        },
        {
            "id": "lib_41",
            "libNo": "41",
            "itemNo": "90",
            "desc": "Brick masonry inspection chamber 500×700 with precast RCC cover (deduct CI)",
            "unit": "No",
            "basis": "Substitution: base SOR + RCC cover − CI cover",
            "basisQty": 1,
            "cp": 0,
            "pdfRate": 3845,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "24016B",
                    "page": "144",
                    "label": "Base SOR: 500×700×450 chamber with CI cover (upto 10 ton)",
                    "unit": "No",
                    "qty": 1,
                    "rate": 3624.51,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Precast RCC cover",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1350.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M114",
                    "page": "9",
                    "label": "Deduct: CI cover with frame",
                    "unit": "No",
                    "qty": -1,
                    "rate": 1129.66,
                    "cpApply": false
                }
            ],
            "topic": "Drainage"
        },
        {
            "id": "lib_42",
            "libNo": "42",
            "itemNo": "94",
            "desc": "MS Ladder with MS flats/round bars (assume 25 kg/Sqm)",
            "unit": "Kg",
            "basis": "Per 25 Kg = 1 Sqm",
            "basisQty": 25.0,
            "cp": 0,
            "pdfRate": 120,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10025A",
                    "page": "66",
                    "label": "P/F MS Grill",
                    "unit": "Kg",
                    "qty": 25.0,
                    "rate": 109.22,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "110",
                    "label": "Priming coat",
                    "unit": "Sqm",
                    "qty": 2.0,
                    "rate": 35.56,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19002",
                    "page": "110",
                    "label": "Oil paint two coats",
                    "unit": "Sqm",
                    "qty": 2.0,
                    "rate": 101.85,
                    "cpApply": false
                }
            ],
            "topic": "Steel work"
        },
        {
            "id": "lib_43",
            "libNo": "43",
            "itemNo": "96",
            "desc": "Kitchen SS Sink Glossy ASIS 316 Grade 610×460 with bowl 560×410×200",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 9767,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "M729",
                    "page": "23",
                    "label": "SS Sink Glossy ASIS 316 1mm thick",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1525.42,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "23021A",
                    "page": "136",
                    "label": "32mm MI fisher union",
                    "unit": "No",
                    "qty": 1,
                    "rate": 77.97,
                    "cpApply": false
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "23035",
                    "page": "136",
                    "label": "Rubber plug",
                    "unit": "No",
                    "qty": 1,
                    "rate": 16.98,
                    "cpApply": true
                },
                {
                    "sr": "D",
                    "kind": "SOR",
                    "code": "23020B",
                    "page": "134",
                    "label": "32mm CP Brass waste",
                    "unit": "No",
                    "qty": 1,
                    "rate": 7797.0,
                    "cpApply": false
                },
                {
                    "sr": "E",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Fitting charges (LS)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 120.0,
                    "cpApply": false
                }
            ],
            "topic": "Sanitary"
        },
        {
            "id": "lib_44",
            "libNo": "44",
            "itemNo": "",
            "desc": "Sandwich Platform 15-18mm Black Granite + 25mm Kota vertical support",
            "unit": "Sqm",
            "basis": "Per 2.81 Sqm (3.75×0.75)",
            "basisQty": 2.81,
            "cp": 15,
            "pdfRate": 5319.68,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M490",
                    "page": "18",
                    "label": "25mm Kota stone (horizontal + vertical)",
                    "unit": "Sqm",
                    "qty": 11.81,
                    "rate": 198.31,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm Black Granite",
                    "unit": "Sqm",
                    "qty": 5.51,
                    "rate": 1347.46,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "02007A",
                    "page": "32",
                    "label": "12mm CM 1:3 bases",
                    "unit": "Cum",
                    "qty": 0.03,
                    "rate": 3508.87,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 21.0,
                    "rate": 85.0,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — fixing",
                    "unit": "Sqm",
                    "qty": 2.81,
                    "rate": 650.0,
                    "cpApply": false
                }
            ],
            "topic": "Stone platform"
        },
        {
            "id": "lib_45",
            "libNo": "45",
            "itemNo": "96",
            "desc": "Dewatering arrangement 5 HP pump (hiring + operation)",
            "unit": "Day",
            "basis": "Per 1 Day",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 5175,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "5 HP pump hiring incl labour for dewatering",
                    "unit": "Day",
                    "qty": 1,
                    "rate": 4500.0,
                    "cpApply": true
                }
            ],
            "topic": "Dewatering"
        },
        {
            "id": "lib_45A",
            "libNo": "45A",
            "itemNo": "",
            "desc": "Kitchen platform trolley with 3 SS 304 baskets (19mm ply, laminated)",
            "unit": "Sqm",
            "basis": "Per 0.45 Sqm (0.60×0.75)",
            "basisQty": 0.45,
            "cp": 15,
            "pdfRate": 12736,
            "floors": false,
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M786",
                    "page": "25",
                    "label": "19mm thick plywood",
                    "unit": "Sqm",
                    "qty": 0.47,
                    "rate": 593.22,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M788",
                    "page": "25",
                    "label": "1mm laminated sheet",
                    "unit": "Sqm",
                    "qty": 1.047,
                    "rate": 296.61,
                    "cpApply": true
                },
                {
                    "sr": "3a",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "SS Basket 304 for cup set",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 924.0,
                    "cpApply": true
                },
                {
                    "sr": "3b",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "SS Basket 304 plane",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 879.0,
                    "cpApply": true
                },
                {
                    "sr": "3c",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "SS Basket 304 for thali",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 1211.0,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Drawer channel (ISI)",
                    "unit": "Pair",
                    "qty": 3.0,
                    "rate": 300.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "SS Handle",
                    "unit": "No",
                    "qty": 3.0,
                    "rate": 60.0,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour for fixing",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 300.0,
                    "cpApply": true
                }
            ],
            "topic": "Kitchen fittings"
        },
        {
            "id": "lib_46",
            "libNo": "46",
            "itemNo": "",
            "desc": "Decorative entrance gate (cast iron + MS tabular, painted)",
            "unit": "Kg",
            "basis": "Per 1 Kg",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 175,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "10025BA",
                    "page": "67",
                    "label": "P/F ornament grill",
                    "unit": "Kg",
                    "qty": 1.0,
                    "rate": 164.57,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Extra for hinges/pivot/pedestal/locking",
                    "unit": "Kg",
                    "qty": 1.0,
                    "rate": 10.0,
                    "cpApply": false
                }
            ],
            "topic": "Gates"
        },
        {
            "id": "lib_47",
            "libNo": "47",
            "itemNo": "",
            "desc": "Concertina coil fencing 600mm dia + RBT + MS angle 50×50×5",
            "unit": "Rmt",
            "basis": "Per 103 Rmt fencing",
            "basisQty": 103.0,
            "cp": 15,
            "pdfRate": 339,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Concertina coil fencing",
                    "unit": "Rmt",
                    "qty": 103,
                    "rate": 150.0,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "M685",
                    "page": "23",
                    "label": "MS Angle 50×50×5mm (3.8 kg/mt)",
                    "unit": "Kg",
                    "qty": 226.1,
                    "rate": 39.62,
                    "cpApply": true
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "M076",
                    "page": "7",
                    "label": "3mm barbed wire",
                    "unit": "Kg",
                    "qty": 75.06,
                    "rate": 57.63,
                    "cpApply": true
                },
                {
                    "sr": "D",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge",
                    "unit": "Rmt",
                    "qty": 103,
                    "rate": 15.0,
                    "cpApply": true
                }
            ],
            "topic": "Fencing"
        },
        {
            "id": "lib_48",
            "libNo": "48",
            "itemNo": "",
            "desc": "Cattle Guard using ISMC 100×50 + 100×75 + GI pipe 50mm",
            "unit": "Sqm",
            "basis": "Per 9 Sqm (4.5×2.0)",
            "basisQty": 9.0,
            "cp": 0,
            "pdfRate": 5007,
            "floors": false,
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "M570",
                    "page": "20",
                    "label": "ISMC 100×50 (9.20 kg/Rmt)",
                    "unit": "Kg",
                    "qty": 138,
                    "rate": 38.11,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "M570",
                    "page": "20",
                    "label": "ISMC 100×75 intermediate (11.50 kg/Rmt)",
                    "unit": "Kg",
                    "qty": 69,
                    "rate": 38.11,
                    "cpApply": false
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "M240",
                    "page": "12",
                    "label": "50mm GI Pipe @ 12cm c/c",
                    "unit": "Rmt",
                    "qty": 81.0,
                    "rate": 295.76,
                    "cpApply": false
                },
                {
                    "sr": "D",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Welding charges",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 1500.0,
                    "cpApply": false
                },
                {
                    "sr": "E",
                    "kind": "SOR",
                    "code": "04001A",
                    "page": "33",
                    "label": "Excavation for foundation",
                    "unit": "Cum",
                    "qty": 4.5,
                    "rate": 124.61,
                    "cpApply": false
                },
                {
                    "sr": "F",
                    "kind": "SOR",
                    "code": "06001BA",
                    "page": "53",
                    "label": "Brickwork common burnt clay bricks",
                    "unit": "Cum",
                    "qty": 2.9,
                    "rate": 3845.54,
                    "cpApply": false
                }
            ],
            "topic": "Fencing"
        },
        {
            "id": "lib_49",
            "libNo": "49",
            "itemNo": "24",
            "topic": "Brick masonry",
            "desc": "Brick masonry — Brickwork in superstructure above plinth in CM 1:6 (conventional bricks), all floors",
            "unit": "Cum",
            "basis": "Per 1 Cum brickwork",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4100.65,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-15",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "06002BA",
                    "page": "",
                    "label": "Brick work CM 1:6 in foundation & plinth (conventional)",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "7002",
                    "page": "",
                    "label": "Extra over for super structure above plinth upto floor two level",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 379.58,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_50",
            "libNo": "50",
            "itemNo": "25",
            "topic": "Brick masonry",
            "desc": "Brick masonry — Half brick masonry in CM 1:4 in superstructure (conventional bricks)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 639.34,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-16",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "06008A2A",
                    "page": "",
                    "label": "Half brick masonry CM 1:4 in foundation & plinth (conventional)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 584.17,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Extra over for super structure above plinth level (balance as per estimate)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 55.17,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_51",
            "libNo": "51",
            "itemNo": "26",
            "topic": "Plaster",
            "desc": "Plaster — 150 mm wide chicken wire mesh at brick–RCC junctions before plastering",
            "unit": "Sqm",
            "basis": "Per 1 Sqm of mesh",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 292.2,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-17",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "GI chicken wire mesh 150mm wide incl. nails, fixing & labour",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 292.2,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_52",
            "libNo": "52",
            "itemNo": "35",
            "topic": "Waterproofing",
            "desc": "Waterproofing — China mosaic treatment over 40 mm CC 1:2:4 bedding (terrace)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm terrace",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1102.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-20",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14035",
                    "page": "",
                    "label": "Broken china mosaic flooring for terrace (12–20mm glazed pieces)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 771.98,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "05011BA",
                    "page": "",
                    "label": "CC 1:2:4 bedding, 40 mm average thick",
                    "unit": "Cum",
                    "qty": 0.04,
                    "rate": 3998.26,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Waterproofing compound 1 kg/bag, oxalic acid cleaning & curing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 170.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_53",
            "libNo": "53",
            "itemNo": "36",
            "topic": "Plinth protection",
            "desc": "Plinth protection — 60 mm interlocking paver block on brickbat + sand bed with kerb stone edging",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plinth protection",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1433.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-21",
            "components": [
                {
                    "sr": "1",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Paver block 60mm on 100mm brickbat + 75mm sand bed (District SOR, Building item 47)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 924.0,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "14032",
                    "page": "",
                    "label": "Precast concrete kerb stone 30×30×15 cm, M-250",
                    "unit": "Rmt",
                    "qty": 1.2,
                    "rate": 371.21,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Excavation, levelling & dressing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 60.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_54",
            "libNo": "54",
            "itemNo": "42",
            "topic": "Doors",
            "desc": "Doors — Frameless toughened glass door, 12–18 mm glass with SS 304 patch fittings & floor spring",
            "unit": "Sqm",
            "basis": "Per 1 Sqm door",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 10803.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-24",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Toughened glass 12–18mm with SS 304 patch fittings, floor spring, lock & handle",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 10803.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_55",
            "libNo": "55",
            "itemNo": "43",
            "topic": "Doors",
            "desc": "Doors — Double shutter door with granite frame and 38 mm solid core flush shutters",
            "unit": "Sqm",
            "basis": "Per 1 Sqm door",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3917.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-25",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10011",
                    "page": "",
                    "label": "Flush door shutter, solid core, block board core with anodised hinges",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1811.62,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Granite door frame, hardware & fixing (balance as per estimate)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 2105.38,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_56",
            "libNo": "56",
            "itemNo": "44",
            "topic": "Doors",
            "desc": "Doors — Single shutter door with granite frame and 38 mm solid core flush shutter",
            "unit": "Sqm",
            "basis": "Per 1 Sqm door",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3976.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-26",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10011",
                    "page": "",
                    "label": "Flush door shutter, solid core, block board core with anodised hinges",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1811.62,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Granite door frame, hardware & fixing (balance as per estimate)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 2164.38,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_57",
            "libNo": "57",
            "itemNo": "85",
            "topic": "Stone work",
            "desc": "Stone work — 25 mm polished Kota stone shelf with round moulded edge",
            "unit": "Sqm",
            "basis": "Per 1 Sqm shelf",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 661.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-39",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M490",
                    "page": "18",
                    "label": "25mm thick Kota stone slab",
                    "unit": "Sqm",
                    "qty": 1.1,
                    "rate": 198.31,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "02007A",
                    "page": "32",
                    "label": "10mm CM 1:3 bedding",
                    "unit": "Cum",
                    "qty": 0.01,
                    "rate": 3508.87,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 2.0,
                    "rate": 85.0,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — cutting grooves in wall & fixing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 205.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_58",
            "libNo": "58",
            "itemNo": "Sump-11",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for vertical & horizontal RCC fins / walls (incl. formwork)",
            "unit": "Cum",
            "basis": "Per 1 Cum fin/wall",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 10461.24,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-42",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024BA",
                    "page": "",
                    "label": "CC M-200 in walls, top of foundation upto floor two level",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4466.94,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001CA",
                    "page": "",
                    "label": "Formwork — vertical surfaces such as walls",
                    "unit": "Sqm",
                    "qty": 24.0,
                    "rate": 247.2,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_59",
            "libNo": "59",
            "itemNo": "22",
            "topic": "SS railing",
            "desc": "SS railing — 120 cm high SS 316 railing (50 mm handrail, 38 mm balusters)",
            "unit": "Rmt",
            "basis": "Per 3.50 Rmt",
            "basisQty": 3.5,
            "cp": 15,
            "pdfRate": 3819.3,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-14",
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "M714",
                    "page": "24",
                    "label": "50mm dia SS pipe (handrail)",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 1004.24,
                    "cpApply": true
                },
                {
                    "sr": "B",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "38mm dia SS pipe (baluster support, 120cm high)",
                    "unit": "Rmt",
                    "qty": 4.32,
                    "rate": 580.0,
                    "cpApply": true
                },
                {
                    "sr": "C",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "25mm horizontal SS pipe",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 180.0,
                    "cpApply": true
                },
                {
                    "sr": "D",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "18.75mm SS support pipe",
                    "unit": "Rmt",
                    "qty": 10.5,
                    "rate": 250.0,
                    "cpApply": true
                },
                {
                    "sr": "E",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Round SS ball at top",
                    "unit": "No",
                    "qty": 2.0,
                    "rate": 300.0,
                    "cpApply": true
                },
                {
                    "sr": "F",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge — prep & fixing",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 500.0,
                    "cpApply": true
                }
            ]
        },
        {
            "id": "lib_60",
            "libNo": "60",
            "itemNo": "27",
            "topic": "Plaster",
            "desc": "Plaster — 15 mm mala cement plaster CM 1:4 (interior), all floors",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 293.83,
            "floors": true,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-18",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17017",
                    "page": "105",
                    "label": "Mala cement plaster (double coat) — base SOR rate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 287.83,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Extra for trowel finish (balance as per estimate)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 6.0,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "17007A",
                "page": "104",
                "rate": 24.22
            }
        },
        {
            "id": "lib_61",
            "libNo": "61",
            "itemNo": "67",
            "topic": "Sanitary",
            "desc": "Sanitary — Wash-down European WC with PVC flushing tank, seat & cover and jet spray",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3025.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-34",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Wash down EWC pan (vitreous china)",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 1200.0,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "23017",
                    "page": "",
                    "label": "Plastic seat & cover for wash down WC",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 288.45,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "PVC flushing tank (ISI mark)",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 780.0,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Health faucet / jet spray with SS hose",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 250.0,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Fittings & labour charge",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 500.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_62",
            "libNo": "62",
            "itemNo": "83",
            "topic": "Steel work",
            "desc": "Steel work — GI ladder with GI flats & round bars, primer + two coats oil paint",
            "unit": "Kg",
            "basis": "Per 25 Kg = 1 Sqm",
            "basisQty": 25.0,
            "cp": 0,
            "pdfRate": 95.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-37",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "GI flats & round bars incl. fabrication and fixing",
                    "unit": "Kg",
                    "qty": 25.0,
                    "rate": 90.84,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "110",
                    "label": "Priming coat",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 35.56,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19005",
                    "page": "110",
                    "label": "Oil painting two coats",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 68.47,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_63",
            "libNo": "63",
            "itemNo": "84",
            "topic": "Stone platform",
            "desc": "Stone platform — 18 mm black granite top on 25 mm Kota stone supports (per Sqm basis)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm platform",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 4152.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-38",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm Black Granite (horizontal + patti)",
                    "unit": "Sqm",
                    "qty": 1.66,
                    "rate": 1347.46,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M490",
                    "page": "18",
                    "label": "25mm Kota stone (vertical supports)",
                    "unit": "Sqm",
                    "qty": 1.6,
                    "rate": 198.31,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "02007A",
                    "page": "32",
                    "label": "12mm CM 1:3 bases",
                    "unit": "Cum",
                    "qty": 0.015,
                    "rate": 3508.87,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 6.0,
                    "rate": 85.0,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour — fixing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 650.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_64",
            "libNo": "64",
            "itemNo": "90",
            "topic": "Gates",
            "desc": "Gates — Foldable (bi-fold) MS entrance gate with wicket gate",
            "unit": "Sqm",
            "basis": "Per 1 Sqm gate",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7206.59,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-41",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10025BA",
                    "page": "67",
                    "label": "P/F ornamental MS grill work — gate fabrication @ 40 kg/Sqm",
                    "unit": "Kg",
                    "qty": 40.0,
                    "rate": 164.57,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hinges, rollers, track, wicket gate lock & stopper",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 500.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "110",
                    "label": "Priming coat (both faces)",
                    "unit": "Sqm",
                    "qty": 2.0,
                    "rate": 35.56,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_65",
            "libNo": "65",
            "itemNo": "96",
            "topic": "Fencing",
            "desc": "Fencing — 1.2 m high GI barbed wire fencing with MS angle posts at 2.5 m c/c",
            "unit": "Rmt",
            "basis": "Per 1 Rmt fencing",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 421.0,
            "floors": false,
            "source": "Veterinary Polyclinic, Dahod (SOR 2024-25) RA-41A",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "22001",
                    "page": "",
                    "label": "1.20 m high fencing, MS angle posts 40×40×6, barbed wire, CC 1:5:10 blocks",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 388.05,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Extra GI staples & additional strands",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 33.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_66",
            "libNo": "66",
            "itemNo": "5",
            "topic": "RCC",
            "desc": "RCC — CC M-150 for foundations, footings & plinth slab",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4049.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-1",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05023AA",
                    "page": "",
                    "label": "CC M-150 in foundations, footings, base of columns & mass concrete",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 3823.14,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001AA",
                    "page": "",
                    "label": "Form work — foundations, footings, bases of columns & mass concrete",
                    "unit": "Sqm",
                    "qty": 1.21,
                    "rate": 186.24,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_67",
            "libNo": "67",
            "itemNo": "6",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for foundations & footings",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4450.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-2",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025AA",
                    "page": "",
                    "label": "CC M-250 in foundations, footings, base of columns & mass concrete",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4205.16,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001AA",
                    "page": "",
                    "label": "Form work — foundations, footings, bases of columns & mass concrete",
                    "unit": "Sqm",
                    "qty": 1.31,
                    "rate": 186.24,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_68",
            "libNo": "68",
            "itemNo": "7",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for columns upto plinth level",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7824.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-3",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025DA",
                    "page": "",
                    "label": "CC M-250 in columns, pillars, posts & struts",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4590.29,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "",
                    "label": "Form work — columns, pillars, posts & struts (square/rectangular)",
                    "unit": "Sqm",
                    "qty": 10.0,
                    "rate": 323.39,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_69",
            "libNo": "69",
            "itemNo": "8",
            "topic": "RCC",
            "desc": "RCC — CC 1:4:8 in foundation & plinth",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2981.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-4",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05004A",
                    "page": "",
                    "label": "CC 1:4:8 (40mm hand broken stone aggregate)",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 2653.39,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001AA",
                    "page": "",
                    "label": "Form work — foundations, footings, bases of columns & mass concrete",
                    "unit": "Sqm",
                    "qty": 1.76,
                    "rate": 186.24,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_70",
            "libNo": "70",
            "itemNo": "9",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for plinth beams",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6352.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-5",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025CA",
                    "page": "",
                    "label": "CC M-250 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4485.93,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "",
                    "label": "Form work — sides & soffits of beams, girders & lintels upto 1 M depth",
                    "unit": "Sqm",
                    "qty": 8.89,
                    "rate": 209.95,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_71",
            "libNo": "71",
            "itemNo": "14",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for columns (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7590.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-6",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024DA",
                    "page": "",
                    "label": "CC M-200 in columns, pillars, posts & struts",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4544.94,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "",
                    "label": "Form work — columns, pillars, posts & struts (square/rectangular)",
                    "unit": "Sqm",
                    "qty": 9.42,
                    "rate": 323.39,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_72",
            "libNo": "72",
            "itemNo": "15",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for beams (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6205.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-7",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "CC M-200 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4440.58,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "",
                    "label": "Form work — sides & soffits of beams, girders & lintels upto 1 M depth",
                    "unit": "Sqm",
                    "qty": 8.4,
                    "rate": 209.95,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_73",
            "libNo": "73",
            "itemNo": "16",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for lintels (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7535.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-8",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "CC M-200 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4440.58,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "",
                    "label": "Form work — sides & soffits of beams, girders & lintels upto 1 M depth",
                    "unit": "Sqm",
                    "qty": 14.74,
                    "rate": 209.95,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_74",
            "libNo": "74",
            "itemNo": "17",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for chhajja (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6465.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-9",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "CC M-200 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4440.58,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001LA",
                    "page": "",
                    "label": "Form work — weather shades, chhajjas, corbels incl. edges",
                    "unit": "Sqm",
                    "qty": 11.78,
                    "rate": 171.87,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_75",
            "libNo": "75",
            "itemNo": "18",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for vertical fins (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8257.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-10",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025BA",
                    "page": "",
                    "label": "CC M-250 in walls, from top of foundation upto floor two level",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4512.29,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001QA",
                    "page": "",
                    "label": "Form work — vertical fins & vertical sun breakers",
                    "unit": "Sqm",
                    "qty": 9.1,
                    "rate": 411.43,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_76",
            "libNo": "76",
            "itemNo": "19",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for slabs (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6801.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-11",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "CC M-200 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4440.58,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001B1A",
                    "page": "",
                    "label": "Form work — soffits of suspended floor/roof slabs upto 200mm thick",
                    "unit": "Sqm",
                    "qty": 8.71,
                    "rate": 270.9,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_77",
            "libNo": "77",
            "itemNo": "20",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for staircases (all floors)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 9671.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-12",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024EA",
                    "page": "",
                    "label": "CC M-200 in staircases excluding landing",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 5492.62,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001MA",
                    "page": "",
                    "label": "Form work — staircase with sloping/stepped soffits incl. risers",
                    "unit": "Sqm",
                    "qty": 15.82,
                    "rate": 264.13,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_78",
            "libNo": "78",
            "itemNo": "21",
            "topic": "RCC",
            "desc": "RCC — TMT Bar Fe-500D reinforcement (all floors)",
            "unit": "Kg",
            "basis": "Per 1 Kg",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 77.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-13",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05014C",
                    "page": "",
                    "label": "TMT Bar Fe-500D reinforcement incl. bending, binding & placing",
                    "unit": "Kg",
                    "qty": 1.0,
                    "rate": 76.52,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Extra for lift above floor two level",
                    "unit": "Kg",
                    "qty": 1.0,
                    "rate": 0.48,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_79",
            "libNo": "79",
            "itemNo": "22",
            "topic": "Brick masonry",
            "desc": "Brick masonry — Brickwork in superstructure CM 1:6 (ANS Garbada)",
            "unit": "Cum",
            "basis": "Per 1 Cum brickwork",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4122.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-14",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "06002BA",
                    "page": "",
                    "label": "Brick work CM 1:6 in foundation & plinth (conventional)",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "7002",
                    "page": "",
                    "label": "Extra over for super structure above plinth upto floor two level",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 379.58,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_80",
            "libNo": "80",
            "itemNo": "23",
            "topic": "Brick masonry",
            "desc": "Brick masonry — Half brick masonry CM 1:4 (ANS Garbada)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 641.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-15",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "06008A2A",
                    "page": "",
                    "label": "Half brick masonry CM 1:4 in foundation & plinth (conventional)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 584.17,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Extra over for super structure above plinth level",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 56.83,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_81",
            "libNo": "81",
            "itemNo": "24",
            "topic": "Plaster",
            "desc": "Plaster — 20 mm double coat mala plaster, interior (ANS Garbada)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 311.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-16",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17017",
                    "page": "105",
                    "label": "20mm double coat mala cement plaster on interior brick/concrete",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 287.83,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Floating coat & finishing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 23.17,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_82",
            "libNo": "82",
            "itemNo": "25",
            "topic": "Plaster",
            "desc": "Plaster — 10 mm ceiling plaster CM 1:3 (ANS Garbada)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 212.6,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-17",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17001A",
                    "page": "",
                    "label": "10mm cement plaster single coat, interior upto floor two level",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 149.18,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "17006",
                    "page": "",
                    "label": "Extra for plastering on ceilings & soffits of stairs",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 26.41,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Neat cement floating coat & scaffolding",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 37.01,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_83",
            "libNo": "83",
            "itemNo": "26",
            "topic": "Waterproofing",
            "desc": "Waterproofing — Sunk slab treatment with CC 1:2:4",
            "unit": "Sqm",
            "basis": "Per 1 Sqm sunk area",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 370.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-18",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05011BA",
                    "page": "",
                    "label": "CC 1:2:4, 50 mm average thick",
                    "unit": "Cum",
                    "qty": 0.05,
                    "rate": 3998.26,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Waterproofing compound, brickbat coba & curing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 170.09,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_84",
            "libNo": "84",
            "itemNo": "27",
            "topic": "Plaster",
            "desc": "Plaster — 20 mm sand faced plaster with 1×1 cm grooves (external)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm plaster",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 363.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-19",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17009",
                    "page": "",
                    "label": "20mm sand faced cement plaster on walls upto 10 m height",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 350.48,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Extra for forming 1×1 cm grooves",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 12.52,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_85",
            "libNo": "85",
            "itemNo": "29",
            "topic": "Doors",
            "desc": "Doors — MS factory fabricated double shutter entrance door (source abstract shows unit as Kg — verify)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 9616.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-20",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "MS factory fabricated double shutter entrance door (source abstract shows unit as Kg — verify) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 9616.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_86",
            "libNo": "86",
            "itemNo": "30",
            "topic": "Doors",
            "desc": "Doors — Aluminium anodized single shutter 35 mm flush door",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6566.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-21",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Aluminium anodized single shutter 35 mm flush door — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 6566.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_87",
            "libNo": "87",
            "itemNo": "32",
            "topic": "Windows",
            "desc": "Windows — Circular window, 3-track powder coated",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4337.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-22",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Circular window, 3-track powder coated — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 4337.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_88",
            "libNo": "88",
            "itemNo": "33",
            "topic": "Windows",
            "desc": "Windows — Aluminium 2-track window with fixed glazing",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3852.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-23",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Aluminium 2-track window with fixed glazing — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 3852.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_89",
            "libNo": "89",
            "itemNo": "35",
            "topic": "Stone work",
            "desc": "Stone work — Both-side mirror polished black granite 18 mm (sills & jams)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2998.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-24",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm black granite slab",
                    "unit": "Sqm",
                    "qty": 1.1,
                    "rate": 1347.46,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "02007A",
                    "page": "32",
                    "label": "12mm CM 1:3 bedding",
                    "unit": "Cum",
                    "qty": 0.02,
                    "rate": 3508.87,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 3.0,
                    "rate": 85.0,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Cutting, both-side polishing, fixing & labour",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1190.61,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_90",
            "libNo": "90",
            "itemNo": "36",
            "topic": "Steel work",
            "desc": "Steel work — Safety grills of MS bars with CRC frame (ANS Garbada)",
            "unit": "Kg",
            "basis": "Per 20 Kg = 1 Sqm",
            "basisQty": 20.0,
            "cp": 0,
            "pdfRate": 116.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-25",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10025AA",
                    "page": "67",
                    "label": "Cost of plain grill fabrication & fixing",
                    "unit": "Kg",
                    "qty": 20.0,
                    "rate": 109.22,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "110",
                    "label": "Priming coat",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 35.56,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19005",
                    "page": "110",
                    "label": "Oil painting two coats",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 68.47,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_91",
            "libNo": "91",
            "itemNo": "41",
            "topic": "Waterproofing",
            "desc": "Waterproofing — China mosaic over 50 mm CC 1:2:4 (ANS Garbada)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm terrace",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1153.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-26",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14035",
                    "page": "",
                    "label": "Broken china mosaic flooring for terrace (12–20mm glazed pieces)",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 771.98,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "05011BA",
                    "page": "",
                    "label": "CC 1:2:4 bedding, 50 mm average thick",
                    "unit": "Cum",
                    "qty": 0.05,
                    "rate": 3998.26,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Waterproofing compound, oxalic acid cleaning & curing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 181.11,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_92",
            "libNo": "92",
            "itemNo": "42",
            "topic": "Stone work",
            "desc": "Stone work — Double side polished granite partition 18 mm",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2020.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-27",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "18mm granite slab",
                    "unit": "Sqm",
                    "qty": 1.1,
                    "rate": 1347.46,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Cutting, double side polishing, framing & fixing",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 537.79,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_93",
            "libNo": "93",
            "itemNo": "46",
            "topic": "SS railing",
            "desc": "SS railing — 90 cm high SS 304 railing (ANS Garbada rate)",
            "unit": "Rmt",
            "basis": "Per 1 Rmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3221.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-28",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "90 cm high SS 304 railing (ANS Garbada rate) — all-in rate as per estimate",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 3221.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_94",
            "libNo": "94",
            "itemNo": "54",
            "topic": "Sanitary",
            "desc": "Sanitary — Table top wash basin 610×450 with fittings",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 5205.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-29",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Table top wash basin 610×450 with fittings — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 5205.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_95",
            "libNo": "95",
            "itemNo": "55",
            "topic": "Sanitary",
            "desc": "Sanitary — SS 304 grade kitchen sink 610×460",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3052.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-30",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "SS 304 grade kitchen sink 610×460 — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 3052.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_96",
            "libNo": "96",
            "itemNo": "57",
            "topic": "Sanitary",
            "desc": "Sanitary — Wall hung European WC with push valve",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7074.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-31",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Wall hung European WC with push valve — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 7074.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_97",
            "libNo": "97",
            "itemNo": "58",
            "topic": "Sanitary",
            "desc": "Sanitary — CERA cruise set for handicap toilet (complete)",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 43302.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-32",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "CERA cruise set for handicap toilet (complete) — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 43302.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_98",
            "libNo": "98",
            "itemNo": "59",
            "topic": "Sanitary",
            "desc": "Sanitary — Wall hung urinal",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3967.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-33",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Wall hung urinal — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 3967.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_99",
            "libNo": "99",
            "itemNo": "79",
            "topic": "Stone platform",
            "desc": "Stone platform — Sandwich platform, granite top on kota supports (ANS Garbada rate)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3784.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-34",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Sandwich platform, granite top on kota supports (ANS Garbada rate) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 3784.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_100",
            "libNo": "100",
            "itemNo": "80",
            "topic": "Steel work",
            "desc": "Steel work — MS square pipe railing",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2255.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-35",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "MS square pipe railing — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 2255.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_101",
            "libNo": "101",
            "itemNo": "83",
            "topic": "Flooring",
            "desc": "Flooring — 60×60 GVT glossy tile flooring (ANS Garbada rate)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1720.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-36",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "60×60 GVT glossy tile flooring (ANS Garbada rate) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1720.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_102",
            "libNo": "102",
            "itemNo": "84",
            "topic": "Flooring",
            "desc": "Flooring — GVT skirting / risers / dado (ANS Garbada rate)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1458.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-37",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "GVT skirting / risers / dado (ANS Garbada rate) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 1458.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_103",
            "libNo": "103",
            "itemNo": "89",
            "topic": "Signage",
            "desc": "Signage — Wall signage, SS 304 1.5 mm laser cut letters",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1000.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-38",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Wall signage, SS 304 1.5 mm laser cut letters — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 1000.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_104",
            "libNo": "104",
            "itemNo": "90",
            "topic": "Drainage",
            "desc": "Drainage — Sock pit 2.28 m dia × 6.5 m deep (complete)",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 50872.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-39",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Sock pit 2.28 m dia × 6.5 m deep (complete) — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 50872.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_105",
            "libNo": "105",
            "itemNo": "91",
            "topic": "Drainage",
            "desc": "Drainage — Septic tank 4.95 × 1.98 × 2.5 m (complete)",
            "unit": "No",
            "basis": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 92086.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-40",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Septic tank 4.95 × 1.98 × 2.5 m (complete) — all-in rate as per estimate",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 92086.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_106",
            "libNo": "106",
            "itemNo": "92",
            "topic": "SS railing",
            "desc": "SS railing — SS 304 hand railing 32 mm dia",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 816.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-41",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "SS 304 hand railing 32 mm dia — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 816.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_107",
            "libNo": "107",
            "itemNo": "98",
            "topic": "Plaster",
            "desc": "Plaster — Chicken mesh at brick–RCC joints (ANS Garbada rate)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 76.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — School block (SOR 2024-25) RA-44",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Chicken mesh at brick–RCC joints (ANS Garbada rate) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 76.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_108",
            "libNo": "108",
            "itemNo": "",
            "topic": "Windows",
            "desc": "Windows — Ventilator 65×25 anodized with louvers",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8610.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-42",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Ventilator 65×25 anodized with louvers — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 8610.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_109",
            "libNo": "109",
            "itemNo": "",
            "topic": "Windows",
            "desc": "Windows — 114 mm GI louvers, 0.55 mm thick",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8476.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-43",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "114 mm GI louvers, 0.55 mm thick — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 8476.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_110",
            "libNo": "110",
            "itemNo": "",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for columns upto plinth level (hostel variant)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 7297.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-3",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025DA",
                    "page": "",
                    "label": "CC M-250 in columns, pillars, posts & struts",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4590.29,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "",
                    "label": "Form work — columns, pillars, posts & struts (square/rectangular)",
                    "unit": "Sqm",
                    "qty": 8.37,
                    "rate": 323.39,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_111",
            "libNo": "111",
            "itemNo": "",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for plinth beams (hostel variant)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 5886.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-5",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025CA",
                    "page": "",
                    "label": "CC M-250 in slabs, landings, lintels, beams, girders & cantilever",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4485.93,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "",
                    "label": "Form work — sides & soffits of beams, girders & lintels upto 1 M depth",
                    "unit": "Sqm",
                    "qty": 6.67,
                    "rate": 209.95,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_112",
            "libNo": "112",
            "itemNo": "",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for vertical & horizontal wall (hostel variant)",
            "unit": "Cum",
            "basis": "Per 1 Cum concrete",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8010.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-10",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025BA",
                    "page": "",
                    "label": "CC M-250 in walls, from top of foundation upto floor two level",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 4512.29,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001CA",
                    "page": "",
                    "label": "Form work — vertical surfaces such as walls & partitions",
                    "unit": "Sqm",
                    "qty": 14.15,
                    "rate": 247.2,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_113",
            "libNo": "113",
            "itemNo": "",
            "topic": "Doors",
            "desc": "Doors — Single shutter door with green marble frame",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6066.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-21",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Single shutter door with green marble frame — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 6066.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_114",
            "libNo": "114",
            "itemNo": "",
            "topic": "Windows",
            "desc": "Windows — Circular window, 3-track (hostel variant)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4709.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-22",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Circular window, 3-track (hostel variant) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 4709.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_115",
            "libNo": "115",
            "itemNo": "",
            "topic": "Windows",
            "desc": "Windows — Aluminium 2-track window (hostel variant)",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 4619.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-23",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Aluminium 2-track window (hostel variant) — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 4619.0,
                    "cpApply": false
                }
            ]
        },
        {
            "id": "lib_116",
            "libNo": "116",
            "itemNo": "",
            "topic": "Stone work",
            "desc": "Stone work — Green marble 18 mm on sills & jams",
            "unit": "Sqm",
            "basis": "Per 1 Sqm",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2131.0,
            "floors": false,
            "source": "Adarsh Nivasi School, Garbada — Hostel block (SOR 2024-25) RA-24",
            "components": [
                {
                    "sr": "1",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Green marble 18 mm on sills & jams — all-in rate as per estimate",
                    "unit": "Sqm",
                    "qty": 1.0,
                    "rate": 2131.0,
                    "cpApply": false
                }
            ]
        }
    ],
    marketRates: [
        {
            "label": "38mm dia SS pipe (baluster support)",
            "rate": 580.0,
            "unit": "Rmt",
            "usedInRA": [
                "11"
            ]
        },
        {
            "label": "25mm horizontal SS pipe",
            "rate": 180.0,
            "unit": "Rmt",
            "usedInRA": [
                "11"
            ]
        },
        {
            "label": "18.75mm SS support pipe",
            "rate": 250.0,
            "unit": "Rmt",
            "usedInRA": [
                "11"
            ]
        },
        {
            "label": "Round SS ball at top",
            "rate": 300.0,
            "unit": "No",
            "usedInRA": [
                "11"
            ]
        },
        {
            "label": "Labour charge — prep & fixing",
            "rate": 500.0,
            "unit": "Rmt",
            "usedInRA": [
                "11"
            ]
        },
        {
            "label": "Supply of cinder",
            "rate": 225.0,
            "unit": "Cum",
            "usedInRA": [
                "15"
            ]
        },
        {
            "label": "Male mazdoor",
            "rate": 505.0,
            "unit": "No",
            "usedInRA": [
                "15"
            ]
        },
        {
            "label": "Hardware (LS)",
            "rate": 500.0,
            "unit": "LS",
            "usedInRA": [
                "17",
                "18",
                "19"
            ]
        },
        {
            "label": "Labour for fixing glass in frame & window in wall",
            "rate": 1000.0,
            "unit": "Sqm",
            "usedInRA": [
                "20"
            ]
        },
        {
            "label": "Teakwood batten 12×50mm",
            "rate": 25.0,
            "unit": "Rmt",
            "usedInRA": [
                "21"
            ]
        },
        {
            "label": "Screw, Khili etc",
            "rate": 200.0,
            "unit": "LS",
            "usedInRA": [
                "21",
                "22"
            ]
        },
        {
            "label": "SS Pipe Handle 60cm ASIS 316",
            "rate": 1150.0,
            "unit": "No",
            "usedInRA": [
                "21"
            ]
        },
        {
            "label": "Godrej locking system",
            "rate": 1850.0,
            "unit": "No",
            "usedInRA": [
                "21",
                "22"
            ]
        },
        {
            "label": "Labour for preparing door",
            "rate": 500.0,
            "unit": "Sqm",
            "usedInRA": [
                "21",
                "22"
            ]
        },
        {
            "label": "Polish work",
            "rate": 200.0,
            "unit": "LS",
            "usedInRA": [
                "22"
            ]
        },
        {
            "label": "Add: FRP frame 100×50",
            "rate": 1050.0,
            "unit": "Sqm",
            "usedInRA": [
                "23"
            ]
        },
        {
            "label": "Deduct: FRP frame 125×65",
            "rate": 850.0,
            "unit": "Sqm",
            "usedInRA": [
                "23"
            ]
        },
        {
            "label": "Labour — fixing granite + 3 grooves",
            "rate": 322.8,
            "unit": "Rmt",
            "usedInRA": [
                "28"
            ]
        },
        {
            "label": "Labour — fixing with slurry+adhesive",
            "rate": 376.6,
            "unit": "Sqm",
            "usedInRA": [
                "29"
            ]
        },
        {
            "label": "Mirror polishing",
            "rate": 150.0,
            "unit": "Sqm",
            "usedInRA": [
                "29"
            ]
        },
        {
            "label": "Labour for cowl",
            "rate": 4.0,
            "unit": "No",
            "usedInRA": [
                "32",
                "33"
            ]
        },
        {
            "label": "All fitting & labour charge",
            "rate": 500.0,
            "unit": "No",
            "usedInRA": [
                "35"
            ]
        },
        {
            "label": "Fitting charges (LS)",
            "rate": 150.0,
            "unit": "LS",
            "usedInRA": [
                "36",
                "37",
                "38",
                "43"
            ]
        },
        {
            "label": "Labour — fixing",
            "rate": 650.0,
            "unit": "Sqm",
            "usedInRA": [
                "39",
                "44"
            ]
        },
        {
            "label": "Precast RCC cover",
            "rate": 1050.0,
            "unit": "No",
            "usedInRA": [
                "40",
                "41"
            ]
        },
        {
            "label": "SS Basket 304 for cup set",
            "rate": 924.0,
            "unit": "No",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "SS Basket 304 plane",
            "rate": 879.0,
            "unit": "No",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "SS Basket 304 for thali",
            "rate": 1211.0,
            "unit": "No",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "Drawer channel (ISI)",
            "rate": 300.0,
            "unit": "Pair",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "SS Handle",
            "rate": 60.0,
            "unit": "No",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "Labour for fixing",
            "rate": 300.0,
            "unit": "LS",
            "usedInRA": [
                "45A"
            ]
        },
        {
            "label": "Extra for hinges/pivot/pedestal/locking",
            "rate": 10.0,
            "unit": "Kg",
            "usedInRA": [
                "46"
            ]
        },
        {
            "label": "Concertina coil fencing",
            "rate": 150.0,
            "unit": "Rmt",
            "usedInRA": [
                "47"
            ]
        },
        {
            "label": "Labour charge",
            "rate": 15.0,
            "unit": "Rmt",
            "usedInRA": [
                "47"
            ]
        },
        {
            "label": "Welding charges",
            "rate": 1500.0,
            "unit": "LS",
            "usedInRA": [
                "48"
            ]
        },
        {
            "label": "38mm dia SS pipe (baluster support, 120cm high)",
            "rate": 580.0,
            "unit": "Rmt",
            "usedInRA": [
                "59"
            ]
        },
        {
            "label": "Labour — cutting grooves in wall & fixing",
            "rate": 205.0,
            "unit": "Sqm",
            "usedInRA": [
                "57"
            ]
        },
        {
            "label": "GI flats & round bars incl. fabrication and fixing",
            "rate": 90.84,
            "unit": "Kg",
            "usedInRA": [
                "62"
            ]
        },
        {
            "label": "Wash down EWC pan (vitreous china)",
            "rate": 1200.0,
            "unit": "No",
            "usedInRA": [
                "61"
            ]
        },
        {
            "label": "PVC flushing tank (ISI mark)",
            "rate": 780.0,
            "unit": "No",
            "usedInRA": [
                "61"
            ]
        },
        {
            "label": "Health faucet / jet spray with SS hose",
            "rate": 250.0,
            "unit": "No",
            "usedInRA": [
                "61"
            ]
        },
        {
            "label": "Hinges, rollers, track, wicket gate lock & stopper",
            "rate": 500.0,
            "unit": "Sqm",
            "usedInRA": [
                "64"
            ]
        },
        {
            "label": "Extra GI staples & additional strands",
            "rate": 33.0,
            "unit": "Rmt",
            "usedInRA": [
                "65"
            ]
        },
        {
            "label": "Cutting, both-side polishing, fixing & labour",
            "rate": 1190.61,
            "unit": "Sqm",
            "usedInRA": [
                "89"
            ]
        },
        {
            "label": "Cutting, double side polishing, framing & fixing",
            "rate": 537.79,
            "unit": "Sqm",
            "usedInRA": [
                "92"
            ]
        }
    ],
    quotationRates: [
        {
            "label": "Add: GVT vitrified 60×60",
            "rate": 515.2,
            "unit": "Sqm",
            "usedInRA": [
                "24",
                "25"
            ]
        },
        {
            "label": "Add: matt glazed 300×300",
            "rate": 484.2,
            "unit": "Sqm",
            "usedInRA": [
                "26"
            ]
        },
        {
            "label": "3mm groove epoxy grouting",
            "rate": 15.0,
            "unit": "Rmt",
            "usedInRA": [
                "26",
                "27"
            ]
        },
        {
            "label": "Add: matt glazed 300×900",
            "rate": 645.6,
            "unit": "Sqm",
            "usedInRA": [
                "27"
            ]
        },
        {
            "label": "Ceramic tabletop washbasin",
            "rate": 3200.0,
            "unit": "No",
            "usedInRA": [
                "36"
            ]
        },
        {
            "label": "Polyamide braided connection pipe 12mm",
            "rate": 610.0,
            "unit": "No",
            "usedInRA": [
                "36"
            ]
        },
        {
            "label": "Waste coupling ceramic pop-up 32mm",
            "rate": 1410.0,
            "unit": "No",
            "usedInRA": [
                "36"
            ]
        },
        {
            "label": "Wall Mixer 3-in-1",
            "rate": 3245.0,
            "unit": "No",
            "usedInRA": [
                "37"
            ]
        },
        {
            "label": "Angle Cock with wall flange",
            "rate": 650.0,
            "unit": "No",
            "usedInRA": [
                "38"
            ]
        },
        {
            "label": "5 HP pump hiring incl labour for dewatering",
            "rate": 4500.0,
            "unit": "Day",
            "usedInRA": [
                "45"
            ]
        },
        {
            "label": "GI chicken wire mesh 150mm wide incl. nails, fixing & labour",
            "rate": 292.2,
            "unit": "Sqm",
            "usedInRA": [
                "51"
            ]
        },
        {
            "label": "Toughened glass 12–18mm with SS 304 patch fittings, floor spring, lock & handle",
            "rate": 10803.0,
            "unit": "Sqm",
            "usedInRA": [
                "54"
            ]
        },
        {
            "label": "MS factory fabricated double shutter entrance door (source abstract shows unit as Kg — verify) — all-in rate as per estimate",
            "rate": 9616.0,
            "unit": "Sqm",
            "usedInRA": [
                "85"
            ]
        },
        {
            "label": "Aluminium anodized single shutter 35 mm flush door — all-in rate as per estimate",
            "rate": 6566.0,
            "unit": "Sqm",
            "usedInRA": [
                "86"
            ]
        },
        {
            "label": "Circular window, 3-track powder coated — all-in rate as per estimate",
            "rate": 4337.0,
            "unit": "Sqm",
            "usedInRA": [
                "87"
            ]
        },
        {
            "label": "Aluminium 2-track window with fixed glazing — all-in rate as per estimate",
            "rate": 3852.0,
            "unit": "Sqm",
            "usedInRA": [
                "88"
            ]
        },
        {
            "label": "90 cm high SS 304 railing (ANS Garbada rate) — all-in rate as per estimate",
            "rate": 3221.0,
            "unit": "Rmt",
            "usedInRA": [
                "93"
            ]
        },
        {
            "label": "Table top wash basin 610×450 with fittings — all-in rate as per estimate",
            "rate": 5205.0,
            "unit": "No",
            "usedInRA": [
                "94"
            ]
        },
        {
            "label": "SS 304 grade kitchen sink 610×460 — all-in rate as per estimate",
            "rate": 3052.0,
            "unit": "No",
            "usedInRA": [
                "95"
            ]
        },
        {
            "label": "Wall hung European WC with push valve — all-in rate as per estimate",
            "rate": 7074.0,
            "unit": "No",
            "usedInRA": [
                "96"
            ]
        },
        {
            "label": "CERA cruise set for handicap toilet (complete) — all-in rate as per estimate",
            "rate": 43302.0,
            "unit": "No",
            "usedInRA": [
                "97"
            ]
        },
        {
            "label": "Wall hung urinal — all-in rate as per estimate",
            "rate": 3967.0,
            "unit": "No",
            "usedInRA": [
                "98"
            ]
        },
        {
            "label": "Sandwich platform, granite top on kota supports (ANS Garbada rate) — all-in rate as per estimate",
            "rate": 3784.0,
            "unit": "Sqm",
            "usedInRA": [
                "99"
            ]
        },
        {
            "label": "MS square pipe railing — all-in rate as per estimate",
            "rate": 2255.0,
            "unit": "Sqm",
            "usedInRA": [
                "100"
            ]
        },
        {
            "label": "60×60 GVT glossy tile flooring (ANS Garbada rate) — all-in rate as per estimate",
            "rate": 1720.0,
            "unit": "Sqm",
            "usedInRA": [
                "101"
            ]
        },
        {
            "label": "GVT skirting / risers / dado (ANS Garbada rate) — all-in rate as per estimate",
            "rate": 1458.0,
            "unit": "Sqm",
            "usedInRA": [
                "102"
            ]
        },
        {
            "label": "Wall signage, SS 304 1.5 mm laser cut letters — all-in rate as per estimate",
            "rate": 1000.0,
            "unit": "No",
            "usedInRA": [
                "103"
            ]
        },
        {
            "label": "Sock pit 2.28 m dia × 6.5 m deep (complete) — all-in rate as per estimate",
            "rate": 50872.0,
            "unit": "No",
            "usedInRA": [
                "104"
            ]
        },
        {
            "label": "Septic tank 4.95 × 1.98 × 2.5 m (complete) — all-in rate as per estimate",
            "rate": 92086.0,
            "unit": "No",
            "usedInRA": [
                "105"
            ]
        },
        {
            "label": "SS 304 hand railing 32 mm dia — all-in rate as per estimate",
            "rate": 816.0,
            "unit": "Sqm",
            "usedInRA": [
                "106"
            ]
        },
        {
            "label": "Chicken mesh at brick–RCC joints (ANS Garbada rate) — all-in rate as per estimate",
            "rate": 76.0,
            "unit": "Sqm",
            "usedInRA": [
                "107"
            ]
        },
        {
            "label": "Ventilator 65×25 anodized with louvers — all-in rate as per estimate",
            "rate": 8610.0,
            "unit": "Sqm",
            "usedInRA": [
                "108"
            ]
        },
        {
            "label": "114 mm GI louvers, 0.55 mm thick — all-in rate as per estimate",
            "rate": 8476.0,
            "unit": "Sqm",
            "usedInRA": [
                "109"
            ]
        },
        {
            "label": "Single shutter door with green marble frame — all-in rate as per estimate",
            "rate": 6066.0,
            "unit": "Sqm",
            "usedInRA": [
                "113"
            ]
        },
        {
            "label": "Circular window, 3-track (hostel variant) — all-in rate as per estimate",
            "rate": 4709.0,
            "unit": "Sqm",
            "usedInRA": [
                "114"
            ]
        },
        {
            "label": "Aluminium 2-track window (hostel variant) — all-in rate as per estimate",
            "rate": 4619.0,
            "unit": "Sqm",
            "usedInRA": [
                "115"
            ]
        },
        {
            "label": "Green marble 18 mm on sills & jams — all-in rate as per estimate",
            "rate": 2131.0,
            "unit": "Sqm",
            "usedInRA": [
                "116"
            ]
        }
    ]
  }
};

/* ---------------------------------------------------------------------------
   Core calculation. `resolve` is optional: (component) => rate, letting the
   caller swap in live SOR / Market / Quotation rates. Without it the rate
   stored on the component is used as-is.
   --------------------------------------------------------------------------- */
function raCompute(ra, resolve){
  const comps = (ra && ra.components) || [];
  let subtotal = 0, cpBase = 0;
  const rows = comps.map(c => {
    let rate = c.rate;
    if (typeof resolve === 'function') {
      const r = resolve(c);
      if (r !== null && r !== undefined && isFinite(r)) rate = Number(r);
    }
    const amount = Math.round((Number(c.qty) || 0) * (Number(rate) || 0) * 100) / 100;
    subtotal += amount;
    if (c.cpApply) cpBase += amount;
    return { ...c, rate: Number(rate) || 0, amount };
  });
  const cp     = Number(ra && ra.cp) || 0;
  const cpAmt  = Math.round(cpBase * cp / 100 * 100) / 100;
  const total  = Math.round((subtotal + cpAmt) * 100) / 100;
  const bq     = Number(ra && ra.basisQty) || 1;
  const perUnit= Math.round(total / bq * 100) / 100;

  /* floor-wise cascade for items that carry a lift extra */
  let floors = null;
  if (ra && ra.floors && ra.liftExtra) {
    const lift = Number(ra.liftExtra.rate) || 0;
    floors = {};
    const names = ['Ground Floor','First Floor','Second Floor','Third Floor','Fourth Floor','Fifth Floor'];
    let cur = perUnit;
    names.forEach((nm, i) => { if (i > 1) cur = Math.round((cur + lift) * 100) / 100; floors[nm] = cur; });
  }
  return { rows, subtotal: Math.round(subtotal*100)/100, cpBase: Math.round(cpBase*100)/100,
           cpAmt, total, basisQty: bq, perUnit, floors };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DISTRICT_RA_LIBRARY, raCompute };
}
