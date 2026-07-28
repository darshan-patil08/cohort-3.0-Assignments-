const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-surface-dark-3 text-text-muted",
    accent: "bg-indigo-accent/10 text-indigo-accent border border-indigo-accent/20",
    success: "bg-success/10 text-success border border-success/20",
    danger: "bg-danger/10 text-danger border border-danger/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
