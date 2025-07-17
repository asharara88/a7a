import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HeartPulse, Users, Clock, Activity, User, Calendar } from 'lucide-react';

const ParticipationSelectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Participation Role
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select how you'll be participating in the fertility tracking and wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Individual Role */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary flex flex-col h-full">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/30 flex items-center justify-center">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-md">
                <User className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Individual Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">
                Track your personal health and wellness goals. This option is perfect if you're focusing on your individual health journey without partner synchronization.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Personal health tracking and analytics</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Personalized supplement recommendations</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">AI-powered health coaching</span>
                </div>
              </div>
              
              <Link to="/dashboard" className="block w-full">
                <Button className="w-full">Select Individual Journey</Button>
              </Link>
            </div>
          </Card>

          {/* Partner Role */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary flex flex-col h-full">
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/30 flex items-center justify-center">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-md">
                <Users className="h-16 w-16 text-purple-500" />
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Partner Sync
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">
                Connect with your partner to coordinate fertility tracking, ovulation timing, and shared health goals for family planning or pregnancy support.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Synchronized fertility tracking</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Partner-specific recommendations</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Ovulation and fertility window notifications</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Coordinated supplement recommendations</span>
                </div>
              </div>
              
              <Link to="/fertility/partner" className="block w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Select Partner Sync</Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features Available in Both Options</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 flex-shrink-0">
                <HeartPulse className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Health Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive tracking of health metrics from wearables and manual input.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3 flex-shrink-0">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Fitness Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track workouts and analyze performance trends over time.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-3 flex-shrink-0">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Cycle Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track menstrual cycles and fertile windows with predictive analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationSelectionPage;