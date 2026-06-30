import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import TrustBar from '../components/TrustBar';
import OrderSummary from '../components/ui/OrderSummary';

export default function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-body container max-w-md mx-auto py-20 text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'var(--accent-light)' }}
        >
          <ShoppingBag size={36} style={{ color: 'var(--accent)' }} />
        </div>
        <h2 className="font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
          Nothing here yet
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Browse our services and add what your home needs.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Browse services <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="page-body container max-w-4xl mx-auto py-6">
      <h1 className="font-extrabold text-2xl mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
        Your cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.cartKey} className="card p-4 fade-in">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
                    {item.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    {item.variant}
                  </p>
                  {item.addons?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.addons.map(a => (
                        <span
                          key={a.label}
                          className="inline-block text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--gold-light)', color: '#7A5612', fontFamily: 'var(--font-display)' }}
                        >
                          + {a.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.cartKey)}
                  className="p-1.5 rounded-lg ml-2 transition-colors"
                  style={{ color: 'var(--border)' }}
                  onMouseEnter={e => e.target.style.color = '#dc2626'}
                  onMouseLeave={e => e.target.style.color = 'var(--border)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.cartKey, item.qty - 1)}
                    className="w-8 h-8 rounded-xl border flex items-center justify-center transition-colors"
                    style={{ border: '1.5px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold w-5 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.cartKey, item.qty + 1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: 'none' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="font-extrabold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  ₹{(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            total={total}
            note="Final price confirmed before work begins. Pay on-site after service."
          >
            <button onClick={() => navigate('/booking')} className="btn btn-primary btn-lg btn-block">
              Book now <ArrowRight size={16} />
            </button>
            <Link to="/" className="block text-center text-sm mt-3 link-accent">
              + Add more services
            </Link>
          </OrderSummary>
        </div>
      </div>

      <div className="mt-6">
        <TrustBar />
      </div>
    </div>
  );
}
