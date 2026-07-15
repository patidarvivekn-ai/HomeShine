import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CircleCheck,
  Check,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { TextField, TextAreaField } from '../components/ui/Field';
import OrderSummary, { LineItems } from '../components/ui/OrderSummary';
import Seo from '../components/Seo';
import {
  buildBookingWhatsAppMessage,
  openWhatsApp,
  buildWhatsAppUrl,
  createRequestReference,
} from '../utils/whatsapp';

const SLOTS = ['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const STEPS = ['Schedule', 'Address', 'Contact', 'Confirm'];

const WhatsAppGlyph = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const getNext7Days = () => {
  const days = [];
  const now = new Date();
  for (let i = 1; i <= 7; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
};

const formatDay = (d) => (
  d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
);

const BookingChoice = ({ active, onClick, children, ariaLabel }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    aria-pressed={active}
    onClick={onClick}
    className={`booking-choice ${active ? 'is-active' : ''}`}
  >
    {children}
  </button>
);

const BookingStepTitle = ({ icon: Icon, children }) => (
  <h2 className="booking-step__title">
    <Icon size={20} aria-hidden="true" />
    {children}
  </h2>
);

const ReviewBlock = ({ label, children }) => (
  <div className="booking-review__block">
    <p className="booking-review__label">{label}</p>
    {children}
  </div>
);

export default function BookingPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    pincode: '',
    notes: '',
  });
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const days = getNext7Days();

  const setAddr = (key, value) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const setCon = (key, value) => {
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!selectedDate) {
      nextErrors.date = 'Please select a date';
    }
    if (!selectedSlot) {
      nextErrors.slot = 'Please select a time slot';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!address.line1.trim()) {
      nextErrors.line1 = 'Address is required';
    }
    if (!address.city.trim()) {
      nextErrors.city = 'City is required';
    }
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) {
      nextErrors.pincode = 'Valid 6-digit PIN required';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (!contact.name.trim()) {
      nextErrors.name = 'Name is required';
    }
    if (!/^\d{10}$/.test(contact.phone.replace(/\D/g, ''))) {
      nextErrors.phone = 'Valid 10-digit phone required';
    }
    if (contact.email.trim() && !/\S+@\S+\.\S+/.test(contact.email)) {
      nextErrors.email = 'Enter a valid email or leave blank';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validateStep3()) {
      return;
    }

    const reference = createRequestReference('HS');
    const message = buildBookingWhatsAppMessage({
      reference,
      contact,
      address,
      selectedDate,
      selectedSlot,
      items,
      total,
      formatDay,
    });

    // Snapshot details before clearing the cart (needed for success screen + WhatsApp).
    setConfirmation({
      reference,
      email: contact.email,
      phone: contact.phone,
      name: contact.name,
      dateLabel: selectedDate ? formatDay(selectedDate) : '',
      slot: selectedSlot,
      addressLine: `${address.line1}, ${address.city} — ${address.pincode}`,
      whatsappUrl: buildWhatsAppUrl(message),
      message,
    });

    openWhatsApp(message);
    setSubmitted(true);
    clearCart();
  };

  const handleStepBack = (targetStep) => {
    setStep(targetStep);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="page-body container">
        <Seo
          title="Complete your booking"
          description="Complete your Home Shine cleaning service booking."
          path="/booking"
          noIndex
        />
        <div className="cart-empty">
          <div className="cart-empty__icon" aria-hidden="true">
            <ShoppingBag size={36} />
          </div>
          <h1 className="cart-empty__title">Your cart is empty</h1>
          <p className="cart-empty__text">
            Add a service to your cart before completing your booking.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Browse services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-body container">
        <Seo
          title="Booking details ready"
          description="Send your prepared Home Shine booking details through WhatsApp."
          path="/booking"
          noIndex
        />
        <div className="booking-success">
          <div className="booking-success__icon" aria-hidden="true">
            <CircleCheck size={36} />
          </div>
          <h1 className="booking-success__title">Almost done!</h1>
          <p className="booking-success__text">
            Send the prepared message in WhatsApp to confirm your booking.
          </p>
          <div className="booking-success__details">
            <p className="booking-success__reference">
              Reference: <strong>{confirmation?.reference}</strong>
            </p>
            <p>
              {confirmation?.dateLabel || (selectedDate && formatDay(selectedDate))}
              {' · '}
              {confirmation?.slot || selectedSlot}
            </p>
            <p>{confirmation?.addressLine || `${address.line1}, ${address.city} — ${address.pincode}`}</p>
          </div>
          <p className="booking-success__note">
            Our professional will call you 30 minutes before arriving.
            Questions? Call{' '}
            <a href="tel:+918000384002" className="link-accent">8000384002</a>.
          </p>
          <div className="booking-success__actions">
            <a
              href={confirmation?.whatsappUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg btn-block booking-success__whatsapp"
              onClick={(e) => {
                if (confirmation?.message) {
                  e.preventDefault();
                  openWhatsApp(confirmation.message);
                }
              }}
            >
              <WhatsAppGlyph size={20} /> Send on WhatsApp
            </a>
            <Link to="/" className="btn btn-secondary btn-lg btn-block">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body container booking-page">
      <Seo
        title="Complete your booking"
        description="Choose your cleaning schedule and send your Home Shine booking through WhatsApp."
        path="/booking"
        noIndex
      />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Cart', to: '/cart' },
          { label: 'Booking' },
        ]}
      />

      <h1 className="booking-page__title">Complete your booking</h1>

      <nav className="booking-stepper" aria-label="Booking progress">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < step;
          const isCurrent = stepNum === step;

          return (
            <div key={label} className="booking-stepper__item">
              {isDone ? (
                <button
                  type="button"
                  className="booking-stepper__trigger is-clickable"
                  onClick={() => handleStepBack(stepNum)}
                  aria-label={`Go back to ${label}`}
                >
                  <span className="booking-stepper__circle is-done" aria-hidden="true">
                    <Check size={14} />
                  </span>
                  <span className="booking-stepper__label">{label}</span>
                </button>
              ) : (
                <div className="booking-stepper__trigger" aria-current={isCurrent ? 'step' : undefined}>
                  <span
                    className={`booking-stepper__circle ${isCurrent ? 'is-current' : ''}`}
                    aria-hidden="true"
                  >
                    {stepNum}
                  </span>
                  <span className={`booking-stepper__label ${isCurrent ? 'is-current' : ''}`}>
                    {label}
                  </span>
                </div>
              )}
              {i < STEPS.length - 1 && (
                <div className={`booking-stepper__line ${isDone ? 'is-done' : ''}`} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </nav>

      <div className="booking-page__grid">
        <div>
          {step === 1 && (
            <div className="booking-step fade-in">
              <BookingStepTitle icon={Calendar}>Choose date &amp; time</BookingStepTitle>

              <div className="booking-step__section">
                <p className="field-label field-label--with-icon">
                  <Calendar size={14} aria-hidden="true" />
                  Select date
                </p>
                <div className="booking-step__choices booking-step__choices--dates">
                  {days.map((d) => {
                    const isActive = selectedDate?.toDateString() === d.toDateString();
                    const dayLabel = d.toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    });
                    return (
                      <BookingChoice
                        key={d.toISOString()}
                        active={isActive}
                        ariaLabel={`Select ${dayLabel}`}
                        onClick={() => setSelectedDate(d)}
                      >
                        <div className="booking-choice__weekday">
                          {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                        </div>
                        <div>
                          {d.getDate()} {d.toLocaleDateString('en-IN', { month: 'short' })}
                        </div>
                      </BookingChoice>
                    );
                  })}
                </div>
                {errors.date && <p className="field-error">{errors.date}</p>}
              </div>

              <div className="booking-step__section">
                <p className="field-label field-label--with-icon">
                  <Clock size={14} aria-hidden="true" />
                  Select time slot
                </p>
                <div className="booking-step__choices booking-step__choices--slots">
                  {SLOTS.map((slot) => (
                    <BookingChoice
                      key={slot}
                      active={selectedSlot === slot}
                      ariaLabel={`Select ${slot}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </BookingChoice>
                  ))}
                </div>
                {errors.slot && <p className="field-error">{errors.slot}</p>}
              </div>

              <button
                type="button"
                className="btn btn-lg btn-primary btn-block booking-step__submit"
                onClick={() => validateStep1() && setStep(2)}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="booking-step fade-in">
              <BookingStepTitle icon={MapPin}>Your address</BookingStepTitle>
              <div className="booking-step__form">
                <TextField
                  label="Address line 1"
                  name="line1"
                  value={address.line1}
                  onChange={(v) => setAddr('line1', v)}
                  error={errors.line1}
                  placeholder="Flat / house no., street, area"
                  required
                />
                <div className="booking-step__row">
                  <TextField
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={(v) => setAddr('city', v)}
                    error={errors.city}
                    placeholder="Mumbai"
                    required
                  />
                  <TextField
                    label="PIN code"
                    name="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(v) => setAddr('pincode', v)}
                    error={errors.pincode}
                    placeholder="400001"
                    required
                  />
                </div>
                <TextAreaField
                  label="Notes for the professional (optional)"
                  name="notes"
                  rows={2}
                  value={address.notes}
                  onChange={(v) => setAddr('notes', v)}
                  placeholder="Gate code, landmark, parking instructions…"
                />
              </div>
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block booking-step__submit"
                onClick={() => validateStep2() && setStep(3)}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="booking-step fade-in">
              <BookingStepTitle icon={User}>Your contact details</BookingStepTitle>
              <div className="booking-step__form">
                <TextField
                  label="Full name"
                  name="name"
                  value={contact.name}
                  onChange={(v) => setCon('name', v)}
                  error={errors.name}
                  placeholder="Priya Sharma"
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={contact.phone}
                  onChange={(v) => setCon('phone', v)}
                  error={errors.phone}
                  placeholder="9876543210"
                  required
                />
                <TextField
                  label="Email (optional)"
                  name="email"
                  type="email"
                  value={contact.email}
                  onChange={(v) => setCon('email', v)}
                  error={errors.email}
                  placeholder="priya@email.com"
                />
              </div>
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block booking-step__submit"
                onClick={() => validateStep3() && setStep(4)}
              >
                Review booking →
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="booking-step fade-in">
              <h2 className="booking-step__title">Review &amp; confirm</h2>
              <div className="booking-review">
                <ReviewBlock label="Schedule">
                  <p className="booking-review__value">
                    {selectedDate && formatDay(selectedDate)} · {selectedSlot}
                  </p>
                </ReviewBlock>

                <ReviewBlock label="Address">
                  <p className="booking-review__value">{address.line1}</p>
                  <p className="booking-review__sub">
                    {address.city} — {address.pincode}
                  </p>
                  {address.notes && (
                    <p className="booking-review__sub booking-review__sub--spaced">
                      {address.notes}
                    </p>
                  )}
                </ReviewBlock>

                <ReviewBlock label="Contact">
                  <p className="booking-review__value">{contact.name}</p>
                  <p className="booking-review__sub">
                    {contact.phone}
                    {contact.email ? ` · ${contact.email}` : ''}
                  </p>
                </ReviewBlock>

                <ReviewBlock label="Services">
                  <LineItems items={items} total={total} />
                </ReviewBlock>
              </div>

              <p className="booking-step__note">
                Payment collected on-site after service. Final price confirmed before work begins.
              </p>
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block booking-step__submit"
                onClick={handleConfirm}
              >
                Confirm &amp; send on WhatsApp →
              </button>
            </div>
          )}
        </div>

        <div>
          <OrderSummary
            items={items}
            total={total}
            title="Order summary"
            note="Pay on-site after service"
          />
        </div>
      </div>
    </div>
  );
}
