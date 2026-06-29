import { globalContent } from '../data/services';

const CONNECTOR = (
  <div
    className="hidden md:flex items-center justify-center"
    style={{ color: 'var(--border)', fontSize: 22 }}
  >
    →
  </div>
);

export default function HowItWorks() {
  const steps = globalContent.howItWorks;

  return (
    <section className="my-10">
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="font-extrabold text-xl whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}
        >
          How it works
        </h2>
        <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      </div>

      {/* Mobile: horizontal scroll  |  Desktop: 4-col with connectors */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar md:grid md:overflow-visible"
        style={{
          gridTemplateColumns: steps.map(() => '1fr').join(' '),
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.step}
            className="shrink-0 md:shrink flex flex-col p-4 rounded-2xl"
            style={{
              background: 'white',
              border: '1.5px solid var(--border)',
              minWidth: 155,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Step number + connector hint */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0"
                style={{
                  background: i === 0 ? 'var(--accent)' : 'var(--accent-light)',
                  color: i === 0 ? 'white' : 'var(--accent)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {step.step}
              </div>
              {i < steps.length - 1 && (
                <span
                  className="hidden md:block text-base"
                  style={{ color: 'var(--border)' }}
                >
                  →
                </span>
              )}
            </div>

            <div
              className="text-xl mb-2"
              style={{ lineHeight: 1 }}
            >
              {step.emoji || ['📱', '📅', '🧹', '⭐'][i]}
            </div>

            <div
              className="font-bold text-sm mb-1.5 leading-snug"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--deep)' }}
            >
              {step.title}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
