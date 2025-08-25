import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Lava Setas - Gourmet Mushrooms | El Castillo, Costa Rica",
  description:
    "Premium gourmet mushrooms from El Castillo, Costa Rica. Fresh Grey Oyster, White Oyster, and Lion's Mane mushrooms grown near Arenal Volcano. Order via WhatsApp for local delivery.",
  keywords:
    "gourmet mushrooms, Costa Rica, El Castillo, Arenal, oyster mushrooms, lion's mane, organic mushrooms, fresh mushrooms, local farm, volcanic soil, premium mushrooms, hongos gourmet, hongos frescos, Pleurotus ostreatus, Hericium erinaceus",
  authors: [{ name: "Lava Setas" }],
  creator: "Lava Setas",
  publisher: "Lava Setas",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png", sizes: "32x32", type: "image/png" },
      { url: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png",
    shortcut: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png",
  },
  openGraph: {
    title: "Lava Setas - Premium Gourmet Mushrooms | El Castillo, Costa Rica",
    description:
      "Fresh gourmet mushrooms from El Castillo, Costa Rica. Order Grey Oyster (₡3,500), White Oyster (₡3,800), and Lion's Mane (₡4,500) mushrooms via WhatsApp +506 8709 0777.",
    url: "https://lavasetas.com",
    siteName: "Lava Setas",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/arenal-volcano-costa-rica-landscape-with-lush-gree.png",
        width: 1200,
        height: 630,
        alt: "Lava Setas - Gourmet Mushrooms from El Castillo, Costa Rica near Arenal Volcano",
      },
      {
        url: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png",
        width: 800,
        height: 600,
        alt: "Fresh White Oyster Mushrooms - Lava Setas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lava Setas - Premium Gourmet Mushrooms",
    description: "Fresh gourmet mushrooms from El Castillo, Costa Rica. Order via WhatsApp +506 8709 0777",
    images: ["/arenal-volcano-costa-rica-landscape-with-lush-gree.png"],
  },
  other: {
    "geo.region": "CR-A",
    "geo.placename": "El Castillo, Alajuela, Costa Rica",
    "geo.position": "10.4667;-84.7167",
    ICBM: "10.4667, -84.7167",
    "business:contact_data:phone_number": "+50687090777",
    "business:contact_data:country_name": "Costa Rica",
    "business:contact_data:region": "Alajuela",
    "business:contact_data:locality": "El Castillo",
    "product:price:currency": "CRC",
    "product:availability": "in stock",
  },
  viewport: "width=device-width, initial-scale=1",
  generator: "Lava Setas Store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
