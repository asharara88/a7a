import { createClient } from "npm:@supabase/supabase-js@2";

// Cors headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get Supabase credentials from environment
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not found");
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    const { event, userId } = await req.json();

    if (!event || !userId) {
      return new Response(
        JSON.stringify({ error: "Event and userId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Analyze the event and generate insights
    const insights = await analyzeCircadianEvent(supabase, event, userId);
    
    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Analyze circadian event and generate insights
async function analyzeCircadianEvent(supabase, event, userId) {
  const insights = [];
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  try {
    // Get today's events
    const { data: todayEvents, error: eventsError } = await supabase
      .from('circadian_events')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', today.toISOString())
      .order('timestamp', { ascending: true });

    if (eventsError) throw eventsError;

    // Fasting Duration Insight
    if (event.event_type === 'fast_start') {
      // Schedule an insight if fast goes beyond 16 hours
      const scheduledTime = new Date(new Date(event.timestamp).getTime() + 16 * 60 * 60 * 1000);
      
      const insight = {
        user_id: userId,
        insight_type: 'long_fast',
        message: "You've fasted >16h. Consider breaking fast to avoid low energy.",
        scheduled_for: scheduledTime.toISOString(),
        is_read: false
      };

      insights.push(insight);
      
      // Insert insight
      await supabase.from('circadian_insights').insert(insight);
    }

    // Meal Timing Insights
    if (event.event_type === 'meal') {
      const mealTime = new Date(event.timestamp);
      
      // Late breakfast insight
      if (event.metadata?.meal_type === 'breakfast' && mealTime.getHours() >= 10) {
        const insight = {
          user_id: userId,
          insight_type: 'late_breakfast',
          message: "Late breakfast can shift your clock. Try eating before 9 AM.",
          scheduled_for: now.toISOString(),
          is_read: false
        };
        
        insights.push(insight);
        
        // Insert insight
        await supabase.from('circadian_insights').insert(insight);
      }
      
      // Late dinner insight
      if (event.metadata?.meal_type === 'dinner') {
        // Find sleep start events
        const { data: sleepEvents } = await supabase
          .from('circadian_events')
          .select('*')
          .eq('user_id', userId)
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
          
          const dinnerMinutes = mealTime.getHours() * 60 + mealTime.getMinutes();
          
          // If dinner is less than 2 hours before average sleep time
          if (averageSleepTime - dinnerMinutes < 120) {
            const insight = {
              user_id: userId,
              insight_type: 'late_dinner',
              message: "Late dinner may disrupt sleep. Aim to finish 2h before bed.",
              scheduled_for: now.toISOString(),
              is_read: false
            };
            
            insights.push(insight);
            
            // Insert insight
            await supabase.from('circadian_insights').insert(insight);
          }
        }
      }
    }

    // Light Exposure Insights
    if (event.event_type === 'light_exposure') {
      const exposureTime = new Date(event.timestamp);
      
      // Late morning light insight
      if (event.metadata?.phase === 'morning' && exposureTime.getHours() >= 9) {
        const insight = {
          user_id: userId,
          insight_type: 'late_morning_light',
          message: "Get 10 min of bright light to kickstart your circadian rhythm.",
          scheduled_for: now.toISOString(),
          is_read: false
        };
        
        insights.push(insight);
        
        // Insert insight
        await supabase.from('circadian_insights').insert(insight);
      }
      
      // Evening light insight
      if (event.metadata?.phase === 'evening' && exposureTime.getHours() >= 20) {
        const insight = {
          user_id: userId,
          insight_type: 'late_evening_light',
          message: "Evening light can delay sleep. Dim lights after 8 PM.",
          scheduled_for: now.toISOString(),
          is_read: false
        };
        
        insights.push(insight);
        
        // Insert insight
        await supabase.from('circadian_insights').insert(insight);
      }
    }

    return insights;
  } catch (error) {
    console.error("Error analyzing circadian event:", error);
    throw error;
  }
}