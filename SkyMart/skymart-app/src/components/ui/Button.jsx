import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = '', 
  disabled, 
  ...props 
}, ref) => {
  
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-accent hover:bg-indigo-hover active:bg-indigo-deep text-white",
    secondary: "bg-transparent border border-indigo-accent text-indigo-accent hover:bg-indigo-accent/10",
    ghost: "bg-transparent hover:bg-surface-dark-3/50 dark:hover:bg-surface-dark-3 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary",
    danger: "bg-danger/10 hover:bg-danger/20 text-danger"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-6 py-3 text-lg",
    icon: "p-2"
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
