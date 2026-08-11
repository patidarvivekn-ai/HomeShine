import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { site } from '../data/site';
import BrandLogo from './BrandLogo';

const LINKS = [
  ['Sofa & Carpet', '/services/sofa-carpet'],
  ['Bathroom & Kitchen', '/services/bathroom-kitchen'],
  ['Full Home', '/services/full-home'],
  ['Commercial', '/services/commercial'],
];

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Home Shine — home">
          <BrandLogo />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {LINKS.map(([label, path]) => {
            const active = pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`site-header__nav-link ${active ? 'is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <a href={`tel:${site.phoneInternational}`} className="btn btn-sm site-header__phone">
            <Phone size={14} /> {site.phoneDisplay}
          </a>
          <a href={`tel:${site.phoneInternational}`} className="site-header__phone-icon" aria-label={`Call ${site.phoneDisplay}`}>
            <Phone size={18} />
          </a>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            aria-label="View cart"
            className="site-header__cart"
          >
            <ShoppingCart size={21} strokeWidth={1.9} />
            {count > 0 && (
              <span className="site-header__cart-badge">{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
