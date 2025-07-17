import React from 'react';
import { Link } from 'react-router-dom';
import FitnessTracker from '../components/fitness/FitnessTracker';
import { ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';

const FitnessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fitness</h1>
          <Link 
            to="/dashboard" 
            className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
          >
            Back to Wellness Dashboard <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Track your workouts and monitor your progress as part of your wellness journey</p>
        
        <FitnessTracker />
        
        {/* Related Wellness Features */}
        <div className="mt-10 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Wellness Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Nutrition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Track your daily nutrition and meals to complement your fitness goals.
              </p>
              <Link 
                to="/nutrition" 
                className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
              >
                View Nutrition <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
            <Card className="p-5 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Sleep</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Monitor your sleep quality to ensure proper recovery after workouts.
              </p>
              <Link 
                to="/dashboard" 
                className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
              >
                View Sleep Data <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
            <Card className="p-5 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Supplements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Find supplements to support your fitness and recovery goals.
              </p>
              <Link 
                to="/recommendations" 
                className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
              >
                View Recommendations <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;