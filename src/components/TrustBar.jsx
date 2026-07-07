import { Phone, BadgeCheck, Leaf, Sparkles, Shield, Calendar } from 'lucide-react';
import { globalContent } from '../data/services';

const PROMISE_ICONS = [BadgeCheck, Leaf, Sparkles, Shield, Calendar];

export default function TrustBar() {
  return (
    <section className="promise" aria-label="The Home Shine Promise">
      <div className="promise__glow" aria-hidden="true" />

      <div className="promise__inner">
        <div className="promise__head">
          <div className="promise__head-mark" aria-hidden="true" />
          <h2 className="promise__title">The Home Shine Promise</h2>
        </div>

        <div className="promise__grid">
          {globalContent.promise.map((p, i) => {
            const Icon = PROMISE_ICONS[i];
            return (
              <div key={p.text} className="promise__card">
                <span className="promise__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="promise__text">{p.text}</span>
              </div>
            );
          })}
        </div>

        <div className="promise__footer">
          <p className="promise__note">
            All services include free re-clean within 30 days if you&apos;re not satisfied.
          </p>
          <a href="tel:+8000384002" className="btn btn-primary shrink-0">
            <Phone size={15} /> Call now
          </a>
        </div>
      </div>
    </section>
  );
}
