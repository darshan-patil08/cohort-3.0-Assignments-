import { ArrowRight } from 'lucide-react';

const SPACES = [
  {
    title: 'The Morning Tea Ritual',
    subtitle: 'Khurja Stoneware & Raw Honey Pots',
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    itemCount: '20 Handcrafted Pieces',
  },
  {
    title: 'The Culinary Hearth',
    subtitle: 'Cast Iron Cookware & Sheesham Boards',
    category: 'Kitchenware',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    itemCount: '20 Artisan Essentials',
  },
  {
    title: 'The Mindful Workspace',
    subtitle: 'Deckle-Edge Rag Paper & Turned Brass',
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    itemCount: '20 Studio Tools',
  },
  {
    title: 'The Evening Unwind',
    subtitle: 'Wild Cedar Wax & Botanical Elixirs',
    category: 'Apothecary',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    itemCount: '20 Botanical Remedies',
  },
];

const CuratedSpaces = ({ onSelectCategory }) => {
  return (
    <section id="spaces" className="section-spacing" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-hero)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Curated Living Rituals
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '16px' }}>
            Spaces Shaped by Natural Simplicity
          </h2>
          <p style={{ color: 'var(--color-muted)', margin: 0, fontSize: '1.05rem' }}>
            Explore harmonious groupings designed to bring presence, texture, and organic tactile beauty
            into every corner of your daily home.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPACES.map((space, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(space.category)}
              className="panel-card panel-card-hover"
              style={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '90%',
                  overflow: 'hidden',
                  backgroundColor: '#ebe9e9',
                }}
              >
                <img
                  src={space.image}
                  alt={space.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 400ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                  }}
                >
                  <span className="badge badge-amber">{space.itemCount}</span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{space.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '16px', flex: 1 }}>
                  {space.subtitle}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-hero)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedSpaces;
