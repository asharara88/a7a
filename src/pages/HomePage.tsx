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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl"
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
                className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/15 border border-primary/20 hover:border-primary/30 rounded-full text-sm font-medium text-primary transition-all duration-300 mb-8"
              >
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Evidence-based health optimization
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-gray-900 dark:text-white">Your Personal </span>
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                Health Coach
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Optimize your wellness with personalized, science-backed recommendations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                to="/signup"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-secondary/30 dark:border-secondary/50 hover:border-secondary/60 dark:hover:border-secondary/70 text-secondary dark:text-secondary-light hover:bg-secondary/5 dark:hover:bg-secondary/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap gap-8 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-secondary mr-2" />
                <span>Science-backed approach</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-tertiary mr-2" />
                <span>AI-powered insights</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Biowell?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of personalized wellness
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
      <section className="py-24 bg-gradient-to-br from-primary-dark via-secondary-dark to-tertiary-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to optimize your health?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have transformed their wellness journey
            </p>
            <Link
              to="/signup" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage