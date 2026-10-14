import { summaryOverviewEn } from "./overview";

export const summaryPageDataEn = {
  overview: summaryOverviewEn,
  floorPlans: [
    {
      floor: "1F Floor Plan",
      units: [
        { type: "A", layout: "2LDK", rooms: "Unit 101", area: "47.58 m²", tsubo: "14.39 tsubo" },
        { type: "B", layout: "1LDK", rooms: "Unit 102", area: "37.13 m²", tsubo: "11.23 tsubo" },
      ],
    },
    {
      floor: "2F–4F Floor Plan",
      units: [
        { type: "C", layout: "1LDK", rooms: "Units 201 / 301 / 401", area: "37.67 m²", tsubo: "11.40 tsubo" },
        { type: "D", layout: "1K", rooms: "Units 202 / 302 / 402", area: "20.66 m²", tsubo: "6.25 tsubo" },
        { type: "E", layout: "1LDK", rooms: "Units 203 / 303 / 403", area: "37.92 m²", tsubo: "11.47 tsubo" },
      ],
    },
    {
      floor: "5F Floor Plan",
      units: [
        { type: "F", layout: "1LDK", rooms: "Unit 501", area: "31.26 m²", tsubo: "9.46 tsubo" },
        { type: "G", layout: "1K", rooms: "Unit 502", area: "20.02 m²", tsubo: "6.06 tsubo" },
        { type: "H", layout: "1LDK", rooms: "Unit 503", area: "33.46 m²", tsubo: "10.12 tsubo" },
      ],
    },
  ],
  interiorRows: [
    {
      kind: "room",
      room: "Entrance Porch",
      floor: { text: "Porcelain tile" },
      floorSub: { text: "Steel-trowel finished concrete", rowSpan: 2 },
      baseboard: { text: "Same finish as exterior walls" },
      wall: { text: "Porcelain tile / mosaic tile" },
      wallSub: { text: "RC patch repair", rowSpan: 2 },
      ceiling: { text: "Acrylic spray coating", rowSpan: 2 },
      ceilingSub: { text: "Calcium silicate board t=8 (on light-gauge steel)" },
      height: { text: "2150" },
    },
    {
      kind: "room",
      room: "Stairwell / Common Corridor",
      floor: { text: "Non-slip vinyl flooring" },
      floorSub: null,
      baseboard: { text: "Urethane rubber waterproof coating / H60" },
      wall: { text: "Silicone spray-coated tile / accent tile" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "RC patch repair / calcium silicate board t=8" },
      height: { text: "2100" },
    },
    { kind: "section", label: "〈Private Areas〉" },
    {
      kind: "room",
      room: "Entryway",
      floor: { text: "Vinyl floor tile t=2.0 / direct-glue wood flooring" },
      floorSub: { text: "Self-leveling compound", rowSpan: 7 },
      baseboard: { text: "Wood baseboard H40", rowSpan: 4 },
      wall: { text: "Vinyl wallpaper" },
      wallSub: { text: "Gypsum board t=12.5", rowSpan: 4 },
      ceiling: { text: "Vinyl wallpaper", rowSpan: 7 },
      ceilingSub: { text: "Gypsum board t=9.5", rowSpan: 2 },
      height: { text: "2100" },
    },
    {
      kind: "room",
      room: "LDK",
      floor: { text: "Direct-glue wood flooring", rowSpan: 3 },
      floorSub: null,
      baseboard: null,
      wall: { text: "Vinyl wallpaper / kitchen area: kitchen panel t=4" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "Western-Style Room",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "Vinyl wallpaper" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "Exposed concrete finish", rowSpan: 2 },
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "Closet",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "Vinyl wallpaper" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2270" },
    },
    {
      kind: "room",
      room: "Toilet",
      floor: { text: "Vinyl floor tile t=1.8", rowSpan: 3 },
      floorSub: null,
      baseboard: { text: "Soft baseboard H40", rowSpan: 3 },
      wall: { text: "Vinyl wallpaper (stain- and mold-resistant)", rowSpan: 3 },
      wallSub: { text: "Moisture-resistant gypsum board t=12.5", rowSpan: 3 },
      ceiling: null,
      ceilingSub: { text: "Moisture-resistant gypsum board t=9.5", rowSpan: 3 },
      height: { text: "2100", rowSpan: 3 },
    },
    {
      kind: "room",
      room: "Washroom",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: null,
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: null,
    },
    {
      kind: "room",
      room: "Laundry Space",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: null,
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: null,
    },
    {
      kind: "room",
      room: "Bathroom",
      floor: { text: "UB1014 / UB1116" },
      floorSub: { text: "—" },
      baseboard: { text: "—" },
      wall: { text: "—" },
      wallSub: { text: "—" },
      ceiling: { text: "—" },
      ceilingSub: { text: "—" },
      height: { text: "2000" },
    },
  ],
  equipmentRows: [
    {
      part: "Entrance Porch",
      items: [
        "Building entry intercom panel",
        "Mailbox with integrated parcel locker (weatherproof) [NASTA]",
        "Management notice board (resin) 300×500",
        "Fire extinguisher",
        "Emergency lighting",
        "Exit signs",
      ],
    },
    {
      part: "Stairwell / Common Corridor",
      items: [
        "Stair handrail: ready-made resin handrail",
        "Treads & risers: non-slip vinyl flooring",
        "Stair nosing: integrated vinyl flooring",
        "Accent tile: W200×H2000 mosaic frame at each unit entrance — Tosai BM-OLM-4795/CAR [Nittai Kogyo] or equivalent",
        "Floor number signs (stainless steel)",
        "Notice board (A2 size)",
        "Fire extinguisher",
        "Emergency lighting",
        "Exit signs",
      ],
    },
    { part: "Entryway", items: ["Shoe cabinet", "Floor edge trim (SUS-FB)", "Recessed downlight"] },
    {
      part: "LDK",
      items: [
        "Built-in kitchen system",
        "Range hood (duct wrapped in rock wool)",
        "Air conditioner indoor unit (equipment works: backing & sleeve)",
        "Curtain rail (double track)",
        "Air inlet 150φ (pressure-differential type with fire damper)",
        "Residential fire alarm (heat detector)",
      ],
    },
    {
      part: "Western-Style Room",
      items: [
        "Air conditioner indoor unit (equipment works: backing & sleeve)",
        "Curtain rail (double track)",
        "Indoor laundry drying hardware",
        "Air inlet 100φ",
        "Residential fire alarm (smoke detector)",
      ],
    },
    { part: "Closet", items: ["Hanging rod (SUS 32φ or equivalent)", "Top shelf D400"] },
    {
      part: "Toilet",
      items: [
        "Western-style toilet (bidet seat with warm-water wash / tank-top hand basin)",
        "Toilet paper holder",
        "Towel ring",
        "Fixed shelf",
        "Recessed downlight",
        "Ventilation system (24-hour ventilation)",
      ],
    },
    {
      part: "Washroom",
      items: [
        "Vanity unit L600",
        "Towel ring",
        "Recessed downlight",
        "Ventilation system (24-hour ventilation)",
        "Electrical panel",
      ],
    },
    {
      part: "Laundry Space",
      items: [
        "Washing machine pan 640□ (slim SL+120 type as standard where other pipes run beneath the pan; a raised type may be used if no other pipes run beneath and the plumbing can be concealed)",
      ],
    },
    {
      part: "Bathroom",
      items: [
        "Modular bathroom 1014/1116",
        "Bathroom ventilation, heating & drying unit (24-hour ventilation)",
        "Hanging rod (included with modular bathroom)",
      ],
      note: "* Complies with JIS A4416.",
    },
  ],
  exteriorColumns: [
    {
      groups: [
        {
          part: "Roof",
          rows: [
            { sub: "Roof Surface", spec: "Synthetic polymer PVC waterproofing sheet + top coat (on RC) [SI-F2] or equivalent" },
            {
              sub: "Parapet",
              spec: "Synthetic polymer PVC waterproofing sheet + top coat (on RC)\nAluminum coping with fixing brackets (joint reinforcement at max. 1500 spacing)",
            },
            {
              sub: "Equipment Bases",
              spec: "• Antenna: urethane rubber waterproof coating (glass-fiber mesh reinforced, 2 coats) [X-1] or equivalent\n• Air conditioning: Solar Base VT [Tajima Roofing] + C-channel bolt fixing\nIncl. all fittings",
            },
            { sub: "Duct Caps", spec: "Hatocotto P-0 [Showa Denko]" },
            { sub: "Roof Hatch", spec: "600 sq. SUS304 / ladder φ22×400×3 rungs SUS304" },
          ],
        },
        {
          part: "Balcony",
          rows: [
            {
              spec: "Synthetic polymer PVC waterproofing sheet + top coat (on RC)\nAluminum coping with fixing brackets (joint reinforcement at max. 1500 spacing)\nVP overflow pipe φ25\nWalls: same finish as exterior walls\nRailing: aluminum louvered railing",
            },
          ],
        },
        {
          part: "Roof Drains",
          rows: [
            {
              spec: "Cast iron (for PVC pipe) ●75φ ○50φ\n* Intermediate drains use recessed splash-proof units",
            },
          ],
        },
        {
          part: "Downpipes",
          rows: [{ spec: "Colored VU pipe 75φ, stainless steel brackets" }],
        },
        {
          part: "Exterior Walls",
          rows: [
            {
              spec: "Ultra-durable, low-soiling one-component water-based ceramic silicone paint; roller-applied water-based acrylic silicone stone-texture paint; porcelain tile 600×300 t=10",
            },
          ],
        },
        { part: "Foundation Face", rows: [{ spec: "Same finish as exterior walls" }] },
        {
          part: "Joints",
          rows: [
            {
              spec: "Construction joints W15, decorative joints W15, structural joints (per structural drawings), control joints at max. 3000 spacing\nPolysulfide sealant (double sealing at structural expansion joints)",
            },
          ],
        },
      ],
    },
    {
      groups: [
        {
          part: "Openings",
          rows: [
            { sub: "Building Entrance", spec: "Stainless steel grille door, cast aluminum ornament, fire-rated" },
            { sub: "Unit Entry Door", spec: "Steel single door (PVC-laminated steel), double lock, fire-rated" },
            { sub: "Windows", spec: "Aluminum frames (electrolytic coloring) with screens (some with roller shutters), fire-rated" },
            { sub: "MB/PS", spec: "Steel double doors, SOP (synthetic resin enamel) finish" },
          ],
        },
        {
          part: "Exterior Works",
          partNote: "(per landscape plan)",
          rows: [
            { sub: "Walkway Paving", spec: "Porcelain tile (pattern per drawings)" },
            { sub: "Drip Edge", spec: "Gravel over weed barrier mat\nSteel-trowel finished concrete" },
            { sub: "Fence", spec: "Mesh fence (H1800) on CB base" },
            { sub: "Shared Faucet", spec: "Recessed lockable hose bib box, MB (3F)" },
          ],
        },
        {
          part: "Other",
          rows: [
            { sub: "Building Nameplate", spec: "Colored stainless steel HL (hairline) 600×300" },
            { sub: "Management Notice Board", spec: "Resin 300×500" },
            { sub: "Evacuation Equipment", spec: "2F: escape rope, 3F: escape ladder, 4F & 5F: descent device\n* Fire-service certified" },
            { sub: "Laundry Hardware", spec: "No exterior laundry hardware" },
            {
              sub: "Fire Extinguishers",
              spec: "Fire extinguishers (ABC dry powder, size 10); enhanced liquid type on 2F and 4F, stored in cabinets\n* One per 20 m walking distance",
            },
          ],
        },
      ],
    },
  ],
};
