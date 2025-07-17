import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Utensils, 
  BookOpen, 
  Activity, 
  Pill, 
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  User,
  Settings
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

const Navigation: React.FC<{
  isMobile?: boolean;
  onItemClick?: () => void;
}> = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close submenu when route changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  const navigation: NavigationItem[] = [
    { 
      name: 'Home', 
      href: '/', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      name: 'Nutrition', 
      href: '/nutrition', 
      icon: <Utensils className="w-5 h-5" />,
      children: [
        { name: 'Meal Tracker', href: '/nutrition', icon: <Utensils className="w-4 h-4" /> },
        { name: 'Dashboard', href: '/nutrition/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'Recipes', 
      href: '/recipes', 
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        { name: 'Browse Recipes', href: '/recipes', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Saved Recipes', href: '/saved-recipes', icon: <BookOpen className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'Fitness', 
      href: '/fitness', 
      icon: <Activity className="w-5 h-5" /> 
    },
    { 
      name: 'Supplements', 
      href: '/supplements', 
      icon: <Pill className="w-5 h-5" />,
      children: [
        { name: 'All Supplements', href: '/supplements', icon: <Pill className="w-4 h-4" /> },
        { name: 'My Cart', href: '/cart', icon: <ShoppingCart className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      name: 'Account', 
      href: '/login', 
      icon: <User className="w-5 h-5" />,
      children: [
        { name: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
        { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
        { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> }
      ]
    },
  ];

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
              ? "text-primary bg-primary/10 dark:bg-primary/20 font-medium" 
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
              className="flex items-center flex-1"
              onClick={(e) => {
                if (hasChildren) {
                  e.preventDefault();
                } else if (onItemClick) {
                  onItemClick();
                }
              }}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
            
            {hasChildren && (
              <span className="ml-2">
                {isSubmenuOpen ? 
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" /> : 
                  <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                }
              </span>
            )}
          </div>
          
          {hasChildren && isSubmenuOpen && (
            <div className="mt-1 mb-1 space-y-1 animate-slideDown">
              {item.children.map(child => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className={cn(
      "flex flex-col space-y-1",
      isMobile ? "w-full" : "hidden md:flex md:space-x-6 md:flex-row md:space-y-0"
    )}>
      {navigation.map(item => renderNavItem(item))}
    </nav>
  );
};

export default Navigation;