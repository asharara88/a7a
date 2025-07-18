

import React from 'react';

interface MinimalNavProps {
  isDarkMode: boolean;
}

const MinimalNav: React.FC<MinimalNavProps> = ({ isDarkMode }) => {
  return (
    <nav className="w-full">
      {/* Navigation content will go here */}
    </nav>
  );
};

export default MinimalNav;