import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useTheme = () => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // If user has explicitly set a theme, use it
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to auto
    return 'auto';
  };
  
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  // Function to determine effective theme based on current settings
  const determineEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === 'auto') {
      // Use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Otherwise use explicit user preference
    return theme as 'light' | 'dark';
  };

  // Update effective theme and apply it to the document
  useEffect(() => {
    const newEffectiveTheme = determineEffectiveTheme();
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
    
    // Update theme when system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newEffectiveTheme = determineEffectiveTheme();
      setEffectiveTheme(newEffectiveTheme);
      
      if (newEffectiveTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
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