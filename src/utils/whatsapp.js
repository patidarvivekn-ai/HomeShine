/** Business WhatsApp number (India, no + or spaces). */
export const WHATSAPP_BUSINESS_NUMBER = '918000384002';

/**
 * Build a wa.me URL with a pre-filled message.
 * Opens in the WhatsApp app on mobile, or WhatsApp Web on desktop.
 */
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createRequestReference(prefix = 'HS') {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const random = globalThis.crypto?.getRandomValues
    ? Array.from(globalThis.crypto.getRandomValues(new Uint8Array(3)), (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('')
    : Math.random().toString(36).slice(2, 8);

  return `${prefix}-${date}-${random.toUpperCase()}`;
}

/**
 * Compose a booking confirmation message for WhatsApp.
 */
export function buildBookingWhatsAppMessage({
  reference,
  contact,
  address,
  selectedDate,
  selectedSlot,
  items,
  total,
  formatDay,
}) {
  const lines = [
    '🧹 *New Home Shine Booking*',
    `*Reference:* ${reference}`,
    '',
    `*Name:* ${contact.name}`,
    `*Phone:* ${contact.phone}`,
    contact.email ? `*Email:* ${contact.email}` : null,
    '',
    `*When:* ${selectedDate ? formatDay(selectedDate) : '—'} · ${selectedSlot || '—'}`,
    `*Address:* ${address.line1}, ${address.city} — ${address.pincode}`,
    address.notes ? `*Notes:* ${address.notes}` : null,
    '',
    '*Services:*',
    ...items.map(
      (item) => {
        const addons = item.addons?.length
          ? ` + ${item.addons.map((addon) => addon.label).join(', ')}`
          : '';
        return `• ${item.name}${item.variant ? ` (${item.variant})` : ''}${addons} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}`;
      }
    ),
    '',
    `*Total:* ₹${Number(total).toLocaleString('en-IN')}`,
    '',
    '_Payment on-site after service._',
  ];

  return lines.filter((line) => line != null).join('\n');
}

export function buildCommercialQuoteWhatsAppMessage({ reference, form }) {
  const lines = [
    '🏢 *New Home Shine Commercial Quote*',
    `*Reference:* ${reference}`,
    '',
    `*Name:* ${form.name}`,
    form.company ? `*Company:* ${form.company}` : null,
    `*Phone:* ${form.phone}`,
    form.email ? `*Email:* ${form.email}` : null,
    form.city ? `*City:* ${form.city}` : null,
    `*Property type:* ${form.propertyType}`,
    form.area ? `*Approx. area:* ${form.area} sq ft` : null,
    form.frequency ? `*Frequency:* ${form.frequency}` : null,
    form.timing ? `*Preferred timing:* ${form.timing}` : null,
    form.message ? `*Notes:* ${form.message}` : null,
    '',
    '_Please contact me with a custom cleaning quote._',
  ];

  return lines.filter((line) => line != null).join('\n');
}

export function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  // Synchronous open from a user click works on mobile; prefer new tab when possible.
  const opened = globalThis.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    globalThis.location.href = url;
  }
}
