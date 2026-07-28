import { X } from 'lucide-react';
import Button from '../ui/Button';

const FilterSidebar = ({ 
  categories, 
  selectedCategories, 
  setSelectedCategories, 
  priceRange, 
  setPriceRange,
  onClose
}) => {

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 4000]);
  };

  return (
    <div className="surface-card p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h3 className="font-display font-bold text-lg">Filters</h3>
        <button onClick={onClose} className="p-1 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-light-muted dark:text-text-muted">Categories</h4>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="filter-checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="text-sm font-medium group-hover:text-indigo-accent transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-light-muted dark:text-text-muted">Price Range</h4>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="4000" 
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-indigo-accent h-1 bg-surface-light-3 dark:bg-surface-dark-3 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm font-mono">
            <span className="px-2 py-1 bg-surface-light-3 dark:bg-surface-dark-3 rounded border border-border-light dark:border-border-dark">${priceRange[0]}</span>
            <span className="text-text-light-muted dark:text-text-muted">-</span>
            <span className="px-2 py-1 bg-surface-light-3 dark:bg-surface-dark-3 rounded border border-border-light dark:border-border-dark">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {(selectedCategories.length > 0 || priceRange[1] < 4000) && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default FilterSidebar;
