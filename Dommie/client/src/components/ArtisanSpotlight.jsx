import { Award, CheckCircle } from 'lucide-react';

const ArtisanSpotlight = () => {
  return (
    <section id="artisans" className="section-spacing" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image Mosaic */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-overlay)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"
                alt="Master artisan shaping clay wheel"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover"
              />
            </div>

            {/* Overlapping Floating Badge */}
            <div
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6"
              style={{
                backgroundColor: 'var(--color-hero)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '18px 24px',
                boxShadow: 'var(--shadow-overlay)',
                maxWidth: '320px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Award size={18} color="var(--color-amber)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-amber)' }}>
                  Certified Heritage Studio
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
                Over 120 independent craft families supported across India with guaranteed fair trade wages.
              </p>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-hero)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Artisan Spotlight · The Hands Behind The Work
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.2, marginBottom: '20px' }}>
              "Clay remembers every breath, every finger pressure, and the warmth of the fire."
            </h2>

            <p style={{ color: 'var(--color-body)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '20px' }}>
              In an age of automated plastics and fast disposables, we partner directly with multigenerational
              potters in Khurja, handloom weavers in Maheshwar, and brass metal-smiths in Moradabad.
            </p>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Each creation spends up to two weeks being shaped, sun-dried, hand-glazed, and wood-fired.
              No two pieces are mathematically identical — the subtle variations in mineral color and rim shape
              are the genuine marks of human presence.
            </p>

            {/* Checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                borderTop: '1px solid var(--color-hairline)',
                paddingTop: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="var(--color-hero)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                  100% Non-Toxic Glazes
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="var(--color-hero)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                  Plastic-Free Shipping
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="var(--color-hero)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                  Direct Artisan Royalties
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="var(--color-hero)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                  Lifetime Repair Pledge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;
