import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { X, ShoppingBag, Trash2, ArrowRight, Truck, ShieldCheck} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 1999;

const CartDrawer = ({ onOpenAuth, onOrderPlaced }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItemsCount,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Authentication Guard: Disallow guest checkout
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to proceed with checkout. Your bag has been saved!', 'warning');
      setIsCartOpen(false);
      if (onOpenAuth) onOpenAuth('login');
      return;
    }

    // Create order receipt snapshot with authenticated user details
    const orderId = 'OG-' + Math.floor(100000 + Math.random() * 900000);
    const order = {
      orderId,
      items: [...cartItems],
      totalAmount: subtotal,
      date: new Date().toLocaleDateString('en-IN'),
      customerName: user?.name || 'Valued Patron',
      customerEmail: user?.email || '',
    };

    // 1. Immediately close the cart drawer so it slides away and eliminates blur
    setIsCartOpen(false);

    // 2. Clear all items from the cart
    clearCart();

    // 3. Dispatch order details to top-level checkout receipt modal
    if (onOrderPlaced) {
      onOrderPlaced(order);
    }

    addToast(`Order ${orderId} confirmed! Check receipt details.`, 'success');
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(26, 26, 26, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 200ms ease',
        }}
        onClick={() => setIsCartOpen(false)}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--shadow-overlay)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            animation: 'slideLeft 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
            @keyframes slideLeft {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>

          {/* Drawer Header */}
          <div
            style={{
              padding: '24px 28px',
              borderBottom: '1px solid var(--color-hairline)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={20} color="var(--color-hero)" />
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                Your Bag ({totalItemsCount})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="btn-icon"
              style={{ borderRadius: '50%', padding: '6px' }}
              aria-label="Close bag"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div
            style={{
              padding: '16px 28px',
              backgroundColor: 'var(--color-paper)',
              borderBottom: '1px solid var(--color-hairline)',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-heading)' }}>
              <Truck size={16} color="var(--color-hero)" />
              {remainingForFreeShipping === 0 ? (
                <span style={{ fontWeight: 600, color: 'var(--color-hero)' }}>
                  🎉 You have unlocked Free Express Delivery across India!
                </span>
              ) : (
                <span>
                  Add <strong style={{ color: 'var(--color-hero)' }}>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Delivery
                </span>
              )}
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--color-hairline)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: progressPercent === 100 ? 'var(--color-success)' : 'var(--color-hero)',
                  transition: 'width 300ms ease',
                }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
            {cartItems.length === 0 ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: 'var(--color-muted)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--color-paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: 'var(--color-muted)',
                  }}
                >
                  <ShoppingBag size={28} />
                </div>
                <h4 style={{ color: 'var(--color-heading)', marginBottom: '8px' }}>
                  Your shopping bag is empty
                </h4>
                <p style={{ fontSize: '0.9rem', maxWidth: '280px', marginBottom: '24px' }}>
                  Explore our curated catalog of small-batch ceramics, textiles, and apothecary pieces.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="btn btn-teal btn-sm"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid var(--color-hairline)',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        backgroundColor: 'var(--color-paper)',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            margin: 0,
                            lineHeight: 1.3,
                            color: 'var(--color-heading)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-muted)',
                            padding: '2px',
                          }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '2px' }}>
                        {item.category}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '12px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--color-hairline)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            style={{
                              padding: '4px 10px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0 8px' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            style={{
                              padding: '4px 10px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            color: 'var(--color-heading)',
                          }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cartItems.length > 0 && (
            <div
              style={{
                padding: '24px 28px',
                borderTop: '1px solid var(--color-hairline)',
                backgroundColor: 'var(--color-paper)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span style={{ fontSize: '0.95rem', color: 'var(--color-body)' }}>Order Subtotal</span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    color: 'var(--color-heading)',
                  }}
                >
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Account Status / Auth Guidance Notice */}
              {!isAuthenticated ? (
                <div
                  style={{
                    backgroundColor: 'rgba(217, 131, 36, 0.08)',
                    border: '1px solid rgba(217, 131, 36, 0.25)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.825rem',
                    color: '#8A4E08',
                  }}
                >
                  <Lock size={15} style={{ flexShrink: 0 }} />
                  <span>Sign in required to checkout. Your bag will stay saved.</span>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: 'rgba(2, 79, 70, 0.06)',
                    border: '1px solid rgba(2, 79, 70, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.825rem',
                    color: 'var(--color-hero)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} />
                    <span>Delivering to <strong>{user?.name}</strong></span>
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{user?.email}</span>
                </div>
              )}

              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
                Taxes calculated at checkout. Shipped in 100% biodegradable zero-plastic packaging.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                <span>
                  {!isAuthenticated
                    ? `Sign In to Checkout · ₹${subtotal.toLocaleString('en-IN')}`
                    : `Complete Order · ₹${subtotal.toLocaleString('en-IN')}`}
                </span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
