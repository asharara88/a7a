import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { 
  User, 
  Calendar, 
  Activity, 
  Heart, 
  Brain, 
  Dna, 
  TrendingUp, 
  Award, 
  Sparkles,
  Crown,
  Lock,
  ChevronRight,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProfileOverview = () => (
  <div className="space-y-6">
    {/* Profile Header */}
    <Card className="p-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-gray-800 dark:to-secondary-900/10 border border-primary-100 dark:border-primary-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-tertiary-500 flex items-center justify-center shadow-lg mr-6">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Health Profile</h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive health overview and insights</p>
          </div>
        </div>
        <Button variant="outline" className="border-primary-200 text-primary-700 hover:bg-primary-50">
          <User className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-primary-100 dark:border-primary-800">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-primary-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Age</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">28 years</p>
        </div>
        
        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-secondary-100 dark:border-secondary-800">
          <Activity className="w-8 h-8 mx-auto mb-3 text-secondary-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Activity Level</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Very Active</p>
        </div>
        
        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-tertiary-100 dark:border-tertiary-800">
          <Heart className="w-8 h-8 mx-auto mb-3 text-tertiary-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Health Score</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">85/100</p>
        </div>
      </div>
    </Card>

    {/* Health Goals */}
    <Card className="p-8">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 mr-4">
          <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Health Goals</h3>
          <p className="text-gray-600 dark:text-gray-400">Your personalized wellness objectives</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Improve Sleep Quality', 'Increase Energy Levels', 'Build Muscle Mass', 'Reduce Stress'].map((goal, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="w-3 h-3 bg-accent rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{goal}</span>
          </div>
        ))}
      </div>
    </Card>

    {/* Recent Activity */}
    <Card className="p-8">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 mr-4">
          <TrendingUp className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="text-gray-600 dark:text-gray-400">Latest health tracking updates</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {[
          { icon: Activity, text: 'Completed 45-min strength workout', time: '2 hours ago', color: 'text-primary-600' },
          { icon: Heart, text: 'Logged sleep: 7.5 hours', time: '8 hours ago', color: 'text-secondary-600' },
          { icon: Zap, text: 'Updated supplement stack', time: '1 day ago', color: 'text-tertiary-600' }
        ].map((activity, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <activity.icon className={`w-5 h-5 mr-4 ${activity.color}`} />
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">{activity.text}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const LongevityTab = () => (
  <div className="space-y-6">
    {/* Premium Header */}
    <Card className="p-8 bg-gradient-to-br from-accent-50 via-white to-accent-100 dark:from-accent-900/10 dark:via-gray-800 dark:to-accent-900/20 border border-accent-200 dark:border-accent-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg mr-6">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">Longevity</h2>
                <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full shadow-md">
                  PREMIUM
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Advanced biological age analysis and optimization</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>

        {/* Biological Age Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-accent-100 dark:border-accent-800">
            <Dna className="w-10 h-10 mx-auto mb-4 text-accent" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Biological Age</p>
            <p className="text-3xl font-bold text-accent mb-1">24.5</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">3.5 years younger</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-primary-100 dark:border-primary-800">
            <Brain className="w-10 h-10 mx-auto mb-4 text-primary-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Cognitive Age</p>
            <p className="text-3xl font-bold text-primary-600 mb-1">23.2</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">4.8 years younger</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-secondary-100 dark:border-secondary-800">
            <Heart className="w-10 h-10 mx-auto mb-4 text-secondary-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Cardiovascular Age</p>
            <p className="text-3xl font-bold text-secondary-600 mb-1">25.8</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">2.2 years younger</p>
          </div>
        </div>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary-600 mr-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Lab Results Analysis</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Upload lab results for comprehensive biomarker analysis and personalized recommendations.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Premium Feature
            </Button>
          </div>

          <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-secondary-600 mr-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Longevity Protocols</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Access evidence-based longevity protocols and anti-aging interventions.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Premium Feature
            </Button>
          </div>
        </div>
      </div>
    </Card>

    {/* Longevity Insights */}
    <Card className="p-8">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-tertiary-100 dark:bg-tertiary-900/30 mr-4">
          <Sparkles className="w-6 h-6 text-tertiary-600 dark:text-tertiary-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Longevity Insights</h3>
          <p className="text-gray-600 dark:text-gray-400">Personalized recommendations for healthy aging</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {[
          {
            title: "Optimize Sleep Quality",
            description: "Your sleep consistency could improve biological age by 0.8 years",
            impact: "High Impact",
            color: "text-accent"
          },
          {
            title: "Increase Protein Intake",
            description: "Target 1.6g/kg body weight to support muscle preservation",
            impact: "Medium Impact", 
            color: "text-primary-600"
          },
          {
            title: "Add Resistance Training",
            description: "2-3 sessions per week can slow cellular aging significantly",
            impact: "High Impact",
            color: "text-accent"
          }
        ].map((insight, index) => (
          <div key={index} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white mr-3">{insight.title}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${insight.color} bg-current/10`}>
                  {insight.impact}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{insight.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default function MyBioPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MyBio™</h1>
          <p className="text-gray-600 dark:text-gray-400">Personalized health profiling and biological optimization</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-1.5 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <User className="w-4 h-4 mr-2 inline" />
              Profile Overview
            </button>
            <button
              onClick={() => setActiveTab('longevity')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                activeTab === 'longevity'
                  ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Crown className="w-4 h-4 mr-2 inline" />
              Longevity
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' ? <ProfileOverview /> : <LongevityTab />}
        </motion.div>
      </div>
    </div>
  );
}