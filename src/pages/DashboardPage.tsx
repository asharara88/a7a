import React from 'react'
import { Activity, Heart, Moon, Zap } from 'lucide-react'
import AIHealthCoach from '../components/chat/AIHealthCoach'

const DashboardPage: React.FC = () => {
  const metrics = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Heart Rate',
      value: '72 BPM',
      change: '+2%'
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-500" />,
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your wellness journey</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-green-600">{metric.change}</p>
                </div>
                <div className="flex-shrink-0">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Completed morning supplement routine</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Logged 30-minute workout</p>
                  <span className="text-xs text-gray-400">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Sleep quality: Good (7.5 hours)</p>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Health Coach */}
          <div className="lg:col-span-2">
            <AIHealthCoach />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage