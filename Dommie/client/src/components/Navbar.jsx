import  { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import { Plus, LogIn, LogOut, Sparkles, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenAuth, onOpenCreateProduct }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: 'var(--color-hero)',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="app-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Brand Logo with Custom Handcrafted Vessel & Leaf Emblem */}
        <a href="/" style={{ textDecoration: 'none' }}>
          <Logo size="medium" light={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-only"
        >
          <a
            href="#catalog"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.925rem',
              fontWeight: 500,
            }}
          >
            Catalog
          </a>
          <a
            href="#spaces"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.925rem',
              fontWeight: 500,
            }}
          >
            Living Spaces
          </a>
          <a
            href="#craft-standards"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.925rem',
              fontWeight: 500,
            }}
          >
            Craft Standards
          </a>
          <a
            href="#artisans"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.925rem',
              fontWeight: 500,
            }}
          >
            Artisans
          </a>
        </nav>

        {/* Right Action Icons: Shopping Bag + Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Shopping Bag Button with Live Counter Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-md)',
              color: '#FFFFFF',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="View shopping bag"
          >
            <ShoppingBag size={18} />
            <span className="desktop-only" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Bag</span>
            {totalItemsCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-amber)',
                  color: '#1a150e',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '999px',
                  padding: '2px 7px',
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Desktop Auth Controls */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={onOpenCreateProduct}
                  className="btn btn-primary btn-sm"
                  title="Create a new product"
                >
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>

                {/* User Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-amber)',
                      color: '#1a150e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
                      {user?.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {user?.role === 'admin' ? 'Curator' : 'Member'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="btn btn-outline-white btn-sm"
                  title="Sign out"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="btn btn-outline-white btn-sm"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="btn btn-primary btn-sm"
                >
                  <Sparkles size={16} />
                  <span>Join</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-only"
          style={{
            backgroundColor: 'var(--color-hero)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px 24px 28px 24px',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 500 }}
            >
              Catalog Collection
            </a>
            <a
              href="#spaces"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 500 }}
            >
              Living Spaces
            </a>
            <a
              href="#craft-standards"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 500 }}
            >
              Craft Standards
            </a>
            <a
              href="#artisans"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 500 }}
            >
              Master Artisans
            </a>
          </nav>

          {/* Mobile Auth Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {isAuthenticated ? (
              <>
                <div style={{ color: 'var(--color-amber)', fontSize: '0.85rem', marginBottom: '6px' }}>
                  Signed in as <strong>{user?.name}</strong> ({user?.role})
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCreateProduct();
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="btn btn-outline-white"
                  style={{ width: '100%' }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="btn btn-outline-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="btn btn-primary"
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
