import { site } from '../data/site';

/**
 * Decorative stars + a Google reviews link.
 * Does not publish a numeric score (avoids clashing with live Google ratings).
 */
export default function StarRating({ size = 'sm', dark = false }) {
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs';
  const labelColor = dark ? 'rgba(255,255,255,0.82)' : 'var(--text-muted)';

  return (
    <a
      href={site.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`star-rating-link ${textSize}`}
      onClick={(event) => event.stopPropagation()}
    >
      <span className="star-rating-link__stars" aria-hidden="true">★★★★★</span>
      <span className="star-rating-link__label" style={{ color: labelColor }}>
        Google reviews
      </span>
    </a>
  );
}
