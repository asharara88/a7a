import React from 'react';
import { Link } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg border border-transparent",
        destructive: "bg-error text-white hover:bg-red-600 shadow-md hover:shadow-lg border border-transparent",
        outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white hover:border-gray-400 dark:hover:border-gray-500",
        secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg border border-transparent",
        tertiary: "bg-tertiary text-white hover:bg-tertiary-dark shadow-md hover:shadow-lg border border-transparent",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white text-gray-900 dark:text-white border border-transparent",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark shadow-none",
      },
      size: {
        default: "h-11 py-2.5 px-7 text-sm",
        sm: "h-9 px-5 text-xs py-2",
        lg: "h-13 px-9 text-base py-3.5",
        icon: "h-11 w-11 p-2.5",
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