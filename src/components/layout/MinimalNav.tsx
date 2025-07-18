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
  ChevronDown
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

interface MinimalNavProps {
  isDarkMode: boolean;
}

const MinimalNav: React.FC<MinimalNavProps> = ({ isDarkMode }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    
    const newIsDarkMode = shouldUseDarkMode(newTheme);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
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
    { href: '/supplements', label: 'Supplements', icon: <Pill className="w-4 h-4" /> },
  ];

  return (
    <>
      <motion.nav 
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-800/30 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className="flex items-center">
                <img 
                  src={isDarkMode 
                    ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                    : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                  }
                  alt="Biowell" 
                  className="h-8 w-auto object-contain transition-all duration-300" 
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                        isActive(item.href)
                          ? "bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <span className="mr-2.5">{item.icon}</span>
                      <span className="tracking-wide">{item.label}</span>
                      {isActive(item.href) && (
                        <motion.div
                          className="absolute inset-0 bg-primary/5 rounded-lg"
                          layoutId="activeTab"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
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
                        className="absolute right-0 mt-2 w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2 z-50"
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        {[
                          { mode: 'light' as ThemeMode, icon: Sun, label: 'Light' },
                          { mode: 'dark' as ThemeMode, icon: Moon, label: 'Dark' },
                          { mode: 'auto' as ThemeMode, icon: Monitor, label: 'Auto' }
                        ].map(({ mode, icon: Icon, label }) => (
                          <button
                            key={mode}
                            onClick={() => handleThemeChange(mode)}
                            className={cn(
                              "flex items-center w-full px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-gray-700/80",
                              theme === mode 
                                ? "text-primary bg-primary/10" 
                                : "text-gray-700 dark:text-gray-300"
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50 relative"
                  aria-label="Shopping cart"
                >
                      ? "bg-gradient-to-r from-primary/10 to-tertiary/10 dark:from-primary/20 dark:to-tertiary/20 text-primary border border-primary/20 shadow-sm backdrop-blur-sm"
                </Link>
              </motion.div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="User menu"
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
                          className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2 z-50"
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Link
                            to="/dashboard"
                            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-tertiary/5 hover:text-primary transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4 mr-3" />
                            <span className="tracking-wide">Dashboard</span>
                                  ? "text-primary bg-gradient-to-r from-primary/10 to-tertiary/10 border-r-2 border-primary" 
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-100/80 dark:hover:from-red-900/20 dark:hover:to-red-800/20 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200"
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 tracking-wide"
                    >
                      Sign in
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/onboarding"
                      className="px-5 py-2.5 bg-gradient-to-r from-primary via-tertiary to-secondary text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 shadow-md backdrop-blur-sm tracking-wide hover:from-primary-light hover:via-tertiary-light hover:to-secondary-light"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
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
              className="fixed top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-800/30 z-50 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300",
                          isActive(item.href)
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="tracking-wide">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {!user && (
                    <motion.div
                      className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Link
                        to="/login"
                        className="block px-4 py-3.5 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300 tracking-wide"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/onboarding"
                        className="block px-4 py-3.5 bg-gradient-to-r from-primary via-tertiary to-secondary text-white rounded-xl text-base font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-center tracking-wide hover:from-primary-light hover:via-tertiary-light hover:to-secondary-light"
                        onClick={() => setIsMobileMenuOpen(false)}
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 via-tertiary/5 to-secondary/5 rounded-lg border border-primary/10"
                        Get Started
                      </Link>
                    </motion.div>
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