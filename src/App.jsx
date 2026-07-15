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

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--ground)' }}>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/commercial" element={<CommercialPage />} />
              <Route path="/services/:slug" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking" element={<BookingPage />} />
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
