# Biowell AI - Precision Wellness Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/5239b3f1-f78c-4857-ad9d-ad1bb351d322/deploy-status)](https://app.netlify.com/projects/biowellai/deploys)

**Biowell** is a digital wellness platform that combines personalized coaching, smart data integration, and precision supplementation to help users optimize their health. It integrates wearable data, user input, and evidence-based recommendations to deliver real-time, goal-driven guidance.

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

---

## 🧠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion  
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

## 🧩 Folder Structure

```
biowell-ai/
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── onboarding/       # User onboarding flow
│   │   ├── ui/               # Reusable UI components
│   │   ├── chat/             # AI Coach chat interface
│   │   ├── dashboard/        # Home dashboard widgets
│   │   ├── supplements/      # Supplement store components
│   │   ├── fertility/        # Fertility mode components (planned)
│   │   ├── metabolic/        # CGM & metabolic tracking (planned)
│   │   └── nutrition/        # Premium nutrition module (planned)
│   ├── pages/
│   │   ├── auth/             # Authentication pages
│   │   ├── HomePage.tsx      # Landing page
│   │   ├── DashboardPage.tsx # Main dashboard
│   │   ├── SupplementsPage.tsx # Supplement store
│   │   └── CartPage.tsx      # Shopping cart
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── api/                  # API client functions
│   ├── types/                # TypeScript type definitions
│   └── store/                # State management (Zustand)
├── supabase/
│   ├── functions/            # Edge Functions
│   │   ├── openai-proxy/     # OpenAI API proxy
│   │   ├── elevenlabs-proxy/ # ElevenLabs voice proxy
│   │   ├── cgm-ingestion/    # CGM data processing (planned)
│   │   └── nutrition-score/  # Nutrition scoring (planned)
│   └── migrations/           # Database schema migrations
├── public/
│   ├── icons/                # App icons
│   └── manifest.json         # PWA manifest
├── docs/                     # Documentation
├── tests/                    # Test files
└── deployment/               # Deployment configurations
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Supabase account** (free tier available)
- **OpenAI API key** (for AI coach functionality)
- **ElevenLabs API key** (optional - for voice features)
- **Supabase CLI** installed globally: `npm install -g supabase`

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/asharara88/biowell-ai.git
cd biowell-ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key
```

4. **Link to your Supabase project:**
```bash
supabase link --project-ref your-project-ref
```

5. **Run database migrations:**
```bash
supabase db push
```

6. **Deploy Edge Functions:**
```bash
supabase functions deploy openai-proxy
supabase functions deploy elevenlabs-proxy
```

7. **Set API keys as Supabase secrets:**
```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key
supabase secrets set ELEVENLABS_API_KEY=your-elevenlabs-api-key
```

8. **Start the development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app running.

---

## 📊 Database Schema

### Core Tables

- **`profiles`** - User profiles and preferences
- **`health_metrics`** - Wearable device data and health scores
- **`quiz_responses`** - Onboarding questionnaire responses
- **`supplements`** - Supplement catalog and inventory
- **`user_supplements`** - User supplement subscriptions
- **`cart_items`** - Shopping cart functionality
- **`chat_history`** - AI coach conversation history
- **`wearable_connections`** - Device integration status
- **`audio_cache`** - Cached voice responses
- **`cgm_data`** - Continuous glucose monitoring data (planned)

### Premium Features Tables (Planned)

- **`meal_plans`** - Personalized nutrition plans
- **`food_logs`** - Camera-based food tracking
- **`fertility_data`** - Cycle tracking and fertility insights
- **`metabolic_scores`** - CGM-derived metabolic health metrics

---

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run tests
npm run test:watch      # Watch mode testing
npm run test:coverage   # Test coverage report

# Linting & Formatting
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Database
supabase db reset       # Reset local database
supabase db push        # Push schema changes
supabase gen types      # Generate TypeScript types

# Deployment
npm run deploy          # Deploy to Netlify
```

---

## 🔐 Authentication & Security

- **Row Level Security (RLS)** policies on all tables
- **JWT-based authentication** via Supabase Auth
- **API key management** through Supabase secrets
- **CORS protection** on all Edge Functions
- **Data encryption** in transit and at rest
- **Privacy-first design** with user data control

---

## 📱 Mobile Support

- **Progressive Web App (PWA)** with offline capabilities
- **Responsive design** optimized for mobile devices
- **Apple Watch integration** for real-time health metrics
- **Push notifications** for coaching reminders
- **Biometric authentication** support (Face ID, Touch ID)

---

## 🎯 Premium Features

### Standard vs Premium

| Feature | Standard | Premium |
|---------|----------|---------|
| AI Coach | ✅ Basic | ✅ Advanced |
| Supplement Store | ✅ Full price | ✅ 15% discount |
| Nutrition Module | ❌ | ✅ Full access |
| Camera Food Tracking | ❌ | ✅ Unlimited |
| CGM Integration | ❌ | ✅ Real-time |
| Fertility Mode | ❌ | ✅ Couples support |
| Advanced Analytics | ❌ | ✅ Detailed insights |

---

## 🔗 Integrations

### Wearables
- **Apple Health** (HealthKit)
- **Oura Ring** (API v2)
- **Garmin Connect** (Connect IQ)
- **Fitbit** (Web API)
- **Withings** (Health Mate)

### Health Platforms
- **Flo** (Fertility tracking)
- **Clue** (Menstrual cycle)
- **Apple Cycle Tracking**
- **FreeStyle Libre** (CGM)
- **Dexcom** (CGM - planned)

### AI Services
- **OpenAI GPT-4** (Conversational AI)
- **ElevenLabs** (Voice synthesis)
- **Custom food classifier** (Computer vision - planned)

---

## 📈 Roadmap

### Q3 2025
- [ ] Fertility Mode launch
- [ ] Camera-based food tracking
- [ ] Premium nutrition module
- [ ] Apple Watch app

### Q4 2025
- [ ] CGM integration (FreeStyle Libre)
- [ ] Advanced metabolic scoring
- [ ] Couples dashboard
- [ ] Mobile app launch

### Q1 2026
- [ ] Dexcom integration
- [ ] Garmin Connect IQ app
- [ ] Advanced AI coaching
- [ ] Telehealth integration

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation:** [docs.biowell.ai](https://docs.biowell.ai)
- **Discord Community:** [discord.gg/biowell](https://discord.gg/biowell)
- **Email Support:** support@biowell.ai
- **Bug Reports:** [GitHub Issues](https://github.com/asharara88/biowell-ai/issues)

---

> **Medical Disclaimer:** Biowell AI provides general wellness information and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before making changes to your health routine.

---

<div align="center">
  <strong>Built with ❤️ by the Biowell team</strong>
</div>
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the OpenAI proxy function
supabase functions deploy openai-proxy

# Deploy other functions (optional)
supabase functions deploy chat-assistant
supabase functions deploy recommendations
```

**Verify deployment:**
1. Go to your Supabase Dashboard
2. Navigate to Edge Functions
3. Confirm that `openai-proxy` is deployed and active

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.production.example` to `.env` and add your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key # optional, not currently used
VITE_OPENAI_API_KEY=your-openai-api-key # optional for local dev
VITE_CAPTCHA_SECRET_KEY=your-captcha-secret-key # optional
JWT_SECRET=your-jwt-secret
```

4. For production builds, copy `.env.production.example` to `.env.production` and supply your production values (this file is ignored by Git). Ensure `JWT_SECRET` is set in this file for token verification.

5. Start the development server:

```bash
npm run dev
```

## Troubleshooting

### "Failed to fetch" Error

This error typically occurs when:
1. **Environment not configured**: Check your `.env` file has real Supabase credentials
2. **Edge Function not deployed**: Deploy the `openai-proxy` function to Supabase
3. **OpenAI API key not set**: Configure the OpenAI API key as a Supabase secret

**Quick fixes:**
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Deploy Edge Function
supabase functions deploy openai-proxy

# Set OpenAI secret
supabase secrets set OPENAI_API_KEY=your-key-here
```

### Setup Guide

The app includes a built-in setup guide that appears when configuration errors are detected. Click "Setup Guide" on any error message to get step-by-step instructions.

### Running Tests and Lint

1. **Install dependencies** (required before running `npm test`):
   ```bash
   npm install
   ```
2. **Run lint and tests**:
   ```bash
   npm run lint
   npm test
   ```

You can also use the convenience script `scripts/setup.sh` to install
dependencies automatically before running tests locally.

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migrations from the `supabase/migrations` folder
3. Set up authentication with email/password

#### Setting up OpenAI API Key (Required for AI Chat)

#### Setting up ElevenLabs API Key (Optional for Text-to-Speech)

**OPTIONAL**: The text-to-speech functionality requires an ElevenLabs API key to be configured as a Supabase secret. If not configured, the app will work normally but without voice responses.

1. **Get your ElevenLabs API key** from [ElevenLabs](https://elevenlabs.io/app/speech-synthesis)

2. **Set the ElevenLabs API key as a Supabase secret**:
```bash
supabase secrets set ELEVENLABS_API_KEY=your-elevenlabs-api-key
```

3. **Deploy the Edge Function** for ElevenLabs proxy:
```bash
supabase functions deploy elevenlabs-proxy
```

4. **Verify the setup** by checking that the secret was set correctly:
```bash
supabase secrets list
```

You should see `ELEVENLABS_API_KEY` in the list of secrets.

**Note**: If you don't configure the ElevenLabs API key, the app will still work normally but text-to-speech features will be disabled.

**IMPORTANT**: The AI chat functionality requires an OpenAI API key to be configured as a Supabase secret. Follow these steps carefully:

1. **Get your OpenAI API key** from [OpenAI's platform](https://platform.openai.com/api-keys)

2. **Login to Supabase CLI**:
```bash
supabase login
```

3. **Link your project** (replace with your actual project reference):
```bash
supabase link --project-ref your-project-ref
```

4. **Set the OpenAI API key as a Supabase secret** (replace `your-actual-openai-api-key` with your real OpenAI API key):
```bash
supabase secrets set OPENAI_API_KEY=your-actual-openai-api-key
```

5. **Deploy the Edge Function** for OpenAI proxy:
```bash
supabase functions deploy openai-proxy
```

6. **Verify the setup** by checking that the secret was set correctly:
```bash
supabase secrets list
```

You should see `OPENAI_API_KEY` in the list of secrets.

#### Troubleshooting OpenAI Integration

If you encounter the error "Failed to fetch", "Network request failed", or "Incorrect API key provided":

1. **Verify your OpenAI API key is valid**:
   - Go to [OpenAI's API keys page](https://platform.openai.com/api-keys)
   - Make sure your key is active and has sufficient credits
   - Copy the exact key (it should start with `sk-`)

2. **Check if the secret is properly set**:
   ```bash
   supabase secrets list
   ```
   You should see `OPENAI_API_KEY` listed.

3. **If the secret is missing or incorrect, set it again**:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here
   ```

4. **Redeploy the Edge Function** after setting/updating the secret:
   ```bash
   supabase functions deploy openai-proxy
   ```

5. **Check the Edge Function logs** for more details:
   ```bash
   supabase functions logs openai-proxy
   ```

6. **Verify your OpenAI account** has sufficient credits at [OpenAI's usage dashboard](https://platform.openai.com/usage)

7. **Test the Edge Function directly** to isolate the issue:
   ```bash
   curl -X POST "https://your-project-ref.supabase.co/functions/v1/openai-proxy" \
     -H "Authorization: Bearer your-supabase-anon-key" \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   ```

8. **Common fixes for "Failed to fetch" errors**:
   - Ensure your Supabase project is not paused
   - Check that the Edge Function is deployed and running
   - Verify network connectivity to Supabase
   - Clear browser cache and try again

#### Alternative Setup for Local Development

If you're developing locally and want to test the Edge Function locally, you can also:

1. Create a `.env` file in the `supabase/functions/openai-proxy/` directory:

```bash
# supabase/functions/openai-proxy/.env
OPENAI_API_KEY=your-openai-api-key
```

2. Start the local Supabase development environment:

```bash
supabase start
supabase functions serve
```

**Note**: The `.env` file approach only works for local development. For production, you must use Supabase secrets.

### Audio Cache Table

The migrations include an `audio_cache` table used to store generated audio for
text-to-speech responses. It features indexes on `(user_id, cache_key)` and
`expires_at` for quick lookups, row level security policies that restrict access
to authenticated users, and a trigger that automatically removes expired
entries.

### Shopping Cart

The migration `20250628120000_shopping_cart.sql` introduces a `cart_items`
table for storing supplements that users add to their cart. Add items via the
"Add to Cart" button on a supplement, update quantities or remove items from the
cart page, and proceed to checkout when ready. Row level security ensures each
user can only manage their own cart items.

## Project Structure

```
/components      // UI components 
/contexts        // React context providers
/hooks          // Custom React hooks
/pages          // Application pages
/supabase       // Supabase-related files
  /functions    // Edge Functions 
  /migrations   // SQL migration files
/utils          // Utility functions
```

## Deployment

The `netlify.toml` file specifies a Node.js 18 environment and uses the
`netlify-plugin-fetch-feeds` plugin to download the latest Hacker News front page 
into `public/feeds/hn.xml` during each build.

## Customizing Supabase Auth

You can extend Supabase authentication using database triggers or Auth Webhooks. See [docs/customizing-supabase-auth.md](docs/customizing-supabase-auth.md) for examples of both approaches.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.