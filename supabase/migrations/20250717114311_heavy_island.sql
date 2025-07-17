/*
  # Create Circadian Rhythm Tracking Tables

  1. New Tables
    - `circadian_events`: Tracks user's circadian events like fasting, meals, light exposure
    - `circadian_insights`: Stores insights and recommendations based on circadian patterns

  2. Security
    - Enable RLS for data isolation
    - Add policies for secure data access
*/

-- Create circadian_events table
CREATE TABLE IF NOT EXISTS public.circadian_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create circadian_insights table
CREATE TABLE IF NOT EXISTS public.circadian_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type text NOT NULL,
  message text NOT NULL,
  scheduled_for timestamptz,
  created_at timestamptz DEFAULT now(),
  is_read boolean DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_circadian_events_user_timestamp 
ON public.circadian_events(user_id, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_circadian_insights_user_scheduled 
ON public.circadian_insights(user_id, scheduled_for);

-- Enable row level security
ALTER TABLE public.circadian_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circadian_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for circadian_events
CREATE POLICY "Users can view their own circadian events"
ON public.circadian_events FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own circadian events"
ON public.circadian_events FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own circadian events"
ON public.circadian_events FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own circadian events"
ON public.circadian_events FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for circadian_insights
CREATE POLICY "Users can view their own circadian insights"
ON public.circadian_insights FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own circadian insights"
ON public.circadian_insights FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow service role to insert insights
CREATE POLICY "Service role can manage insights"
ON public.circadian_insights FOR ALL
TO service_role
USING (true)
WITH CHECK (true);