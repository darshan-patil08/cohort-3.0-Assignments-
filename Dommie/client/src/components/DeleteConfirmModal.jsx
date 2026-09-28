import { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, product, onProductDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/products/${product._id}`);
      addToast(response.data.message || 'Product deleted successfully.', 'success');
      onProductDeleted(product._id);
      onClose();
    } catch (err) {
      if (err.response?.status === 404) {
        addToast('Product was already removed from database. Updating view...', 'info');
        onProductDeleted(product._id);
        onClose();
      } else {
        addToast(err.response?.data?.message || 'Failed to delete product.', 'error');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-danger-bg)',
                color: 'var(--color-danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Confirm Deletion</h3>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ borderRadius: '50%', padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: '12px' }}>
            Are you sure you want to permanently delete{' '}
            <strong style={{ color: 'var(--color-heading)' }}>"{product.name}"</strong>?
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0 }}>
            This will remove the item from the catalog, cancel active customer bookmarks, and delete all records. This action cannot be reversed.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-outline" disabled={isDeleting}>
            Keep Product
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
