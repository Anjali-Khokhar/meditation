import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context = "general" } = await req.json();

    if (!message) {
      throw new Error('No message provided');
    }

    // Create context-specific system prompts
    const systemPrompts = {
      general: "You are a mindful AI companion focused on meditation, wellness, and emotional support. Provide thoughtful, calming, and supportive responses. Keep responses concise but meaningful. Use gentle, encouraging language.",
      meditation: "You are a meditation guide. Provide specific meditation recommendations, breathing techniques, and mindfulness practices. Be encouraging and supportive.",
      journal: "You are a journaling companion. Help users reflect on their thoughts and emotions. Ask thoughtful questions and provide gentle insights. Be empathetic and non-judgmental.",
      progress: "You are a wellness coach. Help users understand their meditation journey and provide encouragement for their progress. Be motivating and celebratory.",
      daily: "You are a daily mindfulness guide. Provide daily inspiration, gentle reminders about self-care, and positive affirmations. Be uplifting and peaceful."
    };

    const systemPrompt = systemPrompts[context as keyof typeof systemPrompts] || systemPrompts.general;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nUser message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API error');
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to support your mindfulness journey. How can I help you today?";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm experiencing some technical difficulties. Please try again in a moment. Remember to take a deep breath and be kind to yourself. 🌸"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});