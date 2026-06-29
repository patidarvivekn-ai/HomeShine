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

  function handleQuickAdd(e) {
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
  }

  return (
    <>
      <article className="service-card card flex flex-col overflow-hidden">
        {/* Photo */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="relative block w-full text-left"
          style={{ height: 176 }}
          aria-label={`View details for ${service.name}`}
        >
          <SmartImage src={photo} alt={service.name} fallbackId={service.id} className="w-full h-full">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(7,20,12,0.72) 0%, rgba(7,20,12,0.08) 55%, transparent 100%)' }}
            />
            <div className="absolute bottom-3 left-3.5 pointer-events-none">
              <span
                className="font-extrabold text-white text-lg leading-none"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
              >
                ₹{service.priceOptions[0].price.toLocaleString()}
              </span>
              {service.unit && <span className="text-white/75 text-xs ml-1">{service.unit}</span>}
            </div>
            <div
              className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)' }}
            >
              <Clock size={10} /> {service.duration}
            </div>
          </SmartImage>
        </button>

        {/* Info */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <button type="button" onClick={() => setDrawerOpen(true)} className="text-left">
            <h3 className="font-bold text-sm leading-snug mb-1.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
              {service.name}
            </h3>
            <StarRating rating={service.rating} reviews={service.reviews} />
          </button>

          <ul className="space-y-1.5 flex-1">
            {service.cardBullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <Check size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                {b}
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-1">
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
