import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  message,
  icon,
  actionText,
  onAction,
  onDismiss,
  variant = 'default',
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) setTimeout(onDismiss, 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-500 dark:border-green-500';
      case 'error':
        return 'border-red-500 dark:border-red-500';
      case 'warning':
        return 'border-yellow-500 dark:border-yellow-500';
      case 'info':
        return 'border-blue-500 dark:border-blue-500';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white dark:bg-gray-800 shadow-lg border-l-4 rounded-lg max-w-sm w-full",
        getVariantStyles()
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          {icon && (
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onDismiss) setTimeout(onDismiss, 300);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
            {actionText && onAction && (
              <div className="mt-3">
                <button
                  onClick={() => {
                    onAction();
                    setIsVisible(false);
                    if (onDismiss) setTimeout(onDismiss, 300);
                  }}
                  className="text-sm font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light"
                >
                  {actionText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;