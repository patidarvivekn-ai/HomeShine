/** Cascading service-type options (Level 1 → Level 2). */
export const SERVICE_TYPES = {
  'Full Home Deep Cleaning': ['1BHK', '2BHK', '3BHK', '4BHK', 'Other'],
  'Bungalow / Villa Deep Cleaning': ['Small', 'Medium', 'Large', 'Duplex', 'Other'],
  'Office / Commercial Cleaning': ['Per Sq Ft', 'Per Workstation', 'Full Premises', 'Other'],
  'Sofa / Carpet / Mattress Cleaning': ['Sofa', 'Carpet', 'Mattress', 'Dining Set', 'Other'],
  'Sanitization Only': ['1BHK', '2BHK', '3BHK', 'Full Premises', 'Other'],
  Other: [],
};

/** Package presets — drive scope panel, checklist, and price-row selection. */
export const PACKAGE_PRESETS = {
  '1BHK': {
    id: '1BHK',
    label: '1BHK',
    name: '1 BHK Package',
    area: '450-650 sq\u00A0ft',
    staff: 3,
    hours: '5-6 Hours',
    rooms: { living: 1, bed: 1, kitchen: 1, bath: 1, balcony: 1 },
    showCard: true,
  },
  '2BHK': {
    id: '2BHK',
    label: '2BHK',
    name: '2 BHK Package',
    area: '700-1000 sq\u00A0ft',
    staff: 4,
    hours: '6-8 Hours',
    rooms: { living: 1, bed: 2, kitchen: 1, bath: 2, balcony: '1-2' },
    showCard: true,
  },
  '3BHK': {
    id: '3BHK',
    label: '3BHK',
    name: '3 BHK Package',
    area: '1100-1600 sq\u00A0ft',
    staff: 5,
    hours: '8-10 Hours',
    rooms: { living: 1, bed: 3, kitchen: 1, bath: 3, balcony: 2 },
    showCard: true,
  },
  '4BHK': {
    id: '4BHK',
    label: '4BHK',
    name: '4 BHK Package',
    area: '1700-2500 sq\u00A0ft',
    staff: 6,
    hours: '10-12 Hours',
    rooms: { living: 1, bed: 4, kitchen: 1, bath: 4, balcony: 2 },
    showCard: true,
  },
  'Villa/Bungalow': {
    id: 'Villa/Bungalow',
    label: 'Villa/Bungalow',
    name: 'Villa / Bungalow Package',
    area: 'Site visit',
    staff: 6,
    hours: '12+ Hours',
    rooms: { living: 2, bed: 4, kitchen: 2, bath: 4, balcony: 3 },
    showCard: false,
  },
};

export const DEFAULT_PRICE_ROWS = [
  { id: '1BHK', rate: 3499, disc: 200 },
  { id: '2BHK', rate: 5999, disc: 300 },
  { id: '3BHK', rate: 6999, disc: 500 },
  { id: '4BHK', rate: 10999, disc: 700 },
  { id: 'Villa/Bungalow', rate: 0, disc: 0 },
];

export const DEFAULT_PACKAGE_ID = '2BHK';

export const FIXED = {
  companyName: 'Home Shine Deep Cleaning Service',
  tagline: 'CLEANING SERVICES • DEEP CLEANING • HOUSEKEEPING & FACILITY MANAGEMENT',
  tender:
    'Housekeeping, Office Cleaning, Deep Cleaning, Sanitation, Hospital & School Cleaning — Gujarat Govt, AMC, AUDA, GMC',
  contactPerson: 'Balkrishan Patidar',
  phones: '8000384001, 8000384002',
  phonesShort: '8000384001 / 8000384002',
  email: 'homeshine2026@gmail.com',
  locations: 'Ahmedabad / Gandhinagar',
  locationsLong: 'Ahmedabad • Gandhinagar • Gujarat',
  website: 'www.homeshinecleaning.in',
  whatsapp: '8000384001',
  includes:
    'Dry + Wet Cleaning, Chemical Treatment, Sanitization & Final QC — all material & labour included.',
  checklistTasks: {
    living: [
      'Cobweb removal (ceiling & corners)',
      'Wall dusting & spot cleaning',
      'Ceiling fan deep cleaning',
      'Light fixtures & tube lights',
      'Switch boards sanitization',
      'Windows, grills & sliding channels',
      'Doors & door frames cleaning',
      'Floor scrubbing & mopping',
    ],
    bedroom: [
      'All living room tasks',
      'Wardrobe inside-outside deep clean',
      'AC outer dusting & filter cleaning',
      'Mirror & glass polishing',
      'Bedside table & drawers',
      'Curtain rod dusting',
    ],
    kitchen: [
      'Tiles degreasing & descaling',
      'Platform scrubbing & polishing',
      'Sink & faucet deep cleaning',
      'Chimney degreasing (external)',
      'Cabinets inside-outside cleaning',
      'Exhaust fan degreasing',
      'Window & drain area cleaning',
    ],
    bathroom: [
      'Descaling & anti-bacterial treatment',
      'Tiles scrubbing (wall & floor)',
      'WC / Indian commode deep cleaning',
      'Wash basin & glass cleaning',
      'CP fittings polishing',
      'Exhaust & mirror cleaning',
    ],
    balcony: [
      'Floor scrubbing & railing wipe',
      'Grill & sliding channel cleaning',
    ],
  },
  sop: [
    { n: '01', t: 'Inspection', d: 'Site survey, stains marking & client requirements' },
    { n: '02', t: 'Dry Dusting', d: 'Vacuum, cobweb & loose dust removal top to bottom' },
    { n: '03', t: 'Wet Cleaning', d: 'Scrubbing, wiping & degreasing all surfaces' },
    { n: '04', t: 'Chemical', d: 'Diversey / Taski chemicals for stains & scaling' },
    { n: '05', t: 'Sanitization', d: 'Disinfection & deodorizing for healthy home' },
    { n: '06', t: 'Final QC', d: 'Supervisor inspection & client walkthrough' },
  ],
  equipment: {
    machines: 'Industrial Vacuum, Scrubber, Pressure Washer, Steam Cleaner',
    tools: 'Microfiber, Scrub pads, Squeegee, Ladder, Brushes',
    chemicals:
      'R2, R3, R4, R6, Suma Diverse, Taski Spiral — eco-friendly, safe for kids & pets after drying.',
    note: 'Water & electricity to be arranged by customer. Heavy furniture shifting not included (can be done on request). Hard water scaling may need extra treatment.',
  },
  terms: [
    'Quotation valid for 7 days. Confirmation requires 20% advance.',
    'Customer to provide water, electricity & ladder access.',
    'Construction debris / paint removal quoted separately if heavy.',
    'Wardrobe & kitchen items should be emptied for inside cleaning.',
    'Missed spots: re-clean within 24 hours. Website bookings also carry a 30-day satisfaction re-clean.',
    'Glass breakage due to old fittings not covered — handled with care.',
  ],
  payment: [
    'Payment: 20% advance to block slot, 80% after QC & client approval.',
    'Modes: UPI / Cash / Bank Transfer — Invoice with GST if required.',
    'Sanitization spray free with every deep cleaning.',
    'Service Time: Morning 9 AM onwards. Team wears uniform & ID.',
    'For AMC / Society / Govt Tenders — separate rate card available.',
  ],
  nextSteps:
    'Confirm date/time, share location on WhatsApp 8000384002 / 8000384001. Team reaches with material.',
};

export function formatInr(n) {
  const s = String(Math.max(0, Math.round(Number(n) || 0)));
  let l = s.slice(-3);
  let r = s.slice(0, -3);
  if (r) {
    r = r.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    l = `,${l}`;
  }
  return `\u20B9${r}${l}`;
}

export function generateQuotationNo(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.floor(1000 + Math.random() * 9000));
  return `HS/${y}${m}/${seq}`;
}

export function quotationFilename(quotationNo) {
  const slug = String(quotationNo || 'HS-000000-0000').replace(/\//g, '-');
  return `Quotation-${slug}.pdf`;
}

export function buildServiceText(level1, level2, otherText) {
  const l1 = level1 || '';
  if (l1 === 'Other') {
    const custom = (otherText || '').trim();
    return custom ? `Other - ${custom}` : 'Other';
  }
  if (level2 === 'Other') {
    const custom = (otherText || '').trim();
    return custom ? `${l1} - ${custom}` : `${l1} - Other`;
  }
  if (level2) return `${l1} - ${level2}`;
  return l1;
}

export function coverageText(rooms) {
  if (!rooms) return '';
  return `${rooms.living} Living, ${rooms.bed} Bed, ${rooms.bath} Bath, ${rooms.balcony} Balcony`;
}

export function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
