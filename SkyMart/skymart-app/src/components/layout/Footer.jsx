import { Link } from 'react-router-dom';
import { Globe, Camera, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light-2 dark:bg-surface-dark-2 border-t border-border-light dark:border-border-dark mt-20 pt-16 pb-8">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded bg-indigo-accent flex items-center justify-center text-white font-display font-bold">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight">SkyMart</span>
            </Link>
            <p className="text-text-light-muted dark:text-text-muted text-sm mb-6 max-w-xs">
              Premium goods for the modern lifestyle. Distinctive design, uncompromising quality.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Electronics" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Electronics</Link></li>
              <li><Link to="/shop?category=Clothing" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Clothing</Link></li>
              <li><Link to="/shop?category=Home" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/shop?category=Books" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Books</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-text-light-muted dark:text-text-muted hover:text-indigo-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-light-muted dark:text-text-muted">
            &copy; {currentYear} SkyMart Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Payment icons placeholder */}
            <div className="w-10 h-6 bg-surface-light-3 dark:bg-surface-dark-3 rounded border border-border-light dark:border-border-dark flex items-center justify-center text-[10px] font-bold text-text-muted">VISA</div>
            <div className="w-10 h-6 bg-surface-light-3 dark:bg-surface-dark-3 rounded border border-border-light dark:border-border-dark flex items-center justify-center text-[10px] font-bold text-text-muted">MC</div>
            <div className="w-10 h-6 bg-surface-light-3 dark:bg-surface-dark-3 rounded border border-border-light dark:border-border-dark flex items-center justify-center text-[10px] font-bold text-text-muted">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
