import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import EvidenceBasedHealthOptimization from '../components/health/EvidenceBasedHealthOptimization'
import { ArrowRight, Shield, Zap, Target, Users, Star, CheckCircle, Sparkles, Activity, Brain, Heart } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Health Coach",
      description: "Personalized coaching with voice responses powered by OpenAI and ElevenLabs",
      gradient: "from-blue-500 to-purple-600",
      delay: 0.1
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description: "Connect wearables, CGM, and health devices for continuous monitoring",
      gradient: "from-green-500 to-teal-600",
      delay: 0.2
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Evidence-Based Supplements",
      description: "Clinically-backed recommendations with tier-based safety ratings",
      gradient: "from-orange-500 to-red-600",
      delay: 0.3
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Comprehensive Wellness",
      description: "Sleep, nutrition, fitness, and metabolic health in one platform",
      gradient: "from-pink-500 to-rose-600",
      delay: 0.4
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Longevity Researcher",
      content: "Biowell's evidence-based approach to health optimization is revolutionary. The AI coach provides insights I've never seen before.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Marcus Rodriguez",
      role: "Biohacker & Entrepreneur",
      content: "The personalized supplement stacks have transformed my energy levels. Finally, a platform that combines cutting-edge science with practical application.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Dr. Emily Watson",
      role: "Functional Medicine Practitioner",
      content: "I recommend Biowell to all my patients. The integration of wearable data with supplement recommendations is game-changing.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ]

  const stats = [
    { number: "50+", label: "Health Metrics" },
    { number: "24/7", label: "AI Support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-24 sm:pb-40">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Powered by AI • Evidence-Based • Personalized
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Optimize Your Health with
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mt-2">
                  AI-Powered Precision
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Your personal AI wellness coach that combines cutting-edge biometric tracking, 
                evidence-based supplements, and personalized optimization protocols.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-10 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0"
                  asChild
                >
                  <Link to="/signup">
                    Start Your Journey
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 px-10 py-4 text-lg font-medium rounded-2xl backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  asChild
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Comprehensive Health Optimization
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to optimize your health, backed by science and personalized to your unique biology.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Card className="h-full p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence-Based Health Optimization Section */}
      <EvidenceBasedHealthOptimization />

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Trusted by Health Professionals
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See what experts and users are saying about Biowell
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who are already optimizing their health with science-backed, 
              AI-powered recommendations tailored specifically for them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-12 py-5 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0"
                asChild
              >
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 px-12 py-5 text-xl font-medium rounded-2xl backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Shield className="w-6 h-6" />, text: "Evidence-Based Recommendations" },
                { icon: <CheckCircle className="w-6 h-6" />, text: "Peer-Reviewed Research" },
                { icon: <Users className="w-6 h-6" />, text: "Expert-Curated Content" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300"
                >
                  <div className="text-green-500">{item.icon}</div>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage