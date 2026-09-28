const Logo = ({ size = 'medium', light = true }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';
  const iconSize = isLarge ? 44 : isSmall ? 32 : 38;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isLarge ? '14px' : isSmall ? '10px' : '12px',
        userSelect: 'none',
        textDecoration: 'none',
      }}
    >
      {/* Attractive Modern Organic Botanical & Artisan Vessel Mark */}
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: isLarge ? '14px' : '12px',
          background: 'linear-gradient(135deg, #F3C999 0%, #ECBA82 60%, #D89855 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(236, 186, 130, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <svg
          width={isLarge ? 26 : isSmall ? 18 : 22}
          height={isLarge ? 26 : isSmall ? 18 : 22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Artisan Ceramic Bowl / Pot Base */}
          <path
            d="M4 11C4 16.5 7.5 19 12 19C16.5 19 20 16.5 20 11H4Z"
            fill="#024F46"
          />
          {/* Elegant Sprouting Leaf (Living Handcrafted Heritage) */}
          <path
            d="M12 11C12 7 14.5 4 18 3C18 6.5 16 9.5 12 11Z"
            fill="#036358"
          />
          <path
            d="M12 11C12 7.5 10 5 7 4.5C7 7.5 9 10 12 11Z"
            fill="#0a3d36"
            opacity="0.85"
          />
          {/* Golden Center Accent Dot */}
          <circle cx="12" cy="11" r="1.5" fill="#F3C999" />
        </svg>
      </div>

      {/* Clean Brand Typography */}
      <div style={{ lineHeight: 1.15 }}>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isLarge ? '1.55rem' : isSmall ? '1.15rem' : '1.35rem',
            letterSpacing: '-0.025em',
            fontWeight: 500,
            color: light ? '#FFFFFF' : 'var(--color-heading)',
          }}
        >
          Organic Goods
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isLarge ? '0.75rem' : isSmall ? '0.65rem' : '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: light ? 'rgba(255, 255, 255, 0.72)' : 'var(--color-muted)',
            marginTop: '2px',
          }}
        >
          Artisan Atelier · India
        </div>
      </div>
    </div>
  );
};

export default Logo;
