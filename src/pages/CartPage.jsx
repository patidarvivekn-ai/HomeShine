import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/ui/OrderSummary';
import Seo from '../components/Seo';

export default function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-body container">
        <Seo
          title="Your cart"
          description="Review the Home Shine cleaning services in your cart."
          path="/cart"
          noIndex
        />
        <div className="cart-empty">
          <div className="cart-empty__icon" aria-hidden="true">
            <ShoppingBag size={36} />
          </div>
          <h1 className="cart-empty__title">Nothing here yet</h1>
          <p className="cart-empty__text">
            Browse our services and add what your home needs.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Browse services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const handleDecrease = (cartKey, qty) => {
    updateQty(cartKey, qty - 1);
  };

  const handleIncrease = (cartKey, qty) => {
    updateQty(cartKey, qty + 1);
  };

  const handleRemove = (cartKey) => {
    removeItem(cartKey);
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <div className="page-body">
      <Seo
        title="Your cart"
        description="Review the Home Shine cleaning services in your cart."
        path="/cart"
        noIndex
      />
      <div className="container cart-page">
        <h1 className="cart-page__title">Your cart</h1>

        <div className="cart-page__grid">
          <div className="cart-page__items">
            {items.map((item) => (
              <article key={item.cartKey} className="cart-item fade-in">
                <div className="cart-item__head">
                  <div className="cart-item__info">
                    <h2 className="cart-item__name">{item.name}</h2>
                    <p className="cart-item__variant">{item.variant}</p>
                    {item.addons?.length > 0 && (
                      <div className="cart-item__addons">
                        {item.addons.map((addon) => (
                          <span key={addon.label} className="cart-item__addon">
                            + {addon.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.cartKey)}
                    className="cart-item__remove"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className="cart-item__foot">
                  <div className="cart-item__qty">
                    <button
                      type="button"
                      onClick={() => handleDecrease(item.cartKey, item.qty)}
                      className="cart-item__qty-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="cart-item__qty-value" aria-live="polite">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleIncrease(item.cartKey, item.qty)}
                      className="cart-item__qty-btn cart-item__qty-btn--plus"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="cart-item__price">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-page__sidebar">
            <OrderSummary
              items={items}
              total={total}
              note="Final price confirmed before work begins. Pay on-site after service."
            >
              <button
                type="button"
                onClick={handleBookNow}
                className="btn btn-primary btn-lg btn-block"
              >
                Book now <ArrowRight size={16} aria-hidden="true" />
              </button>
              <Link to="/" className="order-summary__link link-accent">
                + Add more services
              </Link>
            </OrderSummary>
          </div>
        </div>
      </div>
    </div>
  );
}
