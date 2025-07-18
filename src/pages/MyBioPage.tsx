import React, { useState, useEffect } from 'react';
import { User, Target, Award, Bell, Settings, Trophy, Star, Medal, Crown, Zap, Heart, Brain, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { createClient } from '@supabase/supabase-js';
import ProgressRing from '../components/dashboard/ProgressRing';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CoachPersona {
  id: string;
  name: string;
  description: string;
  style: 'motivational' | 'gentle' | 'scientific' | 'friendly';
  icon: React.ReactNode;
  color: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'fitness' | 'nutrition' | 'wellness';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  category: 'streak' | 'milestone' | 'improvement' | 'consistency';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const COACH_PERSONAS: CoachPersona[] = [
  {
    id: 'motivational',
    name: 'Energy Booster',
    description: 'High-energy, motivational coach who pushes you to achieve more',
    style: 'motivational',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'gentle',
    name: 'Wellness Guide',
    description: 'Gentle, supportive coach focused on holistic wellness',
    style: 'gentle',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'scientific',
    name: 'Science Expert',
    description: 'Evidence-based coach with detailed scientific explanations',
    style: 'scientific',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'friendly',
    name: 'Buddy Coach',
    description: 'Friendly, approachable coach like your personal trainer friend',
    style: 'friendly',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500'
  }
];

const MyBioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [selectedPersona, setSelectedPersona] = useState('friendly');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    weeklyProgress: true,
    achievements: true,
    coachMessages: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Load user profile
        const { data: profileData } = await supabase
          .from('user_profile_signin')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profileData);
      }

      // Load goals and achievements (mock data for now)
      setGoals(getMockGoals());
      setAchievements(getMockAchievements());
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMockGoals = (): Goal[] => [
    {
      id: '1',
      title: 'Daily Steps',
      description: 'Walk 10,000 steps every day',
      category: 'fitness',
      target: 10000,
      current: 7500,
      unit: 'steps',
      deadline: '2025-02-28',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Sleep Quality',
      description: 'Get 8 hours of quality sleep nightly',
      category: 'wellness',
      target: 8,
      current: 6.5,
      unit: 'hours',
      deadline: '2025-03-15',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Protein Intake',
      description: 'Consume 120g of protein daily',
      category: 'nutrition',
      target: 120,
      current: 95,
      unit: 'grams',
      deadline: '2025-02-15',
      priority: 'medium'
    }
  ];

  const getMockAchievements = (): Achievement[] => [
    {
      id: '1',
      title: 'First Week',
      description: 'Completed your first week of health tracking',
      icon: <Star className="w-6 h-6" />,
      earned: true,
      earnedDate: '2025-01-08',
      category: 'milestone',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Consistency Champion',
      description: 'Logged health data for 30 consecutive days',
      icon: <Trophy className="w-6 h-6" />,
      earned: true,
      earnedDate: '2025-01-15',
      category: 'streak',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Step Master',
      description: 'Achieved 10,000 steps in a single day',
      icon: <Medal className="w-6 h-6" />,
      earned: false,
      category: 'improvement',
      rarity: 'common'
    },
    {
      id: '4',
      title: 'Wellness Warrior',
      description: 'Completed all health goals for a month',
      icon: <Crown className="w-6 h-6" />,
      earned: false,
      category: 'milestone',
      rarity: 'legendary'
    }
  ];

  const updateNotificationSettings = async (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    // In a real app, save to database
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
      case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'coach', label: 'Coach Persona', icon: <Settings className="w-4 h-4" /> }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
      <div className="mobile-container max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MyBio™</h1>
          <p className="text-gray-600 dark:text-gray-400">Personalize your health journey and track your progress</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name</label>
                      <Input 
                        value={profile?.first_name || ''} 
                        placeholder="Enter your first name"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name</label>
                      <Input 
                        value={profile?.last_name || ''} 
                        placeholder="Enter your last name"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                      <Input 
                        value={profile?.email || ''} 
                        placeholder="Enter your email"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Mobile</label>
                      <Input 
                        value={profile?.mobile || ''} 
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Update Profile</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Health Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">78</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">BW Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500 mb-1">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500 mb-1">45</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Goals</h2>
                  <Button>Add New Goal</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                      <Card key={goal.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {goal.priority}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>
                        
                        <div className="flex items-center justify-center mb-4">
                          <ProgressRing 
                            progress={progress} 
                            size={80}
                            color={progress >= 100 ? '#10B981' : '#3B82F6'}
                          >
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {Math.round(progress)}%
                              </div>
                            </div>
                          </ProgressRing>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {goal.current} / {goal.target} {goal.unit}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Due: {new Date(goal.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Achievements & Badges</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`p-6 text-center transition-all duration-300 ${
                        achievement.earned 
                          ? 'border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' 
                          : 'opacity-60 grayscale'
                      }`}
                    >
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        achievement.earned 
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
                          : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                      }`}>
                        {achievement.icon}
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                      
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                      
                      {achievement.earned && achievement.earnedDate && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                          Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Daily Reminders</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get reminded to log your daily health metrics</p>
                    </div>
                    <button
                      onClick={() => updateNotificationSettings('dailyReminders', !notificationSettings.dailyReminders)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.dailyReminders ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.dailyReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Weekly Progress</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly progress summaries</p>
                    </div>
                    <button
                      onClick={() => updateNotificationSettings('weeklyProgress', !notificationSettings.weeklyProgress)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.weeklyProgress ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.weeklyProgress ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Achievement Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when you earn new achievements</p>
                    </div>
                    <button
                      onClick={() => updateNotificationSettings('achievements', !notificationSettings.achievements)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.achievements ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.achievements ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Coach Messages</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive personalized messages from your AI coach</p>
                    </div>
                    <button
                      onClick={() => updateNotificationSettings('coachMessages', !notificationSettings.coachMessages)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.coachMessages ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.coachMessages ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'coach' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Choose Your Coach Persona</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select the coaching style that motivates you most. This will personalize how your AI coach communicates with you.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {COACH_PERSONAS.map((persona) => (
                      <motion.div
                        key={persona.id}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedPersona === persona.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedPersona(persona.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${persona.color} text-white mr-4`}>
                            {persona.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{persona.name}</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{persona.style}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{persona.description}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button>Save Coach Preference</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Preview Coach Response</h2>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${COACH_PERSONAS.find(p => p.id === selectedPersona)?.color} text-white mr-3`}>
                        {COACH_PERSONAS.find(p => p.id === selectedPersona)?.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedPersona === 'motivational' && "Let's crush those health goals today! You've got this! 💪"}
                          {selectedPersona === 'gentle' && "Remember to be kind to yourself on this wellness journey. Every small step counts. 🌱"}
                          {selectedPersona === 'scientific' && "Based on current research, maintaining consistent sleep patterns can improve your cognitive performance by 23%. 🧠"}
                          {selectedPersona === 'friendly' && "Hey there! How are you feeling today? Let's work together to make some healthy choices! 😊"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyBioPage;