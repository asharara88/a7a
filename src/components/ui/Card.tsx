import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'mobile';
  as?: React.ElementType;
  to?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', as, to, ...props }, ref) => {
    const Comp = as || 'div';
    
    const cardProps = {
      className: cn(
        // Base styles
        'rounded-2xl border transition-all duration-300',
        
        // Variants
        {
          // Default
          'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg':
            variant === 'default',
          
          // Glass effect
          'glass-surface border-white/20 shadow-xl backdrop-blur-glass':
            variant === 'glass',
          
          // Elevated
          'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1':
            variant === 'elevated',
          
          // Mobile optimized
          'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl p-4 sm:p-6':
            variant === 'mobile',
        },
        
        className
      ),
      ref,
      ...props,
    };

    // Handle Link component
    if (to && as) {
      return <Comp to={to} {...cardProps} />;
    }

    return <Comp {...cardProps} />;
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };