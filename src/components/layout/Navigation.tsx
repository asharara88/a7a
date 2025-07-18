import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Sparkles,
  Info,
  Utensils,
  Activity,
  Pill,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  User,
  Settings,
  Package,
  Moon,
  DollarSign,
  LogIn,
  UserPlus,
  Gauge,
  Heart,
  Brain,
  TrendingUp,
  Store
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
  type?: 'main' | 'account';
  isLoggedIn?: boolean;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
  description?: string;
  badge?: string | number;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isMobile = false, 
  onItemClick,
  type = 'main',
  isLoggedIn = false
}) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close submenu when route changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  const mainNavigation: NavigationItem[] = [
    { 
      name: 'Dashboard', 
      href: '/dashboard',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Your health overview'
    },
    { 
      name: 'Wellness', 
      href: '/wellness',
      icon: <Heart className="w-5 h-5" />,
      description: 'Complete wellness tracking',
      children: [
        { 
          name: 'Fitness Tracker', 
          href: '/fitness', 
          icon: <Activity className="w-4 h-4" />,
          description: 'Workouts & progress'
        },
        { 
          name: 'Nutrition Dashboard', 
          href: '/nutrition', 
          icon: <Utensils className="w-4 h-4" />,
          description: 'Track meals & macros'
        },
        { 
          name: 'Recipes', 
          href: '/recipes', 
          icon: <Utensils className="w-4 h-4" />,
          description: 'Personalized recipes'
        },
        { 
          name: 'Metabolism', 
          href: '/metabolism', 
          icon: <Gauge className="w-4 h-4" />,
          description: 'Glucose monitoring'
        },
        { 
          name: 'Sleep Analysis', 
          href: '/sleep', 
          icon: <Moon className="w-4 h-4" />,
          description: 'Sleep quality tracking'
        }
      ]
    },
    { 
      name: 'AI Coach', 
      href: '/mycoach', 
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Your personal AI assistant'
    },
    { 
      name: 'Supplements', 
      href: '/supplements',
      icon: <Pill className="w-5 h-5" />,
      description: 'Science-backed supplements',
      children: [
        { 
          name: 'Browse All', 
          href: '/supplements', 
          icon: <Pill className="w-4 h-4" />,
          description: 'Explore all supplements'
        },
        { 
          name: 'My Stacks', 
          href: '/my-stacks', 
          icon: <Package className="w-4 h-4" />,
          description: 'Manage your stacks'
        },
        { 
          name: 'Recommendations', 
          href: '/recommendations', 
          icon: <Brain className="w-4 h-4" />,
          description: 'AI-powered suggestions'
        },
        { 
          name: 'Store', 
          href: '/supplement-store', 
          icon: <Store className="w-4 h-4" />,
          description: 'Shop supplements'
        },
        { 
          name: 'My Cart', 
          href: '/cart', 
          icon: <ShoppingCart className="w-4 h-4" />,
          description: 'Review your selections',
          badge: 2
        }
      ]
    }
  ];
  
  const accountNavigation: NavigationItem[] = [
    { 
      name: 'Account Settings', 
      href: '/settings', 
      icon: <Settings className="w-5 h-5" />,
      description: 'Manage your preferences',
      children: [
        { 
          name: 'Profile', 
          href: '/settings#profile', 
          icon: <User className="w-4 h-4" />,
          description: 'Personal information'
        },
        { 
          name: 'Preferences', 
          href: '/settings#preferences', 
          icon: <Settings className="w-4 h-4" />,
          description: 'App settings'
        },
        { 
          name: 'About', 
          href: '/about', 
          icon: <Info className="w-4 h-4" />,
          description: 'Learn about Biowell'
        }
      ]
    }
  ];

  // Define navigation items based on authentication state
  const getNavigationItems = (): NavigationItem[] => {
    if (!isLoggedIn) {
      if (type === 'main') {
        return [
          { 
            name: 'Home', 
            href: '/', 
            icon: <Home className="w-5 h-5" />,
            description: 'Welcome to Biowell'
          },
          { 
            name: 'About', 
            href: '/about', 
            icon: <Info className="w-5 h-5" />,
            description: 'Learn about our mission'
          },
          { 
            name: 'Pricing', 
            href: '/pricing', 
            icon: <DollarSign className="w-5 h-5" />,
            description: 'Choose your plan'
          }
        ];
      } else {
        return [
          { 
            name: 'Get Started', 
            href: '/signup', 
            icon: <UserPlus className="w-5 h-5" />,
            description: 'Create your account',
            children: [
              { 
                name: 'Sign Up', 
                href: '/signup', 
                icon: <UserPlus className="w-4 h-4" />,
                description: 'Create new account'
              },
              { 
                name: 'Login', 
                href: '/login', 
                icon: <LogIn className="w-4 h-4" />,
                description: 'Access existing account'
              }
            ]
          }
        ];
      }
    }
    
    // Return the default navigation for logged-in users
    if (type === 'main') {
      return mainNavigation;
    } else {
      return accountNavigation;
    }
  };
  
  // Get the navigation items based on authentication state
  const navigation = getNavigationItems();

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  const isActive = (item: NavigationItem) => {
    if (item.href === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === item.href || 
           (item.href !== '/' && location.pathname.startsWith(item.href)) ||
           (item.children?.some(child => 
             location.pathname === child.href || 
             (child.href !== '/' && location.pathname.startsWith(child.href))
           ));
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item);
    const isSubmenuOpen = openSubmenu === item.name || 
                         (hasChildren && item.children?.some(child => isActive({ ...child, children: [] })));

    return (
      <div key={item.name} className={cn(
        "w-full",
        depth > 0 && "ml-4"
      )}>
        <div className="flex flex-col w-full">
          <div className={cn(
            "group flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200",
            isItemActive 
              ? "bg-primary/10 text-primary border border-primary/20" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
            hasChildren && "cursor-pointer",
            isMobile ? "text-base" : "text-sm"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleSubmenu(item.name);
            } else if (onItemClick) {
              onItemClick();
            }
          }}
          >
            <div className="flex items-center flex-1 min-w-0">
              <Link 
                to={item.href}
                className="flex items-center flex-1 min-w-0"
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSubmenu(item.name);
                  } else if (onItemClick) {
                    onItemClick();
                  }
                }}
              >
                <div className={cn(
                  "flex-shrink-0 mr-3 p-2 rounded-lg transition-colors",
                  isItemActive 
                    ? "bg-primary/20 text-primary" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                )}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className={cn(
                      "font-medium truncate",
                      isItemActive ? "text-primary" : ""
                    )}>
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className={cn(
                      "text-xs mt-0.5 truncate",
                      isItemActive ? "text-primary/70" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            </div>
            
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSubmenu(item.name);
                }}
                className={cn(
                  "p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors",
                  isItemActive ? "text-primary" : "text-gray-400"
                )}
              >
                {isSubmenuOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          
          {hasChildren && isSubmenuOpen && (
            <div className="mt-2 ml-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              {item.children?.map(child => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className={cn(
      "flex flex-col space-y-2",
      isMobile ? "w-full p-2" : "hidden md:flex md:space-x-8 md:flex-row md:space-y-0"
    )}>
      {navigation.map(item => renderNavItem(item))}
    </nav>
  );
};

export default Navigation;