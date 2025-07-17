import React from 'react'
import { Activity, Heart, Moon, Zap, Droplet, Utensils, Pill, Target, Dumbbell, Brain, Gauge, Weight } from 'lucide-react'
import MetricsCard from '../components/dashboard/MetricsCard'
import TrendsChart from '../components/dashboard/TrendsChart'
import StatisticsGrid from '../components/dashboard/StatisticsGrid'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import HealthScoreCard from '../components/dashboard/HealthScoreCard'
import RecommendationsCard from '../components/dashboard/RecommendationsCard'
import GoalsProgress from '../components/dashboard/GoalsProgress'
import SupplementTracker from '../components/dashboard/SupplementTracker'
import WearableDeviceCard from '../components/dashboard/WearableDeviceCard'
import BWScoreCard, { MetricScore } from '../components/dashboard/BWScoreCard'

const DashboardPage: React.FC = () => {
  // Mock data for metrics cards
  const [isSyncing, setIsSyncing] = React.useState(false);
  
  // Handle sync device
  const handleSyncDevice = (deviceId: string) => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };
  
  // Handle mark supplement as taken
  const handleMarkSupplementTaken = (id: string) => {
    // In a real app, this would update the state
    console.log('Marked supplement as taken:', id);
  };
  
  // Mock data for trends chart
  const trendsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [7500, 8200, 6800, 9300, 8700, 10200, 9100],
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Heart Rate',
        data: [68, 72, 70, 74, 71, 73, 69],
        borderColor: 'rgba(239, 68, 68, 1)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };
  
  // Mock data for nutrition and sleep
  const nutritionData = {
    calories: { consumed: 1850, goal: 2200 },
    macros: { protein: 95, carbs: 210, fat: 65 },
    water: { consumed: 2.1, goal: 3 }
  };
  
  const sleepData = {
    hours: 7.5,
    quality: 85,
    deepSleep: 1.8,
    remSleep: 2.2
  };
  
  // Mock data for activity timeline
  const timelineEvents = [
    {
      id: '1',
      time: '8:00 AM',
      title: 'Morning Supplements',
      description: 'Vitamin D, Omega-3, Multivitamin',
      type: 'supplement' as const
    },
    {
      id: '2',
      time: '8:30 AM',
      title: 'Breakfast',
      description: 'Protein smoothie with berries',
      type: 'meal' as const
    },
    {
      id: '3',
      time: '10:00 AM',
      title: 'Hydration Check',
      description: '500ml water',
      type: 'water' as const
    },
    {
      id: '4',
      time: '12:30 PM',
      title: 'Lunch',
      description: 'Grilled chicken salad',
      type: 'meal' as const
    },
    {
      id: '5',
      time: '3:00 PM',
      title: 'Workout Session',
      description: '30 min strength training',
      type: 'workout' as const
    }
  ];
  
  // Mock data for health score
  const healthScoreInsights = [
    'Sleep quality improved by 12% this week',
    'Protein intake is consistently meeting your goals',
    'Consider increasing daily water intake',
    'Your stress levels have decreased since last week'
  ];
  
  // Mock data for recommendations
  const recommendations = [
    {
      id: '1',
      title: 'Increase Vitamin D Intake',
      description: 'Your recent blood work shows slightly low Vitamin D levels. Consider adding a supplement.',
      actionText: 'View Supplement Options',
      actionLink: '/supplements',
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Try These Recovery Recipes',
      description: 'Based on your workout patterns, these protein-rich recipes could help with recovery.',
      actionText: 'View Recipes',
      actionLink: '/recipes',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Improve Sleep Quality',
      description: 'Your deep sleep has been declining. Consider these sleep optimization techniques.',
      actionText: 'View Sleep Tips',
      actionLink: '/sleep-tips',
      priority: 'medium' as const
    }
  ];
  
  // Mock data for goals
  const goals = [
    {
      id: '1',
      title: 'Increase daily steps',
      progress: 85,
      dueDate: 'Jun 30, 2025',
      status: 'on-track' as const
    },
    {
      id: '2',
      title: 'Improve sleep quality',
      progress: 60,
      dueDate: 'Jul 15, 2025',
      status: 'at-risk' as const
    },
    {
      id: '3',
      title: 'Complete 12 workouts this month',
      progress: 100,
      status: 'completed' as const
    }
  ];
  
  // Mock data for supplements
  const supplements = [
    {
      id: '1',
      name: 'Vitamin D3',
      dosage: '2000 IU',
      timing: 'With breakfast',
      taken: true,
      timeOfDay: 'morning' as const
    },
    {
      id: '2',
      name: 'Omega-3 Fish Oil',
      dosage: '1000mg',
      timing: 'With breakfast',
      taken: true,
      timeOfDay: 'morning' as const
    },
    {
      id: '3',
      name: 'Magnesium Glycinate',
      dosage: '400mg',
      timing: 'Before bed',
      taken: false,
      timeOfDay: 'bedtime' as const
    },
    {
      id: '4',
      name: 'Zinc',
      dosage: '15mg',
      timing: 'With dinner',
      taken: false,
      timeOfDay: 'evening' as const
    }
  ];
  
  // Mock data for wearable device
  const wearableDevice = {
    id: 'device-1',
    name: 'Oura Ring',
    type: 'Oura',
    lastSynced: '2 hours ago',
    batteryLevel: 72,
    connected: true
  };

  // BW Score metrics
  const bwScoreMetrics: MetricScore[] = [
    {
      name: 'Sleep',
      score: 78,
      weight: 1.5,
      color: '#8B5CF6', // purple-500
      icon: <Moon className="w-4 h-4" />,
      description: 'Based on sleep duration, quality, and consistency'
    },
    {
      name: 'Fitness',
      score: 82,
      weight: 1.5,
      color: '#3B82F6', // blue-500
      icon: <Dumbbell className="w-4 h-4" />,
      description: 'Based on activity levels, workouts, and recovery'
    },
    {
      name: 'Nutrition',
      score: 65,
      weight: 1.5,
      color: '#10B981', // green-500
      icon: <Utensils className="w-4 h-4" />,
      description: 'Based on diet quality, macronutrient balance, and meal timing'
    },
    {
      name: 'Supplement Compliance',
      score: 90,
      weight: 1.0,
      color: '#F59E0B', // amber-500
      icon: <Pill className="w-4 h-4" />,
      description: 'Based on adherence to recommended supplement regimen'
    },
    {
      name: 'Body Composition',
      score: 72,
      weight: 1.0,
      color: '#EC4899', // pink-500
      icon: <Weight className="w-4 h-4" />,
      description: 'Based on BMI, body fat percentage, and muscle mass'
    },
    {
      name: 'Metabolic Health',
      score: 68,
      weight: 1.2,
      color: '#EF4444', // red-500
      icon: <Gauge className="w-4 h-4" />,
      description: 'Based on glucose levels, heart rate variability, and blood pressure'
    },
    {
      name: 'Cognitive Function',
      score: 85,
      weight: 1.0,
      color: '#6366F1', // indigo-500
      icon: <Brain className="w-4 h-4" />,
      description: 'Based on focus, memory, and mental clarity metrics'
    },
    {
      name: 'Hydration',
      score: 70,
      weight: 0.8,
      color: '#0EA5E9', // sky-500
      icon: <Droplet className="w-4 h-4" />,
      description: 'Based on daily water intake and hydration status'
    }
  ];

  const handleMetricClick = (metricName: string) => {
    console.log(`Navigating to detailed view for: ${metricName}`);
    // In a real app, this would navigate to a detailed view for the specific metric
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your wellness journey</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricsCard
            title="Heart Rate"
            value="72 BPM"
            change={{ value: 2, type: 'increase' }}
            icon={<Heart className="w-6 h-6" />}
            color="primary"
          />
          <MetricsCard
            title="Steps"
            value="8,432"
            change={{ value: 15, type: 'increase' }}
            icon={<Activity className="w-6 h-6" />}
            color="secondary"
          />
          <MetricsCard
            title="Sleep"
            value="7.5 hrs"
            change={{ value: 5, type: 'increase' }}
            icon={<Moon className="w-6 h-6" />}
            color="purple"
          />
          <MetricsCard
            title="Water"
            value="2.1L"
            change={{ value: 10, type: 'decrease' }}
            icon={<Droplet className="w-6 h-6" />}
            color="tertiary"
          />
        </div>

        {/* BW Score */}
        <div className="mb-8">
          <BWScoreCard 
            metrics={bwScoreMetrics}
            onMetricClick={handleMetricClick}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trends Chart */}
            <TrendsChart 
              title="Weekly Activity Trends" 
              data={trendsData}
              chartType="mixed"
              height={250}
            />
            
            {/* Statistics Grid */}
            <StatisticsGrid 
              nutritionData={nutritionData}
              sleepData={sleepData}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Health Score */}
            <HealthScoreCard 
              score={82}
              previousScore={78}
              insights={healthScoreInsights}
            />
            
            {/* Wearable Device */}
            <WearableDeviceCard 
              device={wearableDevice}
              onSync={handleSyncDevice}
              isSyncing={isSyncing}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Timeline */}
          <div>
            <ActivityTimeline events={timelineEvents} />
          </div>
          
          {/* Supplement Tracker */}
          <div>
            <SupplementTracker 
              supplements={supplements}
              onMarkTaken={handleMarkSupplementTaken}
            />
          </div>
          
          {/* Recommendations */}
          <div className="space-y-6">
            <RecommendationsCard recommendations={recommendations} />
            <GoalsProgress goals={goals} />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default DashboardPage