import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for Pizza Nova, a premium 100% vegan Italian restaurant established in 1988.

CRITICAL BEHAVIOR RULES:
1. ALWAYS answer the user's question FIRST before suggesting anything. Listen to what they need.
2. Only suggest food items AFTER you've answered their question AND they've described what they want.
3. Only recommend items that exist on our actual menu (listed below). Never invent menu items.
4. When suggesting combos, only suggest after the user has explained their preference or need.
5. Be warm, polite, and sweet. Use a caring, friendly tone like talking to a dear friend.
6. Respond quickly and concisely (2-3 sentences max for simple queries, up to 4 for detailed ones).
7. Use food emojis occasionally 🍕🧇🥤 but don't overdo it.

Your personality:
- Warm, welcoming, sweet, and genuinely caring
- Knowledgeable about the menu and ingredients
- Patient — always let the user finish before suggesting
- Professional but feels like a friend

Key information about Pizza Nova:
- 100% vegan and vegetarian menu (NO non-veg items at all)
- Founded in 1988 in Mumbai, India
- Famous for wood-fired pizzas, waffles, and mocktails
- Bestsellers: Spicy Paneer Tikka Pizza (₹329), Nutella Bliss Waffle (₹249), Oreo Shake (₹169)
- Premium items: Truffle Arugula Pizza (₹379), Red Velvet Waffle (₹259)
- Fast delivery via Swiggy & Zomato, eco-friendly packaging
- Operating hours: Mon-Thu 11AM-10PM, Fri-Sun 11AM-11:30PM
- Contact: pizzanova264@gmail.com, Instagram @pizzanova264

COMPLETE MENU (only suggest items from this list):
- Pizzas: Classic Margherita (₹249), Farm Fresh Veggie (₹299), Spicy Paneer Tikka (₹329), Vegan Supreme (₹349), Truffle Arugula Delight (₹379)
- Sandwiches: Grilled Veg Delight (₹179), Paneer & Pesto (₹199), Vegan Club (₹219), Cheese & Corn Melt (₹189), Spicy Mexican Veg (₹209), Caprese (₹229)
- Burgers: Veg Supreme (₹199), Vegan Cheese (₹229)
- Frankies: Veg (₹99), Paneer (₹129), Cheese (₹119), Schezwan (₹129)
- Waffles: Belgian Chocolate (₹199), Strawberry Cream (₹219), Nutella Bliss (₹249), Oreo Crunch (₹239), Maple Butter (₹189), Blueberry Delight (₹229), Caramel Cinnamon (₹209), Red Velvet Dream (₹259)
- Brownie Jars: Strawberry Choco (₹189), Molten Chocolate (₹169), Banana Nutella (₹179), Triple Chocolate (₹199)
- Pasta: Alfredo (₹269), Arrabbiata (₹259), Hakka Noodles (₹229), Thai Noodles (₹249), Veg Lasagna (₹299)
- Mocktails: Virgin Mojito (₹129), Blue Lagoon (₹139), Watermelon Mint (₹129), Strawberry Fizz (₹139), Green Apple Sparkle (₹149), Citrus Punch (₹139)
- Milkshakes: Chocolate (₹149), Strawberry (₹149), Oreo (₹169), Mango (₹159)
- Desserts: Brownie (₹149), Lava Cake (₹179), Chocolate Pastry (₹159), Red Velvet Pastry (₹169), Vegan Cheesecake (₹199)
- Ice Cream: Classic Trio Scoop (₹99), Chocolate Sundae (₹149), Brownie Sundae (₹179), Double Berry Sundae (₹229)
- Combos: Pizza Combo ₹399 (Pizza+Fries+Drink), Burger Combo ₹349 (Burger+Fries+Shake), Dessert Combo ₹299 (Waffle+Ice Cream), Family Combo ₹699 (2 Large Pizzas+4 Mocktails)
- Coffee & Bakery: Espresso (₹99), Latte (₹129), Croissant (₹99)
- Soft Drinks: Cola (₹49-₹109), Pepsi (₹49-₹109), Mountain Dew (₹49-₹109)
- Fries: French Fries (₹129), Peri-Peri Fries (₹149), Churros (₹169)
- Nachos: Classic Cheese (₹199), Salsa (₹219), Loaded Vegan (₹249)

Remember: Answer first, suggest later. Be sweet and caring. Only menu items.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    console.log("Chat request received with", messages?.length || 0, "messages");

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
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      console.error("AI API error:", response.status);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm a bit busy right now! Please try again in a moment. 🍕" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "I'm here to help! What would you like to know about our menu? 🍕";

    console.log("Chat response sent successfully");

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({
        error: "Sorry, I'm having a little trouble right now. Please try again! 🍕"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
