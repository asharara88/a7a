import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Activity, Calendar, Plus, Clock, Flame, BarChart2 } from 'lucide-react';
import { fitnessApi, WorkoutSession, FitnessSummary } from '../../api/fitnessApi';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Line } from 'react-chartjs-2';
import MuscleGroupVisualization from './MuscleGroupVisualization';
import { muscleGroupApi } from '../../api/muscleGroupApi';

interface FitnessTrackerProps {
  activeTab?: string;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ activeTab = 'dashboard' }) => {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [fitnessSummary, setFitnessSummary] = useState<FitnessSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [timeRange, setTimeRange] = useState(7); // days
  const [showMuscleVisualization, setShowMuscleVisualization] = useState(false);
  
  // New workout form state
  const [newWorkout, setNewWorkout] = useState({
    workoutType: 'Strength Training',
    duration: 45,
    caloriesBurned: 300,
    notes: ''
  });

  // Mock user ID for demo purposes
  const userId = 'demo-user-id';

  useEffect(() => {
    loadFitnessData();
  }, [timeRange]);

  const loadFitnessData = async () => {
    setIsLoading(true);
    try {
      const history = await fitnessApi.getWorkoutHistory(userId, timeRange);
      const summary = await fitnessApi.getFitnessSummary(userId, timeRange);
      
      setWorkoutHistory(history);
      setFitnessSummary(summary);
    } catch (error) {
      console.error('Error loading fitness data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async () => {
    try {
      await fitnessApi.logWorkout({
        userId,
        workoutType: newWorkout.workoutType,
        duration: newWorkout.duration,
        caloriesBurned: newWorkout.caloriesBurned,
        timestamp: new Date().toISOString(),
        notes: newWorkout.notes
      });
      
      // Refresh data
      loadFitnessData();
      setShowAddWorkout(false);
      
      // Reset form
      setNewWorkout({
        workoutType: 'Strength Training',
        duration: 45,
        caloriesBurned: 300,
        notes: ''
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' ? parseInt(value) : value
    }));
  };

  // Prepare chart data
  const activityChartData = {
    labels: fitnessSummary?.dailyMetrics.map(metric => format(parseISO(metric.date), 'MMM d')) || [],
    datasets: [
      {
        label: 'Active Minutes',
        data: fitnessSummary?.dailyMetrics.map(metric => metric.activeMinutes) || [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Calories Burned',
        data: fitnessSummary?.dailyMetrics.map(metric => metric.caloriesBurned / 10) || [], // Scaled for better visualization
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Active Minutes'
        }
      },
      y1: {
        beginAtZero: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Calories (x10)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const workoutTypes = [
    'Strength Training',
    'Cardio',
    'HIIT',
    'Yoga',
    'Pilates',
    'Running',
    'Cycling',
    'Swimming',
    'Walking',
    'CrossFit'
  ];

  // Get muscle groups for workout type
  const getMuscleGroupsForWorkout = (workoutType: string) => {
    const muscleMap: Record<string, { primary: string[], secondary: string[] }> = {
      'Strength Training': { primary: ['chest', 'back', 'shoulders'], secondary: ['biceps', 'triceps'] },
      'HIIT': { primary: ['quads', 'glutes'], secondary: ['hamstrings', 'calves'] },
      'Yoga': { primary: ['core'], secondary: ['back', 'shoulders'] },
      'Pilates': { primary: ['core', 'glutes'], secondary: ['back'] },
      'Swimming': { primary: ['shoulders', 'back'], secondary: ['chest', 'triceps'] },
      'CrossFit': { primary: ['quads', 'shoulders', 'back'], secondary: ['hamstrings', 'triceps', 'biceps'] },
    };
    return muscleMap[workoutType] || { primary: [], secondary: [] };
  };

  // Mock recovery states for demonstration
  const mockRecoveryStates = [
    { muscleGroup: 'chest', readiness: 'excellent' as const, color: muscleGroupApi.getRecoveryColor('excellent') },
    { muscleGroup: 'back', readiness: 'good' as const, color: muscleGroupApi.getRecoveryColor('good') },
    { muscleGroup: 'shoulders', readiness: 'moderate' as const, color: muscleGroupApi.getRecoveryColor('moderate') },
    { muscleGroup: 'biceps', readiness: 'poor' as const, color: muscleGroupApi.getRecoveryColor('poor') },
    { muscleGroup: 'quads', readiness: 'excellent' as const, color: muscleGroupApi.getRecoveryColor('excellent') },
    { muscleGroup: 'hamstrings', readiness: 'good' as const, color: muscleGroupApi.getRecoveryColor('good') },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Content Controls */}
      {(activeTab === 'dashboard' || !activeTab) && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fitness Overview</h2>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-300 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
            <Button
              onClick={() => setShowAddWorkout(true)}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Log Workout
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Dashboard Tab */}
          {(activeTab === 'dashboard' || !activeTab) && (
            <>
              {/* Fitness Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <Activity className="w-6 h-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Workouts</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {fitnessSummary?.totalWorkouts || 0}
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4 flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 mr-4">
                    <Flame className="w-6 h-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {fitnessSummary?.totalCaloriesBurned || 0}
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4 flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                    <Clock className="w-6 h-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Minutes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {fitnessSummary?.totalActiveMinutes || 0}
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4 flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                    <BarChart2 className="w-6 h-6 text-purple-500 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Duration</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(fitnessSummary?.averageWorkoutDuration || 0)} min
                    </p>
                  </div>
                </Card>
              </div>

              {/* Activity Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Activity Trends</h3>
                <div className="h-64">
                  <Line data={activityChartData} options={chartOptions} />
                </div>
              </Card>
            </>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <Card className="p-6">
             <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workout History</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value={7}>Last 7 days</option>
                    <option value={14}>Last 14 days</option>
                    <option value={30}>Last 30 days</option>
                  </select>
                  <Button
                    onClick={() => setShowAddWorkout(true)}
                    size="sm"
                    className="flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Log Workout
                  </Button>
                </div>
              </div>
              
              {workoutHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="mb-4 text-lg">No workouts logged in this period</p>
                  <Button 
                    onClick={() => setShowAddWorkout(true)}
                    variant="outline"
                    className="mt-6 shadow-sm hover:shadow transition-all duration-300"
                  >
                    Log Your First Workout
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutHistory.map((workout) => (
                    <div 
                      key={workout.id} 
                      className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      <div>
                        <div className="flex items-center mb-1">
                          <div className="p-1 rounded-full bg-primary/10 mr-2">
                            <Activity className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium tracking-wide">{workout.workoutType}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                          {format(parseISO(workout.timestamp), 'MMM d, yyyy • h:mm a')}
                        </p>
                        {workout.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{workout.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{workout.duration} min</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{workout.caloriesBurned} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </>
           </Card>
          )}

          {/* Muscle Groups Tab */}
          {activeTab === 'muscles' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Muscle Group Recovery Status</h3>
                <MuscleGroupVisualization
                  mode="recovery"
                  recoveryStates={mockRecoveryStates}
                  height={400}
                />
              </Card>
              
              {workoutHistory.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Workout Targeting</h3>
                  <MuscleGroupVisualization
                    mode="exercise"
                    exerciseName={workoutHistory[0]?.workoutType}
                    primaryMuscles={getMuscleGroupsForWorkout(workoutHistory[0]?.workoutType || 'Strength Training').primary}
                    secondaryMuscles={getMuscleGroupsForWorkout(workoutHistory[0]?.workoutType || 'Strength Training').secondary}
                    height={400}
                  />
                </Card>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Detailed Analytics</h3>
                <div className="h-64">
                  <Line data={activityChartData} options={chartOptions} />
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Favorite Exercise:</span>
                      <span className="font-medium">{fitnessSummary?.favoriteWorkoutType || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Workouts:</span>
                      <span className="font-medium">{fitnessSummary?.totalWorkouts || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Calories:</span>
                      <span className="font-medium">{fitnessSummary?.totalCaloriesBurned || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Active Time:</span>
                      <span className="font-medium">{Math.round((fitnessSummary?.totalActiveMinutes || 0) / 60)} hours</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Weekly Goals</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workouts</span>
                        <span>{fitnessSummary?.totalWorkouts || 0}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${Math.min(100, ((fitnessSummary?.totalWorkouts || 0) / 5) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Active Minutes</span>
                        <span>{fitnessSummary?.totalActiveMinutes || 0}/150</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${Math.min(100, ((fitnessSummary?.totalActiveMinutes || 0) / 150) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Add Workout Dialog */}
          {showAddWorkout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">Log a Workout</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Workout Type</label>
                    <select
                      name="workoutType"
                      value={newWorkout.workoutType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {workoutTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                    <Input
                      type="number"
                      name="duration"
                      value={newWorkout.duration}
                      onChange={handleInputChange}
                      min={1}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Calories Burned</label>
                    <Input
                      type="number"
                      name="caloriesBurned"
                      value={newWorkout.caloriesBurned}
                      onChange={handleInputChange}
                      min={1}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                    <textarea
                      name="notes"
                      value={newWorkout.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setShowAddWorkout(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddWorkout}>
                    Save Workout
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FitnessTracker;