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

  // Add detailed logging for debugging
  console.log('OpenAI Proxy function called')
  console.log('Request method:', req.method)
  console.log('Request headers:', Object.fromEntries(req.headers.entries()))

  try {
    // Initialize OpenAI client
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    console.log('API Key status:', apiKey ? 'Present' : 'Missing')
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY secret using: supabase secrets set OPENAI_API_KEY=your-key",
          code: "MISSING_API_KEY"
        }), 
        { 
          status: 503,
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
      console.log('Request body length:', bodyText.length)
      if (!bodyText || bodyText.trim() === '') {
        console.error('Request body is empty')
        return new Response(
          JSON.stringify({ error: "Request body is empty" }), 
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      requestBody = JSON.parse(bodyText);
      console.log('Parsed request body successfully')
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
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
      console.error('Invalid messages format:', messages)
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }), 
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    console.log('Messages count:', messages.length)

    // Create OpenAI completion
    let completion;
    try {
      console.log('Calling OpenAI API...')
      completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
      });
      console.log('OpenAI API call successful')
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      
      // Handle specific OpenAI errors
      if (openaiError.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: "Invalid OpenAI API key. Please check your API key configuration.",
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
            error: "OpenAI API rate limit exceeded. Please try again later.",
            code: "RATE_LIMIT"
          }), 
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      } else {
        console.error('OpenAI API error details:', {
          status: openaiError.status,
          message: openaiError.message,
          code: openaiError.code
        })
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API request failed: ${openaiError.message || 'Unknown error'}`,
            code: "OPENAI_ERROR"
          }), 
          { 
            status: 503,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
    }

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in OpenAI response')
      return new Response(
        JSON.stringify({ 
          error: "No response from AI",
          code: "NO_RESPONSE"
        }), 
        { 
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    console.log('Returning successful response')
    return new Response(
      JSON.stringify({ result: content }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Proxy error:", {
      message,
      stack: err instanceof Error ? err.stack : undefined,
      name: err instanceof Error ? err.name : undefined
    })
    
    return new Response(
      JSON.stringify({ 
        error: `Internal server error: ${message}`,
        code: "INTERNAL_ERROR"
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )
  }
})