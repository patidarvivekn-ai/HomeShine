import { Link } from 'react-router-dom';
import { categories } from '../data/services';

/**
 * Mobile-only category switcher. Desktop users use the main navbar links.
 */
export default function CategoryNav({ activeSlug }) {
  return (
    <nav aria-label="Service categories" className="category-nav-wrap">
      <div className="category-nav no-scrollbar">
        {categories.map(cat => {
          const active = cat.slug === activeSlug;
          return (
            <Link
              key={cat.slug}
              to={`/services/${cat.slug}`}
              aria-current={active ? 'page' : undefined}
              className={`cat-pill ${active ? 'is-active' : ''}`}
            >
              <span className="cat-pill__emoji" aria-hidden="true">{cat.emoji}</span>
              <span className="cat-pill__label">{cat.shortName || cat.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
