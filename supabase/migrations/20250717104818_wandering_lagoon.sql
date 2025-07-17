/*
  # Populate Supplements with Tiers

  1. Changes
    - Set tier values for all supplements (green, yellow, orange)
    - Ensure tier, category and subcategory are set for proper filtering
*/

-- Fix any NULL tier values first
UPDATE supplements
SET tier = 
  CASE 
    WHEN LOWER(name) LIKE '%creatine%' OR 
         LOWER(name) LIKE '%vitamin d%' OR 
         LOWER(name) LIKE '%protein%' OR 
         LOWER(name) LIKE '%whey%' OR 
         LOWER(name) LIKE '%caffeine%'
    THEN 'green'
    WHEN LOWER(name) LIKE '%ashwagandha%' OR 
         LOWER(name) LIKE '%rhodiola%' OR 
         LOWER(name) LIKE '%magnesium%' OR 
         LOWER(name) LIKE '%beta-alanine%' OR 
         LOWER(name) LIKE '%berberine%'
    THEN 'yellow'
    ELSE 'orange'
  END
WHERE tier IS NULL;

-- Populate category if missing (for better filtering)
UPDATE supplements
SET category = 
  CASE
    WHEN LOWER(name) LIKE '%creatine%' OR LOWER(name) LIKE '%protein%' THEN 'Muscle Building'
    WHEN LOWER(name) LIKE '%berberine%' OR LOWER(name) LIKE '%glucose%' THEN 'Metabolism'
    WHEN LOWER(name) LIKE '%sleep%' OR LOWER(name) LIKE '%melatonin%' THEN 'Sleep & Recovery'
    WHEN LOWER(name) LIKE '%focus%' OR LOWER(name) LIKE '%cognitive%' THEN 'Cognitive Focus'
    WHEN LOWER(name) LIKE '%probiotic%' OR LOWER(name) LIKE '%digestive%' THEN 'Gut Health'
    ELSE 'General Health'
  END
WHERE category IS NULL;

-- Insert some sample supplements with tiers if table is empty
INSERT INTO supplements (id, name, brand, description, tier, category, price_aed, image_url)
SELECT 
  gen_random_uuid(), 
  supplement,
  'Biowell',
  description, 
  tier,
  category,
  price::numeric, 
  'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
FROM (VALUES
  ('Creatine Monohydrate', 'Increases muscle strength and power output during high-intensity exercise', 'green', 'Muscle Building', 85),
  ('Vitamin D3', 'Essential fat-soluble vitamin supporting immune function and bone health', 'green', 'Immunity', 40),
  ('Magnesium Glycinate', 'Supports sleep, muscle recovery and nervous system function', 'yellow', 'Sleep & Recovery', 75),
  ('Berberine', 'Supports metabolic health and glucose metabolism', 'yellow', 'Metabolism', 110),
  ('Rhodiola Rosea', 'Adaptogen that helps combat fatigue and supports cognitive function', 'yellow', 'Cognitive Focus', 95)
) AS t(supplement, description, tier, category, price)
WHERE NOT EXISTS (SELECT 1 FROM supplements LIMIT 1);

-- Make sure we have is_available set
UPDATE supplements
SET is_available = true
WHERE is_available IS NULL;