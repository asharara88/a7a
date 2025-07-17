import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Sparkles, Moon, Sun } from 'lucide-react'
import { cn } from '../../utils/cn'
import Navigation from './Navigation'
import MobileNav from '../ui/MobileNav'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get initial dark mode preference from system or localStorage
const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    return savedMode === 'true';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(getInitialDarkMode)
  const [user, setUser] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Check for user session on mount
  React.useEffect(() => {
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
    
    // Set up auth state listener
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
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with consistent styling */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with responsive sizing */}
            <Link to="/" className="flex items-center">
              <img 
                src={darkMode 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell Logo" 
                className="h-12 sm:h-16 w-auto transition-all duration-300 hover:scale-105 object-contain" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Navigation type="main" />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
              <Navigation type="account" />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to={user ? "/cart" : "/login"}
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 relative",
                  darkMode ? "text-white" : "text-gray-900",
                  location.pathname === '/cart' ? "text-primary bg-primary/10 dark:bg-primary/20" : ""
                )}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full">2</span>
              </Link>
              <Link
                to={user ? "/mycoach" : "/login"}
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                  darkMode ? "text-white" : "text-gray-900",
                  location.pathname === '/mycoach' ? "text-primary bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 shadow-sm" : ""
                )}
                aria-label="AI Coach"
              >
                <Sparkles className="w-6 h-6" />
              </Link>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                    darkMode ? "text-white" : "text-gray-900"
                  )}
                  aria-label="Sign Out"
                >
                  <User className="w-6 h-6" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                    darkMode ? "text-white" : "text-gray-900"
                  )}
                  aria-label="User Account"
                >
                  <User className="w-6 h-6" />
                </Link>
              )}
              <button
                onClick={() => toggleDarkMode()}
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700",
                  darkMode ? "text-white" : "text-gray-900"
                )}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                  "text-gray-900 dark:text-white",
                )}
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Now using the dedicated MobileNav component */}
          <MobileNav 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            isLoggedIn={!!user}
            onSignOut={handleSignOut}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-64px-80px)] pt-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={darkMode 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell Logo" 
                className="h-10 w-auto" 
              />
            </div>
            <div className="text-center md:text-right">
              <p className="font-medium">&copy; 2025 Biowell AI - Personal Digital Health Coach</p>
              <p className="text-white/80 mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout