import { useState } from 'react';
import { Plus, Clock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import ServiceDetailDrawer from './ServiceDetailDrawer';
import SmartImage from './SmartImage';
import { serviceImages } from '../data/images';

export default function ServiceCard({ service }) {
  const { addItem } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const photo = serviceImages[service.id] || serviceImages['fabric-sofa'];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem({
      cartKey: `${service.id}-${service.priceOptions[0].label}`,
      serviceId: service.id,
      name: service.name,
      variant: service.priceOptions[0].label,
      price: service.priceOptions[0].price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <article className="service-card card">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="service-card__media-btn"
          aria-label={`View details for ${service.name}`}
        >
          <SmartImage src={photo} alt={service.name} fallbackId={service.id} className="w-full h-full">
            <div className="service-card__overlay" />
            <div className="service-card__price-row">
              <span className="service-card__price">
                ₹{service.priceOptions[0].price.toLocaleString()}
              </span>
              {service.unit && <span className="service-card__unit">{service.unit}</span>}
            </div>
            <div className="service-card__duration">
              <Clock size={11} aria-hidden="true" /> {service.duration}
            </div>
          </SmartImage>
        </button>

        <div className="service-card__body">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
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
            <button type="button" onClick={() => setDrawerOpen(true)} className="btn btn-secondary btn-sm flex-1">
              Details
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`btn btn-sm flex-1 ${added ? 'btn-secondary' : 'btn-primary'}`}
            >
              {added ? <><Check size={15} /> Added</> : <><Plus size={15} /> Add</>}
            </button>
          </div>
        </div>
      </article>

      <ServiceDetailDrawer service={service} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
