/*
  # Populate Supplements Table

  1. Changes
    - Add initial supplements to the store
    - Update existing supplements with tiers, prices, and descriptions
    - Add evidence information and image URLs
*/

-- Insert supplements if they don't already exist
INSERT INTO supplements (
  id, name, description, price_aed, tier, use_case, 
  image_url, form_type, brand, is_available, is_featured
)
VALUES
  -- Green tier supplements (strong evidence)
  (gen_random_uuid(), 'Creatine Monohydrate', 'Increases strength, power, and muscle mass. Enhances high-intensity exercise performance with strong clinical evidence.', 85.00, 'green', 'Strength & Power', 
   'https://images.pexels.com/photos/4219181/pexels-photo-4219181.jpeg?auto=compress&cs=tinysrgb&w=300', 'powder_fine', 'Biowell', true, true),
  
  (gen_random_uuid(), 'Vitamin D3', 'Essential fat-soluble vitamin supporting immune function, bone health, and hormone regulation with substantial evidence.', 40.00, 'green', 'Immune Support', 
   'https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&cs=tinysrgb&w=300', 'softgel', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Magnesium Glycinate', 'Highly bioavailable form of magnesium that supports sleep quality, muscle recovery, and nervous system function.', 60.00, 'green', 'Sleep & Recovery', 
   'https://images.pexels.com/photos/6476257/pexels-photo-6476257.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_solid', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Whey Protein Isolate', 'High-quality protein source with minimal lactose and fat, ideal for muscle recovery and growth.', 180.00, 'green', 'Muscle Building', 
   'https://images.pexels.com/photos/10250166/pexels-photo-10250166.jpeg?auto=compress&cs=tinysrgb&w=300', 'powder_large', 'Biowell', true, true),
  
  (gen_random_uuid(), 'Omega-3 Fish Oil', 'Essential fatty acids supporting heart, brain, joint, and metabolic health with extensive research backing.', 65.00, 'green', 'Heart & Brain Health', 
   'https://images.pexels.com/photos/6476264/pexels-photo-6476264.jpeg?auto=compress&cs=tinysrgb&w=300', 'softgel', 'Biowell', true, false),
  
  -- Yellow tier supplements (moderate evidence)
  (gen_random_uuid(), 'Ashwagandha KSM-66', 'Adaptogenic herb that helps the body manage stress and supports overall wellbeing with moderate clinical evidence.', 75.00, 'yellow', 'Stress Management', 
   'https://images.pexels.com/photos/6476598/pexels-photo-6476598.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Beta-Alanine', 'Non-essential amino acid that buffers lactic acid in muscles, potentially improving endurance in high-intensity exercise.', 95.00, 'yellow', 'Endurance', 
   'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=300', 'powder_fine', 'Biowell', true, false),
  
  (gen_random_uuid(), 'L-Theanine', 'Amino acid found in tea that promotes relaxation without sedation, often paired with caffeine.', 55.00, 'yellow', 'Stress & Focus', 
   'https://images.pexels.com/photos/6476384/pexels-photo-6476384.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Rhodiola Rosea', 'Adaptogenic herb that combats fatigue and supports cognitive function during stress with growing clinical support.', 95.00, 'yellow', 'Energy & Focus', 
   'https://images.pexels.com/photos/6476593/pexels-photo-6476593.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Berberine', 'Plant compound supporting metabolic health and glucose metabolism with promising clinical results.', 110.00, 'yellow', 'Metabolic Health', 
   'https://images.pexels.com/photos/6476614/pexels-photo-6476614.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  -- Orange tier supplements (preliminary evidence)
  (gen_random_uuid(), 'Tongkat Ali', 'Traditional herb used to support male hormonal health and vitality with preliminary research evidence.', 135.00, 'orange', 'Hormonal Support', 
   'https://images.pexels.com/photos/6476580/pexels-photo-6476580.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Lion''s Mane Mushroom', 'Medicinal mushroom being studied for potential cognitive and nerve health benefits with emerging research.', 85.00, 'orange', 'Cognitive Health', 
   'https://images.pexels.com/photos/6476277/pexels-photo-6476277.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Cordyceps Mushroom', 'Adaptogenic fungus traditionally used for energy and endurance with limited but growing clinical support.', 90.00, 'orange', 'Energy & Performance', 
   'https://images.pexels.com/photos/6476289/pexels-photo-6476289.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_powder', 'Biowell', true, false),
  
  (gen_random_uuid(), 'Collagen Peptides', 'Protein that provides structure to skin, bones, and connective tissues with mixed clinical evidence.', 120.00, 'orange', 'Skin & Joint Health', 
   'https://images.pexels.com/photos/6476511/pexels-photo-6476511.jpeg?auto=compress&cs=tinysrgb&w=300', 'powder_large', 'Biowell', true, false),
  
  (gen_random_uuid(), 'NMN (Nicotinamide Mononucleotide)', 'Precursor to NAD+, being studied for potential anti-aging effects with preliminary evidence.', 175.00, 'orange', 'Longevity', 
   'https://images.pexels.com/photos/6476627/pexels-photo-6476627.jpeg?auto=compress&cs=tinysrgb&w=300', 'capsule_solid', 'Biowell', true, false);

-- Update supplements to include subscription discounts and evidence information
UPDATE supplements
SET 
  subscription_discount_percent = CASE 
    WHEN tier = 'green' THEN 15
    WHEN tier = 'yellow' THEN 12
    WHEN tier = 'orange' THEN 10
    ELSE 0
  END,
  evidence_summary = CASE
    WHEN tier = 'green' THEN 'Strong evidence from multiple randomized controlled trials and meta-analyses support efficacy and safety.'
    WHEN tier = 'yellow' THEN 'Moderate evidence from some clinical trials. More research needed for stronger conclusions.'
    WHEN tier = 'orange' THEN 'Preliminary evidence from small studies or animal research. Human clinical evidence limited.'
    ELSE NULL
  END,
  mechanism = CASE
    WHEN name = 'Creatine Monohydrate' THEN 'Increases phosphocreatine stores in muscles to rapidly regenerate ATP during high-intensity exercise.'
    WHEN name = 'Vitamin D3' THEN 'Functions as a hormone that regulates calcium absorption, immune function, and gene expression.'
    WHEN name = 'Magnesium Glycinate' THEN 'Supports enzyme function, neurotransmitter regulation, and muscle relaxation.'
    WHEN name = 'Whey Protein Isolate' THEN 'Provides essential amino acids with high leucine content to stimulate muscle protein synthesis.'
    WHEN name = 'Omega-3 Fish Oil' THEN 'Incorporates into cell membranes and modulates inflammatory signaling pathways.'
    WHEN name = 'Ashwagandha KSM-66' THEN 'Modulates stress response by regulating cortisol and supporting adrenal function.'
    WHEN name = 'Beta-Alanine' THEN 'Combines with histidine to form carnosine, which buffers acid in muscles during high-intensity exercise.'
    WHEN name = 'L-Theanine' THEN 'Increases alpha brain waves and modulates neurotransmitters including GABA, dopamine and serotonin.'
    WHEN name = 'Rhodiola Rosea' THEN 'Balances stress hormones and may support neurotransmitter activity in the brain.'
    WHEN name = 'Berberine' THEN 'Activates AMPK enzyme which regulates cellular energy and improves insulin sensitivity.'
    ELSE 'Supports optimal wellness through multiple biological pathways.'
  END,
  source_link = CASE
    WHEN tier = 'green' THEN 'https://pubmed.ncbi.nlm.nih.gov/'
    ELSE NULL
  END
WHERE tier IN ('green', 'yellow', 'orange');

-- Add evidence ratings based on tier
UPDATE supplements 
SET evidence_rating = CASE
  WHEN tier = 'green' THEN 4.5
  WHEN tier = 'yellow' THEN 3.5
  WHEN tier = 'orange' THEN 2.5
  ELSE NULL
END
WHERE tier IN ('green', 'yellow', 'orange');

-- Add stock_quantity and bestseller flags
UPDATE supplements
SET 
  stock_quantity = 100,
  is_bestseller = name IN ('Creatine Monohydrate', 'Whey Protein Isolate', 'Vitamin D3')
WHERE is_available = true;