"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Eye, Package, Zap, Truck, BadgeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  image: string
  category: string
  subsidiary: string
  in_stock: boolean
  rating: number
  reviews_count: number
  discount: number
  featured: boolean
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      product,
      quantity: 1,
      price: product.price
    })
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))
  }

  const getSubsidiaryColor = (subsidiary: string) => {
    switch (subsidiary) {
      case 'computers':
        return 'bg-blue-500'
      case 'books':
        return 'bg-green-500'
      case 'business':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getSubsidiaryIcon = (subsidiary: string) => {
    switch (subsidiary) {
      case 'computers':
        return Package
      case 'books':
        return Package
      case 'business':
        return Package
      default:
        return Package
    }
  }

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-background border">
          <div className="flex">
            {/* Image Section */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse rounded-l-lg" />
              <Image
                src={product.image || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`}
                alt={product.name}
                fill
                className={`object-cover rounded-l-lg transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    -{product.discount}%
                  </Badge>
                )}
                {!product.in_stock && (
                  <Badge variant="secondary" className="text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                  onClick={handleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={`${getSubsidiaryColor(product.subsidiary)} text-white text-xs`}>
                    {product.subsidiary}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{product.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviews_count})
                  </span>
                </div>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₦{product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Truck className="h-3 w-3" />
                    <span>Express delivery</span>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-background border">
        {/* Image Section */}
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
          <Image
            src={product.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                <BadgeIcon className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {product.discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{product.discount}%
              </Badge>
            )}
            {!product.in_stock && (
              <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-lg"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Express Delivery Badge */}
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="secondary" className="bg-green-500 text-white text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Express
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={`${getSubsidiaryColor(product.subsidiary)} text-white text-xs`}>
              {product.subsidiary}
            </Badge>
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews_count})
              </span>
            </div>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-base mb-2 hover:text-primary transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-3 line-\
