export const site = {
  name: 'Home Shine',
  legalName: 'Home Shine Deep Cleaning',
  phoneDisplay: '8000384002',
  phoneInternational: '+918000384002',
  phoneAltDisplay: '8000384001',
  whatsappNumber: '918000384002',
  email: 'homeshine2026@gmail.com',
  website: 'https://www.homeshinecleaning.in',
  address: {
    street: 'ASOPALAV RESIDENCY, 107 / 01, Thaltej',
    locality: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380059',
    country: 'IN',
  },
  hoursDisplay: 'Mon–Sun, 7 AM – 8 PM',
  areaServed: ['Ahmedabad', 'Gandhinagar'],
  // Official Google Business reviews. Replace with your Place / reviews URL when you have it.
  reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Home Shine Deep Cleaning Thaltej Ahmedabad')}`,
};

export const officeAddress = [
  site.address.street,
  site.address.locality,
  site.address.region,
  site.address.postalCode,
].join(', ');

export const siteOrigin = (import.meta.env.VITE_SITE_URL || site.website || '').replace(/\/+$/, '');

