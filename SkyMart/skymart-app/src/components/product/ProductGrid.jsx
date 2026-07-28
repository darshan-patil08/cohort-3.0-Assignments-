import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading = false, skeletonCount = 8 }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="surface-card p-4 flex flex-col h-[400px]">
            <div className="skeleton w-full aspect-square rounded mb-4" />
            <div className="skeleton h-4 w-20 mb-3" />
            <div className="skeleton h-6 w-full mb-2" />
            <div className="skeleton h-6 w-2/3 mb-4 mt-auto" />
            <div className="flex justify-between mt-auto">
              <div className="skeleton h-8 w-24" />
              <div className="skeleton h-10 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border-light dark:border-border-dark rounded-lg surface-card">
        <p className="text-xl font-semibold mb-2">No products found</p>
        <p className="text-text-light-muted dark:text-text-muted">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
