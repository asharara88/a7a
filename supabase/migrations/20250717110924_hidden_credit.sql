/*
  # Fix Supplements Tables

  1. New Columns
    - Add category column to supplements table if it doesn't exist
    - Add tier column to supplements table if it doesn't exist
  
  2. Data Cleanup
    - Set default values for category based on supplement name/description
    - Ensure tier values are properly set (green, yellow, orange)
*/

-- Add category column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'supplements' AND column_name = 'category'
  ) THEN
    ALTER TABLE supplements ADD COLUMN category TEXT;
  END IF;
END $$;

-- Add tier column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'supplements' AND column_name = 'tier'
  ) THEN
    ALTER TABLE supplements ADD COLUMN tier TEXT;
  END IF;
END $$;

-- Set default category values based on supplement names
UPDATE supplements 
SET category = 
  CASE 
    WHEN name ILIKE '%creatine%' THEN 'Muscle Building'
    WHEN name ILIKE '%protein%' OR name ILIKE '%whey%' OR name ILIKE '%casein%' THEN 'Muscle Building'
    WHEN name ILIKE '%beta-alanine%' OR name ILIKE '%bcaa%' THEN 'Muscle Building'
    
    WHEN name ILIKE '%vitamin d%' OR name ILIKE '%vitamin c%' THEN 'Vitamins'
    WHEN name ILIKE '%omega%' OR name ILIKE '%fish oil%' THEN 'Omega Fatty Acids'
    
    WHEN name ILIKE '%ashwagandha%' OR name ILIKE '%rhodiola%' THEN 'Adaptogens'
    WHEN name ILIKE '%magnesium%' OR name ILIKE '%zinc%' THEN 'Minerals'
    
    WHEN name ILIKE '%probiotics%' OR name ILIKE '%digestive%' THEN 'Gut Health'
    WHEN name ILIKE '%melatonin%' OR name ILIKE '%sleep%' THEN 'Sleep'
    
    ELSE 'General Health'
  END
WHERE category IS NULL;

-- Set default tier values based on supplement names and scientific evidence
UPDATE supplements 
SET tier = 
  CASE 
    -- Green tier (strong evidence)
    WHEN name ILIKE '%creatine%' THEN 'green'
    WHEN name ILIKE '%vitamin d%' THEN 'green'
    WHEN name ILIKE '%protein%' OR name ILIKE '%whey%' THEN 'green'
    WHEN name ILIKE '%magnesium%' THEN 'green'
    WHEN name ILIKE '%caffeine%' THEN 'green'
    
    -- Yellow tier (moderate evidence)
    WHEN name ILIKE '%ashwagandha%' THEN 'yellow'
    WHEN name ILIKE '%rhodiola%' THEN 'yellow'
    WHEN name ILIKE '%beta-alanine%' THEN 'yellow'
    WHEN name ILIKE '%theanine%' THEN 'yellow'
    WHEN name ILIKE '%berberine%' THEN 'yellow'
    WHEN name ILIKE '%zinc%' THEN 'yellow'
    WHEN name ILIKE '%omega%' OR name ILIKE '%fish oil%' THEN 'yellow'
    
    -- Orange tier (preliminary evidence)
    WHEN name ILIKE '%tongkat%' THEN 'orange'
    WHEN name ILIKE '%shilajit%' THEN 'orange'
    WHEN name ILIKE '%turkesterone%' THEN 'orange'
    WHEN name ILIKE '%cissus%' THEN 'orange'
    
    -- Default to yellow tier if unknown
    ELSE 'yellow'
  END
WHERE tier IS NULL;

-- Clean up any empty string tier values
UPDATE supplements 
SET tier = 'yellow'
WHERE tier = '';