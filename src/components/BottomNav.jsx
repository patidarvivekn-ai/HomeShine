import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ServicesMenu from './ServicesMenu';

const tabs = [
  { to: '/',                     Icon: Home,         label: 'Home',     match: p => p === '/' },
  { Icon: LayoutGrid, label: 'Menu', menu: true, match: p => p.startsWith('/services') },
  { to: '/cart',                 Icon: ShoppingCart, label: 'Cart',     match: p => p.startsWith('/cart') || p.startsWith('/booking') },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bottom-nav md:hidden" aria-label="Mobile navigation">
      <div className="bottom-nav__inner">
        {tabs.map(({ to, Icon, label, menu, match }) => {
          const active = match(pathname);
          const content = (
            <>
              <span className="bottom-nav__icon-wrap">
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
                {label === 'Cart' && count > 0 && (
                  <span className="bottom-nav__badge">{count}</span>
                )}
              </span>
              <span className="bottom-nav__label">{label}</span>
            </>
          );

          if (menu) {
            return (
              <button
                key={label}
                type="button"
                className={`bottom-nav__item ${active || menuOpen ? 'is-active' : ''}`}
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen(true)}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={label}
              to={to}
              className={`bottom-nav__item ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {content}
            </Link>
          );
        })}
        <a href="tel:+918000384002" className="bottom-nav__item">
          <span className="bottom-nav__icon-wrap">
            <Phone size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="bottom-nav__label">Call Us</span>
        </a>
      </div>
      <ServicesMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}
