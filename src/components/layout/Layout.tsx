import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import Navigation from './Navigation'
import MinimalNav from './MinimalNav'
import MobileNav from '../ui/MobileNav'
import { createClient } from '@supabase/supabase-js'
import { useTheme } from '../../hooks/useTheme'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { effectiveTheme } = useTheme()
  const [user, setUser] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [cartCount, setCartCount] = React.useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  // Check for user session on mount
  React.useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        // If user is authenticated, fetch cart count
        if (user) {
          try {
            const { data: cartData } = await supabase
              .from('cart_items')
              .select('id')
              .eq('user_id', user.id);
            
            setCartCount(cartData?.length || 0);
          } catch (error) {
            console.error('Error fetching cart count:', error);
          }
        }
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
      setCartCount(0);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${effectiveTheme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Optimized Header */}
      <MinimalNav />
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLoggedIn={!!user}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-56px-88px)] pt-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={effectiveTheme === 'dark' 
                  ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                  : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                }
                alt="Biowell Logo" 
                className="h-8 w-auto" 
              />
            </div>
            <div className="text-center md:text-right">
              <p className="font-medium text-sm">&copy; 2025 Biowell AI - Personal Digital Health Coach</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout