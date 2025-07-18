import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Pill, 
  Sparkles,
  MoreHorizontal, 
  ShoppingCart,
  User,
  ChevronRight,
  Utensils,
  Moon,
  Gauge,
  Package,
  Store,
  Heart,
  Brain,
  TrendingUp,
  Settings,
  LogOut
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(2);
  
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
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
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      });
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };
  
  // Define navigation sections for better organization
  const wellnessItems = [
    {
      title: 'Health Overview',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: TrendingUp, description: 'Your health overview' },
        { name: 'Health Metrics', path: '/metrics', icon: Heart, description: 'Track vital signs' }
      ]
    },
    {
      title: 'Nutrition & Diet',
      items: [
        { name: 'Nutrition Dashboard', path: '/nutrition', icon: Utensils, description: 'Track meals & macros' },
        { name: 'Recipes', path: '/recipes', icon: Utensils, description: 'Personalized recipes' },
        { name: 'Metabolism', path: '/metabolism', icon: Gauge, description: 'Glucose monitoring' }
      ]
    },
    {
      title: 'Fitness & Recovery',
      items: [
        { name: 'Fitness Tracker', path: '/fitness', icon: Activity, description: 'Workouts & progress' },
        { name: 'Sleep Analysis', path: '/sleep', icon: Moon, description: 'Sleep quality tracking' }
      ]
    }
  ];

  const supplementItems = [
    { name: 'Browse All', path: '/supplements', icon: Pill, description: 'Explore all supplements' },
    { name: 'My Stacks', path: '/my-stacks', icon: Package, description: 'Manage your stacks' },
    { name: 'Recommendations', path: '/recommendations', icon: Brain, description: 'AI-powered suggestions' },
    { name: 'Store', path: '/supplement-store', icon: Store, description: 'Shop supplements' }
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setActiveDropdown(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Determine if we're in a wellness section
  const wellnessPaths = ['/dashboard', '/fitness', '/nutrition', '/sleep', '/metrics', '/metabolism'];
  const supplementPaths = ['/supplements', '/my-stacks', '/recommendations', '/supplement-store'];
  const showBreadcrumbs = wellnessPaths.some(path => isActive(path));
  
  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ name: 'Wellness', path: '/dashboard' }];
    
    if (path.startsWith('/dashboard')) {
      breadcrumbs.push({ name: 'Dashboard', path: '/dashboard' });
    } else if (path.startsWith('/fitness')) {
      breadcrumbs.push({ name: 'Fitness', path: '/fitness' });
    } else if (path.startsWith('/nutrition')) {
      breadcrumbs.push({ name: 'Nutrition', path: '/nutrition' });
    } else if (path.startsWith('/sleep')) {
      breadcrumbs.push({ name: 'Sleep', path: '/sleep' });
    } else if (path.startsWith('/metabolism')) {
      breadcrumbs.push({ name: 'Metabolism', path: '/metabolism' });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <>
      <nav className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
              alt="Biowell Logo"
              className="h-8 w-auto object-contain dark:hidden" 
            />
            <img
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
              alt="Biowell Logo"
              className="h-8 w-auto object-contain hidden dark:block" 
            />
          </Link>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
        {user && (
              <>
                {/* Dashboard/Home */}
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "nav-icon",
                    isActive('/dashboard') && "text-primary"
                  )}
                  title="Dashboard"
                >
                  <Home size={20} />
                  {isActive('/dashboard') && (
                    <motion.div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
                
                {/* Wellness Dropdown */}
                <div ref={el => dropdownRefs.current.wellness = el} className="relative">
                  <button 
                    onClick={() => toggleDropdown('wellness')}
                    className={cn(
                      "nav-icon",
                      wellnessPaths.some(path => isActive(path)) && "text-primary"
                    )}
                    title="Wellness"
                  >
                    <Activity size={20} />
                    {wellnessPaths.some(path => isActive(path)) && (
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </button>
                  
                  {activeDropdown === 'wellness' && (
                    <motion.div 
                      className="dropdown-menu left-0"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Wellness Dashboard</h3>
                        
                        <div className="grid grid-cols-1 gap-6">
                          {wellnessItems.map((section, sectionIndex) => (
                            <div key={section.title}>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                {section.title}
                              </h4>
                              <div className="space-y-2">
                                {section.items.map((item) => {
                                  const Icon = item.icon;
                                  const brandColor = sectionIndex === 0 ? 'primary' : sectionIndex === 1 ? 'secondary' : 'tertiary';
                                  return (
                                    <Link 
                                      key={item.path}
                                      to={item.path} 
                                      className="dropdown-item"
                                    >
                                      <div className={`p-2 bg-${brandColor}/10 rounded-lg`}>
                                        <Icon size={18} className={`text-${brandColor}`} />
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Supplements Dropdown */}
                <div ref={el => dropdownRefs.current.supplements = el} className="relative">
                  <button 
                    onClick={() => toggleDropdown('supplements')}
                    className={cn(
                      "nav-icon",
                      supplementPaths.some(path => isActive(path)) && "text-primary"
                    )}
                    title="Supplements"
                  >
                    <Pill size={20} />
                    {supplementPaths.some(path => isActive(path)) && (
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </button>
                  
                  {activeDropdown === 'supplements' && (
                    <motion.div 
                      className="dropdown-menu right-0"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supplements</h3>
                        <div className="space-y-1">
                          {supplementItems.map((item, index) => {
                            const Icon = item.icon;
                            const brandColor = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
                            return (
                              <Link 
                                key={item.path}
                                to={item.path} 
                                className={`flex items-center px-3 py-2 rounded-lg hover:bg-${brandColor}/5 dark:hover:bg-${brandColor}/10 transition-colors group`}
                              >
                                <Icon size={16} className={`text-${brandColor} mr-3`} />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* AI Coach */}
                <Link 
                  to="/mycoach" 
                  className={cn(
                    "nav-icon",
                    isActive('/mycoach') && "text-primary"
                  )}
                  title="MyCoach AI"
                >
                  <Sparkles size={20} />
                  {isActive('/mycoach') && (
                    <motion.div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
                
                {/* Account Menu */}
                <div ref={el => dropdownRefs.current.account = el} className="relative">
                  <button 
                    onClick={() => toggleDropdown('account')}
                    className="nav-icon"
                    title="Account"
                  >
                    <User size={20} />
                  </button>
                  
                  {activeDropdown === 'account' && (
                    <motion.div 
                      className="dropdown-menu right-0"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4">
                        <div className="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User size={20} className="text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user?.user_metadata?.first_name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Link to="/cart" className="dropdown-item">
                            <div className="relative">
                              <ShoppingCart size={16} className="text-secondary" />
                              {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                  {cartCount}
                                </span>
                              )}
                            </div>
                            <span>Shopping Cart</span>
                          </Link>
                          
                          <Link to="/settings" className="dropdown-item">
                            <Settings size={16} className="text-tertiary" />
                            <span>Settings</span>
                          </Link>
                          
                          <button 
                            onClick={handleSignOut}
                            className="dropdown-item w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <div className="h-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <ChevronRight size={14} className="mx-2 text-gray-400" />
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
      
      <style jsx>{`
        .nav-link {
          @apply relative px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors;
        }
        
        .nav-icon {
          @apply relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200;
        }
        
        .dropdown-menu {
          @apply absolute top-full mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-w-80 max-w-96 z-50;
        }
        
        .dropdown-item {
          @apply flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors;
        }
      `}</style>
    </>
  );
};

export default MinimalNav;