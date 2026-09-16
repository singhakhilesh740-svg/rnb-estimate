/* ============================================================================
   R&B Estimate Builder — RATE ANALYSIS LIBRARY (district-wise)
   Source: Principle Judge Family Court E-2 Type (Dahod) estimate + SOR 2024-25
   Each RA computes its 'sayRate' from components. SOR components pull rate
   from the district's SOR table by { code, page }. MR & Quotation rates live
   here in DISTRICT_RA_LIBRARY, editable per-district in the Data → RA tab.
   ========================================================================== */

// Master library keyed by district.
// To seed a new district: copy the 'Dahod' block, change the district field,
// and adjust MR/Quotation rates. SOR codes remain the same across Gujarat.

const DISTRICT_RA_LIBRARY = {
  'Dahod': {
    "district": "Dahod",
    "sorYear": "2024-25",
    "sourceEstimate": "Construction of Principle Judge Family Court (E-2 Type), Dist-Dahod",
    "rateAnalysis": [
      {
        "no": "1",
        "itemNo": 8,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-250 for Foundations, footings, Mass concrete (footing)",
        "unit": "Cum",
        "sayRate": 4556,
        "basis": "Per 3.35 Cum footing",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001AA",
            "page": "59",
            "rate": 186.24,
            "unit": "Sqm",
            "qty": 6.3,
            "amount": 1173.31,
            "desc": "Form work: columns/pillars/posts/struts upto floor two level"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05025AA",
            "page": "42",
            "rate": 4205.16,
            "unit": "Cum",
            "qty": 3.35,
            "amount": 14087.29,
            "desc": "RMC M-250 for foundations/footings/mass concrete"
          }
        ]
      },
      {
        "no": "2",
        "itemNo": 9,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-250 for columns up to Plinth level",
        "unit": "Cum",
        "sayRate": 7605,
        "basis": "Per 0.71 Cum column",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001G1A",
            "page": "60",
            "rate": 323.29,
            "unit": "Sqm",
            "qty": 6.62,
            "amount": 2140.18,
            "desc": "Form work: columns upto floor two level"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05025DA",
            "page": "42",
            "rate": 4590.29,
            "unit": "Cum",
            "qty": 0.71,
            "amount": 3259.11,
            "desc": "CC M-250 excluding formwork for columns"
          }
        ]
      },
      {
        "no": "3",
        "itemNo": 11,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Columns, pillars, posts & struts",
        "unit": "Cum",
        "sayRate": 7571,
        "basis": "Per 1.01 Cum column",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001G1",
            "page": "60",
            "rate": 323.39,
            "unit": "Sqm",
            "qty": 9.45,
            "amount": 3056.04,
            "desc": "Form work: columns upto floor two level"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05024DA",
            "page": "42",
            "rate": 4544.94,
            "unit": "Cum",
            "qty": 1.01,
            "amount": 4590.39,
            "desc": "CC M-200 excluding formwork for columns"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "4",
        "itemNo": 13,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-250 for Ground & Plinth Beams",
        "unit": "Cum",
        "sayRate": 5964,
        "basis": "Per 1.13 Cum beam",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001H1",
            "page": "60",
            "rate": 209.95,
            "unit": "Sqm",
            "qty": 7.95,
            "amount": 1669.1,
            "desc": "Form work: sides & soffits of beams/haunching/cantilever"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05025C",
            "page": "42",
            "rate": 4485.93,
            "unit": "Cum",
            "qty": 1.13,
            "amount": 5069.1,
            "desc": "CC M-250 excluding formwork for beams"
          }
        ]
      },
      {
        "no": "5",
        "itemNo": 14,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-150 for Plinth Slab",
        "unit": "Cum",
        "sayRate": 4907,
        "basis": "Per 0.10 Cum slab",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001B1",
            "page": "60",
            "rate": 270.9,
            "unit": "Sqm",
            "qty": 0.4,
            "amount": 108.36,
            "desc": "Form work: flat surfaces soffits of slabs/landings"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "5023CA",
            "page": "41",
            "rate": 3823.14,
            "unit": "Cum",
            "qty": 0.1,
            "amount": 382.31,
            "desc": "CC M-150 excluding formwork slabs/landings/lintels/beams"
          }
        ]
      },
      {
        "no": "6",
        "itemNo": 15,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Ground Floor Beams",
        "unit": "Cum",
        "sayRate": 6191,
        "basis": "Per 0.72 Cum beam",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001H1A",
            "page": "61",
            "rate": 209.95,
            "unit": "Sqm",
            "qty": 6.0,
            "amount": 1259.7,
            "desc": "Form work: sides & soffits of beams/hanchings"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05024C",
            "page": "41",
            "rate": 4440.58,
            "unit": "Cum",
            "qty": 0.72,
            "amount": 3197.22,
            "desc": "CC M-200 excluding formwork slabs/beams/lintels"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "7",
        "itemNo": 17,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Ground Floor Slab",
        "unit": "Cum",
        "sayRate": 6608,
        "basis": "Per 1.35 Cum slab",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001B1A",
            "page": "60",
            "rate": 270.9,
            "unit": "Sqm",
            "qty": 10.8,
            "amount": 2925.72,
            "desc": "Form work: flat surfaces soffits of slabs/landings"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "5024CA",
            "page": "42",
            "rate": 4440.58,
            "unit": "Cum",
            "qty": 1.35,
            "amount": 5994.78,
            "desc": "CC M-200 excluding formwork slabs/beams/lintels"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "8",
        "itemNo": 19,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Chhajja (weather shades)",
        "unit": "Cum",
        "sayRate": 6714,
        "basis": "Per 0.09 Cum chhajja",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001LA",
            "page": "62",
            "rate": 171.87,
            "unit": "Sqm",
            "qty": 1.19,
            "amount": 204.53,
            "desc": "Form work: chullah hoods/weather shades/chhajjas/corbels"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05024C",
            "page": "41",
            "rate": 4440.58,
            "unit": "Cum",
            "qty": 0.09,
            "amount": 399.65,
            "desc": "CC M-200 excluding formwork slabs/beams/lintels"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "9",
        "itemNo": 21,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Lintel",
        "unit": "Cum",
        "sayRate": 8707,
        "basis": "Per 0.0414 Cum lintel",
        "components": [
          {
            "sr": "A1",
            "kind": "SOR",
            "code": "09001H2",
            "page": "61",
            "rate": 277.67,
            "unit": "Sqm",
            "qty": 0.636,
            "amount": 176.6,
            "desc": "Form work: sides & soffits of Beams/Lintels exceeding 1M depth"
          },
          {
            "sr": "A2",
            "kind": "SOR",
            "code": "05024C",
            "page": "42",
            "rate": 4440.58,
            "unit": "Cum",
            "qty": 0.0414,
            "amount": 183.84,
            "desc": "CC M-200 excluding formwork slabs/beams/lintels"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "10",
        "itemNo": 23,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for Stair case (GF→FF)",
        "unit": "Cum",
        "sayRate": 6341,
        "basis": "Per 1.63 Cum stair",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "05024EA",
            "page": "42",
            "rate": 4699.2,
            "unit": "Cum",
            "qty": 1.63,
            "amount": 7659.7,
            "desc": "CC M-200 for stair (excl formwork/reinforcement)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "09001M",
            "page": "67",
            "rate": 264.13,
            "unit": "Sqm",
            "qty": 10.13,
            "amount": 2675.64,
            "desc": "Form work (ord timber) for stair"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "10A",
        "itemNo": null,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for RCC Parapet Wall",
        "unit": "Cum",
        "sayRate": 6876,
        "basis": "Per 1.44 Cum parapet",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "05024B",
            "page": "42",
            "rate": 4466.94,
            "unit": "Cum",
            "qty": 1.44,
            "amount": 6432.39,
            "desc": "CC M-200 for walls from foundation top upto floor two level"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "09001QA",
            "page": "67",
            "rate": 254.1,
            "unit": "Sqm",
            "qty": 13.65,
            "amount": 3468.47,
            "desc": "Form work (ord timber) for walls"
          }
        ]
      },
      {
        "no": "11",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "90 cm high SS 304 railing (50mm handrail, 38mm balusters)",
        "unit": "Rmt",
        "sayRate": 3683,
        "basis": "Per 3.50 Rmt",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "M714",
            "page": "24",
            "rate": 1004.24,
            "unit": "Rmt",
            "qty": 3.5,
            "amount": 3514.84,
            "desc": "50mm dia SS pipe (handrail)"
          },
          {
            "sr": "B",
            "kind": "MR",
            "label": "38mm dia SS pipe (baluster support)",
            "rate": 580.0,
            "unit": "Rmt",
            "qty": 3.6,
            "amount": 2088.0
          },
          {
            "sr": "C",
            "kind": "MR",
            "label": "25mm horizontal SS pipe",
            "rate": 180.0,
            "unit": "Rmt",
            "qty": 3.5,
            "amount": 630.0
          },
          {
            "sr": "D",
            "kind": "MR",
            "label": "18.75mm SS support pipe",
            "rate": 250.0,
            "unit": "Rmt",
            "qty": 10.5,
            "amount": 2625.0
          },
          {
            "sr": "E",
            "kind": "MR",
            "label": "Round SS ball at top",
            "rate": 300.0,
            "unit": "No",
            "qty": 2.0,
            "amount": 600.0
          },
          {
            "sr": "F",
            "kind": "MR",
            "label": "Labour charge — prep & fixing",
            "rate": 500.0,
            "unit": "Rmt",
            "qty": 3.5,
            "amount": 1750.0
          }
        ]
      },
      {
        "no": "12",
        "itemNo": 25,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "TMT Bar 500D reinforcement (avg for all floors)",
        "unit": "Kg",
        "sayRate": 77,
        "basis": "Weighted avg across GF & FF quantities",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "05014C",
            "page": "39",
            "rate": 76.65,
            "unit": "Kg",
            "qty": 35315.0,
            "amount": 2706894.75,
            "desc": "For G.F. — SOR I.No.05014C"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "05014C+05016A",
            "page": "39",
            "rate": 76.65,
            "unit": "Kg",
            "qty": 7235.0,
            "amount": 554562.75,
            "desc": "For F.F. — 05014C + one 05016A extra"
          }
        ]
      },
      {
        "no": "13",
        "itemNo": 31,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "20mm double coat mala cement plaster (interior)",
        "unit": "Sqm",
        "sayRate": 336.6,
        "basis": "Per 1 Sqm plaster",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "17017",
            "page": "105",
            "rate": 287.83,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 287.83,
            "desc": "20mm double coat mala cement plaster"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "17004",
            "page": "103",
            "rate": 48.77,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 48.77,
            "desc": "Floating coat"
          }
        ],
        "liftExtra": {
          "sorCode": "17007A",
          "page": "104",
          "rate": 24.22
        }
      },
      {
        "no": "14",
        "itemNo": 33,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "10mm smooth cement plaster on ceiling (CM 1:4)",
        "unit": "Sqm",
        "sayRate": 211.82,
        "basis": "Per 1 Sqm plaster",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "17001B",
            "page": "102",
            "rate": 134.1,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 134.1,
            "desc": "10mm plastering"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "17006",
            "page": "104",
            "rate": 26.41,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 26.41,
            "desc": "Extra for ceiling"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "17004",
            "page": "103",
            "rate": 51.31,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 51.31,
            "desc": "Floating coat"
          }
        ],
        "liftExtra": {
          "sorCode": "17007A",
          "page": "104",
          "rate": 24.22
        }
      },
      {
        "no": "15",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "1+3+4+5",
        "desc": "Cinder filling in sunks in 15cm layers (all floors)",
        "unit": "Cum",
        "sayRate": 484,
        "basis": "Per 10 Cum",
        "components": [
          {
            "sr": "1",
            "kind": "MR",
            "label": "Supply of cinder",
            "rate": 225.0,
            "unit": "Cum",
            "qty": 10.0,
            "amount": 2250.0
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "3.2.10",
            "page": "-",
            "rate": 119.35,
            "unit": "Cum",
            "qty": 10.0,
            "amount": 1193.5,
            "desc": "Extra lead 10 km"
          },
          {
            "sr": "3",
            "kind": "MR",
            "label": "Male mazdoor",
            "rate": 505.0,
            "unit": "No",
            "qty": 1.5,
            "amount": 757.5
          }
        ]
      },
      {
        "no": "16",
        "itemNo": 42,
        "floors": true,
        "cp": 0,
        "cpApplies": "none",
        "desc": "CC M-200 for RCC Coping",
        "unit": "Cum",
        "sayRate": 5325,
        "basis": "Per 1 Cum coping (size 0.30×0.15)",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "5024AA",
            "page": "42",
            "rate": 3920.39,
            "unit": "Cum",
            "qty": 1.0,
            "amount": 3920.39,
            "desc": "CC M-200 for coping"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "9001H1A",
            "page": "61",
            "rate": 209.95,
            "unit": "Sqm",
            "qty": 6.69,
            "amount": 1404.57,
            "desc": "Form work for coping"
          }
        ],
        "liftExtra": {
          "sorCode": "05015A",
          "page": "40",
          "rate": 39.68
        }
      },
      {
        "no": "17",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "Jindal E(30mm) Four track aluminium window",
        "unit": "Sqm",
        "sayRate": 4265,
        "basis": "Per 2.16 Sqm window (1.8×1.2)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M686+M687",
            "page": "23",
            "rate": 199.15,
            "unit": "Kg",
            "qty": 26.08,
            "amount": 5193.83,
            "desc": "Aluminium sections (Jindal E-30mm) — 4-track: 21198+21204+20993+20553+20550"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M552",
            "page": "20",
            "rate": 211.86,
            "unit": "Sqm",
            "qty": 2.27,
            "amount": 480.92,
            "desc": "5mm thick plain float glass"
          },
          {
            "sr": "5",
            "kind": "SOR",
            "code": "M688",
            "page": "22",
            "rate": 7.63,
            "unit": "Sqm",
            "qty": 13.86,
            "amount": 105.75,
            "desc": "Rubber gasket"
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Hardware (LS)",
            "rate": 500.0,
            "unit": "LS",
            "qty": 1,
            "amount": 500.0
          },
          {
            "sr": "7",
            "kind": "SOR",
            "code": "L007",
            "page": "4",
            "rate": 801.0,
            "unit": "Sqm",
            "qty": 2.16,
            "amount": 1730.16,
            "desc": "Labour for fixing glass in frame & window in wall"
          }
        ]
      },
      {
        "no": "18",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "Jindal E(30mm) Three track aluminium window",
        "unit": "Sqm",
        "sayRate": 4041.2,
        "basis": "Per 1.62 Sqm window (1.35×1.2)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M686+M687",
            "page": "23",
            "rate": 199.15,
            "unit": "Kg",
            "qty": 17.63,
            "amount": 3511.01,
            "desc": "Aluminium sections — 3-track: 21203+20837+20993+20553+20550"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M552",
            "page": "20",
            "rate": 211.86,
            "unit": "Sqm",
            "qty": 1.7,
            "amount": 360.16,
            "desc": "5mm thick plain float glass"
          },
          {
            "sr": "5",
            "kind": "SOR",
            "code": "M688",
            "page": "22",
            "rate": 7.63,
            "unit": "Sqm",
            "qty": 9.69,
            "amount": 73.9,
            "desc": "Rubber gasket"
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Hardware (LS)",
            "rate": 450.0,
            "unit": "LS",
            "qty": 1,
            "amount": 450.0
          },
          {
            "sr": "7",
            "kind": "SOR",
            "code": "L007",
            "page": "4",
            "rate": 801.0,
            "unit": "Sqm",
            "qty": 1.62,
            "amount": 1297.62,
            "desc": "Labour for fixing glass & window in wall"
          }
        ]
      },
      {
        "no": "19",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "Jindal E(30mm) Two track aluminium window",
        "unit": "Sqm",
        "sayRate": 3515.5,
        "basis": "Per 1.32 Sqm window (1.2×1.1)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M686+M687",
            "page": "23",
            "rate": 199.15,
            "unit": "Kg",
            "qty": 11.24,
            "amount": 2238.45,
            "desc": "Aluminium sections — 2-track: 21217+20835+20993+20553+20550"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M552",
            "page": "20",
            "rate": 211.86,
            "unit": "Sqm",
            "qty": 1.39,
            "amount": 294.49,
            "desc": "5mm thick plain float glass"
          },
          {
            "sr": "5",
            "kind": "SOR",
            "code": "M688",
            "page": "22",
            "rate": 7.63,
            "unit": "Sqm",
            "qty": 5.88,
            "amount": 44.86,
            "desc": "Rubber gasket"
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Hardware (LS)",
            "rate": 400.0,
            "unit": "LS",
            "qty": 1,
            "amount": 400.0
          },
          {
            "sr": "7",
            "kind": "SOR",
            "code": "L007",
            "page": "4",
            "rate": 801.0,
            "unit": "Sqm",
            "qty": 1.32,
            "amount": 1057.32,
            "desc": "Labour for fixing glass & window in wall"
          }
        ]
      },
      {
        "no": "20",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "Aluminium Ventilator with louvre (Jindal 4605)",
        "unit": "Sqm",
        "sayRate": 2706,
        "basis": "Per 1.35 Sqm ventilator (1.8×0.75)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M904",
            "page": "28",
            "rate": 199.15,
            "unit": "Kg",
            "qty": 8.26,
            "amount": 1644.98,
            "desc": "Aluminium sections — outer frame + louvre channels"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M550",
            "page": "19",
            "rate": 144.07,
            "unit": "Sqm",
            "qty": 1.26,
            "amount": 181.53,
            "desc": "3mm thick glass for louvre glazing"
          },
          {
            "sr": "3",
            "kind": "MR",
            "label": "Labour for fixing glass in frame & window in wall",
            "rate": 1000.0,
            "unit": "Sqm",
            "qty": 1.35,
            "amount": 1350.0
          }
        ]
      },
      {
        "no": "21",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "50mm specially designed wooden main door (hollow flush, teak frame, laminated)",
        "unit": "Sqm",
        "sayRate": 5230,
        "basis": "Per 5.76 Sqm door (2.4×2.4)",
        "components": [
          {
            "sr": "1a",
            "kind": "SOR",
            "code": "10001A",
            "page": "63",
            "rate": 60419.0,
            "unit": "Cum",
            "qty": 0.073,
            "amount": 4429.69,
            "desc": "Teakwood door frame"
          },
          {
            "sr": "1b",
            "kind": "MR",
            "label": "Teakwood batten 12×50mm",
            "rate": 25.0,
            "unit": "Rmt",
            "qty": 15.12,
            "amount": 378.0
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M782",
            "page": "25",
            "rate": 288.14,
            "unit": "Sqm",
            "qty": 11.52,
            "amount": 3319.37,
            "desc": "6mm ply (waterproof, both sides)"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M788",
            "page": "25",
            "rate": 296.81,
            "unit": "Sqm",
            "qty": 11.52,
            "amount": 3419.25,
            "desc": "1mm thick lamination (both sides)"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M201",
            "page": "11",
            "rate": 152.24,
            "unit": "Kg",
            "qty": 4.0,
            "amount": 608.96,
            "desc": "Fevicol"
          },
          {
            "sr": "5a",
            "kind": "MR",
            "label": "Screw, Khili etc",
            "rate": 200.0,
            "unit": "LS",
            "qty": 2,
            "amount": 400.0
          },
          {
            "sr": "5b",
            "kind": "SOR",
            "code": "M704",
            "page": "23",
            "rate": 1800.85,
            "unit": "No",
            "qty": 2,
            "amount": 3601.7,
            "desc": "Floor spring"
          },
          {
            "sr": "5c",
            "kind": "SOR",
            "code": "M710",
            "page": "23",
            "rate": 396.61,
            "unit": "No",
            "qty": 2,
            "amount": 793.22,
            "desc": "SS Aldrop 30cm ASIS 304"
          },
          {
            "sr": "5d",
            "kind": "MR",
            "label": "SS Pipe Handle 60cm ASIS 316",
            "rate": 1150.0,
            "unit": "No",
            "qty": 4,
            "amount": 4600.0
          },
          {
            "sr": "5e",
            "kind": "SOR",
            "code": "M706",
            "page": "15",
            "rate": 180.51,
            "unit": "No",
            "qty": 2,
            "amount": 361.02,
            "desc": "SS Stopper 30cm ASIS 304"
          },
          {
            "sr": "5f",
            "kind": "MR",
            "label": "Godrej locking system",
            "rate": 1850.0,
            "unit": "No",
            "qty": 1,
            "amount": 1850.0
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Labour for preparing door",
            "rate": 500.0,
            "unit": "Sqm",
            "qty": 5.76,
            "amount": 2880.0
          },
          {
            "sr": "7",
            "kind": "SOR",
            "code": "19009B+19011",
            "page": "110",
            "rate": 137.15,
            "unit": "Sqm",
            "qty": 1.07,
            "amount": 146.15,
            "desc": "Primer + two coats enamel on teakwood frame & edges"
          }
        ]
      },
      {
        "no": "22",
        "itemNo": 50,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "35mm Flush Door single shutter (factory made, IS 12623 grade one)",
        "unit": "Sqm",
        "sayRate": 4901,
        "basis": "Per 2.10 Sqm door (1.0×2.1)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "10001A",
            "page": "63",
            "rate": 60419.0,
            "unit": "Cum",
            "qty": 0.003,
            "amount": 181.26,
            "desc": "Teakwood batten around door"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "10011",
            "page": "91",
            "rate": 1811.62,
            "unit": "Sqm",
            "qty": 2.1,
            "amount": 3804.4,
            "desc": "35mm flush shutter"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M788",
            "page": "25",
            "rate": 296.61,
            "unit": "Sqm",
            "qty": 4.2,
            "amount": 1245.76,
            "desc": "1mm lamination (both sides)"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M201",
            "page": "11",
            "rate": 152.54,
            "unit": "Kg",
            "qty": 2.0,
            "amount": 305.08,
            "desc": "Favicol"
          },
          {
            "sr": "5a",
            "kind": "MR",
            "label": "Screw, Khili etc",
            "rate": 200.0,
            "unit": "LS",
            "qty": 2,
            "amount": 400.0
          },
          {
            "sr": "5b",
            "kind": "SOR",
            "code": "M735",
            "page": "16",
            "rate": 64.0,
            "unit": "No",
            "qty": 3,
            "amount": 192.0,
            "desc": "SS Hinges"
          },
          {
            "sr": "5c",
            "kind": "SOR",
            "code": "M709",
            "page": "23",
            "rate": 324.58,
            "unit": "No",
            "qty": 1,
            "amount": 324.58,
            "desc": "SS Aldrop 20cm ASIS 304"
          },
          {
            "sr": "5d",
            "kind": "SOR",
            "code": "M712",
            "page": "24",
            "rate": 75.42,
            "unit": "No",
            "qty": 2,
            "amount": 150.84,
            "desc": "SS Handle 15cm ASIS 304"
          },
          {
            "sr": "5e",
            "kind": "SOR",
            "code": "M707",
            "page": "23",
            "rate": 126.27,
            "unit": "No",
            "qty": 1,
            "amount": 126.27,
            "desc": "SS Stopper 20cm ASIS 304"
          },
          {
            "sr": "5f",
            "kind": "MR",
            "label": "Godrej locking system",
            "rate": 1500.0,
            "unit": "No",
            "qty": 1,
            "amount": 1500.0
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Labour for preparing door",
            "rate": 500.0,
            "unit": "Sqm",
            "qty": 2.1,
            "amount": 1050.0
          },
          {
            "sr": "7",
            "kind": "MR",
            "label": "Polish work",
            "rate": 200.0,
            "unit": "LS",
            "qty": 1,
            "amount": 200.0
          },
          {
            "sr": "8",
            "kind": "SOR",
            "code": "M048",
            "page": "6",
            "rate": 20.25,
            "unit": "No",
            "qty": -2,
            "amount": -40.5,
            "desc": "Deduction — Aluminium butt hinges (deduct)"
          }
        ]
      },
      {
        "no": "23",
        "itemNo": 73,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "FRP frame 100×50 & 35mm depress panel FRP door (D5)",
        "unit": "Sqm",
        "sayRate": 2789,
        "basis": "Substitution (A−B)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "10038",
            "page": "60",
            "rate": 2589.15,
            "unit": "Sqm",
            "qty": 1,
            "amount": 2589.15,
            "desc": "FRP frame 125×65mm & 35mm depress panel (base SOR)"
          },
          {
            "sr": "2",
            "kind": "MR",
            "label": "Add: FRP frame 100×50",
            "rate": 1050.0,
            "unit": "Sqm",
            "qty": 1,
            "amount": 1050.0
          },
          {
            "sr": "3",
            "kind": "MR",
            "label": "Deduct: FRP frame 125×65",
            "rate": 850.0,
            "unit": "Sqm",
            "qty": -1,
            "amount": -850.0
          }
        ]
      },
      {
        "no": "24",
        "itemNo": null,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "GVT vitrified 600×600 tile flooring (substitution)",
        "unit": "Sqm",
        "sayRate": 1638,
        "basis": "Substitution over base SOR flooring",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "14022A",
            "page": "130",
            "rate": 1401.75,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 1401.75,
            "desc": "P&L 24\"×24\" vitrified 8mm thick (base SOR)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M691",
            "page": "36",
            "rate": 310.17,
            "unit": "Sqm",
            "qty": -1.15,
            "amount": -356.71,
            "desc": "Deduct: vitrified granite tile 8-10mm"
          },
          {
            "sr": "3",
            "kind": "Quotation",
            "label": "Add: GVT vitrified 60×60",
            "rate": 515.2,
            "unit": "Sqm",
            "qty": 1.15,
            "amount": 592.48
          }
        ]
      },
      {
        "no": "25",
        "itemNo": null,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "GVT vitrified 600×600 tile Skirting/Dedo",
        "unit": "Sqm",
        "sayRate": 1346,
        "basis": "Substitution over base SOR dedo",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "14008CA",
            "page": "95",
            "rate": 1109.27,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 1109.27,
            "desc": "P&L 24\"×24\" vitrified 8mm skirting (base SOR)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M691",
            "page": "23",
            "rate": 310.17,
            "unit": "Sqm",
            "qty": -1.15,
            "amount": -356.71,
            "desc": "Deduct: vitrified granite tile 8-10mm"
          },
          {
            "sr": "3",
            "kind": "Quotation",
            "label": "Add: GVT vitrified 60×60",
            "rate": 515.2,
            "unit": "Sqm",
            "qty": 1.15,
            "amount": 592.48
          }
        ]
      },
      {
        "no": "26",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "non-SOR",
        "desc": "Matt Finished Glazed 300×300 tile flooring + 3mm groove epoxy",
        "unit": "Sqm",
        "sayRate": 1413,
        "basis": "Substitution + epoxy add-on",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "14008CA",
            "page": "95",
            "rate": 1109.27,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 1109.27,
            "desc": "Base SOR flooring 24\"×24\" 8mm"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M691",
            "page": "23",
            "rate": 310.17,
            "unit": "Sqm",
            "qty": -1.15,
            "amount": -356.71,
            "desc": "Deduct: vitrified granite tile 8-10mm"
          },
          {
            "sr": "3",
            "kind": "Quotation",
            "label": "Add: matt glazed 300×300",
            "rate": 484.2,
            "unit": "Sqm",
            "qty": 1.15,
            "amount": 556.83
          },
          {
            "sr": "4",
            "kind": "Quotation",
            "label": "3mm groove epoxy grouting",
            "rate": 15.0,
            "unit": "Rmt",
            "qty": 6.0,
            "amount": 90.0
          }
        ]
      },
      {
        "no": "27",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "non-SOR",
        "desc": "Matt Finished Glazed 300×900 dedo + 3mm groove epoxy",
        "unit": "Sqm",
        "sayRate": 1582,
        "basis": "Substitution + epoxy add-on",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "14008CA",
            "page": "95",
            "rate": 1109.27,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 1109.27,
            "desc": "Base SOR dedo 24\"×24\" 8mm"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M691",
            "page": "23",
            "rate": 310.17,
            "unit": "Sqm",
            "qty": -1.15,
            "amount": -356.71,
            "desc": "Deduct: vitrified granite tile 8-10mm"
          },
          {
            "sr": "3",
            "kind": "Quotation",
            "label": "Add: matt glazed 300×900",
            "rate": 645.6,
            "unit": "Sqm",
            "qty": 1.15,
            "amount": 742.44
          },
          {
            "sr": "4",
            "kind": "Quotation",
            "label": "3mm groove epoxy grouting",
            "rate": 15.0,
            "unit": "Rmt",
            "qty": 5.0,
            "amount": 75.0
          }
        ]
      },
      {
        "no": "28",
        "itemNo": 86,
        "floors": false,
        "cp": 15,
        "cpApplies": "1+3",
        "desc": "Machine cut Granite 18mm treads/risers with nosing moulding",
        "unit": "Sqm",
        "sayRate": 2629,
        "basis": "Per 0.71 Sqm step (0.68 net + wastage)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M253",
            "page": "12",
            "rate": 1347.46,
            "unit": "Sqm",
            "qty": 0.71,
            "amount": 955.01,
            "desc": "P&L Granite 18mm thick"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "2011A",
            "page": "32",
            "rate": 3533.05,
            "unit": "Cum",
            "qty": 0.09,
            "amount": 300.48,
            "desc": "12mm CM 1:3 bases"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M724",
            "page": "23",
            "rate": 85.0,
            "unit": "Rmt",
            "qty": 1.5,
            "amount": 127.5,
            "desc": "Round moulding on exposed edge"
          },
          {
            "sr": "4",
            "kind": "MR",
            "label": "Labour — fixing granite + 3 grooves",
            "rate": 322.8,
            "unit": "Rmt",
            "qty": 0.71,
            "amount": 228.78
          }
        ]
      },
      {
        "no": "29",
        "itemNo": 62,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "18mm Granite cladding on sills/around openings",
        "unit": "Sqm",
        "sayRate": 2609,
        "basis": "Per 2.52 Sqm",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M253",
            "page": "12",
            "rate": 1347.46,
            "unit": "Sqm",
            "qty": 2.65,
            "amount": 3565.38,
            "desc": "18mm thick Granite"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "2007A",
            "page": "85",
            "rate": 3508.27,
            "unit": "Cum",
            "qty": 0.03,
            "amount": 105.25,
            "desc": "10mm thick CM 1:3"
          },
          {
            "sr": "3",
            "kind": "MR",
            "label": "Labour — fixing with slurry+adhesive",
            "rate": 376.6,
            "unit": "Sqm",
            "qty": 2.52,
            "amount": 949.03
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M724",
            "page": "24",
            "rate": 85.0,
            "unit": "Rmt",
            "qty": 8.4,
            "amount": 714.0,
            "desc": "Moulding on exposed edges"
          },
          {
            "sr": "5",
            "kind": "MR",
            "label": "Mirror polishing",
            "rate": 150.0,
            "unit": "Sqm",
            "qty": 2.65,
            "amount": 396.9
          }
        ]
      },
      {
        "no": "30",
        "itemNo": 63,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "MS Safety Grill for windows/doors (assume 20 kg/Sqm)",
        "unit": "Kg",
        "sayRate": 114,
        "basis": "Per 20 Kg = 1 Sqm",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "10025AA",
            "page": "67",
            "rate": 109.22,
            "unit": "Kg",
            "qty": 20.0,
            "amount": 2184.4,
            "desc": "Cost of grill fabrication"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "19001",
            "page": "110",
            "rate": 35.56,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 35.56,
            "desc": "Priming coat"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "19005",
            "page": "110",
            "rate": 69.47,
            "unit": "Sqm",
            "qty": 1.0,
            "amount": 69.47,
            "desc": "Oil painting two coats"
          }
        ]
      },
      {
        "no": "31",
        "itemNo": 72,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "UPVC SWR Type B 75mm pipe (from 110mm base SOR)",
        "unit": "Rmt",
        "sayRate": 752,
        "basis": "Substitution — 110mm base + swap to 75mm",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "23067",
            "page": "139",
            "rate": 888.9,
            "unit": "Rmt",
            "qty": 1.0,
            "amount": 888.9,
            "desc": "110mm UPVC SWR Type B (base)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M805",
            "page": "25",
            "rate": 262.71,
            "unit": "Rmt",
            "qty": -1.15,
            "amount": -302.12,
            "desc": "Deduct: UPVC SWR 110mm dia"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M803",
            "page": "25",
            "rate": 143.22,
            "unit": "Rmt",
            "qty": 1.15,
            "amount": 164.7,
            "desc": "Add: UPVC SWR 75mm dia"
          }
        ]
      },
      {
        "no": "32",
        "itemNo": 73,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "PVC SWR Cowl went 75mm dia",
        "unit": "No",
        "sayRate": 15.5,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M835",
            "page": "26",
            "rate": 9.32,
            "unit": "No",
            "qty": 1.0,
            "amount": 9.32,
            "desc": "PVC SWR Vent Cowl 75mm dia"
          },
          {
            "sr": "2",
            "kind": "MR",
            "label": "Labour for cowl",
            "rate": 4.0,
            "unit": "No",
            "qty": 1.0,
            "amount": 4.0
          }
        ]
      },
      {
        "no": "33",
        "itemNo": 74,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "PVC SWR Cowl went 110mm dia",
        "unit": "No",
        "sayRate": 28.5,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M836",
            "page": "26",
            "rate": 19.49,
            "unit": "No",
            "qty": 1.0,
            "amount": 19.49,
            "desc": "PVC SWR Vent Cowl 110mm dia"
          },
          {
            "sr": "2",
            "kind": "MR",
            "label": "Labour for cowl",
            "rate": 5.0,
            "unit": "No",
            "qty": 1.0,
            "amount": 5.0
          }
        ]
      },
      {
        "no": "34",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "C+E",
        "desc": "European WC pan with flush tank + jet spray + seat cover",
        "unit": "No",
        "sayRate": 3024.48,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "23010",
            "page": "-",
            "rate": 1343.38,
            "unit": "No",
            "qty": 1,
            "amount": 1343.38,
            "desc": "European WC pan Vitreous china"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "23017",
            "page": "-",
            "rate": 288.45,
            "unit": "No",
            "qty": 1,
            "amount": 288.45,
            "desc": "Plastic seat cover with hinge & rubber"
          },
          {
            "sr": "C",
            "kind": "SOR",
            "code": "M738",
            "page": "-",
            "rate": 305.93,
            "unit": "No",
            "qty": 1,
            "amount": 305.93,
            "desc": "Jet spray Heavy Duty SS 304 60cm long"
          },
          {
            "sr": "D",
            "kind": "SOR",
            "code": "23032B",
            "page": "-",
            "rate": 261.16,
            "unit": "No",
            "qty": 1,
            "amount": 261.16,
            "desc": "CP Brass half turn flush cock 25mm"
          },
          {
            "sr": "E",
            "kind": "SOR",
            "code": "M216",
            "page": "-",
            "rate": 677.97,
            "unit": "No",
            "qty": 1,
            "amount": 677.97,
            "desc": "Flush tank"
          }
        ]
      },
      {
        "no": "35",
        "itemNo": 50,
        "floors": false,
        "cp": 15,
        "cpApplies": "A",
        "desc": "Orissa Type WC pan 580mm with P/S trap + flush valve",
        "unit": "No",
        "sayRate": 1933,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "M626",
            "page": "22",
            "rate": 677.97,
            "unit": "No",
            "qty": 1,
            "amount": 677.97,
            "desc": "WC Squatting Orissa Type pan"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "23011",
            "page": "133",
            "rate": 350.48,
            "unit": "No",
            "qty": 1,
            "amount": 350.48,
            "desc": "S or P Trap"
          },
          {
            "sr": "C",
            "kind": "SOR",
            "code": "23016",
            "page": "134",
            "rate": 41.31,
            "unit": "No",
            "qty": 1,
            "amount": 41.31,
            "desc": "GI inlet connections"
          },
          {
            "sr": "D",
            "kind": "SOR",
            "code": "23032B",
            "page": "136",
            "rate": 261.16,
            "unit": "No",
            "qty": 1,
            "amount": 261.16,
            "desc": "CP Brass half turn flush cock 25mm"
          },
          {
            "sr": "E",
            "kind": "MR",
            "label": "All fitting & labour charge",
            "rate": 500.0,
            "unit": "No",
            "qty": 1,
            "amount": 500.0
          }
        ]
      },
      {
        "no": "36",
        "itemNo": 64,
        "floors": false,
        "cp": 15,
        "cpApplies": "A+B",
        "desc": "Ceramic tabletop wash basin 450×400×135 with pop-up",
        "unit": "No",
        "sayRate": 5942,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "Quotation",
            "label": "Ceramic tabletop washbasin",
            "rate": 3200.0,
            "unit": "No",
            "qty": 1,
            "amount": 3200.0
          },
          {
            "sr": "B",
            "kind": "Quotation",
            "label": "Polyamide braided connection pipe 12mm",
            "rate": 610.0,
            "unit": "No",
            "qty": 1,
            "amount": 610.0
          },
          {
            "sr": "C",
            "kind": "Quotation",
            "label": "Waste coupling ceramic pop-up 32mm",
            "rate": 1410.0,
            "unit": "No",
            "qty": 1,
            "amount": 1410.0
          },
          {
            "sr": "D",
            "kind": "MR",
            "label": "Fitting charges (LS)",
            "rate": 150.0,
            "unit": "LS",
            "qty": 1,
            "amount": 150.0
          }
        ]
      },
      {
        "no": "37",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "A",
        "desc": "Wall Mixer 3-in-1 chrome plated",
        "unit": "No",
        "sayRate": 3882,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "Quotation",
            "label": "Wall Mixer 3-in-1",
            "rate": 3245.0,
            "unit": "No",
            "qty": 1,
            "amount": 3245.0
          },
          {
            "sr": "C",
            "kind": "MR",
            "label": "Fitting charges (LS)",
            "rate": 150.0,
            "unit": "LS",
            "qty": 1,
            "amount": 150.0
          }
        ]
      },
      {
        "no": "38",
        "itemNo": 60,
        "floors": false,
        "cp": 15,
        "cpApplies": "A",
        "desc": "Angle Cock with wall flange",
        "unit": "No",
        "sayRate": 898,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "Quotation",
            "label": "Angle Cock with wall flange",
            "rate": 650.0,
            "unit": "No",
            "qty": 1,
            "amount": 650.0
          },
          {
            "sr": "B",
            "kind": "MR",
            "label": "Fitting charges (LS)",
            "rate": 150.0,
            "unit": "LS",
            "qty": 1,
            "amount": 150.0
          }
        ]
      },
      {
        "no": "39",
        "itemNo": 87,
        "floors": false,
        "cp": 15,
        "cpApplies": "non-SOR",
        "desc": "Wash Basin Platform: Black Granite top + Kota stone supports",
        "unit": "Sqm",
        "sayRate": 3176.91,
        "basis": "Per 1.5 Sqm (2.0×0.75)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M490",
            "page": "18",
            "rate": 198.31,
            "unit": "Sqm",
            "qty": 2.25,
            "amount": 446.2,
            "desc": "25mm thick Kota stone (vertical supports)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M253",
            "page": "12",
            "rate": 1347.46,
            "unit": "Sqm",
            "qty": 1.65,
            "amount": 2223.31,
            "desc": "18mm Black Granite (horizontal + patti)"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "02007A",
            "page": "32",
            "rate": 3508.87,
            "unit": "Cum",
            "qty": 0.02,
            "amount": 70.18,
            "desc": "12mm CM 1:3 bases"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M724",
            "page": "24",
            "rate": 85.0,
            "unit": "Rmt",
            "qty": 7.65,
            "amount": 650.25,
            "desc": "Moulding on exposed edges"
          },
          {
            "sr": "5",
            "kind": "MR",
            "label": "Labour — fixing",
            "rate": 650.0,
            "unit": "Sqm",
            "qty": 1.5,
            "amount": 975.0
          }
        ]
      },
      {
        "no": "40",
        "itemNo": 89,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "Brick masonry inspection chamber 455×610 with precast RCC cover (deduct CI)",
        "unit": "No",
        "sayRate": 3141,
        "basis": "Substitution: base SOR + RCC cover − CI cover",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "24016A",
            "page": "144",
            "rate": 2903.89,
            "unit": "No",
            "qty": 1,
            "amount": 2903.89,
            "desc": "Base SOR: 455×610×450 chamber with CI cover (upto 10 ton)"
          },
          {
            "sr": "2",
            "kind": "MR",
            "label": "Precast RCC cover",
            "rate": 1050.0,
            "unit": "No",
            "qty": 1,
            "amount": 1050.0
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M113",
            "page": "8",
            "rate": 812.71,
            "unit": "No",
            "qty": -1,
            "amount": -812.71,
            "desc": "Deduct: CI cover with frame"
          }
        ]
      },
      {
        "no": "41",
        "itemNo": 90,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "Brick masonry inspection chamber 500×700 with precast RCC cover (deduct CI)",
        "unit": "No",
        "sayRate": 3845,
        "basis": "Substitution: base SOR + RCC cover − CI cover",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "24016B",
            "page": "144",
            "rate": 3624.51,
            "unit": "No",
            "qty": 1,
            "amount": 3624.51,
            "desc": "Base SOR: 500×700×450 chamber with CI cover (upto 10 ton)"
          },
          {
            "sr": "2",
            "kind": "MR",
            "label": "Precast RCC cover",
            "rate": 1350.0,
            "unit": "No",
            "qty": 1,
            "amount": 1350.0
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "M114",
            "page": "9",
            "rate": 1129.66,
            "unit": "No",
            "qty": -1,
            "amount": -1129.66,
            "desc": "Deduct: CI cover with frame"
          }
        ]
      },
      {
        "no": "42",
        "itemNo": 94,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "MS Ladder with MS flats/round bars (assume 25 kg/Sqm)",
        "unit": "Kg",
        "sayRate": 120,
        "basis": "Per 25 Kg = 1 Sqm",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "10025A",
            "page": "66",
            "rate": 109.22,
            "unit": "Kg",
            "qty": 25.0,
            "amount": 2730.5,
            "desc": "P/F MS Grill"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "19001",
            "page": "110",
            "rate": 35.56,
            "unit": "Sqm",
            "qty": 2.0,
            "amount": 71.12,
            "desc": "Priming coat"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "19002",
            "page": "110",
            "rate": 101.85,
            "unit": "Sqm",
            "qty": 2.0,
            "amount": 203.7,
            "desc": "Oil paint two coats"
          }
        ]
      },
      {
        "no": "43",
        "itemNo": 96,
        "floors": false,
        "cp": 15,
        "cpApplies": "A",
        "desc": "Kitchen SS Sink Glossy ASIS 316 Grade 610×460 with bowl 560×410×200",
        "unit": "No",
        "sayRate": 9767,
        "basis": "Per 1 No",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "M729",
            "page": "23",
            "rate": 1525.42,
            "unit": "No",
            "qty": 1,
            "amount": 1525.42,
            "desc": "SS Sink Glossy ASIS 316 1mm thick"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "23021A",
            "page": "136",
            "rate": 77.97,
            "unit": "No",
            "qty": 1,
            "amount": 77.97,
            "desc": "32mm MI fisher union"
          },
          {
            "sr": "C",
            "kind": "SOR",
            "code": "23035",
            "page": "136",
            "rate": 16.98,
            "unit": "No",
            "qty": 1,
            "amount": 16.98,
            "desc": "Rubber plug"
          },
          {
            "sr": "D",
            "kind": "SOR",
            "code": "23020B",
            "page": "134",
            "rate": 7797.0,
            "unit": "No",
            "qty": 1,
            "amount": 7797.0,
            "desc": "32mm CP Brass waste"
          },
          {
            "sr": "E",
            "kind": "MR",
            "label": "Fitting charges (LS)",
            "rate": 120.0,
            "unit": "LS",
            "qty": 1,
            "amount": 120.0
          }
        ]
      },
      {
        "no": "44",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "non-SOR",
        "desc": "Sandwich Platform 15-18mm Black Granite + 25mm Kota vertical support",
        "unit": "Sqm",
        "sayRate": 5319.68,
        "basis": "Per 2.81 Sqm (3.75×0.75)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M490",
            "page": "18",
            "rate": 198.31,
            "unit": "Sqm",
            "qty": 11.81,
            "amount": 2342.04,
            "desc": "25mm Kota stone (horizontal + vertical)"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M253",
            "page": "12",
            "rate": 1347.46,
            "unit": "Sqm",
            "qty": 5.51,
            "amount": 7424.5,
            "desc": "18mm Black Granite"
          },
          {
            "sr": "3",
            "kind": "SOR",
            "code": "02007A",
            "page": "32",
            "rate": 3508.87,
            "unit": "Cum",
            "qty": 0.03,
            "amount": 105.27,
            "desc": "12mm CM 1:3 bases"
          },
          {
            "sr": "4",
            "kind": "SOR",
            "code": "M724",
            "page": "24",
            "rate": 85.0,
            "unit": "Rmt",
            "qty": 21.0,
            "amount": 1785.0,
            "desc": "Moulding on exposed edges"
          },
          {
            "sr": "5",
            "kind": "MR",
            "label": "Labour — fixing",
            "rate": 650.0,
            "unit": "Sqm",
            "qty": 2.81,
            "amount": 1826.5
          }
        ]
      },
      {
        "no": "45",
        "itemNo": 96,
        "floors": false,
        "cp": 15,
        "cpApplies": "A",
        "desc": "Dewatering arrangement 5 HP pump (hiring + operation)",
        "unit": "Day",
        "sayRate": 5175,
        "basis": "Per 1 Day",
        "components": [
          {
            "sr": "A",
            "kind": "Quotation",
            "label": "5 HP pump hiring incl labour for dewatering",
            "rate": 4500.0,
            "unit": "Day",
            "qty": 1,
            "amount": 4500.0
          }
        ]
      },
      {
        "no": "45A",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "1..6",
        "desc": "Kitchen platform trolley with 3 SS 304 baskets (19mm ply, laminated)",
        "unit": "Sqm",
        "sayRate": 12736,
        "basis": "Per 0.45 Sqm (0.60×0.75)",
        "components": [
          {
            "sr": "1",
            "kind": "SOR",
            "code": "M786",
            "page": "25",
            "rate": 593.22,
            "unit": "Sqm",
            "qty": 0.47,
            "amount": 278.81,
            "desc": "19mm thick plywood"
          },
          {
            "sr": "2",
            "kind": "SOR",
            "code": "M788",
            "page": "25",
            "rate": 296.61,
            "unit": "Sqm",
            "qty": 1.047,
            "amount": 310.55,
            "desc": "1mm laminated sheet"
          },
          {
            "sr": "3a",
            "kind": "MR",
            "label": "SS Basket 304 for cup set",
            "rate": 924.0,
            "unit": "No",
            "qty": 1.0,
            "amount": 924.0
          },
          {
            "sr": "3b",
            "kind": "MR",
            "label": "SS Basket 304 plane",
            "rate": 879.0,
            "unit": "No",
            "qty": 1.0,
            "amount": 879.0
          },
          {
            "sr": "3c",
            "kind": "MR",
            "label": "SS Basket 304 for thali",
            "rate": 1211.0,
            "unit": "No",
            "qty": 1.0,
            "amount": 1211.0
          },
          {
            "sr": "4",
            "kind": "MR",
            "label": "Drawer channel (ISI)",
            "rate": 300.0,
            "unit": "Pair",
            "qty": 3.0,
            "amount": 900.0
          },
          {
            "sr": "5",
            "kind": "MR",
            "label": "SS Handle",
            "rate": 60.0,
            "unit": "No",
            "qty": 3.0,
            "amount": 180.0
          },
          {
            "sr": "6",
            "kind": "MR",
            "label": "Labour for fixing",
            "rate": 300.0,
            "unit": "LS",
            "qty": 1,
            "amount": 300.0
          }
        ]
      },
      {
        "no": "46",
        "itemNo": null,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "Decorative entrance gate (cast iron + MS tabular, painted)",
        "unit": "Kg",
        "sayRate": 175,
        "basis": "Per 1 Kg",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "10025BA",
            "page": "67",
            "rate": 164.57,
            "unit": "Kg",
            "qty": 1.0,
            "amount": 164.57,
            "desc": "P/F ornament grill"
          },
          {
            "sr": "B",
            "kind": "MR",
            "label": "Extra for hinges/pivot/pedestal/locking",
            "rate": 10.0,
            "unit": "Kg",
            "qty": 1.0,
            "amount": 10.0
          }
        ]
      },
      {
        "no": "47",
        "itemNo": null,
        "floors": false,
        "cp": 15,
        "cpApplies": "all",
        "desc": "Concertina coil fencing 600mm dia + RBT + MS angle 50×50×5",
        "unit": "Rmt",
        "sayRate": 339,
        "basis": "Per 103 Rmt fencing",
        "components": [
          {
            "sr": "A",
            "kind": "MR",
            "label": "Concertina coil fencing",
            "rate": 150.0,
            "unit": "Rmt",
            "qty": 103,
            "amount": 15450.0
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "M685",
            "page": "23",
            "rate": 39.62,
            "unit": "Kg",
            "qty": 226.1,
            "amount": 8958.08,
            "desc": "MS Angle 50×50×5mm (3.8 kg/mt)"
          },
          {
            "sr": "C",
            "kind": "SOR",
            "code": "M076",
            "page": "7",
            "rate": 57.63,
            "unit": "Kg",
            "qty": 75.06,
            "amount": 4325.49,
            "desc": "3mm barbed wire"
          },
          {
            "sr": "D",
            "kind": "MR",
            "label": "Labour charge",
            "rate": 15.0,
            "unit": "Rmt",
            "qty": 103,
            "amount": 1545.0
          }
        ]
      },
      {
        "no": "48",
        "itemNo": null,
        "floors": false,
        "cp": 0,
        "cpApplies": "none",
        "desc": "Cattle Guard using ISMC 100×50 + 100×75 + GI pipe 50mm",
        "unit": "Sqm",
        "sayRate": 5007,
        "basis": "Per 9 Sqm (4.5×2.0)",
        "components": [
          {
            "sr": "A",
            "kind": "SOR",
            "code": "M570",
            "page": "20",
            "rate": 38.11,
            "unit": "Kg",
            "qty": 138,
            "amount": 5259.21,
            "desc": "ISMC 100×50 (9.20 kg/Rmt)"
          },
          {
            "sr": "B",
            "kind": "SOR",
            "code": "M570",
            "page": "20",
            "rate": 38.11,
            "unit": "Kg",
            "qty": 69,
            "amount": 2629.6,
            "desc": "ISMC 100×75 intermediate (11.50 kg/Rmt)"
          },
          {
            "sr": "C",
            "kind": "SOR",
            "code": "M240",
            "page": "12",
            "rate": 295.76,
            "unit": "Rmt",
            "qty": 81.0,
            "amount": 23956.56,
            "desc": "50mm GI Pipe @ 12cm c/c"
          },
          {
            "sr": "D",
            "kind": "MR",
            "label": "Welding charges",
            "rate": 1500.0,
            "unit": "LS",
            "qty": 1,
            "amount": 1500.0
          },
          {
            "sr": "E",
            "kind": "SOR",
            "code": "04001A",
            "page": "33",
            "rate": 124.61,
            "unit": "Cum",
            "qty": 4.5,
            "amount": 560.75,
            "desc": "Excavation for foundation"
          },
          {
            "sr": "F",
            "kind": "SOR",
            "code": "06001BA",
            "page": "53",
            "rate": 3845.54,
            "unit": "Cum",
            "qty": 2.9,
            "amount": 11152.07,
            "desc": "Brickwork common burnt clay bricks"
          }
        ]
      }
    ],
    "marketRates": [
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
      }
    ],
    "quotationRates": [
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
      }
    ]
  },
};

// ----- Helpers -----

/**
 * Compute a single RA's final rate from its components.
 * @param {object} ra           — one RA object from DISTRICT_RA_LIBRARY[dist].rateAnalysis
 * @param {function} sorRateOf  — (code, page) => Number, looks up SOR item rate
 * @param {function} mrRateOf   — (label) => Number, looks up district MR rate
 * @param {function} qRateOf    — (label) => Number, looks up district Quotation rate
 * @returns {{ perUnit:Number, floors:Object|null, breakup:Array }}
 */
function computeRA(ra, sorRateOf, mrRateOf, qRateOf) {
  const parts = [];
  let subtotal = 0;
  ra.components.forEach(c => {
    let rate = c.rate;
    if (c.kind === 'SOR')       rate = sorRateOf(c.code, c.page) ?? c.rate;
    else if (c.kind === 'MR')   rate = mrRateOf(c.label) ?? c.rate;
    else if (c.kind === 'Quotation') rate = qRateOf(c.label) ?? c.rate;
    const amt = rate * (c.qty ?? 1);
    parts.push({ sr:c.sr, kind:c.kind, code:c.code||c.label, rate, qty:c.qty, amount:amt });
    subtotal += amt;
  });
  // 15% CP application — the JSON stores which items get it via cpApplies
  let cp = 0;
  if (ra.cp > 0 && ra.cpApplies !== 'none') {
    if (ra.cpApplies === 'all') cp = subtotal * ra.cp / 100;
    else if (ra.cpApplies === 'non-SOR') {
      const nonSor = parts.filter(p => p.kind !== 'SOR').reduce((s,p)=>s+p.amount,0);
      cp = nonSor * ra.cp / 100;
    } else {
      // cpApplies is a component-sr expression like '1+3+4+5' or 'A' or 'A+B'
      const wanted = ra.cpApplies.split(/[+,]/).map(s=>s.trim());
      const target = parts.filter(p => wanted.includes(String(p.sr))).reduce((s,p)=>s+p.amount,0);
      cp = target * ra.cp / 100;
    }
  }
  const total = subtotal + cp;
  const basisQty = extractBasisQty(ra.basis) || 1;
  const perUnit = total / basisQty;

  // Floor cascade (lift extra)
  let floors = null;
  if (ra.floors && ra.liftExtra) {
    const lift = sorRateOf(ra.liftExtra.sorCode, ra.liftExtra.page) ?? ra.liftExtra.rate;
    floors = { GF: perUnit, FF: perUnit };
    let cur = perUnit;
    ['SF','TF','FoF','FiF'].forEach(f => { cur += lift; floors[f] = cur; });
  }
  return { perUnit: Math.round(perUnit*100)/100, floors, breakup: parts, cp, subtotal, total };
}

/** Extract the "per X unit" quantity from ra.basis (e.g. "Per 3.35 Cum footing" → 3.35) */
function extractBasisQty(basis) {
  const m = String(basis||'').match(/([\d.]+)\s*(Cum|Sqm|Sq\.?m|Rmt|Kg|No|Sqmt|Day|LS)/i);
  return m ? parseFloat(m[1]) : null;
}

// ES-module export (for module scripts). If loaded as classic <script>, they
// live on window automatically.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DISTRICT_RA_LIBRARY, computeRA, extractBasisQty };
}
