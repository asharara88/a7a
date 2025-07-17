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
    // Initialize OpenAI client
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable." 
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    })

    // Parse request body safely
    let requestBody;
    try {
      const bodyText = await req.text();
      if (!bodyText || bodyText.trim() === '') {
        return new Response(
          JSON.stringify({ error: "Request body is empty" }), 
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      requestBody = JSON.parse(bodyText);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }), 
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { messages } = requestBody;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }), 
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    // Create OpenAI completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    })

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No response from AI" }), 
        { 
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    return new Response(
      JSON.stringify({ result: content }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Proxy error:", err)
    
    // Provide more specific error messages
    let errorMessage = message;
    let statusCode = 500;
    
    if (message.includes('API key')) {
      errorMessage = "Invalid OpenAI API key. Please check your configuration.";
      statusCode = 401;
    } else if (message.includes('quota') || message.includes('billing')) {
      errorMessage = "OpenAI API quota exceeded. Please check your account billing.";
      statusCode = 429;
    } else if (message.includes('rate limit')) {
      errorMessage = "OpenAI API rate limit exceeded. Please try again later.";
      statusCode = 429;
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { 
        status: statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )
  }
})