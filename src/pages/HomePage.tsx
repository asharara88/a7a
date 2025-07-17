import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Zap, Brain, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

// Features data
const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Heart className="w-10 h-10 text-primary" />,
      title: 'Personalized Health',
      description: 'Get customized supplement recommendations based on your unique health profile.'
    },
    {
      icon: <Shield className="w-10 h-10 text-green-400" />,
      title: 'Science-Backed',
      description: 'All recommendations are based on the latest scientific research and clinical studies.'
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      title: 'Optimize Performance',
      description: 'Enhance your energy, focus, and overall well-being with targeted nutrition.'
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-400" />,
      title: 'AI-Powered Coach',
      description: 'Get personalized guidance from our AI health coach to help you reach your wellness goals.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with consistent styling */}
      <section className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-secondary opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />
        
        <div className="mobile-container">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-shadow-sm">
              Your Digital Wellness Coach
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 text-white/90">
              Personalized supplement recommendations powered by science
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/about"
                  className="bg-primary text-white px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="mt-16 hidden md:flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="cursor-pointer"
                onClick={() => window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })}
              >
                <ChevronDown className="w-8 h-8 text-white/70" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with responsive spacing */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900 transition-all duration-200 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-tertiary/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-secondary/5 to-tertiary/5 rounded-tr-full"></div>
        
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Why Choose Biowell?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of personalized wellness
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`text-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  index % 3 === 0 ? 'bg-gradient-to-br from-primary-dark to-primary' : 
                  index % 3 === 1 ? 'bg-gradient-to-br from-secondary-dark to-secondary' : 
                  'bg-gradient-to-br from-tertiary-dark to-tertiary'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-white/20 inline-flex">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white dark:text-white text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-all duration-200 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
        />
        
        <div className="mobile-container text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to optimize your health?
          </motion.h2>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of users who have transformed their wellness journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/onboarding"
              className="bg-primary text-white px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl text-lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage