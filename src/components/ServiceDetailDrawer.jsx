import { useState, useEffect } from 'react';
import { X, Clock, CheckCircle, XCircle, Plus, Minus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import SmartImage from './SmartImage';
import { serviceImages } from '../data/images';

function FAQ({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between py-3.5 text-left gap-4"
        style={{ background: 'none', border: 'none' }}
      >
        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
          {faq.q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
        />
      </button>
      {open && (
        <p className="pb-3.5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-widest mb-3"
      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.07em' }}
    >
      {children}
    </p>
  );
}

export default function ServiceDetailDrawer({ service, open, onClose }) {
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const photo = service ? (serviceImages[service.id] || serviceImages['fabric-sofa']) : null;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setSelectedOption(0);
      setSelectedAddons([]);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!service) return null;

  const option = service.priceOptions[selectedOption];

  function toggleAddon(label) {
    setSelectedAddons(p => p.includes(label) ? p.filter(a => a !== label) : [...p, label]);
  }

  const totalPrice = () =>
    option.price +
    service.addons
      .filter(a => selectedAddons.includes(a.label) && a.price > 0)
      .reduce((s, a) => s + a.price, 0);

  function handleAddToCart() {
    addItem({
      cartKey: `${service.id}-${option.label}-${selectedAddons.join(',')}`,
      serviceId: service.id,
      name: service.name,
      variant: option.label,
      addons: service.addons.filter(a => selectedAddons.includes(a.label)),
      price: totalPrice(),
    });
    setAddedFeedback(true);
    setTimeout(() => { setAddedFeedback(false); onClose(); }, 900);
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 backdrop-in"
          style={{ background: 'rgba(7,20,12,0.55)', backdropFilter: 'blur(3px)' }}
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`service-drawer fixed z-50 bg-white flex flex-col
          bottom-0 left-0 right-0 rounded-t-3xl
          md:top-0 md:bottom-0 md:left-auto md:right-0 md:w-[440px] md:max-w-[92vw] md:rounded-none md:rounded-l-3xl
          ${open ? 'is-open' : ''}
        `}
        style={{
          maxHeight: '93dvh',
          boxShadow: 'var(--shadow-lg)',
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>

        {/* Hero photo strip */}
        <div className="relative shrink-0" style={{ height: 168 }}>
          <SmartImage src={photo} alt={service.name} fallbackId={service.id} eager className="absolute inset-0 w-full h-full">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(7,20,12,0.78) 0%, rgba(7,20,12,0.1) 55%, transparent 100%)' }}
            />
            <div className="absolute bottom-3 left-4 right-14 pointer-events-none">
              <h2
                className="font-extrabold text-white text-lg leading-snug"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
              >
                {service.name}
              </h2>
            </div>
          </SmartImage>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}
          >
            <X size={17} style={{ color: 'var(--deep)' }} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6 pb-36">
            {/* Rating + duration */}
            <div className="flex items-center justify-between">
              <StarRating rating={service.rating} reviews={service.reviews} size="lg" />
              <span
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                <Clock size={11} /> {option.duration}
              </span>
            </div>

            {/* About */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              {service.about}
            </p>

            {/* Price options */}
            <div>
              <SectionLabel>Choose option</SectionLabel>
              <div className="space-y-2">
                {service.priceOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all"
                    style={{
                      border: `2px solid ${selectedOption === i ? 'var(--accent)' : 'var(--border)'}`,
                      background: selectedOption === i ? 'var(--accent-light)' : 'white',
                    }}
                  >
                    <div>
                      <div className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
                        {opt.label}
                      </div>
                      {opt.note && (
                        <div className="text-xs mt-0.5 font-semibold" style={{ color: 'var(--accent)' }}>{opt.note}</div>
                      )}
                      <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Clock size={10} /> {opt.duration}
                      </div>
                    </div>
                    <span
                      className="font-extrabold text-base shrink-0 ml-3"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: opt.price > 0 ? 'var(--accent)' : 'var(--text-muted)',
                      }}
                    >
                      {opt.price > 0 ? `₹${opt.price.toLocaleString()}` : opt.note || '—'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Included */}
            <div>
              <SectionLabel>What's included</SectionLabel>
              <ul className="space-y-2.5">
                {service.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
                    <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not included */}
            {service.notIncluded?.length > 0 && (
              <div>
                <SectionLabel>Not included</SectionLabel>
                <ul className="space-y-2">
                  {service.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                      <XCircle size={15} className="shrink-0 mt-0.5" style={{ color: '#CBD5C0' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process */}
            {service.process?.length > 0 && (
              <div>
                <SectionLabel>How we do it</SectionLabel>
                <div className="space-y-3">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm pt-0.5" style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {service.addons?.length > 0 && (
              <div>
                <SectionLabel>Optional add-ons</SectionLabel>
                <div className="space-y-2">
                  {service.addons.map((addon, i) => {
                    const active = selectedAddons.includes(addon.label);
                    return (
                      <button
                        key={i}
                        onClick={() => addon.price > 0 && toggleAddon(addon.label)}
                        className="w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all"
                        style={{
                          border: `2px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                          background: active ? 'var(--gold-light)' : '#FAFCFA',
                          cursor: addon.price > 0 ? 'pointer' : 'default',
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{addon.emoji}</span>
                          <span className="text-sm font-medium" style={{ color: 'var(--deep)', fontFamily: 'var(--font-body)' }}>
                            {addon.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {addon.price > 0 ? (
                            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: active ? 'var(--deep)' : 'var(--text-muted)' }}>
                              +₹{addon.price}{addon.unit}
                            </span>
                          ) : (
                            <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{addon.note}</span>
                          )}
                          {addon.price > 0 && (
                            <div
                              className="w-5 h-5 rounded flex items-center justify-center"
                              style={{ background: active ? 'var(--gold)' : 'var(--border)' }}
                            >
                              {active
                                ? <Minus size={11} color="white" />
                                : <Plus size={11} color="white" />
                              }
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Good to know */}
            {service.goodToKnow?.length > 0 && (
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'var(--gold-light)', border: '1px solid rgba(233,173,26,0.25)' }}
              >
                <p className="font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-display)', color: '#86610E' }}>
                  💡 Good to know
                </p>
                <ul className="space-y-1.5">
                  {service.goodToKnow.map((note, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#7A580E' }}>
                      <span className="shrink-0">•</span> {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {service.faqs?.length > 0 && (
              <div>
                <SectionLabel>FAQs</SectionLabel>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="px-4 last:[&>div]:border-b-0">
                      <FAQ faq={faq} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky CTA */}
        <div
          className="shrink-0 px-4 py-4"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'white',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {selectedAddons.length ? `Base + ${selectedAddons.length} add-on(s)` : option.label}
            </span>
            <span
              className="font-extrabold text-2xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
            >
              ₹{totalPrice().toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`btn btn-lg btn-block ${addedFeedback ? 'btn-secondary' : 'btn-primary'}`}
          >
            {addedFeedback ? '✓ Added to cart!' : 'Add to cart'}
          </button>
        </div>
      </div>
    </>
  );
}
