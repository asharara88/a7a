import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Heart, Brain, Activity, Sparkles, Target, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Health Coach',
      description: 'Get personalized health guidance powered by advanced AI and scientific research.',
      gradient: 'from-primary-600 via-primary-500 to-primary-400'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Evidence-Based Supplements',
      description: 'Discover supplements backed by clinical studies and scientific evidence.',
      gradient: 'from-secondary-600 via-secondary-500 to-secondary-400'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Fitness Tracking',
      description: 'Monitor your workouts, recovery, and muscle group development.',
      gradient: 'from-tertiary-600 via-tertiary-500 to-tertiary-400'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Cognitive Enhancement',
      description: 'Optimize your mental performance with targeted nutrition and lifestyle changes.',
      gradient: 'from-primary-600 via-secondary-600 to-tertiary-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Metabolic Health',
      description: 'Track glucose levels, metabolic markers, and optimize your energy systems.',
      gradient: 'from-secondary-600 via-tertiary-600 to-primary-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Personalized Goals',
      description: 'Set and achieve health goals with data-driven insights and recommendations.',
      gradient: 'from-tertiary-600 via-primary-600 to-secondary-600'
    }
  ];

  const trustIndicators = [
    'Science-backed recommendations',
    'Personalized health insights',
    'Secure data protection',
    'Expert-reviewed content'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-tertiary-500/20 to-accent-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-accent-500/15 to-primary-500/15 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="mobile-container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
                <span className="text-gradient block mb-2">Your Personal</span>
                <span className="text-gray-900 dark:text-white block">Health Coach</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                Transform your wellness journey with AI-powered insights, evidence-based supplements, 
                and personalized health optimization.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button
                  as={Link}
                  to="/onboarding"
                  variant="accent"
                  size="xl"
                  className="w-full sm:w-auto min-w-[280px] group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button
                  as={Link}
                  to="/about"
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1, ease: "easeOut" }}
                    className="flex items-center justify-center sm:justify-start text-base text-gray-600 dark:text-gray-400 font-medium"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full mr-3 animate-pulse-glow" />
                    {indicator}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 lg:py-32 relative">
        <div className="mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              <span className="text-gradient block mb-2">Comprehensive</span>
              <span className="text-gray-900 dark:text-white block">Health Platform</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Everything you need to optimize your health, backed by science and powered by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card 
                  variant="premium"
                  className={`h-full cursor-pointer group bg-gradient-to-br ${feature.gradient} text-white border-0 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700`}
                >
                  <div className="relative z-10 p-8">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm inline-flex mb-6 group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-white leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-base lg:text-lg font-medium">
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
      <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-tertiary-500/5" />
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-accent-500/20 to-primary-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="mobile-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-500/10 to-accent-400/10 backdrop-blur-sm text-accent-700 dark:text-accent-300 text-base font-semibold mb-8 border border-accent-500/20">
              <Award className="w-5 h-5 mr-2" />
              Trusted by thousands of users
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              Ready to <span className="text-gradient">Transform</span> Your Health?
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join thousands of users who have already started their personalized wellness journey 
              with science-backed recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                as={Link}
                to="/onboarding"
                variant="accent"
                size="xl"
                className="w-full sm:w-auto min-w-[300px] group"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                as={Link}
                to="/login"
                variant="outline"
                size="xl"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Sign In
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No credit card required • Start your free assessment today
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;