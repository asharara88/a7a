import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Heart, 
  Activity, 
  Moon, 
  Utensils, 
  Brain, 
  Pill, 
  Settings,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import { useUserProfileStore, UserProfile } from '../../store/useUserProfileStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface EnhancedOnboardingFormProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: User,
    fields: ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'gender']
  },
  {
    id: 2,
    title: 'Health Goals',
    description: 'What are your primary health objectives?',
    icon: Heart,
    fields: ['primaryHealthGoals', 'healthConcerns', 'fitnessGoals']
  },
  {
    id: 3,
    title: 'Physical Profile',
    description: 'Help us understand your physical characteristics',
    icon: Activity,
    fields: ['height', 'weight', 'activityLevel', 'exerciseFrequency', 'exerciseTypes']
  },
  {
    id: 4,
    title: 'Sleep & Recovery',
    description: 'Tell us about your sleep patterns',
    icon: Moon,
    fields: ['sleepHours', 'bedTime', 'wakeTime', 'sleepQuality']
  },
  {
    id: 5,
    title: 'Nutrition & Diet',
    description: 'Share your dietary preferences and restrictions',
    icon: Utensils,
    fields: ['dietPreference', 'dietaryRestrictions', 'allergies']
  },
  {
    id: 6,
    title: 'Mental Health & Stress',
    description: 'Help us understand your mental wellness',
    icon: Brain,
    fields: ['stressLevel', 'stressTriggers', 'mentalHealthGoals', 'meditationExperience']
  },
  {
    id: 7,
    title: 'Supplements & Medical',
    description: 'Current supplements and medical information',
    icon: Pill,
    fields: ['currentSupplements', 'medicationList', 'medicalConditions', 'doctorConsultation']
  },
  {
    id: 8,
    title: 'Preferences',
    description: 'Customize your experience',
    icon: Settings,
    fields: ['communicationPreferences', 'privacySettings']
  }
];

const HEALTH_GOALS_OPTIONS = [
  'Weight management',
  'Muscle building',
  'Cardiovascular health',
  'Mental wellness',
  'Better sleep',
  'Increased energy',
  'Stress reduction',
  'Immune support',
  'Digestive health',
  'Skin health',
  'Brain health',
  'Anti-aging'
];

const FITNESS_GOALS_OPTIONS = [
  'Build muscle',
  'Lose weight',
  'Improve endurance',
  'Increase strength',
  'Better flexibility',
  'Injury recovery',
  'Athletic performance',
  'General fitness'
];

const EXERCISE_TYPES_OPTIONS = [
  'Cardio',
  'Weight training',
  'Yoga',
  'Pilates',
  'Swimming',
  'Running',
  'Cycling',
  'Sports',
  'Walking',
  'HIIT'
];

const EnhancedOnboardingForm: React.FC<EnhancedOnboardingFormProps> = ({
    onComplete,
    isLoading = false
}) => {
  const {
    profile,
    onboardingProgress,
    saving,
    error,
    updateProfile,
    completeOnboarding,
    setOnboardingStep,
    markStepCompleted,
    updateStepProgress,
    clearError
  } = useUserProfileStore();

  const [currentStepData, setCurrentStepData] = useState<Partial<UserProfile>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const currentStep = ONBOARDING_STEPS.find(step => step.id === onboardingProgress.currentStep) || ONBOARDING_STEPS[0];

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    switch (currentStep.id) {
      case 1: // Personal Information
        if (!currentStepData.firstName?.trim()) {
          errors.firstName = 'First name is required';
        }
        if (!currentStepData.lastName?.trim()) {
          errors.lastName = 'Last name is required';
        }
        if (!currentStepData.email?.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentStepData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        break;

      case 2: // Health Goals
        if (!currentStepData.primaryHealthGoals?.length) {
          errors.primaryHealthGoals = 'Please select at least one health goal';
        }
        break;

      case 3: // Physical Profile
        if (currentStepData.height && (!currentStepData.height.value || currentStepData.height.value <= 0)) {
          errors.height = 'Please enter a valid height';
        }
        if (currentStepData.weight && (!currentStepData.weight.value || currentStepData.weight.value <= 0)) {
          errors.weight = 'Please enter a valid weight';
        }
        break;

      case 4: // Sleep & Recovery
        if (currentStepData.sleepHours && (currentStepData.sleepHours < 1 || currentStepData.sleepHours > 12)) {
          errors.sleepHours = 'Sleep hours should be between 1 and 12';
        }
        break;

      case 6: // Mental Health & Stress
        if (currentStepData.stressLevel && (currentStepData.stressLevel < 1 || currentStepData.stressLevel > 10)) {
          errors.stressLevel = 'Stress level should be between 1 and 10';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    // Update profile with current step data
    await updateProfile(currentStepData);
    markStepCompleted(currentStep.id);

    if (currentStep.id < ONBOARDING_STEPS.length) {
      setOnboardingStep(currentStep.id + 1);
      setCurrentStepData({});
    } else {
      // Complete onboarding
      await completeOnboarding(currentStepData);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep.id > 1) {
      setOnboardingStep(currentStep.id - 1);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setCurrentStepData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Update step progress
    const currentFields = currentStep.fields;
    const filledFields = currentFields.filter(f => 
      f === field ? value : (currentStepData[f as keyof UserProfile] || profile?.[f as keyof UserProfile])
    );
    const progress = (filledFields.length / currentFields.length) * 100;
    updateStepProgress(currentStep.id, progress);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 1: // Personal Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <Input
                  value={currentStepData.firstName || profile?.firstName || ''}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  error={!!validationErrors.firstName}
                  required
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <Input
                  value={currentStepData.lastName || profile?.lastName || ''}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  error={!!validationErrors.lastName}
                  required
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                type="email"
                value={currentStepData.email || profile?.email || ''}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                error={!!validationErrors.email}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mobile Phone</label>
              <Input
                type="tel"
                value={currentStepData.mobile || profile?.mobile || ''}
                onChange={(e) => handleFieldChange('mobile', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input
                type="date"
                value={currentStepData.dateOfBirth || profile?.dateOfBirth || ''}
                onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={currentStepData.gender || profile?.gender || ''}
                onChange={(e) => handleFieldChange('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        );

      case 2: // Health Goals
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Primary Health Goals</label>
              <div className="grid grid-cols-2 gap-2">
                {HEALTH_GOALS_OPTIONS.map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(currentStepData.primaryHealthGoals || profile?.primaryHealthGoals || []).includes(goal)}
                      onChange={(e) => {
                        const current = currentStepData.primaryHealthGoals || profile?.primaryHealthGoals || [];
                        const updated = e.target.checked
                          ? [...current, goal]
                          : current.filter(g => g !== goal);
                        handleFieldChange('primaryHealthGoals', updated);
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
              {validationErrors.primaryHealthGoals && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.primaryHealthGoals}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Fitness Goals</label>
              <div className="grid grid-cols-2 gap-2">
                {FITNESS_GOALS_OPTIONS.map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(currentStepData.fitnessGoals || profile?.fitnessGoals || []).includes(goal)}
                      onChange={(e) => {
                        const current = currentStepData.fitnessGoals || profile?.fitnessGoals || [];
                        const updated = e.target.checked
                          ? [...current, goal]
                          : current.filter(g => g !== goal);
                        handleFieldChange('fitnessGoals', updated);
                      }}
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Physical Profile
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Height</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Value"
                  value={currentStepData.height?.value || profile?.height?.value || ''}
                  onChange={(e) => handleFieldChange('height', {
                    value: parseFloat(e.target.value) || 0,
                    unit: currentStepData.height?.unit || profile?.height?.unit || 'cm'
                  })}
                  error={!!validationErrors.height}
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={currentStepData.height?.unit || profile?.height?.unit || 'cm'}
                  onChange={(e) => handleFieldChange('height', {
                    value: currentStepData.height?.value || profile?.height?.value || 0,
                    unit: e.target.value as 'cm' | 'ft'
                  })}
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
              {validationErrors.height && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.height}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Weight</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Value"
                  value={currentStepData.weight?.value || profile?.weight?.value || ''}
                  onChange={(e) => handleFieldChange('weight', {
                    value: parseFloat(e.target.value) || 0,
                    unit: currentStepData.weight?.unit || profile?.weight?.unit || 'kg'
                  })}
                  error={!!validationErrors.weight}
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={currentStepData.weight?.unit || profile?.weight?.unit || 'kg'}
                  onChange={(e) => handleFieldChange('weight', {
                    value: currentStepData.weight?.value || profile?.weight?.value || 0,
                    unit: e.target.value as 'kg' | 'lbs'
                  })}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              {validationErrors.weight && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentStepData.activityLevel || profile?.activityLevel || ''}
                onChange={(e) => handleFieldChange('activityLevel', e.target.value)}
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="lightly-active">Lightly active (light exercise 1-3 days/week)</option>
                <option value="moderately-active">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="very-active">Very active (hard exercise 6-7 days/week)</option>
                <option value="extremely-active">Extremely active (very hard exercise, physical job)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Exercise Frequency</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentStepData.exerciseFrequency || profile?.exerciseFrequency || ''}
                onChange={(e) => handleFieldChange('exerciseFrequency', e.target.value)}
              >
                <option value="">Select frequency</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="1-2-times">1-2 times per week</option>
                <option value="3-4-times">3-4 times per week</option>
                <option value="5-6-times">5-6 times per week</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Exercise Types</label>
              <div className="grid grid-cols-2 gap-2">
                {EXERCISE_TYPES_OPTIONS.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(currentStepData.exerciseTypes || profile?.exerciseTypes || []).includes(type)}
                      onChange={(e) => {
                        const current = currentStepData.exerciseTypes || profile?.exerciseTypes || [];
                        const updated = e.target.checked
                          ? [...current, type]
                          : current.filter(t => t !== type);
                        handleFieldChange('exerciseTypes', updated);
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Sleep & Recovery
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Average Sleep Hours per Night</label>
              <Input
                type="number"
                min="1"
                max="12"
                step="0.5"
                value={currentStepData.sleepHours || profile?.sleepHours || ''}
                onChange={(e) => handleFieldChange('sleepHours', parseFloat(e.target.value) || undefined)}
                error={!!validationErrors.sleepHours}
              />
              {validationErrors.sleepHours && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.sleepHours}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Usual Bedtime</label>
                <Input
                  type="time"
                  value={currentStepData.bedTime || profile?.bedTime || ''}
                  onChange={(e) => handleFieldChange('bedTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Usual Wake Time</label>
                <Input
                  type="time"
                  value={currentStepData.wakeTime || profile?.wakeTime || ''}
                  onChange={(e) => handleFieldChange('wakeTime', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sleep Quality</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentStepData.sleepQuality || profile?.sleepQuality || ''}
                onChange={(e) => handleFieldChange('sleepQuality', e.target.value)}
              >
                <option value="">Select sleep quality</option>
                <option value="poor">Poor</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </div>
          </div>
        );

      case 5: // Nutrition & Diet
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Diet Preference</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentStepData.dietPreference || profile?.dietPreference || ''}
                onChange={(e) => handleFieldChange('dietPreference', e.target.value)}
              >
                <option value="">Select diet preference</option>
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="List any dietary restrictions..."
                value={(currentStepData.dietaryRestrictions || profile?.dietaryRestrictions || []).join(', ')}
                onChange={(e) => handleFieldChange('dietaryRestrictions', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Allergies</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="List any allergies..."
                value={(currentStepData.allergies || profile?.allergies || []).join(', ')}
                onChange={(e) => handleFieldChange('allergies', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>
          </div>
        );

      case 6: // Mental Health & Stress
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Stress Level (1-10 scale)
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={currentStepData.stressLevel || profile?.stressLevel || ''}
                onChange={(e) => handleFieldChange('stressLevel', parseInt(e.target.value) || undefined)}
                error={!!validationErrors.stressLevel}
              />
              {validationErrors.stressLevel && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.stressLevel}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meditation Experience</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentStepData.meditationExperience || profile?.meditationExperience || ''}
                onChange={(e) => handleFieldChange('meditationExperience', e.target.value)}
              >
                <option value="">Select experience level</option>
                <option value="none">None</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stress Triggers</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="What are your main stress triggers?"
                value={(currentStepData.stressTriggers || profile?.stressTriggers || []).join(', ')}
                onChange={(e) => handleFieldChange('stressTriggers', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mental Health Goals</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="What mental health goals would you like to work on?"
                value={(currentStepData.mentalHealthGoals || profile?.mentalHealthGoals || []).join(', ')}
                onChange={(e) => handleFieldChange('mentalHealthGoals', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>
          </div>
        );

      case 7: // Supplements & Medical
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Supplements</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="List any supplements you're currently taking..."
                value={(currentStepData.currentSupplements || profile?.currentSupplements || []).join(', ')}
                onChange={(e) => handleFieldChange('currentSupplements', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Medications</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="List any medications you're taking..."
                value={(currentStepData.medicationList || profile?.medicationList || []).join(', ')}
                onChange={(e) => handleFieldChange('medicationList', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Medical Conditions</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="List any medical conditions..."
                value={(currentStepData.medicalConditions || profile?.medicalConditions || []).join(', ')}
                onChange={(e) => handleFieldChange('medicalConditions', 
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentStepData.doctorConsultation ?? profile?.doctorConsultation ?? false}
                  onChange={(e) => handleFieldChange('doctorConsultation', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">I have consulted with a doctor about my health goals</span>
              </label>
            </div>
          </div>
        );

      case 8: // Preferences
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-3">Communication Preferences</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentStepData.communicationPreferences?.email ?? profile?.communicationPreferences?.email ?? true}
                    onChange={(e) => handleFieldChange('communicationPreferences', {
                      ...currentStepData.communicationPreferences,
                      ...profile?.communicationPreferences,
                      email: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Email notifications</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentStepData.communicationPreferences?.push ?? profile?.communicationPreferences?.push ?? true}
                    onChange={(e) => handleFieldChange('communicationPreferences', {
                      ...currentStepData.communicationPreferences,
                      ...profile?.communicationPreferences,
                      push: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Push notifications</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentStepData.communicationPreferences?.sms ?? profile?.communicationPreferences?.sms ?? false}
                    onChange={(e) => handleFieldChange('communicationPreferences', {
                      ...currentStepData.communicationPreferences,
                      ...profile?.communicationPreferences,
                      sms: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">SMS notifications</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3">Privacy Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentStepData.privacySettings?.dataSharing ?? profile?.privacySettings?.dataSharing ?? false}
                    onChange={(e) => handleFieldChange('privacySettings', {
                      ...currentStepData.privacySettings,
                      ...profile?.privacySettings,
                      dataSharing: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Allow data sharing for research purposes</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentStepData.privacySettings?.analytics ?? profile?.privacySettings?.analytics ?? true}
                    onChange={(e) => handleFieldChange('privacySettings', {
                      ...currentStepData.privacySettings,
                      ...profile?.privacySettings,
                      analytics: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Allow analytics to improve the service</span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <span className="text-sm text-gray-500">
            Step {currentStep.id} of {ONBOARDING_STEPS.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep.id / ONBOARDING_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <Card className="p-8">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mr-4">
            <currentStep.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{currentStep.title}</h3>
            <p className="text-gray-600">{currentStep.description}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep.id === 1}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={saving || isLoading}
            className="flex items-center"
          >
            {currentStep.id === ONBOARDING_STEPS.length ? (
              <>
                {saving ? 'Completing...' : 'Complete'}
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedOnboardingForm;