/*
  # Create Fitness Tracking Tables

  1. New Tables
    - `workout_sessions`: Stores user workout sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `workout_type` (text)
      - `duration` (integer, minutes)
      - `calories_burned` (integer)
      - `timestamp` (timestamptz)
      - `notes` (text)
      - `created_at` (timestamptz)
    
    - `exercise_sets`: Stores exercise details for workouts
      - `id` (uuid, primary key)
      - `workout_id` (uuid, foreign key to workout_sessions)
      - `exercise_name` (text)
      - `sets` (integer)
      - `reps` (integer)
      - `weight` (numeric, optional)
      - `duration` (integer, optional, seconds)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    
  3. Indexes
    - Add indexes for efficient querying
*/

-- Create workout_sessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_type text NOT NULL,
  duration integer NOT NULL,
  calories_burned integer NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create exercise_sets table
CREATE TABLE IF NOT EXISTS exercise_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id uuid NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_name text NOT NULL,
  sets integer NOT NULL,
  reps integer NOT NULL,
  weight numeric,
  duration integer,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_timestamp ON workout_sessions(timestamp);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_timestamp ON workout_sessions(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_exercise_sets_workout_id ON exercise_sets(workout_id);

-- Enable Row Level Security
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;

-- Create policies for workout_sessions
CREATE POLICY "Users can view their own workout sessions"
  ON workout_sessions FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout sessions"
  ON workout_sessions FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions"
  ON workout_sessions FOR UPDATE
  TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout sessions"
  ON workout_sessions FOR DELETE
  TO public
  USING (auth.uid() = user_id);

-- Create policies for exercise_sets
CREATE POLICY "Users can view their own exercise sets"
  ON exercise_sets FOR SELECT
  TO public
  USING (EXISTS (
    SELECT 1 FROM workout_sessions
    WHERE workout_sessions.id = exercise_sets.workout_id
    AND workout_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own exercise sets"
  ON exercise_sets FOR INSERT
  TO public
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_sessions
    WHERE workout_sessions.id = exercise_sets.workout_id
    AND workout_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own exercise sets"
  ON exercise_sets FOR UPDATE
  TO public
  USING (EXISTS (
    SELECT 1 FROM workout_sessions
    WHERE workout_sessions.id = exercise_sets.workout_id
    AND workout_sessions.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_sessions
    WHERE workout_sessions.id = exercise_sets.workout_id
    AND workout_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own exercise sets"
  ON exercise_sets FOR DELETE
  TO public
  USING (EXISTS (
    SELECT 1 FROM workout_sessions
    WHERE workout_sessions.id = exercise_sets.workout_id
    AND workout_sessions.user_id = auth.uid()
  ));