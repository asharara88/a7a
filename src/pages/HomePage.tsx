import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Zap, Brain } from 'lucide-react'

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
      {/* Hero Section with responsive padding */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-20">
        <div className="mobile-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Your Digital Wellness Coach
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-light/90">
              Personalized supplement recommendations powered by science
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-primary px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with responsive spacing */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-all duration-200">
        <div className="mobile-container">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Why Choose Biowell?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Experience the future of personalized wellness
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-800 inline-flex">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-white transition-all duration-200">
        <div className="mobile-container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to optimize your health?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8">
            Join thousands of users who have transformed their wellness journey
          </p>
          <Link
            to="/onboarding"
            className="bg-white text-primary px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage