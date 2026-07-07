import { Link } from 'react-router-dom';
import { categories } from '../data/services';

/**
 * Mobile-only category switcher. Desktop users use the main navbar links.
 */
export default function CategoryNav({ activeSlug }) {
  return (
    <nav aria-label="Service categories" className="category-nav no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {categories.map(cat => {
        const active = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            to={`/services/${cat.slug}`}
            aria-current={active ? 'page' : undefined}
            className={`cat-pill shrink-0 inline-flex items-center gap-2 whitespace-nowrap ${active ? 'is-active' : ''}`}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            {cat.shortName || cat.name.replace(/ Cleaning$/, '').replace(/ \/ By Room$/, '')}
          </Link>
        );
      })}
    </nav>
  );
}
