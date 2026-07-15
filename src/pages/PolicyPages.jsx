import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { site } from '../data/site';

const EFFECTIVE_DATE = '15 July 2026';

function PolicyPage({ title, description, path, children }) {
  return (
    <div className="page-body">
      <Seo title={title} description={description} path={path} />
      <main className="container policy-page">
        <Link to="/" className="policy-page__back">← Back to home</Link>
        <header className="policy-page__header">
          <h1>{title}</h1>
          <p>Effective {EFFECTIVE_DATE}</p>
        </header>
        <div className="policy-page__content">{children}</div>
      </main>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="How Home Shine handles information submitted through its website and WhatsApp booking flow."
      path="/privacy"
    >
      <section>
        <h2>Information you provide</h2>
        <p>
          When you request a service or commercial quote, you may provide your name, phone
          number, address, email, preferred schedule and service requirements.
        </p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>
          We use this information to respond to enquiries, arrange services, provide estimates
          and contact you about your booking. This website prepares your details for WhatsApp;
          you choose whether to send that message.
        </p>
      </section>
      <section>
        <h2>Storage and payments</h2>
        <p>
          The current website does not create customer accounts or collect online payment-card
          details. Cart and booking form information is held in your browser session and may be
          lost when the page is refreshed.
        </p>
      </section>
      <section>
        <h2>External services</h2>
        <p>
          WhatsApp, Google Maps, Google Fonts and image providers may process information under
          their own privacy policies when you use their services or load their content.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions or requests, call or WhatsApp{' '}
          <a href={`tel:${site.phoneInternational}`}>{site.phoneDisplay}</a>.
        </p>
      </section>
    </PolicyPage>
  );
}

export function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service"
      description="Terms for booking Home Shine home and commercial cleaning services."
      path="/terms"
    >
      <section>
        <h2>Bookings</h2>
        <p>
          A website or WhatsApp request is not final until Home Shine confirms the service,
          schedule, address and price with you. Please provide accurate contact and property
          information.
        </p>
      </section>
      <section>
        <h2>Pricing and payment</h2>
        <p>
          Displayed prices are starting prices unless stated otherwise. The final scope and price
          will be confirmed before work begins. Payment is collected after the service using an
          agreed payment method.
        </p>
      </section>
      <section>
        <h2>Customer responsibilities</h2>
        <p>
          Please provide safe access to the property, disclose fragile or high-value items and
          inform us of hazards, restricted areas or special material-care requirements before
          cleaning starts.
        </p>
      </section>
      <section>
        <h2>Service concerns</h2>
        <p>
          If you are not satisfied, contact us promptly with details and photographs where
          relevant. Eligibility for a re-clean or other resolution depends on the confirmed
          service scope and inspection of the concern.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be raised by calling or WhatsApping{' '}
          <a href={`tel:${site.phoneInternational}`}>{site.phoneDisplay}</a>.
        </p>
      </section>
    </PolicyPage>
  );
}

export function CancellationPolicy() {
  return (
    <PolicyPage
      title="Cancellation & Rescheduling"
      description="How to cancel or reschedule a Home Shine cleaning appointment."
      path="/cancellation"
    >
      <section>
        <h2>Changing your appointment</h2>
        <p>
          Contact us as early as possible if you need to cancel or reschedule. We will offer the
          next available slot based on team and service availability.
        </p>
      </section>
      <section>
        <h2>Late changes and access</h2>
        <p>
          If our team has already travelled to the property, or cannot enter at the agreed time,
          a visit charge may apply. Any applicable charge will be explained before a replacement
          booking is confirmed.
        </p>
      </section>
      <section>
        <h2>Changes by Home Shine</h2>
        <p>
          If we must change an appointment because of safety, staffing, weather or another
          unexpected issue, we will contact you and arrange another suitable slot.
        </p>
      </section>
      <section>
        <h2>Request a change</h2>
        <p>
          Call or WhatsApp <a href={`tel:${site.phoneInternational}`}>{site.phoneDisplay}</a> and
          share your booking reference, name and scheduled date.
        </p>
      </section>
    </PolicyPage>
  );
}

