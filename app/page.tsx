"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin, Phone, MessageCircle, Minus, Plus } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { MushroomChatbot } from "@/components/mushroom-chatbot"

// Product data with seasonal pricing
const products = [
  {
    id: 1,
    name: "Grey Oyster Mushrooms",
    scientificName: "Pleurotus ostreatus",
    description: "Delicate, earthy flavor with a tender texture. Perfect for stir-fries and soups.",
    price: 3500, // Costa Rican Colones
    seasonalPrice: 3000,
    inSeason: true,
    image: "/fresh-grey-oyster-mushrooms-pleurotus-ostreatus-ed.png",
    weight: "250g",
  },
  {
    id: 2,
    name: "White Oyster Mushrooms",
    scientificName: "Pleurotus ostreatus var. florida",
    description: "Mild, sweet flavor with firm texture. Excellent grilled or sautéed.",
    price: 3800,
    seasonalPrice: 3200,
    inSeason: false,
    image: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png",
    weight: "250g",
  },
  {
    id: 3,
    name: "Lion's Mane Mushrooms",
    scientificName: "Hericium erinaceus",
    description: "Unique seafood-like texture with a savory umami flavor. Great meat substitute.",
    price: 4500,
    seasonalPrice: 4000,
    inSeason: true,
    image: "/fresh-lions-mane-mushroom-hericium-erinaceus-white.png",
    weight: "200g",
  },
]

export default function LavaSetasStore() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }))
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === Number.parseInt(productId))
      if (product && quantity > 0) {
        const price = product.inSeason ? product.seasonalPrice : product.price
        return total + price * quantity
      }
      return total
    }, 0)
  }

  const getCartItems = () => {
    return Object.entries(cart)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === Number.parseInt(productId))
        return { product, quantity }
      })
      .filter((item) => item.product)
  }

  const generateWhatsAppMessage = () => {
    const cartItems = getCartItems()
    const total = getCartTotal()

    let message = "¡Hola! Me gustaría hacer un pedido de Lava Setas:\n\n"

    cartItems.forEach(({ product, quantity }) => {
      if (product) {
        const price = product.inSeason ? product.seasonalPrice : product.price
        message += `• ${product.name} x${quantity} - ₡${(price * quantity).toLocaleString()}\n`
      }
    })

    message += `\nTotal: ₡${total.toLocaleString()}\n\n`
    message += "Por favor confirmen disponibilidad y tiempo de entrega en El Castillo. ¡Gracias!"

    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/50687090777?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🍄</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Lava Setas</h1>
                <p className="text-sm text-muted-foreground">El Castillo, Costa Rica</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <MapPin className="w-3 h-3 mr-1" />
                Arenal Region
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                onClick={handleWhatsAppOrder}
                disabled={getCartItems().length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getCartItems().length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {Object.values(cart).reduce((sum, qty) => sum + qty, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/arenal-volcano-costa-rica-landscape-with-lush-gree.png"
              alt="Arenal Volcano and lush Costa Rican landscape"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Hongos Gourmet
            <span className="block text-primary">del Volcán Arenal</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Cultivamos hongos premium en El Castillo, aprovechando el clima único cerca del Volcán Arenal y el Lago
            Arenal para crear sabores excepcionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Ver Productos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp: +506 8709 0777
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Nuestros Hongos</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hongos frescos cultivados con técnicas orgánicas en el microclima único de El Castillo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {product.inSeason && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">En Temporada</Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="italic text-sm">{product.scientificName}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        ₡{(product.inSeason ? product.seasonalPrice : product.price).toLocaleString()}
                      </span>
                      {product.inSeason && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ₡{product.price.toLocaleString()}
                        </span>
                      )}
                      <p className="text-sm text-muted-foreground">por {product.weight}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        disabled={!cart[product.id]}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{cart[product.id] || 0}</span>
                      <Button variant="outline" size="sm" onClick={() => addToCart(product.id)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button onClick={() => addToCart(product.id)} className="flex-1 ml-4">
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {getCartItems().length > 0 && (
        <section className="py-8 px-4 bg-card border-t border-border">
          <div className="container mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Resumen del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getCartItems().map(
                    ({ product, quantity }) =>
                      product && (
                        <div key={product.id} className="flex justify-between items-center">
                          <span>
                            {product.name} x{quantity}
                          </span>
                          <span className="font-medium">
                            ₡{((product.inSeason ? product.seasonalPrice : product.price) * quantity).toLocaleString()}
                          </span>
                        </div>
                      ),
                  )}
                  <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">₡{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleWhatsAppOrder} className="w-full text-lg py-6" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ordenar por WhatsApp
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      )}

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Ubicación Privilegiada</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nuestros hongos crecen en El Castillo, una zona privilegiada entre el Volcán Arenal y el Lago Arenal.
                Este microclima único, con su humedad constante y suelos volcánicos ricos en minerales, crea las
                condiciones perfectas para cultivar hongos gourmet de calidad excepcional.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>El Castillo, Provincia de Alajuela</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+506 8709 0777</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Image
                src="/lake-arenal-costa-rica-scenic-view-with-mountains.png"
                alt="Lake Arenal scenic view"
                width={500}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
              <Image
                src="/el-castillo-costa-rica-village-mountain-landscape.png"
                alt="El Castillo village landscape"
                width={500}
                height={200}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-foreground mb-2">Lava Setas</h4>
            <p className="text-muted-foreground">Hongos gourmet del Volcán Arenal • El Castillo, Costa Rica</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+506 8709 0777</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>WhatsApp disponible</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>El Castillo, Alajuela</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
            <p>&copy; 2025 Lava Setas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <MushroomChatbot />
    </div>
  )
}
