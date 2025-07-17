/*
  # Update Supplement Tier Descriptions and Add Evidence Rating

  1. New Fields
    - Add `evidence_summary` column for detailed evidence description
    - Add `evidence_rating` column with numeric score (1-5)
    - Add `mechanism` column to explain how supplements work
    - Add `source_link` column for research citation

  2. Purpose
    - Provide more comprehensive information about scientific evidence
    - Help users make informed decisions based on evidence quality
    - Support educational content on the supplement detail pages
*/

-- Add columns if they don't exist
ALTER TABLE supplements 
ADD COLUMN IF NOT EXISTS evidence_summary TEXT,
ADD COLUMN IF NOT EXISTS evidence_rating NUMERIC(2,1) CHECK (evidence_rating >= 0 AND evidence_rating <= 5),
ADD COLUMN IF NOT EXISTS mechanism TEXT,
ADD COLUMN IF NOT EXISTS source_link TEXT,
ADD COLUMN IF NOT EXISTS tier TEXT CHECK (tier IN ('green', 'yellow', 'orange', 'red'));

-- Update existing supplements with tier information
UPDATE supplements
SET tier = 
  CASE 
    WHEN LOWER(name) LIKE '%creatine%' OR LOWER(name) LIKE '%vitamin d3%' OR LOWER(name) LIKE '%protein%' THEN 'green'
    WHEN LOWER(name) LIKE '%magnesium%' OR LOWER(name) LIKE '%zinc%' OR LOWER(name) LIKE '%omega%' THEN 'green'
    WHEN LOWER(name) LIKE '%ashwagandha%' OR LOWER(name) LIKE '%rhodiola%' OR LOWER(name) LIKE '%theanine%' THEN 'yellow'
    WHEN LOWER(name) LIKE '%berberine%' OR LOWER(name) LIKE '%b-alanine%' OR LOWER(name) LIKE '%beta-alanine%' THEN 'yellow'
    WHEN LOWER(name) LIKE '%tongkat%' OR LOWER(name) LIKE '%boron%' OR LOWER(name) LIKE '%fenugreek%' THEN 'orange'
    WHEN LOWER(name) LIKE '%cla%' OR LOWER(name) LIKE '%garcinia%' OR LOWER(name) LIKE '%carnitine%' THEN 'orange'
    ELSE 'yellow' 
  END,
evidence_rating = 
  CASE 
    WHEN LOWER(name) LIKE '%creatine%' OR LOWER(name) LIKE '%vitamin d3%' OR LOWER(name) LIKE '%protein%' THEN 4.5
    WHEN LOWER(name) LIKE '%magnesium%' OR LOWER(name) LIKE '%zinc%' OR LOWER(name) LIKE '%omega%' THEN 4.0
    WHEN LOWER(name) LIKE '%ashwagandha%' OR LOWER(name) LIKE '%rhodiola%' OR LOWER(name) LIKE '%theanine%' THEN 3.5
    WHEN LOWER(name) LIKE '%berberine%' OR LOWER(name) LIKE '%b-alanine%' OR LOWER(name) LIKE '%beta-alanine%' THEN 3.0
    WHEN LOWER(name) LIKE '%tongkat%' OR LOWER(name) LIKE '%boron%' OR LOWER(name) LIKE '%fenugreek%' THEN 2.5
    WHEN LOWER(name) LIKE '%cla%' OR LOWER(name) LIKE '%garcinia%' OR LOWER(name) LIKE '%carnitine%' THEN 2.0
    ELSE 3.0 
  END
WHERE tier IS NULL OR evidence_rating IS NULL;

-- Update specific supplements with detailed evidence information
UPDATE supplements 
SET 
  evidence_summary = 'Numerous randomized controlled trials and meta-analyses show creatine supplementation increases intramuscular creatine concentrations, improving high-intensity exercise performance and lean body mass gains when combined with resistance training.',
  mechanism = 'Increases phosphocreatine stores in muscle, enabling rapid ATP regeneration during high-intensity exercise',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33641728/'
WHERE LOWER(name) LIKE '%creatine%' AND evidence_summary IS NULL;

UPDATE supplements 
SET 
  evidence_summary = 'Multiple systematic reviews and meta-analyses demonstrate vitamin D supplementation reduces all-cause mortality, supports bone health, and may benefit immune function, especially in deficient individuals.',
  mechanism = 'Functions as a hormone that regulates calcium absorption, immune function, and gene expression in multiple tissues',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33634357/'
WHERE LOWER(name) LIKE '%vitamin d%' AND evidence_summary IS NULL;

UPDATE supplements 
SET 
  evidence_summary = 'Multiple randomized controlled trials show ashwagandha reduces cortisol and symptoms of stress and anxiety. A study in stressed adults found significant reductions in cortisol and improvements in well-being scores.',
  mechanism = 'Adaptogen that appears to modulate the HPA axis and reduce cortisol production during stress',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33243837/'
WHERE LOWER(name) LIKE '%ashwagandha%' AND evidence_summary IS NULL;

UPDATE supplements 
SET 
  evidence_summary = 'Multiple human trials demonstrate magnesium supplementation improves sleep quality and reduces insomnia severity in deficient individuals. It plays a role in GABA production and regulation of the sleep hormone melatonin.',
  mechanism = 'Regulates neurotransmitters involved in sleep and acts as a natural GABA agonist with calming effects',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33504012/'
WHERE LOWER(name) LIKE '%magnesium%' AND evidence_summary IS NULL;

UPDATE supplements 
SET 
  evidence_summary = 'Several small randomized trials suggest beta-alanine can improve high-intensity exercise performance, particularly in activities lasting 1-4 minutes. It works by increasing muscle carnosine, which buffers lactic acid.',
  mechanism = 'Increases muscle carnosine concentrations, which buffers hydrogen ions during high-intensity exercise',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/31895246/'
WHERE LOWER(name) LIKE '%beta-alanine%' OR LOWER(name) LIKE '%b-alanine%' AND evidence_summary IS NULL;

-- Ensure all supplements have price_aed values based on price column
UPDATE supplements
SET price_aed = price * 3.67
WHERE price_aed IS NULL AND price IS NOT NULL;

-- Create index for efficient tier filtering
CREATE INDEX IF NOT EXISTS idx_supplements_tier ON supplements(tier);

-- Create index for efficient search by name
CREATE INDEX IF NOT EXISTS idx_supplements_name ON supplements(name);