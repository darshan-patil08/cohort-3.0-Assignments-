import { useAuth } from '../../context/AuthContext';
import { Package, Heart, Settings, MapPin, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container-app py-12">
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="surface-card p-6 flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-indigo-accent text-white flex items-center justify-center font-display font-bold text-3xl mb-4">
              {user?.name.charAt(0)}
            </div>
            <h2 className="font-bold text-lg">{user?.name}</h2>
            <p className="text-text-light-muted dark:text-text-muted text-sm mb-4">{user?.email}</p>
            <button 
              onClick={logout}
              className="text-sm font-semibold text-danger hover:underline"
            >
              Sign Out
            </button>
          </div>

          <nav className="surface-card rounded-lg overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 text-left border-l-2 border-indigo-accent bg-surface-light-3 dark:bg-surface-dark-3 font-semibold">
              <Package className="w-5 h-5 text-indigo-accent" /> Orders
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-left border-l-2 border-transparent hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-left border-l-2 border-transparent hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors">
              <MapPin className="w-5 h-5" /> Addresses
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-left border-l-2 border-transparent hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors">
              <CreditCard className="w-5 h-5" /> Payment Methods
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-left border-l-2 border-transparent hover:bg-surface-light-3 dark:hover:bg-surface-dark-3 text-text-light-muted dark:text-text-muted hover:text-text-light-primary dark:hover:text-text-primary transition-colors border-t border-border-light dark:border-border-dark">
              <Settings className="w-5 h-5" /> Account Settings
            </button>
          </nav>
        </aside>

        {/* Main Content (Mock Orders) */}
        <div className="flex-grow">
          <h1 className="font-display font-bold text-3xl mb-6">Order History</h1>
          
          <div className="surface-card p-12 text-center flex flex-col items-center justify-center border-dashed">
            <Package className="w-12 h-12 text-border-dark mb-4" />
            <h3 className="font-semibold text-xl mb-2">No orders yet</h3>
            <p className="text-text-light-muted dark:text-text-muted">
              When you place orders, they will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
