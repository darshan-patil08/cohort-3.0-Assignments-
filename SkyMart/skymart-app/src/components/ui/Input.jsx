import { forwardRef } from 'react';

const Input = forwardRef(({ className = '', error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 bg-surface-light-3 dark:bg-surface-dark-3 border rounded-md text-text-light-primary dark:text-text-primary placeholder:text-text-light-muted dark:placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-accent/50 transition-all duration-200
          ${error ? 'border-danger focus:border-danger focus:ring-danger/50' : 'border-border-light dark:border-border-dark focus:border-indigo-accent'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
