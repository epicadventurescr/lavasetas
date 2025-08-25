"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, ImageIcon, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function MushroomChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !selectedImage) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simple chatbot responses without AI SDK dependency
      const response = await getSimpleResponse(userMessage.content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Lo siento, hubo un error. Por favor intenta de nuevo o contacta directamente por WhatsApp: +506 8709 0777",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setSelectedImage(null)
    }
  }

  // Simple response system for common mushroom store questions
  const getSimpleResponse = async (question: string): Promise<string> => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("precio") || lowerQuestion.includes("cost") || lowerQuestion.includes("price")) {
      return `Nuestros precios actuales son:
• Hongos Ostra Grises: ₡3,500 (₡3,000 en temporada) - 250g
• Hongos Ostra Blancos: ₡3,800 (₡3,200 en temporada) - 250g  
• Melena de León: ₡4,500 (₡4,000 en temporada) - 200g

Los precios de temporada aplican cuando están en su mejor época de cultivo.`
    }

    if (lowerQuestion.includes("pedido") || lowerQuestion.includes("order") || lowerQuestion.includes("comprar")) {
      return `Para hacer un pedido:
1. Agrega los hongos que deseas al carrito en nuestra página
2. Haz clic en "Ordenar por WhatsApp"
3. Se abrirá WhatsApp con tu pedido pre-escrito
4. Envía el mensaje al +506 8709 0777
5. Confirmaremos disponibilidad y tiempo de entrega

¡Es muy fácil y rápido!`
    }

    if (
      lowerQuestion.includes("receta") ||
      lowerQuestion.includes("cocinar") ||
      lowerQuestion.includes("recipe") ||
      lowerQuestion.includes("cook")
    ) {
      return `¡Excelente pregunta! Aquí tienes algunas ideas:

🍄 **Hongos Ostra**: Perfectos salteados con ajo y hierbas, en sopas, o en stir-fry
🍄 **Melena de León**: Tiene textura similar al marisco - pruébalo a la plancha con limón
🍄 **Preparación general**: Limpia suavemente, corta y cocina a fuego medio-alto

¿Te interesa alguna receta específica? ¡Pregúntame!`
    }

    if (
      lowerQuestion.includes("beneficio") ||
      lowerQuestion.includes("salud") ||
      lowerQuestion.includes("health") ||
      lowerQuestion.includes("nutrition")
    ) {
      return `Los hongos gourmet son súper nutritivos:

✅ **Proteína completa** - Todos los aminoácidos esenciales
✅ **Vitaminas B** - Especialmente B12 en Melena de León  
✅ **Antioxidantes** - Protegen contra el envejecimiento
✅ **Fibra** - Buena para la digestión
✅ **Minerales** - Potasio, fósforo, selenio

La Melena de León es especialmente conocida por apoyar la salud cerebral.`
    }

    if (
      lowerQuestion.includes("ubicación") ||
      lowerQuestion.includes("location") ||
      lowerQuestion.includes("donde") ||
      lowerQuestion.includes("where")
    ) {
      return `Estamos ubicados en El Castillo, Provincia de Alajuela, Costa Rica.

🌋 Cerca del Volcán Arenal y Lago Arenal
🌿 Aprovechamos el microclima único de la zona
🚚 Hacemos entregas locales en El Castillo
📱 Contacto: +506 8709 0777 (WhatsApp)

El suelo volcánico y la humedad constante crean condiciones perfectas para nuestros hongos.`
    }

    if (
      lowerQuestion.includes("temporada") ||
      lowerQuestion.includes("season") ||
      lowerQuestion.includes("disponible")
    ) {
      return `Nuestros hongos tienen diferentes temporadas:

🟢 **En temporada ahora**: Hongos Ostra Grises y Melena de León (precios especiales)
🟡 **Fuera de temporada**: Hongos Ostra Blancos (precio regular)

Las temporadas dependen del clima y condiciones de cultivo. ¡Contacta por WhatsApp para confirmar disponibilidad actual!`
    }

    // Default response
    return `¡Hola! Soy el asistente de Lava Setas. Puedo ayudarte con:

• **Precios y productos** - Información sobre nuestros hongos
• **Pedidos** - Cómo ordenar por WhatsApp  
• **Recetas** - Ideas para cocinar hongos
• **Beneficios** - Información nutricional
• **Ubicación** - Dónde estamos en El Castillo

¿En qué te puedo ayudar específicamente? O contacta directamente: +506 8709 0777`
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-accent text-accent-foreground">AI Assistant</Badge>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
      <Card className="shadow-2xl border-2">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Asistente Lava Setas
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/90">Pregúntame sobre hongos, recetas y pedidos</p>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-80 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm">
                  <p className="mb-2">¡Hola! Soy tu asistente de Lava Setas.</p>
                  <p>Puedo ayudarte con:</p>
                  <ul className="text-left mt-2 space-y-1">
                    <li>• Información sobre hongos</li>
                    <li>• Recetas y preparación</li>
                    <li>• Precios y disponibilidad</li>
                    <li>• Cómo hacer pedidos</li>
                  </ul>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Escribiendo...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            {selectedImage && (
              <div className="mb-2 p-2 bg-muted rounded-lg flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Imagen: {selectedImage.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedImage(null)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <div className="flex-1 flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit" disabled={isLoading || (!input.trim() && !selectedImage)}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
