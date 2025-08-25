import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lava Setas - Gourmet Mushrooms | El Castillo, Costa Rica",
  description:
    "Premium gourmet mushrooms from El Castillo, Costa Rica. Fresh Grey Oyster, White Oyster, and Lion's Mane mushrooms grown near Arenal Volcano. Order via WhatsApp for local delivery.",
  keywords:
    "gourmet mushrooms, Costa Rica, El Castillo, Arenal, oyster mushrooms, lion's mane, organic mushrooms, fresh mushrooms, local farm",
  authors: [{ name: "Lava Setas" }],
  creator: "Lava Setas",
  publisher: "Lava Setas",
  robots: "index, follow",
  openGraph: {
    title: "Lava Setas - Premium Gourmet Mushrooms",
    description:
      "Fresh gourmet mushrooms from El Castillo, Costa Rica. Order Grey Oyster, White Oyster, and Lion's Mane mushrooms via WhatsApp.",
    url: "https://lavasetas.com",
    siteName: "Lava Setas",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/lava-setas-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Lava Setas - Gourmet Mushrooms from Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lava Setas - Premium Gourmet Mushrooms",
    description: "Fresh gourmet mushrooms from El Castillo, Costa Rica",
    images: ["/images/lava-setas-hero.jpg"],
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
      <body>{children}</body>
    </html>
  )
}
