import { useState } from 'react';
import { getIllustration } from './illustrations/ServiceIllustrations';

/**
 * Reliable image with graceful degradation:
 *  - shows a shimmer skeleton until the photo loads
 *  - on load error, falls back to the matching SVG illustration (by `fallbackId`)
 *    or a branded gradient block when no illustration exists.
 */
export default function SmartImage({
  src,
  alt = '',
  fallbackId,
  gradient = 'linear-gradient(135deg, var(--accent-light), #CDEEDD)',
  className = '',
  imgClassName = 'w-full h-full object-cover',
  eager = false,
  style,
  children,
}) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const Illustration = status === 'error' && fallbackId ? getIllustration(fallbackId) : null;

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
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={imgClassName}
          style={{
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity .4s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {children}
    </div>
  );
}
