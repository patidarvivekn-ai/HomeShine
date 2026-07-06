import { Phone } from 'lucide-react';
import { globalContent } from '../data/services';

export default function TrustBar() {
  return (
    <section
      className="rounded-3xl overflow-hidden my-8 relative"
      style={{
        background: 'linear-gradient(135deg, #081812 0%, #0A1F12 55%, #0d2416 100%)',
      }}
    >
      {/* Subtle green glow in corner */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,160,102,0.15) 0%, transparent 70%)',
          transform: 'translate(20%, -20%)',
        }}
      />

      <div className="relative p-5 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1 h-6 rounded-full"
            style={{ background: 'var(--gold)' }}
          />
          <h2
            className="font-extrabold text-base md:text-lg"
            style={{ fontFamily: 'var(--font-display)', color: 'white' }}
          >
            The Home Shine Promise
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {globalContent.promise.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-3 p-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <span
                className="text-2xl leading-none"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
                }}
              >
                {p.icon}
              </span>
              <span
                className="text-xs leading-snug font-medium"
                style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)' }}
              >
                {p.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-5 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}
          >
            All services include free re-clean within 30 days if you're not satisfied.
          </p>
          <a href="tel:+8000384002" className="btn btn-primary shrink-0">
            <Phone size={15} /> Call now
          </a>
        </div>
      </div>
    </section>
  );
}
