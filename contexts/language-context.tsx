"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Header
    "header.location": "El Castillo, Costa Rica",
    "header.region": "Arenal Region",
    "header.cart": "Cart",

    // Hero Section
    "hero.title": "Hongos Gourmet",
    "hero.subtitle": "del Volcán Arenal",
    "hero.description":
      "Cultivamos hongos premium en El Castillo, aprovechando el clima único cerca del Volcán Arenal y el Lago Arenal para crear sabores excepcionales.",
    "hero.viewProducts": "Ver Productos",
    "hero.whatsapp": "WhatsApp: +506 8709 0777",

    // Products Section
    "products.title": "Nuestros Hongos",
    "products.description": "Hongos frescos cultivados con técnicas orgánicas en el microclima único de El Castillo",
    "products.inSeason": "En Temporada",
    "products.add": "Agregar",
    "products.per": "por",

    // Product Names & Descriptions
    "product.greyOyster.name": "Grey Oyster Mushrooms",
    "product.greyOyster.description":
      "Delicate, earthy flavor with a tender texture. Perfect for stir-fries and soups.",
    "product.whiteOyster.name": "White Oyster Mushrooms",
    "product.whiteOyster.description": "Mild, sweet flavor with firm texture. Excellent grilled or sautéed.",
    "product.lionsMane.name": "Lion's Mane Mushrooms",
    "product.lionsMane.description": "Unique seafood-like texture with a savory umami flavor. Great meat substitute.",

    // Cart
    "cart.summary": "Resumen del Pedido",
    "cart.total": "Total:",
    "cart.orderWhatsApp": "Ordenar por WhatsApp",

    // Location Section
    "location.title": "Ubicación Privilegiada",
    "location.description":
      "Nuestros hongos crecen en El Castillo, una zona privilegiada entre el Volcán Arenal y el Lago Arenal. Este microclima único, con su humedad constante y suelos volcánicos ricos en minerales, crea las condiciones perfectas para cultivar hongos gourmet de calidad excepcional.",
    "location.province": "El Castillo, Provincia de Alajuela",
    "location.phone": "+506 8709 0777",

    // Footer
    "footer.tagline": "Hongos gourmet del Volcán Arenal • El Castillo, Costa Rica",
    "footer.whatsappAvailable": "WhatsApp disponible",
    "footer.location": "El Castillo, Alajuela",
    "footer.copyright": "© 2025 Lava Setas. Todos los derechos reservados.",

    // WhatsApp Message
    "whatsapp.greeting": "¡Hola! Me gustaría hacer un pedido de Lava Setas:",
    "whatsapp.total": "Total:",
    "whatsapp.confirmation": "Por favor confirmen disponibilidad y tiempo de entrega en El Castillo. ¡Gracias!",
  },
  en: {
    // Header
    "header.location": "El Castillo, Costa Rica",
    "header.region": "Arenal Region",
    "header.cart": "Cart",

    // Hero Section
    "hero.title": "Gourmet Mushrooms",
    "hero.subtitle": "from Arenal Volcano",
    "hero.description":
      "We cultivate premium mushrooms in El Castillo, taking advantage of the unique climate near Arenal Volcano and Lake Arenal to create exceptional flavors.",
    "hero.viewProducts": "View Products",
    "hero.whatsapp": "WhatsApp: +506 8709 0777",

    // Products Section
    "products.title": "Our Mushrooms",
    "products.description": "Fresh mushrooms grown with organic techniques in El Castillo's unique microclimate",
    "products.inSeason": "In Season",
    "products.add": "Add",
    "products.per": "per",

    // Product Names & Descriptions
    "product.greyOyster.name": "Grey Oyster Mushrooms",
    "product.greyOyster.description":
      "Delicate, earthy flavor with a tender texture. Perfect for stir-fries and soups.",
    "product.whiteOyster.name": "White Oyster Mushrooms",
    "product.whiteOyster.description": "Mild, sweet flavor with firm texture. Excellent grilled or sautéed.",
    "product.lionsMane.name": "Lion's Mane Mushrooms",
    "product.lionsMane.description": "Unique seafood-like texture with a savory umami flavor. Great meat substitute.",

    // Cart
    "cart.summary": "Order Summary",
    "cart.total": "Total:",
    "cart.orderWhatsApp": "Order via WhatsApp",

    // Location Section
    "location.title": "Privileged Location",
    "location.description":
      "Our mushrooms grow in El Castillo, a privileged area between Arenal Volcano and Lake Arenal. This unique microclimate, with its constant humidity and volcanic soils rich in minerals, creates perfect conditions for cultivating exceptional quality gourmet mushrooms.",
    "location.province": "El Castillo, Alajuela Province",
    "location.phone": "+506 8709 0777",

    // Footer
    "footer.tagline": "Gourmet mushrooms from Arenal Volcano • El Castillo, Costa Rica",
    "footer.whatsappAvailable": "WhatsApp available",
    "footer.location": "El Castillo, Alajuela",
    "footer.copyright": "© 2025 Lava Setas. All rights reserved.",

    // WhatsApp Message
    "whatsapp.greeting": "Hello! I would like to place an order from Lava Setas:",
    "whatsapp.total": "Total:",
    "whatsapp.confirmation": "Please confirm availability and delivery time in El Castillo. Thank you!",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
