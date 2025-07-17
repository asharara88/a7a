/*
  # Complete Supplement Tiers Implementation

  1. Add tiers to all supplements
    - Add green/yellow/orange tiers based on evidence levels
    - Update price_aed for all supplements
    - Add subscription discounts based on tier
  
  2. Update existing supplements
    - Fix missing descriptions
    - Standardize evidence tier terms
    - Add price information for missing prices
*/

-- Update tiers and prices for existing supplements
UPDATE supplements 
SET 
  tier = CASE 
    WHEN LOWER(name) LIKE '%creatine%' OR LOWER(name) LIKE '%vitamin d%' OR LOWER(name) LIKE '%protein%' OR 
         LOWER(name) LIKE '%whey%' OR LOWER(name) LIKE '%caffeine%' OR LOWER(category) = 'muscle building' THEN 'green'
    WHEN LOWER(name) LIKE '%ashwagandha%' OR LOWER(name) LIKE '%rhodiola%' OR LOWER(name) LIKE '%magnesium%' OR
         LOWER(name) LIKE '%beta-alanine%' OR LOWER(name) LIKE '%berberine%' OR LOWER(name) LIKE '%theanine%' OR
         LOWER(name) LIKE '%zinc%' OR LOWER(name) LIKE '%electrolytes%' OR LOWER(name) LIKE '%b-complex%' OR
         LOWER(name) LIKE '%glutamine%' OR LOWER(category) = 'cognitive' OR LOWER(category) = 'sleep' THEN 'yellow'
    ELSE 'orange'
  END,
  subscription_discount_percent = CASE 
    WHEN LOWER(name) LIKE '%creatine%' OR LOWER(name) LIKE '%vitamin d%' OR LOWER(name) LIKE '%protein%' OR 
         LOWER(name) LIKE '%whey%' OR LOWER(name) LIKE '%caffeine%' OR LOWER(category) = 'muscle building' THEN 15
    WHEN LOWER(name) LIKE '%ashwagandha%' OR LOWER(name) LIKE '%rhodiola%' OR LOWER(name) LIKE '%magnesium%' OR
         LOWER(name) LIKE '%beta-alanine%' OR LOWER(name) LIKE '%berberine%' OR LOWER(name) LIKE '%theanine%' OR
         LOWER(name) LIKE '%zinc%' OR LOWER(name) LIKE '%electrolytes%' OR LOWER(name) LIKE '%b-complex%' OR
         LOWER(name) LIKE '%glutamine%' OR LOWER(category) = 'cognitive' OR LOWER(category) = 'sleep' THEN 12
    ELSE 10
  END,
  price_aed = CASE
    WHEN price_aed IS NULL OR price_aed = 0 THEN 
      CASE 
        WHEN LOWER(name) LIKE '%creatine%' THEN 85.00
        WHEN LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' THEN 180.00
        WHEN LOWER(name) LIKE '%vitamin d%' THEN 40.00
        WHEN LOWER(name) LIKE '%magnesium%' THEN 65.00
        WHEN LOWER(name) LIKE '%ashwagandha%' THEN 95.00
        WHEN LOWER(name) LIKE '%rhodiola%' THEN 95.00
        WHEN LOWER(name) LIKE '%berberine%' THEN 110.00
        WHEN LOWER(name) LIKE '%beta-alanine%' THEN 95.00
        WHEN LOWER(name) LIKE '%glutamine%' THEN 85.00
        WHEN LOWER(name) LIKE '%digestive enzyme%' THEN 85.00
        WHEN LOWER(name) LIKE '%tongkat%' THEN 135.00
        WHEN LOWER(name) LIKE '%bcaa%' THEN 120.00
        WHEN LOWER(name) LIKE '%alpha-lipoic%' OR LOWER(name) LIKE '%ala%' THEN 80.00
        ELSE 99.00  -- default price if no match
      END
    ELSE price_aed
  END,
  use_case = CASE
    WHEN use_case IS NULL OR use_case = '' THEN 
      CASE 
        WHEN LOWER(name) LIKE '%creatine%' THEN 'Muscle strength & power'
        WHEN LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' THEN 'Muscle growth & recovery'
        WHEN LOWER(name) LIKE '%vitamin d%' THEN 'Immune & bone health'
        WHEN LOWER(name) LIKE '%magnesium%' THEN 'Sleep & recovery'
        WHEN LOWER(name) LIKE '%ashwagandha%' THEN 'Stress & anxiety'
        WHEN LOWER(name) LIKE '%rhodiola%' THEN 'Energy & focus'
        WHEN LOWER(name) LIKE '%berberine%' THEN 'Blood sugar control'
        WHEN LOWER(name) LIKE '%beta-alanine%' THEN 'Endurance & performance'
        WHEN LOWER(name) LIKE '%glutamine%' THEN 'Gut health & recovery'
        WHEN LOWER(name) LIKE '%digestive enzyme%' THEN 'Digestion & nutrient absorption'
        WHEN LOWER(name) LIKE '%tongkat%' THEN 'Testosterone & vitality'
        WHEN LOWER(name) LIKE '%bcaa%' THEN 'Muscle recovery'
        WHEN LOWER(name) LIKE '%alpha-lipoic%' OR LOWER(name) LIKE '%ala%' THEN 'Antioxidant & metabolic support'
        ELSE category -- default to category if no match
      END
    ELSE use_case
  END
WHERE is_available = true;

-- Update evidence summaries for key supplements
UPDATE supplements
SET evidence_summary = CASE
  WHEN LOWER(name) LIKE '%creatine%' THEN 'Extensive research shows creatine increases strength, power output, and muscle mass when combined with resistance training. Meta-analyses demonstrate an average of 8-10% increase in strength and 1-2kg additional lean mass over placebo.'
  
  WHEN LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' THEN 'Multiple systematic reviews confirm that protein supplementation enhances muscle protein synthesis and recovery after exercise. Research indicates 1.6-2.2g/kg of bodyweight daily is optimal for muscle growth.'
  
  WHEN LOWER(name) LIKE '%vitamin d%' THEN 'Over 100 studies link vitamin D status to immune function, bone health, and mood regulation. RCTs show supplementation reduces risk of acute respiratory infections by 12-70% in deficient individuals.'
  
  WHEN LOWER(name) LIKE '%magnesium%' THEN 'Clinical studies show magnesium supplementation improves sleep quality metrics including sleep efficiency and total sleep time. It also reduces muscle cramps and supports recovery from exercise.'
  
  WHEN LOWER(name) LIKE '%ashwagandha%' THEN 'Multiple RCTs demonstrate ashwagandha reduces cortisol levels (by ~27% in some studies) and perceived stress/anxiety scores. Several studies also show modest increases in testosterone and improvements in sleep quality.'
  
  WHEN LOWER(name) LIKE '%rhodiola%' THEN 'Clinical trials show Rhodiola reduces mental fatigue and improves cognitive performance during stress and sleep deprivation. Evidence suggests it helps the body adapt to physical and mental stressors.'
  
  WHEN LOWER(name) LIKE '%berberine%' THEN 'Multiple clinical trials show berberine lowers blood glucose levels with efficacy similar to metformin. Studies demonstrate improvements in insulin sensitivity, lipid profiles, and modest weight loss.'
  
  WHEN LOWER(name) LIKE '%beta-alanine%' THEN 'Meta-analyses show beta-alanine improves exercise performance in high-intensity activities lasting 1-4 minutes by increasing muscle carnosine levels and buffering lactic acid.'
  
  ELSE evidence_summary -- Keep existing evidence summary if available
END
WHERE evidence_summary IS NULL AND (
  LOWER(name) LIKE '%creatine%' OR
  LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' OR
  LOWER(name) LIKE '%vitamin d%' OR
  LOWER(name) LIKE '%magnesium%' OR
  LOWER(name) LIKE '%ashwagandha%' OR
  LOWER(name) LIKE '%rhodiola%' OR
  LOWER(name) LIKE '%berberine%' OR
  LOWER(name) LIKE '%beta-alanine%'
);

-- Add mechanism explanations for popular supplements
UPDATE supplements
SET mechanism = CASE
  WHEN LOWER(name) LIKE '%creatine%' THEN 'Increases phosphocreatine stores in muscle cells, allowing for faster ATP regeneration during high-intensity exercise.'
  
  WHEN LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' THEN 'Provides essential amino acids (particularly leucine) that trigger muscle protein synthesis via the mTOR pathway.'
  
  WHEN LOWER(name) LIKE '%vitamin d%' THEN 'Functions as a hormone that regulates calcium absorption, immune cell function, and gene expression in hundreds of pathways.'
  
  WHEN LOWER(name) LIKE '%magnesium%' THEN 'Acts as a cofactor in over 300 enzymatic reactions including those involved in GABA production, muscle relaxation, and energy metabolism.'
  
  WHEN LOWER(name) LIKE '%ashwagandha%' THEN 'Adaptogenic effects via modulation of the HPA axis, reducing cortisol and balancing stress hormone signaling.'
  
  WHEN LOWER(name) LIKE '%rhodiola%' THEN 'Contains bioactive compounds (rosavins, salidroside) that modulate neurotransmitter balance and stress hormone response.'
  
  WHEN LOWER(name) LIKE '%berberine%' THEN 'Activates AMP-activated protein kinase (AMPK) - the same pathway targeted by metformin, improving insulin sensitivity and glucose uptake.'
  
  WHEN LOWER(name) LIKE '%beta-alanine%' THEN 'Combines with histidine to form carnosine, a dipeptide that buffers hydrogen ions in muscle tissue, delaying fatigue during high-intensity exercise.'
  
  ELSE mechanism -- Keep existing mechanism if available
END
WHERE mechanism IS NULL AND (
  LOWER(name) LIKE '%creatine%' OR
  LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' OR
  LOWER(name) LIKE '%vitamin d%' OR
  LOWER(name) LIKE '%magnesium%' OR
  LOWER(name) LIKE '%ashwagandha%' OR
  LOWER(name) LIKE '%rhodiola%' OR
  LOWER(name) LIKE '%berberine%' OR
  LOWER(name) LIKE '%beta-alanine%'
);

-- Update source links for key supplements
UPDATE supplements
SET source_link = CASE
  WHEN LOWER(name) LIKE '%creatine%' THEN 'https://pubmed.ncbi.nlm.nih.gov/14636102/'
  WHEN LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' THEN 'https://pubmed.ncbi.nlm.nih.gov/28698222/'
  WHEN LOWER(name) LIKE '%vitamin d%' THEN 'https://pubmed.ncbi.nlm.nih.gov/29025122/'
  WHEN LOWER(name) LIKE '%magnesium%' THEN 'https://pubmed.ncbi.nlm.nih.gov/22759926/'
  WHEN LOWER(name) LIKE '%ashwagandha%' THEN 'https://pubmed.ncbi.nlm.nih.gov/33113270/'
  WHEN LOWER(name) LIKE '%rhodiola%' THEN 'https://pubmed.ncbi.nlm.nih.gov/30506340/'
  WHEN LOWER(name) LIKE '%berberine%' THEN 'https://pubmed.ncbi.nlm.nih.gov/33478620/'
  WHEN LOWER(name) LIKE '%beta-alanine%' THEN 'https://pubmed.ncbi.nlm.nih.gov/29349935/'
  ELSE source_link
END
WHERE source_link IS NULL AND (
  LOWER(name) LIKE '%creatine%' OR
  LOWER(name) LIKE '%protein%' OR LOWER(name) LIKE '%whey%' OR
  LOWER(name) LIKE '%vitamin d%' OR
  LOWER(name) LIKE '%magnesium%' OR
  LOWER(name) LIKE '%ashwagandha%' OR
  LOWER(name) LIKE '%rhodiola%' OR
  LOWER(name) LIKE '%berberine%' OR
  LOWER(name) LIKE '%beta-alanine%'
);

-- Make sure the stock_quantity and is_available fields are set correctly
UPDATE supplements
SET 
  stock_quantity = 100,
  is_available = true
WHERE stock_quantity IS NULL OR stock_quantity < 1;