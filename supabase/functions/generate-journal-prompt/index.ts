import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mood, previousPrompts = [] } = await req.json();

    const systemPrompt = `You are a mindful journaling companion. Generate a thoughtful, introspective journal prompt that helps users explore their emotions and thoughts. 

Guidelines:
- Create prompts that encourage self-reflection and mindfulness
- Be gentle, non-judgmental, and supportive
- Avoid repeating similar prompts from the previous ones
- Keep prompts concise but meaningful (1-2 sentences)
- Focus on emotional wellness, gratitude, growth, or self-discovery
- Consider the user's current mood if provided

Previous prompts to avoid repeating: ${previousPrompts.join(', ')}
${mood ? `User's current mood: ${mood}` : ''}

Generate only the journal prompt text, nothing else.`;

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
                text: systemPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 150,
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API error');
    }

    const prompt = data.candidates?.[0]?.content?.parts?.[0]?.text || "What moments from today brought you a sense of peace or joy? How can you carry that feeling into tomorrow?";

    return new Response(JSON.stringify({ prompt }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating journal prompt:', error);
    
    // Fallback prompts for when AI is unavailable
    const fallbackPrompts = [
      "What are three things you're grateful for today, and how did they make you feel?",
      "Describe a moment today when you felt truly present. What made that moment special?",
      "What emotions are you experiencing right now? How can you show yourself compassion?",
      "If you could give your younger self one piece of wisdom, what would it be?",
      "What does inner peace mean to you, and how can you cultivate more of it?",
      "Write about a challenge you're facing and one small step you can take to address it mindfully."
    ];
    
    const randomPrompt = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
    
    return new Response(JSON.stringify({ 
      prompt: randomPrompt,
      fallback: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});