"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock wishlist data - in real app, this would come from Supabase
const mockWishlistItems = [
  {
    id: "1",
    product: {
      id: "1",
      name: "USB-C Fast Charger 65W",
      description: "High-speed USB-C charger compatible with laptops and smartphones",
      price: 15000,
      originalPrice: 18000,
      image: "/placeholder.svg?height=200&width=200&text=USB-C+Charger",
      category: "Chargers",
      subsidiary: "computers" as const,
      inStock: true,
      rating: 4.5,
      reviews: 23,
      discount: 17,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    addedAt: new Date().toISOString(),
  },
  {
    id: "2",
    product: {
      id: "2",
      name: "JavaScript: The Complete Guide",
      description: "Comprehensive guide to modern JavaScript programming",
      price: 8500,
      originalPrice: 10000,
      image: "/placeholder.svg?height=200&width=200&text=JavaScript+Book",
      category: "Programming",
      subsidiary: "books" as const,
      inStock: true,
      rating: 4.8,
      reviews: 89,
      discount: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    addedAt: new Date().toISOString(),
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (itemId: string, productName: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist.`,
    })
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addItem(item.product)
    })
    setWishlistItems([])
    toast({
      title: "All items added to cart",
      description: "All wishlist items have been moved to your cart.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved for later
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button onClick={handleMoveAllToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="animate-slide-up">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Save items you love to your wishlist and come back to them later.
              </p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Remove from wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFromWishlist(item.id, item.product.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    {item.product.discount && <Badge variant="destructive">{item.product.discount}% OFF</Badge>}
                  </div>

                  <Badge className="absolute bottom-2 right-2 bg-primary">{item.product.category}</Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {item.product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{item.product.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">₦{item.product.price.toLocaleString()}</span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{item.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Added date */}
                    <p className="text-xs text-muted-foreground">
                      Added on {new Date(item.addedAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => handleAddToCart(item.product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/products/${item.product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
