import React from 'react';
import { Moon, TrendingUp, Clock, Zap, Brain, Heart } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import ProgressRing from '../components/dashboard/ProgressRing';

const SleepPage: React.FC = () => {
  // Mock sleep data
  const sleepData = {
    lastNight: {
      totalSleep: 7.5,
      deepSleep: 1.8,
      remSleep: 1.2,
      lightSleep: 4.5,
      sleepScore: 82,
      bedtime: '22:30',
      wakeTime: '06:00'
    },
    weeklyAverage: {
      totalSleep: 7.2,
      sleepScore: 78,
      consistency: 85
    },
    insights: [
      'Your deep sleep increased by 15% this week',
      'Try to maintain consistent bedtime for better sleep quality',
      'Consider reducing screen time 1 hour before bed'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sleep Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and optimize your sleep for better health</p>
        </div>

        {/* Sleep Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <ProgressRing 
                progress={sleepData.lastNight.sleepScore} 
                size={120}
                color="#8B5CF6"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sleepData.lastNight.sleepScore}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sleep Score</p>
                </div>
              </ProgressRing>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Last Night</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {sleepData.lastNight.totalSleep}h total sleep
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sleep Times</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bedtime</span>
                <span className="font-medium text-gray-900 dark:text-white">{sleepData.lastNight.bedtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Wake Time</span>
                <span className="font-medium text-gray-900 dark:text-white">{sleepData.lastNight.wakeTime}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Average</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sleep Duration</span>
                <span className="font-medium text-gray-900 dark:text-white">{sleepData.weeklyAverage.totalSleep}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Consistency</span>
                <span className="font-medium text-green-600 dark:text-green-400">{sleepData.weeklyAverage.consistency}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sleep Stages */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sleep Stages (Last Night)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Moon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Deep Sleep</h4>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sleepData.lastNight.deepSleep}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">24% of total</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">REM Sleep</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sleepData.lastNight.remSleep}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">16% of total</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Light Sleep</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{sleepData.lastNight.lightSleep}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">60% of total</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Total Sleep</h4>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{sleepData.lastNight.totalSleep}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Target: 8h</p>
            </div>
          </div>
        </Card>

        {/* Sleep Insights */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sleep Insights</h3>
          <div className="space-y-3">
            {sleepData.insights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <Button>View Sleep History</Button>
              <Button variant="outline">Sleep Tips</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SleepPage;