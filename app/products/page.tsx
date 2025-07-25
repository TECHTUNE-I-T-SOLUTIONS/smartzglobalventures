"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Grid, List, SlidersHorizontal, Star, Package, Zap, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getAllProducts } from "@/lib/supabase"

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
  created_at: string
}

const categories = ["All Categories", "Laptops", "Desktops", "Accessories", "Software", "Books", "Business Services"]

const subsidiaries = [
  { value: "all", label: "All Subsidiaries", icon: Package },
  { value: "computers", label: "Computers", icon: Package },
  { value: "books", label: "Books", icon: Package },
  { value: "business", label: "Business Center", icon: Package },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "rating", label: "Highest Rated" },
  { value: "featured", label: "Featured First" },
]

const features = [
  { icon: Zap, text: "Fast Delivery", color: "text-yellow-500" },
  { icon: Shield, text: "Secure Payment", color: "text-green-500" },
  { icon: Truck, text: "Express Shipping", color: "text-blue-500" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState("newest")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubsidiary,
    priceRange,
    showInStockOnly,
    showFeaturedOnly,
    sortBy,
  ])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      setProducts(data)

      // Set initial price range based on products
      if (data.length > 0) {
        const prices = data.map((p) => p.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        setPriceRange([minPrice, maxPrice])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Subsidiary filter
    if (selectedSubsidiary !== "all") {
      filtered = filtered.filter((product) => product.subsidiary === selectedSubsidiary)
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // In stock filter
    if (showInStockOnly) {
      filtered = filtered.filter((product) => product.in_stock)
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter((product) => product.featured)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price
        case "price_desc":
          return b.price - a.price
        case "name_asc":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    setFilteredProducts(filtered)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setSelectedSubsidiary("all")
    if (products.length > 0) {
      const prices = products.map((p) => p.price)
      setPriceRange([Math.min(...prices), Math.max(...prices)])
    }
    setShowInStockOnly(false)
    setShowFeaturedOnly(false)
    setSortBy("newest")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Search Products</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subsidiary */}
      <div>
        <label className="text-sm font-medium mb-2 block">Subsidiary</label>
        <Select value={selectedSubsidiary} onValueChange={setSelectedSubsidiary}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {subsidiaries.map((subsidiary) => (
              <SelectItem key={subsidiary.value} value={subsidiary.value}>
                <div className="flex items-center space-x-2">
                  <subsidiary.icon className="h-4 w-4" />
                  <span>{subsidiary.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
        </label>
        <Slider value={priceRange} onValueChange={setPriceRange} max={1000000} min={0} step={10000} className="mt-2" />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
          <label htmlFor="inStock" className="text-sm flex items-center">
            <Package className="h-4 w-4 mr-1 text-green-500" />
            In Stock Only
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
          <label htmlFor="featured" className="text-sm flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            Featured Products
          </label>
        </div>
      </div>

      {/* Reset Filters */}
      <Button variant="outline" onClick={resetFilters} className="w-full bg-background">
        Reset All Filters
      </Button>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-3xl p-12 mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                All Products
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our complete range of computers, books, and business services with express delivery options
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <motion.div
            className="hidden lg:block w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="sticky top-24 bg-background border shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h2>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters and Controls */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-background">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-background border-r">
                    <SheetHeader>
                      <SheetTitle className="flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results Count */}
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg bg-background">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Active Filters */}
            <AnimatePresence>
              {(searchQuery ||
                selectedCategory !== "All Categories" ||
                selectedSubsidiary !== "all" ||
                showInStockOnly ||
                showFeaturedOnly) && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setSearchQuery("")}
                    >
                      Search: {searchQuery} ×
                    </Badge>
                  )}
                  {selectedCategory !== "All Categories" && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setSelectedCategory("All Categories")}
                    >
                      Category: {selectedCategory} ×
                    </Badge>
                  )}
                  {selectedSubsidiary !== "all" && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setSelectedSubsidiary("all")}
                    >
                      Subsidiary: {subsidiaries.find((s) => s.value === selectedSubsidiary)?.label} ×
                    </Badge>
                  )}
                  {showInStockOnly && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setShowInStockOnly(false)}
                    >
                      In Stock Only ×
                    </Badge>
                  )}
                  {showFeaturedOnly && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setShowFeaturedOnly(false)}
                    >
                      Featured Only ×
                    </Badge>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                  <Button
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Reset All Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="products-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
