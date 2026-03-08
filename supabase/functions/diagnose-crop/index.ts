import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { imageBase64, plantPart, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert agricultural scientist and plant pathologist. Analyze the uploaded image of a ${plantPart || "plant"} and provide a diagnosis.

IMPORTANT: Respond ONLY in valid JSON format with this exact structure:
{
  "disease": "Name of the disease or condition",
  "severity": "Low" or "Medium" or "High" or "Critical",
  "affectedPart": "${plantPart || "Unknown"}",
  "confidence": number between 0 and 100,
  "treatment": "Detailed treatment recommendations including specific chemicals/doses",
  "prevention": "Preventive measures to avoid recurrence",
  "organicTreatment": "Organic/natural treatment alternatives",
  "symptoms": "Key symptoms observed in the image",
  "cause": "What causes this disease (fungal, bacterial, viral, nutritional, pest, etc.)"
}

If the image doesn't show a plant or disease, still respond with JSON but set disease to "No disease detected" or "Not a plant image" and provide general farming advice in treatment/prevention fields.
${language && language !== "en" ? `Respond in ${language} language for all text fields.` : ""}`;

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
          {
            role: "user",
            content: [
              { type: "text", text: `Analyze this ${plantPart || "plant"} image for diseases, pests, or nutritional deficiencies. Provide detailed diagnosis.` },
              { type: "image_url", image_url: { url: imageBase64 } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", status, errorText);
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Try to parse JSON from the response
    let result;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
      result = JSON.parse(jsonMatch[1].trim());
    } catch {
      // If JSON parsing fails, create structured result from text
      result = {
        disease: "Analysis Complete",
        severity: "Medium",
        affectedPart: plantPart || "Unknown",
        confidence: 75,
        treatment: content,
        prevention: "Consult a local agricultural expert for specific guidance.",
        organicTreatment: "Use neem-based solutions as a general organic treatment.",
        symptoms: "See analysis above",
        cause: "Requires further analysis",
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("diagnose-crop error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
