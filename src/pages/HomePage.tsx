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
              className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/30 rounded-full px-6 py-2.5 mb-8 hover:from-primary/20 hover:to-secondary/20 dark:hover:from-primary/30 dark:hover:to-secondary/30 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-semibold text-primary dark:text-primary-light tracking-wide">Evidence-based health optimization</span>
                <svg className="w-4 h-4 ml-2 text-primary/70 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
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
                  className="bg-gradient-to-r from-primary to-secondary text-white px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg min-w-[200px] tracking-wide transform hover:-translate-y-0.5 hover:scale-105"
                >
                 Get Started
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                 to="/login"
                  className="bg-white dark:bg-gray-800 text-primary dark:text-primary-light border-2 border-primary/20 dark:border-primary/30 px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg min-w-[200px] tracking-wide transform hover:-translate-y-0.5 hover:scale-105"
                >
             Create Account
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-wrap gap-7 text-sm text-gray-600 dark:text-gray-400 tracking-wider">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Personalized recommendations</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-medium">Science-backed approach</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-tertiary/10 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-tertiary" />
                </div>
                <span className="font-medium">AI-powered insights</span>
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
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-primary to-primary-dark' : 
                  index % 4 === 1 ? 'bg-gradient-to-br from-secondary to-secondary-dark' : 
                  index % 4 === 2 ? 'bg-gradient-to-br from-tertiary to-tertiary-dark' :
                  'bg-gradient-to-br from-primary-light to-primary'
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
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="flex mb-6">
                  <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm inline-flex shadow-lg group-hover:bg-white/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-5 text-left tracking-tight relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-base text-left tracking-wide leading-relaxed relative z-10">
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
              className="bg-gradient-to-r from-primary via-secondary to-tertiary text-white px-9 sm:px-11 py-4.5 rounded-xl font-semibold hover:from-primary-dark hover:via-secondary-dark hover:to-tertiary-dark transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl text-lg tracking-wide transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
             Create Account
              </span>
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage