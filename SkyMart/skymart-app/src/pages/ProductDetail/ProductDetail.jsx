import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Minus, Plus, ShieldCheck, Truck, RefreshCw, Copy, Check } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { formatPrice, calcDiscount } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProductGrid from '../../components/product/ProductGrid';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API. Here we just find from mock data.
    const found = products.find(p => p.id === id);
    setProduct(found);
    setActiveImage(0);
    setQuantity(1);
    setActiveTab('description');
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null; // Or a loading/not found state

  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount ? calcDiscount(product.originalPrice, product.price) : 0;
  
  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container-app py-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-light-muted dark:text-text-muted mb-8">
        <Link to="/" className="hover:text-indigo-accent transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-indigo-accent transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-light-primary dark:text-text-primary font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Col: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface-light-3 dark:bg-surface-dark-3 rounded-lg overflow-hidden border border-border-light dark:border-border-dark flex items-center justify-center p-8">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-md animate-fade-in"
              key={activeImage} // force re-render for animation
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square bg-surface-light-3 dark:bg-surface-dark-3 rounded-lg overflow-hidden border-2 transition-all p-2 ${
                    activeImage === idx ? 'border-indigo-accent' : 'border-transparent hover:border-border-dark'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover rounded-sm" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-semibold text-indigo-accent uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-warning text-warning' : 'fill-surface-dark-3 text-border-dark'}`} 
                />
              ))}
              <span className="font-bold ml-1">{product.rating}</span>
            </div>
            <span className="text-text-light-muted dark:text-text-muted text-sm">
              ({product.reviewCount} reviews)
            </span>
            <div className="w-1 h-1 rounded-full bg-border-dark"></div>
            {product.stock > 0 ? (
              <span className="text-success text-sm font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-danger text-sm font-semibold">Out of Stock</span>
            )}
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="font-mono font-bold text-4xl">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="font-mono text-xl text-text-light-muted dark:text-text-muted line-through mb-1">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="accent" className="mb-1.5 h-6">Save {discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-text-light-muted dark:text-text-muted text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-border-light dark:border-border-dark pt-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center h-12 w-full sm:w-32 border border-border-light dark:border-border-dark rounded-md bg-surface-light-3 dark:bg-surface-dark-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 h-full flex items-center justify-center text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors disabled:opacity-50"
                  disabled={quantity <= 1 || product.stock === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="flex-1 h-full flex items-center justify-center text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors disabled:opacity-50"
                  disabled={quantity >= product.stock || product.stock === 0}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <Button 
                size="lg" 
                className="flex-grow h-12 w-full shadow-accent-glow"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 text-sm p-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
              <Truck className="w-5 h-5 text-indigo-accent shrink-0" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-text-light-muted dark:text-text-muted text-xs">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm p-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
              <RefreshCw className="w-5 h-5 text-indigo-accent shrink-0" />
              <div>
                <p className="font-semibold">30-Day Returns</p>
                <p className="text-text-light-muted dark:text-text-muted text-xs">Money back guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm p-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
              <ShieldCheck className="w-5 h-5 text-indigo-accent shrink-0" />
              <div>
                <p className="font-semibold">Secure Checkout</p>
                <p className="text-text-light-muted dark:text-text-muted text-xs">SSL Encrypted</p>
              </div>
            </div>
            <button 
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 text-sm p-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2 hover:border-indigo-accent transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-text-light-muted dark:text-text-muted" />}
              <span className="font-semibold">{copied ? 'Copied!' : 'Share Product'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-20 border border-border-light dark:border-border-dark rounded-xl bg-surface-light-2 dark:bg-surface-dark-2 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border-light dark:border-border-dark no-scrollbar">
          <button 
            className={`tab-btn whitespace-nowrap flex-1 py-4 ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn whitespace-nowrap flex-1 py-4 ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn whitespace-nowrap flex-1 py-4 ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>
        
        <div className="p-8">
          {activeTab === 'description' && (
            <div className="prose dark:prose-invert max-w-none text-text-light-muted dark:text-text-muted">
              <p className="text-lg leading-relaxed">{product.description}</p>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          )}
          
          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-surface-light-3 dark:bg-surface-dark-3' : ''}>
                      <td className="py-3 px-4 font-semibold w-1/3 border-b border-border-light dark:border-border-dark">{key}</td>
                      <td className="py-3 px-4 text-text-light-muted dark:text-text-muted border-b border-border-light dark:border-border-dark">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Rating breakdown */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-surface-light-3 dark:bg-surface-dark-3 rounded-lg border border-border-light dark:border-border-dark">
                <div className="text-6xl font-display font-bold mb-2">{product.rating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-warning text-warning' : 'fill-surface-dark-4 text-border-dark'}`} />
                  ))}
                </div>
                <p className="text-sm text-text-light-muted dark:text-text-muted">Based on {product.reviewCount} reviews</p>
                
                {/* Simulated bars */}
                <div className="w-full mt-6 space-y-2">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-3 text-xs font-semibold">
                      <span>{star}★</span>
                      <div className="flex-1 h-2 bg-surface-dark-4 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-warning rounded-full" 
                          style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="md:col-span-8 space-y-6">
                {(product.reviews && product.reviews.length > 0) ? (
                  product.reviews.map(review => (
                    <div key={review.id} className="border-b border-border-light dark:border-border-dark pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-accent text-white flex items-center justify-center font-bold">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{review.user}</p>
                            <p className="text-xs text-text-light-muted dark:text-text-muted">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-warning text-warning' : 'fill-surface-dark-4 text-border-dark'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-text-light-muted dark:text-text-muted">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-text-light-muted dark:text-text-muted border border-dashed border-border-light dark:border-border-dark rounded-lg">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-display font-bold text-2xl mb-8">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
      
    </div>
  );
};

export default ProductDetail;
