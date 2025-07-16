import React from 'react';
import NutritionTracker from '../components/nutrition/NutritionTracker';

const NutritionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nutrition</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your meals and monitor your nutrition</p>
        </div>
        
        <NutritionTracker />
      </div>
    </div>
  );
};

export default NutritionPage;