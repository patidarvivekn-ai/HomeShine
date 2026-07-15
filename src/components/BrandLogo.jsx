export default function BrandLogo({ tone = 'dark', showTagline = true }) {
  return (
    <span className={`brand-logo brand-logo--${tone}`}>
      <svg
        className="brand-logo__mark"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Home Shine"
      >
        <path
          className="brand-logo__house"
          d="M7 22.5 24 8l17 14.5h-4V41H11V22.5H7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          className="brand-logo__spark"
          d="M24 13c.7 4.7 2.3 6.3 7 7-4.7.7-6.3 2.3-7 7-.7-4.7-2.3-6.3-7-7 4.7-.7 6.3-2.3 7-7Z"
        />
        <path
          className="brand-logo__window"
          d="M18 29h5v5h-5zm7 0h5v5h-5zm-7 7h5v5h-5zm7 0h5v5h-5z"
        />
      </svg>

      <span className="brand-logo__copy">
        <span className="brand-logo__name">
          <span>Home</span> <strong>Shine</strong>
        </span>
        {showTagline && <span className="brand-logo__tagline">Cleaning services</span>}
      </span>
    </span>
  );
}

