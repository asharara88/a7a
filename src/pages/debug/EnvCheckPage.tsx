import React from 'react';
import EnvChecker from '../../components/debug/EnvChecker';

const EnvCheckPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Environment Configuration
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check the status of your environment variables and API configurations
          </p>
        </div>
        
        <EnvChecker />
      </div>
    </div>
  );
};

export default EnvCheckPage;