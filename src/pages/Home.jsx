import { Link } from 'react-router-dom';
import { categories, globalContent } from '../data/services';
import { categoryImages, heroCollage } from '../data/images';
import TrustBar from '../components/TrustBar';
import HowItWorks from '../components/HowItWorks';
import FAQSection from '../components/FAQSection';
import StarRating from '../components/StarRating';
import SmartImage from '../components/SmartImage';
import { ArrowRight, Star, Shield, Leaf, Clock } from 'lucide-react';

const PILLS = [
  { icon: <Leaf size={13} />,   text: 'Eco-safe products' },
  { icon: <Shield size={13} />, text: 'Verified professionals' },
  { icon: <Shield size={13} />, text: '₹10K damage cover' },
  { icon: <Clock size={13} />,  text: 'On-time guaranteed' },
];

// Map each category to a representative illustration id for image fallback.
const CAT_FALLBACK = {
  'sofa-carpet': 'fabric-sofa',
  'bathroom-kitchen': 'bathroom-kitchen-combo',
  'full-home': 'apartment',
  'commercial': 'commercial',
};
const HERO_FALLBACK = ['fabric-sofa', 'bathroom-kitchen-combo', 'kitchen', 'carpet'];

export default function Home() {
  return (
    <div className="page-body">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(150deg, #061410 0%, #07140C 55%, #0d2616 100%)' }}>
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
            <div className="flex-1 min-w-0">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: 'rgba(233,173,26,0.12)', color: 'var(--gold)', border: '1px solid rgba(233,173,26,0.22)', fontFamily: 'var(--font-display)' }}
              >
                <Star size={11} fill="var(--gold)" strokeWidth={0} />
                Trusted by 10,000+ Indian families
              </div>

              <h1
                style={{
                  color: 'white',
                  fontSize: 'clamp(33px, 5.5vw, 60px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  marginBottom: 16,
                }}
              >
                Your home,<br />
                <span style={{ color: 'var(--gold)' }}>spotlessly</span> clean.
              </h1>

              <p
                style={{ color: 'rgba(255,255,255,0.62)', fontSize: 15.5, lineHeight: 1.7, marginBottom: 28, maxWidth: 460, fontFamily: 'var(--font-body)' }}
              >
                Background-verified professionals arrive at your door with all equipment.
                Sofa, carpet, bathroom, full apartment, commercial — we've got it covered.
              </p>

              <div className="flex items-center gap-7 sm:gap-9 mb-8">
                {[['10K+', 'Happy homes'], ['4.84★', 'Avg. rating'], ['30-day', 'Guarantee']].map(([val, label]) => (
                  <div key={val}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 21, color: 'white', lineHeight: 1.1 }}>{val}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/services/sofa-carpet" className="btn btn-primary btn-lg">
                  Explore services <ArrowRight size={16} />
                </Link>
                <a href="tel:+911234567890" className="btn btn-dark btn-lg">
                  <Phone /> 1234-567-890
                </a>
              </div>
            </div>

            {/* Photo collage — desktop */}
            <div className="hidden lg:grid shrink-0" style={{ gridTemplateColumns: '1fr 1fr', gap: 12, width: 420 }}>
              {heroCollage.map((src, i) => (
                <SmartImage
                  key={i}
                  src={src}
                  fallbackId={HERO_FALLBACK[i]}
                  className="rounded-2xl"
                  style={{ aspectRatio: '4/3' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST PILLS ────────────────────────────────────── */}
      <div className="border-b" style={{ background: 'white', borderColor: 'var(--border)' }}>
        <div className="container">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3.5">
            {PILLS.map((pill, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0 text-xs font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                <span style={{ color: 'var(--accent)' }}>{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ──────────────────────────────────── */}
      <section className="container pt-10 pb-2">
        <div className="section-head">
          <h2>Our services</h2>
          <div className="rule" />
          <Link to="/services/sofa-carpet" className="shrink-0 text-xs font-bold flex items-center gap-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services/${cat.slug}`}
              className="cat-card lift block rounded-2xl overflow-hidden relative"
              style={{ aspectRatio: '3/4', boxShadow: 'var(--shadow-sm)' }}
            >
              <SmartImage
                src={categoryImages[cat.slug]}
                alt={cat.name}
                fallbackId={CAT_FALLBACK[cat.slug]}
                className="w-full h-full"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(7,18,11,0.9) 0%, rgba(7,18,11,0.32) 50%, rgba(7,18,11,0.04) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                  <span className="block text-3xl mb-1.5">{cat.emoji}</span>
                  <h3 className="font-bold text-white leading-snug mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: 14.5 }}>
                    {cat.name}
                  </h3>
                  <StarRating rating={cat.rating} reviews={cat.reviews} dark />
                  <div className="flex items-center gap-1 mt-2 font-bold text-xs" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
                    View services <ArrowRight size={12} />
                  </div>
                </div>
              </SmartImage>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TRUST / HOW IT WORKS / FAQS ────────────────────── */}
      <div className="container">
        <TrustBar />
        <HowItWorks />
        <FAQSection faqs={globalContent.faqs} title="Common Questions" />
      </div>
    </div>
  );
}

function Phone() {
  return <span style={{ fontSize: 15 }}>📞</span>;
}
