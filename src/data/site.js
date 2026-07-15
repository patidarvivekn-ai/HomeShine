export const site = {
  name: 'Home Shine',
  legalName: 'Home Shine Deep Cleaning',
  phoneDisplay: '8000384002',
  phoneInternational: '+918000384002',
  whatsappNumber: '918000384002',
  address: {
    street: 'ASOPALAV RESIDENCY, 107 / 01, Thaltej',
    locality: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380059',
    country: 'IN',
  },
  hoursDisplay: 'Mon–Sun, 7 AM – 8 PM',
  areaServed: 'Ahmedabad',
};

export const officeAddress = [
  site.address.street,
  site.address.locality,
  site.address.region,
  site.address.postalCode,
].join(', ');

export const siteOrigin = (import.meta.env.VITE_SITE_URL || '').replace(/\/+$/, '');

