import { useParams, Link, useSearchParams } from 'react-router-dom';
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
import Seo from '../components/Seo';
import { PackageOpen } from 'lucide-react';

const CAT_FALLBACK = {
  'sofa-carpet': 'fabric-sofa',
  'bathroom-kitchen': 'bathroom-kitchen-combo',
  'full-home': 'apartment',
  'commercial': 'commercial',
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categories.find(c => c.slug === slug);
  const categoryServices = services[slug] || [];
  const tabs = [...new Set(categoryServices.map(s => s.tab))];
  const [activeTab, setActiveTab] = useState('');

  // When switching categories the component instance is reused, so `activeTab`
  // can hold a tab from the previous category. Fall back to the first valid tab.
  const requestedTab = searchParams.get('tab');
  const currentTab = tabs.includes(requestedTab)
    ? requestedTab
    : (tabs.includes(activeTab) ? activeTab : (tabs[0] || ''));

  if (!category) {
    return (
      <div className="page-body container py-20 text-center">
        <Seo
          title="Category not found"
          description="The requested Home Shine service category could not be found."
          path={`/services/${slug}`}
          noIndex
        />
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Category not found.</p>
        <Link to="/" className="btn btn-primary mt-5">← Back to home</Link>
      </div>
    );
  }

  const filteredServices = categoryServices.filter(s => s.tab === currentTab);

  return (
    <div className="page-body">
      <Seo
        title={`${category.name} in Ahmedabad`}
        description={category.intro || `Professional ${category.name.toLowerCase()} services in Ahmedabad from Home Shine.`}
        path={`/services/${slug}`}
      />
      {/* Category hero — overlay is a sibling so it always covers full banner */}
      <div className="category-hero">
        <SmartImage
          src={categoryImages[slug]}
          alt={category.name}
          fallbackId={CAT_FALLBACK[slug]}
          photoKey={slug}
          variant="banner"
          sizes="100vw"
          eager
          className="category-hero__media"
        />
        <div className="category-hero__overlay" aria-hidden="true" />

        <div className="category-hero__content">
          <div className="container category-hero__inner">
            <Breadcrumb
              tone="light"
              className="category-hero__breadcrumb"
              items={[{ label: 'Home', to: '/' }, { label: category.name }]}
            />

            <h1 className="category-hero__title">{category.name}</h1>
            <StarRating rating={category.rating} reviews={category.reviews} size="lg" dark />

            {category.intro && (
              <p className="category-hero__intro">{category.intro}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container category-page__services">
        {/* ── Category switcher (top-level) ─────────────────── */}
        <CategoryNav activeSlug={slug} />

        {/* ── Sub-tabs (underline style — distinct from pills) ─ */}
        {tabs.length > 1 && (
          <div className="service-tabs" role="tablist" aria-label="Service types">
            <div className="service-tabs__scroller no-scrollbar">
              {tabs.map(tab => {
                const active = currentTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveTab(tab);
                      setSearchParams({ tab }, { replace: true });
                    }}
                    className={`service-tab ${active ? 'is-active' : ''}`}
                  >
                    {tab}
                    <span className="service-tab__indicator" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Service grid ──────────────────────────────────── */}
        {filteredServices.length > 0 ? (
          <div key={currentTab} className="category-services-grid fade-in">
            {filteredServices.map(service => (
              <ServiceCard key={`${currentTab}-${service.id}`} service={service} />
            ))}
          </div>
        ) : (
          <div className="category-empty-state">
            <div className="category-empty-state__icon">
              <PackageOpen size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <p className="category-empty-state__title">No services here yet</p>
            <p className="category-empty-state__text">Please check another category.</p>
          </div>
        )}
      </div>

      <div className="container home-sections">
        <TrustBar />
        <FAQSection faqs={globalContent.faqs} title="Common Questions" />
      </div>
    </div>
  );
}
