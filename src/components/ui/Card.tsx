import React from 'react';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: typeof Link;
  to?: string;
  variant?: 'default' | 'outline' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = 'div', to, variant = 'default', ...props }, ref) => {
    const cardStyles = cn(
      "rounded-lg overflow-hidden transition-all duration-200",
      variant === 'default' && "bg-white dark:bg-gray-800 shadow-md",
      variant === 'outline' && "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      variant === 'elevated' && "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
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