import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products, categories } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';
import { sortProducts } from '../../utils/helpers';
import ProductGrid from '../../components/product/ProductGrid';
import FilterSidebar from '../../components/product/FilterSidebar';
import Input from '../../components/ui/Input';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);
  
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [sortBy, setSortBy] = useState('newest');
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    
    // Simulate network delay for realistic UX
    const timer = setTimeout(() => {
      let result = [...products];

      // 1. Search filter
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        result = result.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q)
        );
      }

      // 2. Category filter
      if (selectedCategories.length > 0) {
        result = result.filter(p => selectedCategories.includes(p.category));
      }

      // 3. Price filter
      result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // 4. Sort
      result = sortProducts(result, sortBy);

      setFilteredProducts(result);
      setLoading(false);
    }, 400); // 400ms fake delay

    return () => clearTimeout(timer);
  }, [debouncedSearch, selectedCategories, priceRange, sortBy]);

  // Sync category param with state
  useEffect(() => {
    if (initialCategory && !selectedCategories.includes(initialCategory)) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  return (
    <div className="container-app py-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-4xl mb-2">Shop All</h1>
          <p className="text-text-light-muted dark:text-text-muted">
            Showing {filteredProducts.length} results
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden flex items-center gap-2 px-4 py-2.5 surface-card text-sm font-semibold whitespace-nowrap"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light-muted dark:text-text-muted" />
            <Input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative hidden md:block">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-surface-light-3 dark:bg-surface-dark-3 border border-border-light dark:border-border-dark rounded-md text-sm font-semibold focus:outline-none focus:border-indigo-accent cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-text-light-muted dark:text-text-muted" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className={`md:w-64 shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <FilterSidebar 
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClose={() => setIsFilterOpen(false)}
          />
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {/* Mobile Sort (visible only when filters open on mobile) */}
          {isFilterOpen && (
            <div className="md:hidden mb-6">
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 bg-surface-light-3 dark:bg-surface-dark-3 border border-border-light dark:border-border-dark rounded-md text-sm font-semibold focus:outline-none focus:border-indigo-accent cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          )}

          <ProductGrid products={filteredProducts} loading={loading} />
        </div>

      </div>
    </div>
  );
};

export default Shop;
