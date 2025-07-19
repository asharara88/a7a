import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'premium' | 'mobile'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, variant = 'default', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 tracking-tight">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            // Base styles - sophisticated and modern
            "flex w-full rounded-2xl border bg-white/95 backdrop-blur-sm px-4 py-4 text-base font-medium",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-gray-700 dark:bg-gray-900/95 dark:text-white",
            "transition-all duration-300 ease-out",
            "shadow-soft hover:shadow-elegant focus:shadow-premium",
            "touch-manipulation antialiased tracking-tight",
            
            // Variants
            {
              // Default - Clean and professional
              "border-gray-200 dark:border-gray-700 h-12":
                variant === 'default',
              
              // Premium - Glass morphism with enhanced styling
              "border-gray-200/50 dark:border-gray-700/50 bg-white/8 dark:bg-gray-900/8 backdrop-blur-xl h-14 text-lg":
                variant === 'premium',
              
              // Mobile - Optimized for mobile with larger touch targets
              "border-gray-200 dark:border-gray-700 h-12 sm:h-14 text-base sm:text-lg rounded-xl sm:rounded-2xl":
                variant === 'mobile',
            },
            
            // Error state
            error && "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/50 dark:bg-red-950/20",
            
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }