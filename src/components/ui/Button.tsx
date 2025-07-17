import React from 'react';
import { Link } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-tertiary to-secondary text-white hover:opacity-90 shadow-sm hover:shadow-md border border-transparent",
        destructive: "bg-error text-white hover:bg-red-700 shadow-sm hover:shadow-md border border-transparent",
        outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white",
        secondary: "bg-gradient-to-r from-secondary via-tertiary to-primary text-white hover:opacity-90 shadow-sm hover:shadow-md border border-transparent",
        tertiary: "bg-tertiary text-white hover:bg-tertiary-dark shadow-sm hover:shadow-md border border-transparent",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white text-gray-900 dark:text-white border border-transparent",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark shadow-none",
      },
      size: {
        default: "h-10 py-2 px-5 text-sm",
        sm: "h-9 px-3 text-xs py-1.5",
        lg: "h-12 px-8 text-base py-2.5",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  to?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as: Component = 'button', to, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size }), className);
    
    if (Component === Link && to) {
      return (
        <Link
          to={to}
          className={buttonClasses}
          {...props}
        />
      );
    }
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";