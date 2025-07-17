import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ProgressRing from './ProgressRing';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticsGridProps {
  nutritionData: {
    calories: { consumed: number; goal: number };
    macros: { protein: number; carbs: number; fat: number };
    water: { consumed: number; goal: number };
  };
  sleepData: {
    hours: number;
    quality: number;
    deepSleep: number;
    remSleep: number;
  };
}

const StatisticsGrid: React.FC<StatisticsGridProps> = ({ nutritionData, sleepData }) => {
  // Nutrition chart data
  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [
          nutritionData.macros.protein * 4, // 4 calories per gram
          nutritionData.macros.carbs * 4,   // 4 calories per gram
          nutritionData.macros.fat * 9      // 9 calories per gram
        ],
        backgroundColor: [
          'hsl(var(--color-primary) / 0.8)',
          'hsl(var(--color-secondary) / 0.8)',
          'hsl(var(--color-tertiary) / 0.8)'
        ],
        borderColor: [
          'hsl(var(--color-primary))',
          'hsl(var(--color-secondary))',
          'hsl(var(--color-tertiary))'
        ],
        borderWidth: 1
      }
    ]
  };

  // Sleep chart data
  const sleepChartData = {
    labels: ['Deep Sleep', 'REM Sleep', 'Light Sleep'],
    datasets: [
      {
        data: [
          sleepData.deepSleep,
          sleepData.remSleep,
          sleepData.hours - sleepData.deepSleep - sleepData.remSleep
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
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
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true
      }
    },
    cutout: '70%'
  };

  // Calculate percentages
  const caloriePercentage = Math.min(100, Math.round((nutritionData.calories.consumed / nutritionData.calories.goal) * 100));
  const waterPercentage = Math.min(100, Math.round((nutritionData.water.consumed / nutritionData.water.goal) * 100));
  const sleepQualityPercentage = Math.min(100, sleepData.quality);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Calories Card */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Calories</h3>
        <div className="flex justify-center mb-4">
          <ProgressRing progress={caloriePercentage} color="hsl(var(--color-primary))">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{caloriePercentage}%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">of goal</p>
            </div>
          </ProgressRing>
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.calories.consumed}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Consumed</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.calories.goal}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Goal</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.calories.goal - nutritionData.calories.consumed}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
          </div>
        </div>
      </Card>

      {/* Macros Card */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Macronutrients</h3>
        <div className="h-48 flex items-center justify-center">
          <Doughnut data={macroChartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Protein</p>
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.macros.protein}g</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Carbs</p>
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.macros.carbs}g</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Fat</p>
            <p className="font-medium text-gray-900 dark:text-white">{nutritionData.macros.fat}g</p>
          </div>
        </div>
      </Card>

      {/* Sleep Card */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sleep Analysis</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{sleepData.hours}h</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sleep</p>
          </div>
          <ProgressRing 
            progress={sleepQualityPercentage} 
            size={80} 
            strokeWidth={6}
            color="hsl(var(--color-secondary))"
          >
            <p className="text-sm font-bold">{sleepQualityPercentage}%</p>
          </ProgressRing>
        </div>
        <div className="h-32 flex items-center justify-center">
          <Doughnut data={sleepChartData} options={chartOptions} />
        </div>
      </Card>

      {/* Water Intake Card */}
      <Card className="p-5 md:col-span-2 lg:col-span-1">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Water Intake</h3>
        <div className="flex justify-center mb-4">
          <ProgressRing progress={waterPercentage} color="hsl(var(--color-tertiary))">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{nutritionData.water.consumed}L</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">of {nutritionData.water.goal}L</p>
            </div>
          </ProgressRing>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
          <motion.div 
            className="bg-tertiary h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${waterPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default StatisticsGrid;