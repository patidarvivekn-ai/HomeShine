import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

const SCROLL_THRESHOLD = 320;
const WHATSAPP_URL = buildWhatsAppUrl('Hi, I need help with Home Shine cleaning services.');

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(globalThis.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions" aria-label="Quick actions">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-actions__btn floating-actions__btn--whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={22} />
      </a>

      <button
        type="button"
        className={`floating-actions__btn floating-actions__btn--top ${showTop ? 'is-visible' : ''}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
