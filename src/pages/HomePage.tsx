import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import EvidenceBasedHealthOptimization from '../components/health/EvidenceBasedHealthOptimization'
import { ArrowRight, Shield, Zap, Target, Users, Star, CheckCircle } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Health Optimization",
      description: "AI-powered recommendations tailored to your unique biology and goals",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Biometric Tracking",
      description: "Connect your wearables and CGM for continuous health monitoring",
      gradient: "from-blue-400 to-blue-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Evidence-Based Supplements",
      description: "Clinically-backed supplement recommendations with tier-based safety ratings",
      gradient: "from-blue-300 to-blue-400"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Longevity Researcher",
      content: "Biowell's evidence-based approach to health optimization is revolutionary.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Biohacker",
      content: "The personalized supplement stacks have transformed my energy levels.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Functional Medicine",
      content: "Finally, a platform that combines cutting-edge science with practical application.",
      rating: 5
    }
  ]

  const trustIndicators = [
    "Evidence-based recommendations",
    "Peer-reviewed research",
    "Expert-curated content",
    "Personalized to your biology",
    "Continuous optimization"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-400/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Optimize Your Health with
                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Science-Driven Precision
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your AI-powered digital wellness coach that combines cutting-edge biometric tracking, 
                evidence-based supplements, and personalized optimization protocols.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  variant="accent"
                  className="w-full sm:w-auto group"
                  asChild
                >
                  <Link to="/signup">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={indicator}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center justify-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{indicator}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Optimization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your health, backed by science and personalized to your unique biology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full p-8 text-center group hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-50/50 to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Health Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what experts and users are saying about Biowell
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-blue-400/10" />
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Optimize Your Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already optimizing their health with science-backed recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="accent"
                className="group"
                asChild
              >
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage