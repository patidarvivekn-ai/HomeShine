/** Business WhatsApp number (India, no + or spaces). */
export const WHATSAPP_BUSINESS_NUMBER = '918000384002';

/**
 * Build a wa.me URL with a pre-filled message.
 * Opens in the WhatsApp app on mobile, or WhatsApp Web on desktop.
 */
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Compose a booking confirmation message for WhatsApp.
 */
export function buildBookingWhatsAppMessage({
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
      (item) =>
        `• ${item.name}${item.variant ? ` (${item.variant})` : ''} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}`
    ),
    '',
    `*Total:* ₹${Number(total).toLocaleString('en-IN')}`,
    '',
    '_Payment on-site after service._',
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
