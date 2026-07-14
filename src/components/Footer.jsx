import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
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

const SERVICE_LINKS = [
  ['Sofa & Carpet', '/services/sofa-carpet'],
  ['Bathroom & Kitchen', '/services/bathroom-kitchen'],
  ['Full Home', '/services/full-home'],
  ['Commercial', '/services/commercial'],
];

const PROMISE_ICONS = [BadgeCheck, Leaf, Sparkles, Shield, Calendar];

const OFFICE_ADDRESS = 'ASOPALAV RESIDENCY, 107 / 01, Thaltej, Ahmedabad, Gujarat 380059';
const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;

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
            <a href="tel:+8000384002" className="btn btn-dark">
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
                <a href="tel:+8000384002" className="site-footer__contact-item">
                  <Phone size={14} /> 8000384002
                </a>
              </li>
              <li>
                <a href="mailto:homeshine2026@gmail.com" className="site-footer__contact-item">
                  <Mail size={14} /> homeshine2026@gmail.com
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
                  <span>{OFFICE_ADDRESS}</span>
                </a>
              </li>
              <li className="site-footer__contact-item">
                <Clock size={14} /> Mon–Sun, 7 AM – 8 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__legal">
          © {new Date().getFullYear()} Home Shine Deep Cleaning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
