import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const googleAI = google({
      apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

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

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Error processing chat request", { status: 500 })
  }
}
