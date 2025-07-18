# Biowell AI - Personal Digital Health Coach

**Biowell** is a digital wellness platform that combines personalized coaching, smart data integration, and precision supplementation to help users optimize their health. It integrates wearable data, user input, and evidence-based recommendations to deliver real-time, goal-driven guidance.

[![Netlify Status](https://api.netlify.com/api/v1/badges/5239b3f1-f78c-4857-ad9d-ad1bb351d322/deploy-status)](https://app.netlify.com/projects/biowellai/deploys)

---

## 📲 Core Features

- **Home Dashboard**  
  Central hub displaying real-time wellness metrics from connected devices and user logs.

- **MyCoach (AI Coach)**  
  Personalized coaching via chat and voice (OpenAI + ElevenLabs), responding to user data, habits, and preferences.

- **Supplement Store**  
  Curated stacks by use-case (muscle, sleep, gut, fertility, etc.), with dynamic pricing and subscription discounts.  
  **Premium users** receive an automatic **15% discount** on all supplement purchases.

- **Fertility Mode** 🧬  
  Couples-based module integrating with femtech platforms (Flo, Clue, Apple Cycle Tracking). Supports:
  - Ovulation prediction & fertility window tracking  
  - Female cycle data syncing  
  - Couple-based supplement & lifestyle recommendations  
  - Frontend UX for joint health goals and tracking

- **Metabolic Mode (CGM Integration)** 🔬  
  Continuous glucose monitoring (CGM) support for real-time metabolic health tracking. Includes:
  - CGM integrations (FreeStyle Libre, Dexcom planned)  
  - Blood sugar mapping, insulin sensitivity insights  
  - AI-powered fasting & nutrition guidance  
  - Metabolic scoring dashboard

- **Premium Nutrition Module** 🍽️  
  Exclusive to premium users:
  - **Personalized meal plans and recipes** tailored from wearable data and quiz inputs  
  - **Camera-based macronutrient tracker** (real-time food recognition and macro breakdown)  
  - Full access to dietary pattern scoring and nutrition trends

- **Data Integration**  
  Seamless sync with Apple Watch, Oura, Garmin, smart scales, CGMs, and menstrual trackers via secure APIs.

- **Recovery Mode**  
  Supports dopamine balance, sleep repair, emotional regulation, and habit rewiring.

- **Muscle Recovery Visualization** 💪  
  Real-time muscle group recovery status with interactive 3D-style body diagrams.

---

## 🧠 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion
  - Premium UI modules for nutrition, food camera, and supplement discounts  
- **Backend:** Supabase (PostgreSQL + Edge Functions)  
  - User role logic (Premium vs Standard)  
  - Nutrition scoring, CGM ingestion, camera uploads  
- **AI:** OpenAI (prompt routing), ElevenLabs (voice), custom food classifier (planned)  
- **Integrations:**  
  - Wearables: Apple, Oura, Garmin  
  - Femtech: Flo, Clue, Apple Cycle  
  - CGM: FreeStyle Libre, Dexcom (planned)  
  - Camera-based food logging: in development  
- **Deployment:** Netlify (frontend), Supabase (backend)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and CLI (`npm install -g supabase`)
- OpenAI API key (required for AI coach)
- ElevenLabs API key (optional for voice features)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/asharara88/a7a.git
   cd a7a
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_OPENAI_API_KEY=your-openai-api-key
   VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
   ```

4. **Database Setup:**

   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```

5. **Deploy Edge Functions:**

   ```bash
   supabase functions deploy openai-proxy
   supabase functions deploy elevenlabs-proxy
   ```

6. **Set API Keys as Secrets:**

   ```bash
   supabase secrets set OPENAI_API_KEY=your-openai-api-key
   supabase secrets set ELEVENLABS_API_KEY=your-elevenlabs-api-key
   ```

7. **Start Development Server:**

   ```bash
   npm run dev
   ```

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── fitness/        # Fitness tracking & muscle visualization
│   ├── layout/         # Navigation, headers, layout
│   ├── nutrition/      # Meal planning & food tracking
│   ├── supplements/    # Product cards, store, recommendations
│   └── ui/            # Reusable UI components
├── pages/
│   ├── auth/          # Login, signup, onboarding
│   ├── coach/         # AI coach interface
│   ├── dashboard/     # Health dashboard
│   └── store/         # Supplement marketplace
├── utils/             # Helper functions
├── hooks/             # Custom React hooks
├── contexts/          # React context providers
└── types/             # TypeScript definitions
├── components/
│   ├── auth/           # Authentication components
│   ├── fitness/        # Fitness tracking & muscle visualization
│   ├── layout/         # Navigation, headers, layout
│   ├── nutrition/      # Meal planning & food tracking
│   ├── supplements/    # Product cards, store, recommendations
│   └── ui/            # Reusable UI components
├── pages/
│   ├── auth/          # Login, signup, onboarding
│   ├── coach/         # AI coach interface
│   ├── dashboard/     # Health dashboard
│   └── store/         # Supplement marketplace
├── utils/             # Helper functions
├── hooks/             # Custom React hooks
├── contexts/          # React context providers
└── types/             # TypeScript definitions

supabase/
├── functions/         # Edge Functions (OpenAI, ElevenLabs)
├── migrations/        # Database schema migrations
└── config.toml        # Supabase configuration
```

---

## 🔧 API Configuration

### OpenAI Setup (Required)

1. **Get OpenAI API key** from [OpenAI Platform](https://platform.openai.com/api-keys)

2. **Set as Supabase secret:**

   ```bash
   supabase secrets set OPENAI_API_KEY=sk-your-actual-key
   ```

3. **Deploy the Edge Function:**

   ```bash
   supabase functions deploy openai-proxy
   ```

4. **Verify setup:**

   ```bash
   supabase secrets list
   ```

### ElevenLabs Setup (Optional)

1. **Get ElevenLabs API key** from [ElevenLabs](https://elevenlabs.io/)

2. **Set as Supabase secret:**

   ```bash
   supabase secrets set ELEVENLABS_API_KEY=your-elevenlabs-key
   ```

3. **Deploy the Edge Function:**

   ```bash
   supabase functions deploy elevenlabs-proxy
   ```

---

## 🧪 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing & Quality
npm run test            # Run unit tests
npm run test:coverage   # Test coverage report
npm run lint            # Run ESLint
npm run type-check      # TypeScript checking

# Database
supabase start          # Start local Supabase
supabase db reset       # Reset local database
supabase migration new  # Create new migration

# Deployment
npm run deploy          # Deploy to Netlify
```

---

## 🚀 Deployment

### Netlify Deployment

1. **Build Configuration** (already configured in `netlify.toml`):

   ```toml
   [build]
   command = "npm run build"
   publish = "dist"
   
   [build.environment]
   NODE_VERSION = "18"
   ```

2. **Environment Variables** (set in Netlify dashboard):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY` (optional for local dev)

3. **Deploy:**

   ```bash
   npm run build:prod    # Production build
   npm run deploy        # Deploy to Netlify
   ```

---

## 🔍 Troubleshooting

### Common Issues

**"Failed to fetch" Error:**

- Check environment variables are set
- Verify Edge Functions are deployed
- Ensure OpenAI API key has sufficient credits

**Import Resolution Errors:**

- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart dev server: `npm run dev`

**Build Failures:**

- Check TypeScript errors: `npm run type-check`
- Verify all dependencies: `npm install`

### Debug Commands

```bash
# Check environment
echo $VITE_SUPABASE_URL

# Test Edge Function
curl -X POST "https://your-project.supabase.co/functions/v1/openai-proxy" \
  -H "Authorization: Bearer your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'

# View logs
supabase functions logs openai-proxy
```

---

## 🎯 Roadmap

### Q1 2025

- ✅ Core wellness dashboard
- ✅ AI coach with voice integration
- ✅ Supplement recommendations
- ✅ Muscle recovery visualization

### Q2 2025

- 🔄 CGM integration (FreeStyle Libre)
- 🔄 Camera-based nutrition tracking
- 🔄 Fertility mode enhancements
- 🔄 Premium subscription tiers

### Q3 2025

- 📋 Advanced wearable integrations
- 📋 Personalized meal planning
- 📋 Community features
- 📋 Healthcare provider portal

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## ⚠️ Disclaimer

Biowell AI does not provide medical diagnosis or treatment. The AI coach offers general wellness guidance based on the information you share. Always consult a qualified healthcare professional for medical concerns.
