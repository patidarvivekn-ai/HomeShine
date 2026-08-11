import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import FloatingActions from './components/FloatingActions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CommercialPage from './pages/CommercialPage';
import CartPage from './pages/CartPage';
import BookingPage from './pages/BookingPage';
import {
  CancellationPolicy,
  PrivacyPolicy,
  TermsPage,
} from './pages/PolicyPages';
import NotFoundPage from './pages/NotFoundPage';

const QuotationPage = lazy(() => import('./pages/QuotationPage'));

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col site-shell">
          <div className="site-atmosphere" aria-hidden="true" />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/commercial" element={<CommercialPage />} />
              <Route path="/services/:slug" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route
                path="/quotation"
                element={(
                  <Suspense fallback={<div className="page-body container py-16">Loading quotation…</div>}>
                    <QuotationPage />
                  </Suspense>
                )}
              />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cancellation" element={<CancellationPolicy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
          <FloatingActions />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
