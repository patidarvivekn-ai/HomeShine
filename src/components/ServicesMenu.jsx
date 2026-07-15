import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { categories, services } from '../data/services';
import { categoryImages, serviceImages } from '../data/images';
import SmartImage from './SmartImage';

const FALLBACKS = {
  'sofa-carpet': 'fabric-sofa',
  'bathroom-kitchen': 'bathroom-kitchen-combo',
  'full-home': 'apartment',
  commercial: 'commercial',
};

export default function ServicesMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className="services-menu__backdrop backdrop-in"
        aria-label="Close services menu"
        onClick={onClose}
      />
      <section
        className="services-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="services-menu-title"
      >
        <div className="services-menu__handle" aria-hidden="true" />
        <header className="services-menu__header">
          <div>
            <p className="services-menu__eyebrow">Quick access</p>
            <h2 id="services-menu-title">All cleaning services</h2>
          </div>
          <button
            type="button"
            className="services-menu__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </header>

        <div className="services-menu__scroll">
          <div className="services-menu__grid">
            {categories.map((category) => {
              const categoryServices = services[category.slug] || [];

              return (
              <section key={category.slug} className="services-menu__group">
                <Link
                  to={`/services/${category.slug}`}
                  className="services-menu__group-head"
                  onClick={onClose}
                >
                  <span>
                    <strong>{category.shortName || category.name}</strong>
                    <small>{category.tabs.length} choices</small>
                  </span>
                  <span className="services-menu__view-all">View all</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <div className="services-menu__tiles">
                  {category.tabs.map((tab) => {
                    const representative = categoryServices.find((item) => item.tab === tab);

                    return (
                      <Link
                        key={tab}
                        to={`/services/${category.slug}?tab=${encodeURIComponent(tab)}`}
                        className="services-menu__tile"
                        onClick={onClose}
                      >
                        <SmartImage
                          src={representative
                            ? serviceImages[representative.id]
                            : categoryImages[category.slug]}
                          alt=""
                          fallbackId={representative?.id || FALLBACKS[category.slug]}
                          photoKey={representative?.id || category.slug}
                          variant="card"
                          sizes="96px"
                          className="services-menu__tile-image"
                        />
                        <span>{tab}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
              );
            })}
          </div>
        </div>
      </section>
    </>,
    document.body,
  );
}

