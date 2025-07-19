import React from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs' | 'xl';
  asChild?: boolean;
  as?: React.ElementType;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, as, to, ...props }, ref) => {
    const Comp = asChild ? Slot : (as || 'button');
    
    const buttonProps = {
      className: cn(
        // Base styles
        'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium',
        'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none',
        'disabled:opacity-50 touch-target transform-gpu',
        
        // Variants
        {
          // Default - Primary blue gradient
          'bg-gradient-to-r from-primary via-secondary to-tertiary text-white shadow-lg hover:shadow-xl hover:scale-102 active:scale-98':
            variant === 'default',
          
          // Destructive
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-102 active:scale-98':
            variant === 'destructive',
          
          // Outline
          'border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/40 hover:scale-102 active:scale-98':
            variant === 'outline',
          
          // Secondary
          'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100':
            variant === 'secondary',
          
          // Ghost
          'text-primary hover:bg-primary/10 hover:scale-102 active:scale-98':
            variant === 'ghost',
          
          // Link
          'text-primary underline-offset-4 hover:underline hover:scale-102 active:scale-98':
            variant === 'link',
          
          // Accent - Neon green
          'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 animate-pulse-glow':
            variant === 'accent',
        },
        
        // Sizes
        {
          'h-8 px-3 text-xs': size === 'xs',
          'h-9 px-3': size === 'sm',
          'h-12 px-6': size === 'default',
          'h-14 px-8 text-base': size === 'lg',
          'h-16 px-10 text-lg': size === 'xl',
          'h-12 w-12': size === 'icon',
        },
        
        className
      ),
      ref,
      ...props,
    };

    // Handle Link component
    if (to && as) {
      return <Comp to={to} {...buttonProps} />;
    }

    return <Comp {...buttonProps} />;
  }
);

Button.displayName = 'Button';

export { Button };