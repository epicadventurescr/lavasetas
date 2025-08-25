import { streamText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    const apiKey =
      process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

    console.log("[v0] API Key available:", !!apiKey)
    console.log("[v0] API Key length:", apiKey?.length || 0)

    if (!apiKey) {
      console.error("[v0] No API key found in environment variables")
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    })

    const systemPrompt =
      language === "en"
        ? `You are a helpful AI assistant for Lava Setas, a gourmet mushroom store in El Castillo, Costa Rica. 

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

IMPORTANT: Always respond in English only.`
        : `Eres un asistente de IA útil para Lava Setas, una tienda de hongos gourmet en El Castillo, Costa Rica.

Información de la tienda:
- Ubicación: El Castillo, cerca del Volcán Arenal y Lago Arenal
- Productos: Ostra Gris (₡3,500/₡3,000 estacional), Ostra Blanca (₡3,800/₡3,200 estacional), Melena de León (₡4,500/₡4,000 estacional)
- Todos los hongos son orgánicos, cultivados en suelo volcánico
- Pedidos vía WhatsApp: +506 8709 0777
- Paquetes: 250g para hongos ostra, 200g para Melena de León

Debes:
- Ayudar a los clientes a aprender sobre variedades de hongos, métodos de cocción y beneficios nutricionales
- Proporcionar información sobre disponibilidad estacional y precios
- Guiar a los clientes sobre cómo hacer pedidos vía WhatsApp
- Compartir información sobre las condiciones únicas de cultivo cerca del Volcán Arenal
- Responder preguntas sobre cultivo y almacenamiento de hongos
- Ser amigable y conocedor de la cultura y cocina costarricense

IMPORTANTE: Siempre responde únicamente en español.`

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: systemPrompt,
    })

    console.log("[v0] Gemini API call successful")
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error details:", error.message)

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
