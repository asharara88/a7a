import React from 'react';
import { Card } from '../ui/Card';
import { Target, Award, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const FitnessGoals: React.FC = () => {
  // Mock goals data
  const goals = [
    {
      id: '1',
      title: 'Increase daily step count',
      description: 'Walk at least 10,000 steps per day',
      target: 10000,
      current: 8400,
      unit: 'steps',
      endDate: '2025-08-15',
      progress: 84
    },
    {
      id: '2',
      title: 'Complete weekly workouts',
      description: 'Do 4 strength training sessions per week',
      target: 4,
      current: 3,
      unit: 'workouts',
      endDate: '2025-08-10',
      progress: 75
    },
    {
      id: '3',
      title: 'Build core strength',
      description: 'Increase plank hold time to 2 minutes',
      target: 120,
      current: 90,
      unit: 'seconds',
      endDate: '2025-09-01',
      progress: 75
    }
  ];

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
            <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fitness Goals</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
        >
          <TrendingUp className="w-4 h-4 mr-1.5" /> Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <div 
            key={goal.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  goal.progress >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  goal.progress >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {goal.progress}%
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {goal.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="h-2 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>{new Date(goal.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <button className="text-primary hover:text-primary-dark font-medium flex items-center">
                    Update <CheckCircle className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FitnessGoals;