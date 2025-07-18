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
      <nav className="h-16 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
              alt="Biowell Logo"
              className="h-10 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform duration-300" 
            />
            <img
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
              alt="Biowell Logo"
              className="h-10 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-1">
        {user && (
              <>
                {/* Dashboard/Home */}
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 group",
                    isActive('/dashboard') && "text-primary"
                  )}
                  title="Dashboard"
                >
                  <Home size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  {isActive('/dashboard') && (
                    <motion.div 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
                
                {/* Wellness Dropdown */}
                <div ref={el => dropdownRefs.current.wellness = el} className="relative">
                  <button 
                    onClick={() => toggleDropdown('wellness')}
                    className={cn(
                      "relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-300 group",
                      wellnessPaths.some(path => isActive(path)) && "text-primary"
                    )}
                    title="Wellness"
                  >
                    <Activity size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    {wellnessPaths.some(path => isActive(path)) && (
                      <motion.div 
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full shadow-lg"
                        layoutId="activeIndicator"
                      />
                    )}
                  </button>
                  
                  {activeDropdown === 'wellness' && (
                    <motion.div 
                      className="absolute left-0 top-full mt-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 min-w-80 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Wellness Dashboard</h3>
                        
                        <div className="grid grid-cols-1 gap-8">
                          {wellnessItems.map((section, sectionIndex) => (
                            <div key={section.title}>
                              <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                {section.title}
                              </h4>
                              <div className="space-y-3">
                                {section.items.map((item) => {
                                  const Icon = item.icon;
                                  const brandColor = sectionIndex === 0 ? 'primary' : sectionIndex === 1 ? 'secondary' : 'tertiary';
                                  return (
                                    <Link 
                                      key={item.path}
                                      to={item.path} 
                                      className="flex items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                                    >
                                      <div className={`p-3 bg-gradient-to-br ${
                                        brandColor === 'primary' ? 'from-primary/20 to-primary/10' :
                                        brandColor === 'secondary' ? 'from-secondary/20 to-secondary/10' :
                                        'from-tertiary/20 to-tertiary/10'
                                      } rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={20} className={`${
                                          brandColor === 'primary' ? 'text-primary' :
                                          brandColor === 'secondary' ? 'text-secondary' :
                                          'text-tertiary'
                                        }`} />
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
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
                      "relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-tertiary hover:bg-tertiary/10 rounded-xl transition-all duration-300 group",
                      supplementPaths.some(path => isActive(path)) && "text-primary"
                    )}
                    title="Supplements"
                  >
                    <Pill size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    {supplementPaths.some(path => isActive(path)) && (
                      <motion.div 
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-tertiary rounded-full shadow-lg"
                        layoutId="activeIndicator"
                      />
                    )}
                  </button>
                  
                  {activeDropdown === 'supplements' && (
                    <motion.div 
                      className="absolute right-0 top-full mt-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 min-w-64 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Supplements</h3>
                        <div className="space-y-2">
                          {supplementItems.map((item, index) => {
                            const Icon = item.icon;
                            const brandColor = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
                            return (
                              <Link 
                                key={item.path}
                                to={item.path} 
                                className={`flex items-center p-3 rounded-xl ${
                                  brandColor === 'primary' ? 'hover:bg-primary/10' :
                                  brandColor === 'secondary' ? 'hover:bg-secondary/10' :
                                  'hover:bg-tertiary/10'
                                } transition-all duration-300 group`}
                              >
                                <div className={`p-2 ${
                                  brandColor === 'primary' ? 'bg-primary/20' :
                                  brandColor === 'secondary' ? 'bg-secondary/20' :
                                  'bg-tertiary/20'
                                } rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300`}>
                                  <Icon size={16} className={`${
                                    brandColor === 'primary' ? 'text-primary' :
                                    brandColor === 'secondary' ? 'text-secondary' :
                                    'text-tertiary'
                                  }`} />
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
                    </motion.div>
                  )}
                </div>
                
                {/* AI Coach */}
                <Link 
                  to="/mycoach" 
                  className={cn(
                    "relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 group",
                    isActive('/mycoach') && "text-primary"
                  )}
                  title="MyCoach AI"
                >
                  <Sparkles size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  {isActive('/mycoach') && (
                    <motion.div 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
                
                {/* Account Menu */}
                <div ref={el => dropdownRefs.current.account = el} className="relative">
                  <button 
                    onClick={() => toggleDropdown('account')}
                    className="relative flex items-center justify-center h-12 w-12 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group"
                    title="Account"
                  >
                    <User size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  
                  {activeDropdown === 'account' && (
                    <motion.div 
                      className="absolute right-0 top-full mt-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 min-w-72 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                            <User size={22} className="text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-gray-900 dark:text-white">
                              {user?.user_metadata?.first_name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Link to="/cart" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group">
                            <div className="relative">
                              <div className="p-2 bg-secondary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <ShoppingCart size={16} className="text-secondary" />
                              </div>
                              {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                                  {cartCount}
                                </span>
                              )}
                            </div>
                            <span className="font-medium">Shopping Cart</span>
                          </Link>
                          
                          <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group">
                            <div className="p-2 bg-tertiary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <Settings size={16} className="text-tertiary" />
                            </div>
                            <span className="font-medium">Settings</span>
                          </Link>
                          
                          <button 
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 p-3 rounded-xl w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
                          >
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <LogOut size={16} />
                            </div>
                            <span className="font-medium">Sign Out</span>
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
        <div className="h-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-medium">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <ChevronRight size={14} className="mx-3 text-gray-400" />
                  )}
                  <Link 
                    to={crumb.path}
                    className={cn(
                      "hover:text-primary transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
                      index === breadcrumbs.length - 1 && "font-bold text-gray-900 dark:text-white"
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