/*
  # Categorize Supplements by Evidence Tiers

  1. New Fields
    - Add evidence_level field for all supplements
    - Add tier field if not exists
    - Categorize supplements into green, yellow, orange tiers

  2. Data Update
    - Update existing supplements with evidence tiers
    - Add evidence summaries and source links
*/

-- First, ensure tier field exists
ALTER TABLE supplements 
  ADD COLUMN IF NOT EXISTS tier TEXT,
  ADD COLUMN IF NOT EXISTS evidence_summary TEXT,
  ADD COLUMN IF NOT EXISTS source_link TEXT,
  ADD COLUMN IF NOT EXISTS mechanism TEXT,
  ADD COLUMN IF NOT EXISTS evidence_rating INTEGER;

-- Create index on tier for faster filtering
CREATE INDEX IF NOT EXISTS idx_supplements_tier ON supplements(tier);

-- Set evidence tiers for all supplements
UPDATE supplements SET 
  tier = 'green',
  evidence_rating = 5,
  evidence_summary = 'Multiple large-scale meta-analyses confirm significant increases in strength, power output, and lean mass when combined with resistance training.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/30299458/',
  mechanism = 'Increases intramuscular phosphocreatine for rapid ATP regeneration'
WHERE 
  LOWER(name) LIKE '%creatine%' OR
  LOWER(description) LIKE '%creatine%';

UPDATE supplements SET 
  tier = 'green',
  evidence_rating = 5, 
  evidence_summary = 'Strong evidence from randomized controlled trials showing clear effects on blood 25(OH)D levels and significant impact on bone health.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/30675873/',
  mechanism = 'Regulates calcium and phosphate absorption, immune function, and bone metabolism'
WHERE 
  LOWER(name) LIKE '%vitamin d%' OR
  LOWER(description) LIKE '%vitamin d%';

UPDATE supplements SET 
  tier = 'green',
  evidence_rating = 4,
  evidence_summary = 'Multiple meta-analyses show clear efficacy for protein supplements in supporting muscle protein synthesis and recovery.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/29514689/',
  mechanism = 'Provides essential amino acids for muscle protein synthesis'
WHERE 
  LOWER(name) LIKE '%protein%' OR
  LOWER(name) LIKE '%whey%' OR
  LOWER(description) LIKE '%protein suppl%';

UPDATE supplements SET 
  tier = 'yellow',
  evidence_rating = 3,
  evidence_summary = 'Moderate evidence from several clinical trials showing stress reduction and modest testosterone support in some populations.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/31517876/',
  mechanism = 'Adaptogenic herb that modulates cortisol and may support testosterone production'
WHERE 
  LOWER(name) LIKE '%ashwagandha%' OR
  LOWER(description) LIKE '%ashwagandha%';

UPDATE supplements SET 
  tier = 'yellow',
  evidence_rating = 3,
  evidence_summary = 'Moderate evidence for delaying fatigue in high-intensity exercise lasting 1-4 minutes. Meta-analyses show consistent but modest effects.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/30349271/',
  mechanism = 'Increases muscle carnosine levels, which buffers lactic acid during high-intensity exercise'
WHERE 
  LOWER(name) LIKE '%beta-alanine%' OR
  LOWER(name) LIKE '%β-alanine%';

UPDATE supplements SET 
  tier = 'yellow',
  evidence_rating = 3,
  evidence_summary = 'Moderate evidence for cognitive enhancement and neuroprotection from several clinical trials.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/28758234/',
  mechanism = 'Contains hericenones and erinacines that may stimulate nerve growth factor (NGF) production'
WHERE 
  LOWER(name) LIKE '%lion''s mane%' OR
  LOWER(description) LIKE '%lion''s mane%';

UPDATE supplements SET 
  tier = 'yellow',
  evidence_rating = 3,
  evidence_summary = 'Moderate evidence for glucose metabolism support from multiple trials, comparable to metformin in some studies.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/34245342/',
  mechanism = 'Activates AMP-activated protein kinase (AMPK) to improve insulin sensitivity and reduce glucose production'
WHERE 
  LOWER(name) LIKE '%berberine%';

UPDATE supplements SET 
  tier = 'yellow',
  evidence_rating = 3,
  evidence_summary = 'Moderate evidence for reducing perception of effort during exercise and supporting stress resilience.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/29125563/',
  mechanism = 'May stabilize stress-responsive hormone production and improve cellular energy metabolism'
WHERE 
  LOWER(name) LIKE '%rhodiola%';

UPDATE supplements SET 
  tier = 'orange',
  evidence_rating = 2,
  evidence_summary = 'Limited evidence primarily from small trials and traditional use. Some evidence for hormonal support in specific populations.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/25254005/',
  mechanism = 'May increase free testosterone by inhibiting sex hormone-binding globulin'
WHERE 
  LOWER(name) LIKE '%tongkat ali%' OR
  LOWER(description) LIKE '%tongkat ali%' OR
  LOWER(name) LIKE '%eurycoma%';

-- Set default tier for remaining supplements
UPDATE supplements SET 
  tier = 'orange',
  evidence_rating = 1
WHERE 
  tier IS NULL;

-- Add constraint for tier values if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'supplements_tier_check'
  ) THEN
    ALTER TABLE supplements 
    ADD CONSTRAINT supplements_tier_check 
    CHECK (tier = ANY (ARRAY['green', 'yellow', 'orange', 'red']));
  END IF;
END $$;

-- Add constraint for evidence rating if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'supplements_evidence_rating_check'
  ) THEN
    ALTER TABLE supplements 
    ADD CONSTRAINT supplements_evidence_rating_check 
    CHECK (evidence_rating BETWEEN 1 AND 5);
  END IF;
END $$;