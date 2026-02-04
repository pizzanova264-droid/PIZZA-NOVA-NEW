import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for Pizza Nova, a premium 100% vegan Italian restaurant established in 1988.

Your personality:
- Warm, welcoming, and enthusiastic about vegan food
- Knowledgeable about the menu and ingredients
- Helpful with recommendations based on preferences
- Professional but friendly tone

Key information about Pizza Nova:
- 100% vegan and vegetarian menu
- Founded in 1988 in Mumbai, India
- Famous for wood-fired pizzas, waffles, and mocktails
- Bestsellers: Spicy Paneer Tikka Pizza, Nutella Bliss Waffle, Oreo Shake
- Premium items: Truffle Arugula Pizza, Red Velvet Waffle
- Fast delivery, eco-friendly packaging
- Operating hours: Mon-Thu 11AM-10PM, Fri-Sun 11AM-11:30PM
- Contact: pizzanova264@gmail.com, Instagram @pizzanova264

Menu categories:
- Pizzas (Margherita, Farm Fresh, Paneer Tikka, Vegan Supreme, Truffle Arugula)
- Waffles (8 varieties: Chocolate, Strawberry, Nutella, Oreo, Maple, Blueberry, Caramel, Red Velvet)
- Sandwiches (6 types including Caprese)
- Frankies (4 types)
- Brownies (4 types including Strawberry Choco Jar)
- Mocktails (6 flavors)
- Milkshakes, Ice Cream, Pasta, Desserts

Keep responses concise (2-3 sentences max), helpful, and always positive. Use food emojis occasionally 🍕🧇🥤`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authentication required. Please sign in to chat." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Invalid session. Please sign in again." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm a bit busy right now! Please try again in a moment. 🍕" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "I'm here to help! What would you like to know about our menu? 🍕";

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Something went wrong. Please try again!" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
