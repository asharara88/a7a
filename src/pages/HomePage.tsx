import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import EvidenceBasedHealthOptimization from '../components/health/EvidenceBasedHealthOptimization'
import { ArrowRight, Shield, Zap, Target, Users, Star, CheckCircle, Sparkles, Activity, Brain, Heart, Award } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Health Coach",
      description: "Personalized coaching with voice responses powered by OpenAI and ElevenLabs",
      gradient: "from-primary-500 to-primary-600",
      delay: 0.1
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Tracking",
      description: "Connect wearables, CGM, and health devices for continuous monitoring",
      gradient: "from-secondary-500 to-secondary-600",
      delay: 0.2
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Evidence-Based Supplements",
      description: "Clinically-backed recommendations with tier-based safety ratings",
      gradient: "from-tertiary-500 to-tertiary-600",
      delay: 0.3
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Comprehensive Wellness",
      description: "Sleep, nutrition, fitness, and metabolic health in one platform",
      gradient: "from-accent-500 to-accent-600",
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
    { number: "50+", label: "Health Metrics", icon: <Target className="w-5 h-5" /> },
    { number: "24/7", label: "AI Support", icon: <Brain className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-tertiary-100 to-accent-100 dark:from-tertiary-900/20 dark:to-accent-900/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 mb-8">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Powered by AI • Evidence-Based • Personalized
                </span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                Your Personal
                <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent mt-2">
                  Wellness Coach
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
                Optimize yourself everyday.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                AI-powered wellness coaching with evidence-based supplements, 
                real-time health tracking, and personalized optimization.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  asChild
                >
                  <Link to="/signup">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 dark:border-gray-600 px-8 py-4 text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  asChild
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 mr-2">
                        <div className="text-primary">{stat.icon}</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.number}
                      </div>
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
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Health Optimization
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to optimize your health, backed by science and personalized to your unique biology.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who are already optimizing their health with science-backed, 
              AI-powered recommendations tailored specifically for them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                asChild
              >
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-gray-300 dark:border-gray-600 px-10 py-4 text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              {[
                { icon: <Shield className="w-4 h-4" />, text: "Evidence-Based" },
                { icon: <CheckCircle className="w-4 h-4" />, text: "Peer-Reviewed" },
                { icon: <Award className="w-4 h-4" />, text: "Expert-Curated" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="text-accent">{item.icon}</div>
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