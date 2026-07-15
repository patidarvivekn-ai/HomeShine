import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, CheckCircle, XCircle, Plus, Minus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import SmartImage from './SmartImage';
import { serviceImages } from '../data/images';

const DrawerFAQ = ({ faq }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="service-drawer__faq">
      <button
        type="button"
        className="service-drawer__faq-trigger"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="service-drawer__faq-question">{faq.q}</span>
        <ChevronDown
          size={16}
          className={`service-drawer__faq-chevron ${open ? 'is-open' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="service-drawer__faq-answer">{faq.a}</p>
      )}
    </div>
  );
};

const DrawerSectionLabel = ({ children }) => (
  <p className="service-drawer__label">{children}</p>
);

const ServiceDrawerPanel = ({ service, initialSection, onClose }) => {
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const scrollRef = useRef(null);
  const optionsRef = useRef(null);

  const photo = serviceImages[service.id] || serviceImages['fabric-sofa'];
  const option = service.priceOptions[selectedOption];
  const optionGroups = [...new Set(service.priceOptions.map((item) => item.group).filter(Boolean))];
  const selectedGroup = option.group || optionGroups[0];
  const visibleOptions = service.priceOptions
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !optionGroups.length || item.group === selectedGroup);

  useEffect(() => {
    if (initialSection !== 'options') {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      if (scrollRef.current && optionsRef.current) {
        scrollRef.current.scrollTop = Math.max(0, optionsRef.current.offsetTop - 16);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [initialSection]);

  const toggleAddon = (label) => {
    setSelectedAddons((prev) => (
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    ));
  };

  const totalPrice = () => (
    option.price
    + service.addons
      .filter((a) => selectedAddons.includes(a.label) && a.price > 0)
      .reduce((sum, a) => sum + a.price, 0)
  );

  const handleAddToCart = () => {
    const variant = option.group ? `${option.group} · ${option.label}` : option.label;
    addItem({
      cartKey: `${service.id}-${variant}-${selectedAddons.join(',')}`,
      serviceId: service.id,
      name: service.name,
      variant,
      addons: service.addons.filter((a) => selectedAddons.includes(a.label)),
      price: totalPrice(),
    });
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="service-drawer is-open"
      role="dialog"
      aria-modal="true"
      aria-label={service.name}
    >
      <div className="service-drawer__handle" aria-hidden="true">
        <div className="service-drawer__handle-bar" />
      </div>

      <div className="service-drawer__hero">
        <SmartImage
          src={photo}
          alt={service.name}
          fallbackId={service.id}
          photoKey={service.id}
          variant="card"
          sizes="(max-width: 768px) 100vw, 440px"
          eager
          className="service-drawer__hero-img"
        >
          <div className="service-drawer__hero-overlay" />
        </SmartImage>
        <button
          type="button"
          onClick={onClose}
          className="service-drawer__close"
          aria-label="Close"
        >
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="service-drawer__scroll">
        <div className="service-drawer__content">
          <div className="service-drawer__head">
            <h2 className="service-drawer__title">{service.name}</h2>
            <div className="service-drawer__meta">
              <StarRating rating={service.rating} reviews={service.reviews} size="lg" />
              <span className="service-drawer__duration">
                <Clock size={11} aria-hidden="true" /> {option.duration}
              </span>
            </div>
          </div>

          <p className="service-drawer__about">{service.about}</p>

          <div ref={optionsRef}>
            {optionGroups.length > 0 && (
              <>
                <DrawerSectionLabel>Apartment type</DrawerSectionLabel>
                <div className="service-drawer__types">
                  {optionGroups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => {
                        const firstOption = service.priceOptions.findIndex((item) => item.group === group);
                        setSelectedOption(firstOption);
                      }}
                      className={`service-drawer__type ${selectedGroup === group ? 'is-selected' : ''}`}
                    >
                      <span className="service-drawer__type-check" aria-hidden="true">
                        {selectedGroup === group ? '✓' : ''}
                      </span>
                      {group}
                    </button>
                  ))}
                </div>
              </>
            )}
            <DrawerSectionLabel>
              {optionGroups.length ? 'Choose home size' : 'Choose option'}
            </DrawerSectionLabel>
            <div className="service-drawer__options">
              {visibleOptions.map(({ item: opt, index }) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={`${opt.group || ''}-${opt.label}`}
                    type="button"
                    onClick={() => setSelectedOption(index)}
                    className={`service-drawer__option ${isSelected ? 'is-selected' : ''}`}
                  >
                    <div>
                      <div className="service-drawer__option-name">{opt.label}</div>
                      {opt.note && (
                        <div className="service-drawer__option-note">{opt.note}</div>
                      )}
                      <div className="service-drawer__option-duration">
                        <Clock size={10} aria-hidden="true" /> {opt.duration}
                      </div>
                    </div>
                    <span
                      className={`service-drawer__option-price ${opt.price > 0 ? '' : 'is-muted'}`}
                    >
                      {opt.price > 0 ? `₹${opt.price.toLocaleString()}` : opt.note || '—'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <DrawerSectionLabel>What&apos;s included</DrawerSectionLabel>
            <ul className="service-drawer__list">
              {service.included.map((item) => (
                <li key={item} className="service-drawer__list-item">
                  <CheckCircle size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {service.notIncluded?.length > 0 && (
            <div>
              <DrawerSectionLabel>Not included</DrawerSectionLabel>
              <ul className="service-drawer__list">
                {service.notIncluded.map((item) => (
                  <li key={item} className="service-drawer__list-item is-muted">
                    <XCircle size={15} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.process?.length > 0 && (
            <div>
              <DrawerSectionLabel>How we do it</DrawerSectionLabel>
              <div className="service-drawer__steps">
                {service.process.map((step, i) => (
                  <div key={step} className="service-drawer__step">
                    <div className="service-drawer__step-num">{i + 1}</div>
                    <span className="service-drawer__step-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.addons?.length > 0 && (
            <div>
              <DrawerSectionLabel>Optional add-ons</DrawerSectionLabel>
              <div className="service-drawer__options">
                {service.addons.map((addon) => {
                  const active = selectedAddons.includes(addon.label);
                  const isClickable = addon.price > 0;

                  return (
                    <button
                      key={addon.label}
                      type="button"
                      onClick={() => isClickable && toggleAddon(addon.label)}
                      className={`service-drawer__addon ${active ? 'is-active' : ''} ${isClickable ? '' : 'is-static'}`}
                    >
                      <div className="service-drawer__addon-left">
                        <span className="service-drawer__addon-emoji">{addon.emoji}</span>
                        <span className="service-drawer__addon-label">{addon.label}</span>
                      </div>
                      <div className="service-drawer__addon-right">
                        {addon.price > 0 ? (
                          <span className="service-drawer__addon-price">
                            +₹{addon.price}{addon.unit}
                          </span>
                        ) : (
                          <span className="service-drawer__addon-note">{addon.note}</span>
                        )}
                        {addon.price > 0 && (
                          <span className="service-drawer__addon-toggle" aria-hidden="true">
                            {active ? <Minus size={11} /> : <Plus size={11} />}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {service.goodToKnow?.length > 0 && (
            <div className="service-drawer__tip">
              <p className="service-drawer__tip-title">Good to know</p>
              <ul className="service-drawer__tip-list">
                {service.goodToKnow.map((note) => (
                  <li key={note} className="service-drawer__tip-item">
                    <span aria-hidden="true">•</span> {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.faqs?.length > 0 && (
            <div>
              <DrawerSectionLabel>FAQs</DrawerSectionLabel>
              <div className="service-drawer__faqs">
                {service.faqs.map((faq) => (
                  <DrawerFAQ key={faq.q} faq={faq} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="service-drawer__footer">
        <div className="service-drawer__footer-summary">
          <span className="service-drawer__footer-label">
            {selectedAddons.length
              ? `Base + ${selectedAddons.length} add-on(s)`
              : [option.group, option.label].filter(Boolean).join(' · ')}
          </span>
          <span className="service-drawer__footer-price">
            ₹{totalPrice().toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn btn-lg btn-block ${addedFeedback ? 'btn-secondary' : 'btn-primary'}`}
        >
          {addedFeedback ? '✓ Added to cart!' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default function ServiceDetailDrawer({ service, open, initialSection = 'details', onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!service || !open) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className="service-drawer-backdrop backdrop-in"
        onClick={onClose}
        aria-label="Close service details"
      />
      <ServiceDrawerPanel
        key={`${service.id}-${initialSection}`}
        service={service}
        initialSection={initialSection}
        onClose={onClose}
      />
    </>,
    document.body,
  );
}
