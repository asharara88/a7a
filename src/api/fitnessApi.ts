import { createClient } from '@supabase/supabase-js';
import { format, subDays } from 'date-fns';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface WorkoutSession {
  id: string;
  userId: string;
  workoutType: string;
  duration: number; // in minutes
  caloriesBurned: number;
  timestamp: string;
  notes?: string;
}

export interface ExerciseSet {
  id: string;
  workoutId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds, for timed exercises
}

export interface FitnessMetric {
  date: string;
  caloriesBurned: number;
  activeMinutes: number;
  workouts: number;
}

export interface FitnessSummary {
  totalWorkouts: number;
  totalCaloriesBurned: number;
  totalActiveMinutes: number;
  averageWorkoutDuration: number;
  favoriteWorkoutType: string;
  dailyMetrics: FitnessMetric[];
}

// API functions
export const fitnessApi = {
  // Log a workout session
  logWorkout: async (workout: Omit<WorkoutSession, 'id'>): Promise<WorkoutSession> => {
    // Handle null/invalid user ID by returning mock data
    if (!workout.userId || workout.userId === 'demo-user-id') {
      return {
        id: 'mock-workout-id',
        userId: 'demo-user-id',
        workoutType: workout.workoutType,
        duration: workout.duration,
        caloriesBurned: workout.caloriesBurned,
        timestamp: workout.timestamp,
        notes: workout.notes
      };
    }
    
    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert([{
          user_id: workout.userId,
          workout_type: workout.workoutType,
          duration: workout.duration,
          calories_burned: workout.caloriesBurned,
          timestamp: workout.timestamp,
          notes: workout.notes
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        userId: data.user_id,
        workoutType: data.workout_type,
        duration: data.duration,
        caloriesBurned: data.calories_burned,
        timestamp: data.timestamp,
        notes: data.notes
      };
    } catch (error) {
      console.error('Error logging workout:', error);
      throw error;
    }
  },
  
  // Log exercise sets for a workout
  logExerciseSets: async (workoutId: string, exercises: Omit<ExerciseSet, 'id' | 'workoutId'>[]): Promise<ExerciseSet[]> => {
    try {
      const exercisesData = exercises.map(exercise => ({
        workout_id: workoutId,
        exercise_name: exercise.exerciseName,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        duration: exercise.duration
      }));
      
      const { data, error } = await supabase
        .from('exercise_sets')
        .insert(exercisesData)
        .select();
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        workoutId: item.workout_id,
        exerciseName: item.exercise_name,
        sets: item.sets,
        reps: item.reps,
        weight: item.weight,
        duration: item.duration
      }));
    } catch (error) {
      console.error('Error logging exercise sets:', error);
      throw error;
    }
  },
  
  // Get workout history
  getWorkoutHistory: async (userId: string, days: number = 30): Promise<WorkoutSession[]> => {
    // Handle null/invalid user ID by returning mock data
    if (!userId || userId === 'demo-user-id') {
      return mockWorkoutHistory('demo-user-id', days);
    }
    
    try {
      const startDate = subDays(new Date(), days);
      
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', userId)
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        userId: item.user_id,
        workoutType: item.workout_type,
        duration: item.duration,
        caloriesBurned: item.calories_burned,
        timestamp: item.timestamp,
        notes: item.notes
      }));
    } catch (error) {
      console.error('Error getting workout history:', error);
      // Fallback to mock data for demo purposes
      return mockWorkoutHistory(userId, days);
    }
  },
  
  // Get exercise details for a workout
  getExerciseDetails: async (workoutId: string): Promise<ExerciseSet[]> => {
    // Handle null/invalid workout ID
    if (!workoutId || workoutId === 'demo-workout-id') {
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('exercise_sets')
        .select('*')
        .eq('workout_id', workoutId)
        .order('id');
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        workoutId: item.workout_id,
        exerciseName: item.exercise_name,
        sets: item.sets,
        reps: item.reps,
        weight: item.weight,
        duration: item.duration
      }));
    } catch (error) {
      console.error('Error getting exercise details:', error);
      return [];
    }
  },
  
  // Get fitness summary
  getFitnessSummary: async (userId: string, days: number = 30): Promise<FitnessSummary> => {
    // Handle null/invalid user ID by returning mock data
    if (!userId || userId === 'demo-user-id') {
      return mockFitnessSummary(days);
    }
    
    try {
      const workouts = await fitnessApi.getWorkoutHistory(userId, days);
      
      if (workouts.length === 0) {
        return mockFitnessSummary(days);
      }
      
      // Calculate metrics
      const totalWorkouts = workouts.length;
      const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
      const totalActiveMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
      const averageWorkoutDuration = totalWorkouts > 0 ? totalActiveMinutes / totalWorkouts : 0;
      
      // Find favorite workout type
      const workoutTypes: Record<string, number> = {};
      workouts.forEach(w => {
        workoutTypes[w.workoutType] = (workoutTypes[w.workoutType] || 0) + 1;
      });
      
      const favoriteWorkoutType = Object.entries(workoutTypes)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0])[0] || 'None';
      
      // Generate daily metrics
      const dailyMetrics: Record<string, FitnessMetric> = {};
      
      for (let i = 0; i < days; i++) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        dailyMetrics[date] = {
          date,
          caloriesBurned: 0,
          activeMinutes: 0,
          workouts: 0
        };
      }
      
      workouts.forEach(workout => {
        const date = format(new Date(workout.timestamp), 'yyyy-MM-dd');
        if (dailyMetrics[date]) {
          dailyMetrics[date].caloriesBurned += workout.caloriesBurned;
          dailyMetrics[date].activeMinutes += workout.duration;
          dailyMetrics[date].workouts += 1;
        }
      });
      
      return {
        totalWorkouts,
        totalCaloriesBurned,
        totalActiveMinutes,
        averageWorkoutDuration,
        favoriteWorkoutType,
        dailyMetrics: Object.values(dailyMetrics).sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      };
    } catch (error) {
      console.error('Error getting fitness summary:', error);
      return mockFitnessSummary(days);
    }
  }
};

// Mock data functions for development and fallback
function mockWorkoutHistory(userId: string, days: number): WorkoutSession[] {
  const workouts: WorkoutSession[] = [];
  const workoutTypes = ['Strength Training', 'Cardio', 'HIIT', 'Yoga', 'Running'];
  const now = new Date();
  
  for (let i = 0; i < Math.min(days, 14); i++) {
    // Skip some days to make it realistic
    if (Math.random() > 0.7) continue;
    
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    const duration = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
    const caloriesBurned = Math.floor(duration * (Math.random() * 5 + 5)); // 5-10 calories per minute
    
    workouts.push({
      id: `workout-${i}`,
      userId,
      workoutType,
      duration,
      caloriesBurned,
      timestamp: date.toISOString(),
      notes: `${workoutType} session`
    });
  }
  
  return workouts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

function mockFitnessSummary(days: number): FitnessSummary {
  const dailyMetrics: FitnessMetric[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = format(subDays(now, i), 'yyyy-MM-dd');
    const hasWorkout = Math.random() > 0.3;
    
    dailyMetrics.push({
      date,
      caloriesBurned: hasWorkout ? Math.floor(Math.random() * 300) + 100 : 0,
      activeMinutes: hasWorkout ? Math.floor(Math.random() * 60) + 30 : 0,
      workouts: hasWorkout ? (Math.random() > 0.8 ? 2 : 1) : 0
    });
  }
  
  const totalWorkouts = dailyMetrics.reduce((sum, day) => sum + day.workouts, 0);
  const totalCaloriesBurned = dailyMetrics.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalActiveMinutes = dailyMetrics.reduce((sum, day) => sum + day.activeMinutes, 0);
  
  return {
    totalWorkouts,
    totalCaloriesBurned,
    totalActiveMinutes,
    averageWorkoutDuration: totalWorkouts > 0 ? totalActiveMinutes / totalWorkouts : 0,
    favoriteWorkoutType: 'Strength Training',
    dailyMetrics: dailyMetrics.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  };
}