/**
 * Premium imagery for Home Shine.
 * All Unsplash IDs verified (HTTP 200). Consistent crops for responsive layouts.
 */

const CDN = 'https://images.unsplash.com/photo-';

const card = (id) =>
  `${CDN}${id}?auto=format&fit=crop&w=800&h=600&q=85&fm=webp`;

const banner = (id) =>
  `${CDN}${id}?auto=format&fit=crop&w=1600&h=720&q=85&fm=webp`;

export const cardSrcSet = (id) =>
  `${CDN}${id}?auto=format&fit=crop&w=400&h=300&q=80&fm=webp 400w, ` +
  `${CDN}${id}?auto=format&fit=crop&w=800&h=600&q=85&fm=webp 800w, ` +
  `${CDN}${id}?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp 1200w`;

export const bannerSrcSet = (id) =>
  `${CDN}${id}?auto=format&fit=crop&w=800&h=360&q=80&fm=webp 800w, ` +
  `${CDN}${id}?auto=format&fit=crop&w=1200&h=540&q=85&fm=webp 1200w, ` +
  `${CDN}${id}?auto=format&fit=crop&w=1600&h=720&q=85&fm=webp 1600w`;

/** Map service/category keys → raw Unsplash photo id (for srcSet helpers). */
export const photoIds = {
  'fabric-sofa':            '1555041469-a586c61ea9bc',
  'leather-sofa':           '1567016432779-094069958ea5',
  'recliner':               '1586023492125-27b2c045efd7',
  'sofa-cum-bed':           '1505693416388-ac5ce068fe85',
  'wooden-sofa':            '1616486338812-3dadae4b4ace',
  'carpet':                 '1558618666-fcd25c85cd64',
  'dining-set':             '1414235077428-338989a2e8c0',
  'mattress':               '1631049307264-da0ec9d70304',
  'other-furniture':        '1484101403633-562f891dc89a',

  'bathroom-kitchen-combo': '1552321554-5fefe8c9ef14',
  'bathroom':               '1584622650111-993a426fbf0a',
  'kitchen':                '1556911220-bff31c812dba',
  'mini-services':          '1600566753190-17f0baa2a6c3',
  'appliance-cleaning':     '1571175443880-49e1d25b2bc5',

  'apartment':              '1600210492486-724fe5c67fb0',
  'bungalow':               '1600596542815-ffad4c1539a9',
  'by-room':                '1616594039964-ae9021a400a0',
  'commercial':             '1497366216548-37526070297c',

  'sofa-carpet':            '1555041469-a586c61ea9bc',
  'bathroom-kitchen':       '1552321554-5fefe8c9ef14',
  'full-home':              '1600210492486-724fe5c67fb0',

  'hero-1':                 '1555041469-a586c61ea9bc',
  'hero-2':                 '1552321554-5fefe8c9ef14',
  'hero-3':                 '1556911220-bff31c812dba',
  'hero-4':                 '1497366216548-37526070297c',
};

export const serviceImages = Object.fromEntries(
  [
    'fabric-sofa', 'leather-sofa', 'recliner', 'sofa-cum-bed', 'wooden-sofa',
    'carpet', 'dining-set', 'mattress', 'other-furniture',
    'bathroom-kitchen-combo', 'bathroom', 'kitchen', 'mini-services', 'appliance-cleaning',
    'apartment', 'bungalow', 'by-room', 'commercial',
  ].map((key) => [key, card(photoIds[key])])
);

export const categoryImages = {
  'sofa-carpet':      banner(photoIds['sofa-carpet']),
  'bathroom-kitchen': banner(photoIds['bathroom-kitchen']),
  'full-home':        banner(photoIds['full-home']),
  'commercial':       banner(photoIds['commercial']),
};

export const heroCollage = [
  card(photoIds['hero-1']),
  card(photoIds['hero-2']),
  card(photoIds['hero-3']),
  card(photoIds['hero-4']),
];

export const heroCollageIds = ['hero-1', 'hero-2', 'hero-3', 'hero-4'];
