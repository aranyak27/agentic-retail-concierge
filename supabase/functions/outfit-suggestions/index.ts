import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { wardrobeItems } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Build a description of the wardrobe
    const wardrobeDescription = wardrobeItems.map((item: any) => 
      `${item.name} (${item.category}, ${item.color}, ${item.season})`
    ).join(", ");

    const systemPrompt = `You are an expert fashion stylist specializing in Indian fashion and global trends. 
Your task is to create 3-4 complete outfit combinations from the given wardrobe items.

For each outfit:
- Suggest 3-4 items that work well together
- Consider color harmony, season appropriateness, and occasion
- Explain why the combination works
- Suggest the best occasion (casual, formal, party, ethnic event, etc.)

Return a JSON array of outfits in this exact format:
[
  {
    "name": "Outfit name",
    "items": ["Item 1", "Item 2", "Item 3"],
    "occasion": "Casual/Formal/Party/Ethnic",
    "season": "Summer/Winter/All Season",
    "description": "Why this combination works"
  }
]`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create outfit combinations from these wardrobe items: ${wardrobeDescription}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_outfits",
              description: "Return outfit combination suggestions",
              parameters: {
                type: "object",
                properties: {
                  outfits: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        items: { 
                          type: "array",
                          items: { type: "string" }
                        },
                        occasion: { type: "string" },
                        season: { type: "string" },
                        description: { type: "string" }
                      },
                      required: ["name", "items", "occasion", "season", "description"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["outfits"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_outfits" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI Gateway error ${response.status}:`, errorText);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("Payment required. Please add credits to your workspace.");
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));
    
    // Extract the function call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No outfit suggestions generated");
    }

    const outfits = JSON.parse(toolCall.function.arguments).outfits;

    return new Response(JSON.stringify({ outfits }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Outfit suggestions error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
