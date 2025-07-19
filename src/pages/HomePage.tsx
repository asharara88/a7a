import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Brain, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="relative w-full h-full">
              <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                  Health Coach
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Optimize your everyday with personalized, science-backed guidance for nutrition, fitness, sleep, and wellness.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  as={Link}
                  to="/onboarding"
                  className="bg-gradient-to-r from-primary via-secondary to-tertiary text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button
                  as={Link}
                  to="/about"
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  AI-Powered Coaching
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-secondary" />
                  Evidence-Based
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-tertiary" />
                  Personalized
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-primary" />
                  Comprehensive
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to optimize your health
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From personalized coaching to supplement recommendations, we've got your wellness journey covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Health Coach</h3>
              <p className="text-gray-600 dark:text-gray-300">Get personalized guidance from our AI coach trained on the latest health science.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fitness Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Track workouts, monitor progress, and get AI-generated workout plans.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-tertiary/5 to-tertiary/10 hover:from-tertiary/10 hover:to-tertiary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-tertiary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Supplements</h3>
              <p className="text-gray-600 dark:text-gray-300">Evidence-based supplement recommendations tailored to your goals.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-tertiary/10 hover:from-primary/10 hover:to-tertiary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Holistic Wellness</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive approach covering nutrition, sleep, stress, and recovery.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-tertiary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to transform your health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have optimized their wellness with personalized, science-backed guidance.
            </p>
            <Button
              as={Link}
              to="/onboarding"
              className="bg-white text-primary px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;