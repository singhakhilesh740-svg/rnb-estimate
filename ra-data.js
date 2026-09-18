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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.250 and curing complete including the cost of formwork and excluding reinforcement for reinforced concrete work in (A) Foundations, footings, and Mass concrete.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (d) columns Up to Plinth level.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in Columns, pillars posts and struts G.FLOOR",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in Ground & Plinth BEAMS",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-150 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in plinth Slab",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork and excluding reinforcement for reinforced concrete work in (C) Ground floor Beams,",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork and excluding reinforcement for reinforced concrete work in (C) Ground floor Slab",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork but excluding reinforcement for reinforced concrete work in (c) Chhajja for Ground floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing etc. complete including the cost of form work and reinforcement for reinforced concrete work in (c) Lintal for Ground floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing etc. complete including the cost of form work and excluding the cost of reinforcement etc. complete in (E) Stair case for Ground Floor to first floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete excluding the cost of formwork and reinforcement for reinforced concrete work in (B) Walls, from top of foundation level upto floor two level",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "SS railing",
            "longDesc": "Providing and fixing 90 cm high Stainless steel railing made from anticorrocive 304 grade S S pipe of 50 mm dia (16Gauge) as hand rail with S S 304 grade Baluster of 38 mm dia (16Gauge) as a vertical support fixed in RCC slab at 1.2m c/c including three horizontal S S pipes of 25 mm dia (16Gauge) at eqal distance fixed by 18.75 mm dia (16Gauge) S S pipe",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing TMT Bar 500D reinforcement for R.C.C. work including bending, binding and placing in position etc complete for All floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Plaster",
            "longDesc": "Providing 20 mm thick double coat mala cement plaster on interior brick / concrete work for plastering comprising of base coat of 12 mm thick cement plaster in cement mortar (1 Cement : 4 coarse sand) in rough finishing and 8 mm thick top coat of cement mortar 1:2 (1 Cement : 2 Coarse sand) finished with trovel including scaffolding curing etc. complete.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Plaster",
            "longDesc": "Providing 10 mm. Thick smooth cement plaster in single coat for plastering on ceiling and soffits of stairs and finished even and smooth in : (I) Cement mortar 1:4 (1 cement : 4 sand) with floting coat of neat cement slurry etc. complete. Ground Floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Filling",
            "longDesc": "Providing And filling with good quality cinder(steam coal) as directed by engineer in charge in sunks in layers of 15 cm thick,including watering,placing ,ramming well etc as directed, for all floor.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M-200 for RCC work and curing complete including the cost of form work but excluding the cost of reinforced concrete work in coping on Ground Floor",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Windows",
            "longDesc": "Providing and fixing Jindal E(30mm) series Four track alluminium window standerd extruded colour anodized aliminium section with Frame having frame bottom member Jindal Section no: 21198 @ wt. Of 3.197 Kg/Rmt , frame Side and top member Jindal Section no:21204 @ wt. Of 1.694 Kg/Rmt with sliding shutters of single glass shutter top bottom member Jindal Section no:20993 @ wt. Of 0.839 Kg/Rmt & side member Jinda Section no:20553 @ wt.of 0.731 Kg/Rmt & Inter lock member Jindal section no - 20553 @ wt.of 0.731 Kg/Rmt with 5 mm thick transparent plain float glass in shutter including fitting, fixtures, rubber gasket and transparent silicon sealant as per drawing and instruction of Engineer - in - charge etc. completed for window four track",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Windows",
            "longDesc": "Providing and fixing Jindal E(30mm) series Three track alluminium window standerd extruded colour anodized aliminium section with Frame having frame bottom member Jindal Section no: 21203 @ wt. Of 1.223 Kg/Rmt , frame Side and top member Jindal Section no:20837 @ wt. Of 1.685 Kg/Rmt with sliding shutters of single glass shutter top bottom member Jindal Section no:20993 @ wt. Of 0.839 Kg/Rmt & side member Jinda Section no:20553 @ wt.of 0.731 Kg/Rmt & Inter lock member Jindal section no - 20553 @ wt.of 0.731 Kg/Rmt with 5 mm thick transparent plain float glass in shutter including fitting, fixtures, rubber gasket and transparent silicon sealant as per drawing and instruction of Engineer - in - charge etc. completed for window three track",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Windows",
            "longDesc": "Providing and fixing Jindal E(30mm) series Two track alluminium window standerd extruded colour anodized aliminium section with Frame having frame bottom member Jindal Section no: 21217 @ wt. Of 1.502 Kg/Rmt , frame Side and top member Jindal Section no:20835 @ wt. Of 0.904 Kg/Rmt with sliding shutters of single glass shutter top bottom member Jindal Section no:20993 @ wt. Of 0.839 Kg/Rmt & side member Jinda Section no:20553 @ wt.of 0.731 Kg/Rmt & Inter lock member Jindal section no - 20553 @ wt.of 0.731 Kg/Rmt with 5 mm thick transparent plain float glass in shutter including fitting, fixtures, rubber gasket and transparent silicon sealant as per drawing and instruction of Engineer - in - charge etc. completed for window two track",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Windows",
            "longDesc": "Providing & Fixing in position standard extruded approved colour anodised Aluminum Ventilator with outer frame 63.50 x 38.10 x 1.95 mm (of Jindal Section No.4605,@ Wt 1.094 kg/Rmt ) with 3mm thick Bajari figure adgesteble tinted louvers glass fixed to alluminium strip blade including fixtures, fastenning, labours and equipments as per detailed drawing as directed. For Ventilators",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Doors",
            "longDesc": "Providing and fixing 50mm thick wooden door specially designed hollow two flush door shutter made from teak wood frame of size 7.5cm x 3.8cm with top, middle,bottom rails & vertical two styles & both side water proof ply wood of 6 mm thick. Pivoted the double shutter with requires teakwood batten with 1mm thick lamination on both side, one coat of primer & 77 two coats of enamel paints on frame & edges, design of which is to be approved by the architect. Door shall be providing with floor spring and 60cm long stainless steel handle and necessary Locking system of Godrej, fixtures & fastenings etc. directed by engineer in charge.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Doors",
            "longDesc": "Providing and fixing Factory made stamped IS 12623 grad one 35 mm thick Flush door Single shutters , solid core finished with requires teakwood batten around door including 1mm thick lamination on both side, one coat of primer & two coats of enamel paints on frame & edges, design of which is to be approved by the architect. Door shall be providing with S.S. Aldrop, Hinges , stainless steel handle 15cm long , stopper and necessary Locking system of Godrej, fixtures & fastenings etc. directed by engineer in charge.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Doors",
            "longDesc": "Providing and fixing FRP frame size 100 x 50 mm and 35 mm thick FRP depress panel single/Double shutter having extra reinforcement on sides & edges in Gel coat finish.The core of the shutter & frame is to be filed up with injected fire retradat grade polyurethene foam done in situ along with embeded wooden pieces for stiffening & also taking hinges & fintures.The whole FRP frame & shutter is to be waterproof, weatherproof ,termite proof & resistance to mild acid/alkali.Rates are to be inclusive of S.S hinges with necessary screws & alluminum fixtures & fastenings & fartener sleeve.Colour and Shade approved by Engineer-In-Charge.D5,",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Flooring",
            "longDesc": "Providing And Placing G.V.T 600mm x 600mm vitrified 9mm to 10mm thick tile for flooring over 20 mm (average) base of cement mortar 1:6 ( 1 cement: 6 coarse sand) and jointed with by adhesive materials including colour cement slurry including finished with flush pointing & cleaning the surface etc. complete for including two colour pattant colour approved by directed.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Flooring",
            "longDesc": "Providing And Placing G.V.T 600mm x 600mm vitrified 8 mm thick tile for Skirting or dedo laid on a bed of 12mm thick cement mortar 1:3 (1-cement : 3-coarse sand ) and jointed with by adhesive materials including colour cement slurry including finished with flush pointing & cleaning the surface etc. complete for including two colour pattant colour approved by directed.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Flooring",
            "longDesc": "Providing and Placing 300mm x 300mm Matt Finished Glazed tiles 9mm to 10mm thick tile for flooring over 20 mm (average) base of cement mortar 1:6 ( 1 cement: 6 coarse sand) including 3mm groove epoxy grouting filling ,jointed with by adhesive materials including colour cement slurry including finished with flush pointing & cleaning the surface etc. complete for including two colour pattant colour approved by directed.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Flooring",
            "longDesc": "Providing And Placing 300mm x 900mm Matt Finished Glazed tiles 9mm to 10mm thick tile for Skirting or dedo of laid on a bed of 12mm thick cement mortar 1:3 (1-cement : 3-coarse sand )and including 3mm groove epoxy grouting filling jointed with by adhesive materials including colour cement slurry including finished with flush pointing & cleaning the surface etc. complete for including two colour pattant colour approved by directed.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Stone work",
            "longDesc": "Providing and laying machine cut free edge machine polished Granite 18mm thick finished treads and risers 1cm projecting, nozing rounded moulding in tread laid over 12 mm (av.) thick bases of cement mortar 1:3 (1-cement : 3-coarse sand) jointed with grey or colour cement slurry including rubbing and polishing incl. making Three No.s of grooves of size 3mm X 3mm along the length of treads etc. complete",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Stone work",
            "longDesc": "Providing and fixing mirror polished 16 mm to 18 mm thick Granite stone with full round edge and polished of approved quality in clading on sill and around the doors/ windows/ ventilation with 20 mm thick cement plaster CM (1:3) and fixing with cement slurry & adhesive including moulding of exposed edges as directed by engineering in charge etc. complete.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Steel work",
            "longDesc": "Providing and fixing Safty grills of required pattern for windows/ Door using necessary 16mm dia M.S pipe, M.S flats and other structural steel at required spacing including cutting, welding and fabriction etc. including one coat of primer of approved quality and two coats of oil painting as per detail drawing etc complete.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Drainage",
            "longDesc": "Providing, laying and jointing in true line and level 75 mm dia. UPVC SWRType B pipe conforming to IS 13592-1992 with one end plain and other end socketed with rubbering and fitting conforming to ISI 14735-1999 of approved make for drainage system pipe line, pipe shall be jointed with each other with rubber lubricant, pipe shall be fixed on wall using of PVC clamp at every 2000 mm c/c or shall be conceled in walss as directed including necessary fittings such as bends, shoes etc. including testing of pipes and joints and jointed with adhesive solvent cement including cost of all materials. (F) 75mm Details of Cost of 1 RMT",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Drainage",
            "longDesc": "Providing and fixing in PVC SWR cowel went 75mm dia to pipes.(B) 75mm dia.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Drainage",
            "longDesc": "Providing and fixing in PVC SWR cowel went 110mm dia to pipes.(B) 110mm dia.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Providing and fixing wash down water closet (European type W C pan) with integral P and S trap including jointing the trap with soil pipe in cement mortar 1:1 (1 cement five sand) including providing and fixing plastic seat cover for wash down WC with CP brass hinges and rubber buffers back plastic seat and including providing and fixing PVC flushing tank with a pair of C I or MS bracket with complete fitting such as lead valve siphon 15 mm dia brass ball valve with polythene float CP brass handle unions and couplings for connection with inlet out let and over flow pipes 40 mm dia porcelain enameled flush bend including cutting holes in walls and making good the same connection the flush bend with cistern and closet vitreous china.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Provision and fixing water closet squatting orissa type W.C. pan size 580mm integral footrest and No. 100 mm P or S trap and in cluding 25 mm dia CP brass flush valve and GI inlet connection etc. comp. (A) Vitreous china long pattern white or color",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Providing and fixing ceramic table top or wall mount wash basin size 450 × 400 × 135 mm selected by directed engineer incharge, including polyamide braided connection pipe 12 mm dia, 450 mm length, 32 mm dia waste coupling with ceramic pop-up push type (full thread), complete with all inlet",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Providing and fixing Wall Mixer (3-in-1), chrome plated, including all fittings, fixtures, labour charges,",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Providing and fixing Angle Cock with wall flange, including all fittings, fixtures, labour charges, and all",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Stone platform",
            "longDesc": "Providing and fixing Wash Basin Platform with 15–18 mm thick polished Black Granite top, supported on 25 mm thick one-side polished Kota stone bottom slab and 25 mm thick vertical Kota stone supports at maximum 600 mm c/c, fixed with approved cement mortar/adhesive including making necessary grooves in walls, matching polished granite fascia/patti to conceal the supports, full moulded round front edge to the granite top, cutting, jointing with grey cement slurry, rubbing, polishing, edge finishing and all labour, materials, tools and incidentals, complete in all respects for all floors as directed by the Engineer-in- Charge.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Drainage",
            "longDesc": "Constructing brick masonry chamber for underground C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 precast RCC cover 455mm x 610mm intenal dimensions with frame (R.C.C. top slabe with 1:2:4 mix (1-cement :2- coarse sand :4-graded stone aggregate 20mm size) foundation concrete 1:5:10 inside plaster 15mm thick with cement mortar 1:3 finished smooth with a floating coat of neat cement on walls and bed concrete etc. complete (i) Inside dimensions 455mmx 610mm and 450mm deep for single pipe line.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Drainage",
            "longDesc": "Constructing brick masonry chamber for underground C.I. Inspection C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 precast RCC cover 500mmx 700mm intenal dimensions with frame (R.C.C. top slabe with 1:2:4 mix (1-cement :2- coarse sand :4-graded stone aggregate 20mm size) foundation concrete 1:5:10 inside plaster 15mm thick with cement mortar 1:3 finished smooth with a floating coat of neat cement on walls and bed concrete etc. complete (i) Inside dimensions 500mmx 700mm and 450mm deep for single pipe line.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Steel work",
            "longDesc": "Providing and fixing MS Ladder of required pattern with MS flats(30x3mm) or round or square bars (12mm) at required spacing & with round headed bolts and nuts or screws or welding including primer coat of approved quality and two coats of oil paintas as directed by engineer in charge",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Sanitary",
            "longDesc": "Providing and fixing Kitchen SS Sink Glosy ASIS 316 Grade x 1mm thick with over all size 610x460 mm & bowl size 560x410x200 including cutting holes in walls and making good the same including necessary fittings with 32mm dia C.P brass waste , 32mm dia M.I fisher union and Rubber plug Etc. completed",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Stone platform",
            "longDesc": "Constructing Sandwitch Platform of 15mm-18 mm thick Polished Black Granite at top and 25 mm thick Kota stone slab one side polished at bottom with cementing Materials / adhsives including makeing necessary grooves in walls with Vertical sandwich two Kotastone 25 mm support every 60 cm centre to centre covered with granite patti or as required including all labour material of approved quality incl. full moulded round front edge granite strip of one side polished and jointed with grey cement slurry including rubbing and polishing etc. complete for all floors L B",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Dewatering",
            "longDesc": "Providing, installing, operating, maintaining and removing dewatering arrangements for keeping excavation, foundation trenches, pits and work areas free from rainwater, groundwater and seepage during the entire construction period, using minimum 5 HP (or higher as required) submersible/centrifugal dewatering pumps complete with suction and delivery hoses, HDPE/GI pipes, standby pump, labour, fuel/electricity, shifting, maintenance, safe disposal of pumped water, dismantling and all incidental works, complete as directed by the Engineer-in-Charge.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Kitchen fittings",
            "longDesc": "Providing and fixing kitchen platform trolley having three drawers of SS (IS 304) of required size like thali, katleri, perforated, partition, cupsosar type in kitchen platform having drawer front side and backside by using 19mm thick all proof plywood of ISI quality all side laminated etc. as directed. The size of SS (IS 304) basket of size 4\" to 18\" for thali, dish, katleri, perforated, partition, cupsosar type as directed including necessary S.S. fittings, handles, nobs, telescopic channels, etc. as directed",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Gates",
            "longDesc": "Item Providing and fixing decorative entrance gate made out of cast iron No. and various mild steel tabular section combination , the Ornamental entrance gate should be fixed at compound wall including pattern and die making , cutting , welding , grinding, fabrication , fixing in position at compound wall with necessary pedestal, bearing block and other locking arrangement. The entrance gate should be painted with two coats of priming coat of paint, and two coat of oil paint etc complete. As per detail design and instruction of architect. No Qty Unit Amount",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Fencing",
            "longDesc": "Providing and fixing concertina coil fencing with punched tape concertina coil 600 mm dia 10 mt openable length having 50 no rounds per 6 mt length, upto 3mt height of wall with existing angle iron (50mm x50mm x5mm )requird shaped As per Directed Engeenier in charge. placed 2.4mt or 3.00mt apart and with 4 horizontal R.B.T. reinforced barbed wire(3 mm) , stud tied with G.I. staples and G.I. clips to retain horizontal, including necessary bolts or G.I.barbed wire tied to angle iron, all complete as per direction of Engineer-in-charge, with reinforced barbed tape (R.B.T.)/Spring core (2.5 mm thick) and weight 43.478 gm/meter at compound wall for ESR M4/ intakewell.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            "topic": "Fencing",
            "longDesc": "Constructing providing and fabricating cattle guard using channel section frame of size ISMC series 100 mm x 50 mm (Weight 9.20 kg/Rmt) and ISMC section 100 mm x 75mm (weight 11.50 kg/Rmt) intermediate support for welding G.I.pipe at 12 Cm C/C of size 50 mm in a frame made of Channel section size 100 mm x 50 mm all round including fixing the unit on prepared chamber of masonary wall using MS hold fast embeded in masonary wall top as directed by Engineer in charge and as per drawing and necessary required arrangement etc complete.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate"
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
            ],
            "longDesc": "Providing and laying brick work in super structure above plinth level up to floor two level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:6 (1 cement : 6 fine sand), including raking out joints, scaffolding, curing, all labour, materials, tools and plants, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying half brick masonry in super structure above plinth level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:4 (1 cement : 4 coarse sand), including scaffolding, curing, raking out joints and making good, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 150 mm wide G.I. chicken wire mesh of approved gauge over the junctions of brick masonry and R.C.C. members before plastering, fixed with galvanised nails / staples at required spacing, including cutting the mesh to required width, scaffolding and all labour, complete as directed by the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying broken china mosaic water proofing treatment over terrace using 12 mm to 20 mm broken pieces of glazed tiles laid over 40 mm average thick cement concrete 1:2:4 bedding mixed with approved water proofing compound at 1 kg per bag of cement, laid to required slope and tamped to bring cement creme to the surface, jointed with white cement, including rounding off junctions and extending 15 cm along the wall, cleaning with water and oxalic acid, curing and ponding test, complete as directed by the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying plinth protection with 60 mm thick inter-locking concrete paver blocks of approved shape, shade and strength, laid over 75 mm thick sand bed on 100 mm thick brick bat soling, edged with pre-cast cement concrete kerb stone of size 30 cm x 30 cm x 15 cm of M-250 grade, including excavation, levelling, dressing, compaction, filling the joints with fine sand and cement mortar 1:3, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position frameless toughened glass door of 12 mm to 18 mm thickness of approved make and quality, complete with stainless steel AISI 304 grade patch fittings, floor spring of approved make with cover plate, top and bottom patches, pivots, lock with strike plate, D-type handles, gaskets, all necessary hardware, cutting and making good the floor and walls, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position double shutter door comprising 38 mm thick solid core factory made flush door shutters of non-decorative type with block board core, fixed to polished granite door frame of approved shade and section, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position single shutter door comprising 38 mm thick solid core factory made flush door shutter of non-decorative type with block board core, fixed to polished granite door frame of approved shade and section, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 25 mm thick polished Kota stone shelf of approved shade, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting grooves in the wall for bearing, moulding and rounding of exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical surfaces such as walls of any thickness, partitions and the like including attached buttresses and string course, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position 120 cm high stainless steel railing of AISI 316 grade, comprising 50 mm dia. top hand rail, 38 mm dia. vertical balusters, 25 mm dia. horizontal members and 18.75 mm dia. supporting pipes, with decorative stainless steel ball at ends, all pipes of approved gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, including base plates, anchor fasteners, grouting, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            },
            "longDesc": "Providing 15 mm thick mala cement plaster in cement mortar 1:4 (1 cement : 4 coarse sand) on interior brick / concrete surfaces, finished with trowel to an even and smooth surface, including neat cement floating, scaffolding, curing, raking of joints and making good around openings, at all floors, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing white vitreous china wash-down type European water closet of approved make with P or S trap, complete with I.S.I. marked P.V.C. flushing tank with fittings, solid plastic seat and cover with C.P. hinges, health faucet / jet spray with stainless steel flexible hose and wall hook, C.P. angle cock, connection pipes, bolts, nuts, rubber gasket, cutting and making good the walls and floors, testing and commissioning, complete as per direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position G.I. ladder made of G.I. flats and round bars of required section and spacing, welded joints ground smooth, fixed to wall with clamps and anchor fasteners, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing service platform comprising 18 mm thick machine cut mirror polished black granite top supported on 25 mm thick polished Kota stone vertical supports, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting the slab to required size and shape, necessary cut-outs, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid and curing, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position foldable steel entrance gate made of M.S. hollow rectangular / square sections for frame and bracing, with M.S. sheet infill panels as required, including one integrated hinged wicket gate (single leaf type) of size approximately 1.0 M width. The gate shall be of bi-fold type with two folding leaves on either side of the central existing R.C.C. column, making a total of four panels, complete with all necessary hardware such as hinges, pivot rollers, top and bottom guide rails, stoppers, locking arrangements, tower bolts, handles and latches. The entire surface shall be cleaned, welded joints ground smooth, and given a coat of red oxide zinc chromate primer and two or more coats of approved synthetic enamel paint of desired shade. All work shall be completed as per drawing, manufacturer’s specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 1.20 metre high fencing with 2.0 metre long M.S. angle posts of size 40 mm x 40 mm x 6 mm, oil painted in three coats and fixed at 2.5 M centre to centre, with five horizontal lines and two diagonals of galvanised steel barbed wire weighing 9.38 kg per 100 metre, strained and fixed to posts with G.I. staples, including fixing the posts in ground in 0.5 M x 0.5 M x 0.5 M block of cement concrete 1:5:10, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-150 and curing complete, for reinforced concrete work in foundations, footings, bases of columns and mass concrete, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in foundations, footings, bases of columns and mass concrete, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying cement concrete 1:4:8 (1 Cement : 4 coarse sand : 8 hand broken stone aggregate 40 mm nominal size) and curing complete, in foundation and plinth, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for chullah hoods, weather shades, chhajjas, corbels etc. including edges, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical fins and vertical sun breakers, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for flat surfaces such as soffits of suspended floor/roof slabs and landings up to 200 mm in thickness, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in staircases excluding landing, up to floor two level, including cost of form work of ordinary timber planking for staircase with sloping or stepped soffits including risers and stringers, excluding landing, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing TMT bar Fe-500D reinforcement of approved make conforming to IS 1786 for R.C.C. work, including straightening, cutting, bending, binding with 18 gauge annealed binding wire, providing cover blocks and placing in position at all levels and all floors, including extra lift above floor two level, complete as per bar bending schedule, drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying brick work in super structure above plinth level up to floor two level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:6 (1 cement : 6 fine sand), including raking out joints, scaffolding, curing, all labour, materials, tools and plants, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying half brick masonry in super structure above plinth level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:4 (1 cement : 4 coarse sand), including scaffolding, curing, raking out joints and making good, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing 20 mm thick double coat mala cement plaster on interior brick / concrete surfaces comprising base coat of 12 mm thick cement plaster in cement mortar 1:4 (1 cement : 4 coarse sand) in rough finish and 8 mm thick top coat of cement mortar 1:2 (1 cement : 2 coarse sand) finished with trowel, including floating coat, scaffolding, curing, raking of joints and making good around openings, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing 10 mm thick cement plaster in single coat in cement mortar 1:3 (1 cement : 3 sand) on ceilings and soffits of stairs, finished even and smooth with neat cement floating coat, including scaffolding, curing and making good, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing water proofing treatment to sunken portions of toilets / bathrooms by laying cement concrete 1:2:4 (1 cement : 2 coarse sand : 4 graded stone aggregate 20 mm nominal size) of 50 mm average thickness mixed with approved water proofing compound, laid to required slope, including surface preparation, cleaning, brick bat coba where directed, curing and ponding test, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing 20 mm thick sand faced cement plaster on external walls up to a height of 10 metres above ground level, consisting of 12 mm thick backing coat of cement mortar 1:3 (1 cement : 3 sand) and 8 mm thick finishing coat of cement mortar 1:1 (1 cement : 1 sand), with 1 cm x 1 cm grooves formed at required locations as per drawing, including scaffolding, curing, raking of joints and making good, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position M.S. factory fabricated double shutter entrance door made of M.S. hollow rectangular / square sections for frame and bracing with M.S. sheet infill panels of approved gauge, welded joints ground smooth, complete with all necessary hardware such as hinges, pivot rollers, guide rails, stoppers, locking arrangement, tower bolts and handles, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position anodised aluminium single shutter door comprising 35 mm thick flush shutter with aluminium framing of approved section and shade, including anodised aluminium hinges, mortice lock, handles, tower bolts, door stopper, gaskets, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position circular window with three track powder coated aluminium frame and shutters of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position two track anodised / powder coated aluminium sliding window with fixed glazing panel, of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut both side mirror polished black granite slab of approved shade on window sills and jambs, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting to required size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position safety grill made of M.S. square / round bars at required spacing with C.R.C. frame all round, fixed with round headed bolts and nuts or screws, welded joints ground smooth, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying broken china mosaic water proofing treatment over terrace using 12 mm to 20 mm broken pieces of glazed tiles laid over 50 mm average thick cement concrete 1:2:4 bedding mixed with approved water proofing compound, laid to required slope and tamped to bring cement creme to the surface, jointed with white cement, including rounding off junctions and extending 15 cm along the wall, cleaning with water and oxalic acid, curing and ponding test, complete as directed by the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut double side mirror polished granite slab of approved shade as partition, fixed in position with stainless steel / M.S. framing, anchor fasteners and adhesive as required, including cutting to size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position 90 cm high stainless steel railing of AISI 304 grade comprising top hand rail, vertical balusters and horizontal members of approved dia. and gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, including base plates, anchor fasteners, grouting, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing white vitreous china table top wash basin of size 610 mm x 450 mm of approved make, including C.P. pillar cock, pop-up waste, bottle trap, C.P. connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing stainless steel AISI 304 grade kitchen sink of size 610 mm x 460 mm of approved make, including waste coupling, bottle trap, C.P. connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing white vitreous china wall hung European type water closet of approved make, complete with concealed cistern and push valve / flush plate of approved make, wall mounting frame and brackets, solid plastic seat and cover with C.P. hinges, health faucet with flexible hose, C.P. angle cock, connection pipes, bolts, nuts, rubber gasket, cutting and making good the walls and floors, testing and commissioning, complete as per direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing complete set of sanitary fittings for handicap / divyang toilet of approved make (CERA Cruise set or equivalent), comprising wall hung water closet with concealed cistern, wash basin with fittings, stainless steel grab bars, folding support rails, mirror, health faucet, C.P. fittings and all accessories, including cutting and making good the walls and floors, testing and commissioning, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing white vitreous china wall hung urinal of approved make, complete with flush valve / sensor flushing arrangement, C.P. spreader, waste coupling, bottle trap, connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing sandwich type platform comprising machine cut mirror polished granite top supported on polished Kota stone vertical supports, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting the slab to required size and shape, necessary cut-outs, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid and curing, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position railing made of M.S. square pipe sections of approved size and gauge for hand rail, balusters and horizontal members, welded joints ground smooth, fixed with base plates and anchor fasteners, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying glossy glazed vitrified tile (GVT) flooring using 600 mm x 600 mm tiles of approved make, shade and first quality, laid over 20 mm thick base of cement mortar 1:4 (1 cement : 4 coarse sand), jointed with white cement slurry mixed with matching pigment, including cutting, rubbing, cleaning with oxalic acid, curing and removal of debris, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing glazed vitrified tile (GVT) skirting, risers and dado of approved make, shade and first quality, set over 12 mm thick backing of cement mortar 1:3 (1 cement : 3 fine sand), jointed with white cement slurry mixed with matching pigment, including cutting, rubbing, cleaning with oxalic acid, curing and scaffolding, complete as per specification and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing wall signage made of 1.5 mm thick stainless steel AISI 304 grade laser cut letters / symbols of approved font, size and finish, fixed to wall with concealed studs, spacers and adhesive as required, including drilling, making good the wall surface, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Constructing soak pit of 2.28 metre internal diameter and 6.5 metre depth, including excavation in all kinds of soil, brick masonry honey comb lining in cement mortar, filling with graded brick bats and stone metal, R.C.C. cover slab with frame, inlet arrangement, backfilling and disposal of surplus excavated material, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Constructing septic tank of internal size 4.95 m x 1.98 m x 2.5 m including excavation in all kinds of soil, cement concrete foundation bed, brick masonry walls in cement mortar, internal and external plastering with water proofing compound, R.C.C. top slab with manhole covers and frames, baffle walls, inlet and outlet arrangement with pipes and tees, vent pipe with cowl, backfilling and disposal of surplus excavated material, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing, fabricating and fixing in position stainless steel AISI 304 grade hand railing of 32 mm diameter pipe of approved gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, fixed to wall / floor with brackets, base plates and anchor fasteners, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing G.I. chicken wire mesh of approved width and gauge over the junctions of brick masonry and R.C.C. members before plastering, fixed with galvanised nails / staples at required spacing, including cutting the mesh to required width, scaffolding and all labour, complete as directed by the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position anodised aluminium ventilator of size approximately 65 cm x 25 cm of approved section and shade, fitted with glass / aluminium louvres, including louvre clips, frame, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 114 mm wide G.I. louvers of 0.55 mm thickness of approved make and profile, fixed to frame with necessary clips, screws and supporting members, including cutting to required size, priming and painting where directed, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical surfaces such as walls of any thickness, partitions and the like including attached buttresses and string course, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)"
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
            ],
            "longDesc": "Providing and fixing in position single shutter door with green marble door frame of approved shade and section, with 38 mm thick solid core flush shutter, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position circular window with three track anodised / powder coated aluminium frame and shutters of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing in position two track anodised / powder coated aluminium sliding window of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge."
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut polished green marble slab of approved shade on window sills and jambs, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting to required size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge."
        },
        {
            "id": "lib_117",
            "libNo": "117",
            "itemNo": "3",
            "topic": "Water supply",
            "desc": "Water supply — 160 mm dia LDPE pipe, 10 kgf/cm2, fixed to wall / ceiling / floor",
            "longDesc": "Providing and fixing to wall ceiling and floor 10.0 Kg. F/Cm2 working pressure poluthene pipes of the following outside Dia. Low densidy, complete with special falnge compression type fittings, wall clipsetc. including making good the wall ceiling and floor.(G)160 mm",
            "unit": "Rmt",
            "basis": "Per 1.00 R.mt.",
            "basisQty": 1.0,
            "cp": 10,
            "pdfRate": 660.0,
            "floors": false,
            "source": "E-2 Type (Principal Judge Family Court, Dahod) estimate RA-49",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "160 mm dia polythene pipe, 10 kgf/cm2, low density",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 550.0,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge for fixing with flange compression fittings & wall clips",
                    "unit": "Rmt",
                    "qty": 1.0,
                    "rate": 50.0,
                    "cpApply": true
                }
            ]
        },
        {
            "id": "lib_118",
            "libNo": "118",
            "itemNo": "4",
            "topic": "Drainage",
            "desc": "Drainage — Rain water junction chamber 0.60 × 0.60 × 0.75 m with C.I. manhole cover",
            "longDesc": "Providing junction for rain water juncton chamber of size 0.60x0.60x0.75m with excavation of size 1.96x1.96 m & 0.15m thick c.c.1:2:4 bed concrete including brick masonary wall in CM 1:6 of 0.75m height & 0.23m thick with 15mm thick cement plaster inside & outside & 1.06x1.06 RCC (1:2:4) slab of thickness 0.15m with CRS steel and 0.60mx0.45m cast iron manhole cover with frame weight not less than 35 kg as per directed by Engineer-in-charge.",
            "unit": "No",
            "basis": "Per 1.00 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8611.0,
            "floors": false,
            "source": "E-2 Type (Principal Judge Family Court, Dahod) estimate RA-50",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "04B001A",
                    "page": "36",
                    "label": "Excavation for chamber 1.96 × 1.96 × 1.00 m",
                    "unit": "Cum",
                    "qty": 3.84,
                    "rate": 210.42,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "05010A",
                    "page": "38",
                    "label": "Providing & laying C.C. 1:2:4 in bed concrete and top slab (less C.I. cover)",
                    "unit": "Cum",
                    "qty": 0.703,
                    "rate": 3617.44,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "06002C",
                    "page": "53",
                    "label": "Brick masonry in C.M. 1:6, 0.23 m thick, 0.75 m height",
                    "unit": "Cum",
                    "qty": 0.78,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "17002B",
                    "page": "103",
                    "label": "15 mm thick cement plaster 1:4 inside & outside",
                    "unit": "Sqm",
                    "qty": 5.62,
                    "rate": 177.78,
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
