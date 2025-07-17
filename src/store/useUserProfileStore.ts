import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  age?: number;
  height?: { value: number; unit: 'cm' | 'ft' };
  weight?: { value: number; unit: 'kg' | 'lbs' };
  activityLevel?: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
  primaryHealthGoals?: string[];
  secondaryHealthGoals?: string[];
  healthConcerns?: string[];
  fitnessGoals?: string[];
  sleepHours?: number;
  bedTime?: string;
  wakeTime?: string;
  sleepQuality?: 'poor' | 'fair' | 'good' | 'excellent';
  exerciseFrequency?: 'never' | 'rarely' | '1-2-times' | '3-4-times' | '5-6-times' | 'daily';
  exerciseTypes?: string[];
  dietPreference?: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo' | 'mediterranean' | 'other';
  dietaryRestrictions?: string[];
  allergies?: string[];
  stressLevel?: number;
  stressTriggers?: string[];
  mentalHealthGoals?: string[];
  meditationExperience?: 'none' | 'beginner' | 'intermediate' | 'advanced';
  currentSupplements?: string[];
  medicationList?: string[];
  medicalConditions?: string[];
  doctorConsultation?: boolean;
  communicationPreferences?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  privacySettings?: {
    dataSharing?: boolean;
    analytics?: boolean;
  };
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: string;
}

interface OnboardingProgress {
  currentStep: number;
  completedSteps: number[];
  stepProgress: Record<number, number>;
}

interface UserProfileState {
  profile: UserProfile | null;
  onboardingProgress: OnboardingProgress;
  loading: boolean;
  saving: boolean;
  error: string | null;
  loadProfile: (userId?: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: (finalData?: Partial<UserProfile>) => Promise<void>;
  setOnboardingStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  updateStepProgress: (step: number, progress: number) => void;
  clearError: () => void;
}

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  onboardingProgress: {
    currentStep: 1,
    completedSteps: [],
    stepProgress: {}
  },
  loading: false,
  saving: false,
  error: null,

  loadProfile: async (userId) => {
    set({ loading: true, error: null });
    try {
      // Get current user if userId not provided
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id;
      }

      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Try to fetch user profile
      let { data, error } = await supabase
        .from('user_profile_signin')
        .select('*')
        .eq('id', userId)
        .single();

      // Handle case where profile doesn't exist (PGRST116 error)
      if (error && error.code === 'PGRST116') {
        // Get user data from auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Create new profile record
        const { data: newProfile, error: createError } = await supabase
          .from('user_profile_signin')
          .insert({
            id: userId,
            email: user.email || '',
            onboarding_completed: false,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        data = newProfile;
      } else if (error) {
        throw error;
      }

      // Transform database fields to match our UserProfile interface
      const profile: UserProfile = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        mobile: data.mobile,
        dateOfBirth: data.date_of_birth,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        activityLevel: data.activity_level,
        primaryHealthGoals: data.primary_health_goals,
        secondaryHealthGoals: data.secondary_health_goals,
        healthConcerns: data.health_concerns,
        fitnessGoals: data.fitness_goals,
        sleepHours: data.sleep_hours,
        bedTime: data.bed_time,
        wakeTime: data.wake_time,
        sleepQuality: data.sleep_quality,
        exerciseFrequency: data.exercise_frequency,
        exerciseTypes: data.exercise_types,
        dietPreference: data.diet_preference,
        dietaryRestrictions: data.dietary_restrictions,
        allergies: data.allergies,
        stressLevel: data.stress_level,
        stressTriggers: data.stress_triggers,
        mentalHealthGoals: data.mental_health_goals,
        meditationExperience: data.meditation_experience,
        currentSupplements: data.current_supplements,
        medicationList: data.medication_list,
        medicalConditions: data.medical_conditions,
        doctorConsultation: data.doctor_consultation,
        communicationPreferences: data.communication_preferences,
        privacySettings: data.privacy_settings,
        onboardingCompleted: data.onboarding_completed,
        onboardingCompletedAt: data.onboarding_completed_at
      };

      set({ profile, loading: false });
    } catch (error) {
      console.error('Error loading profile:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load profile', 
        loading: false 
      });
    }
  },

  updateProfile: async (data) => {
    set({ saving: true, error: null });
    try {
      const { profile } = get();
      
      if (!profile?.id) {
        throw new Error('User not authenticated');
      }

      // Transform our UserProfile interface to match database fields
      const dbData: Record<string, any> = {};
      
      // Map fields
      if (data.firstName !== undefined) dbData.first_name = data.firstName;
      if (data.lastName !== undefined) dbData.last_name = data.lastName;
      if (data.mobile !== undefined) dbData.mobile = data.mobile;
      if (data.dateOfBirth !== undefined) dbData.date_of_birth = data.dateOfBirth;
      if (data.gender !== undefined) dbData.gender = data.gender;
      if (data.age !== undefined) dbData.age = data.age;
      if (data.height !== undefined) dbData.height = data.height;
      if (data.weight !== undefined) dbData.weight = data.weight;
      if (data.activityLevel !== undefined) dbData.activity_level = data.activityLevel;
      if (data.primaryHealthGoals !== undefined) dbData.primary_health_goals = data.primaryHealthGoals;
      if (data.secondaryHealthGoals !== undefined) dbData.secondary_health_goals = data.secondaryHealthGoals;
      if (data.healthConcerns !== undefined) dbData.health_concerns = data.healthConcerns;
      if (data.fitnessGoals !== undefined) dbData.fitness_goals = data.fitnessGoals;
      if (data.sleepHours !== undefined) dbData.sleep_hours = data.sleepHours;
      if (data.bedTime !== undefined) dbData.bed_time = data.bedTime;
      if (data.wakeTime !== undefined) dbData.wake_time = data.wakeTime;
      if (data.sleepQuality !== undefined) dbData.sleep_quality = data.sleepQuality;
      if (data.exerciseFrequency !== undefined) dbData.exercise_frequency = data.exerciseFrequency;
      if (data.exerciseTypes !== undefined) dbData.exercise_types = data.exerciseTypes;
      if (data.dietPreference !== undefined) dbData.diet_preference = data.dietPreference;
      if (data.dietaryRestrictions !== undefined) dbData.dietary_restrictions = data.dietaryRestrictions;
      if (data.allergies !== undefined) dbData.allergies = data.allergies;
      if (data.stressLevel !== undefined) dbData.stress_level = data.stressLevel;
      if (data.stressTriggers !== undefined) dbData.stress_triggers = data.stressTriggers;
      if (data.mentalHealthGoals !== undefined) dbData.mental_health_goals = data.mentalHealthGoals;
      if (data.meditationExperience !== undefined) dbData.meditation_experience = data.meditationExperience;
      if (data.currentSupplements !== undefined) dbData.current_supplements = data.currentSupplements;
      if (data.medicationList !== undefined) dbData.medication_list = data.medicationList;
      if (data.medicalConditions !== undefined) dbData.medical_conditions = data.medicalConditions;
      if (data.doctorConsultation !== undefined) dbData.doctor_consultation = data.doctorConsultation;
      if (data.communicationPreferences !== undefined) dbData.communication_preferences = data.communicationPreferences;
      if (data.privacySettings !== undefined) dbData.privacy_settings = data.privacySettings;

      const { error } = await supabase
        .from('user_profile_signin')
        .update(dbData)
        .eq('id', profile.id);

      if (error) throw error;

      // Update local state
      set({ 
        profile: { ...profile, ...data },
        saving: false 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update profile', 
        saving: false 
      });
    }
  },

  completeOnboarding: async (finalData) => {
    set({ saving: true, error: null });
    try {
      const { profile } = get();
      
      if (!profile?.id) {
        throw new Error('User not authenticated');
      }

      // Update profile with final data if provided
      if (finalData) {
        await get().updateProfile(finalData);
      }

      // Mark onboarding as completed
      const { error } = await supabase
        .from('user_profile_signin')
        .update({
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update local state
      set({ 
        profile: { 
          ...profile, 
          ...finalData,
          onboardingCompleted: true,
          onboardingCompletedAt: new Date().toISOString()
        },
        saving: false 
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to complete onboarding', 
        saving: false 
      });
    }
  },

  setOnboardingStep: (step) => {
    set(state => ({
      onboardingProgress: {
        ...state.onboardingProgress,
        currentStep: step
      }
    }));
  },

  markStepCompleted: (step) => {
    set(state => {
      const completedSteps = [...state.onboardingProgress.completedSteps];
      if (!completedSteps.includes(step)) {
        completedSteps.push(step);
      }
      return {
        onboardingProgress: {
          ...state.onboardingProgress,
          completedSteps,
          stepProgress: {
            ...state.onboardingProgress.stepProgress,
            [step]: 100
          }
        }
      };
    });
  },

  updateStepProgress: (step, progress) => {
    set(state => ({
      onboardingProgress: {
        ...state.onboardingProgress,
        stepProgress: {
          ...state.onboardingProgress.stepProgress,
          [step]: progress
        }
      }
    }));
  },

  clearError: () => set({ error: null })
}));