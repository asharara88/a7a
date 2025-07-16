import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-md hover:shadow-lg",
        destructive: "bg-error text-white hover:bg-red-700 shadow-sm hover:shadow",
        outline: "border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
        secondary: "bg-gradient-to-r from-secondary to-primary text-white hover:opacity-90 shadow-md hover:shadow-lg",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 text-gray-700 dark:text-gray-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
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
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";