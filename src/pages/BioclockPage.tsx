import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { 
  Clock, 
  Sun, 
  Moon, 
  Coffee, 
  Utensils, 
  Lightbulb, 
  Timer, 
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Eye,
  Pill,
  Activity
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CircadianHealthDashboard = () => (
  <div className="space-y-6">
    {/* Current Circadian Status */}
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 mr-4">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Circadian Rhythm</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Current status and optimization score</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
          <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Light Exposure</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Good</p>
        </div>
        
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
          <Moon className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Timing</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Optimal</p>
        </div>
        
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
          <Utensils className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Meal Timing</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Fair</p>
        </div>
        
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
          <Coffee className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Caffeine Timing</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Needs Work</p>
        </div>
      </div>
    </Card>

    {/* Circadian Optimization Tools */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Light Exposure Tool */}
      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Light Exposure Optimizer</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Track and optimize your daily light exposure for better circadian rhythm.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Morning Light (6-9 AM)</span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">✓ 15 min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Afternoon Light (12-3 PM)</span>
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">⚠ 5 min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Evening Light Avoidance</span>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">✗ Too much</span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Track Light Exposure
        </Button>
      </Card>

      {/* Fasting Protocols */}
      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30 mr-3">
            <Timer className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fasting Protocols</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Optimize your eating window to align with your circadian rhythm.
        </p>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">16:8 Protocol</span>
              <span className="text-sm text-green-600 dark:text-green-400">Active</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Eating: 12 PM - 8 PM</p>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Current fast:</span>
            <span className="font-medium text-gray-900 dark:text-white">14h 23m</span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="outline">
          <Utensils className="w-4 h-4 mr-2" />
          Manage Fasting
        </Button>
      </Card>

      {/* Caffeine Timing */}
      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 mr-3">
            <Coffee className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Caffeine Optimizer</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Time your caffeine intake to maximize energy without disrupting sleep.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Optimal window:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">9 AM - 2 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Last intake:</span>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">4:30 PM (Late!)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sleep impact:</span>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">High risk</span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="outline">
          <Coffee className="w-4 h-4 mr-2" />
          Log Caffeine
        </Button>
      </Card>

      {/* Circadian Supplements */}
      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 mr-3">
            <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Circadian Supplements</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Supplements to support your natural circadian rhythm.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">Melatonin (0.5mg)</span>
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">Recommended</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">Magnesium Glycinate</span>
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">Recommended</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">L-Theanine</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">Optional</span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="accent">
          <Pill className="w-4 h-4 mr-2" />
          View Recommendations
        </Button>
      </Card>
    </div>
  </div>
);

const CircadianInsights = () => (
  <Card className="p-6 mb-6">
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 mr-3">
        <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Circadian Health Insights</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Today's Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Get 15 minutes of morning sunlight within 1 hour of waking to set your circadian clock.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Avoid caffeine after 2 PM to prevent sleep disruption tonight.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Start dimming lights 2 hours before your target bedtime (10 PM).</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Consider taking 0.5mg melatonin 30 minutes before bed for better sleep onset.</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Weekly Trends</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sleep consistency</span>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                <div className="w-12 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">75%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Light exposure</span>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                <div className="w-10 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">60%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Meal timing</span>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                <div className="w-8 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const CircadianClock = () => (
  <Card className="p-6 mb-6">
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 mr-3">
        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">24-Hour Circadian Clock</h3>
    </div>
    <div className="text-center py-8">
      <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-4 relative">
        {/* Clock visualization */}
        <div className="absolute inset-4 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
        <div className="absolute inset-8 border border-gray-200 dark:border-gray-700 rounded-full"></div>
        
        {/* Current time indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
        </div>
        
        {/* Time labels */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400">6 AM</div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400">6 PM</div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-600 dark:text-gray-400">12 AM</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-600 dark:text-gray-400">12 PM</div>
        
        <div className="text-center">
          <Clock className="w-16 h-16 mx-auto text-primary mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Time</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">2:15 PM</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Your circadian rhythm is currently in the <span className="font-medium text-primary">afternoon alertness</span> phase
      </p>
    </div>
  </Card>
);

export default function BioclockPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
      <div className="mobile-container max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bioclock™</h1>
          <p className="text-gray-600 dark:text-gray-400">Optimize your circadian health and natural rhythm</p>
        </div>
        
        <CircadianInsights />
        <CircadianClock />
        <CircadianHealthDashboard />
      </div>
    </div>
  );
}