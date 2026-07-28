import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import CartItem from '../../components/cart/CartItem';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Cart = () => {
  const { cartItems, totalItems, totalValue, checkout } = useCart();

  const tax = totalValue * 0.08; // 8% fake tax
  const shipping = totalValue > 50 ? 0 : 15;
  const grandTotal = totalValue + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container-app py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-surface-light-3 dark:bg-surface-dark-3 rounded-full flex items-center justify-center mb-6 border border-border-light dark:border-border-dark">
          <ShoppingBag className="w-10 h-10 text-text-light-muted dark:text-text-muted" />
        </div>
        <h1 className="font-display font-bold text-3xl mb-4">Your cart is empty</h1>
        <p className="text-text-light-muted dark:text-text-muted mb-8 max-w-md">
          Looks like you haven't added any items to your cart yet. Discover our latest products and collections.
        </p>
        <Link to="/shop">
          <Button size="lg" className="shadow-accent-glow">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-12">
      <h1 className="font-display font-bold text-4xl mb-2">Shopping Cart</h1>
      <p className="text-text-light-muted dark:text-text-muted mb-10">
        You have {totalItems} items in your cart.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Cart Items List */}
        <div className="flex-grow">
          <div className="surface-card rounded-lg overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-border-light dark:border-border-dark bg-surface-light-3 dark:bg-surface-dark-3 font-semibold text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-border-light dark:divide-border-dark">
              {cartItems.map(item => (
                <div key={item.id} className="p-6">
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="surface-card p-6 sticky top-24">
            <h2 className="font-display font-bold text-2xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-text-light-muted dark:text-text-muted">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light-muted dark:text-text-muted">Estimated Tax (8%)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light-muted dark:text-text-muted">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? <span className="text-success">Free</span> : formatPrice(shipping)}
                </span>
              </div>
            </div>
            
            <div className="border-t border-border-light dark:border-border-dark pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-mono font-bold text-3xl">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full shadow-accent-glow mb-4" onClick={checkout}>
              Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Link to="/shop">
              <Button variant="ghost" className="w-full text-sm">
                Continue Shopping
              </Button>
            </Link>

            <div className="mt-8 p-4 bg-surface-light-3 dark:bg-surface-dark-3 rounded-lg border border-border-light dark:border-border-dark flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Secure Checkout</p>
                <p className="text-xs text-text-light-muted dark:text-text-muted">
                  Your payment information is encrypted and securely processed.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
