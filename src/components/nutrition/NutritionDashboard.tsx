import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, TrendingUp, Apple, Salad } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionDashboard: React.FC = () => {
  // Mock data for the dashboard
  const dailyIntake = {
    calories: 1850,
    calorieGoal: 2200,
    protein: 95,
    proteinGoal: 120,
    carbs: 210,
    carbsGoal: 250,
    fat: 65,
    fatGoal: 73
  };
  
  const recentMeals = [
    { id: 1, name: 'Breakfast', time: '8:30 AM', calories: 420 },
    { id: 2, name: 'Lunch', time: '12:45 PM', calories: 650 },
    { id: 3, name: 'Snack', time: '3:30 PM', calories: 180 }
  ];
  
  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [dailyIntake.protein * 4, dailyIntake.carbs * 4, dailyIntake.fat * 9],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mb-2">
              <Utensils className="w-5 h-5 text-blue-500 dark:text-blue-300" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
            <div className="flex items-baseline">
              <p className="text-xl font-bold">{dailyIntake.calories}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ {dailyIntake.calorieGoal}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 mb-2">
              <TrendingUp className="w-5 h-5 text-red-500 dark:text-red-300" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
            <div className="flex items-baseline">
              <p className="text-xl font-bold">{dailyIntake.protein}g</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ {dailyIntake.proteinGoal}g</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mb-2">
              <Apple className="w-5 h-5 text-green-500 dark:text-green-300" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
            <div className="flex items-baseline">
              <p className="text-xl font-bold">{dailyIntake.carbs}g</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ {dailyIntake.carbsGoal}g</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-2">
              <Salad className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
            <div className="flex items-baseline">
              <p className="text-xl font-bold">{dailyIntake.fat}g</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ {dailyIntake.fatGoal}g</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Macro breakdown and recent meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Macro Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={macroChartData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
              <p className="font-medium">{Math.round(dailyIntake.protein / dailyIntake.proteinGoal * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
              <p className="font-medium">{Math.round(dailyIntake.carbs / dailyIntake.carbsGoal * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
              <p className="font-medium">{Math.round(dailyIntake.fat / dailyIntake.fatGoal * 100)}%</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Today's Meals</h3>
            <Link to="/nutrition" className="text-primary hover:text-primary-dark text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentMeals.map(meal => (
              <div key={meal.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meal.calories} cal</p>
                </div>
              </div>
            ))}
            
            <Button
              as={Link}
              to="/nutrition"
              variant="outline"
              className="w-full mt-2"
            >
              Log a Meal
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Recipe recommendations */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recommended Recipes</h3>
          <Link to="/recipes" className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mock recipe recommendations */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-3">
                <h4 className="font-medium text-sm">Recommended Recipe {i + 1}</h4>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>30 min</span>
                  <span>400 cal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NutritionDashboard;