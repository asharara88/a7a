/*
  # Lab Results Table

  1. New Tables
    - `lab_results`: Stores user-uploaded lab test results
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `test_name` (text)
      - `test_date` (date)
      - `test_category` (text)
      - `test_results` (jsonb)
      - `file_url` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on lab_results table
    - Add policies for authenticated users to manage their own results

  3. Indexes
    - Create indexes for efficient querying by user_id, test_date, and category
*/

-- Create lab_results table
CREATE TABLE IF NOT EXISTS lab_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  test_category TEXT,
  test_results JSONB NOT NULL,
  file_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;

-- Create policies for lab results
CREATE POLICY "Users can view their own lab results"
  ON lab_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lab results"
  ON lab_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lab results"
  ON lab_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lab results"
  ON lab_results FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_lab_results_user_id ON lab_results(user_id);
CREATE INDEX idx_lab_results_test_category ON lab_results(test_category);
CREATE INDEX idx_lab_results_test_date ON lab_results(test_date);

-- Create trigger function to update updated_at column
CREATE OR REPLACE FUNCTION update_lab_results_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to lab_results table
CREATE TRIGGER update_lab_results_updated_at
BEFORE UPDATE ON lab_results
FOR EACH ROW
EXECUTE FUNCTION update_lab_results_updated_at();