"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock search results - in real app, this would come from Supabase
const mockSearchResults = [
  {
    id: "1",
    name: "USB-C Fast Charger 65W",
    description: "High-speed USB-C charger compatible with laptops and smartphones",
    price: 15000,
    originalPrice: 18000,
    image: "/placeholder.svg?height=300&width=300&text=USB-C+Charger",
    category: "Chargers",
    subsidiary: "computers" as const,
    inStock: true,
    rating: 4.5,
    reviews: 23,
    discount: 17,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to modern JavaScript programming",
    price: 8500,
    originalPrice: 10000,
    image: "/placeholder.svg?height=300&width=300&text=JavaScript+Book",
    category: "Programming",
    subsidiary: "books" as const,
    inStock: true,
    rating: 4.8,
    reviews: 89,
    discount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState(mockSearchResults)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    performSearch(query)
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Filter mock results based on query
      const filtered = mockSearchResults.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setResults(filtered)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64">
        <CategoryFilter category="all" />
      </aside>

      <div className="flex-1">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <Badge variant="outline">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </Badge>
          </div>

          {query && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" />
                  <span>Showing results for:</span>
                  <Badge variant="secondary">"{query}"</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <ProductGrid products={results} />
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
