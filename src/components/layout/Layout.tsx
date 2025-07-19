import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import MinimalNav from './MinimalNav'
import MobileNav from '../ui/MobileNav'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with error handling
let supabase: any = null;
let supabaseError: string | null = null;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    supabaseError = "Supabase environment variables are missing. Please check your environment configuration.";
    console.error('Missing Supabase environment variables:', {
      VITE_SUPABASE_URL: !!supabaseUrl,
      VITE_SUPABASE_ANON_KEY: !!supabaseAnonKey,
      NODE_ENV: import.meta.env.MODE
    });
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  supabaseError = "Failed to initialize Supabase client. Please check your configuration.";
  console.error('Supabase initialization error:', error);
}

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [connectionError, setConnectionError] = React.useState<string | null>(supabaseError)
  const navigate = useNavigate()

  // Check for user session on mount
  React.useEffect(() => {
    if (!supabase) {
      setConnectionError(supabaseError);
      return;
    }

    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        setConnectionError(null);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setConnectionError('Unable to connect to Supabase. Please check your internet connection and try again.');
      }
    };
    
    checkUser();
    
    // Set up auth state listener only if supabase is available
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const handleSignOut = async () => {
    if (!supabase) {
      console.error('Supabase client not available');
      return;
    }

    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show connection error if Supabase is not available
  if (connectionError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {connectionError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="relative">
        <MinimalNav />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLoggedIn={!!user}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex items-center mb-5 md:mb-0 text-left">
              <img 
                src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
                alt="Biowell Logo" 
                className="h-18 w-auto dark:hidden" 
              />
              <img 
                src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                alt="Biowell Logo" 
                className="h-18 w-auto hidden dark:block" 
              />
            </div>
            <div className="text-left md:text-right">
              <p className="font-medium tracking-wide">&copy; 2025 Biowell AI - Personal Digital Health Coach</p>
              <p className="text-gray-500 dark:text-white/70 mt-2 tracking-wide">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout