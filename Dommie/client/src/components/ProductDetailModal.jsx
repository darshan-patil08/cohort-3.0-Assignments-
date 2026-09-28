import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { X, ShoppingBag, ShieldCheck, Truck, Edit3, Trash2 } from 'lucide-react';

const ProductDetailModal = ({ isOpen, onClose, product, onEdit, onDelete }) => {
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  // eslint-disable-next-line no-unused-vars
  const { addToast } = useToast();

  if (!isOpen || !product) return null;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth: '820px', padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left Column: Image */}
          <div
            style={{
              position: 'relative',
              minHeight: '360px',
              backgroundColor: '#ebe9e9',
            }}
          >
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Right Column: Specs & Actions */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-amber">{product.category}</span>
              {isOutOfStock ? (
                <span className="badge badge-danger">Out of stock</span>
              ) : (
                <span className="badge badge-success">{product.stock} units available</span>
              )}
            </div>

            <h2 style={{ fontSize: '1.75rem', lineHeight: 1.25, marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                marginBottom: '20px',
              }}
            >
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-body)', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Quantity Selector & Add to Bag */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    style={{
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                    }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 12px', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    style={{
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '14px' }}
                >
                  <ShoppingBag size={18} />
                  <span>{isOutOfStock ? 'Sold Out' : 'Acquire Piece'}</span>
                </button>
              </div>
            </div>

            {/* Artisan Assurance List */}
            <div
              style={{
                borderTop: '1px solid var(--color-hairline)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-hero)" />
                <span>Verified sustainable artisan workshop origin</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--color-hero)" />
                <span>Carbon-neutral zero plastic delivery packaging</span>
              </div>
            </div>

            {/* Admin Management Buttons if Authenticated */}
            {isAuthenticated && (
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-hairline)',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <button
                  onClick={() => {
                    onClose();
                    onEdit(product);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <Edit3 size={15} />
                  <span>Edit Item</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onDelete(product);
                  }}
                  className="btn btn-danger-ghost btn-sm"
                  style={{ flex: 1 }}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
