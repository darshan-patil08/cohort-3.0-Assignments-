import { Search, ShieldCheck, Feather, Leaf } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Hero = ({ searchQuery, setSearchQuery, onExploreClick }) => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-hero)',
        color: '#FFFFFF',
        paddingTop: '64px',
        paddingBottom: '88px',
        borderBottomLeftRadius: 'var(--radius-hero)',
        borderBottomRightRadius: 'var(--radius-hero)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Editorial Subtitle Pill */}
      

        {/* Main Display Heading */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
          <h1
            style={{
              color: '#FFFFFF',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Handcrafted goods made with patience, care, and organic purpose.
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.82)',
              fontSize: '1.15rem',
              maxWidth: '680px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
            }}
          >
            A curated sanctuary of small-batch ceramics, botanical apothecary remedies, and
            heirloom textiles crafted by certified independent makers.
          </p>

          {/* Integrated Search Control with 2px tonal border */}
          <div
            style={{
              maxWidth: '540px',
              margin: '0 auto 40px auto',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '6px 8px 6px 18px',
                boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Search size={20} color="var(--color-muted)" style={{ flexShrink: 0, marginRight: '10px' }} />
              <input
                type="text"
                placeholder="Search stoneware, linen, candles, cutting boards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.95rem',
                  color: 'var(--color-heading)',
                  backgroundColor: 'transparent',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-muted)',
                    padding: '6px 10px',
                    fontSize: '0.85rem',
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Value Badges Band */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.875rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="var(--color-amber)" />
              <span>100% Verified Artisans</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf size={16} color="var(--color-amber)" />
              <span>Zero Synthetic Chemicals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Feather size={16} color="var(--color-amber)" />
              <span>Sustainable Small Batches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
