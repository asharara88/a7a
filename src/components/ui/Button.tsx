import React from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent' | 'premium';
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
        // Base styles - sophisticated and modern
        'inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold',
        'transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none',
        'disabled:opacity-50 touch-target transform-gpu relative overflow-hidden',
        'tracking-tight antialiased',
        
        // Variants with sophisticated styling
        {
          // Default - Premium blue gradient with glass effect
          'bg-gradient-to-r from-primary-600 via-secondary-600 to-tertiary-600 text-white shadow-premium hover:shadow-premium-lg active:scale-[0.98] hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300':
            variant === 'default',
          
          // Premium - Ultra-sophisticated with multiple layers
          'bg-gradient-to-br from-primary-500 via-secondary-500 to-tertiary-500 text-white shadow-premium-xl hover:shadow-glow-lg active:scale-[0.98] hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent':
            variant === 'premium',
          
          // Accent - Neon green with glow effect
          'bg-gradient-to-r from-accent-600 to-accent-500 text-white shadow-glow hover:shadow-glow-lg active:scale-[0.98] hover:scale-[1.02] animate-pulse-glow':
            variant === 'accent',
          
          // Destructive - Sophisticated red gradient
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-premium hover:shadow-premium-lg active:scale-[0.98] hover:scale-[1.02]':
            variant === 'destructive',
          
          // Outline - Glass morphism with accent border
          'border-2 border-accent-500/30 bg-white/5 backdrop-blur-xl text-accent-600 hover:bg-accent-50 hover:border-accent-500 hover:text-accent-700 active:scale-[0.98] hover:scale-[1.02] dark:text-accent-400 dark:hover:bg-accent-950/50 dark:hover:text-accent-300':
            variant === 'outline',
          
          // Secondary - Sophisticated glass effect
          'bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-xl text-gray-900 shadow-soft hover:shadow-elegant active:scale-[0.98] hover:scale-[1.02] dark:from-gray-800/80 dark:to-gray-700/80 dark:text-gray-100':
            variant === 'secondary',
          
          // Ghost - Minimal with accent hover
          'text-gray-700 hover:bg-accent-50 hover:text-accent-700 active:scale-[0.98] hover:scale-[1.02] dark:text-gray-300 dark:hover:bg-accent-950/30 dark:hover:text-accent-300':
            variant === 'ghost',
          
          // Link - Clean with accent color
          'text-accent-600 underline-offset-4 hover:underline active:scale-[0.98] hover:scale-[1.02] dark:text-accent-400':
            variant === 'link',
        },
        
        // Sizes with mobile-optimized touch targets
        {
          'h-8 px-3 text-xs rounded-xl': size === 'xs',
          'h-10 px-4 text-sm rounded-xl': size === 'sm',
          'h-12 px-6 text-base rounded-2xl': size === 'default',
          'h-14 px-8 text-lg rounded-2xl': size === 'lg',
          'h-16 px-10 text-xl rounded-3xl': size === 'xl',
          'h-12 w-12 rounded-2xl': size === 'icon',
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