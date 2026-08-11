import { useState } from 'react';
import { Plus, Clock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import ServiceDetailDrawer from './ServiceDetailDrawer';
import SmartImage from './SmartImage';
import QtyStepper from './ui/QtyStepper';
import { serviceImages } from '../data/images';

function singleOptionCartKey(service) {
  return `${service.id}-${service.priceOptions[0].label}`;
}

export default function ServiceCard({ service }) {
  const { addItem, updateQty, qtyFor, qtyForService } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState('details');

  const photo = serviceImages[service.id] || serviceImages['fabric-sofa'];
  const pricedOptions = service.priceOptions.filter((option) => option.price > 0);
  const displayPrice = pricedOptions.length
    ? Math.min(...pricedOptions.map((option) => option.price))
    : 0;
  const hasMultipleOptions = service.priceOptions.length > 1;
  const cartKey = !hasMultipleOptions ? singleOptionCartKey(service) : '';
  const qty = hasMultipleOptions ? qtyForService(service.id) : qtyFor(cartKey);

  const openDrawer = (section = 'details') => {
    setDrawerSection(section);
    setDrawerOpen(true);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (hasMultipleOptions) {
      openDrawer('options');
      return;
    }

    addItem({
      cartKey,
      serviceId: service.id,
      name: service.name,
      variant: service.priceOptions[0].label,
      price: service.priceOptions[0].price,
    });
  };

  return (
    <>
      <article className={`service-card card ${qty > 0 ? 'is-in-cart' : ''}`}>
        <button
          type="button"
          onClick={() => openDrawer('options')}
          className="service-card__media-btn"
          aria-label={`Choose an option for ${service.name}`}
        >
          <SmartImage
            src={photo}
            alt={service.name}
            fallbackId={service.id}
            photoKey={service.id}
            variant="card"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="w-full h-full img-wrap--zoom"
          >
            <div className="service-card__overlay" />
            <div className="service-card__price-row">
              <span className="service-card__price">
                {displayPrice > 0 ? `₹${displayPrice.toLocaleString()}` : 'Quote'}
              </span>
              {service.unit && <span className="service-card__unit">{service.unit}</span>}
            </div>
            <div className="service-card__duration">
              <Clock size={11} aria-hidden="true" /> {service.duration}
            </div>
            {qty > 0 && (
              <span className="service-card__cart-qty">{qty} in cart</span>
            )}
            {hasMultipleOptions && qty === 0 && (
              <span className="service-card__option-count">
                {service.priceOptions.length} options
              </span>
            )}
          </SmartImage>
        </button>

        <div className="service-card__body">
          <button
            type="button"
            onClick={() => openDrawer('details')}
            className="service-card__header-btn"
          >
            <h3 className="service-card__title">{service.name}</h3>
            <StarRating rating={service.rating} reviews={service.reviews} />
          </button>

          <ul className="service-card__bullets">
            {service.cardBullets.slice(0, 2).map((bullet) => (
              <li key={bullet} className="service-card__bullet">
                <Check size={14} aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="service-card__actions">
            <button type="button" onClick={() => openDrawer('details')} className="btn btn-secondary btn-sm flex-1">
              Details
            </button>
            {!hasMultipleOptions && qty > 0 ? (
              <QtyStepper
                qty={qty}
                size="sm"
                label={service.name}
                onDecrease={() => updateQty(cartKey, qty - 1)}
                onIncrease={handleQuickAdd}
              />
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`btn btn-sm flex-1 ${qty > 0 ? 'btn-secondary' : 'btn-primary'}`}
              >
                {qty > 0
                  ? <><Check size={15} /> {qty} in cart</>
                  : <><Plus size={15} /> {hasMultipleOptions ? 'Select' : 'Add'}</>}
              </button>
            )}
          </div>
        </div>
      </article>

      <ServiceDetailDrawer
        service={service}
        open={drawerOpen}
        initialSection={drawerSection}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
