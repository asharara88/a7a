import React, { useState } from 'react';
import { Download, FileJson, FileText, Shield, Loader2, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProfileExportPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exportType, setExportType] = useState<'json' | 'csv'>('json');
  const [exportSuccess, setExportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsLoading(true);
    setError(null);
    setExportSuccess(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to export your data');
      }
      
      // Fetch user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profileError) throw profileError;
      
      // Fetch health metrics
      const { data: healthData, error: healthError } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(100);
        
      if (healthError) throw healthError;
      
      // Fetch workout data
      const { data: workoutData, error: workoutError } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(50);
        
      if (workoutError) throw workoutError;
      
      // Fetch food logs
      const { data: foodData, error: foodError } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('meal_time', { ascending: false })
        .limit(100);
        
      if (foodError) throw foodError;
      
      // Fetch supplement recommendations
      const { data: suppData, error: suppError } = await supabase
        .from('supplement_recommendations')
        .select('*')
        .eq('user_id', user.id);
        
      if (suppError) throw suppError;
      
      // Fetch CGM data if available
      const { data: cgmData, error: cgmError } = await supabase
        .from('cgm_data')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(500);
        
      // Don't throw error for CGM data as it might not exist
      
      // Combine all data
      const exportData = {
        profile: profileData,
        healthMetrics: healthData || [],
        workouts: workoutData || [],
        foodLogs: foodData || [],
        supplementRecommendations: suppData || [],
        cgmData: cgmData || []
      };
      
      // Format and download data
      if (exportType === 'json') {
        downloadJSON(exportData, `biowell-data-${new Date().toISOString().split('T')[0]}.json`);
      } else {
        downloadCSV(exportData, `biowell-data-${new Date().toISOString().split('T')[0]}.csv`);
      }
      
      setExportSuccess(true);
    } catch (err: any) {
      console.error('Error exporting data:', err);
      setError(err.message || 'Failed to export your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to download JSON data
  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  // Helper function to convert JSON to CSV and download
  const downloadCSV = (data: any, filename: string) => {
    // This is a simplified CSV export for demonstration
    // In a real app, you would want a more robust CSV conversion
    let csv = '';
    
    // Profile data
    csv += 'PROFILE DATA\n';
    csv += Object.entries(data.profile || {})
      .map(([key, value]) => `${key},${value}`)
      .join('\n');
    csv += '\n\n';
    
    // Health metrics
    csv += 'HEALTH METRICS\n';
    if (data.healthMetrics.length > 0) {
      // Headers
      csv += Object.keys(data.healthMetrics[0]).join(',') + '\n';
      // Data rows
      csv += data.healthMetrics.map((row: any) => 
        Object.values(row).join(',')
      ).join('\n');
    }
    csv += '\n\n';
    
    // Repeat for other data types...
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Export Your Data</h1>
          <p className="text-gray-600 dark:text-gray-400">Download your health data and account information</p>
        </div>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Data Export</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Export all your health data including profile information, health metrics, workouts, nutrition logs, 
            and supplement recommendations. You can use this data for your personal records or to import into 
            other health applications.
          </p>
          
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-3 flex-shrink-0">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Data Privacy</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Your data belongs to you. This export contains your personal health information, so be sure to
                  store it securely. Biowell does not share your personal data with third parties without your explicit consent.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Export Format</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="exportType"
                  value="json"
                  checked={exportType === 'json'}
                  onChange={() => setExportType('json')}
                  className="mr-2"
                />
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileJson className="w-5 h-5 mr-2 text-primary" />
                  JSON Format
                </span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="exportType"
                  value="csv"
                  checked={exportType === 'csv'}
                  onChange={() => setExportType('csv')}
                  className="mr-2"
                />
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  CSV Format
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              JSON format provides the most complete export. CSV format is useful for importing into spreadsheet applications.
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {exportSuccess && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Your data has been exported successfully.
            </div>
          )}
          
          <Button 
            onClick={handleExport}
            disabled={isLoading}
            className="flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Exporting Data...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export Your Data
              </>
            )}
          </Button>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Included in Export</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Profile Information</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your profile details including personal information and health goals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Health Metrics</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your recorded health measurements including sleep, heart rate, and other biometrics.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Workout History</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your recorded workouts, exercise details, and fitness activities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Nutrition Logs</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your food logs, meal entries, and nutritional information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Supplement Recommendations</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your personalized supplement recommendations and stacks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">CGM Data</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your continuous glucose monitoring data if available.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileExportPage;