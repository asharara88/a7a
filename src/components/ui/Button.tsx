
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
  as?: typeof Link;
  to?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "default", 
  size = "default",
  as: Component = "button",
  to,
  loading = false,
  className = "",
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none touch-target";
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:scale-105",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105",
    ghost: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm min-h-[36px]",
    default: "h-12 py-3 px-6 text-base min-h-[48px]",
    lg: "h-14 px-8 text-lg min-h-[56px]"
  };
  
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  
  const buttonProps = {
    className: classes,
    disabled: disabled || loading,
    ...props
  };
  
  if (Component === Link && to) {
    return (
      <Link to={to} className={classes}>
        {loading && <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </Link>
    );
  }
  
  return (
    <button {...buttonProps}>
      {loading && <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};