import React from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Appearance</h3>
      
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Choose how Biowell looks to you. Select a theme preference.
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl border transition-all",
              "hover:border-gray-400 dark:hover:border-gray-600",
              theme === 'light' 
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700" 
                : "border-gray-200 dark:border-gray-700"
            )}
          >
            <Sun className={cn(
              "w-8 h-8 mb-3",
              theme === 'light' ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
            )} />
            <span className="font-medium text-gray-900 dark:text-white">Light</span>
            
            {theme === 'light' && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </div>
            )}
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl border transition-all",
              "hover:border-gray-400 dark:hover:border-gray-600",
              theme === 'dark' 
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700" 
                : "border-gray-200 dark:border-gray-700"
            )}
          >
            <Moon className={cn(
              "w-8 h-8 mb-3",
              theme === 'dark' ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
            )} />
            <span className="font-medium text-gray-900 dark:text-white">Dark</span>
            
            {theme === 'dark' && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </div>
            )}
          </button>
          
          <button
            onClick={() => setTheme('auto')}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl border transition-all",
              "hover:border-gray-400 dark:hover:border-gray-600",
              theme === 'auto' 
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700" 
                : "border-gray-200 dark:border-gray-700"
            )}
          >
            <Monitor className={cn(
              "w-8 h-8 mb-3",
              theme === 'auto' ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
            )} />
            <span className="font-medium text-gray-900 dark:text-white">Auto</span>
            
            {theme === 'auto' && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </div>
            )}
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Auto</span> will match your system's appearance settings. 
            <span className="font-medium"> Light</span> and <span className="font-medium"> Dark</span> 
            will override your system preferences.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;