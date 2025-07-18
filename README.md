# Biowell AI - Personal Digital Health Coach

[![Netlify Status](https://api.netlify.com/api/v1/badges/5239b3f1-f78c-4857-ad9d-ad1bb351d322/deploy-status)](https://app.netlify.com/projects/biowellai/deploys)

Biowell AI is a digital health platform that connects your wearable devices, delivers personalized insights, and offers evidence‑based supplement recommendations through an AI coach.

## Features

- **Personal Health Dashboard**: View your health score and metrics from connected wearable devices
- **AI Health Coach**: Chat with an AI powered by OpenAI to get personalized health advice
- **Supplement Recommendations**: Receive custom supplement suggestions based on your health data
- **Onboarding Quiz**: Detailed health assessment to personalize your experience
- **Wearable Integration**: Connect with Apple Health, Oura Ring, Garmin, and more
- **Subscription Management**: Subscribe to recommended supplements for monthly delivery
- **Shopping Cart**: Save supplements in your cart with quantity tracking

> **Disclaimer**: Biowell AI does not provide medical diagnosis or treatment. The AI coach offers general wellness guidance based on the information you share. Always consult a qualified healthcare professional for medical concerns.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Supabase (Authentication, Database, Realtime)
- **Serverless**: Supabase Edge Functions for OpenAI proxy
- **Payments**: Stripe integration (currently unused placeholder)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key (for AI coach functionality)
- Stripe account (optional - integration not currently used)
- Supabase CLI installed globally (`npm install -g supabase`)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/biowell-ai.git
cd biowell-ai
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.production.example` to `.env` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key # optional, not currently used
VITE_OPENAI_API_KEY=your-openai-api-key # for local dev only; for production, set as a Supabase secret
VITE_CAPTCHA_SECRET_KEY=your-captcha-secret-key # optional; only required if you enable CAPTCHA verification for forms (e.g., signup or contact forms)
JWT_SECRET=your-jwt-secret
```

4. For production builds, copy `.env.production.example` to `.env.production` and supply your production values (this file is ignored by Git). Ensure `JWT_SECRET` is set in this file for token verification.

5. Deploy Edge Functions

Deploy the required Edge Functions to your Supabase project:

```bash
# Link your local project to Supabase
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

6. Start the development server:

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

supabase functions deploy openai-proxy

```

6. **Verify the setup** by checking that the secret was set correctly:

```bash
supabase secrets list
```

You should see `OPENAI_API_KEY` in the list of secrets.

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
/components      - UI components 
/contexts        - React context providers
/hooks           - Custom React hooks
/pages           - Application pages
/supabase        - Supabase-related files
  /functions     - Edge Functions 
  /migrations    - SQL migration files
/utils           - Utility functions
```

## Deployment

The `netlify.toml` file specifies a Node.js 18 environment for deployment.

## Customizing Supabase Auth

You can extend Supabase authentication using database triggers or Auth Webhooks. See [docs/customizing-supabase-auth.md](docs/customizing-supabase-auth.md) for examples of both approaches.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
