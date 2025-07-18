import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Activity, 
  Utensils, 
  Calendar,
  BarChart,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import DashboardCards from '../components/dashboard/DashboardCards';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal Health Revolution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlock evidence-based insights for optimal health. Track, analyze, and improve your wellness journey with AI-powered guidance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Real-Time Health Insights
          </h2>
          <DashboardCards />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need for Optimal Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who are already optimizing their health with evidence-based insights.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: "AI Health Coach",
    description: "Get personalized recommendations based on your health data and goals."
  },
  {
    icon: Activity,
    title: "Fitness Tracking",
    description: "Monitor workouts, steps, and activity levels with smart device integration."
  },
  {
    icon: Utensils,
    title: "Nutrition Insights",
    description: "Track macros, discover healthy recipes, and optimize your diet."
  },
  {
    icon: Calendar,
    title: "BioClock Analysis",
    description: "Understand your circadian rhythm and optimize sleep patterns."
  },
  {
    icon: BarChart,
    title: "Lab Results Tracking",
    description: "Monitor biomarkers and track health improvements over time."
  },
  {
    icon: Shield,
    title: "Evidence-Based",
    description: "All recommendations backed by peer-reviewed scientific research."
  }
];

export default HomePage;
