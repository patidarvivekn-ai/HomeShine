/**
 * Cart line items + total. Shared by the Cart sidebar, Booking sidebar,
 * and the Booking review step.
 */
export function LineItems({ items, total, size = 'sm' }) {
  const textCls = size === 'xs' ? 'text-xs' : 'text-sm';
  return (
    <>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.cartKey} className={`flex justify-between ${textCls} c-muted font-body`}>
            <span className="flex-1 pr-2 truncate">{item.name} × {item.qty}</span>
            <span className="whitespace-nowrap">₹{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div
        className="flex justify-between font-extrabold py-3 mt-3 font-display c-deep"
        style={{ borderTop: '1.5px solid var(--border)', borderBottom: '1.5px solid var(--border)' }}
      >
        <span>Total</span>
        <span className="c-accent">₹{total.toLocaleString()}</span>
      </div>
    </>
  );
}

/**
 * Sticky summary card. Pass `children` for action buttons (Cart) or leave empty
 * for a read-only summary (Booking).
 */
export default function OrderSummary({ items, total, title = 'Summary', note, children, className = '' }) {
  return (
    <div className={`card card-pad sticky top-20 ${className}`} style={{ boxShadow: 'var(--shadow-md)' }}>
      <h3 className="font-bold mb-4 font-display c-deep">{title}</h3>
      <LineItems items={items} total={total} />
      {note && <p className="text-xs mt-3 c-muted font-body">{note}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
