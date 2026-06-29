import { useState } from 'react';
import { Link } from 'react-router-dom';
import { commercialServices, commercialBenefits, commercialFaqs } from '../data/services';
import TrustBar from '../components/TrustBar';
import FAQSection from '../components/FAQSection';
import { ChevronRight, CheckCircle } from 'lucide-react';

const PROPERTY_TYPES = ['Office', 'Retail', 'Clinic', 'Restaurant', 'Educational institute', 'Other'];
const FREQUENCIES = ['One-time', 'Weekly', 'Monthly'];

// Defined at module scope (NOT inside the component) so inputs keep focus
// while typing — a nested component definition would remount on every keystroke.
function Field({ label, name, value, onChange, error, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="field-label">
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`field ${error ? 'is-error' : ''}`}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default function CommercialPage() {
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', city: '',
    propertyType: '', area: '', frequency: '', timing: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (name, val) => setForm(f => ({ ...f, [name]: val }));

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.propertyType) e.propertyType = 'Please select a property type';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length === 0) setSubmitted(true);
  }

  return (
    <div className="page-body container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
        <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--deep)', fontWeight: 600 }}>Commercial Cleaning</span>
      </div>

      {/* Header */}
      <div
        className="rounded-3xl p-6 md:p-8 text-white mb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--cat-biz) 0%, #9A3412 60%, #7C2D12 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', transform: 'translate(25%, -25%)' }}
        />
        <div className="relative flex items-center gap-4">
          <span className="text-5xl leading-none">🏢</span>
          <div>
            <h1 className="font-extrabold mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3.5vw, 32px)', letterSpacing: '-0.02em' }}>
              Commercial & Office Cleaning
            </h1>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-display)' }}>★ 4.86 · For business</div>
          </div>
        </div>
        <p className="relative mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)' }}>
          Professional cleaning for offices, retail, clinics and restaurants — one-time deep cleans or recurring daily/weekly housekeeping. Custom pricing to your space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
        {/* Services list */}
        <div>
          <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
            Services we cover
          </h2>
          <div className="space-y-3">
            {commercialServices.map((svc, i) => (
              <div key={i} className="card flex items-start gap-3 p-4">
                <span className="text-2xl shrink-0">{svc.emoji}</span>
                <div>
                  <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>{svc.name}</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{svc.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Home Shine */}
          <div className="mt-6 rounded-2xl p-5" style={{ background: 'var(--accent-light)', border: '1px solid #C2EBD8' }}>
            <h3 className="font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#055E3B' }}>Why Home Shine for business</h3>
            <ul className="space-y-2.5">
              {commercialBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#06794C', fontFamily: 'var(--font-body)' }}>
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote form */}
        <div>
          <div className="card card-pad" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h2 className="font-extrabold text-xl mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>Get a custom quote</h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Our business team will call you within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-extrabold text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>Thanks, {form.name}!</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  Our business team will call you within 24 hours with a custom quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your name" name="name" value={form.name} onChange={setField} error={errors.name} placeholder="Rahul Sharma" required />
                  <Field label="Company" name="company" value={form.company} onChange={setField} placeholder="Acme Pvt. Ltd." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={setField} error={errors.phone} placeholder="9876543210" required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={setField} error={errors.email} placeholder="you@company.com" required />
                </div>
                <Field label="City" name="city" value={form.city} onChange={setField} placeholder="Mumbai, Pune, Hyderabad…" />

                <div>
                  <label className="field-label">
                    Property type <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={e => setField('propertyType', e.target.value)}
                    className={`field ${errors.propertyType ? 'is-error' : ''}`}
                  >
                    <option value="">Select…</option>
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.propertyType && <p className="field-error">{errors.propertyType}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">Approx. area (sq ft)</label>
                    <input
                      type="number"
                      value={form.area}
                      onChange={e => setField('area', e.target.value)}
                      placeholder="2000"
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="field-label">Frequency</label>
                    <select
                      value={form.frequency}
                      onChange={e => setField('frequency', e.target.value)}
                      className="field"
                    >
                      <option value="">Select…</option>
                      {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label">Preferred timing</label>
                  <input
                    type="text"
                    value={form.timing}
                    onChange={e => setField('timing', e.target.value)}
                    placeholder="E.g. weekday evenings after 7 PM"
                    className="field"
                  />
                </div>

                <div>
                  <label className="field-label">Additional notes</label>
                  <textarea
                    value={form.message}
                    onChange={e => setField('message', e.target.value)}
                    rows={3}
                    placeholder="Anything specific we should know…"
                    className="field"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-lg btn-block"
                  style={{ background: 'var(--cat-biz)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#9A3412')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--cat-biz)')}
                >
                  Request a quote →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <TrustBar />
      <FAQSection faqs={commercialFaqs} title="Commercial FAQs" />
    </div>
  );
}
