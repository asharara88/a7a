import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

const pathMapping: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/mycoach': 'MyCoach™',
  '/supplements': 'Supplements',
  '/supplements/recommendations': 'Recommendations',
  '/my-stacks': 'My Stacks',
  '/cart': 'Cart',
  '/bioclock': 'MyBio',
  '/nutrition': 'Food Logging',
  '/nutrition/myplate': 'MyPlate',
  '/nutrition/dashboard': 'Nutrition Dashboard',
  '/fitness': 'Fitness',
  '/recipes': 'Recipes',
  '/recipes/saved': 'Saved Recipes',
  '/metabolism': 'Metabolism',
  '/about': 'About'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || pathSegments.length === 0) {
    return null;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/dashboard', icon: Home }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = pathMapping[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ name, href: currentPath });
  });

  // Don't show if only one item (home)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
          )}
          <Link
            to={breadcrumb.href}
            className={cn(
              "flex items-center px-2 py-1 rounded-md transition-colors",
              index === breadcrumbs.length - 1
                ? "text-gray-900 dark:text-white font-medium cursor-default"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {index === 0 && breadcrumb.icon && (
              <breadcrumb.icon className="w-4 h-4 mr-1" />
            )}
            <span>{breadcrumb.name}</span>
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;