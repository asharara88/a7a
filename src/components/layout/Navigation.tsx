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
  Moon
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
      name: 'Home', 
      href: '/',
      icon: <Home className="w-4 h-4" />,
      children: [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Fitness', href: '/fitness', icon: <Activity className="w-4 h-4" /> },
        { name: 'Nutrition', href: '/nutrition', icon: <Utensils className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'MyCoach', 
      href: '/mycoach', 
      icon: <Sparkles className="w-5 h-5" /> 
    },
    { 
      name: 'Personalized Supplements', 
      href: '/supplements', 
      icon: null,
      children: [
        { name: 'My Stacks', href: '/my-stacks', icon: null },
        { name: 'Recommendations', href: '/recommendations', icon: null },
        { name: 'Supplement Store', href: '/supplement-store', icon: null },
        { name: 'All Supplements', href: '/supplements', icon: null },
        { name: 'My Cart', href: '/cart', icon: null }
      ]
    }
  ];
  
  const accountNavigation: NavigationItem[] = [
    { 
      name: 'Account', 
      href: '/login', 
      icon: <User className="w-5 h-5" />,
      children: [
        { name: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
        { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
        { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> }
      ]
    }
  ];
  
  const navigation = type === 'main' ? mainNavigation : accountNavigation;

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  const isActive = (item: NavigationItem) => {
    if (item.href === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === item.href || 
           (item.href !== '/' && location.pathname.startsWith(item.href)) ||
           (item.children?.some(child => location.pathname === child.href || 
                                        (child.href !== '/' && location.pathname.startsWith(child.href))));
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item);
    const isSubmenuOpen = openSubmenu === item.name || 
                         (hasChildren && item.children?.some(child => isActive(child)));

    return (
      <div key={item.name} className={cn(
        "w-full",
        depth > 0 && "pl-4"
      )}>
        <div className="flex flex-col w-full">
          <div className={cn(
            "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors",
            isItemActive 
              ? "text-primary font-medium" 
              : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
            hasChildren && "cursor-pointer"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleSubmenu(item.name);
            } else if (onItemClick) {
              onItemClick();
            }
          }}
          >
            <Link 
              to={item.href}
              className="flex items-center flex-1 tracking-wide"
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
              {item.icon && <span className="mr-3">{item.icon}</span>}
              <span>{item.name}</span>
            </Link>
            
            {hasChildren && (
  // Define navigation items based on authentication state
  const getNavigationItems = (): NavigationItem[] => {
    if (!isLoggedIn) {
      if (type === 'main') {
        return [
          { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
          { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
          { name: 'Pricing', href: '/pricing', icon: <DollarSign className="w-4 h-4" /> }
        ];
      } else {
        return [
          { 
            name: 'Account', 
            href: '/login', 
            icon: <User className="w-5 h-5" />,
            children: [
              { name: 'Login', href: '/login', icon: <LogIn className="w-4 h-4" /> },
              { name: 'Sign Up', href: '/signup', icon: <UserPlus className="w-4 h-4" /> }
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
                 e.preventDefault();
  // Get the navigation items based on authentication state
  const navigation = getNavigationItems();
    );
  return (
    <nav className={cn(
      "flex flex-col space-y-1",
      isMobile ? "w-full" : "hidden md:flex md:space-x-8 md:flex-row md:space-y-0"
    )}>
      {navigation.map(item => renderNavItem(item))}
    </nav>
  );
};

export default Navigation;