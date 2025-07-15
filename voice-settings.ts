// This file contains the handler for voice settings requests

export async function handleVoiceSettingsRequest(req: Request, voiceId: string, apiKey: string, corsHeaders: Record<string, string>) {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}/settings`, {
      headers: { 
        'Accept': 'application/json',
        'xi-api-key': apiKey 
      }
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

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching voice settings:", error);
    return new Response(
      JSON.stringify({ 
        error: {
          message: error.message || "Failed to fetch voice settings",
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