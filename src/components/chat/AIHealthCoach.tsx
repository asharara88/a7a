import React from 'react';
import MyCoach from './MyCoach';

// This component serves as an alias/wrapper for MyCoach
// to maintain compatibility with any existing references
const AIHealthCoach: React.FC = () => {
  return <MyCoach />;
};

export default AIHealthCoach;