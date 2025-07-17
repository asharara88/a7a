/*
  # Fix Category Column for Supplements

  1. Changes
    - Check if category column exists, add if missing
    - Update references to category column in filtering logic
    - Ensure supplements have tier values
*/

-- First check if category column exists, add if not
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'supplements' AND column_name = 'category'
  ) THEN
    -- Add the category column if it doesn't exist
    ALTER TABLE supplements ADD COLUMN category TEXT;
    
    -- Update category based on other fields when possible
    UPDATE supplements 
    SET category = 
      CASE 
        WHEN name ILIKE '%protein%' OR name ILIKE '%creatine%' THEN 'Muscle Building'
        WHEN name ILIKE '%vitamin d%' OR name ILIKE '%zinc%' THEN 'Immune Support'
        WHEN name ILIKE '%omega%' OR name ILIKE '%fish%' THEN 'Heart Health'
        WHEN name ILIKE '%magnesium%' OR name ILIKE '%melatonin%' THEN 'Sleep & Recovery'
        WHEN name ILIKE '%rhodiola%' OR name ILIKE '%ginkgo%' THEN 'Cognitive Focus'
        WHEN name ILIKE '%probiotics%' OR name ILIKE '%digestive%' THEN 'Gut Health'
        ELSE 'General Health'
      END;
  END IF;
  
  -- Ensure tier column exists and has valid values
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'supplements' AND column_name = 'tier'
  ) THEN
    -- Update tier values where they might be null or invalid
    UPDATE supplements 
    SET tier = 
      CASE 
        WHEN tier IS NULL OR tier NOT IN ('green', 'yellow', 'orange') THEN 
          CASE 
            WHEN name ILIKE '%creatine%' OR name ILIKE '%protein%' OR name ILIKE '%vitamin d%' THEN 'green'
            WHEN name ILIKE '%ashwagandha%' OR name ILIKE '%magnesium%' OR name ILIKE '%rhodiola%' THEN 'yellow'
            ELSE 'orange'
          END
        ELSE tier
      END;
  ELSE
    -- Add tier column if it doesn't exist
    ALTER TABLE supplements ADD COLUMN tier TEXT;
    
    -- Set default values
    UPDATE supplements 
    SET tier = 
      CASE 
        WHEN name ILIKE '%creatine%' OR name ILIKE '%protein%' OR name ILIKE '%vitamin d%' THEN 'green'
        WHEN name ILIKE '%ashwagandha%' OR name ILIKE '%magnesium%' OR name ILIKE '%rhodiola%' THEN 'yellow'
        ELSE 'orange'
      END;
  END IF;
END $$;