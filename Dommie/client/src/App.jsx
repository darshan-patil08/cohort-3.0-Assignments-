import { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import api from './services/api';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryPills from './components/CategoryPills';
import ProductCard from './components/ProductCard';
import CuratedSpaces from './components/CuratedSpaces';
import FeatureIsland from './components/FeatureIsland';
import ArtisanSpotlight from './components/ArtisanSpotlight';
import CollectorReviews from './components/CollectorReviews';
import ProductDetailModal from './components/ProductDetailModal';
import ProductFormModal from './components/ProductFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

import { ArrowUpDown, PackageOpen, Plus, RefreshCw } from 'lucide-react';

const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [completedOrder, setCompletedOrder] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: 12,
      };
      if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await api.get('/products', { params });
      let list = response.data.products || [];

      if (sortBy === 'price-asc') {
        list = [...list].sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        list = [...list].sort((a, b) => b.price - a.price);
      } else if (sortBy === 'name') {
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      }

      setProducts(list);
      setTotalPages(response.data.totalPages || 1);
      setTotalCount(response.data.total || list.length);
    } catch (err) {
      console.error('Failed to load products:', err);
      addToast('Unable to load products. Check server connection.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedCategory, searchQuery, sortBy, addToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenCreateProduct = () => {
    if (!isAuthenticated) {
      addToast('Please sign in to add an item to the catalog.', 'info');
      handleOpenAuth('login');
      return;
    }
    setProductToEdit(null);
    setFormModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setProductToEdit(product);
    setFormModalOpen(true);
  };

  const handleOpenViewProduct = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const handleOpenDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleProductSaved = () => {
    fetchProducts();
  };

  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
    setTotalCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenCreateProduct={handleOpenCreateProduct}
      />

      <Hero
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        onExploreClick={() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <CuratedSpaces onSelectCategory={handleSelectCategory} />

      <main id="catalog" className="section-spacing" style={{ flex: 1 }}>
        <div className="app-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-hero)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Available inventory · {totalCount} Handcrafted Pieces
              </span>
              <h2 style={{ marginBottom: 0, fontSize: '2.1rem' }}>The Artisan Collection</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-panel)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-hairline)',
                }}
              >
                <ArrowUpDown size={16} color="var(--color-muted)" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    color: 'var(--color-heading)',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                  aria-label="Sort products"
                >
                  <option value="newest">Newest Additions</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              {isAuthenticated && (
                <button
                  onClick={handleOpenCreateProduct}
                  className="btn btn-primary btn-sm"
                  title="Add new product"
                >
                  <Plus size={16} />
                  <span>New Item</span>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '36px' }}>
            <CategoryPills
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setPage(1);
              }}
            />
          </div>

          {isLoading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: 'var(--color-panel)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <RefreshCw
                size={32}
                color="var(--color-hero)"
                style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}
              />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Loading Collection...</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', margin: 0 }}>
                Fetching handcrafted pieces.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: 'var(--color-panel)',
                borderRadius: 'var(--radius-md)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-paper)',
                  color: 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                }}
              >
                <PackageOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>No Matching Creations</h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
                We could not find any handmade pieces matching your current search or category filter.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Reset Filters
                </button>
                {isAuthenticated && (
                  <button onClick={handleOpenCreateProduct} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Publish First Item</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onView={handleOpenViewProduct}
                  onEdit={handleOpenEditProduct}
                  onDelete={handleOpenDeleteProduct}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                marginTop: '48px',
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="btn btn-outline btn-sm"
              >
                Previous
              </button>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-body)' }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <ArtisanSpotlight />
      <FeatureIsland />
      <CollectorReviews />
      <Footer onSelectCategory={handleSelectCategory} />

      <CartDrawer
        onOpenAuth={handleOpenAuth}
        onOrderPlaced={(order) => setCompletedOrder(order)}
      />

      <CheckoutModal
        isOpen={!!completedOrder}
        orderDetails={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <ProductFormModal
        isOpen={formModalOpen}
        productToEdit={productToEdit}
        onClose={() => setFormModalOpen(false)}
        onProductSaved={handleProductSaved}
      />

      <ProductDetailModal
        isOpen={detailModalOpen}
        product={selectedProduct}
        onClose={() => setDetailModalOpen(false)}
        onEdit={(prod) => {
          setDetailModalOpen(false);
          handleOpenEditProduct(prod);
        }}
        onDelete={(prod) => {
          setDetailModalOpen(false);
          handleOpenDeleteProduct(prod);
        }}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        product={productToDelete}
        onClose={() => setDeleteModalOpen(false)}
        onProductDeleted={handleProductDeleted}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
