"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId)
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
    })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(total * 0.1)
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const finalTotal = total - discount
  const shipping = finalTotal > 50000 ? 0 : 2500

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center animate-fade-in">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image || "/placeholder.svg?height=80&width=80&text=Product"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.product.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{item.product.category}</Badge>
                        <Badge className="bg-primary">{item.product.subsidiary}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-0">
                        <p className="font-bold text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()} each</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.productId, item.product.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart} className="text-red-500 hover:text-red-700 bg-transparent">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium mb-2">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₦{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                  </div>

                  {shipping === 0 && finalTotal > 50000 && (
                    <p className="text-xs text-green-600">Free shipping on orders over ₦50,000!</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₦{(finalTotal + shipping).toLocaleString()}</span>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Secure checkout powered by Opay</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
