import { Star, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    author: 'Aanya Sharma',
    city: 'Mumbai, Maharashtra',
    product: 'Handmade Terracotta Chai Kulhar Set',
    rating: 5,
    title: 'Transformative morning tea ritual',
    comment:
      'The earthy aroma released when piping hot masala chai touches these unglazed kulhars is something no machine-made mug can replicate. Packaging was completely biodegradable paper. Exceptional craftsmanship.',
  },
  {
    author: 'Vikramaditya Bose',
    city: 'Bengaluru, Karnataka',
    product: 'Pre-Seasoned Cast Iron Skillet (10-Inch)',
    rating: 5,
    title: 'Heirloom quality that will outlive me',
    comment:
      'The heat retention on this heavy cast iron is phenomenal. Made dosas and seared paneer effortlessly right out of the box. You can feel the heft and hand-seasoning immediately.',
  },
  {
    author: 'Meera Nambiar',
    city: 'Kochi, Kerala',
    product: 'Cold-Pressed Rosehip & Squalane Face Elixir',
    rating: 5,
    title: 'Pure botanical bliss',
    comment:
      'I have extremely sensitive skin and usually react to synthetic additives. This elixir absorbs like silk without any grease, and the subtle natural neroli fragrance is heavenly.',
  },
];

const CollectorReviews = () => {
  return (
    <section className="section-spacing" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
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
            Verified Collector Words
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '14px' }}>
            Cherished in Homes Across India
          </h2>
          <p style={{ color: 'var(--color-muted)', margin: 0, fontSize: '1rem' }}>
            Real reviews from customers who chose intentional, small-batch goods for their daily living.
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="panel-card"
              style={{
                padding: '32px 28px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-amber)" color="var(--color-amber)" />
                  ))}
                </div>

                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>"{rev.title}"</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-body)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {rev.comment}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--color-hairline)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.9rem' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--color-muted)' }}>
                    {rev.city}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    color: 'var(--color-success)',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle size={14} />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectorReviews;
