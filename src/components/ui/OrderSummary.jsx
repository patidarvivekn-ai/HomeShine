/**
 * Cart line items + total. Shared by the Cart sidebar, Booking sidebar,
 * and the Booking review step.
 */
export function LineItems({ items, total, size = 'sm' }) {
  const sizeClass = size === 'xs' ? 'line-items__row--sm' : 'line-items__row--md';

  return (
    <>
      <div className="line-items">
        {items.map((item) => (
          <div key={item.cartKey} className={`line-items__row ${sizeClass}`}>
            <span className="line-items__label">{item.name} × {item.qty}</span>
            <span className="line-items__value">
              ₹{(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="line-items__total">
        <span>Total</span>
        <span className="line-items__total-value">₹{total.toLocaleString()}</span>
      </div>
    </>
  );
}

/**
 * Sticky summary card. Pass `children` for action buttons (Cart) or leave empty
 * for a read-only summary (Booking).
 */
export default function OrderSummary({
  items,
  total,
  title = 'Summary',
  note,
  children,
  className = '',
}) {
  return (
    <aside className={`order-summary ${className}`.trim()}>
      <h3 className="order-summary__title">{title}</h3>
      <LineItems items={items} total={total} />
      {note && <p className="order-summary__note">{note}</p>}
      {children && <div className="order-summary__actions">{children}</div>}
    </aside>
  );
}
