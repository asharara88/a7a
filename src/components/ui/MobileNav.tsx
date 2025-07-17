import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  ChevronDown, 
  ChevronRight,
  Sun,
  Moon, 
  Home,
  Activity,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Pill,
  Sparkles,
  Package,
  ShoppingCart,
  FileText,
  Utensils
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../hooks/useTheme';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  onSignOut?: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  isOpen, 
  onClose, 
  isLoggedIn = false,
  onSignOut
}) => {
  const location = useLocation();
  const { theme, setTheme, effectiveTheme } = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close mobile nav when route changes
  React.useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div 
        className={cn( 
          "fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!isLoggedIn && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                Menu
              </h3>
              <div className="space-y-1">
                <Link to="/" className="mobile-nav-item" onClick={onClose}>
                  <Home className="mobile-nav-icon" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Home</span>
                </Link>
                <Link to="/about" className="mobile-nav-item" onClick={onClose}>
                  <User className="mobile-nav-icon" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">About</span>
                </Link>
                <Link to="/pricing" className="mobile-nav-item" onClick={onClose}>
                  <Settings className="mobile-nav-icon" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Pricing</span>
                </Link>
              </div>
            </div>
          )}
          
          {isLoggedIn && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Dashboard
                </h3>
                <div className="space-y-1">
                  <Link to="/dashboard" className="mobile-nav-item" onClick={onClose}>
                    <LayoutDashboard className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Dashboard</span>
                  </Link>
                  
                  <div>
                    <button 
                      onClick={() => toggleSubmenu('health')}
                      className="w-full mobile-nav-item justify-between"
                    >
                      <div className="flex items-center">
                        <Activity className="mobile-nav-icon" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">Health</span>
                      </div>
                      {openSubmenu === 'health' ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    
                    {openSubmenu === 'health' && (
                      <div className="pl-10 space-y-1 mt-1">
                        <Link to="/fitness" className="mobile-nav-item py-2" onClick={onClose}>
                          <span className="text-gray-700 dark:text-gray-300">Fitness</span>
                        </Link>
                        <Link to="/nutrition" className="mobile-nav-item py-2" onClick={onClose}>
                          <span className="text-gray-700 dark:text-gray-300">Nutrition</span>
                        </Link>
                        <Link to="/bioclock" className="mobile-nav-item py-2" onClick={onClose}>
                          <span className="text-gray-700 dark:text-gray-300">BioClock</span>
                        </Link>
                        <Link to="/lab-results" className="mobile-nav-item py-2" onClick={onClose}>
                          <span className="text-gray-700 dark:text-gray-300">Lab Results</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Supplements
                </h3>
                <div className="space-y-1">
                  <Link to="/supplements" className="mobile-nav-item" onClick={onClose}>
                    <Pill className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Explore</span>
                  </Link>
                  <Link to="/my-stacks" className="mobile-nav-item" onClick={onClose}>
                    <Package className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">My Stacks</span>
                  </Link>
                  <Link to="/cart" className="mobile-nav-item" onClick={onClose}>
                    <ShoppingCart className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Cart</span>
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Coach
                </h3>
                <div className="space-y-1">
                  <Link to="/mycoach" className="mobile-nav-item" onClick={onClose}>
                    <Sparkles className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">AI Health Coach</span>
                  </Link>
                  <Link to="/recommendations" className="mobile-nav-item" onClick={onClose}>
                    <FileText className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Recommendations</span>
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Account
                </h3>
                <div className="space-y-1">
                  <Link to="/profile" className="mobile-nav-item" onClick={onClose}>
                    <User className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Profile</span>
                  </Link>
                  <Link to="/settings" className="mobile-nav-item" onClick={onClose}>
                    <Settings className="mobile-nav-icon" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Settings</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex flex-col space-y-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-900 dark:text-white"
            >
              {effectiveTheme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 mr-2" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-2" />
                  Switch to Dark Mode
                </>
              )}
            </button>
            
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  onSignOut?.();
                  onClose();
                }}
                className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-center transition-colors"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;