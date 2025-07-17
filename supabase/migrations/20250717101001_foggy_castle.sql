/*
  # Add Evidence Ratings and Sources to Supplements

  1. New Columns
    - `evidence_rating`: Numeric score (1-5) based on scientific evidence strength
    - `source_link`: URL to scientific study or review
    - `mechanism`: How the supplement works in the body
    - `evidence_summary`: Detailed breakdown of the research
  
  2. Indexes
    - Added index on `tier` for faster filtering
    - Added index on `evidence_rating` for ranking
*/

-- Add new columns to supplements table
ALTER TABLE supplements 
ADD COLUMN IF NOT EXISTS evidence_rating numeric(3,1),
ADD COLUMN IF NOT EXISTS source_link text,
ADD COLUMN IF NOT EXISTS mechanism text,
ADD COLUMN IF NOT EXISTS evidence_summary text;

-- Create index on tier and evidence_rating for faster filtering
CREATE INDEX IF NOT EXISTS idx_supplements_tier ON supplements(tier);
CREATE INDEX IF NOT EXISTS idx_supplements_evidence_rating ON supplements(evidence_rating);

-- Update supplements with evidence information
UPDATE supplements
SET 
  evidence_rating = 4.8,
  mechanism = 'Increases intramuscular phosphocreatine for rapid ATP regeneration, enhancing strength and power output during high-intensity exercise.',
  evidence_summary = 'Multiple meta-analyses confirm 5g daily increases strength, power, and muscle mass. Effective for both men and women across age groups.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/30299564/'
WHERE name ILIKE '%creatine%' AND tier = 'green';

UPDATE supplements
SET 
  evidence_rating = 4.7,
  mechanism = 'Provides essential fat-soluble vitamin D3 which regulates calcium absorption, immune function, and gene expression.',
  evidence_summary = 'Systematic reviews show supplementation reduces all-cause mortality and supports bone, immune, and cardiovascular health when levels are insufficient.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/28768407/'
WHERE name ILIKE '%vitamin d%' AND tier = 'green';

UPDATE supplements
SET 
  evidence_rating = 3.8,
  mechanism = 'Provides highly bioavailable magnesium that supports neural function, muscle relaxation, and enzyme reactions.',
  evidence_summary = 'Clinical trials demonstrate benefits for sleep onset, quality, and stress reduction. More effective than other forms for many outcomes.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33178605/'
WHERE name ILIKE '%magnesium%' AND tier = 'yellow';

UPDATE supplements
SET 
  evidence_rating = 3.5,
  mechanism = 'Contains active compounds that modulate cortisol and support stress adaptation pathways.',
  evidence_summary = 'Multiple human RCTs show stress reduction, improved sleep quality, and modest testosterone increases in men. Needs more long-term safety data.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/35013455/'
WHERE name ILIKE '%ashwagandha%' AND tier = 'yellow';

UPDATE supplements
SET 
  evidence_rating = 3.9,
  mechanism = 'Increases carnosine levels in muscles, buffering acid buildup during high-intensity exercise.',
  evidence_summary = 'Meta-analyses confirm improved performance in high-intensity exercise lasting 1-4 minutes. Causes harmless tingling (paresthesia) in some users.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/33201722/'
WHERE name ILIKE '%beta-alanine%' AND tier = 'yellow';

UPDATE supplements
SET 
  evidence_rating = 3.7,
  mechanism = 'Activates AMPK, an enzyme that regulates metabolism and cellular energy.',
  evidence_summary = 'Multiple clinical trials show comparable efficacy to metformin for blood glucose management. May also improve lipid profiles and gut microbiome.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/32119313/'
WHERE name ILIKE '%berberine%' AND tier = 'yellow';

UPDATE supplements
SET 
  evidence_rating = 2.8,
  mechanism = 'Contains eurypeptides that may increase free testosterone by reducing sex hormone binding globulin (SHBG).',
  evidence_summary = 'Limited clinical evidence from smaller trials shows modest benefits for libido and free testosterone. More research needed for long-term efficacy and safety.',
  source_link = 'https://pubmed.ncbi.nlm.nih.gov/30421546/'
WHERE name ILIKE '%tongkat ali%' AND tier = 'orange';

-- Default tier to yellow for any null values
UPDATE supplements
SET tier = 'yellow' 
WHERE tier IS NULL;

-- Default evidence_rating based on tier
UPDATE supplements
SET evidence_rating = 
  CASE 
    WHEN tier = 'green' THEN 4.5
    WHEN tier = 'yellow' THEN 3.5
    WHEN tier = 'orange' THEN 2.5
    ELSE 1.5
  END
WHERE evidence_rating IS NULL;