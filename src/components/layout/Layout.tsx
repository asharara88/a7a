import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, MessageSquare, Moon, Sun } from 'lucide-react'
import { cn } from '../../utils/cn'

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
  const location = useLocation()

  // Apply dark mode class on initial render and when darkMode changes
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Nutrition', href: '/nutrition' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Fitness', href: '/fitness' },
    { name: 'Supplements', href: '/supplements' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header - consistent shadow and transition */}
      <header className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-lg transition-all duration-200 sticky top-0 z-50`}>
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
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200",
                    darkMode ? "text-white" : "text-gray-900",
                    location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? "text-primary bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 dark:from-primary/20 dark:via-tertiary/20 dark:to-secondary/20 shadow-sm"
                      : "hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                  to={item.href}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/cart"
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                  darkMode ? "text-white" : "text-gray-900"
                )}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link
                to="/dashboard"
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                  darkMode ? "text-white" : "text-gray-900",
                  location.pathname === '/dashboard' ? "text-primary bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 shadow-sm" : ""
                )}
                aria-label="AI Coach"
              >
                <MessageSquare className="w-6 h-6" />
              </Link>
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
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
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
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-sm font-semibold transition-all duration-200",
                      darkMode ? "text-white" : "text-gray-900",
                      location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                        ? "text-primary bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 dark:from-primary/20 dark:via-tertiary/20 dark:to-secondary/20 shadow-sm"
                        : "hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-64px-80px)] pt-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-dark via-tertiary-dark to-secondary-dark text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE" 
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