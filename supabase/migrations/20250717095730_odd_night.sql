/*
  # Update Supplement Prices and Tiers

  1. Changes
    - Sets price_aed for all supplements with USD to AED conversion
    - Assigns evidence tiers based on scientific consensus
    - Updates stock quantities and availability
    - Sets subscription discounts based on tier

  2. Categorization
    - Green tier: Strong evidence from clinical trials
    - Yellow tier: Moderate evidence from some human studies
    - Orange tier: Preliminary evidence from early research
*/

-- First, update any supplements with missing price_aed using USD to AED conversion
UPDATE "supplement" 
SET 
  price_aed = CASE 
    -- Common green tier supplements with fixed prices
    WHEN name ILIKE '%creatine%' THEN 85
    WHEN name ILIKE '%vitamin d%' THEN 40
    WHEN name ILIKE '%whey protein%' THEN 180
    WHEN name ILIKE '%protein%' AND category ILIKE '%muscle%' THEN 180
    
    -- Yellow tier supplements with fixed prices
    WHEN name ILIKE '%ashwagandha%' THEN 95
    WHEN name ILIKE '%rhodiola%' THEN 95
    WHEN name ILIKE '%beta-alanine%' THEN 95
    WHEN name ILIKE '%berberine%' THEN 110
    WHEN name ILIKE '%alpha-lipoic acid%' THEN 80
    
    -- Orange tier supplements with fixed prices
    WHEN name ILIKE '%tongkat ali%' THEN 135
    WHEN name ILIKE '%digestive enzyme%' THEN 85
    
    -- Default conversion for all others
    ELSE COALESCE(price::numeric, 27) * 3.67
  END
WHERE price_aed IS NULL OR price_aed = 0;

-- Then, update supplement_stacks_demo table (if it exists)
UPDATE "Supplement Stacks Demo"
SET 
  price_aed = CASE 
    -- Common green tier supplements with fixed prices
    WHEN name ILIKE '%creatine%' THEN 85
    WHEN name ILIKE '%vitamin d%' THEN 40
    WHEN name ILIKE '%whey protein%' THEN 180
    WHEN name ILIKE '%protein%' AND category ILIKE '%muscle%' THEN 180
    
    -- Yellow tier supplements with fixed prices
    WHEN name ILIKE '%ashwagandha%' THEN 95
    WHEN name ILIKE '%rhodiola%' THEN 95
    WHEN name ILIKE '%beta-alanine%' THEN 95
    WHEN name ILIKE '%berberine%' THEN 110
    WHEN name ILIKE '%alpha-lipoic acid%' THEN 80
    
    -- Orange tier supplements with fixed prices
    WHEN name ILIKE '%tongkat ali%' THEN 135
    WHEN name ILIKE '%digestive enzyme%' THEN 85
    
    -- Default conversion for all others
    ELSE COALESCE(price::numeric, 27) * 3.67
  END
WHERE TRUE;

-- Update tiers based on evidence strength
-- First for supplement table
UPDATE supplement
SET tier = 
  CASE 
    -- Green tier - strong evidence
    WHEN name ILIKE '%creatine%' OR
         name ILIKE '%vitamin d%' OR 
         name ILIKE '%protein%' OR 
         name ILIKE '%whey%' OR
         category ILIKE '%muscle building%'
      THEN 'green'
    
    -- Yellow tier - moderate evidence
    WHEN name ILIKE '%ashwagandha%' OR
         name ILIKE '%rhodiola%' OR
         name ILIKE '%magnesium%' OR
         name ILIKE '%beta-alanine%' OR
         name ILIKE '%berberine%' OR
         name ILIKE '%l-theanine%' OR
         category ILIKE '%cognitive%' OR
         category ILIKE '%sleep%' OR
         category ILIKE '%endurance%'
      THEN 'yellow'
    
    -- Default to orange - preliminary evidence
    ELSE 'orange'
  END
WHERE tier IS NULL;

-- Set subscription discount percentages based on tier
UPDATE supplement
SET subscription_discount_percent = 
  CASE 
    WHEN tier = 'green' THEN 15
    WHEN tier = 'yellow' THEN 12
    ELSE 10
  END
WHERE subscription_discount_percent IS NULL OR subscription_discount_percent = 0;

-- Set bestseller and featured flags for popular supplements
UPDATE supplement
SET 
  is_bestseller = TRUE
WHERE 
  name ILIKE '%creatine%' OR
  name ILIKE '%protein%' OR
  name ILIKE '%vitamin d%' OR
  name ILIKE '%ashwagandha%' OR
  name ILIKE '%omega-3%';

UPDATE supplement
SET 
  is_featured = TRUE
WHERE 
  name ILIKE '%creatine%' OR
  name ILIKE '%berberine%' OR
  name ILIKE '%magnesium%' OR
  name ILIKE '%rhodiola%';

-- Update stock quantities
UPDATE supplement
SET stock_quantity = 
  CASE 
    WHEN is_bestseller = TRUE THEN 250
    WHEN is_featured = TRUE THEN 150
    ELSE 100
  END
WHERE stock_quantity IS NULL OR stock_quantity <= 0;

-- Make sure all supplements are available
UPDATE supplement
SET is_available = TRUE
WHERE is_available IS NULL;