// This file contains the handler for text-to-speech requests

const MAX_TEXT_LENGTH = 300; // Limit text length to avoid excessive API usage

export async function handleTextToSpeechRequest(req: Request, apiKey: string, corsHeaders: Record<string, string>) {
  try {
    const { text, voiceId, stability, similarity_boost } = await req.json();

    if (!text || !voiceId) {
      return new Response(
        JSON.stringify({ error: "Text and voiceId are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Limit text length to prevent abuse
    const trimmedText = text.length > MAX_TEXT_LENGTH 
      ? text.substring(0, MAX_TEXT_LENGTH) + "..."
      : text;

    // Prepare request body
    const requestBody: any = {
      text: trimmedText,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: stability !== undefined ? stability : 0.5,
        similarity_boost: similarity_boost !== undefined ? similarity_boost : 0.75
      }
    };

    // Make request to ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      return new Response(
        JSON.stringify({ error: errorData.detail || `ElevenLabs API error: ${response.status}` }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get audio data
    const audioData = await response.arrayBuffer();

    // Return audio data
    return new Response(
      audioData,
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400" // Cache for 24 hours
        } 
      }
    );
  } catch (error) {
    console.error("Error generating speech:", error);
    return new Response(
      JSON.stringify({ 
        error: {
          message: error.message || "Failed to generate speech",
          type: error.name || "UnknownError"
        }
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}