import React from 'react'
import { Activity, Heart, Moon, Zap } from 'lucide-react'
import MyCoach from '../components/chat/MyCoach'

const DashboardPage: React.FC = () => {
  // Health metrics data
  const metrics = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Heart Rate',
      value: '72 BPM',
      change: '+2%'
    },
    {
      icon: <Activity className="w-8 h-8 text-secondary" />,
      title: 'Steps',
      value: '8,432',
      change: '+15%'
    },
    {
      icon: <Moon className="w-8 h-8 text-purple-500" />,
      title: 'Sleep',
      value: '7.5 hrs',
      change: '+0.5 hrs'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'Energy',
      value: '85%',
      change: '+5%'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your wellness journey</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg p-4 sm:p-6 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{metric.change}</p>
                </div>
                <div className="flex-shrink-0">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Completed morning supplement routine</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Logged 30-minute workout</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sleep quality: Good (7.5 hours)</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Health Coach */}
          <div className="lg:col-span-2">
            <MyCoach />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage