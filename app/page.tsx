"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin, Phone, MessageCircle, Minus, Plus, Languages } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { MushroomChatbot } from "@/components/mushroom-chatbot"
import { useLanguage } from "@/contexts/language-context"

// Product data with seasonal pricing
const products = [
  {
    id: 1,
    nameKey: "product.greyOyster.name",
    scientificName: "Pleurotus ostreatus",
    descriptionKey: "product.greyOyster.description",
    price: 3500, // Costa Rican Colones
    seasonalPrice: 3000,
    inSeason: true,
    image: "/fresh-grey-oyster-mushrooms-pleurotus-ostreatus-ed.png",
    weight: "250g",
  },
  {
    id: 2,
    nameKey: "product.whiteOyster.name",
    scientificName: "Pleurotus ostreatus var. florida",
    descriptionKey: "product.whiteOyster.description",
    price: 3800,
    seasonalPrice: 3200,
    inSeason: false,
    image: "/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png",
    weight: "250g",
  },
  {
    id: 3,
    nameKey: "product.lionsMane.name",
    scientificName: "Hericium erinaceus",
    descriptionKey: "product.lionsMane.description",
    price: 4500,
    seasonalPrice: 4000,
    inSeason: true,
    image: "/fresh-lions-mane-mushroom-hericium-erinaceus-white.png",
    weight: "200g",
  },
]

export default function LavaSetasStore() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const { language, toggleLanguage, t } = useLanguage()

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

    let message = `${t("whatsapp.greeting")}\n\n`

    cartItems.forEach(({ product, quantity }) => {
      if (product) {
        const price = product.inSeason ? product.seasonalPrice : product.price
        message += `• ${t(product.nameKey)} x${quantity} - ₡${(price * quantity).toLocaleString()}\n`
      }
    })

    message += `\n${t("whatsapp.total")} ₡${total.toLocaleString()}\n\n`
    message += t("whatsapp.confirmation")

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
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/fresh-white-oyster-mushrooms-pleurotus-florida-edi.png"
                  alt="Lava Setas Logo - White Oyster Mushroom"
                  width={32}
                  height={32}
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Lava Setas</h1>
                <p className="text-sm text-muted-foreground">{t("header.location")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center space-x-1">
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </Button>
              <Badge variant="secondary" className="hidden sm:flex">
                <MapPin className="w-3 h-3 mr-1" />
                {t("header.region")}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                onClick={handleWhatsAppOrder}
                disabled={getCartItems().length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t("header.cart")}
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
            {t("hero.title")}
            <span className="block text-primary">{t("hero.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t("hero.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              {t("hero.viewProducts")}
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              {t("hero.whatsapp")}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">{t("products.title")}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("products.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={t(product.nameKey)}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {product.inSeason && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      {t("products.inSeason")}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{t(product.nameKey)}</CardTitle>
                  <CardDescription className="italic text-sm">{product.scientificName}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">{t(product.descriptionKey)}</p>
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
                      <p className="text-sm text-muted-foreground">
                        {t("products.per")} {product.weight}
                      </p>
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
                      {t("products.add")}
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
                  {t("cart.summary")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getCartItems().map(
                    ({ product, quantity }) =>
                      product && (
                        <div key={product.id} className="flex justify-between items-center">
                          <span>
                            {t(product.nameKey)} x{quantity}
                          </span>
                          <span className="font-medium">
                            ₡{((product.inSeason ? product.seasonalPrice : product.price) * quantity).toLocaleString()}
                          </span>
                        </div>
                      ),
                  )}
                  <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
                    <span>{t("cart.total")}</span>
                    <span className="text-primary">₡{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleWhatsAppOrder} className="w-full text-lg py-6" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("cart.orderWhatsApp")}
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
              <h3 className="text-3xl font-bold text-foreground mb-6">{t("location.title")}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t("location.description")}</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{t("location.province")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{t("location.phone")}</span>
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
            <p className="text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>{t("location.phone")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>{t("footer.whatsappAvailable")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t("footer.location")}</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>

      <MushroomChatbot />
    </div>
  )
}
