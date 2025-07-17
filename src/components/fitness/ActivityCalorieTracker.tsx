import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { fitnessApi } from '../../api/fitnessApi';
import { nutritionApi } from '../../api/nutritionApi';
import { Flame, Utensils, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

interface ActivityCalorieTrackerProps {
  userId: string;
  date?: string; // ISO string format
}

const ActivityCalorieTracker: React.FC<ActivityCalorieTrackerProps> = ({ 
  userId,
  date = new Date().toISOString().split('T')[0]
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [bmr, setBmr] = useState(1800); // Default BMR value
  const [exerciseCalories, setExerciseCalories] = useState(0);
  const [foodCalories, setFoodCalories] = useState(0);
  const [calorieDeficit, setCalorieDeficit] = useState(0);

  // Mock user ID - using null to avoid UUID validation errors
  const mockUserId = null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get workout data for the day
        const workouts = await fitnessApi.getWorkoutHistory(mockUserId, 1);
        const todayWorkouts = workouts.filter(w => 
          new Date(w.timestamp).toISOString().split('T')[0] === date
        );
        
        const exerciseCals = todayWorkouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
        setExerciseCalories(exerciseCals);
        
        // Get nutrition data for the day
        const nutritionSummary = await nutritionApi.getNutritionSummary(mockUserId, 1);
        setFoodCalories(nutritionSummary.totalCalories);
        
        // Calculate caloric deficit or surplus
        const totalBurn = bmr + exerciseCals;
        setCalorieDeficit(foodCalories - totalBurn);
        
      } catch (err) {
        console.error('Error fetching activity data:', err);
        setError('Failed to load activity data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [userId, date, bmr, foodCalories]);

  // Prepare data for chart
  const chartData = {
    labels: ['Calories In', 'Calories Out'],
    datasets: [
      {
        label: 'Food',
        data: [foodCalories, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'BMR (Non-Exercise)',
        data: [0, bmr],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Exercise',
        data: [0, exerciseCalories],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      }
    }
  };

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Balance</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <Utensils className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Calories In</p>
              <p className="text-xl font-bold">{foodCalories}</p>
            </div>
            
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Calories Out</p>
              <p className="text-xl font-bold">{bmr + exerciseCalories}</p>
            </div>
            
            <div className={`p-3 ${calorieDeficit > 0 
              ? 'bg-yellow-50 dark:bg-yellow-900/20' 
              : 'bg-green-50 dark:bg-green-900/20'} 
              rounded-lg text-center`}>
              <div className="flex justify-center mb-1">
                {calorieDeficit > 0 ? (
                  <TrendingUp className="h-5 w-5 text-yellow-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {calorieDeficit > 0 ? 'Caloric Surplus' : 'Caloric Deficit'}
              </p>
              <p className="text-xl font-bold">{Math.abs(calorieDeficit)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium mb-2">Caloric Breakdown</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Basal Metabolic Rate (BMR)</span>
                  <span className="font-medium">{bmr} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Exercise Activity</span>
                  <span className="font-medium">{exerciseCalories} cal</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Total Calories Out</span>
                  <span className="font-medium">{bmr + exerciseCalories} cal</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-medium">Total Calories In (Food)</span>
                  <span className="font-medium">{foodCalories} cal</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium">
                    {calorieDeficit > 0 ? 'Surplus' : 'Deficit'}
                  </span>
                  <span className={`font-medium ${calorieDeficit > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                    {Math.abs(calorieDeficit)} cal
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Calories In vs Out</p>
              <div className="h-40">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Insights</p>
            <p className="text-gray-600 dark:text-gray-400">
              {calorieDeficit > 500 
                ? "You're in a significant caloric surplus. This is ideal for muscle building, but may lead to fat gain if sustained long-term."
                : calorieDeficit > 0
                ? "You're in a slight caloric surplus, which is good for muscle building or maintenance."
                : calorieDeficit < -500
                ? "You're in a significant caloric deficit. Good for weight loss, but ensure adequate nutrition."
                : "You're in a slight caloric deficit, which is ideal for gradual weight loss while preserving muscle mass."
              }
            </p>
          </div>
        </>
      )}
    </Card>
  );
};

export default ActivityCalorieTracker;