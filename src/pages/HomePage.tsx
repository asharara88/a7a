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
      <section className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-28 sm:py-36 md:py-44 relative overflow-hidden">
        <div className="mobile-container max-w-6xl mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a 
              href="#evidence-based-health" 
              className="inline-block bg-gray-100 dark:bg-gray-800 rounded-xl px-5 py-1.5 mb-8 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wider">Evidence-based health optimization</span>
            </a>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight text-left leading-tight">
              <span>Your Personal </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
                Health Coach
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-12 sm:mb-14 text-gray-700 dark:text-gray-300 max-w-3xl tracking-wide text-left leading-relaxed">
              Optimize your everyday.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 sm:gap-7 mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                 to="/onboarding"
                  className="bg-blue-700 dark:bg-blue-600 text-white px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg min-w-[200px] tracking-wide"
                >
                 Get Started
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                 to="/login"
                  className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-gray-700 px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg min-w-[200px] tracking-wide"
                >
             Sign In
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-wrap gap-7 text-sm text-gray-600 dark:text-gray-400 tracking-wider">
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
      <section className="py-20 sm:py-24 md:py-28 bg-white dark:bg-gray-900 transition-all duration-300 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/5 to-blue-300/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-600/5 to-blue-400/5 rounded-tr-full"></div>
        
        <div className="mobile-container">
          <motion.div 
            className="mb-14 sm:mb-18 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-7 tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-blue-300">
              Why Choose Biowell?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl tracking-wide leading-relaxed">
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
                className={`p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                  index % 4 === 0 ? 'bg-blue-700' : 
                  index % 4 === 1 ? 'bg-blue-600' : 
                  index % 4 === 2 ? 'bg-blue-500' :
                  'bg-blue-600'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex mb-6">
                  <div className="p-4 rounded-lg bg-white/20 inline-flex">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-5 text-left tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-white dark:text-white text-base text-left tracking-wide leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 bg-white dark:bg-gray-900 text-center">
        <div className="mobile-container">
          <div className="flex justify-center">
            <img 
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_logo_light_theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9sb2dvX2xpZ2h0X3RoZW1lLnN2ZyIsImlhdCI6MTc1MjY2MzQ0NiwiZXhwIjoxNzg0MTk5NDQ2fQ.gypGnDpYXvYFyGCKWfeyCrH4fYBGEcNOKurPfcbUcWY"
              alt="Biowell Logo" 
              className="h-24 w-auto object-contain dark:hidden" 
            />
            <img 
              src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
              alt="Biowell Logo" 
              className="h-24 w-auto object-contain hidden dark:block" 
            />
          </div>
        </div>
      </section>

      {/* Evidence-Based Health Optimization Section */}
      <section id="evidence-based-health">
        <EvidenceBasedHealthOptimization expanded={false} />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-all duration-300 relative overflow-hidden">
        {/* Animated background elements */}
        
        <div className="mobile-container">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-7 sm:mb-9 tracking-tight text-left leading-tight"
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
            className="text-xl sm:text-2xl mb-12 sm:mb-14 text-gray-700 dark:text-gray-300 max-w-3xl tracking-wide text-left leading-relaxed"
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
             to="/signup" 
              className="bg-blue-700 dark:bg-blue-600 text-white px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl text-lg tracking-wide"
            >
             Create Account
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage