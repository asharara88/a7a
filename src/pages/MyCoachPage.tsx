import React from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import MyCoach from '../components/chat/MyCoach';

const MyCoachPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <Breadcrumbs />
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">MyCoach™</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personal AI health assistant</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <MyCoach />
        </div>
      </div>
    </div>
  );
};

export default MyCoachPage;