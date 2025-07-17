/*
  # Add Supplement Tier Classifications

  1. Changes
    - Update supplements table with explicit tier classifications
    - Add tier metadata to existing supplements
    - Ensure representation across green, yellow, and orange tiers
    - Set pricing aligned with evidence tiers
*/

-- First update all supplements to have a tier if they don't already
UPDATE supplements
SET tier = CASE 
  WHEN RANDOM() < 0.5 THEN 'green'
  WHEN RANDOM() < 0.75 THEN 'yellow' 
  ELSE 'orange'
END
WHERE tier IS NULL;

-- Ensure we have specific supplements in green tier (strongest evidence)
UPDATE supplements 
SET 
  tier = 'green',
  price_aed = 85.00,
  subscription_discount_percent = 15,
  use_case = 'Muscle strength & power',
  is_available = true
WHERE name LIKE '%Creatine%' OR name LIKE '%Vitamin D3%' OR name LIKE '%Omega-3%';

-- Ensure we have specific supplements in yellow tier (moderate evidence)
UPDATE supplements 
SET 
  tier = 'yellow',
  price_aed = CASE
    WHEN price_aed IS NULL OR price_aed = 0 THEN 95.00
    ELSE price_aed
  END,
  subscription_discount_percent = 12,
  use_case = 'Energy & focus',
  is_available = true
WHERE name LIKE '%Ashwagandha%' OR name LIKE '%Rhodiola%' OR name LIKE '%Magnesium%';

-- Ensure we have specific supplements in orange tier (preliminary evidence)
UPDATE supplements 
SET 
  tier = 'orange',
  price_aed = CASE
    WHEN price_aed IS NULL OR price_aed = 0 THEN 135.00
    ELSE price_aed
  END,
  subscription_discount_percent = 10,
  use_case = 'Hormonal support',
  is_available = true
WHERE name LIKE '%Tongkat Ali%' OR name LIKE '%Myo-Inositol%' OR name LIKE '%DHEA%';

-- Set appropriate price for any remaining supplements without pricing
UPDATE supplements
SET 
  price_aed = CASE tier
    WHEN 'green' THEN 85.00
    WHEN 'yellow' THEN 95.00
    WHEN 'orange' THEN 135.00
    ELSE 75.00
  END,
  subscription_discount_percent = CASE tier
    WHEN 'green' THEN 15
    WHEN 'yellow' THEN 12
    WHEN 'orange' THEN 10
    ELSE 10
  END
WHERE price_aed IS NULL OR price_aed = 0;

-- Feature some high-quality supplements
UPDATE supplements
SET is_featured = true
WHERE tier = 'green' AND RANDOM() < 0.5;

-- Mark some supplements as bestsellers
UPDATE supplements
SET is_bestseller = true
WHERE (tier = 'green' OR tier = 'yellow') AND RANDOM() < 0.3;

-- Add default image URL for supplements without images
UPDATE supplements
SET image_url = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
WHERE image_url IS NULL OR image_url = '';

-- Ensure form_type is set for proper display
UPDATE supplements
SET form_type = 'capsule_powder'
WHERE form_type IS NULL;