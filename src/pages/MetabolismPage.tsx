import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Activity, 
  Clock, 
  Droplet, 
  Calendar, 
  AlertCircle, 
  Utensils, 
  Apple, 
  Coffee,
  ArrowRight
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface CGMDataPoint {
  timestamp: Date;
  glucose: number;
  event?: {
    type: 'food' | 'activity' | 'medication' | 'note';
    title: string;
    description?: string;
  };
}

interface FastingProtocol {
  id: string;
  name: string;
  pattern: string;
  fastingHours: number;
  eatingHours: number;
  benefits: string[];
  description: string;
  isActive?: boolean;
}

const MetabolismPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [currentFastingProtocol, setCurrentFastingProtocol] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);

  // Generate mock CGM data for demo
  const generateMockCGMData = (): CGMDataPoint[] => {
    const data: CGMDataPoint[] = [];
    const now = new Date();
    
    // Day view - data points every 15 min for 24 hours
    if (timeRange === 'day') {
      const startTime = subDays(now, 1);
      for (let i = 0; i < 96; i++) { // 24 hours * 4 (15-min intervals)
        const timestamp = new Date(startTime.getTime() + (i * 15 * 60 * 1000));
        
        // Create wave pattern with meal spikes
        let glucoseBase = 85 + 5 * Math.sin(i / 8); // Base fluctuation
        
        // Add meal spikes at breakfast, lunch, dinner times
        if (i === 32) { // Breakfast (around 8am)
          glucoseBase += 40;
          data.push({
            timestamp,
            glucose: glucoseBase,
            event: {
              type: 'food',
              title: 'Breakfast',
              description: 'Oatmeal with berries'
            }
          });
        } else if (i === 52) { // Lunch (around 1pm)
          glucoseBase += 35;
          data.push({
            timestamp,
            glucose: glucoseBase,
            event: {
              type: 'food',
              title: 'Lunch',
              description: 'Chicken salad with avocado'
            }
          });
        } else if (i === 76) { // Dinner (around 7pm)
          glucoseBase += 45;
          data.push({
            timestamp,
            glucose: glucoseBase,
            event: {
              type: 'food',
              title: 'Dinner',
              description: 'Salmon with vegetables'
            }
          });
        } else {
          data.push({
            timestamp,
            glucose: glucoseBase
          });
        }
      }
    } else {
      // Week or month view - daily data points
      const days = timeRange === 'week' ? 7 : 30;
      for (let i = 0; i < days; i++) {
        const date = subDays(now, days - i - 1);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        
        // Generate average, min, max for each day
        const avgGlucose = 95 + 5 * Math.sin(i / 2);
        const maxGlucose = avgGlucose + 40 - (dayOfWeek === 0 || dayOfWeek === 6 ? 10 : 0); // Weekend values slightly lower
        const minGlucose = avgGlucose - 15 + (dayOfWeek === 0 || dayOfWeek === 6 ? 5 : 0);
        
        data.push({
          timestamp: date,
          glucose: avgGlucose
        });
      }
    }
    
    return data;
  };

  const cgmData = generateMockCGMData();

  // Prepare data for CGM chart
  const prepareCGMChartData = () => {
    if (timeRange === 'day') {
      const labels = cgmData.map(dataPoint => 
        format(dataPoint.timestamp, 'HH:mm')
      );
      
      const datasets = [
        {
          label: 'Glucose (mg/dL)',
          data: cgmData.map(dataPoint => dataPoint.glucose),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
          borderWidth: 2
        }
      ];
      
      // Mark food events
      const eventPoints = cgmData.filter(point => point.event?.type === 'food');
      
      if (eventPoints.length > 0) {
        datasets.push({
          label: 'Meals',
          data: cgmData.map(point => point.event?.type === 'food' ? point.glucose : null),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
          pointStyle: 'triangle',
          showLine: false
        });
      }
      
      return { labels, datasets };
    } else {
      // Week or month view
      const labels = cgmData.map(dataPoint => 
        format(dataPoint.timestamp, timeRange === 'week' ? 'EEE' : 'MMM d')
      );
      
      return {
        labels,
        datasets: [
          {
            label: 'Average Glucose',
            data: cgmData.map(dataPoint => dataPoint.glucose),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      };
    }
  };

  const chartData = prepareCGMChartData();
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function(context: any) {
            const index = context[0].dataIndex;
            const dataPoint = cgmData[index];
            
            if (timeRange === 'day') {
              return format(dataPoint.timestamp, 'MMM d, h:mm a');
            } else {
              return format(dataPoint.timestamp, 'MMM d, yyyy');
            }
          },
          afterLabel: function(context: any) {
            if (context.datasetIndex !== 0) return '';
            const index = context.dataIndex;
            const dataPoint = cgmData[index];
            
            if (dataPoint.event) {
              return `${dataPoint.event.title}: ${dataPoint.event.description || ''}`;
            }
            return '';
          }
        }
      },
      annotation: {
        annotations: {
          targetLine: {
            type: 'line',
            yMin: 70,
            yMax: 70,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            borderDash: [6, 6],
          },
          targetLineUpper: {
            type: 'line',
            yMin: 140,
            yMax: 140,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            borderDash: [6, 6],
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: timeRange === 'day' ? 6 : 7
        }
      },
      y: {
        min: timeRange === 'day' ? 60 : null,
        max: timeRange === 'day' ? 180 : null,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        title: {
          display: true,
          text: 'mg/dL'
        }
      }
    }
  };

  // Fasting protocols
  const fastingProtocols: FastingProtocol[] = [
    {
      id: '16-8',
      name: '16:8 Method',
      pattern: '16 hours fasting, 8 hour eating window',
      fastingHours: 16,
      eatingHours: 8,
      description: 'The most common form of intermittent fasting. Fast for 16 hours each day, and limit your eating to an 8-hour window.',
      benefits: [
        'Improved insulin sensitivity',
        'Promotes autophagy (cellular cleanup)',
        'Sustainable for daily practice',
        'May support weight management'
      ],
      isActive: true
    },
    {
      id: '18-6',
      name: '18:6 Method',
      pattern: '18 hours fasting, 6 hour eating window',
      fastingHours: 18,
      eatingHours: 6,
      description: 'An extended version of 16:8, with 18 hours of fasting and a 6-hour eating window for enhanced benefits.',
      benefits: [
        'Greater autophagy activation',
        'Deeper ketosis',
        'Potential for better weight loss results',
        'Improved metabolic flexibility'
      ]
    },
    {
      id: '20-4',
      name: 'Warrior Diet (20:4)',
      pattern: '20 hours fasting, 4 hour eating window',
      fastingHours: 20,
      eatingHours: 4,
      description: 'Fast for 20 hours and consume all your daily calories in a 4-hour window. More challenging but potentially more beneficial.',
      benefits: [
        'Significant autophagy activation',
        'Enhanced fat adaptation',
        'More pronounced ketosis',
        'Potentially greater metabolic benefits'
      ]
    },
    {
      id: '5-2',
      name: '5:2 Diet',
      pattern: '5 days normal eating, 2 days restricted calories (500-600)',
      fastingHours: 24,
      eatingHours: 24,
      description: 'Eat normally 5 days per week, then reduce calorie intake to 500-600 calories on the other 2 non-consecutive days.',
      benefits: [
        'Easier to adapt to for beginners',
        'Still provides metabolic benefits',
        'Flexible implementation',
        'Can be socially accommodating'
      ]
    },
    {
      id: 'alternate-day',
      name: 'Alternate Day Fasting',
      pattern: 'Alternating between fasting days and normal eating days',
      fastingHours: 24,
      eatingHours: 24,
      description: 'Alternating between a day of normal eating and a day of either complete fasting or very restricted calorie intake (around 500 calories).',
      benefits: [
        'Significant weight loss potential',
        'Enhanced fat metabolism',
        'Improved insulin sensitivity',
        'May offer cardio-protective benefits'
      ]
    },
    {
      id: 'one-meal',
      name: 'OMAD (One Meal A Day)',
      pattern: '23 hours fasting, 1 hour eating window',
      fastingHours: 23,
      eatingHours: 1,
      description: 'Consume all your daily calories in one meal, fasting for the remaining 23 hours of the day.',
      benefits: [
        'Maximum autophagy benefits',
        'Simplified meal planning',
        'Potential for significant fat loss',
        'Deep metabolic adaptations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Metabolism</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your metabolic health with continuous glucose monitoring</p>
        </div>
        
        {!isConnected && (
          <Card className="p-6 mb-6">
            <div className="flex items-start">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-4">
                <AlertCircle className="w-6 h-6 text-yellow-700 dark:text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connect Your CGM</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To track your glucose levels, connect a continuous glucose monitor device or manually add data.
                </p>
                <div className="flex space-x-3">
                  <Button onClick={() => setShowConnectModal(true)}>
                    Connect CGM
                  </Button>
                  <Button variant="outline">
                    Add Manually
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* CGM Graph Section */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Glucose Levels</h2>
            <div className="flex space-x-2">
              <Button 
                variant={timeRange === 'day' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('day')}
              >
                Day
              </Button>
              <Button 
                variant={timeRange === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('week')}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
            </div>
          </div>
          
          <div className="h-64 sm:h-80">
            <Line 
              data={chartData} 
              options={chartOptions}
            />
          </div>
          
          {timeRange === 'day' && (
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">98 mg/dL</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Time in Range</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">92%</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Variability</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">Low</p>
              </div>
            </div>
          )}
        </Card>
        
        {/* Intermittent Fasting Section */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Intermittent Fasting Protocols</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Intermittent fasting can help improve metabolic health, insulin sensitivity, and support weight management.
            Select a fasting protocol below to track and optimize your fasting schedule.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {fastingProtocols.map((protocol) => (
              <div 
                key={protocol.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer ${
                  currentFastingProtocol === protocol.id || protocol.isActive
                    ? 'bg-primary/10 border-primary dark:bg-primary-dark/20 dark:border-primary-dark'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setCurrentFastingProtocol(protocol.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{protocol.name}</h3>
                  {(currentFastingProtocol === protocol.id || protocol.isActive) && (
                    <div className="p-1 bg-primary text-white rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{protocol.pattern}</p>
                <div className="mt-3 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(protocol.fastingHours / 24) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                    {protocol.fastingHours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected protocol details */}
          {currentFastingProtocol && (
            <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                {fastingProtocols.find(p => p.id === currentFastingProtocol)?.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {fastingProtocols.find(p => p.id === currentFastingProtocol)?.description}
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {fastingProtocols.find(p => p.id === currentFastingProtocol)?.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-2 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button>
                Start This Protocol
              </Button>
            </div>
          )}
        </Card>
        
        {/* Meal Timing Section */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Meal Timing & Glucose Insights</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3 flex-shrink-0">
                <Coffee className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Morning Glucose Spike</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Your morning glucose rises 32% after breakfast. Consider a protein-rich breakfast with less carbohydrates to reduce this spike.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 flex-shrink-0">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Post-Workout Glucose Stability</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Your blood glucose remains stable after workouts. This indicates good insulin sensitivity and metabolic health.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-3 flex-shrink-0">
                <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dinner Response</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Your glucose rises significantly after dinner. Consider an earlier dinner time or a post-meal walk to improve overnight glucose levels.
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Recommended Actions */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Actions</h2>
          
          <div className="space-y-4">
            <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h3 className="font-medium text-gray-900 dark:text-white">Try Post-Meal Walking</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 mb-3">
                Walking for just 10 minutes after meals can reduce glucose spikes by up to 22%.
              </p>
              <Button size="sm" variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700">
                Track Walking
              </Button>
            </div>
            
            <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h3 className="font-medium text-gray-900 dark:text-white">Protein Before Carbs</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 mb-3">
                Eating protein before carbohydrates can reduce post-meal glucose spikes and insulin response.
              </p>
              <Button size="sm" variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                View Meal Plans
              </Button>
            </div>
          </div>
        </Card>

        {/* BioClock Link */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Try BioClock™</h2>
              <p className="text-gray-600 dark:text-gray-400">Track your circadian rhythm, fasting windows, and light exposure for optimized health</p>
            </div>
            <Link 
              to="/bioclock" 
              className="flex items-center text-primary hover:text-primary-dark font-medium"
            >
              View BioClock <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MetabolismPage;