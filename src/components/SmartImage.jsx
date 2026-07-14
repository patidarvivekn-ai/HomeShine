import { useState } from 'react';
import { getIllustration } from './illustrations/ServiceIllustrations';
import { photoIds, cardSrcSet, bannerSrcSet } from '../data/images';

/**
 * Reliable image with graceful degradation:
 *  - shimmer while loading
 *  - responsive srcSet when a photo key is provided
 *  - soft fade-in + optional hover zoom (via CSS on .img-wrap--zoom)
 *  - SVG illustration / branded gradient fallback on error
 */
export default function SmartImage({
  src,
  alt = '',
  fallbackId,
  /** When set, builds a responsive srcSet from the curated photo catalog. */
  photoKey,
  /** 'card' | 'banner' — crop ratios for srcSet. */
  variant = 'card',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  gradient = 'linear-gradient(135deg, var(--accent-light), #CDEEDD)',
  className = '',
  imgClassName = 'smart-img',
  eager = false,
  style,
  children,
}) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const Illustration = status === 'error' && fallbackId ? getIllustration(fallbackId) : null;

  const id = photoKey && photoIds[photoKey];
  const srcSet = id
    ? (variant === 'banner' ? bannerSrcSet(id) : cardSrcSet(id))
    : undefined;

  return (
    <div className={`img-wrap ${className}`} style={style}>
      {status !== 'loaded' && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      {status === 'error' ? (
        Illustration ? (
          <div className="absolute inset-0"><Illustration /></div>
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={imgClassName}
          data-loaded={status === 'loaded' ? 'true' : 'false'}
        />
      )}

      {children}
    </div>
  );
}
