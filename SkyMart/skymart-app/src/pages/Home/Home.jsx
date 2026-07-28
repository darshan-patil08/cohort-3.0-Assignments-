import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { products, categories } from '../../data/products';
import { getRandom } from '../../utils/helpers';
import ProductGrid from '../../components/product/ProductGrid';
import Button from '../../components/ui/Button';

const Home = () => {
  const trendingProducts = getRandom(products.filter(p => p.rating >= 4.5), 4);
  const newArrivals = products.slice(0, 4);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-dark text-white min-h-[85vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/90 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="container-app relative z-20">
          <div className="max-w-2xl animate-slide-up relative -left-4 md:-left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-accent/20 border border-indigo-accent/30 text-indigo-400 font-semibold text-sm mb-6">
              <Star className="w-4 h-4 fill-current" />
              Top Rated E-Commerce
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight">
              Curated goods for the <span className="text-indigo-accent">modern lifestyle.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Discover our collection of premium electronics, minimal clothing, and essential home goods designed to elevate your everyday.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="px-8 shadow-accent-glow">
                  Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/shop?category=Electronics">
                <Button variant="ghost" size="lg" className="border border-border-dark bg-surface-dark-2">
                  View Electronics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="border-b border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
        <div className="container-app py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border-light dark:divide-border-dark">
            <div className="flex flex-col items-center justify-center p-4">
              <Truck className="w-8 h-8 text-indigo-accent mb-3" />
              <h3 className="font-semibold text-lg mb-1">Free Global Delivery</h3>
              <p className="text-text-light-muted dark:text-text-muted text-sm">On all orders over $50</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="w-8 h-8 text-indigo-accent mb-3" />
              <h3 className="font-semibold text-lg mb-1">Secure Checkout</h3>
              <p className="text-text-light-muted dark:text-text-muted text-sm">100% protected payments</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <RefreshCw className="w-8 h-8 text-indigo-accent mb-3" />
              <h3 className="font-semibold text-lg mb-1">30-Day Returns</h3>
              <p className="text-text-light-muted dark:text-text-muted text-sm">No questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container-app pt-24 pb-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">Trending Now</h2>
            <p className="text-text-light-muted dark:text-text-muted">Our most popular items this week.</p>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center text-indigo-accent font-semibold hover:underline">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <ProductGrid products={trendingProducts} />
      </section>

      {/* Categories Grid */}
      <section className="container-app py-12">
        <h2 className="font-display font-bold text-3xl mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, idx) => (
            <Link 
              key={category} 
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="group relative h-48 sm:h-64 rounded-xl overflow-hidden bg-surface-dark"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              {/* Using deterministic images for categories based on index */}
              <img 
                src={products.find(p => p.category === category)?.images[0] || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000'} 
                alt={category}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-white font-display font-bold text-xl sm:text-2xl tracking-wide group-hover:scale-110 transition-transform duration-300">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-app pt-12 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">New Arrivals</h2>
            <p className="text-text-light-muted dark:text-text-muted">The latest additions to our collection.</p>
          </div>
        </div>
        <ProductGrid products={newArrivals} />
      </section>
    </div>
  );
};

export default Home;
