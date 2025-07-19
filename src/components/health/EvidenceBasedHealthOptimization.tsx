import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, BookOpen, Brain, Heart, Activity, Moon, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EvidenceBasedHealthOptimizationProps {
  expanded?: boolean;
}

const EvidenceBasedHealthOptimization: React.FC<EvidenceBasedHealthOptimizationProps> = ({ 
  expanded = false 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="mobile-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Biowell Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
              Evidence-Based Health Optimization
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Using scientifically proven methods to improve your health and wellness
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                What is Evidence-Based Health Optimization?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Evidence-based health optimization means using scientifically proven methods to improve your health. 
                It focuses on strategies that have been tested and validated through research, helping you make 
                decisions that are more likely to be effective for long-term health.
              </p>

              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Key Principles:
              </h4>
        
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Scientific Backing</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      All recommendations are based on solid research and clinical studies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                    <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Whole-Person Health</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      We consider all aspects of wellness: physical, mental, nutritional, and recovery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Personalized Approach</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Recommendations are tailored to your unique health profile and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Research Behind Health Practices:
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3 mt-1">
                    <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Sleep</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Research shows that consistent, quality sleep supports immune function, cognitive performance, and metabolic health.
                    </p>
                  </div>
                </div>
          
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3 mt-1">
                    <Utensils className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Nutrition</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Studies consistently show that diets rich in whole foods, lean proteins, and healthy fats
                      support longevity and reduce inflammation.
                    </p>
                  </div>
                </div>
          
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 mr-3 mt-1">
                    <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Fitness</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Even moderate physical activity has been shown to reduce all-cause mortality and
                      improve mental health outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Simple Tips to Optimize Your Health:
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Sleep Better</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Stick to a sleep schedule, reduce screen time before bed, and make your bedroom comfortable.
                    </p>
                  </div>
                </div>
          
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Eat Healthy</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Focus on a balanced diet with fruits, vegetables, lean proteins, and healthy fats.
                    </p>
                  </div>
                </div>
          
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">Stay Active</h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      Include both aerobic exercise and strength training in your routine for better fitness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  How Metrics Help:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Metrics like BMI, sleep scores, and fitness levels track your progress and help you see how well 
                  you're optimizing your health. By monitoring these, you can make smarter, data-driven decisions 
                  to improve your well-being.
                </p>
          
                <div className="flex justify-center">
                  <Link
                    to="/onboarding"
                    className="bg-blue-700 dark:bg-blue-600 text-white px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl text-lg tracking-wide"
                  >
                    Start Your Health Optimization Journey
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvidenceBasedHealthOptimization;