import { Link } from 'react-router-dom';
import { categories, globalContent } from '../data/services';
import { categoryImages, heroCollage } from '../data/images';
import TrustBar from '../components/TrustBar';
import HowItWorks from '../components/HowItWorks';
import FAQSection from '../components/FAQSection';
import StarRating from '../components/StarRating';
import SmartImage from '../components/SmartImage';
import SectionHeader from '../components/ui/SectionHeader';
import Seo from '../components/Seo';
import { officeAddress, site, siteOrigin } from '../data/site';
import { ArrowRight, Star, Shield, Leaf, Clock, Phone, Sparkles } from 'lucide-react';

const PILLS = [
  { icon: <Leaf size={14} />, text: 'Eco-safe products' },
  { icon: <Shield size={14} />, text: 'Verified professionals' },
  { icon: <Shield size={14} />, text: '₹10K damage cover' },
  { icon: <Clock size={14} />, text: 'On-time guaranteed' },
];

// Map each category to a representative illustration id for image fallback.
const CAT_FALLBACK = {
  'sofa-carpet': 'fabric-sofa',
  'bathroom-kitchen': 'bathroom-kitchen-combo',
  'full-home': 'apartment',
  'commercial': 'commercial',
};
const HERO_TILES = [
  {
    fallbackId: 'fabric-sofa',
    photoKey: 'hero-1',
    to: '/services/sofa-carpet',
    label: 'Sofa',
    aria: 'Sofa & Carpet cleaning',
  },
  {
    fallbackId: 'bathroom-kitchen-combo',
    photoKey: 'hero-2',
    to: '/services/bathroom-kitchen?tab=Bathroom%20cleaning',
    label: 'Bathroom',
    aria: 'Bathroom cleaning',
  },
  {
    fallbackId: 'kitchen',
    photoKey: 'hero-3',
    to: '/services/bathroom-kitchen?tab=Kitchen%20cleaning',
    label: 'Kitchen',
    aria: 'Kitchen cleaning',
  },
  {
    fallbackId: 'carpet',
    photoKey: 'hero-4',
    to: '/services/commercial',
    label: 'Office',
    aria: 'Commercial and office cleaning',
  },
];

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.legalName,
  ...(siteOrigin ? { url: siteOrigin } : {}),
  telephone: site.phoneInternational,
  email: site.email,
  image: `${siteOrigin || site.website}/og-share.jpg`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: site.areaServed,
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '07:00',
    closes: '20:00',
  }],
};

export default function Home() {
  return (
    <div className="page-body">
      <Seo
        title="Deep Cleaning Services in Ahmedabad | Home Shine"
        description={`Book verified professionals for sofa, carpet, bathroom, full-home and commercial cleaning in Ahmedabad. Call ${site.phoneDisplay}. Office: ${officeAddress}.`}
        path="/"
        jsonLd={LOCAL_BUSINESS_JSON_LD}
      />
      {/* Hero */}
      <section className="hero">
        <div className="hero__atmosphere" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
          <span className="hero__orb hero__orb--3" />
          <span className="hero__spark hero__spark--1" />
          <span className="hero__spark hero__spark--2" />
          <span className="hero__spark hero__spark--3" />
          <span className="hero__spark hero__spark--4" />
          <span className="hero__grain" />
        </div>

        <div className="container hero__container">
          <div className="hero__layout">
            <div className="hero__content stack stack--lg">
              <div className="hero__badge">
                <Sparkles size={12} />
                Trusted cleaning experts in Ahmedabad
              </div>

              <h1 className="hero__title">
                Your home,<br />
                <span className="hero__script">spotlessly</span> clean.
              </h1>

              <p className="hero__lead">
                Book verified, fully equipped professionals for home and commercial cleaning.
              </p>

              <div className="hero__stats">
                <div className="hero__stat">
                  <div className="hero__stat-value">Local</div>
                  <div className="hero__stat-label">Ahmedabad &amp; GN</div>
                </div>
                <a
                  href={site.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__stat hero__stat--link"
                >
                  <div className="hero__stat-value">
                    <Star size={15} fill="var(--gold)" color="var(--gold)" />
                    Reviews
                  </div>
                  <div className="hero__stat-label">See Google reviews</div>
                </a>
                <div className="hero__stat">
                  <div className="hero__stat-value">30-day</div>
                  <div className="hero__stat-label">Guarantee</div>
                </div>
              </div>

              <div className="hero__actions">
                <Link to="/services/sofa-carpet" className="btn btn-primary btn-lg">
                  Explore services <ArrowRight size={16} />
                </Link>
                <a href={`tel:${site.phoneInternational}`} className="btn btn-dark btn-lg">
                  <Phone size={16} /> {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="hero__collage">
              {HERO_TILES.map((tile, i) => (
                <Link
                  key={tile.photoKey}
                  to={tile.to}
                  className={`hero__collage-link hero__collage-tile hero__collage-tile--${i + 1}`}
                  aria-label={`View ${tile.aria} services`}
                >
                  <SmartImage
                    src={heroCollage[i]}
                    alt=""
                    fallbackId={tile.fallbackId}
                    photoKey={tile.photoKey}
                    variant="card"
                    sizes="(max-width: 767px) 22vw, (max-width: 1023px) 45vw, 220px"
                    eager={i === 0}
                    className="img-wrap--zoom hero__collage-media"
                  >
                    <span className="hero__collage-veil" aria-hidden="true" />
                    <span className="hero__collage-label">
                      {tile.label}
                      <ArrowRight size={12} />
                    </span>
                  </SmartImage>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust pills */}
      <div className="trust-strip">
        <div className="container trust-strip__inner no-scrollbar">
          {PILLS.map((pill) => (
            <div key={pill.text} className="trust-pill">
              {pill.icon}
              {pill.text}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="container services-section">
        <SectionHeader
          title="Our services"
          action={
            <Link to="/services/sofa-carpet" className="section-head__action link-accent">
              View all <ArrowRight size={13} />
            </Link>
          }
        />

        <div className="services-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services/${cat.slug}`}
              className="cat-card lift"
            >
              <SmartImage
                src={categoryImages[cat.slug]}
                alt={cat.name}
                fallbackId={CAT_FALLBACK[cat.slug]}
                photoKey={cat.slug}
                variant="banner"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                className="w-full h-full img-wrap--zoom"
              >
                <div className="cat-card__overlay" />
                <div className="cat-card__body">
                  <h3 className="cat-card__title">{cat.name}</h3>
                  <StarRating rating={cat.rating} reviews={cat.reviews} dark />
                  <span className="cat-card__link">
                    View services <ArrowRight size={12} />
                  </span>
                </div>
              </SmartImage>
            </Link>
          ))}
        </div>
      </section>

      {/* Promise, How it works, FAQ */}
      <div className="container home-sections home-sections--home">
        <TrustBar />
        <HowItWorks />
        <FAQSection faqs={globalContent.faqs} title="Common Questions" />
      </div>
    </div>
  );
}
