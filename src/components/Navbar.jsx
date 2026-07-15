import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Home Shine — home">
          <div className="site-header__logo-mark" aria-hidden="true">H</div>
          <span className="site-header__logo-text">Home&nbsp;Shine</span>
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
          <a href="tel:+918000384002" className="btn btn-sm site-header__phone">
            <Phone size={14} /> 8000384002
          </a>
          <a href="tel:+918000384002" className="site-header__phone-icon" aria-label="Call 8000384002">
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
