import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const tabs = [
  { to: '/',                     Icon: Home,         label: 'Home',     match: p => p === '/' },
  { to: '/services/sofa-carpet', Icon: LayoutGrid,   label: 'Services', match: p => p.startsWith('/services') },
  { to: '/cart',                 Icon: ShoppingCart, label: 'Cart',     match: p => p.startsWith('/cart') || p.startsWith('/booking') },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { count } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white md:hidden"
      style={{ borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -2px 16px rgba(7,20,12,0.06)' }}
    >
      <div className="flex items-stretch">
        {tabs.map(({ to, Icon, label, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
              style={{ color: active ? 'var(--accent)' : 'var(--text-muted)', minHeight: 60 }}
            >
              <div className="relative">
                <Icon size={23} strokeWidth={active ? 2.3 : 1.8} />
                {label === 'Cart' && count > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--gold)', fontFamily: 'var(--font-display)' }}
                  >
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>{label}</span>
            </Link>
          );
        })}
        <a
          href="tel:+911234567890"
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
          style={{ color: 'var(--text-muted)', minHeight: 60 }}
        >
          <Phone size={23} strokeWidth={1.8} />
          <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>Call Us</span>
        </a>
      </div>
    </nav>
  );
}
