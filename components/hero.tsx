"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"

const heroSlides = [
  {
    title: "Welcome to Sm@rtz Global Enterprise",
    subtitle: "Your One-Stop Digital Store",
    description: "Discover premium computer accessories, books, and professional business services all in one place.",
    image: "/placeholder.svg?height=600&width=800&text=Hero+1",
    cta: "Shop Now",
    link: "/products",
  },
  {
    title: "Sm@rtz Computers",
    subtitle: "Premium Tech Accessories",
    description: "High-quality chargers, cables, and computer accessories with fast delivery across Nigeria.",
    image: "/placeholder.svg?height=600&width=800&text=Computers",
    cta: "Browse Computers",
    link: "/computers",
  },
  {
    title: "Sm@rtz Bookshop",
    subtitle: "Knowledge at Your Fingertips",
    description: "Extensive collection of educational, professional, and recreational books for every reader.",
    image: "/placeholder.svg?height=600&width=800&text=Books",
    cta: "Explore Books",
    link: "/books",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentHero.image || "/placeholder.svg"}
          alt={currentHero.title}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <Badge className="mb-4 bg-primary text-primary-foreground">⭐ Trusted by 10,000+ Customers</Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{currentHero.title}</h1>

          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{currentHero.subtitle}</h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{currentHero.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <Link href={currentHero.link}>
                {currentHero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Quality Products</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
