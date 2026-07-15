import { Link } from 'react-router-dom';
import {
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  BadgeCheck,
  Leaf,
  Sparkles,
  Shield,
  Calendar,
} from 'lucide-react';
import { globalContent } from '../data/services';
import { officeAddress, site } from '../data/site';

const SERVICE_LINKS = [
  ['Sofa & Carpet', '/services/sofa-carpet'],
  ['Bathroom & Kitchen', '/services/bathroom-kitchen'],
  ['Full Home', '/services/full-home'],
  ['Commercial', '/services/commercial'],
];

const PROMISE_ICONS = [BadgeCheck, Leaf, Sparkles, Shield, Calendar];

const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__cta">
          <div>
            <p className="site-footer__cta-title">Ready for a spotless space?</p>
            <p className="site-footer__cta-sub">
              Book in under 2 minutes — pay after the service.
            </p>
          </div>
          <div className="site-footer__cta-actions">
            <Link to="/services/sofa-carpet" className="btn btn-primary">
              Book now <ArrowRight size={15} />
            </Link>
            <a href={`tel:${site.phoneInternational}`} className="btn btn-dark">
              <Phone size={15} /> Call
            </a>
          </div>
        </div>

        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">
              <div className="site-footer__logo" aria-hidden="true">H</div>
              Home Shine
            </div>
            <p className="site-footer__tagline">
              Professional deep cleaning for homes and businesses. Verified, trained, trusted.
            </p>
          </div>

          <div>
            <h4 className="site-footer__heading">Services</h4>
            <ul className="site-footer__links">
              {SERVICE_LINKS.map(([label, path]) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">Our Promise</h4>
            <ul className="site-footer__links">
              {globalContent.promise.map((p, i) => {
                const Icon = PROMISE_ICONS[i];
                return (
                  <li key={p.text} className="site-footer__promise-item">
                    <Icon size={14} aria-hidden="true" />
                    <span>{p.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">Contact</h4>
            <ul className="site-footer__links">
              <li>
                <a href={`tel:${site.phoneInternational}`} className="site-footer__contact-item">
                  <Phone size={14} /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={OFFICE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__contact-item site-footer__contact-item--address"
                >
                  <MapPin size={14} />
                  <span>{officeAddress}</span>
                </a>
              </li>
              <li className="site-footer__contact-item">
                <Clock size={14} /> {site.hoursDisplay}
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__legal">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <nav className="site-footer__legal-links" aria-label="Legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cancellation">Cancellation</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
