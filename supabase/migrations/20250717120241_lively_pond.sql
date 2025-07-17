/*
  # Device Integration Schema

  1. New Tables
    - `device_connections`: Stores OAuth connection details for wearables, CGMs, and scales
    - `device_data_cache`: Stores cached data from connected devices
    - `device_sync_logs`: Tracks sync activity and errors
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user data isolation
*/

-- Device connections table
CREATE TABLE IF NOT EXISTS device_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL CHECK (device_type IN ('wearable', 'cgm', 'scale')),
  provider TEXT NOT NULL,
  device_id TEXT NOT NULL,
  device_name TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  last_synced TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, device_type, provider, device_id)
);

-- Enable RLS
ALTER TABLE device_connections ENABLE ROW LEVEL SECURITY;

-- Device data cache table
CREATE TABLE IF NOT EXISTS device_data_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_id uuid REFERENCES device_connections(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL,
  data_date DATE NOT NULL,
  data JSONB NOT NULL,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, connection_id, data_type, data_date)
);

-- Enable RLS
ALTER TABLE device_data_cache ENABLE ROW LEVEL SECURITY;

-- Sync logs table
CREATE TABLE IF NOT EXISTS device_sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_id uuid REFERENCES device_connections(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  items_synced INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE device_sync_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for device_connections
CREATE POLICY "Users can view their own device connections"
  ON device_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own device connections"
  ON device_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own device connections"
  ON device_connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own device connections"
  ON device_connections FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for device_data_cache
CREATE POLICY "Users can view their own device data"
  ON device_data_cache FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own device data"
  ON device_data_cache FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own device data"
  ON device_data_cache FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own device data"
  ON device_data_cache FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for device_sync_logs
CREATE POLICY "Users can view their own device sync logs"
  ON device_sync_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own device sync logs"
  ON device_sync_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_device_connections_user_id ON device_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_device_connections_provider ON device_connections(provider);
CREATE INDEX IF NOT EXISTS idx_device_connections_device_type ON device_connections(device_type);
CREATE INDEX IF NOT EXISTS idx_device_data_cache_user_id ON device_data_cache(user_id);
CREATE INDEX IF NOT EXISTS idx_device_data_cache_connection_id ON device_data_cache(connection_id);
CREATE INDEX IF NOT EXISTS idx_device_data_cache_data_date ON device_data_cache(data_date);
CREATE INDEX IF NOT EXISTS idx_device_sync_logs_user_id ON device_sync_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_device_sync_logs_connection_id ON device_sync_logs(connection_id);

-- Create trigger function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_device_connection_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_device_connections_updated_at
BEFORE UPDATE ON device_connections
FOR EACH ROW EXECUTE FUNCTION update_device_connection_updated_at();

-- Create trigger function for device data cache
CREATE OR REPLACE FUNCTION update_device_data_cache_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_device_data_cache_updated_at
BEFORE UPDATE ON device_data_cache
FOR EACH ROW EXECUTE FUNCTION update_device_data_cache_updated_at();