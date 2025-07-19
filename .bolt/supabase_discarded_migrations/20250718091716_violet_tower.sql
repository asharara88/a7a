/*
  # Comprehensive RLS Setup and User Access Configuration

  1. Security
    - Enable RLS on all user-related tables
    - Set up comprehensive user access policies
    - Ensure data isolation between users
    - Allow service role full access for Edge Functions

  2. Tables Covered
    - All user profile and data tables
    - Health metrics and tracking tables
    - Supplement and stack tables
    - Chat and interaction tables
    - Audio cache and settings tables
*/

-- Enable RLS on all user-related tables if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile_signin ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE cgm_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplement_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stack_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE circadian_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE circadian_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_notifications ENABLE ROW LEVEL SECURITY;

-- Service role policies (full access for Edge Functions)
DO $$
BEGIN
  -- Grant service role full access to all tables
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON profiles FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_profile_signin' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON user_profile_signin FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'health_metrics' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON health_metrics FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_history' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON chat_history FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'supplements' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON supplements FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_supplements' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON user_supplements FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON cart_items FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'food_logs' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON food_logs FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- User profile access policies
DO $$
BEGIN
  -- Profiles table policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
      ON profiles FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;

  -- User profile signin policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_profile_signin' AND policyname = 'Users can read own signin profile'
  ) THEN
    CREATE POLICY "Users can read own signin profile"
      ON user_profile_signin FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_profile_signin' AND policyname = 'Users can update own signin profile'
  ) THEN
    CREATE POLICY "Users can update own signin profile"
      ON user_profile_signin FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_profile_signin' AND policyname = 'Users can insert own signin profile'
  ) THEN
    CREATE POLICY "Users can insert own signin profile"
      ON user_profile_signin FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Health data access policies
DO $$
BEGIN
  -- Health metrics policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'health_metrics' AND policyname = 'Users can read own health metrics'
  ) THEN
    CREATE POLICY "Users can read own health metrics"
      ON health_metrics FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'health_metrics' AND policyname = 'Users can insert own health metrics'
  ) THEN
    CREATE POLICY "Users can insert own health metrics"
      ON health_metrics FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'health_metrics' AND policyname = 'Users can update own health metrics'
  ) THEN
    CREATE POLICY "Users can update own health metrics"
      ON health_metrics FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- CGM data policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cgm_data' AND policyname = 'Users can access own CGM data'
  ) THEN
    CREATE POLICY "Users can access own CGM data"
      ON cgm_data FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Food logs policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'food_logs' AND policyname = 'Users can access own food logs'
  ) THEN
    CREATE POLICY "Users can access own food logs"
      ON food_logs FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Workout sessions policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'workout_sessions' AND policyname = 'Users can access own workouts'
  ) THEN
    CREATE POLICY "Users can access own workouts"
      ON workout_sessions FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Lab results policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lab_results' AND policyname = 'Users can access own lab results'
  ) THEN
    CREATE POLICY "Users can access own lab results"
      ON lab_results FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Chat and interaction policies
DO $$
BEGIN
  -- Chat history policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_history' AND policyname = 'Users can access own chat history'
  ) THEN
    CREATE POLICY "Users can access own chat history"
      ON chat_history FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Chat sessions policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_sessions' AND policyname = 'Users can access own chat sessions'
  ) THEN
    CREATE POLICY "Users can access own chat sessions"
      ON chat_sessions FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Coach messages policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'coach_messages' AND policyname = 'Users can access own coach messages'
  ) THEN
    CREATE POLICY "Users can access own coach messages"
      ON coach_messages FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- AI generated content policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ai_generated_content' AND policyname = 'Users can access own AI content'
  ) THEN
    CREATE POLICY "Users can access own AI content"
      ON ai_generated_content FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Supplement and commerce policies
DO $$
BEGIN
  -- Supplements (public read access for catalog)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'supplements' AND policyname = 'Public can read available supplements'
  ) THEN
    CREATE POLICY "Public can read available supplements"
      ON supplements FOR SELECT
      TO public
      USING (is_available = true);
  END IF;

  -- User supplements policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_supplements' AND policyname = 'Users can manage own supplements'
  ) THEN
    CREATE POLICY "Users can manage own supplements"
      ON user_supplements FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Cart items policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Users can manage own cart'
  ) THEN
    CREATE POLICY "Users can manage own cart"
      ON cart_items FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Supplement stacks policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'supplement_stacks' AND policyname = 'Users can manage own stacks'
  ) THEN
    CREATE POLICY "Users can manage own stacks"
      ON supplement_stacks FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Saved recipes policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'saved_recipes' AND policyname = 'Users can manage own saved recipes'
  ) THEN
    CREATE POLICY "Users can manage own saved recipes"
      ON saved_recipes FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Device and wearable data policies
DO $$
BEGIN
  -- Wearable connections policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'wearable_connections' AND policyname = 'Users can manage own wearable connections'
  ) THEN
    CREATE POLICY "Users can manage own wearable connections"
      ON wearable_connections FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Device connections policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'device_connections' AND policyname = 'Users can manage own device connections'
  ) THEN
    CREATE POLICY "Users can manage own device connections"
      ON device_connections FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Device data cache policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'device_data_cache' AND policyname = 'Users can access own device data'
  ) THEN
    CREATE POLICY "Users can access own device data"
      ON device_data_cache FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Audio cache policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'audio_cache' AND policyname = 'Users can manage own audio cache'
  ) THEN
    CREATE POLICY "Users can manage own audio cache"
      ON audio_cache FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Settings and preferences policies
DO $$
BEGIN
  -- User preferences policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_preferences' AND policyname = 'Users can manage own preferences'
  ) THEN
    CREATE POLICY "Users can manage own preferences"
      ON user_preferences FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- User settings policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_settings' AND policyname = 'Users can manage own settings'
  ) THEN
    CREATE POLICY "Users can manage own settings"
      ON user_settings FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Quiz responses policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quiz_responses' AND policyname = 'Users can manage own quiz responses'
  ) THEN
    CREATE POLICY "Users can manage own quiz responses"
      ON quiz_responses FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- User goals policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_goals' AND policyname = 'Users can manage own goals'
  ) THEN
    CREATE POLICY "Users can manage own goals"
      ON user_goals FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Habit tracking policies
DO $$
BEGIN
  -- Habit stacks policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'habit_stacks' AND policyname = 'Users can manage own habit stacks'
  ) THEN
    CREATE POLICY "Users can manage own habit stacks"
      ON habit_stacks FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Habits policies (through stack ownership)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'habits' AND policyname = 'Users can manage habits in own stacks'
  ) THEN
    CREATE POLICY "Users can manage habits in own stacks"
      ON habits FOR ALL
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM habit_stacks 
        WHERE habit_stacks.id = habits.stack_id 
        AND habit_stacks.user_id = auth.uid()
      ))
      WITH CHECK (EXISTS (
        SELECT 1 FROM habit_stacks 
        WHERE habit_stacks.id = habits.stack_id 
        AND habit_stacks.user_id = auth.uid()
      ));
  END IF;

  -- Habit completions policies (through habit ownership)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'habit_completions' AND policyname = 'Users can manage completions for own habits'
  ) THEN
    CREATE POLICY "Users can manage completions for own habits"
      ON habit_completions FOR ALL
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM habits 
        JOIN habit_stacks ON habits.stack_id = habit_stacks.id
        WHERE habits.id = habit_completions.habit_id 
        AND habit_stacks.user_id = auth.uid()
      ))
      WITH CHECK (EXISTS (
        SELECT 1 FROM habits 
        JOIN habit_stacks ON habits.stack_id = habit_stacks.id
        WHERE habits.id = habit_completions.habit_id 
        AND habit_stacks.user_id = auth.uid()
      ));
  END IF;
END $$;

-- Partner and social policies
DO $$
BEGIN
  -- Partner connections policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'partner_connections' AND policyname = 'Users can manage own partner connections'
  ) THEN
    CREATE POLICY "Users can manage own partner connections"
      ON partner_connections FOR ALL
      TO authenticated
      USING (auth.uid() = user_id OR auth.uid() = partner_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Partner notifications policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'partner_notifications' AND policyname = 'Users can manage own partner notifications'
  ) THEN
    CREATE POLICY "Users can manage own partner notifications"
      ON partner_notifications FOR ALL
      TO authenticated
      USING (auth.uid() = from_user_id OR auth.uid() = to_user_id)
      WITH CHECK (auth.uid() = from_user_id);
  END IF;

  -- Fertility tracking policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'fertility_tracking' AND policyname = 'Users can manage own fertility data'
  ) THEN
    CREATE POLICY "Users can manage own fertility data"
      ON fertility_tracking FOR ALL
      TO authenticated
      USING (auth.uid() = user_id OR (
        shared_with_partner = true AND EXISTS (
          SELECT 1 FROM partner_connections 
          WHERE (user_id = fertility_tracking.user_id AND partner_id = auth.uid())
          OR (partner_id = fertility_tracking.user_id AND user_id = auth.uid())
          AND status = 'connected'
        )
      ))
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Analytics and usage policies
DO $$
BEGIN
  -- AI usage analytics policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ai_usage_analytics' AND policyname = 'Users can access own analytics'
  ) THEN
    CREATE POLICY "Users can access own analytics"
      ON ai_usage_analytics FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Onboarding notifications policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'onboarding_notifications' AND policyname = 'Users can manage own notifications'
  ) THEN
    CREATE POLICY "Users can manage own notifications"
      ON onboarding_notifications FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Circadian events policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'circadian_events' AND policyname = 'Users can manage own circadian events'
  ) THEN
    CREATE POLICY "Users can manage own circadian events"
      ON circadian_events FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Circadian insights policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'circadian_insights' AND policyname = 'Users can access own circadian insights'
  ) THEN
    CREATE POLICY "Users can access own circadian insights"
      ON circadian_insights FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Public access policies for shared data
DO $$
BEGIN
  -- Supplement forms (public read)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'supplement_forms' AND policyname = 'Public can read supplement forms'
  ) THEN
    CREATE POLICY "Public can read supplement forms"
      ON supplement_forms FOR SELECT
      TO public
      USING (true);
  END IF;

  -- Health coach prompts (public read)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'health_coach_prompts' AND policyname = 'Public can read health coach prompts'
  ) THEN
    CREATE POLICY "Public can read health coach prompts"
      ON health_coach_prompts FOR SELECT
      TO public
      USING (true);
  END IF;

  -- Configuration (public read for public scope)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'configuration' AND policyname = 'Public can read public configuration'
  ) THEN
    CREATE POLICY "Public can read public configuration"
      ON configuration FOR SELECT
      TO public
      USING (scope = 'public');
  END IF;
END $$;

-- Grant necessary permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant necessary permissions to service_role for Edge Functions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Create indexes for better performance on user-filtered queries
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id_date ON health_metrics(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id_date ON chat_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_food_logs_user_id_date ON food_logs(user_id, meal_time DESC);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id_date ON workout_sessions(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_user_supplements_user_id ON user_supplements(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user_id_date ON saved_recipes(user_id, saved_at DESC);
CREATE INDEX IF NOT EXISTS idx_device_data_user_id_date ON device_data_cache(user_id, data_date DESC);