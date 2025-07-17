/*
  # Add Saved Recipes Indexes

  1. New Indexes
    - Add indexes to saved_recipes table to improve query performance
    - Add index on user_id for faster user-specific lookups
    - Add index on is_favorite for filtering favorite recipes
    - Add index on saved_at for sorting by date

  2. RLS Policies
    - Add policies to ensure users can only access their own saved recipes
*/

-- Add index for user_id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user_id 
  ON public.saved_recipes(user_id);

-- Add index for is_favorite field
CREATE INDEX IF NOT EXISTS idx_saved_recipes_is_favorite
  ON public.saved_recipes(is_favorite)
  WHERE is_favorite = true;

-- Add index for saved_at for sorting
CREATE INDEX IF NOT EXISTS idx_saved_recipes_saved_at
  ON public.saved_recipes(saved_at DESC);

-- Add combined index for user and date
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user_date
  ON public.saved_recipes(user_id, saved_at DESC);

-- Enable Row Level Security if not already enabled
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own saved recipes" ON public.saved_recipes;
DROP POLICY IF EXISTS "Users can insert their own saved recipes" ON public.saved_recipes;
DROP POLICY IF EXISTS "Users can update their own saved recipes" ON public.saved_recipes;
DROP POLICY IF EXISTS "Users can delete their own saved recipes" ON public.saved_recipes;

-- Create policies for saved_recipes
CREATE POLICY "Users can view their own saved recipes"
  ON public.saved_recipes FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved recipes"
  ON public.saved_recipes FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved recipes"
  ON public.saved_recipes FOR UPDATE
  TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved recipes"
  ON public.saved_recipes FOR DELETE
  TO public
  USING (auth.uid() = user_id);