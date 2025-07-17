import { createClient } from "npm:@supabase/supabase-js@2.38.4"
import OpenAI from 'https://esm.sh/openai@4.20.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('OpenAI proxy function called');
    
    // Check if OpenAI API key is configured
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('API Key status:', apiKey ? 'Present' : 'Missing');
    
    if (!apiKey || apiKey.trim() === '') {
      console.error('OpenAI API key is not configured');
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured. Please follow these steps:\n\n1. supabase link --project-ref YOUR_PROJECT_REF\n2. supabase secrets set OPENAI_API_KEY=your-actual-openai-api-key\n3. supabase functions deploy openai-proxy\n\nVerify setup with: supabase secrets list",
          code: "MISSING_API_KEY",
          details: "The OPENAI_API_KEY environment variable is not set in Supabase secrets"
        }), 
        { 
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Parse request body
    let requestBody;
    try {
      const bodyText = await req.text();
      console.log('Request body length:', bodyText ? bodyText.length : 0);
      
      if (!bodyText || bodyText.trim() === '') {
        console.error('Request body is empty');
        return new Response(
          JSON.stringify({ 
            error: "Request body is empty",
            code: "EMPTY_BODY"
          }), 
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      requestBody = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          code: "INVALID_JSON"
        }), 
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Validate messages
    const { messages } = requestBody;
    console.log('Messages count:', messages ? messages.length : 0);

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return new Response(
        JSON.stringify({ 
          error: "Invalid messages format - must be an array",
          code: "INVALID_MESSAGES"
        }), 
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Initialize OpenAI client
    let openai;
    try {
      openai = new OpenAI({
        apiKey: apiKey,
      });
    } catch (initError) {
      console.error('OpenAI initialization error:', initError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to initialize OpenAI client",
          code: "INIT_ERROR"
        }), 
        { 
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Call OpenAI API
    let completion;
    try {
      console.log('Calling OpenAI API...');
      completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
      });
      console.log('OpenAI API call successful');
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      
      if (openaiError.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: "Invalid OpenAI API key. Please verify your API key and run:\n1. supabase secrets set OPENAI_API_KEY=your-valid-key\n2. supabase functions deploy openai-proxy",
            code: "INVALID_API_KEY"
          }), 
          { 
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      } else if (openaiError.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "OpenAI API rate limit exceeded or insufficient credits. Check your OpenAI account at https://platform.openai.com/usage",
            code: "RATE_LIMIT"
          }), 
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API error (${openaiError.status || 'unknown'}): ${openaiError.message || 'Unknown error'}`,
            code: "OPENAI_ERROR"
          }), 
          { 
            status: 503,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
    }

    // Extract content
    const content = completion.choices?.[0]?.message?.content;
    console.log('Response content length:', content ? content.length : 0);

    if (!content) {
      console.error('No content in OpenAI response');
      return new Response(
        JSON.stringify({ 
          error: "No response content from OpenAI",
          code: "NO_CONTENT"
        }), 
        { 
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify({ result: content }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Unexpected proxy error:", message);
    
    return new Response(
      JSON.stringify({ 
        error: `Internal server error: ${message}`,
        code: "INTERNAL_ERROR"
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});