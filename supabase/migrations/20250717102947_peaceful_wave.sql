/*
  # Add CGM Integration and Fasting Protocol Tables

  1. New Tables
    - `fasting_protocols` - Stores intermittent fasting protocol information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `pattern` (text)
      - `fasting_hours` (integer)
      - `eating_hours` (integer)
      - `start_time` (time)
      - `end_time` (time)
      - `active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `fasting_history` - Stores user's fasting sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `protocol_id` (uuid, references fasting_protocols)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `completed` (boolean)
      - `created_at` (timestamptz)

  2. Updates to Existing Tables
    - Add fields to `cgm_data` table
      - `trend` (text) - Direction of glucose change
      - `notes` (text) - User notes about readings

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create fasting_protocols table if it doesn't exist
CREATE TABLE IF NOT EXISTS fasting_protocols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  pattern text NOT NULL,
  fasting_hours integer NOT NULL,
  eating_hours integer NOT NULL,
  start_time time,
  end_time time,
  active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fasting_history table if it doesn't exist
CREATE TABLE IF NOT EXISTS fasting_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  protocol_id uuid REFERENCES fasting_protocols(id) ON DELETE SET NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Update cgm_data table with new fields if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cgm_data' AND column_name = 'trend') THEN
    ALTER TABLE cgm_data ADD COLUMN trend text CHECK (trend IN ('rising', 'falling', 'stable'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cgm_data' AND column_name = 'notes') THEN
    ALTER TABLE cgm_data ADD COLUMN notes text;
  END IF;
END$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fasting_protocols_user_id ON fasting_protocols(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_protocols_active ON fasting_protocols(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_fasting_history_user_id ON fasting_history(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_history_protocol_id ON fasting_history(protocol_id);
CREATE INDEX IF NOT EXISTS idx_fasting_history_start_time ON fasting_history(start_time DESC);

-- Enable Row Level Security
ALTER TABLE fasting_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_history ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can access their own fasting protocols"
  ON fasting_protocols FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can access their own fasting history"
  ON fasting_history FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add CGM data RLS policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cgm_data' AND policyname = 'Users can access own CGM data'
  ) THEN
    CREATE POLICY "Users can access own CGM data"
      ON cgm_data FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cgm_data' AND policyname = 'Users can update own CGM data'
  ) THEN
    CREATE POLICY "Users can update own CGM data"
      ON cgm_data FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cgm_data' AND policyname = 'Users can insert their own CGM data'
  ) THEN
    CREATE POLICY "Users can insert their own CGM data"
      ON cgm_data FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cgm_data' AND policyname = 'Users can delete own CGM data'
  ) THEN
    CREATE POLICY "Users can delete own CGM data"
      ON cgm_data FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END$$;

-- Create trigger function to update updated_at
CREATE OR REPLACE FUNCTION update_fasting_protocols_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger
CREATE TRIGGER update_fasting_protocols_updated_at
  BEFORE UPDATE ON fasting_protocols
  FOR EACH ROW
  EXECUTE FUNCTION update_fasting_protocols_updated_at();

-- Insert default fasting protocols for all users
INSERT INTO fasting_protocols (user_id, name, pattern, fasting_hours, eating_hours, active, start_time, end_time)
SELECT 
  id AS user_id,
  '16:8 Method',
  '16 hours fasting, 8 hour eating window',
  16,
  8,
  true,
  '12:00:00',
  '20:00:00'
FROM auth.users
ON CONFLICT (id) DO NOTHING;