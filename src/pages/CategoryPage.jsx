import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { categories, services, globalContent } from '../data/services';
import { categoryImages } from '../data/images';
import ServiceCard from '../components/ServiceCard';
import TrustBar from '../components/TrustBar';
import FAQSection from '../components/FAQSection';
import StarRating from '../components/StarRating';
import SmartImage from '../components/SmartImage';
import CategoryNav from '../components/CategoryNav';
import Breadcrumb from '../components/ui/Breadcrumb';
import { PackageOpen } from 'lucide-react';

const CAT_FALLBACK = {
  'sofa-carpet': 'fabric-sofa',
  'bathroom-kitchen': 'bathroom-kitchen-combo',
  'full-home': 'apartment',
  'commercial': 'commercial',
};

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const categoryServices = services[slug] || [];
  const tabs = [...new Set(categoryServices.map(s => s.tab))];
  const [activeTab, setActiveTab] = useState(tabs[0] || '');

  // When switching categories the component instance is reused, so `activeTab`
  // can hold a tab from the previous category. Fall back to the first valid tab.
  const currentTab = tabs.includes(activeTab) ? activeTab : (tabs[0] || '');

  if (!category) {
    return (
      <div className="page-body container py-20 text-center">
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Category not found.</p>
        <Link to="/" className="btn btn-primary mt-5">← Back to home</Link>
      </div>
    );
  }

  const filteredServices = categoryServices.filter(s => s.tab === currentTab);

  return (
    <div className="page-body">
      {/* ── Photo Banner Hero ──────────────────────────────── */}
      <div className="relative" style={{ height: 'clamp(220px, 36vw, 340px)' }}>
        <SmartImage
          src={categoryImages[slug]}
          alt={category.name}
          fallbackId={CAT_FALLBACK[slug]}
          eager
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(7,18,11,0.92) 0%, rgba(7,18,11,0.5) 50%, rgba(7,18,11,0.18) 100%)' }}
          />
        </SmartImage>

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container pb-7 md:pb-9">
            <Breadcrumb
              tone="light"
              className="mb-3"
              items={[{ label: 'Home', to: '/' }, { label: category.name }]}
            />

            <div className="flex items-end gap-4">
              <span className="text-5xl leading-none">{category.emoji}</span>
              <div>
                <h1
                  className="font-extrabold leading-tight mb-1.5"
                  style={{ color: 'white', fontSize: 'clamp(23px, 4.2vw, 38px)', letterSpacing: '-0.03em', textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
                >
                  {category.name}
                </h1>
                <StarRating rating={category.rating} reviews={category.reviews} size="lg" dark />
              </div>
            </div>

            {category.intro && (
              <p className="text-sm mt-3 leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
                {category.intro}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* ── Category switcher (top-level) ─────────────────── */}
        <CategoryNav activeSlug={slug} />

        {/* ── Sub-tabs (underline style — distinct from pills) ─ */}
        {tabs.length > 1 && (
          <div
            className="-mx-4 px-4 md:mx-0 md:px-0 mb-5"
            style={{ borderBottom: '1.5px solid var(--border)' }}
            role="tablist"
            aria-label="Service types"
          >
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {tabs.map(tab => {
                const active = currentTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab)}
                    className="shrink-0 px-3 text-sm font-semibold whitespace-nowrap transition-colors relative font-display"
                    style={{ minHeight: 46, color: active ? 'var(--accent)' : 'var(--text-muted)' }}
                  >
                    {tab}
                    <span
                      aria-hidden="true"
                      style={{ position: 'absolute', left: 12, right: 12, bottom: -1.5, height: 3, borderRadius: 3, background: active ? 'var(--accent)' : 'transparent' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Service grid ──────────────────────────────────── */}
        {filteredServices.length > 0 ? (
          <div key={currentTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 mb-8 fade-in">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-light)' }}>
              <PackageOpen size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <p className="font-semibold" style={{ color: 'var(--deep)', fontFamily: 'var(--font-display)' }}>No services here yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Please check another category.</p>
          </div>
        )}

        <TrustBar />
        <FAQSection faqs={globalContent.faqs} title="Common Questions" />
      </div>
    </div>
  );
}
