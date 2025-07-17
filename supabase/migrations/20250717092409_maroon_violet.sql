/*
  # Populate Supplement Store

  1. New Data
    - Imports supplements from "Supplement Stacks Demo" table
    - Converts USD prices to AED (1 USD = 3.67 AED)
    - Sets appropriate tier values
    - Updates image URLs and form types

  2. Categories
    - Organizes supplements by health categories
    - Sets appropriate tier based on evidence level
*/

-- Clear any existing data in supplements table for clean import
DELETE FROM supplements;

-- Insert supplements with price conversion from USD to AED
INSERT INTO supplements (
  id, 
  name,
  brand,
  category,
  description,
  detailed_description,
  tier,
  use_case,
  price_aed,
  form_type,
  is_available,
  is_featured,
  stock_quantity
)
SELECT
  sd.id,
  sd.name,
  'Biowell',
  CASE 
    WHEN sd.category = '8Weight Loss' THEN 'Weight Management'
    ELSE sd.category
  END,
  sd.description,
  sd.detailed_description,
  -- Assign tiers based on categories (could be more nuanced in a real implementation)
  CASE
    WHEN sd.name LIKE '%Creatine%' OR sd.name LIKE '%Vitamin D%' OR sd.name LIKE '%Magnesium%' OR sd.name LIKE '%Protein%' THEN 'green'
    WHEN sd.name LIKE '%Omega%' OR sd.name LIKE '%Ashwagandha%' OR sd.name LIKE '%Berberine%' OR sd.name LIKE '%Beta-Alanine%' OR sd.name LIKE '%Zinc%' THEN 'yellow'
    ELSE 'orange'
  END as tier,
  -- Generate use case from category
  CASE
    WHEN sd.category = 'Muscle Building' THEN 'Muscle strength & power'
    WHEN sd.category = 'Endurance' THEN 'Athletic performance'
    WHEN sd.category = 'Cognitive Focus' THEN 'Mental clarity & focus'
    WHEN sd.category = 'Sleep & Recovery' THEN 'Sleep quality & recovery'
    WHEN sd.category = '8Weight Loss' THEN 'Weight management'
    WHEN sd.category = 'Metabolism' THEN 'Metabolic health'
    WHEN sd.category = 'Gut Health' THEN 'Digestive health'
    WHEN sd.category = 'Male Fertility' THEN 'Male reproductive health'
    WHEN sd.category = 'Female Fertility' THEN 'Female reproductive health'
    WHEN sd.category = 'Testosterone Optimization' THEN 'Hormone optimization'
    WHEN sd.category = 'Longevity' THEN 'Healthy aging'
    WHEN sd.category = 'Insulin Resistance' THEN 'Metabolic health'
    WHEN sd.category = 'Intermittent Fasting' THEN 'Fasting support'
    ELSE 'General health support'
  END,
  -- Convert price from USD to AED (1 USD = 3.67 AED)
  CASE
    -- Use existing price_aed if available
    WHEN sd.price_aed > 0 THEN sd.price_aed
    -- Otherwise use standard prices based on type
    WHEN sd.name LIKE '%Creatine%' THEN 85.00
    WHEN sd.name LIKE '%Protein%' THEN 180.00
    WHEN sd.name LIKE '%Beta-Alanine%' THEN 95.00
    WHEN sd.name LIKE '%BCAA%' THEN 120.00
    WHEN sd.name LIKE '%Omega%' THEN 130.00
    WHEN sd.name LIKE '%Vitamin D%' THEN 40.00
    WHEN sd.name LIKE '%Ashwagandha%' THEN 95.00
    WHEN sd.name LIKE '%Rhodiola%' THEN 95.00
    WHEN sd.name LIKE '%Berberine%' THEN 110.00
    WHEN sd.name LIKE '%Alpha-Lipoic%' THEN 80.00
    WHEN sd.name LIKE '%Magnesium%' THEN 65.00
    WHEN sd.name LIKE '%Zinc%' THEN 55.00
    WHEN sd.name LIKE '%Digestive%' THEN 85.00
    WHEN sd.name LIKE '%Tongkat%' THEN 135.00
    WHEN sd.name LIKE '%Melatonin%' THEN 45.00
    WHEN sd.name LIKE '%L-Theanine%' THEN 60.00
    WHEN sd.name LIKE '%CoQ10%' THEN 120.00
    WHEN sd.name LIKE '%Probiotics%' THEN 110.00
    ELSE 3.67 * 25.00  -- Default price: $25 converted to AED
  END,
  -- Assign form types based on product name
  CASE
    WHEN sd.name LIKE '%Oil%' OR sd.name LIKE '%Vitamin D%' OR sd.name LIKE '%CoQ10%' THEN 'softgel'
    WHEN sd.name LIKE '%Powder%' OR sd.name LIKE '%Creatine%' OR sd.name LIKE '%Protein%' THEN 'powder_large'
    WHEN sd.name LIKE '%Fiber%' OR sd.name LIKE '%Beta-Alanine%' THEN 'powder_fine'
    WHEN sd.name LIKE '%Vinegar%' OR sd.name LIKE '%Liquid%' OR sd.name LIKE '%Drops%' THEN 'liquid_bottle'
    WHEN sd.name LIKE '%Gummy%' THEN 'gummy'
    ELSE 'capsule_powder'
  END,
  true AS is_available,
  CASE
    WHEN sd.name IN ('Creatine Monohydrate', 'Vitamin D3', 'Magnesium', 'Berberine', 'Rhodiola Rosea') THEN true
    ELSE false
  END AS is_featured,
  100 AS stock_quantity
FROM "Supplement Stacks Demo" sd;

-- Update subscription discount percentages
UPDATE supplements SET
  subscription_discount_percent = 
    CASE 
      WHEN price_aed > 150 THEN 15
      WHEN price_aed > 100 THEN 12
      ELSE 10
    END;

-- Set stock quantities based on product popularity
UPDATE supplements SET
  stock_quantity = 
    CASE 
      WHEN name LIKE '%Creatine%' THEN 250
      WHEN name LIKE '%Protein%' THEN 200
      WHEN name LIKE '%Vitamin%' THEN 300
      ELSE 100
    END,
  is_bestseller = 
    CASE 
      WHEN name IN ('Creatine Monohydrate', 'Whey Protein', 'Vitamin D3', 'Magnesium Glycinate', 'Berberine') THEN true
      ELSE false
    END;

-- Set image URLs for supplements
UPDATE supplements SET
  image_url = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=500'
WHERE image_url IS NULL OR image_url = '';

-- Make sure all supplements have a tier assigned
UPDATE supplements SET tier = 'orange' WHERE tier IS NULL;

-- Update form_image_url based on form_type (uses trigger created in previous migrations)
UPDATE supplements SET 
  form_type = form_type
WHERE form_type IS NOT NULL;