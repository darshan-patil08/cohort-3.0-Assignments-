import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/helpers';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, totalItems, totalValue, checkout } = useCart();
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Expose toggle via custom event (a bit hacky but works without extra context for now)
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-cart-drawer', handleToggle);
    return () => window.removeEventListener('toggle-cart-drawer', handleToggle);
  }, []);

  if (!isOpen) {
    return (
      <button 
        id="cart-drawer-trigger" 
        className="hidden" 
        onClick={() => setIsOpen(true)}
      />
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface-light dark:bg-surface-dark z-50 flex flex-col shadow-2xl animate-slide-in-right border-l border-border-light dark:border-border-dark">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-indigo-accent" />
            <h2 className="font-display font-bold text-xl">Your Cart</h2>
            <span className="bg-surface-light-3 dark:bg-surface-dark-3 text-text-light-muted dark:text-text-muted px-2 py-0.5 rounded text-sm font-semibold">
              {totalItems} items
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <ShoppingBag className="w-16 h-16 mb-4 text-border-dark" />
              <p className="text-lg font-semibold mb-2">Your cart is empty</p>
              <p className="text-sm text-text-light-muted dark:text-text-muted mb-6">
                Looks like you haven't added anything yet.
              </p>
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-text-light-muted dark:text-text-muted">Subtotal</span>
              <span className="font-mono font-bold text-2xl">{formatPrice(totalValue)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/cart" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Button className="w-full" onClick={() => { checkout(); setIsOpen(false); }}>
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
