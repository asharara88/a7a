import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  ChevronDown, 
  ChevronRight, 
  User, 
  Settings, 
  LogOut,
  Home,
  Activity,
  Utensils,
  Pill,
  Sparkles,
  ShoppingCart,
  Package,
  Brain,
  Store,
  TrendingUp,
  Heart,
  Gauge,
  Moon,
  Info,
  DollarSign
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  onSignOut?: () => void;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string | number;
  children?: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  isOpen, 
  onClose, 
  isLoggedIn = false,
  onSignOut
}) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close mobile nav when route changes
  React.useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  const isActive = (href: string) => {
    if (href === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === href || 
           (href !== '/' && location.pathname.startsWith(href));
  };

  // Define navigation sections
  const getNavigationSections = (): NavSection[] => {
    if (!isLoggedIn) {
      return [
        {
          title: 'Discover',
          items: [
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
          ]
        }
      ];
    }

    return [
      {
        title: 'Health Dashboard',
        items: [
          { 
            name: 'Dashboard', 
            href: '/dashboard', 
            icon: <TrendingUp className="w-5 h-5" />,
            description: 'Your health overview'
          },
          { 
            name: 'AI Coach', 
            href: '/mycoach', 
            icon: <Sparkles className="w-5 h-5" />,
            description: 'Personal AI assistant'
          }
        ]
      },
      {
        title: 'Wellness Tracking',
        items: [
          { 
            name: 'Fitness', 
            href: '/fitness', 
            icon: <Activity className="w-5 h-5" />,
            description: 'Workouts & progress'
          },
          { 
            name: 'Nutrition', 
            href: '/nutrition', 
            icon: <Utensils className="w-5 h-5" />,
            description: 'Track meals & macros'
          },
          { 
            name: 'Recipes', 
            href: '/recipes', 
            icon: <Utensils className="w-5 h-5" />,
            description: 'Personalized recipes'
          },
          { 
            name: 'Metabolism', 
            href: '/metabolism', 
            icon: <Gauge className="w-5 h-5" />,
            description: 'Glucose monitoring'
          }
        ]
      },
      {
        title: 'Supplements',
        items: [
          { 
            name: 'Browse All', 
            href: '/supplements', 
            icon: <Pill className="w-5 h-5" />,
            description: 'Explore supplements'
          },
          { 
            name: 'My Stacks', 
            href: '/my-stacks', 
            icon: <Package className="w-5 h-5" />,
            description: 'Manage your stacks'
          },
          { 
            name: 'Recommendations', 
            href: '/recommendations', 
            icon: <Brain className="w-5 h-5" />,
            description: 'AI suggestions'
          },
          { 
            name: 'Store', 
            href: '/supplement-store', 
            icon: <Store className="w-5 h-5" />,
            description: 'Shop supplements'
          },
          { 
            name: 'Cart', 
            href: '/cart', 
            icon: <ShoppingCart className="w-5 h-5" />,
            description: 'Review selections',
            badge: 2
          }
        ]
      }
    ];
  };

  const navigationSections = getNavigationSections();

  const renderNavItem = (item: NavItem) => {
    const itemIsActive = isActive(item.href);

    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center p-4 rounded-xl transition-all duration-200 group",
          itemIsActive
            ? "bg-primary/10 text-primary border border-primary/20"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <div className={cn(
          "flex-shrink-0 mr-4 p-2 rounded-lg transition-colors",
          itemIsActive 
            ? "bg-primary/20 text-primary" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
        )}>
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className={cn(
              "font-medium",
              itemIsActive ? "text-primary" : ""
            )}>
              {item.name}
            </span>
            {item.badge && (
              <span className="bg-primary text-white text-xs rounded-full px-2 py-1 font-medium">
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <p className={cn(
              "text-sm mt-1",
              itemIsActive ? "text-primary/70" : "text-gray-500 dark:text-gray-400"
            )}>
              {item.description}
            </p>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-5/6 max-w-sm bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Biowell</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation Sections */}
        <div className="p-4 space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map(renderNavItem)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          {isLoggedIn ? (
            <div className="space-y-3">
              <Link 
                to="/settings" 
                onClick={onClose}
                className="flex items-center p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">Settings</span>
              </Link>
              <button 
                onClick={() => {
                  onSignOut?.();
                  onClose();
                }}
                className="flex items-center justify-center w-full p-3 border border-red-200 dark:border-red-800 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/login" 
                onClick={onClose}
                className="flex items-center justify-center w-full p-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                <User className="w-5 h-5 mr-2" />
                Sign In
              </Link>
              <Link 
                to="/signup" 
                onClick={onClose}
                className="flex items-center justify-center w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;