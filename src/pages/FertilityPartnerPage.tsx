import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Users, BellRing, Clock, Thermometer, Heart, ArrowRight, Plus, Mail, UserCheck, UserX, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Partner {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'connected' | 'rejected' | 'removed';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  isRead: boolean;
}

interface FertilityData {
  date: string;
  cycleDay: number;
  temperature: number;
  phase: 'follicular' | 'ovulation' | 'luteal' | 'menstrual';
  notes?: string;
}

const FertilityPartnerPage: React.FC = () => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Partner[]>([]);
  const [fertilityData, setFertilityData] = useState<FertilityData[]>([]);
  const [isLoadingPartner, setIsLoadingPartner] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    // Fetch partner connection status
    const getPartnerData = async () => {
      setIsLoadingPartner(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Get connected partner if any
        const { data: partnerData, error: partnerError } = await supabase
          .from('partner_connections')
          .select('id, partner_id, status')
          .eq('user_id', user.id)
          .eq('status', 'connected')
          .single();

        if (partnerError && partnerError.code !== 'PGRST116') {
          throw partnerError;
        }

        if (partnerData) {
          // Get partner details
          const { data: partnerDetails, error: detailsError } = await supabase
            .from('profiles')
            .select('email, first_name, last_name')
            .eq('id', partnerData.partner_id)
            .single();

          if (detailsError) throw detailsError;

          setPartner({
            id: partnerData.partner_id,
            name: `${partnerDetails.first_name || ''} ${partnerDetails.last_name || ''}`.trim() || 'Partner',
            email: partnerDetails.email,
            status: partnerData.status
          });
        }

        // Get pending requests
        const { data: pendingData, error: pendingError } = await supabase
          .from('partner_connections')
          .select('id, partner_id, status')
          .eq('user_id', user.id)
          .eq('status', 'pending');

        if (pendingError) throw pendingError;

        if (pendingData && pendingData.length > 0) {
          const pendingPartners = [];
          for (const request of pendingData) {
            // Get partner details
            const { data: partnerDetails, error: detailsError } = await supabase
              .from('profiles')
              .select('email, first_name, last_name')
              .eq('id', request.partner_id)
              .single();

            if (detailsError) throw detailsError;

            pendingPartners.push({
              id: request.partner_id,
              name: `${partnerDetails.first_name || ''} ${partnerDetails.last_name || ''}`.trim() || 'Partner',
              email: partnerDetails.email,
              status: request.status
            });
          }
          setPendingRequests(pendingPartners);
        }

      } catch (err) {
        console.error('Error loading partner data:', err);
      } finally {
        setIsLoadingPartner(false);
      }
    };

    // Fetch notifications
    const getNotifications = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('partner_notifications')
          .select('*')
          .eq('to_user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        setNotifications(data.map(notification => ({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.notification_type,
          date: new Date(notification.created_at).toLocaleDateString(),
          isRead: notification.is_read
        })));
      } catch (err) {
        console.error('Error loading notifications:', err);
      }
    };

    // Fetch fertility data
    const getFertilityData = async () => {
      setIsLoadingData(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('fertility_tracking')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(30);

        if (error) throw error;

        if (data && data.length > 0) {
          setFertilityData(data.map(item => ({
            date: new Date(item.date).toLocaleDateString(),
            cycleDay: item.cycle_day || 0,
            temperature: item.basal_temperature || 0,
            phase: item.cycle_phase as any || 'follicular',
            notes: item.notes
          })));
        } else {
          // Mock data for demo
          const mockData: FertilityData[] = [];
          const today = new Date();
          for (let i = 0; i < 28; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            // Determine cycle phase based on day
            let phase: 'follicular' | 'ovulation' | 'luteal' | 'menstrual' = 'follicular';
            let cycleDay = 28 - i;
            if (cycleDay <= 5) {
              phase = 'menstrual';
            } else if (cycleDay >= 12 && cycleDay <= 16) {
              phase = 'ovulation';
            } else if (cycleDay > 16) {
              phase = 'luteal';
            }
            
            // Generate realistic temperature
            let baseTemp = 36.5;
            if (phase === 'follicular') baseTemp = 36.4 + (Math.random() * 0.2);
            if (phase === 'ovulation') baseTemp = 36.6 + (Math.random() * 0.2);
            if (phase === 'luteal') baseTemp = 36.8 + (Math.random() * 0.2);
            if (phase === 'menstrual') baseTemp = 36.3 + (Math.random() * 0.2);
            
            mockData.push({
              date: date.toLocaleDateString(),
              cycleDay,
              temperature: parseFloat(baseTemp.toFixed(2)),
              phase,
              notes: phase === 'ovulation' ? 'Possible ovulation detected' : undefined
            });
          }
          setFertilityData(mockData);
        }
      } catch (err) {
        console.error('Error loading fertility data:', err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getPartnerData();
    getNotifications();
    getFertilityData();
  }, []);

  const sendPartnerRequest = async () => {
    if (!partnerEmail.trim()) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSendingRequest(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Find user by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', partnerEmail)
        .single();

      if (userError) {
        throw new Error('User not found with that email address');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be logged in to send a partner request');
      }

      // Check if already connected or pending
      const { data: existingConn, error: connError } = await supabase
        .from('partner_connections')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('partner_id', userData.id)
        .maybeSingle();

      if (connError && connError.code !== 'PGRST116') throw connError;

      if (existingConn) {
        if (existingConn.status === 'connected') {
          throw new Error('You are already connected with this partner');
        } else if (existingConn.status === 'pending') {
          throw new Error('You already have a pending request with this partner');
        }
      }

      // Create partner connection
      const { error: insertError } = await supabase
        .from('partner_connections')
        .insert([{
          user_id: user.id,
          partner_id: userData.id,
          status: 'pending'
        }]);

      if (insertError) throw insertError;

      // Create notification for partner
      const { error: notifError } = await supabase
        .from('partner_notifications')
        .insert([{
          from_user_id: user.id,
          to_user_id: userData.id,
          notification_type: 'partner_request',
          title: 'New Partner Connection Request',
          message: `You have a new partner connection request from ${user.email}`,
          action_url: '/fertility/partner'
        }]);

      if (notifError) throw notifError;

      setSuccessMessage('Partner request sent successfully!');
      setPartnerEmail('');
      setShowConnectModal(false);

      // Refresh partner data
      setPendingRequests(prev => [...prev, {
        id: userData.id,
        name: 'Pending Partner',
        email: partnerEmail,
        status: 'pending'
      }]);

    } catch (err: any) {
      console.error('Error sending partner request:', err);
      setError(err.message || 'Failed to send partner request');
    } finally {
      setIsSendingRequest(false);
    }
  };

  // Render fertile window prediction
  const renderFertileWindow = () => {
    // Find ovulation day from fertility data
    const ovulationDay = fertilityData.find(data => data.phase === 'ovulation');
    if (!ovulationDay) return null;
    
    const ovulationDate = new Date(ovulationDay.date);
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);
    
    return (
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 mb-4">
        <div className="flex items-start">
          <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full mr-3">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Fertility Window</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Estimated fertile window from {fertileStart.toLocaleDateString()} to {fertileEnd.toLocaleDateString()}.
              Ovulation likely around {ovulationDate.toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Partner Sync</h1>
          <p className="text-gray-600 dark:text-gray-400">Sync your fertility and health data with your partner</p>
        </div>

        {/* Partner Status Card */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Partner Status</h2>
          
          {isLoadingPartner ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : partner ? (
            <div className="flex items-start">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Connected with {partner.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{partner.email}</p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">Manage Sharing</Button>
                  <Button variant="destructive" size="sm">Disconnect</Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">No Partner Connected</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Connect with your partner to share fertility and health information for better coordination.
                  </p>
                  <Button onClick={() => setShowConnectModal(true)}>
                    Connect Partner
                  </Button>
                </div>
              </div>
              
              {pendingRequests.length > 0 && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pending Requests</h3>
                  <div className="space-y-3">
                    {pendingRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{request.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Awaiting acceptance</p>
                        </div>
                        <Button variant="outline" size="sm">Cancel</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Fertility Insights (shown only if partner exists) */}
        {partner && (
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fertility Insights</h2>
            
            {renderFertileWindow()}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Temperature Trends</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  BBT has increased by 0.3°C in the last 3 days, indicating possible ovulation.
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Cycle Phase</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Currently in {fertilityData[0]?.phase || 'luteal'} phase, day {fertilityData[0]?.cycleDay || '21'} of cycle.
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Partner Recommendations</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Sperm retention for 2-3 days before predicted ovulation is optimal for conception.</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Consider supplementing with zinc (for sperm health) and CoQ10 (for both egg and sperm quality).</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Avoid excessive heat exposure (hot baths, saunas) as it can temporarily impact sperm production.</span>
                </li>
              </ul>
            </div>
          </Card>
        )}
        
        {/* Recent Notifications */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BellRing className="w-5 h-5 mr-2 text-primary" />
            Notifications
          </h2>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-all ${
                    notification.isRead 
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' 
                      : 'border-primary bg-primary/5 dark:bg-primary/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</span>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-2">
                <Button variant="outline" size="sm">
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </Card>
        
        {/* Connect Partner Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowConnectModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect with Partner</h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm">
                  {successMessage}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Partner's Email Address
                </label>
                <input
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="Enter your partner's email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Your partner must have a Biowell account with this email address.
                </p>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                <p className="mb-2 font-medium">What happens when you connect?</p>
                <ul className="space-y-1">
                  <li>• Your partner will receive a connection request</li>
                  <li>• Once accepted, you can share selected health data</li>
                  <li>• You control what information is shared</li>
                  <li>• Either partner can remove the connection at any time</li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendPartnerRequest}
                  disabled={isSendingRequest || !partnerEmail.trim()}
                >
                  {isSendingRequest ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilityPartnerPage;