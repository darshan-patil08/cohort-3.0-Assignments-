import { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { X, AlertCircle, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'Ceramics',
  'Textiles',
  'Apothecary',
  'Kitchenware',
  'Lighting',
  'Stationery',
  'Decor',
];

const ProductFormDialog = ({ onClose, productToEdit, onProductSaved }) => {
  const isEditing = !!productToEdit;
  const { addToast } = useToast();

  // State initialized purely from props without synchronous useEffect setState
  const [formData, setFormData] = useState(() => ({
    name: productToEdit?.name || '',
    category: productToEdit?.category || 'Ceramics',
    price: productToEdit?.price !== undefined ? String(productToEdit.price) : '',
    stock: productToEdit?.stock !== undefined ? String(productToEdit.stock) : '10',
    imageUrl: productToEdit?.imageUrl || '',
    description: productToEdit?.description || '',
  }));

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const handleSampleImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralError('');

    // Pre-flight client checks for instant feedback
    if (!/[a-zA-Z]/.test(formData.name)) {
      setFieldErrors({ name: 'Product name must contain letters and cannot be purely numbers or symbols' });
      setIsSubmitting(false);
      return;
    }

    if (Number(formData.price) < 1) {
      setFieldErrors({ price: 'Price must be a valid positive amount (minimum ₹1)' });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        imageUrl: formData.imageUrl.trim() || undefined,
      };

      let response;
      if (isEditing) {
        response = await api.put(`/products/${productToEdit._id}`, payload);
        addToast(response.data.message || 'Product updated successfully.', 'success');
      } else {
        response = await api.post('/products', payload);
        addToast(response.data.message || 'Product created successfully.', 'success');
      }

      onProductSaved(response.data.product);
      onClose();
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors && Array.isArray(data.errors)) {
        // Map express-validator field-level 400 errors
        const errorMap = {};
        data.errors.forEach((e) => {
          if (e.field) errorMap[e.field] = e.message;
        });
        setFieldErrors(errorMap);
        addToast('Please correct highlighted validation errors.', 'error');
      } else {
        setGeneralError(data?.message || 'Operation failed. Please try again.');
        addToast(data?.message || 'Failed to save product.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-hero)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '2px',
              }}
            >
              Curator Atelier
            </span>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>
              {isEditing ? 'Modify Artisan Creation' : 'Publish Handcrafted Piece'}
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {generalError && (
            <div className="alert alert-error" style={{ marginBottom: 0 }}>
              <AlertCircle size={18} />
              <span>{generalError}</span>
            </div>
          )}

          {/* Product Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="prod-name">
              Product Title <span className="required-dot">*</span>
            </label>
            <input
              id="prod-name"
              type="text"
              name="name"
              placeholder="e.g. Speckled Sage Stoneware Mug"
              value={formData.name}
              onChange={handleChange}
              className={`input-control ${fieldErrors.name ? 'is-invalid' : ''}`}
            />
            {fieldErrors.name && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.name}
              </span>
            )}
            <span className="form-hint" style={{ marginTop: '4px' }}>
              Must contain descriptive words (letters). Pure numbers or special symbols are rejected.
            </span>
          </div>

          {/* Category & Stock (2 columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="prod-cat">
                Artisan Category <span className="required-dot">*</span>
              </label>
              <select
                id="prod-cat"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-control"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-stock">
                Available Studio Stock <span className="required-dot">*</span>
              </label>
              <input
                id="prod-stock"
                type="number"
                name="stock"
                min="0"
                step="1"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                className={`input-control ${fieldErrors.stock ? 'is-invalid' : ''}`}
              />
              {fieldErrors.stock && (
                <span className="form-error-msg">
                  <AlertCircle size={14} /> {fieldErrors.stock}
                </span>
              )}
            </div>
          </div>

          {/* Price (in Rupee ₹) */}
          <div className="form-group">
            <label className="form-label" htmlFor="prod-price">
              Handcrafted Price (INR ₹) <span className="required-dot">*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontWeight: 600,
                  color: 'var(--color-heading)',
                  fontSize: '1.05rem',
                }}
              >
                ₹
              </span>
              <input
                id="prod-price"
                type="number"
                name="price"
                min="1"
                step="1"
                placeholder="899"
                value={formData.price}
                onChange={handleChange}
                style={{ paddingLeft: '36px' }}
                className={`input-control ${fieldErrors.price ? 'is-invalid' : ''}`}
              />
            </div>
            {fieldErrors.price && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.price}
              </span>
            )}
            <span className="form-hint" style={{ marginTop: '4px' }}>
              Amount in Indian Rupees (₹). Server enforces minimum ₹1.
            </span>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" htmlFor="prod-image" style={{ marginBottom: 0 }}>
                High-Resolution Image URL
              </label>
              <button
                type="button"
                onClick={handleSampleImage}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-hero)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={13} />
                <span>Fill sample photo</span>
              </button>
            </div>
            <input
              id="prod-image"
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.imageUrl}
              onChange={handleChange}
              className={`input-control ${fieldErrors.imageUrl ? 'is-invalid' : ''}`}
            />
            {fieldErrors.imageUrl && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.imageUrl}
              </span>
            )}

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div
                style={{
                  marginTop: '12px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  maxHeight: '160px',
                  position: 'relative',
                  backgroundColor: 'var(--color-hairline)',
                }}
              >
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="prod-desc">
              Detailed Description <span className="required-dot">*</span>
            </label>
            <textarea
              id="prod-desc"
              name="description"
              rows={4}
              placeholder="Describe materials, origin, dimensions, glaze finish, and care instructions (min. 10 chars)..."
              value={formData.description}
              onChange={handleChange}
              className={`textarea-control ${fieldErrors.description ? 'is-invalid' : ''}`}
            />
            {fieldErrors.description && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.description}
              </span>
            )}
            <span className="form-hint" style={{ marginTop: '4px' }}>
              Minimum 10 characters required by server validation.
            </span>
          </div>

          {/* Modal Footer Controls */}
          <div className="modal-footer" style={{ padding: '24px 0 0 0', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-teal">
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Save Modifications'
                : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductFormModal = ({ isOpen, onClose, productToEdit, onProductSaved }) => {
  if (!isOpen) return null;

  return (
    <ProductFormDialog
      key={productToEdit?._id || 'new-product'}
      onClose={onClose}
      productToEdit={productToEdit}
      onProductSaved={onProductSaved}
    />
  );
};

export default ProductFormModal;
