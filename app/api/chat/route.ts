import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const apiKey =
      process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

    console.log("[v0] API Key available:", !!apiKey)
    console.log("[v0] API Key length:", apiKey?.length || 0)
    console.log("[v0] Environment variables available:", {
      VITE_GEMINI_API_KEY: !!process.env.VITE_GEMINI_API_KEY,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      GOOGLE_GENERATIVE_AI_API_KEY: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    if (!apiKey) {
      console.error("[v0] No API key found in environment variables")
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const googleAI = google({
      apiKey: apiKey,
    })

    console.log("[v0] Attempting to call Gemini API with messages:", messages.length)

    const result = await streamText({
      model: googleAI("gemini-1.5-flash"),
      messages,
      system: `You are a helpful AI assistant for Lava Setas, a gourmet mushroom store in El Castillo, Costa Rica. 

Store Information:
- Location: El Castillo, near Arenal Volcano and Lake Arenal
- Products: Grey Oyster (₡3,500/₡3,000 seasonal), White Oyster (₡3,800/₡3,200 seasonal), Lion's Mane (₡4,500/₡4,000 seasonal)
- All mushrooms are organic, grown in volcanic soil
- Orders via WhatsApp: +506 8709 0777
- Packages: 250g for oyster mushrooms, 200g for Lion's Mane

You should:
- Help customers learn about mushroom varieties, cooking methods, and nutritional benefits
- Provide information about seasonal availability and pricing
- Guide customers on how to place orders via WhatsApp
- Share information about the unique growing conditions near Arenal Volcano
- Answer questions about mushroom cultivation and storage
- Be friendly and knowledgeable about Costa Rican culture and cuisine

Respond in Spanish when customers write in Spanish, English when they write in English.`,
    })

    console.log("[v0] Gemini API call successful")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    })

    return new Response(
      JSON.stringify({
        error: "Error processing chat request",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
