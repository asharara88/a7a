import React from 'react';
import { Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { format, formatDistanceToNow } from 'date-fns';

interface BioClockInsightProps {
  id: string;
  insightType: string;
  message: string;
  scheduledFor: string;
  onDismiss: (id: string) => void;
  onAction?: (id: string) => void;
  actionText?: string;
}

const BioClockInsight: React.FC<BioClockInsightProps> = ({ 
  id, 
  insightType, 
  message, 
  scheduledFor, 
  onDismiss,
  onAction,
  actionText = "Take Action"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-4"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {insightType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <button 
              className="ml-2 bg-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onDismiss(id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </div>
          
          <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {new Date(scheduledFor) > new Date() ? (
              `Scheduled for ${format(new Date(scheduledFor), 'h:mm a')}`
            ) : (
              `${formatDistanceToNow(new Date(scheduledFor), { addSuffix: true })}`
            )}
          </div>
          
          {onAction && (
            <div className="mt-2">
              <Button 
                size="sm"
                onClick={() => onAction(id)}
              >
                {actionText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BioClockInsight;