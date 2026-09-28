import  { useState } from 'react';
import Logo from './Logo';
import { useToast } from '../context/ToastContext';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Heart, ExternalLink } from 'lucide-react';

const GITHUB_REPO_URL = 'https://github.com/darshan-patil08/cohort-3.0-Assignments-/tree/main/Dommie';

const Footer = ({ onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Welcome to the Guild! Your 10% handcrafted discount code has been sent.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#141414',
        color: '#E0DFDC',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div className="app-container">
        {/* Newsletter Signup Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-hero)',
            borderRadius: '24px',
            padding: '44px 40px',
            marginBottom: '64px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '28px',
            boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-amber)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              The Guild Dispatch
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.75rem', marginBottom: '8px', lineHeight: 1.25 }}>
              Receive 10% off your first handcrafted heirloom piece.
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.78)', margin: 0, fontSize: '0.925rem' }}>
              Stories of master makers, seasonal kiln firings, and private studio collection previews delivered bi-weekly.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              width: '100%',
              maxWidth: '440px',
              alignItems: 'center',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: '1 1 220px',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '14px 22px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span>Subscribe</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* 4 Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '56px',
            clear: 'both',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Logo size="medium" light={true} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#9E9D97', lineHeight: 1.6, marginBottom: '20px' }}>
              Handcrafted living essentials and heirloom artisan homeware. Formulated with earth-first
              materials and traditional multigenerational techniques.
            </p>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>GitHub Repository</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Curated Categories */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '0.04em' }}>
              Curated Collections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
              {['Ceramics', 'Textiles', 'Apothecary', 'Kitchenware', 'Lighting', 'Stationery'].map((cat) => (
                <li key={cat} style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat);
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#B0AEA6',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.target.style.color = '#B0AEA6')}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Experience */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '0.04em' }}>
              Customer Experience
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#B0AEA6' }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#catalog" style={{ color: 'inherit' }}>Order Tracking & Status</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#craft-standards" style={{ color: 'inherit' }}>Ceramic & Iron Care Guides</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#artisans" style={{ color: 'inherit' }}>Workshop Tours & Studio Visits</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#spaces" style={{ color: 'inherit' }}>Corporate & Wedding Gifting</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#catalog" style={{ color: 'inherit' }}>Complimentary Repair Pledge</a>
              </li>
            </ul>
          </div>

          {/* Living Promises & Guarantee */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '0.04em' }}>
              Our Living Promise
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: '#B0AEA6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="var(--color-amber)" />
                <span>Free Express Delivery above ₹1,999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={18} color="var(--color-amber)" />
                <span>7-Day Hassle-Free Transit Exchange</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="var(--color-amber)" />
                <span>100% Verified Indian Artisan Provenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Creator Attribution & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#8A8983',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Created with</span>
            <Heart size={15} fill="var(--color-amber)" color="var(--color-amber)" style={{ display: 'inline' }} />
            <span>by <strong style={{ color: '#FFFFFF' }}>Darshan Patil</strong></span>
            <span>·</span>
            <span>Organic Goods Ltd.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href={"https://github.com/darshan-patil08/cohort-3.0-Assignments-/tree/main/Dommie"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-amber)',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              GitHub Source Code
            </a>
            <span>·</span>
            <span>Pan-India Handcrafted Living</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
