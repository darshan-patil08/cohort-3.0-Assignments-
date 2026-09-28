import  { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
// eslint-disable-next-line no-unused-vars
import { X, AlertCircle, CheckCircle2, Lock, Mail, User, Sparkles } from 'lucide-react';

const AuthModal = ({ initialMode = 'login', isOpen, onClose }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

  const { login, register } = useAuth();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const handleFillDemo = () => {
    setMode('login');
    setFormData({
      name: '',
      email: 'elena@organicstore.com',
      password: 'Password123',
      confirmPassword: '',
    });
    setFieldErrors({});
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralError('');
    setRegisterSuccessMessage('');

    // Pre-flight validation on registration
    if (mode === 'register') {
      const nameTrimmed = formData.name.trim();
      if (!nameTrimmed) {
        setFieldErrors({ name: 'Full name is required' });
        setIsSubmitting(false);
        return;
      }
      if (!/^[a-zA-Z\s'-]+$/.test(nameTrimmed)) {
        setFieldErrors({ name: 'Name must contain only alphabetic letters, spaces, and hyphens (numbers and special symbols are not allowed)' });
        setIsSubmitting(false);
        return;
      }
      if (nameTrimmed.length < 2) {
        setFieldErrors({ name: 'Name must be at least 2 characters long' });
        setIsSubmitting(false);
        return;
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setFieldErrors({ email: 'Please enter a valid email address' });
        setIsSubmitting(false);
        return;
      }
      if (!formData.password || formData.password.length < 6 || !/\d/.test(formData.password)) {
        setFieldErrors({ password: 'Password must be at least 6 characters and contain at least one number' });
        setIsSubmitting(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setFieldErrors({ confirmPassword: 'Passwords do not match' });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        addToast('Welcome back! Authenticated successfully.', 'success');
        onClose();
      } else {
        const response = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.confirmPassword
        );
        addToast(response.message || 'Account registered! You can now log in.', 'success');
        setRegisterSuccessMessage('Your account was created successfully! Please sign in below.');
        setMode('login');
        setFormData((prev) => ({
          ...prev,
          password: '',
          confirmPassword: '',
        }));
      }
    } catch (err) {
      const responseData = err.response?.data;
      if (err.response?.status === 400 && responseData?.errors) {
        // Map express-validator field-level errors to specific inputs
        const errorMap = {};
        responseData.errors.forEach((item) => {
          if (!errorMap[item.field]) {
            errorMap[item.field] = item.message;
          }
        });
        setFieldErrors(errorMap);
      } else if (err.response?.status === 409) {
        setFieldErrors({ email: responseData?.message || 'Email is already registered.' });
      } else if (err.response?.status === 401) {
        setGeneralError(responseData?.message || 'Invalid email or password.');
      } else {
        setGeneralError(responseData?.message || 'A network error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3>{mode === 'login' ? 'Welcome Back' : 'Create an Account'}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              {mode === 'login'
                ? 'Sign in to manage catalog items and settings.'
                : 'Join our guild of certified artisans and makers.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ borderRadius: '50%', padding: '6px' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-paper)',
            padding: '4px',
            margin: '20px 28px 0 28px',
            borderRadius: '12px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setFieldErrors({});
              setGeneralError('');
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
              color: mode === 'login' ? 'var(--color-heading)' : 'var(--color-muted)',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: mode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setFieldErrors({});
              setGeneralError('');
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
              color: mode === 'register' ? 'var(--color-heading)' : 'var(--color-muted)',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: mode === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-body" style={{ paddingTop: '20px' }}>
          {/* Success banner after registration */}
          {registerSuccessMessage && (
            <div
              style={{
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success-border)',
                color: 'var(--color-success)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{registerSuccessMessage}</span>
            </div>
          )}

          {/* General Error Banner */}
          {generalError && (
            <div
              style={{
                backgroundColor: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger-border)',
                color: 'var(--color-danger)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={18} />
              <span>{generalError}</span>
            </div>
          )}

          {/* Registration: Name Field */}
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">
                Full Name <span className="required-dot">*</span>
              </label>
              <input
                id="auth-name"
                name="name"
                type="text"
                placeholder="e.g. Elena Rostova"
                value={formData.name}
                onChange={handleChange}
                className={`input-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                autoComplete="name"
              />
              {fieldErrors.name && (
                <span className="form-error-msg">
                  <AlertCircle size={14} /> {fieldErrors.name}
                </span>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">
              Email Address <span className="required-dot">*</span>
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              placeholder="e.g. elena@organicstore.com"
              value={formData.email}
              onChange={handleChange}
              className={`input-control ${fieldErrors.email ? 'is-invalid' : ''}`}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">
              Password <span className="required-dot">*</span>
            </label>
            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder="Min. 6 chars with at least one number"
              value={formData.password}
              onChange={handleChange}
              className={`input-control ${fieldErrors.password ? 'is-invalid' : ''}`}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {fieldErrors.password && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {fieldErrors.password}
              </span>
            )}
          </div>

          {/* Registration: Confirm Password Field */}
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-confirm-password">
                Confirm Password <span className="required-dot">*</span>
              </label>
              <input
                id="auth-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-control ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                autoComplete="new-password"
              />
              {fieldErrors.confirmPassword && (
                <span className="form-error-msg">
                  <AlertCircle size={14} /> {fieldErrors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-teal"
            style={{ width: '100%', marginTop: '10px', padding: '14px' }}
          >
            {isSubmitting
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In to Account'
              : 'Create Artisan Account'}
          </button>

          {/* Demo Account Quick-Fill Helper */}
          {mode === 'login' && (
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-hairline)',
                textAlign: 'center',
              }}
            >
              <button
                type="button"
                onClick={handleFillDemo}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-hero)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} color="var(--color-amber-dark)" />
                <span>Fill Demo Curator Credentials (1-Click)</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
