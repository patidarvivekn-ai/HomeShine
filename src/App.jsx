import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CommercialPage from './pages/CommercialPage';
import CartPage from './pages/CartPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--ground)' }}>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/commercial" element={<CommercialPage />} />
              <Route path="/services/:slug" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
