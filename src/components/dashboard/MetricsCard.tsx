import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'tertiary' | 'purple' | 'yellow';
  onClick?: () => void;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  onClick
}) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary',
    secondary: 'from-secondary/20 to-secondary/5 text-secondary',
    tertiary: 'from-tertiary/20 to-tertiary/5 text-tertiary',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-500',
    yellow: 'from-yellow-500/20 to-yellow-500/5 text-yellow-500',
  };

  const changeColor = change.type === 'increase' 
    ? 'text-green-600 dark:text-green-400' 
    : change.type === 'decrease' 
      ? 'text-red-600 dark:text-red-400'
      : 'text-gray-600 dark:text-gray-400';

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-5 cursor-pointer transition-all duration-300",
        colorClasses[color],
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white tracking-wide">{value}</p>
          <div className={`flex items-center mt-1 ${changeColor}`}>
            {change.type === 'increase' ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : change.type === 'decrease' ? (
              <ArrowDown className="w-4 h-4 mr-1" />
            ) : null}
            <span className="text-sm font-medium">{Math.abs(change.value)}%</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;