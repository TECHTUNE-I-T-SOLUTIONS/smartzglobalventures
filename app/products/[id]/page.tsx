"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { getProductById } from "@/lib/supabase"
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Headphones, Minus, Plus } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    try {
      const productData = await getProductById(productId)
      setProduct(productData)
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    })
  }

  const handleAddToWishlist = () => {
    if (!product) return

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = [product.image, product.image, product.image] // Mock multiple images

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 animate-slide-up">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={images[selectedImage] || "/placeholder.svg?height=600&width=600&text=Product"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg?height=80&width=80&text=Thumb"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-primary">{product.category}</Badge>
                <Badge variant="outline">{product.subsidiary}</Badge>
                {product.isNew && <Badge className="bg-green-500">New</Badge>}
              </div>

              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews || 0} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free shipping over ₦50,000</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Headphones className="h-4 w-4 text-primary" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>{product.description}</p>

                  {product.features && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specifications available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    {product.reviews || 0} review{(product.reviews || 0) !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No reviews yet. Be the first to review this product!</p>
                    <Button className="mt-4">Write a Review</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
