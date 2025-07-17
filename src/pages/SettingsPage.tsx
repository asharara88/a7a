import React, { useState } from 'react';
import { Table as Tabs, Moon, Bell, Lock, Info, User } from 'lucide-react';
import ThemeSettings from '../components/settings/ThemeSettings';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SettingsTab {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('appearance');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would delete the user's account
      // For demo purposes, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('For this demo, account deletion is simulated. In a production environment, this would permanently delete your account.');
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Failed to delete account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAccount = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would reset the user's account
      // For demo purposes, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('For this demo, account reset is simulated. In a production environment, this would reset all your data while keeping your account.');
    } catch (err) {
      console.error('Error resetting account:', err);
      setError('Failed to reset account data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs: SettingsTab[] = [
    {
      id: 'appearance',
      icon: <Moon className="w-5 h-5" />,
      label: 'Appearance',
      content: <ThemeSettings />
    },
    {
      id: 'notifications',
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      content: (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reminder Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive reminders for supplements and workouts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'privacy',
      icon: <Lock className="w-5 h-5" />,
      label: 'Privacy & Security',
      content: (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Privacy & Security</h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Data Privacy</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Sharing</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Allow anonymous data sharing for research</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Help us improve with usage analytics</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Account Management</h4>
              <div className="space-y-3">
                <div>
                  <Button variant="outline" onClick={handleResetAccount} disabled={isLoading} className="w-full justify-start">
                    Reset Account Data
                  </Button>
                  <p className="text-xs text-gray-500 mt-1 ml-1">This will reset all your personal data while keeping your account</p>
                </div>
                
                <div>
                  <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading} className="w-full justify-start">
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-500 mt-1 ml-1">This will permanently delete your account and all associated data</p>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm">
                    {success}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      label: 'About',
      content: (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">About Biowell</h3>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Version 1.0.0
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Biowell is your personal digital health coach, connecting your wearable devices 
              and providing personalized insights for optimal health.
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2">Legal</h4>
              <div className="space-y-1">
                <a href="/terms" className="text-primary hover:underline block">Terms of Service</a>
                <a href="/privacy" className="text-primary hover:underline block">Privacy Policy</a>
                <a href="/cookies" className="text-primary hover:underline block">Cookie Policy</a>
              </div>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'profile',
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      content: (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                defaultValue="Ahmed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                defaultValue="Sharara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                defaultValue="ahmed.m.sharara@gmail.com"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center w-full px-4 py-2.5 rounded-lg text-left transition-colors",
                      activeTab === tab.id 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3">
            {tabs.find(tab => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;