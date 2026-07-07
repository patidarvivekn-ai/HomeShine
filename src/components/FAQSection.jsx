import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

export default function FAQSection({ faqs, title = 'Common Questions' }) {
  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="faq-section" aria-label={title}>
      <SectionHeader title={title} />

      <div className="faq">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const triggerId = `faq-trigger-${i}`;

          return (
            <div key={faq.q} className="faq__item">
              <button
                id={triggerId}
                type="button"
                className={`faq__trigger ${isOpen ? 'is-open' : ''}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(i)}
              >
                <span className="faq__question">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`faq__chevron ${isOpen ? 'is-open' : ''}`}
                />
              </button>
              <div
                id={panelId}
                aria-labelledby={triggerId}
                className={`faq__panel ${isOpen ? 'is-open' : ''}`}
              >
                <div className="faq__panel-inner">
                  <div className="faq__answer">{faq.a}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
