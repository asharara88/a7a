import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Sparkles, Moon, Sun, Monitor } from 'lucide-react'
import { cn } from '../../utils/cn'
import Navigation from './Navigation'
import MinimalNav from './MinimalNav'
import MobileNav from '../ui/MobileNav'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ThemeMode = 'light' | 'dark' | 'auto';

// Get initial theme preference from localStorage or default to auto
const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme') as ThemeMode;
  if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
    return savedTheme;
  }
  return 'auto';
};

// Check if it's currently PM (after 6 PM and before 6 AM)
const isCurrentlyPM = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

// Determine if dark mode should be active based on theme setting
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

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<ThemeMode>(getInitialTheme)
  const [showThemeMenu, setShowThemeMenu] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  // Calculate if dark mode should be active
  const isDarkMode = shouldUseDarkMode(theme);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, isDarkMode]);

  // Auto mode: check time every minute when in auto mode
  React.useEffect(() => {
    if (theme !== 'auto') return;

    const interval = setInterval(() => {
      const newIsDarkMode = shouldUseDarkMode('auto');
      if (newIsDarkMode !== isDarkMode) {
        // Force re-render by updating a dummy state or use a ref
        setTheme('auto'); // This will trigger the effect above
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [theme, isDarkMode]);

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

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  // Get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'auto':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with consistent styling */}
      <div className="relative">
        <MinimalNav />
        
        {/* Theme Switcher Button */}
        <div className="absolute top-2 right-4">
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label="Change theme"
            >
              {getThemeIcon()}
            </button>
            
            {/* Theme Menu */}
            {showThemeMenu && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700",
                    theme === 'light' && "bg-primary/10 text-primary"
                  )}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700",
                    theme === 'dark' && "bg-primary/10 text-primary"
                  )}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </button>
                <button
                  onClick={() => handleThemeChange('auto')}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700",
                    theme === 'auto' && "bg-primary/10 text-primary"
                  )}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Auto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLoggedIn={!!user}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-48px-88px)] pt-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex items-center mb-5 md:mb-0 text-left">
              <img 
                src={isDarkMode 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell Logo" 
                className="h-11 w-auto" 
              />
            </div>
            <div className="text-left md:text-right">
              <p className="font-medium tracking-wide">&copy; 2025 Biowell AI - Personal Digital Health Coach</p>
              <p className="text-gray-500 dark:text-white/70 mt-2 tracking-wide">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Click outside to close theme menu */}
      {showThemeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowThemeMenu(false)}
        />
      )}
    </div>
  )
}

export default Layout