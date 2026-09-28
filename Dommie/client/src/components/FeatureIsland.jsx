import { Award, Compass, HeartHandshake } from 'lucide-react';

const FeatureIsland = () => {
  return (
    <section id="craft-standards" style={{ padding: '40px 0' }}>
      <div className="app-container">
        <div
          style={{
            backgroundColor: 'var(--color-island)',
            borderRadius: '40px',
            padding: '64px 48px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-amber)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              The Artisan Manifesto
            </span>
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                marginBottom: '16px',
              }}
            >
              Designed to endure, not to be discarded.
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.05rem', margin: 0 }}>
              Every item in our collection is crafted by hand in verified studios across Europe,
              North America, and Japan using renewable raw clays, unbleached flax, and non-toxic plant pigments.
            </p>
          </div>

          {/* Three Deep-Teal Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: 'var(--color-hero)',
                borderRadius: 'var(--radius-md)',
                padding: '32px 28px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(236, 186, 130, 0.2)',
                  color: 'var(--color-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Compass size={22} />
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '10px' }}>
                Complete Origin Traceability
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.925rem', margin: 0, lineHeight: 1.55 }}>
                We document the harvest region, kiln location, and workshop source for every batch, so you know exactly whose hands shaped your item.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: 'var(--color-hero)',
                borderRadius: 'var(--radius-md)',
                padding: '32px 28px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(236, 186, 130, 0.2)',
                  color: 'var(--color-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <HeartHandshake size={22} />
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '10px' }}>
                Fair Direct Compensation
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.925rem', margin: 0, lineHeight: 1.55 }}>
                Makers set their own retail value. 82% of every sale goes directly to the independent maker, keeping traditional crafts alive.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: 'var(--color-hero)',
                borderRadius: 'var(--radius-md)',
                padding: '32px 28px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(236, 186, 130, 0.2)',
                  color: 'var(--color-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Award size={22} />
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '10px' }}>
                Zero-Plastic Packaging
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.925rem', margin: 0, lineHeight: 1.55 }}>
                Shipped in 100% post-consumer recycled boxes, sealed with natural kraft water-activated gum tape and cornstarch dissolvable fill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureIsland;
