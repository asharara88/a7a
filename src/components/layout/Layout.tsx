import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, MessageSquare } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Supplements', href: '/supplements' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/logos/favicon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2UyYTcyNGEyLTZkNTctNDk4YS04ZGU1LWY2Y2Q4MjAyNjA3YiJ9.eyJ1cmwiOiJsb2dvcy9mYXZpY29uLnN2ZyIsImlhdCI6MTc0NzI5OTE1NywiZXhwIjoxNzc4ODM1MTU3fQ.rOddcgsmXrPC8bqm0vvWl_3VWveHtI2ybGSLS1tpxJg" 
                alt="Biowell Logo" 
                className="h-8 w-auto mr-2" 
              />
              <span className="text-2xl font-bold text-primary">Biowell</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary/10 dark:bg-primary/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link
                to="/dashboard"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                aria-label="AI Coach"
              >
                <MessageSquare className="w-6 h-6" />
              </Link>
              <Link
                to="/login"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                aria-label="User Account"
              >
                <User className="w-6 h-6" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10 dark:bg-primary/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
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
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/logos/favicon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2UyYTcyNGEyLTZkNTctNDk4YS04ZGU1LWY2Y2Q4MjAyNjA3YiJ9.eyJ1cmwiOiJsb2dvcy9mYXZpY29uLnN2ZyIsImlhdCI6MTc0NzI5OTE1NywiZXhwIjoxNzc4ODM1MTU3fQ.rOddcgsmXrPC8bqm0vvWl_3VWveHtI2ybGSLS1tpxJg" 
                alt="Biowell Logo" 
                className="h-8 w-auto mr-2" 
              />
              <span className="font-bold">Biowell</span>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2025 Biowell AI - Personal Digital Health Coach. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout