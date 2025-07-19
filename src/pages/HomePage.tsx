import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Heart, Brain, Activity, Sparkles, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Health Coach',
      description: 'Get personalized health guidance powered by advanced AI and scientific research.',
      gradient: 'from-primary-dark to-primary'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Evidence-Based Supplements',
      description: 'Discover supplements backed by clinical studies and scientific evidence.',
      gradient: 'from-secondary-dark to-secondary'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Fitness Tracking',
      description: 'Monitor your workouts, recovery, and muscle group development.',
      gradient: 'from-tertiary-dark to-tertiary'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Cognitive Enhancement',
      description: 'Optimize your mental performance with targeted nutrition and lifestyle changes.',
      gradient: 'from-primary to-secondary'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Metabolic Health',
      description: 'Track glucose levels, metabolic markers, and optimize your energy systems.',
      gradient: 'from-secondary to-tertiary'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Personalized Goals',
      description: 'Set and achieve health goals with data-driven insights and recommendations.',
      gradient: 'from-tertiary to-primary'
    }
  ];

  const trustIndicators = [
    'Science-backed recommendations',
    'Personalized health insights',
    'Secure data protection',
    'Expert-reviewed content'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-tertiary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <div className="mobile-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Your Personal</span>
                <br />
                <span className="text-gray-900 dark:text-white">Health Coach</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your wellness journey with AI-powered insights, evidence-based supplements, 
                and personalized health optimization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  as={Link}
                  to="/onboarding"
                  size="xl"
                  variant="accent"
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                
                <Button
                  as={Link}
                  to="/about"
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse-glow" />
                    {indicator}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Comprehensive</span>
              <span className="text-gray-900 dark:text-white"> Health Platform</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to optimize your health, backed by science and powered by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  variant="elevated"
                  className={`feature-card bg-gradient-to-br ${feature.gradient} h-full cursor-pointer group`}
                >
                  <div className="relative z-10">
                    <div className="p-3 rounded-2xl bg-white/20 inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-tertiary/5" />
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="mobile-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Trusted by thousands of users
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">Transform</span> Your Health?
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already started their personalized wellness journey 
              with science-backed recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                as={Link}
                to="/onboarding"
                size="xl"
                variant="accent"
                className="w-full sm:w-auto min-w-[250px] group"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                as={Link}
                to="/login"
                size="xl"
                variant="outline"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Sign In
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              No credit card required • Start your free assessment today
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;