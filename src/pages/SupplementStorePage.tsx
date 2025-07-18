import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Sparkles, 
  Pill, 
  ShoppingCart, 
  User, 
  Menu, 
  Sun, 
  Moon, 
  Monitor,
  LogOut,
  X,
  ChevronDown,
  Settings,
  Utensils,
  BarChart3,
  Heart
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ThemeMode = 'light' | 'dark' | 'auto';

const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme') as ThemeMode;
  if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
    return savedTheme;
  }
  return 'auto';
};

const isCurrentlyPM = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

const shouldUseDarkMode = (theme: ThemeMode): boolean => {
  switch (theme) {
    case 'dark':
      return true;
    case 'light':
      return false;
    case 'auto':
      return isCurrentlyPM();
    default:
      return false;
  }
};

const MinimalNav: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSupplementsMenu, setShowSupplementsMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isDarkMode = shouldUseDarkMode(theme);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, isDarkMode]);

  // Auto mode: check time every minute when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const interval = setInterval(() => {
      const newIsDarkMode = shouldUseDarkMode('auto');
      if (newIsDarkMode !== isDarkMode) {
        setTheme('auto');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [theme, isDarkMode]);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'auto':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { href: '/fitness', label: 'Fitness', icon: <Activity className="w-4 h-4" /> },
    { href: '/mycoach', label: 'MyCoach', icon: <Sparkles className="w-4 h-4" /> },
    { 
      href: '/nutrition', 
      label: 'Nutrition', 
      icon: <Utensils className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { href: '/nutrition', label: 'Food Logging', icon: <Utensils className="w-4 h-4" /> },
        { href: '/recipes', label: 'Personalized Recipes', icon: <Utensils className="w-4 h-4" /> },
      ]
    },
    { 
      href: '/supplements', 
      label: 'Supplements', 
      icon: <Pill className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { href: '/supplements', label: 'Browse All', icon: <Pill className="w-4 h-4" /> },
        { href: '/supplements/recommendations', label: 'Recommendations', icon: <Heart className="w-4 h-4" /> },
        { href: '/my-stacks', label: 'My Stacks', icon: <BarChart3 className="w-4 h-4" /> },
        { href: '/cart', label: 'Cart', icon: <ShoppingCart className="w-4 h-4" /> }
      ]
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src={isDarkMode 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell" 
                className="h-12 w-auto object-contain" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm">
                {navItems.map((item) => (
                  <div key={item.href} className="relative">
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          onClick={() => setShowSupplementsMenu(!showSupplementsMenu)}
                          className={cn(
                            "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                            isActive(item.href)
                              ? "bg-primary text-white shadow-md"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-gray-700/70"
                          )}
                        >
                          <span className="mr-2">{item.icon}</span>
                          <span className="tracking-wide">{item.label}</span>
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </button>
                        
                        <AnimatePresence>
                          {showSupplementsMenu && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowSupplementsMenu(false)}
                              />
                              <motion.div
                                className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15 }}
                              >
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.href}
                                    to={dropdownItem.href}
                                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setShowSupplementsMenu(false)}
                                  >
                                    <span className="mr-3">{dropdownItem.icon}</span>
                                    <span className="tracking-wide">{dropdownItem.label}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                          isActive(item.href)
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-gray-700/70"
                        )}
                      >
                        <span className="mr-2">{item.icon}</span>
                        <span className="tracking-wide">{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getThemeIcon()}
                </motion.button>
                
                <AnimatePresence>
                  {showThemeMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowThemeMenu(false)}
                      />
                      <motion.div
                        className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        {[
                          { mode: 'light' as ThemeMode, icon: Sun, label: 'Light Mode' },
                          { mode: 'dark' as ThemeMode, icon: Moon, label: 'Dark Mode' },
                          { mode: 'auto' as ThemeMode, icon: Monitor, label: 'Auto Mode' }
                        ].map(({ mode, icon: Icon, label }) => (
                          <button
                            key={mode}
                            onClick={() => handleThemeChange(mode)}
                            className={cn(
                              "flex items-center w-full px-4 py-3 text-sm transition-colors",
                              theme === mode 
                                ? "text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 font-medium" 
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                          >
                            <Icon className="w-4 h-4 mr-3" />
                            <span className="tracking-wide">{label}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/cart"
                  className={cn(
                    "p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300",
                    isActive('/cart') && "text-primary bg-primary/10"
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* User Menu or Auth Buttons */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className="w-4 h-4 mr-1" />
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowUserMenu(false)}
                        />
                        <motion.div
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Link
                            to="/dashboard"
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Home className="w-4 h-4 mr-3" />
                            <span className="tracking-wide">Dashboard</span>
                          </Link>
                          <Link
                            to="/bioclock"
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            <span className="tracking-wide">Bioclock™</span>
                          </Link>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            <span className="tracking-wide">Sign out</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 shadow-md tracking-wide"
                  >
                      isActive('/cart') && "text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20"
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/onboarding"
                      className="px-6 py-2.5 bg-gradient-to-r from-primary via-tertiary to-secondary text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 shadow-md tracking-wide"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      exit={{ rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Advanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50 lg:hidden shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.hasDropdown ? (
                        <div className="space-y-1">
                          <div
                            className={cn(
                              "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                              isActive(item.href)
                               ? "bg-primary text-white shadow-md"
                                : "text-gray-700 dark:text-gray-300"
                            )}
                          >
                            <span className="mr-3">{item.icon}</span>
                            <span className="tracking-wide">{item.label}</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                to={dropdownItem.href}
                                className={cn(
                                  "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                  isActive(dropdownItem.href)
                                    ? "text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="mr-3">{dropdownItem.icon}</span>
                                <span className="tracking-wide">{dropdownItem.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                            isActive(item.href)
                              ? "bg-gradient-to-r from-primary via-tertiary to-secondary text-white shadow-md"
                              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span className="tracking-wide">{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Auth Section */}
                  {!user && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      <Link
                        to="/login"
                        className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors tracking-wide"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/onboarding"
                        className="block px-4 py-3 bg-primary text-white rounded-xl text-base font-medium text-center shadow-md tracking-wide"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}

                  {/* Mobile User Menu */}
                  {user && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Home className="w-4 h-4 mr-3" />
                        <span className="tracking-wide">Dashboard</span>
                      </Link>
                      <Link
                        to="/bioclock"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        <span className="tracking-wide">Bioclock™</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span className="tracking-wide">Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MinimalNav;