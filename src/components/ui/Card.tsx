import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: typeof Link;
  to?: string;
  variant?: 'default' | 'outline' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = 'div', to, variant = 'default', ...props }, ref) => {
    const cardStyles = cn(
      "rounded-xl overflow-hidden transition-all duration-300",
      variant === 'default' && "bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700",
      variant === 'outline' && "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md",
      variant === 'elevated' && "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700",
      className
    );
    
    if (Component === Link && to) {
      return (
        <Link
          to={to}
          className={cardStyles}
          {...props}
        />
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardStyles}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";