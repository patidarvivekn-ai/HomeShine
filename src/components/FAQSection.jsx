import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs, title = 'Common Questions' }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-bold text-xl whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
          {title}
        </h2>
        <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: open === i ? 'var(--accent-light)' : 'white', border: 'none' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-sm pr-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}>
                {faq.q}
              </span>
              <ChevronDown
                size={17}
                className={`shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                style={{ color: 'var(--accent)' }}
              />
            </button>
            {open === i && (
              <div
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)', background: 'var(--accent-light)', fontFamily: 'var(--font-body)' }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
