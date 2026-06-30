import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Accessible breadcrumb trail.
 * @param {{label: string, to?: string}[]} items - last item is treated as current page.
 */
export default function Breadcrumb({ items, tone = 'dark', className = '' }) {
  const light = tone === 'light';
  const linkCls = light ? 'transition-colors hover:text-white' : 'transition-colors hover:text-emerald-700';
  const linkStyle = light ? { color: 'rgba(255,255,255,0.6)' } : undefined;
  const currentStyle = light ? { color: 'rgba(255,255,255,0.92)' } : undefined;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-1.5 text-xs font-body ${light ? '' : 'mb-6 c-muted'} ${className}`}
      style={linkStyle}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} style={light ? { color: 'rgba(255,255,255,0.45)' } : undefined} className={light ? '' : 'c-faint'} />}
            {item.to && !isLast ? (
              <Link to={item.to} className={linkCls} style={linkStyle}>{item.label}</Link>
            ) : (
              <span
                className={light ? 'font-semibold' : 'font-semibold c-deep'}
                style={currentStyle}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
