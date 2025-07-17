import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const features = {
    free: [
      'Basic health assessment',
      'Limited AI Coach interactions',
      'Standard recipe recommendations',
      'Basic sleep tracking',
      'Manual workout logging'
    ],
    premium: [
      'Comprehensive health assessment',
      'Unlimited AI Coach interactions',
      'Personalized recipe library',
      'Advanced sleep analysis',
      'Automated workout tracking',
      'Custom supplement recommendations',
      'Wearable device integration',
      'Priority support'
    ],
    enterprise: [
      'Everything in Premium',
      'Team management',
      'Corporate wellness programs',
      'Advanced analytics',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Path to Wellness
          </motion.h1>
          <motion.p
            className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select the plan that best fits your health and wellness goals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="flex flex-col h-full p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get started with basic health tracking
                </p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">$0</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Free forever</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {features.free.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/signup" className="w-full">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="flex flex-col h-full p-6 border-primary dark:border-primary shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white px-4 py-1 transform rotate-45 translate-x-6 -translate-y-3 shadow-md">
                  Popular
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Advanced health optimization
                </p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">$12.99</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Billed monthly, cancel anytime</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {features.premium.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/signup" className="w-full">
                <Button className="w-full">Get Premium</Button>
              </Link>
            </Card>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="flex flex-col h-full p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Custom solutions for organizations
                </p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">Custom</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Contact us for pricing</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {features.enterprise.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="w-full">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What happens to my data if I cancel?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your data is securely stored for 30 days after cancellation. You can reactivate your account during this time to regain access. After 30 days, your data will be permanently deleted.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Which wearable devices are supported?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We support integration with Apple Watch, Oura Ring, Fitbit, Garmin, Whoop, and most major wearable devices through our premium plan.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is my health data secure?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely. Your health data is encrypted both in transit and at rest. We adhere to strict privacy policies and never sell your personal information to third parties.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to transform your health journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are optimizing their wellness with personalized, science-backed recommendations.
          </p>
          <Link to="/signup">
            <Button size="lg" className="px-8">
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;