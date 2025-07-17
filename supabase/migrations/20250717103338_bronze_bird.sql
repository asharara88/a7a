/*
  # Partner Sync Feature for Fertility Tracking

  1. New Tables
    - `partner_connections`: Store partner relationships between users
    - `fertility_tracking`: Track fertility metrics for integrated monitoring
    - `partner_notifications`: Manage notifications between partners

  2. Security
    - Enable RLS on all tables
    - Create policies for secure data access between partners
*/

-- Create partner_connections table to store relationships
CREATE TABLE IF NOT EXISTS partner_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'connected', 'rejected', 'removed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, partner_id)
);

-- Create fertility_tracking table for fertility metrics
CREATE TABLE IF NOT EXISTS fertility_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_day INTEGER,
  date DATE NOT NULL,
  basal_temperature NUMERIC,
  cervical_fluid TEXT,
  ovulation_test_result TEXT,
  cycle_phase TEXT,
  notes TEXT,
  luteal_phase_length INTEGER,
  follicular_phase_length INTEGER,
  shared_with_partner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create partner_notifications table
CREATE TABLE IF NOT EXISTS partner_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partner_connections_user_id ON partner_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_connections_partner_id ON partner_connections(partner_id);
CREATE INDEX IF NOT EXISTS idx_fertility_tracking_user_id_date ON fertility_tracking(user_id, date);
CREATE INDEX IF NOT EXISTS idx_partner_notifications_to_user_id ON partner_notifications(to_user_id);
CREATE INDEX IF NOT EXISTS idx_partner_notifications_is_read ON partner_notifications(to_user_id, is_read) WHERE is_read = false;

-- Enable RLS on all tables
ALTER TABLE partner_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for partner_connections
CREATE POLICY "Users can view their own partner connections"
  ON partner_connections FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = partner_id);

CREATE POLICY "Users can insert partner connection requests"
  ON partner_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own partner connections"
  ON partner_connections FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = partner_id);

CREATE POLICY "Users can delete their own partner connections"
  ON partner_connections FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for fertility_tracking
CREATE POLICY "Users can view their own fertility tracking data"
  ON fertility_tracking FOR SELECT
  USING (auth.uid() = user_id OR 
        (EXISTS (
          SELECT 1 FROM partner_connections
          WHERE (partner_connections.user_id = user_id AND partner_connections.partner_id = auth.uid())
             OR (partner_connections.partner_id = user_id AND partner_connections.user_id = auth.uid())
          AND partner_connections.status = 'connected'
          AND fertility_tracking.shared_with_partner = true
        ))
  );

CREATE POLICY "Users can insert their own fertility tracking data"
  ON fertility_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fertility tracking data"
  ON fertility_tracking FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own fertility tracking data"
  ON fertility_tracking FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for partner_notifications
CREATE POLICY "Users can view notifications sent to them"
  ON partner_notifications FOR SELECT
  USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

CREATE POLICY "Users can create notifications for partners"
  ON partner_notifications FOR INSERT
  WITH CHECK (auth.uid() = from_user_id AND
              EXISTS (
                SELECT 1 FROM partner_connections
                WHERE (partner_connections.user_id = from_user_id AND partner_connections.partner_id = to_user_id)
                   OR (partner_connections.partner_id = from_user_id AND partner_connections.user_id = to_user_id)
                AND partner_connections.status = 'connected'
              ));

CREATE POLICY "Users can update notifications they received"
  ON partner_notifications FOR UPDATE
  USING (auth.uid() = to_user_id);

CREATE POLICY "Users can delete notifications they received or sent"
  ON partner_notifications FOR DELETE
  USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

-- Create trigger functions to update timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_partner_connections_timestamp
BEFORE UPDATE ON partner_connections
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_fertility_tracking_timestamp
BEFORE UPDATE ON fertility_tracking
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();