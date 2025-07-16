import React from 'react';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: typeof Link;
  to?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = 'div', to, ...props }, ref) => {
    if (Component === Link && to) {
      return (
        <Link
          to={to}
          className={cn(
            "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden",
            className
          )}
          {...props}
        />
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";