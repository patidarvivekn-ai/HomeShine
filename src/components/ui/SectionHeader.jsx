/**
 * Consistent section heading: title + divider rule + optional trailing action.
 * Replaces the repeated `h2 + flex-1 rule (+ link)` markup across pages.
 */
export default function SectionHeader({ title, action, className = '' }) {
  return (
    <div className={`section-head ${className}`}>
      <h2>{title}</h2>
      <div className="rule" />
      {action}
    </div>
  );
}
