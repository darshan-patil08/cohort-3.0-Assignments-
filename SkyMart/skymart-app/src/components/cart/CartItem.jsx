import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4">
      {/* Image */}
      <div className="w-24 h-24 shrink-0 bg-surface-light-3 dark:bg-surface-dark-3 rounded p-2 flex items-center justify-center border border-border-light dark:border-border-dark">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="object-cover w-full h-full rounded-sm"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between py-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-semibold leading-tight line-clamp-2">{item.name}</h4>
            <span className="text-xs text-text-light-muted dark:text-text-muted uppercase tracking-wider mt-1 block">
              {item.category}
            </span>
          </div>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-text-light-muted dark:text-text-muted hover:text-danger transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border-light dark:border-border-dark rounded-md">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1.5 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary disabled:opacity-50 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-semibold text-sm">
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="p-1.5 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary disabled:opacity-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Price */}
          <span className="font-mono font-bold">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
