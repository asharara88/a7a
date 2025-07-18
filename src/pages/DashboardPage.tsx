import React from 'react'
import { Activity, Heart, Moon, Zap, Droplet, Utensils, Pill, Target, Dumbbell, Brain, Gauge, Weight, Flame, ChevronRight, ChevronDown } from 'lucide-react'
import DashboardCards from '../components/dashboard/DashboardCards'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
import MetabolicSnapshot from '../components/dashboard/MetabolicSnapshot'

const DashboardPage: React.FC = () => {
  // Mock data for metrics cards
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set());
  
  // Calculate section average scores
  const sectionScores = {
    cardiovascular: 87, // Based on HR, HRV, BP, Recovery
    activity: 86,       // Based on Steps, Walking, NEAT, Active Time
    caloric: 76,        // Based on deficit goal, consistency
    wellness: 79        // Based on Sleep, Water, Stress, Energy
  };
  
  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  // Helper function to get score label
  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  // Handle sync device
  const handleSyncDevice = (deviceId: string) => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };
  
  // Handle section expansion toggle
  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
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
    name: 'Apple Watch Series 9',
    type: 'Apple Health',
    lastSynced: '2 hours ago',
    batteryLevel: 84,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your wellness journey</p>
        </div>

        {/* Hero Section - BW Score (Most Important) */}
        <div className="mb-6">
          <BWScoreCard 
            metrics={bwScoreMetrics}
            onMetricClick={handleMetricClick}
          />
        </div>

        {/* Cardio Metrics Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSectionExpansion('cardiovascular')}
            className="flex items-center mb-4 w-full text-left group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center flex-1">
              <Heart className="w-5 h-5 text-red-500 mr-3" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                  Cardiovascular Health
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Heart rate, blood pressure, and recovery metrics
                </p>
              </div>
              <div className="flex items-center mr-4">
                <div className="text-right mr-3">
                  <div className={`text-2xl font-bold ${getScoreColor(sectionScores.cardiovascular)}`}>
                    {sectionScores.cardiovascular}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getScoreLabel(sectionScores.cardiovascular)}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.has('cardiovascular') ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </motion.div>
              </div>
            </div>
          </button>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricsCard
              title="Resting HR"
              value="72 BPM"
              change={{ value: 2, type: 'decrease' }}
              icon={<Heart className="w-6 h-6" />}
              color="primary"
              isExpanded={expandedSections.has('cardiovascular')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Resting Range:</span>
                    <span className="font-medium">60-80 BPM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">7-day Average:</span>
                    <span className="font-medium">74 BPM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your resting heart rate is in the excellent range for your age group.
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="HRV"
              value="45 ms"
              change={{ value: 8, type: 'increase' }}
              icon={<Activity className="w-6 h-6" />}
              color="primary"
              isExpanded={expandedSections.has('cardiovascular')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Good Range:</span>
                    <span className="font-medium">30-60 ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Recovery Status:</span>
                    <span className="font-medium text-green-600">Good</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Trend:</span>
                    <span className="font-medium text-green-600">Improving</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Higher HRV indicates better autonomic nervous system function.
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="BP Systolic"
              value="118 mmHg"
              change={{ value: 3, type: 'decrease' }}
              icon={<Heart className="w-6 h-6" />}
              color="primary"
              isExpanded={expandedSections.has('cardiovascular')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Normal Range:</span>
                    <span className="font-medium">90-120 mmHg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Diastolic:</span>
                    <span className="font-medium">78 mmHg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="font-medium text-green-600">Normal</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your blood pressure is within the normal range. Keep up the good work!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Recovery"
              value="85%"
              change={{ value: 12, type: 'increase' }}
              icon={<Zap className="w-6 h-6" />}
              color="primary"
              isExpanded={expandedSections.has('cardiovascular')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sleep Quality:</span>
                    <span className="font-medium">Good (7.5h)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Stress Level:</span>
                    <span className="font-medium text-green-600">Low</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Readiness:</span>
                    <span className="font-medium text-green-600">High</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your body is well-recovered and ready for training.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Activity & Movement Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSectionExpansion('activity')}
            className="flex items-center mb-4 w-full text-left group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center flex-1">
              <Activity className="w-5 h-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  Activity & Movement
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Steps, walking, NEAT, and active time
                </p>
              </div>
              <div className="flex items-center mr-4">
                <div className="text-right mr-3">
                  <div className={`text-2xl font-bold ${getScoreColor(sectionScores.activity)}`}>
                    {sectionScores.activity}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getScoreLabel(sectionScores.activity)}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.has('activity') ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </motion.div>
              </div>
            </div>
          </button>
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/fitness" 
              className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
            >
              View Fitness Dashboard <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricsCard
              title="Steps"
              value="8,432"
              change={{ value: 15, type: 'increase' }}
              icon={<Activity className="w-6 h-6" />}
              color="secondary"
              isExpanded={expandedSections.has('activity')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Daily Goal:</span>
                    <span className="font-medium">10,000 steps</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                    <span className="font-medium text-blue-600">84%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Average:</span>
                    <span className="font-medium">8,742 steps</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      You're 1,568 steps away from your daily goal. Keep moving!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Walking"
              value="6.2 km"
              change={{ value: 8, type: 'increase' }}
              icon={<Activity className="w-6 h-6" />}
              color="secondary"
              isExpanded={expandedSections.has('activity')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg Pace:</span>
                    <span className="font-medium">5.2 km/h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Time Walking:</span>
                    <span className="font-medium">72 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Calories Burned:</span>
                    <span className="font-medium">284 cal</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Great walking activity today! This contributes to your cardiovascular health.
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="NEAT"
              value="485 cal"
              change={{ value: 12, type: 'increase' }}
              icon={<Zap className="w-6 h-6" />}
              color="secondary"
              isExpanded={expandedSections.has('activity')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Daily Average:</span>
                    <span className="font-medium">420 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Fidgeting:</span>
                    <span className="font-medium">145 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Daily Activities:</span>
                    <span className="font-medium">340 cal</span>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      NEAT (Non-Exercise Activity Thermogenesis) is higher today than usual!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Active Time"
              value="4.2 hrs"
              change={{ value: 5, type: 'increase' }}
              icon={<Target className="w-6 h-6" />}
              color="secondary"
              isExpanded={expandedSections.has('activity')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Goal:</span>
                    <span className="font-medium">5 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Workout Time:</span>
                    <span className="font-medium">1.2 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Light Activity:</span>
                    <span className="font-medium">3.0 hrs</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      You're 84% of the way to your daily active time goal.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Caloric Balance Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSectionExpansion('caloric')}
            className="flex items-center justify-between mb-4 w-full text-left group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center">
              <Utensils className="w-5 h-5 text-green-500 mr-3" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                  Caloric Balance
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Intake, expenditure, and deficit tracking
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-3">
                <div className={`text-2xl font-bold ${getScoreColor(sectionScores.caloric)}`}>
                  {sectionScores.caloric}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {getScoreLabel(sectionScores.caloric)}
                </div>
              </div>
              <Link 
                to="/nutrition" 
                className="text-primary hover:text-primary-dark text-sm font-medium flex items-center mr-4"
                onClick={(e) => e.stopPropagation()}
              >
                Log Meal <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              <motion.div
                animate={{ rotate: expandedSections.has('caloric') ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
              </motion.div>
            </div>
          </button>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricsCard
              title="Consumed"
              value="1,850 cal"
              change={{ value: 5, type: 'increase' }}
              icon={<Utensils className="w-6 h-6" />}
              color="tertiary"
              isExpanded={expandedSections.has('caloric')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Breakfast:</span>
                    <span className="font-medium">420 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Lunch:</span>
                    <span className="font-medium">650 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Dinner:</span>
                    <span className="font-medium">580 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Snacks:</span>
                    <span className="font-medium">200 cal</span>
                  </div>
                  <Link 
                    to="/nutrition"
                    className="mt-3 block w-full text-center py-2 bg-tertiary text-white rounded-lg text-sm font-medium hover:bg-tertiary-dark transition-colors"
                  >
                    Log Another Meal
                  </Link>
                </div>
              }
            />
            <MetricsCard
              title="Burned"
              value="2,240 cal"
              change={{ value: 8, type: 'increase' }}
              icon={<Flame className="w-6 h-6" />}
              color="tertiary"
              isExpanded={expandedSections.has('caloric')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">BMR:</span>
                    <span className="font-medium">1,680 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Exercise:</span>
                    <span className="font-medium">285 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">NEAT:</span>
                    <span className="font-medium">185 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">TEF:</span>
                    <span className="font-medium">90 cal</span>
                  </div>
                  <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      TEF: Thermic Effect of Food (calories burned digesting)
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Balance"
              value="-390 cal"
              change={{ value: 15, type: 'increase' }}
              icon={<Target className="w-6 h-6" />}
              color="tertiary"
              isExpanded={expandedSections.has('caloric')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Target Deficit:</span>
                    <span className="font-medium">-500 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Average:</span>
                    <span className="font-medium">-420 cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Projected Loss:</span>
                    <span className="font-medium text-green-600">0.5 lbs/week</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      You're on track to meet your weight loss goals!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Goal Progress"
              value="78%"
              change={{ value: 12, type: 'increase' }}
              icon={<Gauge className="w-6 h-6" />}
              color="tertiary"
              isExpanded={expandedSections.has('caloric')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">This Week:</span>
                    <span className="font-medium">5/7 days on track</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">This Month:</span>
                    <span className="font-medium">22/28 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                    <span className="font-medium text-yellow-600">3 days</span>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      Consistency is key! Keep up the momentum.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <Target className="w-4 h-4 mr-1" />
              Caloric Deficit: On track for 0.5 lbs/week weight loss
            </span>
          </div>
        </div>

        {/* Wellness Metrics */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSectionExpansion('wellness')}
            className="flex items-center mb-4 w-full text-left group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center flex-1">
              <Moon className="w-5 h-5 text-purple-500 mr-3" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
                  Wellness Metrics
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sleep, hydration, stress, and energy levels
                </p>
              </div>
              <div className="flex items-center mr-4">
                <div className="text-right mr-3">
                  <div className={`text-2xl font-bold ${getScoreColor(sectionScores.wellness)}`}>
                    {sectionScores.wellness}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getScoreLabel(sectionScores.wellness)}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.has('wellness') ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                </motion.div>
              </div>
            </div>
          </button>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricsCard
              title="Sleep"
              value="7.5 hrs"
              change={{ value: 5, type: 'increase' }}
              icon={<Moon className="w-6 h-6" />}
              color="purple"
              isExpanded={expandedSections.has('wellness')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Deep Sleep:</span>
                    <span className="font-medium">1.8 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">REM Sleep:</span>
                    <span className="font-medium">2.1 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sleep Efficiency:</span>
                    <span className="font-medium text-green-600">89%</span>
                  </div>
                  <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Your sleep quality is excellent. Great recovery for tomorrow!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Water"
              value="2.1L"
              change={{ value: 10, type: 'decrease' }}
              icon={<Droplet className="w-6 h-6" />}
              color="yellow"
              isExpanded={expandedSections.has('wellness')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Daily Goal:</span>
                    <span className="font-medium">3.0L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                    <span className="font-medium text-yellow-600">70%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Remaining:</span>
                    <span className="font-medium">900ml</span>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      Remember to drink more water throughout the day!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Stress Level"
              value="3/10"
              change={{ value: 2, type: 'decrease' }}
              icon={<Brain className="w-6 h-6" />}
              color="purple"
              isExpanded={expandedSections.has('wellness')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Morning:</span>
                    <span className="font-medium text-green-600">2/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Afternoon:</span>
                    <span className="font-medium text-yellow-600">4/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Average:</span>
                    <span className="font-medium">3.5/10</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your stress levels are well managed today. Keep up the good work!
                    </p>
                  </div>
                </div>
              }
            />
            <MetricsCard
              title="Energy"
              value="8.2/10"
              change={{ value: 6, type: 'increase' }}
              icon={<Zap className="w-6 h-6" />}
              color="yellow"
              isExpanded={expandedSections.has('wellness')}
              expandedContent={
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Morning Energy:</span>
                    <span className="font-medium text-green-600">9/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Afternoon Dip:</span>
                    <span className="font-medium text-yellow-600">6/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Evening Energy:</span>
                    <span className="font-medium">7.5/10</span>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      High energy levels today! Your sleep and nutrition are paying off.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Enhanced Health Cards */}
        <div className="mb-6">
          <DashboardCards />
        </div>

        {/* Analytics and Trends Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Charts Section */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Trends Chart */}
              <TrendsChart 
                title="Weekly Activity Trends" 
                data={trendsData}
                chartType="mixed"
                height={280}
              />

              {/* Statistics Grid */}
              <StatisticsGrid 
                nutritionData={nutritionData}
                sleepData={sleepData}
              />
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="xl:col-span-1 space-y-6">
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
            
            {/* Goals Progress */}
            <GoalsProgress goals={goals} />
          </div>
        </div>

        {/* Metabolic Health Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <MetabolicSnapshot 
            averageGlucose={98}
            timeInRange={78}
            currentGlucose={95}
            trend="stable"
          />
        </div>

        {/* Action Items and Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {/* Supplement Tracker */}
          <div className="lg:col-span-1">
            <SupplementTracker 
              supplements={supplements}
              onMarkTaken={handleMarkSupplementTaken}
            />
          </div>
          
          {/* Recommendations */}
          <div className="lg:col-span-1">
            <RecommendationsCard recommendations={recommendations} />
          </div>
          
          {/* Activity Timeline */}
          <div className="lg:col-span-2 xl:col-span-1">
            <ActivityTimeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage