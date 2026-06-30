import { useState } from 'react';
import { commercialServices, commercialBenefits, commercialFaqs } from '../data/services';
import TrustBar from '../components/TrustBar';
import FAQSection from '../components/FAQSection';
import Breadcrumb from '../components/ui/Breadcrumb';
import CategoryNav from '../components/CategoryNav';
import { TextField, SelectField, TextAreaField } from '../components/ui/Field';
import { CheckCircle } from 'lucide-react';

const PROPERTY_TYPES = ['Office', 'Retail', 'Clinic', 'Restaurant', 'Educational institute', 'Other'];
const FREQUENCIES = ['One-time', 'Weekly', 'Monthly'];

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
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Commercial Cleaning' }]} />
      <CategoryNav activeSlug="commercial" />

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
            <h2 className="font-extrabold text-xl mb-1 font-display c-deep">Get a custom quote</h2>
            <p className="text-sm mb-5 c-muted font-body">Our business team will call you within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-extrabold text-xl mb-2 font-display c-deep">Thanks, {form.name}!</h3>
                <p className="text-sm c-muted font-body">
                  Our business team will call you within 24 hours with a custom quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField label="Your name" name="name" value={form.name} onChange={v => setField('name', v)} error={errors.name} placeholder="Rahul Sharma" required />
                  <TextField label="Company" name="company" value={form.company} onChange={v => setField('company', v)} placeholder="Acme Pvt. Ltd." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField label="Phone" name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={v => setField('phone', v)} error={errors.phone} placeholder="9876543210" required />
                  <TextField label="Email" name="email" type="email" value={form.email} onChange={v => setField('email', v)} error={errors.email} placeholder="you@company.com" required />
                </div>
                <TextField label="City" name="city" value={form.city} onChange={v => setField('city', v)} placeholder="Mumbai, Pune, Hyderabad…" />

                <SelectField
                  label="Property type"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={v => setField('propertyType', v)}
                  error={errors.propertyType}
                  options={PROPERTY_TYPES}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField label="Approx. area (sq ft)" name="area" type="number" inputMode="numeric" value={form.area} onChange={v => setField('area', v)} placeholder="2000" />
                  <SelectField label="Frequency" name="frequency" value={form.frequency} onChange={v => setField('frequency', v)} options={FREQUENCIES} />
                </div>

                <TextField label="Preferred timing" name="timing" value={form.timing} onChange={v => setField('timing', v)} placeholder="E.g. weekday evenings after 7 PM" />

                <TextAreaField label="Additional notes" name="message" value={form.message} onChange={v => setField('message', v)} rows={3} placeholder="Anything specific we should know…" />

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
