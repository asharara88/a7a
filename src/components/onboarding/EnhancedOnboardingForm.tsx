import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  healthGoals: string[];
  activityLevel: string;
  dietPreference: string;
}

const EnhancedOnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    healthGoals: [],
    activityLevel: '',
    dietPreference: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Onboarding completed:', formData);
    // Handle form submission
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to Biowell
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Age"
              value={formData.age || ''}
              onChange={(e) => updateFormData('age', parseInt(e.target.value))}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Health Goals</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select your primary health goals (choose multiple):
            </p>
            {['Weight Management', 'Muscle Building', 'Better Sleep', 'Increased Energy', 'Stress Reduction'].map(goal => (
              <label key={goal} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.healthGoals.includes(goal)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFormData('healthGoals', [...formData.healthGoals, goal]);
                    } else {
                      updateFormData('healthGoals', formData.healthGoals.filter(g => g !== goal));
                    }
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-gray-700 dark:text-gray-300">{goal}</span>
              </label>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Activity Level</h3>
            {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'].map(level => (
              <label key={level} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="activityLevel"
                  value={level}
                  checked={formData.activityLevel === level}
                  onChange={(e) => updateFormData('activityLevel', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-gray-700 dark:text-gray-300">{level}</span>
              </label>
            ))}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Diet Preference</h3>
            {['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo'].map(diet => (
              <label key={diet} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="dietPreference"
                  value={diet}
                  checked={formData.dietPreference === diet}
                  onChange={(e) => updateFormData('dietPreference', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-gray-700 dark:text-gray-300">{diet}</span>
              </label>
            ))}
          </div>
        )}
      </motion.div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="flex items-center">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="flex items-center">
            Complete
            <Check className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default EnhancedOnboardingForm;