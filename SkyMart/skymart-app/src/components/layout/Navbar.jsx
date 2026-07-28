import { Link } from 'react-router-dom';
import { ShoppingBag, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-light-2/80 dark:bg-surface-dark-2/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="container-app h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-indigo-accent flex items-center justify-center text-white font-display font-bold group-hover:shadow-accent-glow transition-all">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            SkyMart
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold hover:text-indigo-accent transition-colors">Home</Link>
          <Link to="/shop" className="font-semibold hover:text-indigo-accent transition-colors">Shop</Link>
          <Link to="/categories" className="font-semibold hover:text-indigo-accent transition-colors text-text-light-muted dark:text-text-muted">Categories</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors rounded-full hover:bg-surface-light-3 dark:hover:bg-surface-dark-3"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors rounded-full hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown (Simplified for now) */}
              <div className="flex items-center gap-3 border-l border-border-light dark:border-border-dark pl-4 ml-2">
                <Link to="/profile" className="flex items-center gap-2 hover:text-indigo-accent transition-colors">
                  <div className="w-8 h-8 rounded-full bg-surface-light-3 dark:bg-surface-dark-3 border border-border-light dark:border-border-dark flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold hidden lg:block">{user.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-text-light-muted dark:text-text-muted hover:text-danger transition-colors rounded-full hover:bg-danger/10"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 border-l border-border-light dark:border-border-dark pl-4 ml-2">
              <Link to="/login" className="text-sm font-semibold hover:text-indigo-accent transition-colors">Log In</Link>
              <Link to="/register" className="text-sm font-semibold bg-indigo-accent text-white px-4 py-1.5 rounded hover:bg-indigo-hover transition-colors">Sign Up</Link>
            </div>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
