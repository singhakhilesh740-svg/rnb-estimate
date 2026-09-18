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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2.0,
                            "l": 2.0,
                            "b": 2.4,
                            "d": 0.25,
                            "qty": 2.4,
                            "unit": ""
                        },
                        {
                            "label": "",
                            "nos": 2.0,
                            "l": 2.0,
                            "b": 2.1,
                            "d": 0.25,
                            "qty": 2.1,
                            "unit": ""
                        },
                        {
                            "label": "",
                            "nos": 2.0,
                            "l": 2.0,
                            "b": 1.8,
                            "d": 0.25,
                            "qty": 1.8,
                            "unit": ""
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 2.4,
                    "b": 2.4,
                    "d": 0.25,
                    "qty": 1.44,
                    "unit": ""
                },
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 2.1,
                    "b": 2.1,
                    "d": 0.25,
                    "qty": 1.1,
                    "unit": ""
                },
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.8,
                    "b": 1.8,
                    "d": 0.25,
                    "qty": 0.81,
                    "unit": ""
                }
            ],
            "basisNote": "Considering Column footing Quantity"
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": "",
                            "l": 2.0,
                            "b": 0.3,
                            "d": 3.15,
                            "qty": 1.89,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": "",
                            "l": 2.0,
                            "b": 0.75,
                            "d": 3.15,
                            "qty": 4.73,
                            "unit": "Sqm"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.3,
                    "b": 0.75,
                    "d": 3.15,
                    "qty": 0.71,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.3,
                    "b": 0.75,
                    "d": 4.5,
                    "qty": 1.01,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": "",
                            "l": 2.0,
                            "b": 5.0,
                            "d": 0.75,
                            "qty": 7.5,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": "",
                            "l": 2.0,
                            "b": 0.3,
                            "d": 0.75,
                            "qty": 0.45,
                            "unit": "Sqm"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 5.0,
                    "b": 0.3,
                    "d": 0.75,
                    "qty": 1.13,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2.0,
                            "l": 2.0,
                            "b": 1.0,
                            "d": 0.1,
                            "qty": 0.4,
                            "unit": "Sqm"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.0,
                    "b": 1.0,
                    "d": 0.1,
                    "qty": 0.1,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 4.0,
                    "b": 0.3,
                    "d": 0.6,
                    "qty": 0.72,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 3.0,
                    "b": 3.0,
                    "d": 0.15,
                    "qty": 1.35,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 2.0,
                    "b": 0.45,
                    "d": 0.1,
                    "qty": 0.09,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.2,
                    "b": 0.23,
                    "d": 0.15,
                    "qty": 0.0414,
                    "unit": ""
                }
            ],
            "basisNote": "Considering quantity of concrete as under"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.63,
                    "unit": "Cum"
                }
            ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Form work req",
                            "nos": "",
                            "l": 2.0,
                            "b": 2.5,
                            "d": 2.5,
                            "qty": 12.5,
                            "unit": ""
                        },
                        {
                            "label": "",
                            "nos": "",
                            "l": 2.0,
                            "b": 2.5,
                            "d": 0.23,
                            "qty": 1.15,
                            "unit": ""
                        }
                    ]
                }
            ],
            "topic": "RCC",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete excluding the cost of formwork and reinforcement for reinforced concrete work in (B) Walls, from top of foundation level upto floor two level",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.44,
                    "unit": "Cum"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 3.5,
                    "unit": "Rmt"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Kg"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 10.0,
                    "unit": "Cum"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Assume copping size 0.30 x 0.15",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "consider window size",
                    "nos": "",
                    "l": 1.0,
                    "b": 1.8,
                    "d": 1.2,
                    "qty": 2.16,
                    "unit": ""
                }
            ],
            "basisNote": "consider window size 1.0 1.80 1.2 2.16 sq"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "consider window size",
                    "nos": "",
                    "l": 1.0,
                    "b": 1.35,
                    "d": 1.2,
                    "qty": 1.62,
                    "unit": "sqm"
                }
            ],
            "basisNote": "consider window size 1.0 1.35 1.2 1.62 sqmt"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "consider window size",
                    "nos": "",
                    "l": 1.0,
                    "b": 1.2,
                    "d": 1.1,
                    "qty": 1.32,
                    "unit": "sqm"
                }
            ],
            "basisNote": "consider window size 1.0 1.20 1.1 1.32 sqmt"
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
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "louvers =",
                            "nos": "",
                            "l": 21.0,
                            "b": 0.6,
                            "d": 0.1,
                            "qty": 1.26,
                            "unit": ""
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Considering alluminium ventilation size 1.8 x 0.75Mt.",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.35,
                    "unit": "Sqm"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Door size",
                    "nos": "",
                    "l": "",
                    "b": 2.4,
                    "d": 2.4,
                    "qty": 5.76,
                    "unit": "SqM"
                }
            ],
            "basisNote": "Door size 2.4 2.4 5.76 SqM"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Considering size of",
                    "nos": "",
                    "l": "",
                    "b": 1.0,
                    "d": 2.1,
                    "qty": 2.1,
                    "unit": "SqM"
                }
            ],
            "basisNote": "Considering size of 1.00 2.10 2.10 SqM"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Rate for",
                            "nos": "",
                            "l": "",
                            "b": 1.0,
                            "d": 1.0,
                            "qty": 1.0,
                            "unit": "SqM"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Rate for 1.00 1.00 1.00 SqM",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Rate for",
                            "nos": "",
                            "l": "",
                            "b": 1.0,
                            "d": 1.0,
                            "qty": 1.0,
                            "unit": ""
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 1.0,
                    "d": 1.0,
                    "qty": 1.0,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 1.00 1.00 1.00"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 1.0,
                    "d": 1.0,
                    "qty": 1.0,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 1.00 1.00 1.00"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 1.0,
                    "d": 1.0,
                    "qty": 1.0,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 1.00 1.00 1.00"
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
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "Rate for",
                            "nos": "",
                            "l": "",
                            "b": 0.71,
                            "d": 0.12,
                            "qty": 0.09,
                            "unit": "Cmt"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 1.5,
                    "d": 0.3,
                    "qty": 0.45,
                    "unit": ""
                },
                {
                    "label": "",
                    "nos": "",
                    "l": "",
                    "b": 1.5,
                    "d": 0.15,
                    "qty": 0.23,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 1.50 0.30 0.45"
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
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "=",
                            "nos": "",
                            "l": "",
                            "b": 2.0,
                            "d": 3.0,
                            "qty": 6.0,
                            "unit": ""
                        },
                        {
                            "label": "Vertical =",
                            "nos": "",
                            "l": "",
                            "b": 2.0,
                            "d": 1.2,
                            "qty": 2.4,
                            "unit": ""
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 2.52,
                    "unit": "Sqm"
                }
            ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "[ ] Cost of Grill Rs /",
                            "nos": 1.0,
                            "l": 20.0,
                            "b": 109.22,
                            "d": 2184.4,
                            "qty": 20.0,
                            "unit": "Kg"
                        }
                    ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Assume 20.00 Kg/Sq m. Weight",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 20.0,
                    "unit": "Kg"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Rmt"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Consider 1.00 Nos",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Consider For 1.00 Nos",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Hori =",
                            "nos": "",
                            "l": "",
                            "b": 1.0,
                            "d": 3.75,
                            "qty": 3.75,
                            "unit": ""
                        },
                        {
                            "label": "Hori =",
                            "nos": "",
                            "l": "",
                            "b": 2.0,
                            "d": 0.75,
                            "qty": 1.5,
                            "unit": ""
                        },
                        {
                            "label": "Vertical =",
                            "nos": "",
                            "l": 1.0,
                            "b": 2.0,
                            "d": 1.2,
                            "qty": 2.4,
                            "unit": ""
                        }
                    ]
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
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Hori =",
                            "nos": "",
                            "l": "",
                            "b": 2.0,
                            "d": 0.75,
                            "qty": 1.5,
                            "unit": ""
                        }
                    ]
                }
            ],
            "topic": "Stone platform",
            "longDesc": "Providing and fixing Wash Basin Platform with 15–18 mm thick polished Black Granite top, supported on 25 mm thick one-side polished Kota stone bottom slab and 25 mm thick vertical Kota stone supports at maximum 600 mm c/c, fixed with approved cement mortar/adhesive including making necessary grooves in walls, matching polished granite fascia/patti to conceal the supports, full moulded round front edge to the granite top, cutting, jointing with grey cement slurry, rubbing, polishing, edge finishing and all labour, materials, tools and incidentals, complete in all respects for all floors as directed by the Engineer-in- Charge.",
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 2.0,
                    "d": 0.75,
                    "qty": 1.5,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 2.00 x 0.75 = 1.5"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisNote": "Rate for 25.00 Kg 3005.32",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 25.0,
                    "unit": "Kg"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": 3.75,
                    "d": 0.75,
                    "qty": 2.81,
                    "unit": ""
                }
            ],
            "basisNote": "Rate for 3.75 x 0.75 = 2.81"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Day"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "=",
                    "nos": "",
                    "l": "",
                    "b": 0.6,
                    "d": 0.75,
                    "qty": 0.45,
                    "unit": "Sqm"
                }
            ],
            "basisNote": "Considering size of one shutters with three basket"
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Kg"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 103.0,
                    "unit": "Rmt"
                }
            ]
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
            "source": " | Description as per E-2 Type (Principal Judge Family Court, Dahod) estimate",
            "origin": "E-2 Type Family Court",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 9.0,
                    "unit": "Sqm"
                }
            ]
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
            "longDesc": "Providing and laying brick work in super structure above plinth level up to floor two level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:6 (1 cement : 6 fine sand), including raking out joints, scaffolding, curing, all labour, materials, tools and plants, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-15",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying half brick masonry in super structure above plinth level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:4 (1 cement : 4 coarse sand), including scaffolding, curing, raking out joints and making good, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-16",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 150 mm wide G.I. chicken wire mesh of approved gauge over the junctions of brick masonry and R.C.C. members before plastering, fixed with galvanised nails / staples at required spacing, including cutting the mesh to required width, scaffolding and all labour, complete as directed by the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-17",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and laying broken china mosaic water proofing treatment over terrace using 12 mm to 20 mm broken pieces of glazed tiles laid over 40 mm average thick cement concrete 1:2:4 bedding mixed with approved water proofing compound at 1 kg per bag of cement, laid to required slope and tamped to bring cement creme to the surface, jointed with white cement, including rounding off junctions and extending 15 cm along the wall, cleaning with water and oxalic acid, curing and ponding test, complete as directed by the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-20",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and laying plinth protection with 60 mm thick inter-locking concrete paver blocks of approved shape, shade and strength, laid over 75 mm thick sand bed on 100 mm thick brick bat soling, edged with pre-cast cement concrete kerb stone of size 30 cm x 30 cm x 15 cm of M-250 grade, including excavation, levelling, dressing, compaction, filling the joints with fine sand and cement mortar 1:3, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-21",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position frameless toughened glass door of 12 mm to 18 mm thickness of approved make and quality, complete with stainless steel AISI 304 grade patch fittings, floor spring of approved make with cover plate, top and bottom patches, pivots, lock with strike plate, D-type handles, gaskets, all necessary hardware, cutting and making good the floor and walls, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-24",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position double shutter door comprising 38 mm thick solid core factory made flush door shutters of non-decorative type with block board core, fixed to polished granite door frame of approved shade and section, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-25",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position single shutter door comprising 38 mm thick solid core factory made flush door shutter of non-decorative type with block board core, fixed to polished granite door frame of approved shade and section, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-26",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 25 mm thick polished Kota stone shelf of approved shade, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting grooves in the wall for bearing, moulding and rounding of exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-39",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical surfaces such as walls of any thickness, partitions and the like including attached buttresses and string course, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "Vet. Polyclinic RA-42",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position 120 cm high stainless steel railing of AISI 316 grade, comprising 50 mm dia. top hand rail, 38 mm dia. vertical balusters, 25 mm dia. horizontal members and 18.75 mm dia. supporting pipes, with decorative stainless steel ball at ends, all pipes of approved gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, including base plates, anchor fasteners, grouting, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-14",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 3.5,
                    "unit": "Rmt"
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
            },
            "longDesc": "Providing 15 mm thick mala cement plaster in cement mortar 1:4 (1 cement : 4 coarse sand) on interior brick / concrete surfaces, finished with trowel to an even and smooth surface, including neat cement floating, scaffolding, curing, raking of joints and making good around openings, at all floors, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-18",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
            "longDesc": "Providing and fixing white vitreous china wash-down type European water closet of approved make with P or S trap, complete with I.S.I. marked P.V.C. flushing tank with fittings, solid plastic seat and cover with C.P. hinges, health faucet / jet spray with stainless steel flexible hose and wall hook, C.P. angle cock, connection pipes, bolts, nuts, rubber gasket, cutting and making good the walls and floors, testing and commissioning, complete as per direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-34",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position G.I. ladder made of G.I. flats and round bars of required section and spacing, welded joints ground smooth, fixed to wall with clamps and anchor fasteners, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-37",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 25.0,
                    "unit": "Kg"
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
            ],
            "longDesc": "Providing and fixing service platform comprising 18 mm thick machine cut mirror polished black granite top supported on 25 mm thick polished Kota stone vertical supports, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting the slab to required size and shape, necessary cut-outs, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid and curing, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-38",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position foldable steel entrance gate made of M.S. hollow rectangular / square sections for frame and bracing, with M.S. sheet infill panels as required, including one integrated hinged wicket gate (single leaf type) of size approximately 1.0 M width. The gate shall be of bi-fold type with two folding leaves on either side of the central existing R.C.C. column, making a total of four panels, complete with all necessary hardware such as hinges, pivot rollers, top and bottom guide rails, stoppers, locking arrangements, tower bolts, handles and latches. The entire surface shall be cleaned, welded joints ground smooth, and given a coat of red oxide zinc chromate primer and two or more coats of approved synthetic enamel paint of desired shade. All work shall be completed as per drawing, manufacturer’s specification and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-41",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 1.20 metre high fencing with 2.0 metre long M.S. angle posts of size 40 mm x 40 mm x 6 mm, oil painted in three coats and fixed at 2.5 M centre to centre, with five horizontal lines and two diagonals of galvanised steel barbed wire weighing 9.38 kg per 100 metre, strained and fixed to posts with G.I. staples, including fixing the posts in ground in 0.5 M x 0.5 M x 0.5 M block of cement concrete 1:5:10, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "Vet. Polyclinic RA-41A",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Rmt"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-150 and curing complete, for reinforced concrete work in foundations, footings, bases of columns and mass concrete, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-1",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in foundations, footings, bases of columns and mass concrete, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-2",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-3",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying cement concrete 1:4:8 (1 Cement : 4 coarse sand : 8 hand broken stone aggregate 40 mm nominal size) and curing complete, in foundation and plinth, including cost of form work of ordinary timber planking for foundations, footings, bases of columns and mass concrete, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-4",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-5",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-6",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-7",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-8",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for chullah hoods, weather shades, chhajjas, corbels etc. including edges, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-9",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical fins and vertical sun breakers, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-10",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for flat surfaces such as soffits of suspended floor/roof slabs and landings up to 200 mm in thickness, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-11",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete, for reinforced concrete work in staircases excluding landing, up to floor two level, including cost of form work of ordinary timber planking for staircase with sloping or stepped soffits including risers and stringers, excluding landing, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — School RA-12",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing TMT bar Fe-500D reinforcement of approved make conforming to IS 1786 for R.C.C. work, including straightening, cutting, bending, binding with 18 gauge annealed binding wire, providing cover blocks and placing in position at all levels and all floors, including extra lift above floor two level, complete as per bar bending schedule, drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-13",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Kg"
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
            ],
            "longDesc": "Providing and laying brick work in super structure above plinth level up to floor two level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:6 (1 cement : 6 fine sand), including raking out joints, scaffolding, curing, all labour, materials, tools and plants, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-14",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying half brick masonry in super structure above plinth level using common burnt clay conventional building bricks having crushing strength not less than 35 kg/Sq.Cm. in cement mortar 1:4 (1 cement : 4 coarse sand), including scaffolding, curing, raking out joints and making good, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-15",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing 20 mm thick double coat mala cement plaster on interior brick / concrete surfaces comprising base coat of 12 mm thick cement plaster in cement mortar 1:4 (1 cement : 4 coarse sand) in rough finish and 8 mm thick top coat of cement mortar 1:2 (1 cement : 2 coarse sand) finished with trowel, including floating coat, scaffolding, curing, raking of joints and making good around openings, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-16",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing 10 mm thick cement plaster in single coat in cement mortar 1:3 (1 cement : 3 sand) on ceilings and soffits of stairs, finished even and smooth with neat cement floating coat, including scaffolding, curing and making good, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-17",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing water proofing treatment to sunken portions of toilets / bathrooms by laying cement concrete 1:2:4 (1 cement : 2 coarse sand : 4 graded stone aggregate 20 mm nominal size) of 50 mm average thickness mixed with approved water proofing compound, laid to required slope, including surface preparation, cleaning, brick bat coba where directed, curing and ponding test, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-18",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing 20 mm thick sand faced cement plaster on external walls up to a height of 10 metres above ground level, consisting of 12 mm thick backing coat of cement mortar 1:3 (1 cement : 3 sand) and 8 mm thick finishing coat of cement mortar 1:1 (1 cement : 1 sand), with 1 cm x 1 cm grooves formed at required locations as per drawing, including scaffolding, curing, raking of joints and making good, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-19",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position M.S. factory fabricated double shutter entrance door made of M.S. hollow rectangular / square sections for frame and bracing with M.S. sheet infill panels of approved gauge, welded joints ground smooth, complete with all necessary hardware such as hinges, pivot rollers, guide rails, stoppers, locking arrangement, tower bolts and handles, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-20",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position anodised aluminium single shutter door comprising 35 mm thick flush shutter with aluminium framing of approved section and shade, including anodised aluminium hinges, mortice lock, handles, tower bolts, door stopper, gaskets, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-21",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position circular window with three track powder coated aluminium frame and shutters of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-22",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position two track anodised / powder coated aluminium sliding window with fixed glazing panel, of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-23",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut both side mirror polished black granite slab of approved shade on window sills and jambs, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting to required size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-24",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position safety grill made of M.S. square / round bars at required spacing with C.R.C. frame all round, fixed with round headed bolts and nuts or screws, welded joints ground smooth, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-25",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 20.0,
                    "unit": "Kg"
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
            ],
            "longDesc": "Providing and laying broken china mosaic water proofing treatment over terrace using 12 mm to 20 mm broken pieces of glazed tiles laid over 50 mm average thick cement concrete 1:2:4 bedding mixed with approved water proofing compound, laid to required slope and tamped to bring cement creme to the surface, jointed with white cement, including rounding off junctions and extending 15 cm along the wall, cleaning with water and oxalic acid, curing and ponding test, complete as directed by the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-26",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut double side mirror polished granite slab of approved shade as partition, fixed in position with stainless steel / M.S. framing, anchor fasteners and adhesive as required, including cutting to size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-27",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position 90 cm high stainless steel railing of AISI 304 grade comprising top hand rail, vertical balusters and horizontal members of approved dia. and gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, including base plates, anchor fasteners, grouting, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-28",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Rmt"
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
            ],
            "longDesc": "Providing and fixing white vitreous china table top wash basin of size 610 mm x 450 mm of approved make, including C.P. pillar cock, pop-up waste, bottle trap, C.P. connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-29",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing and fixing stainless steel AISI 304 grade kitchen sink of size 610 mm x 460 mm of approved make, including waste coupling, bottle trap, C.P. connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-30",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing and fixing white vitreous china wall hung European type water closet of approved make, complete with concealed cistern and push valve / flush plate of approved make, wall mounting frame and brackets, solid plastic seat and cover with C.P. hinges, health faucet with flexible hose, C.P. angle cock, connection pipes, bolts, nuts, rubber gasket, cutting and making good the walls and floors, testing and commissioning, complete as per direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-31",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing and fixing complete set of sanitary fittings for handicap / divyang toilet of approved make (CERA Cruise set or equivalent), comprising wall hung water closet with concealed cistern, wash basin with fittings, stainless steel grab bars, folding support rails, mirror, health faucet, C.P. fittings and all accessories, including cutting and making good the walls and floors, testing and commissioning, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-32",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing and fixing white vitreous china wall hung urinal of approved make, complete with flush valve / sensor flushing arrangement, C.P. spreader, waste coupling, bottle trap, connection pipes with angle cock, brackets / clamps, cutting and making good the walls, testing and commissioning, complete as per direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-33",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing and fixing sandwich type platform comprising machine cut mirror polished granite top supported on polished Kota stone vertical supports, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting the slab to required size and shape, necessary cut-outs, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid and curing, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-34",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position railing made of M.S. square pipe sections of approved size and gauge for hand rail, balusters and horizontal members, welded joints ground smooth, fixed with base plates and anchor fasteners, and given one coat of red oxide zinc chromate primer and two coats of approved synthetic enamel paint of desired shade, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-35",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and laying glossy glazed vitrified tile (GVT) flooring using 600 mm x 600 mm tiles of approved make, shade and first quality, laid over 20 mm thick base of cement mortar 1:4 (1 cement : 4 coarse sand), jointed with white cement slurry mixed with matching pigment, including cutting, rubbing, cleaning with oxalic acid, curing and removal of debris, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-36",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing glazed vitrified tile (GVT) skirting, risers and dado of approved make, shade and first quality, set over 12 mm thick backing of cement mortar 1:3 (1 cement : 3 fine sand), jointed with white cement slurry mixed with matching pigment, including cutting, rubbing, cleaning with oxalic acid, curing and scaffolding, complete as per specification and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-37",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing wall signage made of 1.5 mm thick stainless steel AISI 304 grade laser cut letters / symbols of approved font, size and finish, fixed to wall with concealed studs, spacers and adhesive as required, including drilling, making good the wall surface, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-38",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Constructing soak pit of 2.28 metre internal diameter and 6.5 metre depth, including excavation in all kinds of soil, brick masonry honey comb lining in cement mortar, filling with graded brick bats and stone metal, R.C.C. cover slab with frame, inlet arrangement, backfilling and disposal of surplus excavated material, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-39",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Constructing septic tank of internal size 4.95 m x 1.98 m x 2.5 m including excavation in all kinds of soil, cement concrete foundation bed, brick masonry walls in cement mortar, internal and external plastering with water proofing compound, R.C.C. top slab with manhole covers and frames, baffle walls, inlet and outlet arrangement with pipes and tees, vent pipe with cowl, backfilling and disposal of surplus excavated material, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-40",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
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
            ],
            "longDesc": "Providing, fabricating and fixing in position stainless steel AISI 304 grade hand railing of 32 mm diameter pipe of approved gauge, cut to size, welded / joined with concealed joints, welds ground smooth and buffed to mirror finish, fixed to wall / floor with brackets, base plates and anchor fasteners, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-41",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing G.I. chicken wire mesh of approved width and gauge over the junctions of brick masonry and R.C.C. members before plastering, fixed with galvanised nails / staples at required spacing, including cutting the mesh to required width, scaffolding and all labour, complete as directed by the Engineer-in-Charge.",
            "origin": "ANS Garbada — School RA-44",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position anodised aluminium ventilator of size approximately 65 cm x 25 cm of approved section and shade, fitted with glass / aluminium louvres, including louvre clips, frame, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-42",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 114 mm wide G.I. louvers of 0.55 mm thickness of approved make and profile, fixed to frame with necessary clips, screws and supporting members, including cutting to required size, priming and painting where directed, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-43",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in columns, pillars, posts and struts up to floor two level, including cost of form work of ordinary timber planking for columns, pillars, posts and struts, square/rectangular/polygonal in plan, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — Hostel RA-3",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in slabs, landings, shelves, balconies, lintels, beams, girders and cantilever up to floor two level, including cost of form work of ordinary timber planking for sides and soffits of beams, beam haunchings, cantilevers, girders, bressumers and lintels not exceeding 1 M in depth, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — Hostel RA-5",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete, for reinforced concrete work in walls, from top of foundation level up to floor two level, including cost of form work of ordinary timber planking for vertical surfaces such as walls of any thickness, partitions and the like including attached buttresses and string course, with centering, shuttering, strutting, propping and removal of the same, including curing, scaffolding, hire and running charges of machinery, all labour, materials, tools and plants, complete as per drawing, relevant IS specification and direction of the Engineer-in-Charge. (Cost of reinforcement to be paid separately.)",
            "origin": "ANS Garbada — Hostel RA-10",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
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
            ],
            "longDesc": "Providing and fixing in position single shutter door with green marble door frame of approved shade and section, with 38 mm thick solid core flush shutter, including anodised aluminium butt hinges, mortice lock, tower bolts, handles, door stopper, necessary screws and hold fasts, priming and painting / polishing of exposed surfaces, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-21",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position circular window with three track anodised / powder coated aluminium frame and shutters of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-22",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing in position two track anodised / powder coated aluminium sliding window of approved section and shade, including 5 mm thick plain glass panes, EPDM gaskets, PVC wool pile, nylon rollers, locking arrangement, handles, screws, hold fasts, weather-proof sealant, all hardware and labour, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-23",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
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
            ],
            "longDesc": "Providing and fixing 18 mm thick machine cut polished green marble slab of approved shade on window sills and jambs, set in cement mortar 1:3 (1 cement : 3 fine sand), including cutting to required size and shape, moulding on exposed edges, jointing with matching pigment, polishing at site, cleaning with oxalic acid, curing and scaffolding, complete as per drawing and direction of the Engineer-in-Charge.",
            "origin": "ANS Garbada — Hostel RA-24",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
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
            ],
            "origin": "E-2 Type Family Court RA-49",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Rmt"
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
            ],
            "origin": "E-2 Type Family Court RA-50",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_119",
            "libNo": "119",
            "itemNo": "10",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for columns upto plinth level (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (d) columns Up to Plinth level.",
            "unit": "Cum",
            "basis": "Consider size 1 × 0.35 × 0.75 × 2.50 = 0.66 Cmt",
            "basisNote": "Consider size 1 × 0.35 × 0.75 × 2.50 = 0.66 Cmt",
            "basisQty": 0.66,
            "cp": 0,
            "pdfRate": 7285.2,
            "sayRate": 7285.2,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025DA",
                    "page": "",
                    "label": "Concrete M-250",
                    "unit": "Cmt",
                    "qty": 0.66,
                    "rate": 4590.29,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 0.35,
                            "b": 0.75,
                            "d": 2.5,
                            "qty": 0.66,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 5.5,
                    "rate": 323.39,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.35,
                            "b": "",
                            "d": 2.5,
                            "qty": 1.75,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.75,
                            "b": "",
                            "d": 2.5,
                            "qty": 3.75,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.35,
                    "b": 0.75,
                    "d": 2.5,
                    "qty": 0.66,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_120",
            "libNo": "120",
            "itemNo": "11",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for columns, pillars, posts & struts — G.F. (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in Columns, pillars posts and struts G.FLOOR",
            "unit": "Cum",
            "basis": "Consider size 1 × 0.35 × 0.75 × 2.00 = 0.53 Cmt",
            "basisNote": "Consider size 1 × 0.35 × 0.75 × 2.00 = 0.53 Cmt",
            "basisQty": 0.53,
            "cp": 0,
            "pdfRate": 7229.7,
            "sayRate": 7229.7,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024DA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 0.53,
                    "rate": 4544.94,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 0.35,
                            "b": 0.75,
                            "d": 2.0,
                            "qty": 0.53,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 4.4,
                    "rate": 323.39,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.35,
                            "b": "",
                            "d": 2.0,
                            "qty": 1.4,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.75,
                            "b": "",
                            "d": 2.0,
                            "qty": 3.0,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.35,
                    "b": 0.75,
                    "d": 2.0,
                    "qty": 0.53,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_121",
            "libNo": "121",
            "itemNo": "12",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for ground & plinth beams (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-250 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in Ground & Plinth BEAMS",
            "unit": "Cum",
            "basis": "Consider size 1 × 1.00 × 0.30 × 0.75 = 0.23 Cmt",
            "basisNote": "Consider size 1 × 1.00 × 0.30 × 0.75 = 0.23 Cmt",
            "basisQty": 0.23,
            "cp": 0,
            "pdfRate": 6129.04,
            "sayRate": 6129.04,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025CA",
                    "page": "",
                    "label": "Concrete M-250",
                    "unit": "Cmt",
                    "qty": 0.23,
                    "rate": 4485.93,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.0,
                            "b": 0.3,
                            "d": 0.75,
                            "qty": 0.23,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 1.8,
                    "rate": 209.95,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 1.0,
                            "b": "",
                            "d": 0.75,
                            "qty": 1.5,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 0.3,
                            "b": "",
                            "d": 1.0,
                            "qty": 0.3,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.0,
                    "b": 0.3,
                    "d": 0.75,
                    "qty": 0.23,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_122",
            "libNo": "122",
            "itemNo": "13",
            "topic": "RCC",
            "desc": "RCC — CC M-150 for plinth slabs (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-150 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (C) Plinth Slabs",
            "unit": "Cum",
            "basis": "Consider size 1 × 1.00 × 1.00 × 0.10 = 0.10 Cmt",
            "basisNote": "Consider size 1 × 1.00 × 1.00 × 0.10 = 0.10 Cmt",
            "basisQty": 0.1,
            "cp": 0,
            "pdfRate": 5187.5,
            "sayRate": 5187.5,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05023CA",
                    "page": "",
                    "label": "Concrete M-150",
                    "unit": "Cmt",
                    "qty": 0.1,
                    "rate": 4103.92,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.0,
                            "b": 1.0,
                            "d": 0.1,
                            "qty": 0.1,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001B1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 0.4,
                    "rate": 270.9,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 4,
                            "l": 1.0,
                            "b": "",
                            "d": 0.1,
                            "qty": 0.4,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.0,
                    "b": 1.0,
                    "d": 0.1,
                    "qty": 0.1,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_123",
            "libNo": "123",
            "itemNo": "14",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for ground floor beams (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (C) Ground floor Beams,",
            "unit": "Cum",
            "basis": "Consider size 1 × 1.00 × 0.30 × 0.75 = 0.23 Cmt",
            "basisNote": "Consider size 1 × 1.00 × 0.30 × 0.75 = 0.23 Cmt",
            "basisQty": 0.23,
            "cp": 0,
            "pdfRate": 6083.7,
            "sayRate": 6083.7,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 0.23,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.0,
                            "b": 0.3,
                            "d": 0.75,
                            "qty": 0.23,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 1.8,
                    "rate": 209.95,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 1.0,
                            "b": "",
                            "d": 0.75,
                            "qty": 1.5,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 0.3,
                            "b": "",
                            "d": 1.0,
                            "qty": 0.3,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.0,
                    "b": 0.3,
                    "d": 0.75,
                    "qty": 0.23,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_124",
            "libNo": "124",
            "itemNo": "15",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for chhajja — ground floor (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (c) Chhajja for Ground floor",
            "unit": "Cum",
            "basis": "Consider size 1 × 1.20 × 0.52 × 0.15 = 0.09 Cmt",
            "basisNote": "Consider size 1 × 1.20 × 0.52 × 0.15 = 0.09 Cmt",
            "basisQty": 0.09,
            "cp": 0,
            "pdfRate": 6312.0,
            "sayRate": 6312.0,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 0.09,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.2,
                            "b": 0.52,
                            "d": 0.15,
                            "qty": 0.09,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001L",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 0.98,
                    "rate": 171.87,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 1.2,
                            "b": "",
                            "d": 0.15,
                            "qty": 0.36,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 1.2,
                            "b": 0.52,
                            "d": "",
                            "qty": 0.62,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.2,
                    "b": 0.52,
                    "d": 0.15,
                    "qty": 0.09,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_125",
            "libNo": "125",
            "itemNo": "16",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for lintel — ground floor (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (c) Lintal for G floor",
            "unit": "Cum",
            "basis": "Consider size 1 × 1.20 × 0.23 × 0.15 = 0.04 Cmt",
            "basisNote": "Consider size 1 × 1.20 × 0.23 × 0.15 = 0.04 Cmt",
            "basisQty": 0.04,
            "cp": 0,
            "pdfRate": 7432.25,
            "sayRate": 7432.25,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 0.04,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.2,
                            "b": 0.23,
                            "d": 0.15,
                            "qty": 0.04,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 0.57,
                    "rate": 209.95,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 1.2,
                            "b": "",
                            "d": 0.15,
                            "qty": 0.36,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 0.23,
                            "b": "",
                            "d": 0.9,
                            "qty": 0.21,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.2,
                    "b": 0.23,
                    "d": 0.15,
                    "qty": 0.04,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_126",
            "libNo": "126",
            "itemNo": "18",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for staircase, G.F. to first floor (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 and curing complete including the cost of form work but excluding the cost of reinforcement for reinforced concrete work in (E) Stair case for Ground Floor to first floor",
            "unit": "Cum",
            "basis": "Consider single flight — waist slab + steps = 8.24 Cmt",
            "basisNote": "Consider single flight — waist slab + steps = 8.24 Cmt",
            "basisQty": 7.0,
            "cp": 0,
            "pdfRate": 8308.85,
            "sayRate": 8308.85,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024EA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 8.24,
                    "rate": 5492.62,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Waist slab",
                            "nos": 1,
                            "l": 14.0,
                            "b": 2.5,
                            "d": 0.2,
                            "qty": 7.0,
                            "unit": "Cmt"
                        },
                        {
                            "label": "Steps",
                            "nos": 11,
                            "l": 2.5,
                            "b": 0.3,
                            "d": 0.15,
                            "qty": 1.24,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001M",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 48.85,
                    "rate": 264.13,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 14.0,
                            "b": "",
                            "d": 0.2,
                            "qty": 5.6,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 14.0,
                            "b": 2.5,
                            "d": "",
                            "qty": 35.0,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Steps side",
                            "nos": 22,
                            "l": 2.5,
                            "b": "",
                            "d": 0.15,
                            "qty": 8.25,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Waist slab",
                    "nos": 1,
                    "l": 14.0,
                    "b": 2.5,
                    "d": 0.2,
                    "qty": 7.0,
                    "unit": "Cmt"
                },
                {
                    "label": "Steps",
                    "nos": 11,
                    "l": 2.5,
                    "b": 0.3,
                    "d": 0.15,
                    "qty": 1.24,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_127",
            "libNo": "127",
            "itemNo": "19",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for coping — ground floor (Vet. Polyclinic)",
            "longDesc": "Providing and laying controlled cement concrete M-200 for RCC work and curing complete including the cost of form work but excluding the cost of reinforced concrete work in coping on Ground Floor",
            "unit": "Cum",
            "basis": "Consider size 1 × 4.20 × 0.23 × 0.15 = 0.14 Cmt",
            "basisNote": "Consider size 1 × 4.20 × 0.23 × 0.15 = 0.14 Cmt",
            "basisQty": 0.14,
            "cp": 0,
            "pdfRate": 6330.14,
            "sayRate": 6330.14,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "",
                    "label": "Concrete M-200",
                    "unit": "Cmt",
                    "qty": 0.14,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 4.2,
                            "b": 0.23,
                            "d": 0.15,
                            "qty": 0.14,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1",
                    "page": "",
                    "label": "Formwork required",
                    "unit": "Sqmt",
                    "qty": 1.26,
                    "rate": 209.95,
                    "cpApply": false,
                    "spec": "Providing form work of ordinary timber planking so as to give a rough finish including centering, shuttering, strutting and propping etc. and removal of the same",
                    "rows": [
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 4.2,
                            "b": "",
                            "d": 0.15,
                            "qty": 1.26,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "",
                "rate": 39.68
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 4.2,
                    "b": 0.23,
                    "d": 0.15,
                    "qty": 0.14,
                    "unit": "Cmt"
                }
            ]
        },
        {
            "id": "lib_128",
            "libNo": "128",
            "itemNo": "21",
            "topic": "SS railing",
            "desc": "SS railing — 90 cm high SS 316 railing (Vet. Polyclinic)",
            "longDesc": "Providing and fixing 90 cm high Stainless steel railing made from anticorrocive 316 grade S S pipe of 50 mm dia (16Gauge) as hand rail with S S 316 grade Baluster of 38 mm dia (16Gauge) as a vertical support fixed in RCC slab at 1.2m c/c including three horizontal S S pipes of 25 mm dia (16Gauge) at eqal distance fixed by 18.75 mm dia (16Gauge) S S pipe with baluster including accessories as per detailed drawing as directed etc. complete.",
            "unit": "Rmt",
            "basis": "Consider S.S. railing of length 3.50 × 0.90 Mt.",
            "basisNote": "Consider S.S. railing of length 3.50 × 0.90 Mt.",
            "basisQty": 3.5,
            "cp": 0,
            "pdfRate": 3590.6,
            "sayRate": 3590.6,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M714",
                    "page": "24",
                    "label": "Providing 50 mm dia S.S. 316 grade (16 gauge) pipe hand rail — basic 1004.24 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 1154.88,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.5,
                            "b": "",
                            "d": "",
                            "qty": 3.5,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Providing 38 mm dia S.S. 316 grade (16 gauge) vertical support — basic 580.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 3.6,
                    "rate": 667.0,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 4,
                            "l": 0.9,
                            "b": "",
                            "d": "",
                            "qty": 3.6,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Providing 25 mm dia horizontal hollow S.S. pipe — basic 200.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 230.0,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.5,
                            "b": "",
                            "d": "",
                            "qty": 3.5,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Providing 18.75 mm dia support pipe — basic 250.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 10.5,
                    "rate": 287.5,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 3,
                            "l": 3.5,
                            "b": "",
                            "d": "",
                            "qty": 10.5,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Round ball at top — basic 300.00 + 15% C.P.",
                    "unit": "No",
                    "qty": 2.0,
                    "rate": 345.0,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2,
                            "b": "",
                            "d": "",
                            "qty": 2.0,
                            "unit": "No"
                        }
                    ]
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges for fabricating the structure — basic 400.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 460.0,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.5,
                            "b": "",
                            "d": "",
                            "qty": 3.5,
                            "unit": "Rmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "One flight",
                    "nos": 1,
                    "l": 3.5,
                    "b": 0.9,
                    "d": "",
                    "qty": 3.5,
                    "unit": "Rmt"
                }
            ]
        },
        {
            "id": "lib_129",
            "libNo": "129",
            "itemNo": "28",
            "topic": "Plaster",
            "desc": "Plaster — 10 mm mala trovel plaster on ceiling & soffits of stairs (Vet. Polyclinic)",
            "longDesc": "Providing 10 mm. Thick Mala trovel plaster in single coat for plastering on ceiling and soffits of stairs and finished With 1x1 CM Grooves at juction of structual member in : (I) Cement mortar 1:4 (1 cement : 4 sand) with Mala finished of neat cement slurry etc. complete.Ground Floor",
            "unit": "Sqm",
            "basis": "Per 1.00 Sqmt",
            "basisNote": "Per 1.00 Sqmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 160.51,
            "sayRate": 160.51,
            "floors": true,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17001B",
                    "page": "",
                    "label": "Providing 10 mm thick single coat mala plaster",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 134.1,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "17006",
                    "page": "",
                    "label": "Extra for ceilings and soffits of stairs upto floor two level instead of plastering on walls",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 26.41,
                    "cpApply": false
                }
            ],
            "liftExtra": {
                "sorCode": "17007A",
                "page": "104",
                "rate": 24.22
            },
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_130",
            "libNo": "130",
            "itemNo": "39",
            "topic": "Windows",
            "desc": "Windows — Aluminium ventilator 65 × 25 × 1.50 mm box frame with louvers (Vet. Polyclinic)",
            "longDesc": "Providing & Fixing in position standard extruded approved colour anodised Aluminum Ventilation with outer frame 65 x 25 x 1.50 mm Stander Box Frame @ Wt 0.833 kg/Rmt with Bajri or figure glass 3mm thick and alluminium strip blade fixed or adjestable ventilation including all required materials, fixtures, fastenning, labours and equipments as per detailed drawing as directed. For Ventilators",
            "unit": "Sqm",
            "basis": "Consider for 1 × 0.90 × 0.45 = 0.405 Sqmt",
            "basisNote": "Consider for 1 × 0.90 × 0.45 = 0.405 Sqmt",
            "basisQty": 0.405,
            "cp": 15,
            "pdfRate": 2358.9,
            "sayRate": 2358.9,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M686+M687",
                    "page": "",
                    "label": "Aluminium material for frame including anodizing of sections 65 × 25 × 1.50 mm @ wt. 0.833 kg/Rmt (incl. 5% wastage)",
                    "unit": "Kg",
                    "qty": 2.36,
                    "rate": 199.15,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "Top & bottom",
                            "nos": 2,
                            "l": 0.9,
                            "b": "",
                            "d": "",
                            "qty": 1.8,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 0.45,
                            "b": "",
                            "d": "",
                            "qty": 0.9,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M686+M687",
                    "page": "",
                    "label": "Channel of louvers 9.50 × 9.50 × 1.60 @ wt. 0.15 kg/Rmt (incl. 5% wastage)",
                    "unit": "Kg",
                    "qty": 0.14,
                    "rate": 199.15,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 9,
                            "l": 0.1,
                            "b": "",
                            "d": "",
                            "qty": 0.9,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M070",
                    "page": "7",
                    "label": "Bajri or figure glass 3 mm thick (incl. 5% wastage)",
                    "unit": "Sqmt",
                    "qty": 0.38,
                    "rate": 161.02,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "L004",
                    "page": "",
                    "label": "Labour charges",
                    "unit": "Sqmt",
                    "qty": 0.405,
                    "rate": 670.0,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 0.9,
                            "b": 0.45,
                            "d": "",
                            "qty": 0.405,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.9,
                    "b": 0.45,
                    "d": "",
                    "qty": 0.405,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_131",
            "libNo": "131",
            "itemNo": "45",
            "topic": "Doors",
            "desc": "Doors — FRP frame 100 × 50 mm with 35 mm depress panel FRP shutter (Vet. Polyclinic)",
            "longDesc": "Providing and fixing FRP frame size 100 x 50 mm and 35 mm thick ( Fiber Glass with PUF Injection ) FRP depress panel Single or Double shutter having extra reinforcement on sides & edges in Gel coat finish.The core of the both shutter & frame is to be filed up with injected fire retradat grade polyurethene foam done in situ along with embeded wooden pieces for stiffening & also taking hinges & fintures.The whole FRP frame & single or double shutter is to be waterproof, weatherproof, termite proof & resistance to mild acid/alkali. Rates are to be inclusive of S.S hinges with necessary screws & alluminum fixtures & fastenings & fartener sleeve.Colour and Shade approved by Engineer-In-Charge.",
            "unit": "Sqm",
            "basis": "Per 1.00 Sqmt",
            "basisNote": "Per 1.00 Sqmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2340.0,
            "sayRate": 2340.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10038",
                    "page": "70",
                    "label": "Providing and fixing FRP frame 100 × 50 mm and 35 mm thick FRP depress panel double shutter, gel coat finish, PUF injected core",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 2589.15,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "FRP frame 100 × 50",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 1050.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Deduction — FRP frame 125 × 65",
                    "unit": "Sqmt",
                    "qty": -1.0,
                    "rate": 1300.0,
                    "cpApply": false
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_132",
            "libNo": "132",
            "itemNo": "52",
            "topic": "Stone work",
            "desc": "Stone work — Double polished granite 18 mm treads & risers with nosing (Vet. Polyclinic)",
            "longDesc": "Providing and laying machine cut free edge machine Double polished granite stone 18mm thick finished treads and risers in with 1cm projecting, nozing rounded moulding in tread laid over 12 mm (av.) thick bases of cement mortar 1:6 (1-cement : 6-coarse sand) jointed with grey or colour cement slurry including rubbing and polishing incl. making Three No.s of grooves of size 3mm X 3mm along the length of treads etc. complete",
            "unit": "Sqm",
            "basis": "Rate for 2.50 × 0.30 = 0.75 Sqm",
            "basisNote": "Rate for 2.50 × 0.30 = 0.75 Sqm",
            "basisQty": 0.75,
            "cp": 15,
            "pdfRate": 1997.0,
            "sayRate": 1997.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "Granite stone 18 mm thick (incl. 5% centage)",
                    "unit": "Sqm",
                    "qty": 0.79,
                    "rate": 1347.46,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.5,
                            "b": 0.3,
                            "d": "",
                            "qty": 0.75,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Add 5% centage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.04,
                            "unit": "Sqm"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "02010",
                    "page": "",
                    "label": "12 mm (av.) thick bases of cement mortar 1:6 (1 cement : 6 coarse sand)",
                    "unit": "Cum",
                    "qty": 0.09,
                    "rate": 2128.19,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.5,
                            "b": 0.3,
                            "d": 0.12,
                            "qty": 0.09,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Add for round moulding on exposed edge and groove",
                    "unit": "Rmt",
                    "qty": 2.5,
                    "rate": 85.0,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.5,
                            "b": "",
                            "d": "",
                            "qty": 2.5,
                            "unit": "Rmt"
                        }
                    ]
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 2.5,
                    "l": 0.3,
                    "b": "",
                    "d": "",
                    "qty": 0.75,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_133",
            "libNo": "133",
            "itemNo": "53",
            "topic": "Stone work",
            "desc": "Stone work — Mirror polished granite 18 mm cladding on sills & jambs (Vet. Polyclinic)",
            "longDesc": "Providing and fixing mirror polished 18 mm thick Granite stone with full round edge and polished of approved quality in clading on sill and around the doors/ windows/ ventilation with 12 mm thick cement 53 29 mortor CM (1:4) and fixing with cement slurry & adhesive including moulding of exposed edges as directed by engineering in charge etc. complete.",
            "unit": "Sqm",
            "basis": "Rate for window size 1 × 1.20 × 2.00",
            "basisNote": "Rate for window size 1 × 1.20 × 2.00",
            "basisQty": 0.9,
            "cp": 15,
            "pdfRate": 2891.0,
            "sayRate": 2891.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "Granite slab 18 mm thick, one side polished (incl. 5% centage)",
                    "unit": "Sqm",
                    "qty": 0.95,
                    "rate": 1347.46,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 1.2,
                            "b": 0.28,
                            "d": "",
                            "qty": 0.34,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.0,
                            "b": 0.28,
                            "d": "",
                            "qty": 0.56,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Add 5% centage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.05,
                            "unit": "Sqm"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "02012",
                    "page": "",
                    "label": "12 mm thick cement mortar 1:4",
                    "unit": "Cum",
                    "qty": 0.18,
                    "rate": 2842.71,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 1.2,
                            "b": 0.23,
                            "d": 0.12,
                            "qty": 0.07,
                            "unit": "Cum"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.0,
                            "b": 0.23,
                            "d": 0.12,
                            "qty": 0.11,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges for fixing including cement slurry & adhesive",
                    "unit": "Sqm",
                    "qty": 0.95,
                    "rate": 130.0,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M725",
                    "page": "",
                    "label": "Labour charges for moulding on exposed edges",
                    "unit": "Rmt",
                    "qty": 6.4,
                    "rate": 51.0,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 1.2,
                            "b": "",
                            "d": "",
                            "qty": 2.4,
                            "unit": "Rmt"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.0,
                            "b": "",
                            "d": "",
                            "qty": 4.0,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add for mirror polishing",
                    "unit": "Sqm",
                    "qty": 0.95,
                    "rate": 100.0,
                    "cpApply": true
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "",
                    "nos": 2,
                    "l": 1.2,
                    "b": 0.28,
                    "d": "",
                    "qty": 0.34,
                    "unit": "Sqm"
                },
                {
                    "label": "",
                    "nos": 2,
                    "l": 2.0,
                    "b": 0.28,
                    "d": "",
                    "qty": 0.56,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_134",
            "libNo": "134",
            "itemNo": "55",
            "topic": "Steel work",
            "desc": "Steel work — MS safety grill with 12 × 12 mm square bar (Vet. Polyclinic)",
            "longDesc": "Providinfg and fixing Safty grills of required pattern for windows/ Door using necessary 12x12 mm M.S. Square bar, M.S flats and other structural steel at required spacing including cutting, welding and fabriction 55 30 etc. including one coat of primer of approved quality and two coats of oil painting as per detail drawing etc complete.",
            "unit": "Kg",
            "basis": "Assume weight 20.00 Kg/Sqmt",
            "basisNote": "Assume weight 20.00 Kg/Sqmt",
            "basisQty": 20.0,
            "cp": 0,
            "pdfRate": 105.0,
            "sayRate": 105.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "10025A",
                    "page": "",
                    "label": "Providing and fixing M.S. grills of required pattern to wooden frames of windows etc. with M.S. flats at required spacings and frame all round, square or round bars with round headed bolts and nuts or by screws — (A) Plain Grill",
                    "unit": "Kg",
                    "qty": 20.0,
                    "rate": 109.22,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 20.0,
                            "b": "",
                            "d": "",
                            "qty": 20.0,
                            "unit": "Kg"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001",
                    "page": "",
                    "label": "Applying priming coat over new steel and other metal surface",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 35.56,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.0,
                            "b": 1.0,
                            "d": "",
                            "qty": 1.0,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "19005",
                    "page": "",
                    "label": "Painting two coats (excluding priming coat) on new steel and other metal surface with synthetic enamel paint",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 68.47,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.0,
                            "b": 1.0,
                            "d": "",
                            "qty": 1.0,
                            "unit": "Sqmt"
                        }
                    ]
                }
            ],
            "tailNote": "Note: source PDF shows Say Rs. 105.00; its own component total works out to Rs. 114.42 per Kg — verify before use.",
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 20.0,
                    "unit": "Kg"
                }
            ]
        },
        {
            "id": "lib_135",
            "libNo": "135",
            "itemNo": "63",
            "topic": "Drainage",
            "desc": "Drainage — UPVC SWR Type-B 75 mm dia pipe line with fittings & labour (Vet. Polyclinic)",
            "longDesc": "Providing, laying and jointing in true line and level 75 mm dia. UPVC SWRType B pipe conforming to IS 13592-1992 with one end plain and other end socketed with rubbering and fitting conforming to ISI 14735- 1999 of approved make for drainage system pipe line, pipe shall be jointed with each other with rubber 63 31 lubricant, pipe shall be fixed on wall using of PVC clamp at every 2000 mm c/c or shall be conceled in walss as directed including necessary fittings such as bends, shoes etc. including testing of pipes and joints and jointed with adhesive solvent cement including cost of all materials.",
            "unit": "Rmt",
            "basis": "Details of cost of 12.00 Meter",
            "basisNote": "Details of cost of 12.00 Meter",
            "basisQty": 12.0,
            "cp": 15,
            "pdfRate": 291.0,
            "sayRate": 291.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M803",
                    "page": "",
                    "label": "UPVC SWR 75 mm dia pipe",
                    "unit": "Rmt",
                    "qty": 12.0,
                    "rate": 143.22,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Plug",
                    "unit": "Each",
                    "qty": 3.0,
                    "rate": 111.0,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Clamps",
                    "unit": "Each",
                    "qty": 8.0,
                    "rate": 18.0,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Solvent solution (50 ml)",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 92.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Jani nails",
                    "unit": "No",
                    "qty": 16.0,
                    "rate": 1.0,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Carriage of pipe (L.S.) — no C.P. on carriage",
                    "unit": "LS",
                    "qty": 1.0,
                    "rate": 10.0,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "St-2",
                    "page": "",
                    "label": "Labour — Mazdoor (male)",
                    "unit": "Each",
                    "qty": 0.7,
                    "rate": 505.0,
                    "cpApply": true
                },
                {
                    "sr": "8",
                    "kind": "SOR",
                    "code": "St-2",
                    "page": "",
                    "label": "Labour — Plumber",
                    "unit": "Each",
                    "qty": 0.35,
                    "rate": 729.0,
                    "cpApply": true
                },
                {
                    "sr": "9",
                    "kind": "SOR",
                    "code": "St-2",
                    "page": "",
                    "label": "Labour — Bandhani",
                    "unit": "Each",
                    "qty": 0.17,
                    "rate": 622.0,
                    "cpApply": true
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 12.0,
                    "unit": "Rmt"
                }
            ]
        },
        {
            "id": "lib_136",
            "libNo": "136",
            "itemNo": "79",
            "topic": "Drainage",
            "desc": "Drainage — Inspection chamber 455 × 610 mm with precast RCC cover (Vet. Polyclinic)",
            "longDesc": "Constructing brick masonry chamber for underground C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 precast RCC cover 455mm x 610mm intenal dimensions with frame (R.C.C. top slabe with 1:2:4 mix (1-cement :2- coarse sand :4-graded stone aggregate 79 35 20mm size) foundation concrete 1:5:10 inside plaster 15mm thick with cement mortar 1:3 finished smooth with a floating coat of neat cement on walls and bed concrete etc. complete (i) Inside dimensions 455mmx 610mm and 450mm deep for single pipe line. Constructing brick masonry chamber for underground C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 C.I. cover with frame (Light duty) 455mm x 610mm intenal dimensions total weight of cover with frame to be not less than 38Kg. (Wt. of cover 23 Kg.) and Wt.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3192.0,
            "sayRate": 3192.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "24016A",
                    "page": "",
                    "label": "Constructing brick masonry chamber for underground C.I. inspection chamber and bends in C.M. 1:5, C.I. cover with frame (light duty) 455 × 610 mm internal, R.C.C. top slab 1:2:4, foundation concrete 1:5:10, inside plaster 15 mm in C.M. 1:3 finished with neat cement floating coat — 450 mm deep for single pipe line",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 2903.89,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Precast R.C.C. cover",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 1100.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M113",
                    "page": "",
                    "label": "Less — C.I. cover with frame (deducted)",
                    "unit": "No",
                    "qty": -1.0,
                    "rate": 812.71,
                    "cpApply": false
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_137",
            "libNo": "137",
            "itemNo": "80",
            "topic": "Drainage",
            "desc": "Drainage — Inspection chamber 500 × 700 mm with precast RCC cover (Vet. Polyclinic)",
            "longDesc": "Constructing brick masonry chamber for underground C.I. Inspection C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 precast RCC cover 500mmx 700mm intenal dimensions with frame (R.C.C. top slabe with 1:2:4 mix (1-cement :2- coarse sand :4-graded stone 80 36 aggregate 20mm size) foundation concrete 1:5:10 inside plaster 15mm thick with cement mortar 1:3 finished smooth with a floating coat of neat cement on walls and bed concrete etc. complete (i) Inside dimensions 500mmx 700mm and 450mm deep for single pipe line. Constructing brick masonry chamber for underground C.I. Inspection chamber and bends with briocks having croshing strength not less than 35Kg. Cm2 in C.M. 1:5 C.I. cover with frame (Light duty) 455mm x 610mm intenal dimensions total weight of cover with frame to be not less than 38Kg. (Wt. of cover 23 Kg.) and Wt.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 3895.0,
            "sayRate": 3895.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "24016B",
                    "page": "",
                    "label": "Constructing brick masonry chamber for underground C.I. inspection chamber and bends in C.M. 1:5, C.I. cover with frame (light duty) 500 × 700 mm internal, R.C.C. top slab 1:2:4, foundation concrete 1:5:10, inside plaster 15 mm in C.M. 1:3 finished with neat cement floating coat — 450 mm deep for single pipe line",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 3624.51,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Precast R.C.C. cover",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 1400.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M114",
                    "page": "",
                    "label": "Less — C.I. cover with frame (deducted)",
                    "unit": "No",
                    "qty": -1.0,
                    "rate": 1129.66,
                    "cpApply": false
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_138",
            "libNo": "138",
            "itemNo": "86",
            "topic": "Sanitary",
            "desc": "Sanitary — Vitreous china kitchen sink 600 × 450 × 150 mm with C.I./M.S. brackets (Vet. Polyclinic)",
            "longDesc": "Providing and fixing Kitchen sink with C.I. or M.S. brackets, painted white including cutting holes in walls and making good the same but excluding fittings. (C) Vitreous China Sink.(i) 600mm x 450mm x 150mm size",
            "unit": "No",
            "basis": "Rate for 1 sink",
            "basisNote": "Rate for 1 sink",
            "basisQty": 1.0,
            "cp": 15,
            "pdfRate": 3604.0,
            "sayRate": 3604.0,
            "floors": false,
            "source": "Veterinary Polyclinic Building, Dahod (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "23019",
                    "page": "",
                    "label": "Providing and laying kitchen sink",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 2303.62,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "23029A",
                    "page": "",
                    "label": "Providing and fixing pillar cock 15 mm",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 305.67,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "23021A",
                    "page": "",
                    "label": "M.I. fisher union (A) 32 mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 77.97,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "23020A",
                    "page": "",
                    "label": "C.P. brass waste (A) 32 mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 67.24,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "23030A",
                    "page": "",
                    "label": "Providing and fixing chromium plated stop cock 15 mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 203.79,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add for labour charges for fixing",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 250.0,
                    "cpApply": true
                }
            ],
            "origin": "Vet. Polyclinic",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_139",
            "libNo": "139",
            "itemNo": "1",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for mass concrete, foundations & footings (Garbada)",
            "longDesc": "For Mass Concrete M -250 Providing and laying Controlled cement concrete M 250 and curing complete including the cost of form work but excluding the cost of reinforcement.(a) Foundations, Footing Bases of columns and the like and Mass Concrete.",
            "unit": "Cum",
            "basis": "Considering quantity of base of columns = 7.22 Cum",
            "basisNote": "Considering quantity of base of columns = 7.22 Cum",
            "basisQty": 7.22,
            "cp": 0,
            "pdfRate": 4473.0,
            "sayRate": 4473.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025AA",
                    "page": "42",
                    "label": "Cost of concrete M-250",
                    "unit": "Cum",
                    "qty": 7.22,
                    "rate": 4205.16,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Base of column",
                            "nos": 1,
                            "l": 3.2,
                            "b": 3.2,
                            "d": 0.35,
                            "qty": 3.58,
                            "unit": "Cum"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.7,
                            "b": 2.7,
                            "d": 0.3,
                            "qty": 2.19,
                            "unit": "Cum"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.2,
                            "b": 2.2,
                            "d": 0.3,
                            "qty": 1.45,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001A",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 10.36,
                    "rate": 186.24,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 3.2,
                            "b": "",
                            "d": 0.35,
                            "qty": 2.24,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 3.2,
                            "b": "",
                            "d": 0.35,
                            "qty": 2.24,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.7,
                            "b": "",
                            "d": 0.3,
                            "qty": 1.62,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.7,
                            "b": "",
                            "d": 0.3,
                            "qty": 1.62,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.2,
                            "b": "",
                            "d": 0.3,
                            "qty": 1.32,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 2.2,
                            "b": "",
                            "d": 0.3,
                            "qty": 1.32,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Base of column",
                    "nos": 1,
                    "l": 3.2,
                    "b": 3.2,
                    "d": 0.35,
                    "qty": 3.58,
                    "unit": "Cum"
                },
                {
                    "label": "",
                    "nos": 1,
                    "l": 2.7,
                    "b": 2.7,
                    "d": 0.3,
                    "qty": 2.19,
                    "unit": "Cum"
                },
                {
                    "label": "",
                    "nos": 1,
                    "l": 2.2,
                    "b": 2.2,
                    "d": 0.3,
                    "qty": 1.45,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_140",
            "libNo": "140",
            "itemNo": "2",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for columns upto plinth (Garbada)",
            "longDesc": "For Column M -250 Providing and laying Controlled cement concrete M 250 and curing complete including the cost of form work but excluding the cost of reinforcement.(C) Column up to plinth",
            "unit": "Cum",
            "basis": "Considering 1 × 0.30 × 0.75 × 1.70 = 0.38 Cum",
            "basisNote": "Considering 1 × 0.30 × 0.75 × 1.70 = 0.38 Cum",
            "basisQty": 0.38,
            "cp": 0,
            "pdfRate": 7609.0,
            "sayRate": 7609.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025DA",
                    "page": "42",
                    "label": "Cost of concrete M-250",
                    "unit": "Cum",
                    "qty": 0.38,
                    "rate": 4590.29,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Column",
                            "nos": 1,
                            "l": 0.3,
                            "b": 0.75,
                            "d": 1.7,
                            "qty": 0.38,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 3.57,
                    "rate": 323.39,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.3,
                            "b": "",
                            "d": 1.7,
                            "qty": 1.02,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.75,
                            "b": "",
                            "d": 1.7,
                            "qty": 2.55,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.3,
                    "b": 0.75,
                    "d": 1.7,
                    "qty": 0.38,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_141",
            "libNo": "141",
            "itemNo": "4",
            "topic": "RCC",
            "desc": "RCC — CC M-150 for plinth slab (Garbada)",
            "longDesc": "Providing & laying controlled cement concrete M150 for curing comp. including cost of form work but excluding cost of reinforcement for reinforced conrete work in PLINTH SLAB",
            "unit": "Cum",
            "basis": "Considering 1 × 3.50 × 3.50 × 0.15 = 1.84 Cum",
            "basisNote": "Considering 1 × 3.50 × 3.50 × 0.15 = 1.84 Cum",
            "basisQty": 1.84,
            "cp": 0,
            "pdfRate": 4414.0,
            "sayRate": 4414.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05023CA",
                    "page": "41",
                    "label": "Cost of concrete M-150",
                    "unit": "Cum",
                    "qty": 1.84,
                    "rate": 4103.92,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.5,
                            "b": 3.5,
                            "d": 0.15,
                            "qty": 1.84,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001B1A",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 2.1,
                    "rate": 270.9,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 4,
                            "l": 3.5,
                            "b": "",
                            "d": 0.15,
                            "qty": 2.1,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 3.5,
                    "b": 3.5,
                    "d": 0.15,
                    "qty": 1.84,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_142",
            "libNo": "142",
            "itemNo": "5",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for columns, pillars, posts & struts (Garbada)",
            "longDesc": "For Column M -200 Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork but excluding reinforcement for reinforced concrete work in (D) Columns, Pillars posts and struts",
            "unit": "Cum",
            "basis": "Considering column 1 × 0.35 × 0.75 × 3.60 = 0.95 Cum",
            "basisNote": "Considering column 1 × 0.35 × 0.75 × 3.60 = 0.95 Cum",
            "basisQty": 0.95,
            "cp": 0,
            "pdfRate": 7256.0,
            "sayRate": 7256.0,
            "floors": true,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024DA",
                    "page": "42",
                    "label": "Cost of concrete M-200",
                    "unit": "Cum",
                    "qty": 0.95,
                    "rate": 4544.94,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Size of column",
                            "nos": 1,
                            "l": 0.35,
                            "b": 0.75,
                            "d": 3.6,
                            "qty": 0.95,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001G1A",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 7.92,
                    "rate": 323.39,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.35,
                            "b": "",
                            "d": 3.6,
                            "qty": 2.52,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.75,
                            "b": "",
                            "d": 3.6,
                            "qty": 5.4,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.35,
                    "b": 0.75,
                    "d": 3.6,
                    "qty": 0.95,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_143",
            "libNo": "143",
            "itemNo": "7",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for lintels (Garbada)",
            "longDesc": "Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork but Excluding reinforcement for reinforced concrete work in Lintels",
            "unit": "Cum",
            "basis": "Considering 1 × 3.00 × 0.23 × 0.15 = 0.104 Cum",
            "basisNote": "Considering 1 × 3.00 × 0.23 × 0.15 = 0.104 Cum",
            "basisQty": 0.104,
            "cp": 0,
            "pdfRate": 7666.0,
            "sayRate": 7666.0,
            "floors": true,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "42",
                    "label": "Cost of concrete M-200",
                    "unit": "Cum",
                    "qty": 0.104,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.0,
                            "b": 0.23,
                            "d": 0.15,
                            "qty": 0.104,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001H1A",
                    "page": "61",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 1.59,
                    "rate": 209.95,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.0,
                            "b": 0.23,
                            "d": "",
                            "qty": 0.69,
                            "unit": "Sqm"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 3.0,
                            "b": "",
                            "d": 0.15,
                            "qty": 0.9,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 3.0,
                    "b": 0.23,
                    "d": 0.15,
                    "qty": 0.104,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_144",
            "libNo": "144",
            "itemNo": "8",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for chhajja, all floors (Garbada)",
            "longDesc": "For chajja M - 200 Providing and laying controlled cement concrete M.200 and curing complete including the cost of formwork but Excluding reinforcement for reinforced concrete work in Chhajja for all floor",
            "unit": "Cum",
            "basis": "Considering 1 × 1.20 × 0.45 × 0.13 = 0.070 Cum",
            "basisNote": "Considering 1 × 1.20 × 0.45 × 0.13 = 0.070 Cum",
            "basisQty": 0.07,
            "cp": 0,
            "pdfRate": 7578.0,
            "sayRate": 7578.0,
            "floors": true,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024CA",
                    "page": "42",
                    "label": "Cost of concrete M-200",
                    "unit": "Cum",
                    "qty": 0.07,
                    "rate": 4440.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1.2,
                            "b": 0.45,
                            "d": 0.13,
                            "qty": 0.07,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001B1A",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 0.81,
                    "rate": 270.9,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Bottom",
                            "nos": 1,
                            "l": 1.2,
                            "b": 0.45,
                            "d": "",
                            "qty": 0.54,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Side",
                            "nos": 2,
                            "l": 0.45,
                            "b": "",
                            "d": 0.13,
                            "qty": 0.12,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Face",
                            "nos": 1,
                            "l": 1.2,
                            "b": "",
                            "d": 0.13,
                            "qty": 0.16,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 1.2,
                    "b": 0.45,
                    "d": 0.13,
                    "qty": 0.07,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_145",
            "libNo": "145",
            "itemNo": "11",
            "topic": "RCC",
            "desc": "RCC — CC M-200 for staircase (Garbada)",
            "longDesc": "For Stair Case Providing and laying Controlled cement concrete M 200 and curing complete including the cost of form work but excluding the cost of reinforcement. Staircase",
            "unit": "Cum",
            "basis": "Considering waist slab + steps = 1.779 Cum",
            "basisNote": "Considering waist slab + steps = 1.779 Cum",
            "basisQty": 1.779,
            "cp": 0,
            "pdfRate": 7164.0,
            "sayRate": 7164.0,
            "floors": true,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05024EA",
                    "page": "42",
                    "label": "Cost of concrete M-200",
                    "unit": "Cum",
                    "qty": 1.779,
                    "rate": 5492.62,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Waist slab",
                            "nos": 1.0,
                            "l": 5.03,
                            "b": 1.5,
                            "d": 0.2,
                            "qty": 1.51,
                            "unit": "Cum"
                        },
                        {
                            "label": "Steps",
                            "nos": 0.5,
                            "l": 12.0,
                            "b": 0.3,
                            "d": 0.15,
                            "qty": 0.27,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001MA",
                    "page": "62",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 11.25,
                    "rate": 264.13,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Waist slab",
                            "nos": 1.0,
                            "l": 5.03,
                            "b": 1.5,
                            "d": "",
                            "qty": 7.55,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Side",
                            "nos": 1.0,
                            "l": 5.03,
                            "b": "",
                            "d": 0.2,
                            "qty": 1.01,
                            "unit": "Sqm"
                        },
                        {
                            "label": "Steps",
                            "nos": 12.0,
                            "l": 1.5,
                            "b": "",
                            "d": 0.15,
                            "qty": 2.7,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "liftExtra": {
                "sorCode": "05015A",
                "page": "40",
                "rate": 39.68
            },
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Waist slab",
                    "nos": 1.0,
                    "l": 5.03,
                    "b": 1.5,
                    "d": 0.2,
                    "qty": 1.51,
                    "unit": "Cum"
                },
                {
                    "label": "Steps",
                    "nos": 0.5,
                    "l": 12.0,
                    "b": 0.3,
                    "d": 0.15,
                    "qty": 0.27,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_166",
            "libNo": "166",
            "itemNo": "4",
            "topic": "RCC",
            "desc": "RCC — CC M-250 for reinforced concrete walls (Garbada sump & pump room)",
            "longDesc": "M-250 Rinforced concrete walls Providing and laying controlled cement concrete M.250 for curing complete including cost of formwork and reinforcement for reinforced concrete work in (B) Walls, from top of foundation level upto floor two level",
            "unit": "Cum",
            "basis": "Size 1.00 × 0.35 × 2.50 = 0.875 Cum",
            "basisNote": "Size 1.00 × 0.35 × 2.50 = 0.875 Cum",
            "basisQty": 0.875,
            "cp": 0,
            "pdfRate": 5925.0,
            "sayRate": 5925.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "05025BA",
                    "page": "42",
                    "label": "Cost of C.C. M-250",
                    "unit": "Cum",
                    "qty": 0.875,
                    "rate": 4512.29,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1.0,
                            "l": 0.35,
                            "b": "",
                            "d": 2.5,
                            "qty": 0.875,
                            "unit": "Cum"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "09001CA",
                    "page": "60",
                    "label": "Form work of ordinary timber planking incl. centering, shuttering, strutting, propping and removal",
                    "unit": "Sqm",
                    "qty": 5.0,
                    "rate": 247.2,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2.0,
                            "l": 1.0,
                            "b": "",
                            "d": 2.5,
                            "qty": 5.0,
                            "unit": "Sqm"
                        }
                    ]
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.35,
                    "b": 2.5,
                    "d": "",
                    "qty": 0.875,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_147",
            "libNo": "147",
            "itemNo": "13",
            "topic": "Waterproofing",
            "desc": "Waterproofing — 20 mm waterproof cement plaster in sunk (Garbada)",
            "longDesc": "Water Proofing Plaster in Sunk Providing 20 mm thick waterproof cement plaster fo sunk in single coat on bick/concrete walls for interior plastering finished even and smooth in cement mortar 1:3 (1 cement : 3 sand) and mixing water proofing materials of approved brand and manufacture in C.M. in proportion recommnded by the manufacture and finished with a floating coat of neat cement slurry for all floor.",
            "unit": "Sqm",
            "basis": "Per 1.00 Sqmt",
            "basisNote": "Per 1.00 Sqmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 318.2,
            "sayRate": 318.2,
            "floors": true,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "17003A",
                    "page": "103",
                    "label": "20 mm thick cement plaster in C.M. 1:3",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 255.67,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "17005",
                    "page": "103",
                    "label": "Add water proofing material in cement mortar — 11.42 Kg/Sqmt = 0.23 bag",
                    "unit": "Bag",
                    "qty": 0.23,
                    "rate": 48.77,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "17004A",
                    "page": "103",
                    "label": "Floating coat of neat cement slurry",
                    "unit": "Sqmt",
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
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_148",
            "libNo": "148",
            "itemNo": "51",
            "topic": "Plinth protection",
            "desc": "Plinth protection — Paver block plinth protection with CC 1:4:8 base & kerb stone (Garbada)",
            "longDesc": "Plinth Protection Providing plinth protection to building including excavation in ordinary soil and laying cement concrete 1:4:8 using stone aggregates of 40mm nominal size in foundation layer 0.10 mt. thick below pre-cast Rubber Dye inter locking concrete block 60mm thick with grade of concrete M200 pneumatic compressed by mechanically pressed and as per approved design including 75mm Sand layer for levelling and filling the joint with sand in proper line and level etc. complete, Including Providing and fixing pre-cast concrete kerb stone of grey cement based concrete block 30cm length,30cm height and 15cm thick of M250 grade concrete as per approved design and including excavation for fixing in proper line and level, filling the joint with C:M 1:3 (1cement:3fine sand) etc. complete.",
            "unit": "Sqm",
            "basis": "Consider 1 × 10.00 × 1.20 = 12.00 Sqmt",
            "basisNote": "Consider 1 × 10.00 × 1.20 = 12.00 Sqmt",
            "basisQty": 12.0,
            "cp": 0,
            "pdfRate": 1319.0,
            "sayRate": 1319.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "4001A",
                    "page": "",
                    "label": "Excavation in ordinary soil",
                    "unit": "Cmt",
                    "qty": 1.8,
                    "rate": 124.61,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 10.0,
                            "b": 1.2,
                            "d": 0.15,
                            "qty": 1.8,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "5004A",
                    "page": "",
                    "label": "Cement concrete 1:4:8 in foundation layer 0.10 m thick",
                    "unit": "Cmt",
                    "qty": 1.2,
                    "rate": 2653.39,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 10.0,
                            "b": 1.2,
                            "d": 0.1,
                            "qty": 1.2,
                            "unit": "Cmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "14033",
                    "page": "",
                    "label": "Pre-cast rubber dye inter-locking concrete paver block 60 mm thick, M-200",
                    "unit": "Sqmt",
                    "qty": 12.0,
                    "rate": 695.07,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 10.0,
                            "b": 1.2,
                            "d": "",
                            "qty": 12.0,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "14023A",
                    "page": "",
                    "label": "Pre-cast concrete kerb stone 30 × 30 × 15 cm, M-250",
                    "unit": "Rmt",
                    "qty": 10.0,
                    "rate": 408.05,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 10.0,
                    "b": 1.2,
                    "d": "",
                    "qty": 12.0,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_149",
            "libNo": "149",
            "itemNo": "31",
            "topic": "Doors",
            "desc": "Doors — Double shutter door with green marble frame & 35 mm flush shutter (Garbada)",
            "longDesc": "35 Item No 31 Providing and fixing door Double shutter Door Having Green Marble Frame With All Open Edges Machine Cut & Machine Polished, Fixed By Zinc Coated Hinges With Double Shutter Of Factory Made & Stamped I.S 12823 Grade One, Type One 35 Mm Th Solid Core, Melamine Faced, Three Layred Resin, Flushed Door , Having Decorative Lamination On Both Sides & 12 Mm Th T.W. Beading Fixed Around The Door, From \"Novapan\" Or Equivalent Company Holding Licence For Minimum 5 Years Mortice lock, SS Aldrop 30cm long, SS Handle size 60 Cm Long, Tower Bolt size 20 cm etc. as per detail colour & pattern apporoved by this office including necessary anodized alluminum fixtures and fastenings.",
            "unit": "Sqm",
            "basis": "Consider door size 1 × 3.00 × 2.45 = 7.35 Sqmt",
            "basisNote": "Consider door size 1 × 3.00 × 2.45 = 7.35 Sqmt",
            "basisQty": 7.35,
            "cp": 0,
            "pdfRate": 6092.0,
            "sayRate": 6092.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Frame — green marble (Sor 14009BA + M390 less M145 = Rs. 1442.11/Sqmt)",
                    "unit": "Sqmt",
                    "qty": 2.49,
                    "rate": 1442.11,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Vertical",
                            "nos": 2,
                            "l": 1.0,
                            "b": 0.3,
                            "d": 2.45,
                            "qty": 1.47,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Horizontal",
                            "nos": 1,
                            "l": 1.0,
                            "b": 0.3,
                            "d": 3.0,
                            "qty": 0.9,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Add wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.12,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M423",
                    "page": "17",
                    "label": "Flush door shutter, factory made (incl. 10% wastage)",
                    "unit": "Sqmt",
                    "qty": 8.085,
                    "rate": 1059.32,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M788",
                    "page": "25",
                    "label": "Laminated sheet 1.00 mm thick",
                    "unit": "Sqmt",
                    "qty": 14.7,
                    "rate": 296.61,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M325",
                    "page": "14",
                    "label": "T.W. beading for shutter",
                    "unit": "Cum",
                    "qty": 0.015,
                    "rate": 50850.0,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "S.S. pipe handle 60 cm long, both sides",
                    "unit": "No",
                    "qty": 4,
                    "rate": 1550.0,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "S.S. hinges for double shutter 8\" × 1.5\" × 1.5\"",
                    "unit": "No",
                    "qty": 10,
                    "rate": 200.0,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "S.S. aldrop 60 cm long",
                    "unit": "No",
                    "qty": 2,
                    "rate": 900.0,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "SOR",
                    "code": "M706",
                    "page": "",
                    "label": "S.S. stopper 30 cm long",
                    "unit": "No",
                    "qty": 2,
                    "rate": 180.51,
                    "cpApply": false
                },
                {
                    "sr": "9",
                    "kind": "SOR",
                    "code": "M704",
                    "page": "",
                    "label": "Floor spring, heavy duty",
                    "unit": "No",
                    "qty": 2,
                    "rate": 1800.85,
                    "cpApply": false
                },
                {
                    "sr": "10",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Labour charges @ 30% of material cost",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 9375.65,
                    "cpApply": false
                },
                {
                    "sr": "11",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Add 15% C.P. on non-SOR / basic rate items (3+4+5+6)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 4149.52,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Door size",
                    "nos": 1,
                    "l": 3.0,
                    "b": 2.45,
                    "d": "",
                    "qty": 7.35,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_165",
            "libNo": "165",
            "itemNo": "27",
            "topic": "Doors",
            "desc": "Doors — Double shutter aluminium door, Jindal 19552 frame with 38 mm flush shutter (Garbada)",
            "longDesc": "Item No 27 Providing and fixing door Double shutter having factory fabricated std. Extruded aluminium colour anodized hollow section19552 weight is not less than 1.1 kg/mtr {Section 63.50 x 38 mm x 2.50 mm thick } for door frame, hollow portion of door frame shall be filled with wood to be insert for durable grip of door hinges, with factory made 38 mm.thick Double Shutter Pivoted flush door With Floor Spring with both side pre 1mm laminated sheet with 6 Lever Mortice lock, SS Aldrop 30cm long, SS Handle size 60 Cm Long, Tower Bolt size 20 cm etc. as per detail colour & pattern apporoved by this office including necessary anodized alluminum fixtures and fastenings.",
            "unit": "Sqm",
            "basis": "Consider door size 1 × 1.20 × 2.10 = 2.52 Sqmt",
            "basisNote": "Consider door size 1 × 1.20 × 2.10 = 2.52 Sqmt",
            "basisQty": 2.52,
            "cp": 0,
            "pdfRate": 8243.0,
            "sayRate": 8243.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Anodised aluminium section 63.50 × 38 mm @ 1.116 kg/Rmt for frame (incl. 5% wastage)",
                    "unit": "Kg",
                    "qty": 6.33,
                    "rate": 211.86,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Vertical",
                            "nos": 2,
                            "l": 1.0,
                            "b": 1.0,
                            "d": 2.1,
                            "qty": 4.2,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Horizontal",
                            "nos": 1,
                            "l": 1.0,
                            "b": 1.0,
                            "d": 1.2,
                            "qty": 1.2,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Add 5% wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.27,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M324",
                    "page": "14",
                    "label": "Indian teak wood insert in frame (incl. 5% wastage)",
                    "unit": "Cmt",
                    "qty": 0.023,
                    "rate": 46610.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M423",
                    "page": "24",
                    "label": "Flush door shutter, factory made (incl. 10% wastage)",
                    "unit": "Sqmt",
                    "qty": 2.772,
                    "rate": 1059.32,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M788",
                    "page": "25",
                    "label": "Laminated sheet 1.00 mm thick",
                    "unit": "Sqmt",
                    "qty": 6.3,
                    "rate": 296.61,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M906",
                    "page": "29",
                    "label": "Aluminium beading for shutter",
                    "unit": "Kg",
                    "qty": 1.08,
                    "rate": 211.86,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "M714",
                    "page": "24",
                    "label": "S.S. pipe handle 60 cm long, both sides",
                    "unit": "No",
                    "qty": 4,
                    "rate": 1004.24,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "M735",
                    "page": "24",
                    "label": "S.S. hinges for double shutter 4\" × 1\" × 1\"",
                    "unit": "No",
                    "qty": 8,
                    "rate": 54.24,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "SOR",
                    "code": "M710",
                    "page": "23",
                    "label": "S.S. aldrop 30 cm long",
                    "unit": "No",
                    "qty": 2,
                    "rate": 396.61,
                    "cpApply": false
                },
                {
                    "sr": "9",
                    "kind": "SOR",
                    "code": "M706",
                    "page": "23",
                    "label": "S.S. stopper 30 cm long",
                    "unit": "No",
                    "qty": 2,
                    "rate": 180.51,
                    "cpApply": false
                },
                {
                    "sr": "10",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges",
                    "unit": "Sqmt",
                    "qty": 2.52,
                    "rate": 2000.0,
                    "cpApply": false
                },
                {
                    "sr": "11",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Add 15% C.P. on non-SOR / basic rate items",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 2679.5,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Door size",
                    "nos": 1,
                    "l": 1.2,
                    "b": 2.1,
                    "d": "",
                    "qty": 2.52,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_158",
            "libNo": "158",
            "itemNo": "36",
            "topic": "Windows",
            "desc": "Windows — 114 mm GI louvers with mosquito net, W4 (Garbada)",
            "longDesc": "Providing and fix Lours 114 mm Wide G.I. Sheet having Thickness Of 0.55 mm & Weight Not Less Than 490 gm./mtr. Roll formed to create 84 mm Wide Louvers Snap Fixed On Special Shapped G.I. Channel . Fix Louvers & Channels Shall Finished With Poweder Coating Of 55 micron, Mosqute Net Fitting Oute Side Per Deatiled Drawing, And Directed By Engineer In Charge etc Complete",
            "unit": "Sqm",
            "basis": "Consider window size W4 = 1 × 0.45 × 0.90 = 0.405 Sqmt",
            "basisNote": "Consider window size W4 = 1 × 0.45 × 0.90 = 0.405 Sqmt",
            "basisQty": 0.405,
            "cp": 15,
            "pdfRate": 8642.0,
            "sayRate": 8642.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M904",
                    "page": "29",
                    "label": "Anodised aluminium outer frame section @ 1.094 kg/Rmt (incl. 5% wastage)",
                    "unit": "Kg",
                    "qty": 6.2,
                    "rate": 211.86,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "Top",
                            "nos": 2,
                            "l": 0.45,
                            "b": "",
                            "d": "",
                            "qty": 0.9,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Sides",
                            "nos": 2,
                            "l": 0.9,
                            "b": "",
                            "d": "",
                            "qty": 1.8,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Mosquito net top",
                            "nos": 2,
                            "l": 0.45,
                            "b": "",
                            "d": "",
                            "qty": 0.9,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Sides",
                            "nos": 2,
                            "l": 0.9,
                            "b": "",
                            "d": "",
                            "qty": 1.8,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Add 5% wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.27,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Strip for adjustable glass louvers",
                    "unit": "No",
                    "qty": 8.0,
                    "rate": 60.0,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M258",
                    "page": "20",
                    "label": "Glass 5 mm thick (incl. 5% wastage)",
                    "unit": "Sqmt",
                    "qty": 1.32,
                    "rate": 245.76,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "S.S. mosquito net (incl. 5% wastage)",
                    "unit": "Sqmt",
                    "qty": 0.4253,
                    "rate": 800.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "36",
                    "label": "Rubber gasket (incl. 5% wastage)",
                    "unit": "Rmt",
                    "qty": 25.2,
                    "rate": 7.63,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware, fastener, silicon sealant, air strip, lock (L.S.)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 300.0,
                    "cpApply": true
                },
                {
                    "sr": "7",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges",
                    "unit": "Sqmt",
                    "qty": 0.41,
                    "rate": 230.0,
                    "cpApply": true
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "W4",
                    "nos": 1,
                    "l": 0.45,
                    "b": 0.9,
                    "d": "",
                    "qty": 0.405,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_159",
            "libNo": "159",
            "itemNo": "46",
            "topic": "Windows",
            "desc": "Windows — Three track window (3 shutter + mosquito net), Jindal E-30 (Garbada)",
            "longDesc": "It.N RA Description of Item o No No L B H/D Total Unit Rate Amount Providing and fixingThree track (3 shutter +1 mosquitonet shutter) Extruded Colour Anodised Aluminium Section Equivalent To Jindal Series E (30mm) Sections Numbered: Frame-Bottom With Weep Holes- 20928, Frame Top & Side - 20837; Shutter Top & Bottom- 20993, Shutter Inter Lock - 20550, Shutter Side (Handle) - 20549, With 5 Mm Thick Transparent Tinted Float Glass, With Epdm Rubber Gasket, Air Lock Strip And Finishing Joints With Silicon Sealant, With Powder Coated Standard Alluminium Fittings. Fittings, Fixtures,Rubber Gasket and transparent silicon sealant glass fixing to frame as per drawing and instruction of Engineer - in - charge etc. complete.",
            "unit": "Sqm",
            "basis": "Consider window size 1 × 1.80 × 1.50 = 2.70 Sqmt",
            "basisNote": "Consider window size 1 × 1.80 × 1.50 = 2.70 Sqmt",
            "basisQty": 2.7,
            "cp": 0,
            "pdfRate": 5478.0,
            "sayRate": 5478.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Outer frame section 20928 @ 2.032 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 14.08,
                    "rate": 243.64,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Top",
                            "nos": 2,
                            "l": 1.8,
                            "b": "",
                            "d": "",
                            "qty": 3.6,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Sides",
                            "nos": 2,
                            "l": 1.5,
                            "b": "",
                            "d": "",
                            "qty": 3.0,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Add 5% wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.33,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Shutter section 20837 @ 1.197 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 15.84,
                    "rate": 243.64,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Top & bottom (3 shutter)",
                            "nos": 2,
                            "l": 3,
                            "b": 0.6,
                            "d": "",
                            "qty": 3.6,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Sides vertical",
                            "nos": 2,
                            "l": 3,
                            "b": 1.5,
                            "d": "",
                            "qty": 9.0,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Add 5% wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.63,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "304 stainless steel evenly woven wire mesh — basic 850.00 + 15% C.P.",
                    "unit": "Sqm",
                    "qty": 0.96,
                    "rate": 977.5,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Shutter inter-lock section 20550 @ 0.994 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 6.26,
                    "rate": 243.64,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M258",
                    "page": "12",
                    "label": "Glass 5 mm thick (incl. 5% wastage) — basic 245.76 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 2.835,
                    "rate": 282.62,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "23",
                    "label": "Rubber gasket (incl. 5% wastage) — basic 13.23 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 13.23,
                    "rate": 15.21,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware (L.S.)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 200.0,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Labour charges @ 35% of material cost",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 3834.53,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Window size",
                    "nos": 1,
                    "l": 1.8,
                    "b": 1.5,
                    "d": "",
                    "qty": 2.7,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_160",
            "libNo": "160",
            "itemNo": "47",
            "topic": "Windows",
            "desc": "Windows — Two track window (2 shutter + mosquito net), Jindal E-30 (Garbada)",
            "longDesc": "Providing and fixing Two track (2 shutter +1 mosquitonet shutter) Standard Extruded Colour Anodised Aluminium Section Equivalent To Jindal Series E (30 Mm) Sections Numbered: Frame-Bottom With Weep Holes- 20928, Frame Top & Side - 20837; Shutter Top & Bottom- 20993, Shutter Inter Lock - 20550, Shutter Side (Handle) - 20549, With Mm Thick Transparent Tinted Float Glass, With Epdm Rubber Gasket, Air Lock Strip And Finishing Joints With Silicon Sealant, With Powder Coated Standard Alluminium Fittings. Fittings. Fittings, Fixtures,Rubber Gasket and transparent silicon sealant glass fixing to frame as per drawing and instruction of Engineer - in - charge etc. complete.",
            "unit": "Sqm",
            "basis": "Consider window size 1 × 1.20 × 1.50 = 1.80 Sqmt",
            "basisNote": "Consider window size 1 × 1.20 × 1.50 = 1.80 Sqmt",
            "basisQty": 1.8,
            "cp": 0,
            "pdfRate": 4944.0,
            "sayRate": 4944.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Outer frame section 20928 @ 2.032 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 11.52,
                    "rate": 243.64,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Top",
                            "nos": 2,
                            "l": 1.2,
                            "b": "",
                            "d": "",
                            "qty": 2.4,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Sides",
                            "nos": 2,
                            "l": 1.5,
                            "b": "",
                            "d": "",
                            "qty": 3.0,
                            "unit": "Rmt"
                        },
                        {
                            "label": "Add 5% wastage",
                            "nos": "",
                            "l": "",
                            "b": "",
                            "d": "",
                            "qty": 0.27,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Shutter section 20837 @ 1.197 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 5.28,
                    "rate": 243.64,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "304 stainless steel evenly woven wire mesh — basic 850.00 + 15% C.P.",
                    "unit": "Sqm",
                    "qty": 0.96,
                    "rate": 977.5,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M881",
                    "page": "28",
                    "label": "Shutter inter-lock section 20550 @ 0.994 kg/Rmt — basic 211.86 + 15% C.P.",
                    "unit": "Kg",
                    "qty": 3.13,
                    "rate": 243.64,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "M258",
                    "page": "12",
                    "label": "Glass 5 mm thick (incl. 5% wastage) — basic 245.76 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 1.8774,
                    "rate": 282.62,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "M688",
                    "page": "23",
                    "label": "Rubber gasket (incl. 5% wastage)",
                    "unit": "Rmt",
                    "qty": 8.778,
                    "rate": 7.63,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Hardware (L.S.)",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 200.0,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Labour charges @ 35% of material cost",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 2307.09,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Window size",
                    "nos": 1,
                    "l": 1.2,
                    "b": 1.5,
                    "d": "",
                    "qty": 1.8,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_150",
            "libNo": "150",
            "itemNo": "37",
            "topic": "Stone work",
            "desc": "Stone work — Green marble 18 mm on door/window sills, jambs & cladding (Garbada)",
            "longDesc": "Item No 37 Providing and Fixing Machine Cut free edges,Pre Mirror Polished Green Marble Stone slab 18 mm thick in single peace) for For Doors & windows sill,jambs & Cledding as per design incl. full moulded round front edge and 1cm both side nosing on 20 mm thick cement mortar 1:6 (1 -cement : 6 coarse sand) jointed with grey cement slurry including rubbing, polishing & Finishing etc. complete",
            "unit": "Sqm",
            "basis": "Consider for 1 × 0.30 × 1.20 = 0.36 Sqmt",
            "basisNote": "Consider for 1 × 0.30 × 1.20 = 0.36 Sqmt",
            "basisQty": 0.36,
            "cp": 0,
            "pdfRate": 2103.0,
            "sayRate": 2103.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M390",
                    "page": "16",
                    "label": "Green marble slab — basic 594.07 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 0.36,
                    "rate": 683.18,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 0.3,
                            "b": 1.2,
                            "d": "",
                            "qty": 0.36,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M392",
                    "page": "",
                    "label": "Mirror polish — basic 168.64 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 0.72,
                    "rate": 193.94,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.36,
                            "b": "",
                            "d": "",
                            "qty": 0.72,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M727",
                    "page": "",
                    "label": "Full round moulded edge — basic 51.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 3.0,
                    "rate": 58.65,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.3,
                            "b": "",
                            "d": "",
                            "qty": 0.6,
                            "unit": "Rmt"
                        },
                        {
                            "label": "",
                            "nos": 2,
                            "l": 1.2,
                            "b": "",
                            "d": "",
                            "qty": 2.4,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour cost of fixing — basic 250.00 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 0.36,
                    "rate": 287.5,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "17003A",
                    "page": "",
                    "label": "Cement mortar 1:3 (20 mm thick)",
                    "unit": "Sqmt",
                    "qty": 0.36,
                    "rate": 255.67,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 0.3,
                    "b": 1.2,
                    "d": "",
                    "qty": 0.36,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_151",
            "libNo": "151",
            "itemNo": "39",
            "topic": "Stone work",
            "desc": "Stone work — Granite 18 mm for stair treads, steps & landing (Garbada)",
            "longDesc": "Item No 39 Providing and laying Machine Cut free edges, Machine polished Granite Stone slab 18 mm thick single peace For Stair,Steps,landing as per design incl. full moulded round front edge and 1cm nosing and necessary groove on trade of steps laid on 20 mm thick cement mortar 1:6 (1 -cement : 6 coarse sand ) jointed with grey cement slurry including rubbing, polishing & Finishing etc. complete",
            "unit": "Sqm",
            "basis": "Consider for 1 × 2.00 × 0.33 = 0.66 Sqmt",
            "basisNote": "Consider for 1 × 2.00 × 0.33 = 0.66 Sqmt",
            "basisQty": 0.66,
            "cp": 0,
            "pdfRate": 2347.0,
            "sayRate": 2347.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "Granite stone slab of approved colour — basic 1347.46 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 0.66,
                    "rate": 1549.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.0,
                            "b": 0.33,
                            "d": "",
                            "qty": 0.66,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Round moulded edge — basic 85.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 2.66,
                    "rate": 97.75,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 1,
                            "b": 2.0,
                            "d": "",
                            "qty": 2.0,
                            "unit": "Rmt"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2,
                            "b": 0.33,
                            "d": "",
                            "qty": 0.66,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour cost of fixing — basic 250.00 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 0.66,
                    "rate": 287.5,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "17003A",
                    "page": "",
                    "label": "Cement mortar 1:3 (20 mm thick)",
                    "unit": "Sqmt",
                    "qty": 0.3,
                    "rate": 255.67,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 2.0,
                    "b": 0.33,
                    "d": "",
                    "qty": 0.66,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_162",
            "libNo": "162",
            "itemNo": "39",
            "topic": "Stone work",
            "desc": "Stone work — Both side double polished granite 18 mm partition slab (Garbada)",
            "longDesc": "ITEM NO. 39 Providing and laying Both Side machine Double Side Polished Granite Stone slab 18 mm thick average thick of approved quality incl. full moulded round front edge fixed in wall for Partition and jointed with white cement slurry including rubbing,polishing & Finishing 26 etc. complete",
            "unit": "Sqm",
            "basis": "Top of base 1 × 2.50 × 0.60 = 1.50 Sqmt",
            "basisNote": "Top of base 1 × 2.50 × 0.60 = 1.50 Sqmt",
            "basisQty": 1.5,
            "cp": 0,
            "pdfRate": 1687.0,
            "sayRate": 1687.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "Granite stone slab 18 mm thick",
                    "unit": "Sqmt",
                    "qty": 1.5,
                    "rate": 1347.46,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Top of base",
                            "nos": 1,
                            "l": 2.5,
                            "b": 0.6,
                            "d": "",
                            "qty": 1.5,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M724",
                    "page": "24",
                    "label": "Round moulding on exposed edge",
                    "unit": "Rmt",
                    "qty": 3.7,
                    "rate": 85.0,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 2,
                            "l": 0.6,
                            "b": "",
                            "d": "",
                            "qty": 1.2,
                            "unit": "Rmt"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 2.5,
                            "b": "",
                            "d": "",
                            "qty": 2.5,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "For making groove",
                    "unit": "Sqmt",
                    "qty": 1.5,
                    "rate": 30.0,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "For cutting hole for outlet",
                    "unit": "No",
                    "qty": 3,
                    "rate": 50.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1.0,
                    "l": 2.5,
                    "b": 0.6,
                    "d": "",
                    "qty": 1.5,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_156",
            "libNo": "156",
            "itemNo": "76",
            "topic": "Stone platform",
            "desc": "Stone platform — Sandwich platform 18 mm granite on 25 mm kota, 75 cm height (Garbada)",
            "longDesc": "Item no. 76 Constructing Sandwich Platform of 18 mm thick Polished Black or selected Granite at top and 25 mm thick Kota stone slab With 75CM height with necessary Support using 20mm thick cement mortar 1:3 for sandwich and fitting at bottom & edges with waterproof rigid adhesives including making necessary grooves in walls with Vertical support of double Kota stone sandwich every 60 cm centre to centre including all labour material of approved quality including full moulded round front edge fixed in wall for partition and jointed with grey cement slurry including rubbing and polishing etc. complete",
            "unit": "Sqm",
            "basis": "Consider size 1 × 5.20 × 0.75 × 0.75 = 3.90 Sqmt",
            "basisNote": "Consider size 1 × 5.20 × 0.75 × 0.75 = 3.90 Sqmt",
            "basisQty": 3.9,
            "cp": 0,
            "pdfRate": 3630.0,
            "sayRate": 3630.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M490",
                    "page": "18",
                    "label": "Kota stone slab 25 mm thick — basic 198.31 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 13.35,
                    "rate": 228.06,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 5.2,
                            "b": 0.75,
                            "d": "",
                            "qty": 3.9,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Vertical supports",
                            "nos": 14,
                            "l": 0.75,
                            "b": 0.9,
                            "d": "",
                            "qty": 9.45,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M253",
                    "page": "12",
                    "label": "Granite stone slab of approved colour — basic 1347.46 + 15% C.P.",
                    "unit": "Sqmt",
                    "qty": 6.16,
                    "rate": 1549.58,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "Top",
                            "nos": 1,
                            "l": 5.2,
                            "b": 0.75,
                            "d": "",
                            "qty": 3.9,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Patti",
                            "nos": 1,
                            "l": 5.2,
                            "b": 0.1,
                            "d": "",
                            "qty": 0.52,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "Patti",
                            "nos": 7,
                            "l": 0.75,
                            "b": 0.075,
                            "d": "",
                            "qty": 0.39,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 0.9,
                            "b": 1.5,
                            "d": "",
                            "qty": 1.35,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "17003A",
                    "page": "",
                    "label": "Cement mortar 1:3 (20 mm thick)",
                    "unit": "Sqmt",
                    "qty": 4.81,
                    "rate": 255.67,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 5.2,
                            "b": 0.75,
                            "d": "",
                            "qty": 3.9,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "",
                            "nos": 1,
                            "l": 5.2,
                            "b": 0.1,
                            "d": "",
                            "qty": 0.52,
                            "unit": "Sqmt"
                        },
                        {
                            "label": "",
                            "nos": 7,
                            "l": 0.75,
                            "b": 0.075,
                            "d": "",
                            "qty": 0.39,
                            "unit": "Sqmt"
                        }
                    ]
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M726",
                    "page": "",
                    "label": "Labour for round moulding edge — basic 43.00 + 15% C.P.",
                    "unit": "Rmt",
                    "qty": 6.7,
                    "rate": 49.45,
                    "cpApply": false,
                    "rows": [
                        {
                            "label": "",
                            "nos": "",
                            "l": 5.2,
                            "b": "",
                            "d": "",
                            "qty": 5.2,
                            "unit": "Rmt"
                        },
                        {
                            "label": "",
                            "nos": "",
                            "l": 1.5,
                            "b": "",
                            "d": "",
                            "qty": 1.5,
                            "unit": "Rmt"
                        }
                    ]
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "",
                    "nos": 1,
                    "l": 5.2,
                    "b": 0.75,
                    "d": 0.75,
                    "qty": 3.9,
                    "unit": "Sqmt"
                }
            ]
        },
        {
            "id": "lib_152",
            "libNo": "152",
            "itemNo": "48",
            "topic": "SS railing",
            "desc": "SS railing — 90 cm high SS 304 railing with 32 mm balusters (Garbada)",
            "longDesc": "Item No 48 Providing and fixing 90 cm high Stainless steel railing 304 Grade made from anticorrocive S S pipe of 50 mm dia (16Gauge) as hand rail with S S 32 mm dia (16Gauge) as a vertical support fixed in RCC slab at 1.2m c/c including three horizontal S S pipes of 16 mm dia (16Gauge) at eqal distance fixed by 18.75 mm dia (16Gauge) S S pipe including accessories as per detailed drawing as directed etc. complete. 1 50 mm dia pipe Sor M714 1004.24 Qty:- 3.50 TOTAL 3.50 3.50 x 1004.24 Rs./ Rmt. = 3514.84 …[1] 2 32 mm dia s s pipe for supoorts at 1.2 mt Sor M715 454.24 Qty:- 4 supoorts 4 x 0.90 3.60 TOTAL 3.60 3.60 x 454.24 Rs./ Rmt. = 1635.26 …[2] 3 16 mm s s pipe Horizontal 3 Nos. Sor M716 366.10 10.50 x 366.10 Rs./ Rmt. = 3844.05 …[3] Round ball at Top Market Rate 1.00 x 200.00 Rs./ No. = 200.00 …[5] Labour carhges for preparation and fixing Market Rate 3.50 x 250.00 Rs./ Rmt. = 875.00 …[6] Total 1 to 6 = 10069.15 / 3.50 Rmt. Rate per Rmt. = 2876.90 15% CP 431.54 Total = 3308.44 / Rmt. Say 3308.00 Rs/Rmt Deputy Executive Engineer Executive Engineer R & B sub Division, Dahod R & B Division, Dahod Page 21 of 35",
            "unit": "Rmt",
            "basis": "Rate analysis for one flight of 3.50 mt. long",
            "basisNote": "Rate analysis for one flight of 3.50 mt. long",
            "basisQty": 3.5,
            "cp": 15,
            "pdfRate": 3308.0,
            "sayRate": 3308.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M714",
                    "page": "",
                    "label": "50 mm dia S.S. pipe hand rail",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 1004.24,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 1,
                            "l": 3.5,
                            "b": "",
                            "d": "",
                            "qty": 3.5,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M715",
                    "page": "",
                    "label": "32 mm dia S.S. pipe for supports at 1.2 mt c/c",
                    "unit": "Rmt",
                    "qty": 3.6,
                    "rate": 454.24,
                    "cpApply": true,
                    "rows": [
                        {
                            "label": "",
                            "nos": 4,
                            "l": 0.9,
                            "b": "",
                            "d": "",
                            "qty": 3.6,
                            "unit": "Rmt"
                        }
                    ]
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "M716",
                    "page": "",
                    "label": "16 mm dia S.S. pipe horizontal, 3 nos.",
                    "unit": "Rmt",
                    "qty": 10.5,
                    "rate": 366.1,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Round ball at top",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 200.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges for preparation and fixing",
                    "unit": "Rmt",
                    "qty": 3.5,
                    "rate": 250.0,
                    "cpApply": true
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "One flight",
                    "nos": 1,
                    "l": 3.5,
                    "b": "",
                    "d": "",
                    "qty": 3.5,
                    "unit": "Rmt"
                }
            ]
        },
        {
            "id": "lib_153",
            "libNo": "153",
            "itemNo": "56",
            "topic": "Sanitary",
            "desc": "Sanitary — Table top wash basin 610 × 450 mm with C.P. fittings (Garbada)",
            "longDesc": "ITEM NO 56 Providing and fixing Table top wash basin of Size 610x450mm with C.P. brass waste for washbasin or sink. & 32mm pillar tap, Bottal trap capstan head, screw down high pressure with screws, shanks and back nuts. (i) 32mm dia. Providing and fixing brass screw down stop tap. (A) 32mm dia..",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 6138.0,
            "sayRate": 6138.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Table top wash basin",
                    "unit": "No",
                    "qty": 1,
                    "rate": 4500.0,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Pillar tap",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1200.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "23020A",
                    "page": "",
                    "label": "C.P. brass waste (A) 32 mm dia",
                    "unit": "No",
                    "qty": 1,
                    "rate": 67.24,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "23036",
                    "page": "",
                    "label": "C.P. brass bottle trap",
                    "unit": "No",
                    "qty": 1,
                    "rate": 292.87,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "23021A",
                    "page": "",
                    "label": "M.I. fisher union 32 mm dia",
                    "unit": "No",
                    "qty": 1,
                    "rate": 77.97,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_154",
            "libNo": "154",
            "itemNo": "57",
            "topic": "Sanitary",
            "desc": "Sanitary — SS 304 kitchen sink 610 × 460 mm, Nirali or equivalent (Garbada)",
            "longDesc": "Item no. 57 Providing & Fixing stainless steel sink Glossy ASIS 304 Grade and 1 mm thick with with over all size 610x460 mm & bowl size 560x410x200 of Nirali brand or Equivalent with all fitting C I Or M.S Brackets painted white /or fixing on stone base including cutting holes and making good the same brass wastw and M I fisher union fitting including all necessary fitting.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2321.0,
            "sayRate": 2321.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "M729",
                    "page": "",
                    "label": "Stainless steel kitchen sink, Nirali or equivalent — basic 1525.42 + 15% C.P.",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1754.23,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "23020A",
                    "page": "",
                    "label": "C.P. brass waste (A) 32 mm dia",
                    "unit": "No",
                    "qty": 1,
                    "rate": 67.24,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge for fixing",
                    "unit": "No",
                    "qty": 1,
                    "rate": 500.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_155",
            "libNo": "155",
            "itemNo": "59",
            "topic": "Sanitary",
            "desc": "Sanitary — Wall hung European WC with 50 mm Metropol push valve (Garbada)",
            "longDesc": "Item no. 59 Providing and fixing water closet squatting pan Wall Hung ( Uropian type W.C. Pan equivalent size 580 mm including, 50 mm Dia Metropol push valve 100mm size P or S trap for water closet squatting pan including jointing the trap with the pan and soil pipe in cement mortar 1:1 etc.complete.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 8268.0,
            "sayRate": 8268.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Wall hung European type W.C. pan (Hindustan / Cera / Parryware / Hindware) — basic 4500.00 + 15% C.P.",
                    "unit": "No",
                    "qty": 1,
                    "rate": 5175.0,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M620",
                    "page": "",
                    "label": "White vitreous china 100 mm 'P' or 'S' trap — basic 73.73 + 15% C.P.",
                    "unit": "No",
                    "qty": 1,
                    "rate": 84.79,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "50 mm dia Metropol push valve — basic 1500.00 + 15% C.P.",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1725.0,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "M097",
                    "page": "",
                    "label": "Plastic seat with cover, C.P. brass hinges — basic 246.61 + 15% C.P.",
                    "unit": "No",
                    "qty": 1,
                    "rate": 283.6,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charge for fixing",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1000.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_163",
            "libNo": "163",
            "itemNo": "53",
            "topic": "Sanitary",
            "desc": "Sanitary — Wall hung wash-down WC with Metropole flush valve, soft-close seat (Garbada D-type)",
            "longDesc": "Providing and fixing wash down water closet Wall Hung W.C. Pan with integral P or S trap and Metropole Flush Valve with complete fittings including cutting holes in walls and making good the same connecting the flush bend with cistern and closet etc. complete including plastic seat cover 29 and including jointing trap with Waste pipe overall size as per the selection of the Model by E.I.C. or as approved}",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 10,
            "pdfRate": 18149.0,
            "sayRate": 18149.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Wall hung European toilet",
                    "unit": "No",
                    "qty": 1,
                    "rate": 6500.0,
                    "cpApply": true
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Metropole flush valve",
                    "unit": "No",
                    "qty": 1,
                    "rate": 2500.0,
                    "cpApply": true
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Soft close seat cover (Cat. No. B1520118)",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1935.0,
                    "cpApply": true
                },
                {
                    "sr": "4",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "288 mm long bottle trap (Cat. No. F8060301)",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1657.0,
                    "cpApply": true
                },
                {
                    "sr": "5",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Toilet paper holder (Cat. No. F5001109)",
                    "unit": "No",
                    "qty": 1,
                    "rate": 1157.0,
                    "cpApply": true
                },
                {
                    "sr": "6",
                    "kind": "Manual",
                    "code": "",
                    "page": "",
                    "label": "Add labour charges with all materials @ 20%",
                    "unit": "LS",
                    "qty": 1,
                    "rate": 2749.8,
                    "cpApply": true
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_161",
            "libNo": "161",
            "itemNo": "36",
            "topic": "Flooring",
            "desc": "Flooring — GVT glossy 60 × 60 cm tile in flooring, treads & landing (Garbada)",
            "longDesc": "Item No 36 Providing and laying 60 x 60cm & 10mm thick G.V.T Glossy Tiles in flooring treads of steps and landing laid over 20mm (Average) 23 thick base of cement mortar 1:6 (1-cement : 6-coarse sand) laid over and jointed with whitw cement slurry incluiding finishing with flush pointing and cleaning the surface etc.complete.",
            "unit": "Sqm",
            "basis": "Per 1.00 Sqmt",
            "basisNote": "Per 1.00 Sqmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1734.0,
            "sayRate": 1734.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14022A",
                    "page": "97",
                    "label": "Providing and laying vitrified tiles in flooring over 20 mm thick bed of C.M. 1:6, finished with flush pointing in white cement",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 1420.54,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "M599",
                    "page": "21",
                    "label": "Deduct cost of vitrified tiles",
                    "unit": "Sqmt",
                    "qty": -1.0,
                    "rate": 296.61,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add cost of GVT matt finish tiles",
                    "unit": "Sqmt",
                    "qty": 1.0,
                    "rate": 610.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Sqm"
                }
            ]
        },
        {
            "id": "lib_164",
            "libNo": "164",
            "itemNo": "77",
            "topic": "Drainage",
            "desc": "Drainage — Sock pit 2.28 m inner dia × 6.50 m deep (Garbada D-type)",
            "longDesc": "Item no. 77 Providing and construction 2.28 mt inner dia and 6.50mt deep sock pit including excavation BBCC, Brick masonary work at bottom and top including RCC Slab at top in honey combica masonary in mud goober as directed.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 60954.0,
            "sayRate": 60954.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "A",
                    "kind": "SOR",
                    "code": "4001A",
                    "page": "33",
                    "label": "Excavation for 0.0 to 1.5 m foundation depth",
                    "unit": "Cum",
                    "qty": 3.82,
                    "rate": 124.61,
                    "cpApply": false
                },
                {
                    "sr": "B",
                    "kind": "SOR",
                    "code": "4002A",
                    "page": "33",
                    "label": "Excavation for 1.5 to 3.00 m foundation depth",
                    "unit": "Cum",
                    "qty": 3.82,
                    "rate": 138.16,
                    "cpApply": false
                },
                {
                    "sr": "C",
                    "kind": "SOR",
                    "code": "04003A",
                    "page": "33",
                    "label": "Excavation for 3.00 to 5.00 m foundation depth",
                    "unit": "Cum",
                    "qty": 5.09,
                    "rate": 151.69,
                    "cpApply": false
                },
                {
                    "sr": "D",
                    "kind": "SOR",
                    "code": "04004A",
                    "page": "43",
                    "label": "Excavation for 5.00 to 7.00 m foundation depth",
                    "unit": "Cum",
                    "qty": 5.09,
                    "rate": 196.29,
                    "cpApply": false
                },
                {
                    "sr": "E",
                    "kind": "SOR",
                    "code": "6002BA",
                    "page": "53",
                    "label": "Brick masonry in C.M. 1:6 (honey combed)",
                    "unit": "Cum",
                    "qty": 12.82,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "F",
                    "kind": "SOR",
                    "code": "6002BA",
                    "page": "53",
                    "label": "Brick masonry in C.M. 1:6 (solid masonry)",
                    "unit": "Cum",
                    "qty": 0.87,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "G",
                    "kind": "SOR",
                    "code": "05026B",
                    "page": "43",
                    "label": "Slab cover M-1:2:4 (less deduction for manhole cover)",
                    "unit": "Cum",
                    "qty": 0.27,
                    "rate": 7401.59,
                    "cpApply": false
                },
                {
                    "sr": "H",
                    "kind": "SOR",
                    "code": "05014C",
                    "page": "40",
                    "label": "Providing TMT steel @ 55 kg/Cmt",
                    "unit": "Kg",
                    "qty": 16.79,
                    "rate": 76.52,
                    "cpApply": false
                },
                {
                    "sr": "I",
                    "kind": "SOR",
                    "code": "23005B",
                    "page": "133",
                    "label": "C.I. pipe 75 mm dia",
                    "unit": "Rmt",
                    "qty": 1.8,
                    "rate": 733.67,
                    "cpApply": false
                },
                {
                    "sr": "J",
                    "kind": "SOR",
                    "code": "23006B",
                    "page": "133",
                    "label": "Cowl vent 75 mm dia",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 389.15,
                    "cpApply": false
                },
                {
                    "sr": "K",
                    "kind": "SOR",
                    "code": "23038",
                    "page": "136",
                    "label": "Manhole cover",
                    "unit": "No",
                    "qty": 1.0,
                    "rate": 948.68,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_170",
            "libNo": "170",
            "itemNo": "5",
            "topic": "Drainage",
            "desc": "Drainage — Filter chamber 2.06 × 1.21 × 1.20 m (Garbada)",
            "longDesc": "Providing and constructing filter chamber of size 2.06 x 1.21 x 1.20 mt. as directed including Excavation, Cement concrete 1:2:4,Brick work C.M a:6,Half brick masonary C.M - 1:4,15mm thick plaster C.M.1:4 & Cement concrete flooring connection rainwater pipes as per detailed as directed by Engineer in charge including cost of labour and material.",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 11473.0,
            "sayRate": 11473.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "04001B",
                    "page": "33",
                    "label": "Excavation for foundation upto 1.50 m depth",
                    "unit": "Cum",
                    "qty": 3.49,
                    "rate": 159.3,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "05010AA",
                    "page": "38",
                    "label": "Providing and laying cement concrete 1:2:4 — bed and cover",
                    "unit": "Cum",
                    "qty": 0.57,
                    "rate": 3617.44,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "06002BA",
                    "page": "54",
                    "label": "Brick masonry in common burnt clay bricks in C.M. 1:6",
                    "unit": "Cum",
                    "qty": 1.54,
                    "rate": 3815.08,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "06008A2A",
                    "page": "55",
                    "label": "Half brick masonry in C.M. 1:4",
                    "unit": "Sqm",
                    "qty": 0.9,
                    "rate": 584.17,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "17002B",
                    "page": "103",
                    "label": "Providing 15 mm thick cement plaster in C.M. 1:4",
                    "unit": "Sqm",
                    "qty": 9.6,
                    "rate": 177.78,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "09001QA",
                    "page": "62",
                    "label": "Providing form work of ordinary planking",
                    "unit": "Sqm",
                    "qty": 1.2,
                    "rate": 411.43,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "26012B+26012C",
                    "page": "147",
                    "label": "Supplying of kapachi 25 mm to 40 mm (supply and spreading)",
                    "unit": "Cum",
                    "qty": 0.2,
                    "rate": 676.21,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "SOR",
                    "code": "26015+26020A",
                    "page": "147",
                    "label": "Supplying of coarse sand (supply and spreading)",
                    "unit": "Cum",
                    "qty": 0.6,
                    "rate": 197.27,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_171",
            "libNo": "171",
            "itemNo": "4",
            "topic": "Drainage",
            "desc": "Drainage — Junction chamber 0.35 × 0.35 × 0.60 m for rain water pipe (Garbada)",
            "longDesc": "Providing and Construction of Junction chambers of size 0.35 x 0.35 x 0.60 mt. including Excavation, Cement concrete 1:2:4,Half brick masonary a:4,15mm thick plaster C.M.1:4 & Cement concrete flooring connecting of rainwater pipe as per detailed drawing and as directed by Engineer in charge",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 1411.0,
            "sayRate": 1411.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "04001B",
                    "page": "33",
                    "label": "Excavation for foundation",
                    "unit": "Cum",
                    "qty": 0.25,
                    "rate": 159.3,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "05010AA",
                    "page": "38",
                    "label": "Providing and laying cement concrete 1:2:4",
                    "unit": "Cum",
                    "qty": 0.04,
                    "rate": 3617.44,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "06008A2A",
                    "page": "55",
                    "label": "Half brick masonry in C.M. 1:4",
                    "unit": "Sqm",
                    "qty": 1.12,
                    "rate": 584.17,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "17002B",
                    "page": "103",
                    "label": "Providing 15 mm thick cement plaster in C.M. 1:4",
                    "unit": "Sqm",
                    "qty": 0.84,
                    "rate": 177.78,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "14015BA",
                    "page": "96",
                    "label": "Providing and laying cement concrete flooring 50 mm thick",
                    "unit": "Sqm",
                    "qty": 1.2,
                    "rate": 352.17,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_172",
            "libNo": "172",
            "itemNo": "6",
            "topic": "Drainage",
            "desc": "Drainage — Water harvesting pit 2.00 × 2.00 × 4.00 m with 250 mm bore (Garbada)",
            "longDesc": "Providing water harvesting pit of 2.00 mt x 2.00mt x 4.00 mt. size for water logging with excavation in any strata upto four meter depth, filling the pit with B.T.Metal 40 mm in 0.60 mt. depth with 25-40mm kapachi, 0.30 mt. depth and 2.0 mt. depth with coarse sand in layers including making P.V.C. line for water inlet etc. as directed with 250mm dia bore 35 mt. depth and 150mm dia P.V.C. pipe of 10 Kg. f/Cm2 casing with gravel packing or as directed. Sr. Item of Work Quantity Rate Per Amount 1 2 3 4 5 6 Excavation for Foundation upto 1.50 mt. depth 6.00 159.30 Cu.M. 955.80 2.00 x 2.00 x 1.50 = 6.00 Cu.M. {S.O.R. P. No. 33 It. No.04001B } Excavation for foundation from 1.50 mt. to 6.00 172.83 Cu.M. 1036.98 3.00 mt. depth 2.00 x 2.00 x 1.50 = 6.00 Cu.M. {S.O.R. P. No. 33 It. No.04002B } Excavation for foundation from 3.00 mt. to 4.00 151.69 Cu.M. 606.76 4.00 mt. depth 2.00 x 2.00 x 1.00 = 4.00 Cu.M. {S.O.R. P. No. 33 It. No.04003A} Filling plinth with BT Metal 40mm size (supply 2.40 646.38 Cu.M. 1551.31 and Speding (it no 26012B+ 26018A =380.55+265.83 /P-190/91)) 2.00 x 2.00 x 0.60 = 2.40 Cu.M. Supplying of Kapachi 25mm to 40mm 1.20 676.21 Cu.M. 811.45 (it no (26012B+26012C)/2 + 26018B =(380.55+440.21)/2+265.83 /P-147/48) 2.00 x 2.00 x 0.30 = 1.20 Cu.M. Supply of B.T. Kapachi {10mm to 20mm size}. 1.20 757.65 Cu.M. 909.17 (it no (26012D+26012E)/2 + 26018B =(499.88+483.75)/2+265.83 /P-147/48) 2.00 x 2.00 x 0.30 = 1.20 Cu.M. Supplying of coarse sand 8.00 197.27 Cu.M. 1578.16 (supply and Speding (it no 26015 + 26020A =(237.58+156.96)/2 /P-147/148)) 2.00 x 2.00 x 2.00 = 8.00 Cu.M. Drilling 250mm dia Bore hole 35.00 1111.00 Rmt. 38885.00 35.00 Rmt. 963+148 (GWSSB SOR Rate 2022-23 approved Rate Page No. 11 Section-A )",
            "unit": "No",
            "basis": "Per 1 No",
            "basisNote": "Per 1 No",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 99875.0,
            "sayRate": 99875.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "04001B",
                    "page": "33",
                    "label": "Excavation for foundation upto 1.50 m depth",
                    "unit": "Cum",
                    "qty": 6.0,
                    "rate": 159.3,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "04002B",
                    "page": "33",
                    "label": "Excavation for foundation from 1.50 m to 3.00 m depth",
                    "unit": "Cum",
                    "qty": 6.0,
                    "rate": 172.83,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "SOR",
                    "code": "04003A",
                    "page": "33",
                    "label": "Excavation for foundation from 3.00 m to 4.00 m depth",
                    "unit": "Cum",
                    "qty": 4.0,
                    "rate": 151.69,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "26012B+26018A",
                    "page": "190",
                    "label": "Filling pit with B.T. metal 40 mm size (supply and spreading)",
                    "unit": "Cum",
                    "qty": 2.4,
                    "rate": 646.38,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "26012B+26012C",
                    "page": "147",
                    "label": "Supplying of kapachi 25 mm to 40 mm",
                    "unit": "Cum",
                    "qty": 1.2,
                    "rate": 676.21,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "26012D+26012E",
                    "page": "147",
                    "label": "Supply of B.T. kapachi 10 mm to 20 mm size",
                    "unit": "Cum",
                    "qty": 1.2,
                    "rate": 757.65,
                    "cpApply": false
                },
                {
                    "sr": "7",
                    "kind": "SOR",
                    "code": "26015+26020A",
                    "page": "147",
                    "label": "Supplying of coarse sand",
                    "unit": "Cum",
                    "qty": 8.0,
                    "rate": 197.27,
                    "cpApply": false
                },
                {
                    "sr": "8",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Drilling 250 mm dia bore hole (GWSSB SOR 2022-23 approved rate)",
                    "unit": "Rmt",
                    "qty": 35.0,
                    "rate": 1111.0,
                    "cpApply": false
                },
                {
                    "sr": "9",
                    "kind": "Quotation",
                    "code": "",
                    "page": "",
                    "label": "Providing P.V.C. casing pipe 200 mm dia 10 kgf/Cm2 including lowering (GWSSB SOR 2022-23)",
                    "unit": "Rmt",
                    "qty": 35.0,
                    "rate": 1444.0,
                    "cpApply": false
                },
                {
                    "sr": "10",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Labour charges for filling kapachi, grit, brick bats etc. complete (L.S.)",
                    "unit": "Job",
                    "qty": 1,
                    "rate": 3000.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "No"
                }
            ]
        },
        {
            "id": "lib_167",
            "libNo": "167",
            "itemNo": "2",
            "topic": "Road",
            "desc": "Road — Compacted W.B.M. 150 mm thick with 45–63 mm B.T. metal (Garbada)",
            "longDesc": "Providing and laying compacted W.B.M. 150 mm thick of machine crushed B.T. metal of size 45 mm to 63 mm with using 0.12/ cmt./10 Smt stone screenings as filler and binding material 0.06 cum./ 10 Smt. including spreading, watering & consolidation by vibratory roller etc complete.",
            "unit": "Cum",
            "basis": "For 1 Cum.",
            "basisNote": "For 1 Cum.",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 2192.0,
            "sayRate": 2192.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "B.T. metal 45 to 63 mm",
                    "unit": "Cum",
                    "qty": 1.21,
                    "rate": 1238.22,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Stone screening 11.2 mm",
                    "unit": "Cum",
                    "qty": 0.16,
                    "rate": 1375.22,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Stone dust",
                    "unit": "Cum",
                    "qty": 0.08,
                    "rate": 1016.17,
                    "cpApply": false
                },
                {
                    "sr": "4",
                    "kind": "SOR",
                    "code": "26018A",
                    "page": "149",
                    "label": "Spreading B.T. metal",
                    "unit": "Cum",
                    "qty": 1.21,
                    "rate": 265.83,
                    "cpApply": false
                },
                {
                    "sr": "5",
                    "kind": "SOR",
                    "code": "26020A",
                    "page": "150",
                    "label": "Spreading stone screening & binding material murrum",
                    "unit": "Cum",
                    "qty": 0.24,
                    "rate": 156.96,
                    "cpApply": false
                },
                {
                    "sr": "6",
                    "kind": "SOR",
                    "code": "26118",
                    "page": "201",
                    "label": "Rolling & consolidation",
                    "unit": "Cum",
                    "qty": 1.0,
                    "rate": 32.76,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_168",
            "libNo": "168",
            "itemNo": "4",
            "topic": "Road",
            "desc": "Road — Ready mix M-300 with ironite and trimix process (Garbada)",
            "longDesc": "Providing and laying in position Ready Mix M-300 grade Controll concrete with ironite material 4 Kg. / Sqm for reinforced cement concrete work, using cement content as per approved design Mix manufactured in fully aautomatic batching plant and transported to site of work in transit mixer for lead up to 10 kkms having continous agitated mixer, manufactured as per mix design of specified grade for reinforced cement concrete work including pumping of R.M.C. from transit mixer to site of laying, excluding the cost of centering shuttering finishing and reinforcement including cost of admixtures in recommanded prportions as per IS : 9103 to accelerate/ retard setting of concrete, improve workability without impairing strength and durability as per direction of the Engineer in charge Without Fly Ash (Min cement level as per latest IS 456 shall be maintained) including labour charges for Trimix process,it is flooter,surface vibrator,Vacume etc complete.",
            "unit": "Cum",
            "basis": "Per 1 Cmt",
            "basisNote": "Per 1 Cmt",
            "basisQty": 1.0,
            "cp": 0,
            "pdfRate": 5977.0,
            "sayRate": 5977.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "5057",
                    "page": "51",
                    "label": "Ready mix M-300 grade controlled concrete",
                    "unit": "Cmt",
                    "qty": 1.0,
                    "rate": 5077.03,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add ironite material 4 kg/Cum",
                    "unit": "Kg",
                    "qty": 4.0,
                    "rate": 150.0,
                    "cpApply": false
                },
                {
                    "sr": "3",
                    "kind": "MR",
                    "code": "",
                    "page": "",
                    "label": "Add cost of trimix vibrator / vacuum / flooter — 5.00 Smt covered by 0.20 m thickness",
                    "unit": "Smt",
                    "qty": 5.0,
                    "rate": 60.0,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Rate for",
                    "nos": "",
                    "l": "",
                    "b": "",
                    "d": "",
                    "qty": 1.0,
                    "unit": "Cum"
                }
            ]
        },
        {
            "id": "lib_169",
            "libNo": "169",
            "itemNo": "9",
            "topic": "Road",
            "desc": "Road — Pre-cast concrete kerb stone M-250 with three-coat epoxy paint (Garbada)",
            "longDesc": "Providing and fixing pre-cast concrete kerb stone of gray cement based concrete block 30cm length,30cm height and 15cm thick of M250 grade concret as per approved design and including excavation for fixing in proper line and level,filling the joint with C:M 1:3 (1cement:3fine sand) etc complete.(upto 10 ton) with oil paint colour to It. No. 9 Kerb by Yellow/white and Black patta (Three Coat) one coat of priming & two coat of oil Paint including cost of material required for paint and all labour worketc complete as per direction, detailed drawing and instruction of engineer incharge .(Including Epoxy Piant of Approved Quality)(R.A.-3)",
            "unit": "Rmt",
            "basis": "Considering 30 mt length of kerb — 100 Rmt basis",
            "basisNote": "Considering 30 mt length of kerb — 100 Rmt basis",
            "basisQty": 100.0,
            "cp": 0,
            "pdfRate": 413.0,
            "sayRate": 413.0,
            "floors": false,
            "source": "ANS Garbada merged estimate — school / hostel / kitchen / quarters / road (SOR 2024-25)",
            "components": [
                {
                    "sr": "1",
                    "kind": "SOR",
                    "code": "14032",
                    "page": "98",
                    "label": "Cost of kerbing — pre-cast concrete kerb stone 30 × 30 × 15 cm, M-250",
                    "unit": "Rmt",
                    "qty": 100.0,
                    "rate": 371.21,
                    "cpApply": false
                },
                {
                    "sr": "2",
                    "kind": "SOR",
                    "code": "19001+19007",
                    "page": "110",
                    "label": "Applying prime coat (35.56) + painting one coat excluding priming coat (101.85)",
                    "unit": "Smt",
                    "qty": 30.0,
                    "rate": 137.41,
                    "cpApply": false
                }
            ],
            "origin": "ANS Garbada (quarters/road)",
            "basisRows": [
                {
                    "label": "Length of kerb",
                    "nos": 1,
                    "l": 100.0,
                    "b": "",
                    "d": "",
                    "qty": 100.0,
                    "unit": "Rmt"
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
