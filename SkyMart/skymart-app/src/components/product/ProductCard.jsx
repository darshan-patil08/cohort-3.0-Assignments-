import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, calcDiscount } from '../../utils/helpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount ? calcDiscount(product.originalPrice, product.price) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-surface-light-3 dark:bg-surface-dark-3 p-4 flex items-center justify-center">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full rounded transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="accent">Save {discount}%</Badge>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="warning">Low Stock</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="danger">Out of Stock</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-indigo-accent mb-2 uppercase tracking-wider">
          {product.category}
        </div>
        
        <h3 className="font-display font-bold text-lg leading-tight mb-2 group-hover:text-indigo-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4 mt-auto">
          <Star className="w-4 h-4 fill-warning text-warning" />
          <span className="font-semibold text-sm">{product.rating}</span>
          <span className="text-text-light-muted dark:text-text-muted text-sm">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-mono font-bold text-lg">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="font-mono text-sm text-text-light-muted dark:text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full h-10 w-10 shrink-0"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
