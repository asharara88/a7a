import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import Navigation from './Navigation';
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
  }, [location.pathname, isOpen, onClose]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div 
        className={cn( 
          "fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto",
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
        
        <div className="p-4 space-y-6">
          {!isLoggedIn && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
                Menu
              </h3>
              <div className="space-y-1">
                <Link to="/" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Home</span>
                </Link>
                <Link to="/about" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">About</span>
                </Link>
                <Link to="/pricing" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Pricing</span>
                </Link>
              </div>
            </div>
          )}
          
          {isLoggedIn && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
                Main Menu
              </h3>
              
              <div className="space-y-1">
                <Link to="/dashboard" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Dashboard</span>
                </Link>
                <Link to="/mycoach" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">MyCoach</span>
                </Link>
                <div className="relative">
                  <button 
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200 font-medium"
                    onClick={() => toggleSubmenu('supplements')}
                  >
                    <span>Supplements</span>
                    {openSubmenu === 'supplements' ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  {openSubmenu === 'supplements' && (
                    <div className="pl-6 space-y-1">
                      <Link to="/my-stacks" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        My Stacks
                      </Link>
                      <Link to="/supplements" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Browse Supplements
                      </Link>
                      <Link to="/recommendations" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Recommendations
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button 
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200 font-medium"
                    onClick={() => toggleSubmenu('health')}
                  >
                    <span>Health</span>
                    {openSubmenu === 'health' ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  {openSubmenu === 'health' && (
                    <div className="pl-6 space-y-1">
                      <Link to="/fitness" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Fitness
                      </Link>
                      <Link to="/nutrition" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Nutrition
                      </Link>
                      <Link to="/recipes" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Recipes
                      </Link>
                      <Link to="/metabolism" className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300" onClick={onClose}>
                        Metabolism
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link to="/cart" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Shopping Cart</span>
                </Link>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
              Account
            </h3>
            <div className="space-y-1">
              {isLoggedIn ? (
                <>
                  <Link to="/settings" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Settings</span>
                  </Link>
                  <Link to="/export" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Export Data</span>
                  </Link>
                  <button 
                    onClick={() => {
                      onSignOut?.();
                      onClose();
                    }}
                    className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Sign In</span>
                  </Link>
                  <Link to="/signup" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onClose}>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
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
                className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
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
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center transition-colors"
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