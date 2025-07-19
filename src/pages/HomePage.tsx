import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Brain, Heart, Zap, Shield, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "AI Health Coach",
      description: "Personalized guidance powered by advanced AI to optimize your wellness journey."
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Real-time Tracking",
      description: "Monitor your health metrics with seamless wearable device integration."
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Holistic Wellness",
      description: "Comprehensive approach covering nutrition, fitness, sleep, and mental health."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Smart Recommendations",
      description: "Evidence-based supplement and lifestyle recommendations tailored to you."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Privacy First",
      description: "Your health data is encrypted and secure with enterprise-grade protection."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Community Support",
      description: "Connect with like-minded individuals on similar wellness journeys."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 -left-32 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in-up">
              Your <span className="text-gradient">Digital Wellness</span> Coach
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Transform your health with AI-powered insights, personalized recommendations, and real-time tracking. 
              Your journey to optimal wellness starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button size="xl" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need for <span className="text-gradient">optimal health</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and insights to help you achieve your wellness goals with science-backed recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="glass" 
                className="p-8 hover:scale-105 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to transform your health?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join thousands of users who have already started their wellness journey with Biowell.
          </p>
          <Link to="/signup">
            <Button 
              size="xl" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage