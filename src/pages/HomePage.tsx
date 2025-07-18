import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Zap, Brain, CheckCircle } from 'lucide-react'
import EvidenceBasedHealthOptimization from '../components/health/EvidenceBasedHealthOptimization'
import { motion } from 'framer-motion'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Personalized Health',
      description: 'Get customized supplement recommendations based on your unique health profile.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Science-Backed',
      description: 'All recommendations are based on the latest scientific research and clinical studies.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Optimize Performance',
      description: 'Enhance your energy, focus, and overall well-being with targeted nutrition.'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Coach',
      description: 'Get personalized guidance from our AI health coach to help you reach your wellness goals.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/15 to-tertiary/15 rounded-full blur-3xl"></div>
          </div>
          
          <motion.div 
            className="max-w-4xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <a 
                href="#evidence-based-health" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-full text-sm font-medium text-primary transition-all duration-300 mb-8 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 animate-pulse"></div>
                Evidence-based health optimization
                <ArrowRight className="w-4 h-4 ml-3" />
              </a>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-gray-900 dark:text-white block">Your Personal</span>
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                Health Coach
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Optimize your wellness with personalized, science-backed recommendations powered by AI and real-time health data.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                to="/signup"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group relative backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-primary text-gray-900 dark:text-white hover:text-primary px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10">
                Learn More
                </span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap gap-8 text-base text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center group">
                <div className="p-2 bg-primary/10 rounded-full mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Personalized recommendations</span>
              </div>
              <div className="flex items-center group">
                <div className="p-2 bg-secondary/10 rounded-full mr-3 group-hover:bg-secondary/20 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-medium">Science-backed approach</span>
              </div>
              <div className="flex items-center group">
                <div className="p-2 bg-tertiary/10 rounded-full mr-3 group-hover:bg-tertiary/20 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-tertiary" />
                </div>
                <span className="font-medium">AI-powered insights</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
          </div>
          
          <motion.div 
            className="text-center mb-20 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-medium text-primary mb-4">
              Why Choose Biowell
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The Future of Personalized Wellness
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Advanced AI technology meets evidence-based health science
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/30 relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Evidence-Based Health Optimization Section */}
      <section id="evidence-based-health">
        <EvidenceBasedHealthOptimization expanded={false} />
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-dark via-secondary-dark to-tertiary-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
              Ready to Get Started?
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to optimize your health?
            </h2>
            <p className="text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who have transformed their wellness journey
            </p>
            <Link
              to="/signup" 
              className="group relative overflow-hidden bg-white/15 hover:bg-white/25 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl inline-flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
              Start Your Journey
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage