import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Zap, Brain, CheckCircle } from 'lucide-react'
import EvidenceBasedHealthOptimization from '../components/health/EvidenceBasedHealthOptimization'
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
      icon: <Shield className="w-10 h-10 text-secondary" />,
      title: 'Science-Backed',
      description: 'All recommendations are based on the latest scientific research and clinical studies.'
    },
    {
      icon: <Zap className="w-10 h-10 text-tertiary" />,
      title: 'Optimize Performance',
      description: 'Enhance your energy, focus, and overall well-being with targeted nutrition.'
    },
    {
      icon: <Brain className="w-10 h-10 text-secondary-light" />,
      title: 'AI-Powered Coach',
      description: 'Get personalized guidance from our AI health coach to help you reach your wellness goals.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with consistent styling */}
      <section className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-24 sm:py-32 md:py-40 relative overflow-hidden">
        <div className="mobile-container max-w-6xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a 
              href="#evidence-based-health" 
              className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1 mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Evidence-based health optimization</span>
            </a>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span>Your Personal </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
                Health Coach
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-10 sm:mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your health with personalized insights and evidence-based recommendations.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/dashboard"
                  className="bg-blue-700 dark:bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-gray-700 px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span>Science-backed approach</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span>AI-powered insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with responsive spacing */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900 transition-all duration-200 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/5 to-blue-300/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-600/5 to-blue-400/5 rounded-tr-full"></div>
        
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
              Why Choose Biowell?
              </span>
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
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-700 to-blue-600' : 
                  index % 4 === 1 ? 'bg-gradient-to-br from-blue-600 to-blue-500' : 
                  index % 4 === 2 ? 'bg-gradient-to-br from-blue-500 to-blue-400' :
                  'bg-gradient-to-br from-blue-600 to-blue-500'
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

      {/* Evidence-Based Health Optimization Section */}
      <section id="evidence-based-health">
        <EvidenceBasedHealthOptimization expanded={false} />
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-all duration-200 relative overflow-hidden">
        {/* Animated background elements */}
        
        <div className="mobile-container text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
              Ready to optimize your health?
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl sm:text-2xl mb-10 sm:mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
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
              className="bg-blue-700 dark:bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl text-lg"
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