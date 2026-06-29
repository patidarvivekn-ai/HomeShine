import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';

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

const labelStyle = { color: 'var(--text)', fontFamily: 'var(--font-display)' };
const h2Cls = 'font-bold text-lg mb-5 flex items-center gap-2';
const h2Style = { fontFamily: 'var(--font-display)', color: 'var(--deep)' };

function PrimaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-lg btn-primary btn-block mt-6">
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
        <p className="text-lg mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Your cart is empty.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
          style={{ background: 'var(--accent)', color: 'white', fontFamily: 'var(--font-display)' }}
        >
          Browse services
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-body container max-w-2xl mx-auto py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-extrabold text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>Booking confirmed!</h1>
        <p className="mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          We've sent a confirmation to <strong style={{ color: 'var(--text)' }}>{contact.email}</strong>.
        </p>
        <p className="mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          📅 {selectedDate && formatDay(selectedDate)} · ⏰ {selectedSlot}
        </p>
        <p className="mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>📍 {address.line1}, {address.city} — {address.pincode}</p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Our professional will call you 30 minutes before arriving. Questions? Call 1234-567-890.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
          style={{ background: 'var(--accent)', color: 'white', fontFamily: 'var(--font-display)' }}
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-body container max-w-3xl mx-auto py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight size={12} />
        <Link to="/cart" className="hover:text-emerald-700">Cart</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--deep)', fontWeight: 600 }}>Booking</span>
      </div>

      <h1 className="font-extrabold text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>Complete your booking</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => {
          const done = i + 1 < step;
          const current = i + 1 === step;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`flex items-center gap-2 ${done ? 'cursor-pointer' : ''}`}
                onClick={() => done && setStep(i + 1)}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: done || current ? 'var(--accent)' : 'var(--accent-light)',
                    color: done || current ? 'white' : 'var(--text-muted)',
                    boxShadow: current ? '0 0 0 4px var(--accent-light)' : 'none',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {done ? '✓' : i + 1}
                </div>
                <span
                  className="text-sm font-semibold hidden sm:block"
                  style={{ color: current ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'var(--font-display)' }}
                >
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
            <div className="card card-pad">
              <h2 className={h2Cls} style={h2Style}>
                <Calendar size={20} style={{ color: 'var(--accent)' }} /> Choose date & time
              </h2>
              <div className="mb-5">
                <p className="text-sm font-semibold mb-3" style={labelStyle}>Select date</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {days.map((d, i) => {
                    const active = selectedDate?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className="p-2.5 rounded-xl text-center text-xs font-medium transition-all"
                        style={{
                          border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                          background: active ? 'var(--accent-light)' : 'white',
                          color: active ? 'var(--accent)' : 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        <div className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                        <div>{d.getDate()} {d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                      </button>
                    );
                  })}
                </div>
                {errors.date && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.date}</p>}
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-1" style={labelStyle}>
                  <Clock size={14} /> Select time slot
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SLOTS.map(slot => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className="py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                          background: active ? 'var(--accent-light)' : 'white',
                          color: active ? 'var(--accent)' : 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.slot && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.slot}</p>}
              </div>
              <PrimaryButton onClick={() => validateStep1() && setStep(2)}>Continue →</PrimaryButton>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="card card-pad">
              <h2 className={h2Cls} style={h2Style}>
                <MapPin size={20} style={{ color: 'var(--accent)' }} /> Your address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="field-label">
                    Address line 1 <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    value={address.line1}
                    onChange={e => setAddress(a => ({ ...a, line1: e.target.value }))}
                    placeholder="Flat / house no., street, area"
                    className={`field ${errors.line1 ? 'is-error' : ''}`}
                  />
                  {errors.line1 && <p className="field-error">{errors.line1}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">City <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      value={address.city}
                      onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                      placeholder="Mumbai"
                      className={`field ${errors.city ? 'is-error' : ''}`}
                    />
                    {errors.city && <p className="field-error">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="field-label">PIN code <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      value={address.pincode}
                      onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))}
                      placeholder="400001"
                      maxLength={6}
                      className={`field ${errors.pincode ? 'is-error' : ''}`}
                    />
                    {errors.pincode && <p className="field-error">{errors.pincode}</p>}
                  </div>
                </div>
                <div>
                  <label className="field-label">Notes for the professional (optional)</label>
                  <textarea
                    value={address.notes}
                    onChange={e => setAddress(a => ({ ...a, notes: e.target.value }))}
                    rows={2}
                    placeholder="Gate code, landmark, parking instructions…"
                    className="field"
                  />
                </div>
              </div>
              <PrimaryButton onClick={() => validateStep2() && setStep(3)}>Continue →</PrimaryButton>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div className="card card-pad">
              <h2 className={h2Cls} style={h2Style}>
                <User size={20} style={{ color: 'var(--accent)' }} /> Your contact details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="field-label">Full name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    value={contact.name}
                    onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                    placeholder="Priya Sharma"
                    className={`field ${errors.name ? 'is-error' : ''}`}
                  />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>
                <div>
                  <label className="field-label">Phone <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    placeholder="9876543210"
                    className={`field ${errors.phone ? 'is-error' : ''}`}
                  />
                  {errors.phone && <p className="field-error">{errors.phone}</p>}
                </div>
                <div>
                  <label className="field-label">Email <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    placeholder="priya@email.com"
                    className={`field ${errors.email ? 'is-error' : ''}`}
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>
              </div>
              <PrimaryButton onClick={() => validateStep3() && setStep(4)}>Review booking →</PrimaryButton>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="card card-pad">
              <h2 className="font-bold text-lg mb-5" style={h2Style}>Review & confirm</h2>
              <div className="space-y-4">
                {[
                  ['Schedule', <p key="s" className="font-semibold" style={{ color: 'var(--deep)' }}>{selectedDate && formatDay(selectedDate)} · {selectedSlot}</p>],
                  ['Address', (
                    <div key="a">
                      <p className="font-semibold" style={{ color: 'var(--deep)' }}>{address.line1}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{address.city} — {address.pincode}</p>
                      {address.notes && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>📝 {address.notes}</p>}
                    </div>
                  )],
                  ['Contact', (
                    <div key="c">
                      <p className="font-semibold" style={{ color: 'var(--deep)' }}>{contact.name}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{contact.phone} · {contact.email}</p>
                    </div>
                  )],
                ].map(([label, body]) => (
                  <div key={label} className="rounded-xl p-4" style={{ background: 'var(--ground)' }}>
                    <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>{label}</p>
                    {body}
                  </div>
                ))}
                <div className="rounded-xl p-4" style={{ background: 'var(--ground)' }}>
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>Services</p>
                  {items.map(item => (
                    <div key={item.cartKey} className="flex justify-between text-sm mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
                      <span>{item.name} ({item.variant}) × {item.qty}</span>
                      <span>₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 flex justify-between font-bold" style={{ borderTop: '1px solid var(--border)', color: 'var(--deep)', fontFamily: 'var(--font-display)' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--accent)' }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                Payment collected on-site after service. Final price confirmed before work begins.
              </p>
              <PrimaryButton onClick={handleConfirm}>Confirm booking →</PrimaryButton>
            </div>
          )}
        </div>

        {/* Sidebar summary */}
        <div className="lg:col-span-1">
          <div className="card p-4 sticky top-20" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>Order summary</h3>
            {items.map(item => (
              <div key={item.cartKey} className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                <span className="flex-1 pr-2 truncate">{item.name} × {item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 flex justify-between font-bold" style={{ borderTop: '1px solid var(--border)', color: 'var(--deep)', fontFamily: 'var(--font-display)' }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent)' }}>₹{total.toLocaleString()}</span>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Pay on-site after service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
