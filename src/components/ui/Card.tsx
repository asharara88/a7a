import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'premium' | 'mobile';
  as?: React.ElementType;
  to?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', as, to, ...props }, ref) => {
    const Comp = as || 'div';
    
    const cardProps = {
      className: cn(
        // Base styles - sophisticated and modern
        'rounded-3xl border transition-all duration-500 ease-out relative overflow-hidden',
        
        // Variants with premium styling
        {
          // Default - Clean with subtle elevation
          'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 border-gray-200/50 dark:border-gray-700/50 shadow-soft hover:shadow-elegant':
            variant === 'default',
          
          // Glass - Premium glass morphism
          'bg-white/8 backdrop-blur-2xl border-white/12 shadow-premium-xl dark:bg-white/4 dark:border-white/8':
            variant === 'glass',
          
          // Elevated - Sophisticated floating effect
          'bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700/50 shadow-premium hover:shadow-premium-xl transform hover:-translate-y-2 hover:scale-[1.01]':
            variant === 'elevated',
          
          // Premium - Ultra-sophisticated with multiple layers
          'bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border-gradient-to-r border-gray-200/60 dark:border-gray-700/60 shadow-premium-xl hover:shadow-glow relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500':
            variant === 'premium',
          
          // Mobile - Optimized for mobile with larger touch targets
          'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 border-gray-200/50 dark:border-gray-700/50 shadow-soft hover:shadow-elegant p-5 sm:p-6 rounded-2xl sm:rounded-3xl':
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
      className={cn('flex flex-col space-y-2 p-6 pb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-base text-gray-600 dark:text-gray-400 leading-relaxed', className)}
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