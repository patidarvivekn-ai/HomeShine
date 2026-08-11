import { Minus, Plus } from 'lucide-react';

export default function QtyStepper({
  qty,
  onDecrease,
  onIncrease,
  label = 'Quantity',
  size = 'md',
}) {
  return (
    <div className={`qty-stepper qty-stepper--${size}`} aria-label={label}>
      <button
        type="button"
        className="qty-stepper__btn"
        onClick={onDecrease}
        aria-label={`Decrease ${label}`}
      >
        <Minus size={size === 'sm' ? 13 : 15} aria-hidden="true" />
      </button>
      <span className="qty-stepper__value" aria-live="polite">{qty}</span>
      <button
        type="button"
        className="qty-stepper__btn qty-stepper__btn--plus"
        onClick={onIncrease}
        aria-label={`Increase ${label}`}
      >
        <Plus size={size === 'sm' ? 13 : 15} aria-hidden="true" />
      </button>
    </div>
  );
}
