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

const MinimalNav: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    { href: '/supplements', label: 'Supplements', icon: <Pill className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={isDarkMode 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell" 
                className="h-8 w-auto object-contain" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                      isActive(item.href)
                        ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {getThemeIcon()}
                </button>
                
                <AnimatePresence>
                  {showThemeMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowThemeMenu(false)}
                      />
                      <motion.div
                        className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
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
                              "flex items-center w-full px-3 py-2 text-sm transition-colors",
                              theme === mode 
                                ? "text-primary bg-primary/10" 
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className={cn(
                  "p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                  isActive('/cart') && "text-primary bg-primary/10"
                )}
              >
                <ShoppingCart className="w-4 h-4" />
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-1" />
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowUserMenu(false)}
                        />
                        <motion.div
                          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Link
                            to="/dashboard"
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
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
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/onboarding"
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  
                  {!user && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
                      <Link
                        to="/login"
                        className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/onboarding"
                        className="block px-3 py-3 bg-primary text-white rounded-lg text-base font-medium text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
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