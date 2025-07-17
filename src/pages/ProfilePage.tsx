import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Mail, Phone, Calendar, MapPin, Save, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  dateOfBirth?: string;
  primaryHealthGoals?: string[];
  dietPreference?: string;
  activityLevel?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  
  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      // Get profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          mobile: data.mobile || '',
          dateOfBirth: data.date_of_birth,
          primaryHealthGoals: data.primary_health_goals,
          dietPreference: data.diet_preference,
          activityLevel: data.activity_level
        });
        
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          mobile: data.mobile || '',
          dateOfBirth: data.date_of_birth
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      // Update profile
      const updates = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        mobile: formData.mobile,
        date_of_birth: formData.dateOfBirth,
        updated_at: new Date()
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh profile data
      await loadProfile();
      
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your personal information</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            <p>{error}</p>
            <Button onClick={loadProfile} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="text-sm"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
                  {successMessage}
                </div>
              )}
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form data
                        setFormData({
                          firstName: profile?.firstName || '',
                          lastName: profile?.lastName || '',
                          mobile: profile?.mobile || '',
                          dateOfBirth: profile?.dateOfBirth
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {profile?.firstName} {profile?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile?.email}</p>
                    </div>
                  </div>
                  {profile?.mobile && (
                    <div className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.mobile}</p>
                      </div>
                    </div>
                  )}
                  {profile?.dateOfBirth && (
                    <div className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(profile.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
            
            {/* Health Details Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Health Preferences</h2>
              
              <div className="space-y-4">
                {profile?.primaryHealthGoals && profile.primaryHealthGoals.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Primary Health Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.primaryHealthGoals.map((goal, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile?.dietPreference && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Diet Preference</h3>
                    <p className="text-gray-800 dark:text-gray-200 capitalize">{profile.dietPreference}</p>
                  </div>
                )}
                
                {profile?.activityLevel && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Activity Level</h3>
                    <p className="text-gray-800 dark:text-gray-200 capitalize">{profile.activityLevel.replace(/-/g, ' ')}</p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Link to="/onboarding" className="text-primary hover:text-primary-dark font-medium">
                    Update Health Profile
                  </Link>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;