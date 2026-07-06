import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { TextField, TextAreaField } from '../components/ui/Field';
import OrderSummary, { LineItems } from '../components/ui/OrderSummary';

const SLOTS = ['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

function getNext7Days() {
  const days = [];
  const now = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const h2Cls = 'font-bold text-lg mb-5 flex items-center gap-2 font-display c-deep';

function PrimaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-lg btn-primary btn-block mt-6">
      {children}
    </button>
  );
}

/** Selectable pill used for date / time-slot choices (touch-friendly). */
function ChoiceButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl text-sm font-medium transition-all"
      style={{
        minHeight: 48,
        border: `2px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: active ? 'var(--accent-light)' : 'white',
        color: active ? 'var(--accent-press)' : 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {children}
    </button>
  );
}

export default function BookingPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [address, setAddress] = useState({ line1: '', city: '', pincode: '', notes: '' });
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const days = getNext7Days();
  const setAddr = (k, v) => setAddress(a => ({ ...a, [k]: v }));
  const setCon = (k, v) => setContact(c => ({ ...c, [k]: v }));

  function formatDay(d) {
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function validateStep1() {
    const e = {};
    if (!selectedDate) e.date = 'Please select a date';
    if (!selectedSlot) e.slot = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!address.line1.trim()) e.line1 = 'Address is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) e.pincode = 'Valid 6-digit PIN required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e = {};
    if (!contact.name.trim()) e.name = 'Name is required';
    if (!/^\d{10}$/.test(contact.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!/\S+@\S+\.\S+/.test(contact.email)) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleConfirm() {
    if (!validateStep3()) return;
    setSubmitted(true);
    clearCart();
  }

  const steps = ['Schedule', 'Address', 'Contact', 'Confirm'];

  if (items.length === 0 && !submitted) {
    return (
      <div className="page-body container max-w-2xl mx-auto py-20 text-center">
        <p className="text-lg mb-4 c-muted font-body">Your cart is empty.</p>
        <Link to="/" className="btn btn-primary btn-lg">Browse services</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-body container max-w-2xl mx-auto py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-extrabold text-2xl mb-3 font-display c-deep">Booking confirmed!</h1>
        <p className="mb-2 c-muted font-body">
          We've sent a confirmation to <strong className="c-text">{contact.email}</strong>.
        </p>
        <p className="mb-1 c-muted font-body">📅 {selectedDate && formatDay(selectedDate)} · ⏰ {selectedSlot}</p>
        <p className="mb-6 c-muted font-body">📍 {address.line1}, {address.city} — {address.pincode}</p>
        <p className="text-sm mb-8 c-muted font-body">
          Our professional will call you 30 minutes before arriving. Questions? Call 8000384002.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="page-body container max-w-3xl mx-auto py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Booking' }]} />

      <h1 className="font-extrabold text-2xl mb-6 font-display c-deep">Complete your booking</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => {
          const done = i + 1 < step;
          const current = i + 1 === step;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${done ? 'cursor-pointer' : ''}`} onClick={() => done && setStep(i + 1)}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 font-display"
                  style={{
                    background: done || current ? 'var(--accent)' : 'var(--accent-light)',
                    color: done || current ? 'white' : 'var(--text-muted)',
                    boxShadow: current ? '0 0 0 4px var(--accent-light)' : 'none',
                  }}
                >
                  {done ? '✓' : i + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:block font-display" style={{ color: current ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3" style={{ background: done ? 'var(--accent)' : 'var(--border)' }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1: Schedule */}
          {step === 1 && (
            <div className="card card-pad fade-in">
              <h2 className={h2Cls}><Calendar size={20} className="c-accent" /> Choose date & time</h2>
              <div className="mb-5">
                <p className="field-label">Select date</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {days.map((d, i) => (
                    <ChoiceButton key={i} active={selectedDate?.toDateString() === d.toDateString()} onClick={() => setSelectedDate(d)}>
                      <div className="font-bold font-display">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                      <div>{d.getDate()} {d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                    </ChoiceButton>
                  ))}
                </div>
                {errors.date && <p className="field-error">{errors.date}</p>}
              </div>
              <div>
                <p className="field-label flex items-center gap-1"><Clock size={14} /> Select time slot</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SLOTS.map(slot => (
                    <ChoiceButton key={slot} active={selectedSlot === slot} onClick={() => setSelectedSlot(slot)}>
                      {slot}
                    </ChoiceButton>
                  ))}
                </div>
                {errors.slot && <p className="field-error">{errors.slot}</p>}
              </div>
              <PrimaryButton onClick={() => validateStep1() && setStep(2)}>Continue →</PrimaryButton>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="card card-pad fade-in">
              <h2 className={h2Cls}><MapPin size={20} className="c-accent" /> Your address</h2>
              <div className="space-y-4">
                <TextField label="Address line 1" name="line1" value={address.line1} onChange={v => setAddr('line1', v)} error={errors.line1} placeholder="Flat / house no., street, area" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField label="City" name="city" value={address.city} onChange={v => setAddr('city', v)} error={errors.city} placeholder="Mumbai" required />
                  <TextField label="PIN code" name="pincode" inputMode="numeric" maxLength={6} value={address.pincode} onChange={v => setAddr('pincode', v)} error={errors.pincode} placeholder="400001" required />
                </div>
                <TextAreaField label="Notes for the professional (optional)" name="notes" rows={2} value={address.notes} onChange={v => setAddr('notes', v)} placeholder="Gate code, landmark, parking instructions…" />
              </div>
              <PrimaryButton onClick={() => validateStep2() && setStep(3)}>Continue →</PrimaryButton>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div className="card card-pad fade-in">
              <h2 className={h2Cls}><User size={20} className="c-accent" /> Your contact details</h2>
              <div className="space-y-4">
                <TextField label="Full name" name="name" value={contact.name} onChange={v => setCon('name', v)} error={errors.name} placeholder="Priya Sharma" required />
                <TextField label="Phone" name="phone" type="tel" inputMode="numeric" value={contact.phone} onChange={v => setCon('phone', v)} error={errors.phone} placeholder="9876543210" required />
                <TextField label="Email" name="email" type="email" value={contact.email} onChange={v => setCon('email', v)} error={errors.email} placeholder="priya@email.com" required />
              </div>
              <PrimaryButton onClick={() => validateStep3() && setStep(4)}>Review booking →</PrimaryButton>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="card card-pad fade-in">
              <h2 className="font-bold text-lg mb-5 font-display c-deep">Review & confirm</h2>
              <div className="space-y-4">
                {[
                  ['Schedule', <p key="s" className="font-semibold c-deep">{selectedDate && formatDay(selectedDate)} · {selectedSlot}</p>],
                  ['Address', (
                    <div key="a">
                      <p className="font-semibold c-deep">{address.line1}</p>
                      <p className="text-sm c-muted">{address.city} — {address.pincode}</p>
                      {address.notes && <p className="text-sm mt-1 c-muted">📝 {address.notes}</p>}
                    </div>
                  )],
                  ['Contact', (
                    <div key="c">
                      <p className="font-semibold c-deep">{contact.name}</p>
                      <p className="text-sm c-muted">{contact.phone} · {contact.email}</p>
                    </div>
                  )],
                ].map(([label, body]) => (
                  <div key={label} className="rounded-xl p-4" style={{ background: 'var(--ground)' }}>
                    <p className="text-xs uppercase tracking-wide mb-2 c-muted font-display">{label}</p>
                    {body}
                  </div>
                ))}
                <div className="rounded-xl p-4" style={{ background: 'var(--ground)' }}>
                  <p className="text-xs uppercase tracking-wide mb-2 c-muted font-display">Services</p>
                  <LineItems items={items} total={total} />
                </div>
              </div>
              <p className="text-xs mt-4 c-muted font-body">
                Payment collected on-site after service. Final price confirmed before work begins.
              </p>
              <PrimaryButton onClick={handleConfirm}>Confirm booking →</PrimaryButton>
            </div>
          )}
        </div>

        {/* Sidebar summary */}
        <div className="lg:col-span-1">
          <OrderSummary items={items} total={total} title="Order summary" note="Pay on-site after service" />
        </div>
      </div>
    </div>
  );
}
