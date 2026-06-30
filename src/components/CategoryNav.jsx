import { Link } from 'react-router-dom';
import { categories } from '../data/services';

/**
 * Horizontal, touch-scrollable strip of all service categories.
 * Lets users jump between categories from any category/commercial page.
 */
export default function CategoryNav({ activeSlug }) {
  return (
    <nav aria-label="Service categories" className="flex gap-2 overflow-x-auto no-scrollbar pt-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      {categories.map(cat => {
        const active = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            to={`/services/${cat.slug}`}
            aria-current={active ? 'page' : undefined}
            className="shrink-0 inline-flex items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all whitespace-nowrap font-display"
            style={{
              minHeight: 42,
              background: active ? 'var(--accent)' : 'var(--surface-2)',
              color: active ? 'white' : 'var(--text-muted)',
              border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            {cat.shortName || cat.name.replace(/ Cleaning$/, '').replace(/ \/ By Room$/, '')}
          </Link>
        );
      })}
    </nav>
  );
}
