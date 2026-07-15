import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <div className="page-body container">
      <Seo
        title="Page not found"
        description="The requested Home Shine page could not be found."
        noIndex
      />
      <div className="cart-empty">
        <div className="cart-empty__icon" aria-hidden="true">
          <Home size={32} />
        </div>
        <h1 className="cart-empty__title">Page not found</h1>
        <p className="cart-empty__text">The page may have moved or the address may be incorrect.</p>
        <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
      </div>
    </div>
  );
}

