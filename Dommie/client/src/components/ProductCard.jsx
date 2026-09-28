import { Edit3, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article
      className="panel-card panel-card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* 1. Product Image & Badges Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '75%', // 4:3 aspect ratio
          backgroundColor: '#F0ECE8',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onView(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 300ms ease',
          }}
          onError={(e) => {
            e.target.onerror = null;
            const categoryFallbacks = {
              Ceramics: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
              Textiles: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
              Apothecary: 'https://images.unsplash.com/photo-1608248597359-586144e05445?auto=format&fit=crop&w=800&q=80',
              Kitchenware: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
              Lighting: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
              Stationery: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
            };
            e.target.src = categoryFallbacks[product.category] || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Top-Left Category Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 2,
          }}
        >
          <span className="badge badge-amber" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {product.category}
          </span>
        </div>

        {/* Curator Edit/Delete Action Floating Pill (when authenticated) */}
        {isAuthenticated ? (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 3,
              display: 'flex',
              gap: '6px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEdit(product)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--color-hero)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                transition: 'all var(--transition-fast)',
              }}
              title="Edit product"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => onDelete(product)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--color-danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                transition: 'all var(--transition-fast)',
              }}
              title="Delete product"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ) : (
          /* Top-Right Stock Status Badge (when guest) */
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 2,
            }}
          >
            {isOutOfStock ? (
              <span className="badge badge-danger" style={{ fontSize: '0.75rem' }}>Out of Stock</span>
            ) : isLowStock ? (
              <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>Only {product.stock} Left</span>
            ) : (
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>In Stock</span>
            )}
          </div>
        )}
      </div>

      {/* 2. Product Details Content */}
      <div
        style={{
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ flex: 1, marginBottom: '16px' }}>
          <h3
            onClick={() => onView(product)}
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.35,
              marginBottom: '6px',
              cursor: 'pointer',
              color: 'var(--color-heading)',
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-muted)',
              marginBottom: '0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </p>
        </div>

        {/* 3. Bottom Price & Action Section */}
        <div
          style={{
            paddingTop: '14px',
            borderTop: '1px solid var(--color-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {/* Price */}
          <div style={{ minWidth: 0, flexShrink: 1 }}>
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                display: 'block',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Handcrafted Price
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                whiteSpace: 'nowrap',
              }}
            >
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>
          </div>

          {/* Action Buttons: Details + Add to Bag (Never overflows!) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* View Details Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onView(product);
              }}
              className="btn btn-outline btn-sm"
              title="View product details"
              style={{ padding: '8px 10px', borderRadius: '10px' }}
            >
              <Eye size={16} />
            </button>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              disabled={isOutOfStock}
              className="btn btn-primary btn-sm"
              title={isOutOfStock ? 'Sold out' : 'Add to shopping bag'}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <ShoppingBag size={15} />
              <span>{isOutOfStock ? 'Out' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
