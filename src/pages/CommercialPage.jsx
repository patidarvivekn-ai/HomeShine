import { useState } from 'react';
import {
  commercialServices,
  commercialBenefits,
  commercialFaqs,
  categories,
} from '../data/services';
import { categoryImages } from '../data/images';
import TrustBar from '../components/TrustBar';
import FAQSection from '../components/FAQSection';
import Breadcrumb from '../components/ui/Breadcrumb';
import CategoryNav from '../components/CategoryNav';
import SectionHeader from '../components/ui/SectionHeader';
import StarRating from '../components/StarRating';
import SmartImage from '../components/SmartImage';
import { TextField, SelectField, TextAreaField } from '../components/ui/Field';
import {
  Building2,
  Sofa,
  Sparkles,
  Droplets,
  UtensilsCrossed,
  PanelTop,
  Hammer,
  ShieldCheck,
  Calendar,
  CheckCircle,
  CircleCheck,
} from 'lucide-react';

const PROPERTY_TYPES = ['Office', 'Retail', 'Clinic', 'Restaurant', 'Educational institute', 'Other'];
const FREQUENCIES = ['One-time', 'Weekly', 'Monthly'];

const SERVICE_ICONS = [
  Building2,
  Sofa,
  Sparkles,
  Droplets,
  UtensilsCrossed,
  PanelTop,
  Hammer,
  ShieldCheck,
  Calendar,
];

const commercialCategory = categories.find((c) => c.slug === 'commercial');

export default function CommercialPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '',
    area: '',
    frequency: '',
    timing: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (name, val) => {
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      nextErrors.phone = 'Valid 10-digit phone required';
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Valid email required';
    }
    if (!form.propertyType) {
      nextErrors.propertyType = 'Please select a property type';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="page-body">
      <div className="commercial-hero">
        <SmartImage
          src={categoryImages.commercial}
          alt="Commercial office cleaning"
          fallbackId="commercial"
          photoKey="commercial"
          variant="banner"
          sizes="100vw"
          eager
          className="commercial-hero__media"
        />
        <div className="commercial-hero__overlay" aria-hidden="true" />
        <div className="commercial-hero__glow" aria-hidden="true" />

        <div className="commercial-hero__content">
          <div className="container commercial-hero__inner">
            <Breadcrumb
              tone="light"
              className="commercial-hero__breadcrumb"
              items={[{ label: 'Home', to: '/' }, { label: 'Commercial Cleaning' }]}
            />
            <h1 className="commercial-hero__title">
              {commercialCategory?.name || 'Commercial & Office Cleaning'}
            </h1>
            {commercialCategory && (
              <StarRating
                rating={commercialCategory.rating}
                reviews={commercialCategory.reviews}
                size="lg"
                dark
              />
            )}
            <p className="commercial-hero__intro">
              Professional cleaning for offices, retail, clinics and restaurants — one-time deep cleans
              or recurring daily/weekly housekeeping. Custom pricing to your space.
            </p>
          </div>
        </div>
      </div>

      <div className="container commercial-page__main">
        <CategoryNav activeSlug="commercial" />

        <div className="commercial-page__grid">
          <div>
            <SectionHeader title="Services we cover" />

            <div className="commercial-services">
              {commercialServices.map((svc, i) => {
                const Icon = SERVICE_ICONS[i];
                return (
                  <div key={svc.name} className="commercial-services__item">
                    <span className="commercial-services__icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="commercial-services__name">{svc.name}</div>
                      <div className="commercial-services__desc">{svc.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="commercial-benefits">
              <h3 className="commercial-benefits__title">Why Home Shine for business</h3>
              <ul className="commercial-benefits__list">
                {commercialBenefits.map((benefit) => (
                  <li key={benefit} className="commercial-benefits__item">
                    <CheckCircle size={16} aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="commercial-quote">
            <h2 className="commercial-quote__title">Get a custom quote</h2>
            <p className="commercial-quote__sub">
              Our business team will call you within 24 hours.
            </p>

            {submitted ? (
              <div className="commercial-quote__success">
                <div className="commercial-quote__success-icon" aria-hidden="true">
                  <CircleCheck size={32} />
                </div>
                <h3 className="commercial-quote__success-title">Thanks, {form.name}!</h3>
                <p className="commercial-quote__success-text">
                  Our business team will call you within 24 hours with a custom quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="commercial-quote__form" noValidate>
                <div className="commercial-quote__row">
                  <TextField
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={(v) => setField('name', v)}
                    error={errors.name}
                    placeholder="Rahul Sharma"
                    required
                  />
                  <TextField
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={(v) => setField('company', v)}
                    placeholder="Acme Pvt. Ltd."
                  />
                </div>

                <div className="commercial-quote__row">
                  <TextField
                    label="Phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(v) => setField('phone', v)}
                    error={errors.phone}
                    placeholder="9876543210"
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField('email', v)}
                    error={errors.email}
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <TextField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={(v) => setField('city', v)}
                  placeholder="Mumbai, Pune, Hyderabad…"
                />

                <SelectField
                  label="Property type"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={(v) => setField('propertyType', v)}
                  error={errors.propertyType}
                  options={PROPERTY_TYPES}
                  required
                />

                <div className="commercial-quote__row">
                  <TextField
                    label="Approx. area (sq ft)"
                    name="area"
                    type="number"
                    inputMode="numeric"
                    value={form.area}
                    onChange={(v) => setField('area', v)}
                    placeholder="2000"
                  />
                  <SelectField
                    label="Frequency"
                    name="frequency"
                    value={form.frequency}
                    onChange={(v) => setField('frequency', v)}
                    options={FREQUENCIES}
                  />
                </div>

                <TextField
                  label="Preferred timing"
                  name="timing"
                  value={form.timing}
                  onChange={(v) => setField('timing', v)}
                  placeholder="E.g. weekday evenings after 7 PM"
                />

                <TextAreaField
                  label="Additional notes"
                  name="message"
                  value={form.message}
                  onChange={(v) => setField('message', v)}
                  rows={3}
                  placeholder="Anything specific we should know…"
                />

                <button type="submit" className="btn btn-lg btn-block btn-commercial">
                  Request a quote →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container home-sections">
        <TrustBar />
        <FAQSection faqs={commercialFaqs} title="Commercial FAQs" />
      </div>
    </div>
  );
}
