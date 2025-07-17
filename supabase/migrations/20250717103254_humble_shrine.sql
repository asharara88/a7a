/*
  # Create Supplement Stacks for Key Categories

  1. New Stacks
    - Create stacks for various health categories
    - Include detailed stack information and components
    - Set appropriate pricing and descriptions
*/

-- Create supplement stacks for different categories
INSERT INTO supplement_stacks (category, name, total_price, components, goals) VALUES
-- Strength & Hypertrophy Stack
('Strength', 'Strength & Hypertrophy Stack', 219.99, '[
  {"id": "d8d78df2-9533-4773-bc5e-447d067beb9a", "name": "Creatine Monohydrate", "dosage": "5g daily", "timing": "Any time", "price": 85.00},
  {"id": "cba68a6a-4f83-47e8-b602-681bb5c18f9c", "name": "Whey Protein", "dosage": "25-30g", "timing": "Post-workout", "price": 85.00},
  {"id": "6fb63925-366e-477c-a323-b0aed2b1981b", "name": "Beta-Alanine", "dosage": "3-5g daily", "timing": "Pre-workout", "price": 49.99}
]', ARRAY['Muscle building', 'Strength gain', 'Performance']),

-- Endurance Stack
('Endurance', 'Endurance Performance Stack', 199.99, '[
  {"id": "c3f55641-bf95-4526-8f37-78a51a4a32b8", "name": "Beetroot Nitrate", "dosage": "500mg", "timing": "60-90 min pre-workout", "price": 59.99},
  {"id": "4c7cca02-2629-4db5-a03b-d6ad7a564128", "name": "Caffeine", "dosage": "200mg", "timing": "30-60 min pre-workout", "price": 39.99},
  {"id": "1ede43cd-257b-413f-8e30-0f40499de406", "name": "Beta-Alanine", "dosage": "3-5g daily", "timing": "With carbohydrate", "price": 49.99},
  {"id": "39cba2f9-9f79-4e10-8f24-8772b17267e4", "name": "Electrolytes", "dosage": "As directed", "timing": "During/after workout", "price": 45.99}
]', ARRAY['Endurance', 'Stamina', 'Recovery']),

-- Sleep Stack
('Sleep', 'Sleep Optimization Stack', 179.99, '[
  {"id": "84d8651b-7d1c-46eb-9672-22c5dc769b36", "name": "Magnesium Glycinate", "dosage": "300-400mg", "timing": "30-60 min before bed", "price": 65.00},
  {"id": "1b980ef5-f81e-45d9-884e-f268c6546ad0", "name": "Valerian Root", "dosage": "300-600mg", "timing": "60 min before bed", "price": 39.99},
  {"id": "59d80403-b7de-4841-8b48-8d8b9414b152", "name": "L-Theanine", "dosage": "200mg", "timing": "30-60 min before bed", "price": 45.00},
  {"id": "4e5634ff-8cd4-4dd7-bef3-a0e681f46b26", "name": "Melatonin", "dosage": "0.3-1mg", "timing": "30 min before bed", "price": 30.00}
]', ARRAY['Sleep quality', 'Sleep latency', 'Recovery']),

-- Longevity Stack
('Longevity', 'Longevity & Healthy Aging Stack', 249.99, '[
  {"id": "b3841739-66dc-45ed-ae8b-9d00883a4239", "name": "Vitamin D3", "dosage": "2000-5000 IU", "timing": "With fat-containing meal", "price": 40.00},
  {"id": "7b661d5e-4076-443d-9f57-0c2cad74695a", "name": "CoQ10", "dosage": "100-200mg", "timing": "With fat-containing meal", "price": 65.00},
  {"id": "d2158dce-d606-40bd-9f78-989da529d023", "name": "Resveratrol", "dosage": "100-500mg", "timing": "Morning", "price": 79.99},
  {"id": "c78b6024-b9c0-47d9-b988-15ca7b34638b", "name": "Curcumin", "dosage": "500-1000mg", "timing": "With fat and black pepper", "price": 65.00}
]', ARRAY['Aging', 'Cellular health', 'Antioxidant support']),

-- Gut Health Stack
('Gut Health', 'Gut Health & Microbiome Stack', 189.99, '[
  {"id": "f6e55a06-b4b1-427b-a985-5ef464601a40", "name": "Probiotics", "dosage": "10-30 billion CFU", "timing": "With or without food", "price": 59.99},
  {"id": "225f22c1-bf34-41ce-80e7-a7aef154f24a", "name": "Prebiotic Fiber", "dosage": "5-10g", "timing": "With water", "price": 45.00},
  {"id": "74a8a03a-5522-4776-bbeb-15e2f20f53ad", "name": "L-Glutamine", "dosage": "5g", "timing": "Between meals", "price": 40.00},
  {"id": "7aa94f5e-87be-4a35-8a6c-81bbd1970f87", "name": "Digestive Enzymes", "dosage": "1-2 capsules", "timing": "With meals", "price": 45.00}
]', ARRAY['Gut health', 'Digestion', 'Microbiome']),

-- Male Fertility Stack
('Fertility', 'Male Fertility Support Stack', 229.99, '[
  {"id": "14be756a-1a54-445b-8d7a-a2a89bfb2f5c", "name": "Zinc & Selenium", "dosage": "15-30mg / 100-200mcg", "timing": "With food", "price": 49.99},
  {"id": "8e4a259b-2a0d-4022-b395-18f026715aad", "name": "CoQ10", "dosage": "200-300mg", "timing": "With fat-containing meal", "price": 65.00},
  {"id": "ad011523-8efa-4fd9-baba-3220d875294a", "name": "L-Carnitine", "dosage": "1-3g", "timing": "With meals", "price": 55.00},
  {"id": "428fa76b-9a85-433a-bc33-7ab489229ed4", "name": "Ashwagandha", "dosage": "300-600mg", "timing": "Morning and evening", "price": 59.99}
]', ARRAY['Fertility', 'Hormonal health', 'Sperm quality']),

-- Female Fertility Stack
('Fertility', 'Female Fertility Support Stack', 239.99, '[
  {"id": "9a5bd5ab-a46b-4573-8db4-3b5220699938", "name": "Folate", "dosage": "400-800mcg", "timing": "With food", "price": 39.99},
  {"id": "5cfac377-e9a9-4ddf-8c79-0faae7d65428", "name": "Vitamin D", "dosage": "2000-4000 IU", "timing": "With fat-containing meal", "price": 40.00},
  {"id": "cdf4f799-8d49-4dad-896b-9a6b08c999dc", "name": "Myo-Inositol", "dosage": "2g, twice daily", "timing": "Morning and evening", "price": 89.99},
  {"id": "65a7f597-763c-4220-8477-7d912b1ab3d2", "name": "CoQ10", "dosage": "200-300mg", "timing": "With fat-containing meal", "price": 65.00}
]', ARRAY['Fertility', 'Hormonal balance', 'Egg quality']);