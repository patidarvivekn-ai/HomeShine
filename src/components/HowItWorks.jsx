import { globalContent } from '../data/services';
import SectionHeader from './ui/SectionHeader';

const STEP_EMOJIS = ['📱', '📅', '🧹', '⭐'];

export default function HowItWorks() {
  const steps = globalContent.howItWorks;

  return (
    <section className="how-it-works" aria-label="How it works">
      <SectionHeader title="How it works" />

      <div className="how-it-works__grid">
        {steps.map((step, i) => (
          <article key={step.step} className="step-card">
            <div
              className={`step-card__num ${i === 0 ? 'step-card__num--active' : 'step-card__num--default'}`}
            >
              {step.step}
            </div>

            <div className="step-card__icon">
              {step.emoji || STEP_EMOJIS[i]}
            </div>

            <h3 className="step-card__title">{step.title}</h3>
            <p className="step-card__desc">{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
