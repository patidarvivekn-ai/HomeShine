const U = 'https://images.unsplash.com/photo-';
const card   = (id) => `${U}${id}?auto=format&fit=crop&w=600&h=380&q=80`;
const banner = (id) => `${U}${id}?auto=format&fit=crop&w=1400&h=560&q=80`;

export const serviceImages = {
  // Sofa & Carpet
  'fabric-sofa':            card('1555041469-a586c61ea9bc'),
  'leather-sofa':           card('1567016432779-094069958ea5'),
  'recliner':               card('1586023492125-27264bad182b'),
  'sofa-cum-bed':           card('1555041469-a586c61ea9bc'),
  'wooden-sofa':            card('1484101403633-562f891dc89a'),
  'carpet':                 card('1558618666-fcd25c85cd64'),
  'dining-set':             card('1549638441-b787d5ea7f8a'),
  'mattress':               card('1631049307264-da0ec9d70304'),
  'other-furniture':        card('1555041469-a586c61ea9bc'),

  // Bathroom & Kitchen
  'bathroom-kitchen-combo': card('1552321554-5fefe8c9ef14'),
  'bathroom':               card('1552321554-5fefe8c9ef14'),
  'kitchen':                card('1556909114-f6e7ad7d3136'),
  'mini-services':          card('1584622650111-993a426fbf0a'),
  'appliance-cleaning':     card('1571175443880-49e1d25b2bc5'),

  // Full Home
  'apartment':              card('1560448204-e02f11c3d0e2'),
  'bungalow':               card('1570129477492-45c003edd2be'),
  'by-room':                card('1616594039964-ae9021a400a0'),

  // Commercial
  'commercial':             card('1497366216548-37526070297c'),
};

export const categoryImages = {
  'sofa-carpet':      banner('1555041469-a586c61ea9bc'),
  'bathroom-kitchen': banner('1552321554-5fefe8c9ef14'),
  'full-home':        banner('1560448204-e02f11c3d0e2'),
  'commercial':       banner('1497366216548-37526070297c'),
};

export const heroCollage = [
  card('1555041469-a586c61ea9bc'),
  card('1552321554-5fefe8c9ef14'),
  card('1556909114-f6e7ad7d3136'),
  card('1558618666-fcd25c85cd64'),
];
