import { CheckCircle2, PackageCheck, Truck, ArrowRight, X } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div
      className="modal-overlay"
      style={{ zIndex: 1400 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        style={{ maxWidth: '540px', padding: 0, zIndex: 1401 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div
          style={{
            backgroundColor: 'var(--color-hero)',
            color: '#FFFFFF',
            padding: '36px 32px 28px 32px',
            textAlign: 'center',
            position: 'relative',
            borderTopLeftRadius: 'var(--radius-md)',
            borderTopRightRadius: 'var(--radius-md)',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Close confirmation"
          >
            <X size={20} />
          </button>

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-amber)',
              color: '#1a150e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <CheckCircle2 size={36} color="#024F46" />
          </div>

          <h3 style={{ color: '#FFFFFF', fontSize: '1.75rem', marginBottom: '6px' }}>
            Order Placed Successfully!
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
            {orderDetails.customerName
              ? `Thank you, ${orderDetails.customerName}, for supporting independent Indian craft studios.`
              : 'Thank you for supporting independent Indian craft studios.'}
          </p>
        </div>

        {/* Order Details Body */}
        <div style={{ padding: '28px 32px' }}>
          {/* Order Metadata Box */}
          <div
            style={{
              backgroundColor: 'var(--color-paper)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              fontSize: '0.875rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-muted)', display: 'block' }}>Order Reference</span>
              <strong style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-mono)' }}>
                {orderDetails.orderId}
              </strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--color-muted)', display: 'block' }}>Amount Paid</span>
              <strong style={{ color: 'var(--color-heading)', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>
                ₹{orderDetails.totalAmount.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {orderDetails.customerEmail && (
            <div
              style={{
                backgroundColor: 'rgba(2, 79, 70, 0.05)',
                border: '1px solid rgba(2, 79, 70, 0.15)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px',
                fontSize: '0.825rem',
                color: 'var(--color-hero)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Order confirmation sent to:</span>
              <strong>{orderDetails.customerEmail}</strong>
            </div>
          )}

          {/* Purchased Items List */}
          <h4 style={{ fontSize: '0.95rem', marginBottom: '14px', color: 'var(--color-heading)' }}>
            Handcrafted Items ({orderDetails.items.length})
          </h4>
          <div
            style={{
              maxHeight: '180px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
              paddingRight: '6px',
            }}
          >
            {orderDetails.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--color-hairline)',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    backgroundColor: 'var(--color-paper)',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--color-heading)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    Qty: {item.quantity} × ₹{Number(item.price).toLocaleString('en-IN')}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--color-heading)',
                  }}
                >
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Artisan Guarantees */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.85rem',
              color: 'var(--color-body)',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="var(--color-hero)" />
              <span>Complimentary Express Delivery to your address in 3–5 working days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PackageCheck size={16} color="var(--color-hero)" />
              <span>Packed securely with 100% biodegradable zero-plastic cornstarch cushioning</span>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <span>Continue Exploring Catalog</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
