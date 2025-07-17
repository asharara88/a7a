import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Leaf, 
  Pill, 
  MoreHorizontal, 
  ShoppingCart,
  Bell,
  User,
  ChevronRight,
  LayoutDashboard,
  Activity,
  Utensils,
  Package,
  Sparkles,
  Store
} from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { cn } from '../../utils/cn';

// Initialize Supabase client for auth
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MinimalNav: React.FC = () => {
  const location = useLocation();
  const [wellnessDropdownOpen, setWellnessDropdownOpen] = useState(false);
  const [utilitiesDropdownOpen, setUtilitiesDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(2); // Mock cart count
  
  const wellnessRef = useRef<HTMLDivElement>(null);
  const utilitiesRef = useRef<HTMLDivElement>(null);
  
  // Check for user session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error checking auth status:', error);
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
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wellnessRef.current && !wellnessRef.current.contains(event.target as Node)) {
        setWellnessDropdownOpen(false);
      }
      if (utilitiesRef.current && !utilitiesRef.current.contains(event.target as Node)) {
        setUtilitiesDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdowns when route changes
  useEffect(() => {
    setWellnessDropdownOpen(false);
    setUtilitiesDropdownOpen(false);
  }, [location.pathname]);
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Determine if we need to show breadcrumbs (when in My Wellness sub-page)
  const wellnessPages = ['/dashboard', '/fitness', '/nutrition', '/my-stacks', '/recommendations'];
  const showBreadcrumbs = wellnessPages.some(path => location.pathname.startsWith(path));
  
  // Generate breadcrumb data
  const generateBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ name: 'My Wellness', path: '/dashboard' }];
    
    if (path.startsWith('/dashboard')) {
      breadcrumbs.push({ name: 'Dashboard', path: '/dashboard' });
    } else if (path.startsWith('/fitness')) {
      breadcrumbs.push({ name: 'Fitness', path: '/fitness' });
    } else if (path.startsWith('/nutrition')) {
      breadcrumbs.push({ name: 'Nutrition', path: '/nutrition' });
    } else if (path.startsWith('/my-stacks')) {
      breadcrumbs.push({ name: 'My Stacks', path: '/my-stacks' });
    } else if (path.startsWith('/recommendations')) {
      breadcrumbs.push({ name: 'Recommendations', path: '/recommendations' });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <>
      <nav className="h-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={location.pathname.includes('dark') 
                ? "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
                : "https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
              }
              alt="Biowell Logo" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
          
          {/* Main Navigation Icons */}
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={cn(
                "relative flex items-center justify-center h-12 w-12 min-w-[48px] text-gray-800 dark:text-gray-200",
                "hover:scale-105 transition-transform duration-150",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              )}
              aria-label="Home"
            >
              <Home size={20} />
              {isActive('/') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                  layoutId="activeIndicator"
                  transition={{ duration: 0.15 }}
                />
              )}
            </Link>
            
            <div ref={wellnessRef} className="relative">
              <button 
                onClick={() => setWellnessDropdownOpen(!wellnessDropdownOpen)}
                className={cn(
                  "relative flex items-center justify-center h-12 w-12 min-w-[48px] text-gray-800 dark:text-gray-200",
                  "hover:scale-105 transition-transform duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
                aria-label="My Wellness"
                aria-expanded={wellnessDropdownOpen}
              >
                <Leaf size={20} />
                {wellnessPages.some(path => isActive(path)) && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.15 }}
                  />
                )}
              </button>
              
              {/* Wellness Dropdown */}
              {wellnessDropdownOpen && (
                <motion.div 
                  className="absolute top-full left-0 right-0 w-screen bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 py-6 z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <Link to="/dashboard" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3">
                          <LayoutDashboard size={20} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Dashboard</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track your wellness</span>
                      </div>
                    </Link>
                    <Link to="/fitness" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-3">
                          <Activity size={20} className="text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Fitness</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track workouts</span>
                      </div>
                    </Link>
                    <Link to="/nutrition" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                          <Utensils size={20} className="text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Nutrition</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Log your meals</span>
                      </div>
                    </Link>
                    <Link to="/my-stacks" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                          <Package size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">My Stacks</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Supplement routines</span>
                      </div>
                    </Link>
                    <Link to="/recommendations" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                          <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Recommendations</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Personalized for you</span>
                      </div>
                    </Link>
                    <Link to="/mycoach" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-3">
                          <Sparkles size={20} className="text-pink-600 dark:text-pink-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">MyCoach</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI Health Assistant</span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
            
            <Link 
              to="/supplements"
              className={cn(
                "relative flex items-center justify-center h-12 w-12 min-w-[48px] text-gray-800 dark:text-gray-200",
                "hover:scale-105 transition-transform duration-150",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              )}
              aria-label="Supplements"
            >
              <Pill size={20} />
              {isActive('/supplements') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                  layoutId="activeIndicator"
                  transition={{ duration: 0.15 }}
                />
              )}
            </Link>
            
            <div ref={utilitiesRef} className="relative">
              <button 
                onClick={() => setUtilitiesDropdownOpen(!utilitiesDropdownOpen)}
                className={cn(
                  "relative flex items-center justify-center h-12 w-12 min-w-[48px] text-gray-800 dark:text-gray-200",
                  "hover:scale-105 transition-transform duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
                aria-label="Utilities"
                aria-expanded={utilitiesDropdownOpen}
              >
                <MoreHorizontal size={20} />
              </button>
              
              {/* Utilities Dropdown */}
              {utilitiesDropdownOpen && (
                <motion.div 
                  className="absolute top-full right-0 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/cart" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="relative">
                      <ShoppingCart size={18} className="text-gray-700 dark:text-gray-300" />
                      {cartCount > 0 && (
                        <motion.span 
                          className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 15 
                          }}
                        >
                          {cartCount}
                        </motion.span>
                      )}
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Cart</span>
                  </Link>
                  <Link to="/notifications" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Bell size={18} className="text-gray-700 dark:text-gray-300" />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Notifications</span>
                  </Link>
                  {user ? (
                    <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <User size={18} className="text-gray-700 dark:text-gray-300" />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Profile</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <User size={18} className="text-gray-700 dark:text-gray-300" />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Login</span>
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <div className="h-10 bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <ChevronRight size={16} className="mx-2 text-gray-400" />
                  )}
                  <Link 
                    to={crumb.path}
                    className={cn(
                      "hover:text-gray-900 dark:hover:text-white transition-colors",
                      index === breadcrumbs.length - 1 && "font-medium text-gray-900 dark:text-white"
                    )}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MinimalNav;