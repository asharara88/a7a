import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Clock, 
  Coffee, 
  Moon, 
  Sun, 
  FastForward, 
  Utensils, 
  Activity,
  AlertCircle,
  Loader2,
  X,
  ChevronRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import BioClockInsight from '../components/bioclock/BioClockInsight';
import { format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CircadianEvent {
  id: string;
  event_type: string;
  timestamp: string;
  metadata: any;
}

interface CircadianInsight {
  id: string;
  insight_type: string;
  message: string;
  scheduled_for: string;
  is_read: boolean;
}

const BioClockPage: React.FC = () => {
  const [events, setEvents] = useState<CircadianEvent[]>([]);
  const [insights, setInsights] = useState<CircadianInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFasting, setIsFasting] = useState(false);
  const [showMealOptions, setShowMealOptions] = useState(false);
  const [showLightOptions, setShowLightOptions] = useState(false);
  
  useEffect(() => {
    fetchEvents();
    fetchInsights();
    
    // Subscribe to real-time changes
    const eventsSubscription = supabase
      .channel('circadian_events_changes')
      .on('INSERT', { event: 'circadian_events' }, payload => {
        setEvents(prev => [payload.new as CircadianEvent, ...prev]);
        // Run trend detection on new event
        detectTrends(payload.new as CircadianEvent);
      })
      .subscribe();
      
    const insightsSubscription = supabase
      .channel('circadian_insights_changes')
      .on('INSERT', { event: 'circadian_insights' }, payload => {
        setInsights(prev => [payload.new as CircadianInsight, ...prev]);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(eventsSubscription);
      supabase.removeChannel(insightsSubscription);
    };
  }, []);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('circadian_events')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', today.toISOString())
        .order('timestamp', { ascending: false });
        
      if (error) throw error;
      
      setEvents(data || []);
      
      // Check if there's an ongoing fast
      const fastEvents = data?.filter(e => e.event_type === 'fast_start' || e.event_type === 'fast_end') || [];
      fastEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      if (fastEvents.length > 0 && fastEvents[0].event_type === 'fast_start') {
        setIsFasting(true);
      } else {
        setIsFasting(false);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load circadian events.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const { data, error } = await supabase
        .from('circadian_insights')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('scheduled_for', { ascending: true });
        
      if (error) throw error;
      
      setInsights(data || []);
    } catch (err) {
      console.error('Error fetching insights:', err);
    }
  };
  
  const logEvent = async (eventType: string, metadata: any = {}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      const { error } = await supabase
        .from('circadian_events')
        .insert({
          user_id: user.id,
          event_type: eventType,
          timestamp: new Date().toISOString(),
          metadata
        });
        
      if (error) throw error;
      
      // Update local state for fast tracking
      if (eventType === 'fast_start') {
        setIsFasting(true);
      } else if (eventType === 'fast_end') {
        setIsFasting(false);
      }
      
      // Close option menus
      setShowMealOptions(false);
      setShowLightOptions(false);
      
      // Refresh events
      fetchEvents();
    } catch (err) {
      console.error(`Error logging ${eventType}:`, err);
      setError(`Failed to log ${eventType}. Please try again.`);
    }
  };
  
  const detectTrends = async (newEvent: CircadianEvent) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: todayEvents, error: eventsError } = await supabase
        .from('circadian_events')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', today.toISOString())
        .order('timestamp', { ascending: true });
        
      if (eventsError) throw eventsError;
      
      // Implement trend detection rules
      if (newEvent.event_type === 'fast_start') {
        // Schedule an insight if fast goes beyond 16 hours
        const scheduledTime = new Date(new Date(newEvent.timestamp).getTime() + 16 * 60 * 60 * 1000);
        
        await supabase
          .from('circadian_insights')
          .insert({
            user_id: user.id,
            insight_type: 'long_fast',
            message: "You've fasted >16h. Consider breaking fast to avoid low energy.",
            scheduled_for: scheduledTime.toISOString(),
            is_read: false
          });
      }
      
      if (newEvent.event_type === 'meal' && newEvent.metadata?.meal_type === 'breakfast') {
        const breakfastTime = new Date(newEvent.timestamp);
        
        if (breakfastTime.getHours() >= 10) {
          await supabase
            .from('circadian_insights')
            .insert({
              user_id: user.id,
              insight_type: 'late_breakfast',
              message: "Late breakfast can shift your clock. Try eating before 9 AM.",
              scheduled_for: new Date().toISOString(),
              is_read: false
            });
        }
      }
      
      if (newEvent.event_type === 'meal' && newEvent.metadata?.meal_type === 'dinner') {
        // Find recent sleep_start events
        const { data: sleepEvents } = await supabase
          .from('circadian_events')
          .select('*')
          .eq('user_id', user.id)
          .eq('event_type', 'sleep_start')
          .order('timestamp', { ascending: false })
          .limit(7);
        
        if (sleepEvents && sleepEvents.length > 0) {
          // Calculate average sleep time
          const sleepTimes = sleepEvents.map(event => {
            const date = new Date(event.timestamp);
            return date.getHours() * 60 + date.getMinutes();
          });
          
          const averageSleepTime = sleepTimes.reduce((sum, time) => sum + time, 0) / sleepTimes.length;
          
          const dinnerTime = new Date(newEvent.timestamp);
          const dinnerMinutes = dinnerTime.getHours() * 60 + dinnerTime.getMinutes();
          
          // If dinner is less than 2 hours before average sleep time
          if (averageSleepTime - dinnerMinutes < 120) {
            await supabase
              .from('circadian_insights')
              .insert({
                user_id: user.id,
                insight_type: 'late_dinner',
                message: "Late dinner may disrupt sleep. Aim to finish 2h before bed.",
                scheduled_for: new Date().toISOString(),
                is_read: false
              });
          }
        }
      }
      
      if (newEvent.event_type === 'light_exposure') {
        const exposureTime = new Date(newEvent.timestamp);
        
        if (newEvent.metadata?.phase === 'morning' && exposureTime.getHours() >= 9) {
          await supabase
            .from('circadian_insights')
            .insert({
              user_id: user.id,
              insight_type: 'late_morning_light',
              message: "Get 10 min of bright light to kickstart your circadian rhythm.",
              scheduled_for: new Date().toISOString(),
              is_read: false
            });
        }
        
        if (newEvent.metadata?.phase === 'evening' && exposureTime.getHours() >= 20) {
          await supabase
            .from('circadian_insights')
            .insert({
              user_id: user.id,
              insight_type: 'late_evening_light',
              message: "Evening light can delay sleep. Dim lights after 8 PM.",
              scheduled_for: new Date().toISOString(),
              is_read: false
            });
        }
      }
      
      // Refresh insights after detection
      fetchInsights();
    } catch (err) {
      console.error('Error detecting trends:', err);
    }
  };
  
  const markInsightAsRead = async (insightId: string) => {
    try {
      const { error } = await supabase
        .from('circadian_insights')
        .update({ is_read: true })
        .eq('id', insightId);
        
      if (error) throw error;
      
      setInsights(prev => prev.filter(insight => insight.id !== insightId));
    } catch (err) {
      console.error('Error marking insight as read:', err);
    }
  };
  
  // Group events by type for the timeline
  const eventGroups = {
    fasting: events.filter(e => e.event_type === 'fast_start' || e.event_type === 'fast_end'),
    meals: events.filter(e => e.event_type === 'meal'),
    light: events.filter(e => e.event_type === 'light_exposure'),
    sleep: events.filter(e => e.event_type === 'sleep_start' || e.event_type === 'sleep_end'),
    activity: events.filter(e => e.event_type === 'activity')
  };
  
  const getEventIcon = (event: CircadianEvent) => {
    switch (event.event_type) {
      case 'fast_start': return <FastForward className="w-5 h-5 text-orange-500" />;
      case 'fast_end': return <FastForward className="w-5 h-5 text-green-500" />;
      case 'meal': 
        if (event.metadata?.meal_type === 'breakfast') return <Coffee className="w-5 h-5 text-yellow-500" />;
        return <Utensils className="w-5 h-5 text-blue-500" />;
      case 'light_exposure':
        if (event.metadata?.phase === 'morning') return <Sun className="w-5 h-5 text-yellow-500" />;
        return <Sun className="w-5 h-5 text-orange-500" />;
      case 'sleep_start': return <Moon className="w-5 h-5 text-purple-500" />;
      case 'sleep_end': return <Moon className="w-5 h-5 text-blue-500" />;
      case 'activity': return <Activity className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getEventTitle = (event: CircadianEvent) => {
    switch (event.event_type) {
      case 'fast_start': return 'Started Fasting';
      case 'fast_end': return 'Ended Fasting';
      case 'meal': 
        if (event.metadata?.meal_type) {
          return `${event.metadata.meal_type.charAt(0).toUpperCase() + event.metadata.meal_type.slice(1)}`;
        }
        return 'Meal';
      case 'light_exposure':
        if (event.metadata?.phase === 'morning') return 'Morning Light Exposure';
        return 'Evening Light Exposure';
      case 'sleep_start': return 'Sleep Start';
      case 'sleep_end': return 'Wake Up';
      case 'activity': return 'Physical Activity';
      default: return 'Event';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200 pb-32">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BioClock™</h1>
          <p className="text-gray-600 dark:text-gray-400">Optimize your circadian rhythm for better health</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <Card className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchEvents}>Try Again</Button>
          </Card>
        ) : (
          <>
            {/* Current Fast Status */}
            <Card className="p-6 mb-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Circadian Status</h2>
                <div>
                  {isFasting ? (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                      Fasting
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Feeding Window
                    </span>
                  )}
                </div>
              </div>
              
              {/* Upcoming Insight */}
              {insights.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Upcoming Insights</h3>
                  <AnimatePresence>
                    {insights.map(insight => (
                      <BioClockInsight 
                        key={insight.id}
                        id={insight.id}
                        insightType={insight.insight_type}
                        message={insight.message}
                        scheduledFor={insight.scheduled_for}
                        onDismiss={markInsightAsRead}
                        onAction={markInsightAsRead}
                        actionText="Take Action"
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Timeline View */}
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Today's Timeline</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {events.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No events logged today</p>
                    <p className="text-sm mt-2">Start tracking your circadian events using the buttons below</p>
                  </div>
                ) : (
                  events.map(event => (
                    <motion.div 
                      key={event.id} 
                      className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3 flex-shrink-0">
                        {getEventIcon(event)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{getEventTitle(event)}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {format(new Date(event.timestamp), 'h:mm a')}
                            </div>
                          </div>
                          
                          {event.metadata && Object.keys(event.metadata).length > 0 && (
                            <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">
                              {Object.entries(event.metadata).map(([key, value]) => (
                                <span key={key} className="capitalize">
                                  {key.replace('_', ' ')}: {String(value)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </>
        )}
      </div>
      
      {/* Fixed Event Log Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-10">
        <div className="mobile-container">
          <div className="flex flex-wrap justify-between gap-2">
            {/* Fasting Button */}
            <Button
              variant={isFasting ? "destructive" : "default"}
              className="flex-1 min-w-[48px] min-h-[48px]"
              onClick={() => logEvent(isFasting ? 'fast_end' : 'fast_start')}
              aria-label={isFasting ? "End Fast" : "Start Fast"}
            >
              <FastForward className="w-4 h-4 mr-2" />
              {isFasting ? "End Fast" : "Start Fast"}
            </Button>
            
            {/* Meal Button */}
            <div className="relative flex-1">
              <Button
                variant="outline"
                className="w-full min-w-[48px] min-h-[48px]"
                onClick={() => {
                  setShowMealOptions(!showMealOptions);
                  setShowLightOptions(false);
                }}
                aria-label="Log Meal"
                aria-expanded={showMealOptions}
                aria-haspopup="true"
              >
                <Utensils className="w-4 h-4 mr-2" />
                Log Meal
              </Button>
              
              {showMealOptions && (
                <motion.div 
                  className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('meal', { meal_type: 'breakfast' })}
                  >
                    <Coffee className="w-4 h-4 mr-2 text-yellow-500" />
                    Breakfast
                  </button>
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('meal', { meal_type: 'lunch' })}
                  >
                    <Utensils className="w-4 h-4 mr-2 text-green-500" />
                    Lunch
                  </button>
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('meal', { meal_type: 'dinner' })}
                  >
                    <Utensils className="w-4 h-4 mr-2 text-blue-500" />
                    Dinner
                  </button>
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('meal', { meal_type: 'snack' })}
                  >
                    <Utensils className="w-4 h-4 mr-2 text-gray-500" />
                    Snack
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Light Exposure Button */}
            <div className="relative flex-1">
              <Button
                variant="outline"
                className="w-full min-w-[48px] min-h-[48px]"
                onClick={() => {
                  setShowLightOptions(!showLightOptions);
                  setShowMealOptions(false);
                }}
                aria-label="Log Light"
                aria-expanded={showLightOptions}
                aria-haspopup="true"
              >
                <Sun className="w-4 h-4 mr-2" />
                Log Light
              </Button>
              
              {showLightOptions && (
                <motion.div 
                  className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('light_exposure', { phase: 'morning' })}
                  >
                    <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                    Morning Light
                  </button>
                  <button 
                    className="w-full py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center min-w-[48px] min-h-[48px]"
                    onClick={() => logEvent('light_exposure', { phase: 'evening' })}
                  >
                    <Sun className="w-4 h-4 mr-2 text-orange-500" />
                    Evening Light
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Sleep Button */}
            <Button
              variant="outline"
              className="flex-1 min-w-[48px] min-h-[48px]"
              onClick={() => logEvent(new Date().getHours() < 12 ? 'sleep_end' : 'sleep_start')}
              aria-label={new Date().getHours() < 12 ? "Log Wake Up" : "Log Sleep"}
            >
              <Moon className="w-4 h-4 mr-2" />
              {new Date().getHours() < 12 ? "Wake Up" : "Sleep"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioClockPage;