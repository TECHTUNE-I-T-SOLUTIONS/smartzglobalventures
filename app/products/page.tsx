"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getAllProducts } from "@/lib/supabase"
import { Search, Grid3X3, List, SlidersHorizontal, Package, Star, TrendingUp, Zap } from "lucide-react"

const categories = [
  { value: "all", label: "All Products" },
  { value: "computers", label: "Computer Accessories" },
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "accessories", label: "Accessories" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "popular", label: "Most Popular" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter((product) => product.price >= Number.parseFloat(priceRange.min))
    }
    if (priceRange.max) {
      filtered = filtered.filter((product) => product.price <= Number.parseFloat(priceRange.max))
    }

    // Sort products
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "popular":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("newest")
    setPriceRange({ min: "", max: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Package className="h-10 w-10 text-primary" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover our extensive collection of premium computer accessories, books, and electronics. Quality
                products with fast delivery and excellent customer service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Badge variant="secondary" className="text-sm">
                  <Star className="mr-1 h-4 w-4" />
                  4.9/5 Customer Rating
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  1000+ Products
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Zap className="mr-1 h-4 w-4" />
                  Fast Delivery
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min price"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Max price"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                    className="w-24"
                  />
                </div>

                <Button variant="outline" onClick={clearFilters}>
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Clear
                </Button>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <LoadingSpinner />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all products</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
