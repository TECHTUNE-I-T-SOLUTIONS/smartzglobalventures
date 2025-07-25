"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface ServiceCardProps {
  service: Product
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleBookService = async () => {
    setIsLoading(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Service booked successfully!",
      description: `${service.name} has been added to your cart.`,
    })

    setIsLoading(false)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={service.image || "/placeholder.svg?height=200&width=300&text=Service"}
          alt={service.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Service type badge */}
        <Badge className="absolute top-2 right-2 bg-primary">{service.category}</Badge>

        {/* Quick turnaround indicator */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <Clock className="h-3 w-3" />
          <span>Quick Service</span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
        <CardDescription className="line-clamp-2">{service.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Features */}
        {service.features && (
          <div className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(service.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({service.reviews || 0} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₦{service.price.toLocaleString()}</span>
            {service.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ₦{service.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {service.discount && <Badge variant="destructive">{service.discount}% OFF</Badge>}
        </div>
      </CardContent>

      <CardFooter className="flex space-x-2">
        <Button className="flex-1" onClick={handleBookService} disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Service"}
        </Button>
        <Button variant="outline" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
