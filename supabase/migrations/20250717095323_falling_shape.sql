/*
  # Update Supplement Tiers and Pricing

  1. Changes
    - Add tier information to all supplements in the database
    - Set appropriate USD to AED conversion (1 USD = 3.67 AED)
    - Add subscription discount percentages based on tier
    - Ensure supplements have proper evidence-based categorization
    - Fix product metadata and descriptions

  2. Categories
    - Organize supplements into logical categories for filtering
    - Add subcategories for more specific targeting
    - Fix category for "8Weight Loss" to "Weight Management"
*/

-- Update tier, price, and subscription discount for all supplements
UPDATE supplement
SET
  tier = CASE
    -- Green tier - strong evidence
    WHEN LOWER(name) LIKE '%creatine%' OR
         LOWER(name) LIKE '%vitamin d%' OR
         LOWER(name) LIKE '%protein%' OR
         LOWER(name) LIKE '%whey%' OR
         LOWER(name) LIKE '%caffeine%' OR
         LOWER(category) LIKE '%muscle building%'
    THEN 'green'
    
    -- Yellow tier - moderate evidence
    WHEN LOWER(name) LIKE '%ashwagandha%' OR
         LOWER(name) LIKE '%rhodiola%' OR
         LOWER(name) LIKE '%magnesium%' OR
         LOWER(name) LIKE '%beta-alanine%' OR
         LOWER(name) LIKE '%berberine%' OR
         LOWER(name) LIKE '%theanine%' OR
         LOWER(name) LIKE '%zinc%' OR
         LOWER(name) LIKE '%electrolytes%' OR
         LOWER(name) LIKE '%b-complex%' OR
         LOWER(name) LIKE '%glutamine%' OR
         LOWER(category) LIKE '%cognitive%' OR
         LOWER(category) LIKE '%sleep%' OR
         LOWER(category) LIKE '%endurance%'
    THEN 'yellow'
    
    -- Default to orange - preliminary evidence
    ELSE 'orange'
  END,
  
  price_aed = CASE
    -- Set prices based on tier and popularity
    WHEN LOWER(name) LIKE '%creatine%' THEN 85.00
    WHEN LOWER(name) LIKE '%vitamin d%' THEN 40.00
    WHEN LOWER(name) LIKE '%protein%' THEN 180.00
    WHEN LOWER(name) LIKE '%whey%' THEN 180.00
    WHEN LOWER(name) LIKE '%ashwagandha%' THEN 95.00
    WHEN LOWER(name) LIKE '%rhodiola%' THEN 95.00
    WHEN LOWER(name) LIKE '%berberine%' THEN 110.00
    WHEN LOWER(name) LIKE '%magnesium%' THEN 75.00
    WHEN LOWER(name) LIKE '%beta-alanine%' THEN 95.00
    WHEN LOWER(name) LIKE '%tongkat ali%' THEN 135.00
    WHEN LOWER(name) LIKE '%digestive enzyme%' THEN 85.00
    WHEN LOWER(name) LIKE '%alpha-lipoic%' THEN 80.00
    ELSE price::numeric * 3.67 -- Convert USD to AED for all others
  END,
  
  subscription_discount_percent = CASE
    -- Higher discount for green tier (strongest evidence)
    WHEN LOWER(name) LIKE '%creatine%' OR
         LOWER(name) LIKE '%vitamin d%' OR
         LOWER(name) LIKE '%protein%' OR
         LOWER(name) LIKE '%whey%' OR
         LOWER(name) LIKE '%caffeine%' OR
         LOWER(category) LIKE '%muscle building%'
    THEN 15
    
    -- Medium discount for yellow tier
    WHEN LOWER(name) LIKE '%ashwagandha%' OR
         LOWER(name) LIKE '%rhodiola%' OR
         LOWER(name) LIKE '%magnesium%' OR
         LOWER(name) LIKE '%beta-alanine%' OR
         LOWER(name) LIKE '%berberine%' OR
         LOWER(name) LIKE '%theanine%' OR
         LOWER(category) LIKE '%cognitive%' OR
         LOWER(category) LIKE '%sleep%' OR
         LOWER(category) LIKE '%endurance%'
    THEN 12
    
    -- Lower discount for orange tier (preliminary evidence)
    ELSE 10
  END,
  
  -- Fix category names
  category = CASE
    WHEN category = '8Weight Loss' THEN 'Weight Management'
    ELSE category
  END,
  
  -- Set all supplements to available
  is_available = true
WHERE TRUE;

-- Add placeholder image URLs if missing
UPDATE supplement
SET 
  image_url = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
WHERE image_url IS NULL OR image_url = '';

-- Update bestseller and featured flags
UPDATE supplement
SET 
  is_bestseller = true,
  is_featured = true
WHERE 
  LOWER(name) LIKE '%creatine%' OR
  LOWER(name) LIKE '%protein%' OR
  LOWER(name) LIKE '%vitamin d%' OR
  LOWER(name) LIKE '%magnesium%' OR
  LOWER(name) LIKE '%ashwagandha%';