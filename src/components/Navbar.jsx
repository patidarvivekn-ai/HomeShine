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
    <nav
      className="bg-white sticky top-0 z-50"
      style={{ borderBottom: '1px solid var(--border)', boxShadow: '0 1px 14px rgba(7,20,12,0.05)' }}
    >
      <div className="container flex items-center justify-between" style={{ height: 64 }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-bold"
            style={{ background: 'var(--accent)', fontFamily: 'var(--font-display)', boxShadow: 'var(--shadow-accent)' }}
          >
            H
          </div>
          <span className="font-extrabold text-base leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
            Home&nbsp;Shine
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          {LINKS.map(([label, path]) => {
            const active = pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className="px-3 py-2 rounded-lg transition-colors"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  background: active ? 'var(--accent-light)' : 'transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a href="tel:+8000384002" className="hidden md:inline-flex btn btn-sm" style={{ background: 'var(--accent-light)', color: 'var(--accent-press)' }}>
            <Phone size={14} /> 8000384002
          </a>
          <button
            onClick={() => navigate('/cart')}
            aria-label="View cart"
            className="relative w-11 h-11 flex items-center justify-center rounded-xl transition-colors"
            style={{ color: 'var(--text)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <ShoppingCart size={21} strokeWidth={1.9} />
            {count > 0 && (
              <span
                className="absolute top-1 right-1 text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gold)', fontFamily: 'var(--font-display)' }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
