import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useTheme = () => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // If user has explicitly set a theme, use it
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to auto theme
    return 'auto';
  };
  
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  // Function to determine effective theme based on current settings
  const determineEffectiveTheme = (currentTheme = theme): 'light' | 'dark' => {
    if (currentTheme === 'auto') {
      // Check if it's daytime based on current hour
      const currentHour = new Date().getHours();
      const isDayTime = currentHour >= 6 && currentHour < 20; // 6 AM to 8 PM
      
      // During day, use light theme; at night, use dark theme
      // This overrides system preference to focus on time of day
      return isDayTime ? 'light' : 'dark';
    }
    
    // Otherwise use explicit user preference
    return currentTheme as 'light' | 'dark';
  };

  // Update effective theme and apply it to the document
  useEffect(() => {
    const newEffectiveTheme = determineEffectiveTheme(theme);
    setEffectiveTheme(newEffectiveTheme);
    
    if (newEffectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system preference changes if in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;
    
    // Set up a timer to check the time every hour for auto theme
    const timer = setInterval(() => {
      const newEffectiveTheme = determineEffectiveTheme('auto');
      setEffectiveTheme(newEffectiveTheme);
    
      if (newEffectiveTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, 60 * 60 * 1000); // Check every hour
    
    return () => {
      clearInterval(timer);
    };
  }, [theme]);

  // Function to set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    effectiveTheme,
    setTheme,
  };
};