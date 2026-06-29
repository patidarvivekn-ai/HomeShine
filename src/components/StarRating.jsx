export default function StarRating({ rating, reviews, size = 'sm', dark = false }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs';
  const numColor  = dark ? 'rgba(255,255,255,0.9)' : 'var(--text)';
  const metaColor = dark ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)';

  return (
    <div className={`flex items-center gap-1 ${textSize}`}>
      <span style={{ color: 'var(--gold)', letterSpacing: '-1px' }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(empty)}
      </span>
      <span className="font-bold" style={{ color: numColor, fontFamily: 'var(--font-display)' }}>
        {rating}
      </span>
      <span style={{ color: metaColor }}>({reviews})</span>
    </div>
  );
}
