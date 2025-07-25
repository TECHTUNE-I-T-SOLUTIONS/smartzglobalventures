"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import Image from "next/image"

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "USB-C Fast Charger 65W",
    description: "High-speed USB-C charger compatible with laptops and smartphones",
    price: 15000,
    originalPrice: 18000,
    image: "/placeholder.svg?height=100&width=100&text=USB-C+Charger",
    category: "Chargers",
    subsidiary: "computers",
    inStock: true,
    quantity: 50,
    rating: 4.5,
    reviews: 23,
    discount: 17,
    featured: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "2",
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to modern JavaScript programming",
    price: 8500,
    originalPrice: 10000,
    image: "/placeholder.svg?height=100&width=100&text=JavaScript+Book",
    category: "Programming",
    subsidiary: "books",
    inStock: true,
    quantity: 40,
    rating: 4.8,
    reviews: 89,
    discount: 15,
    featured: true,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
  },
  {
    id: "3",
    name: "Business Card Design & Print",
    description: "Professional business card design and printing service",
    price: 2500,
    originalPrice: 3000,
    image: "/placeholder.svg?height=100&width=100&text=Business+Cards",
    category: "Design",
    subsidiary: "business",
    inStock: true,
    quantity: 100,
    rating: 4.7,
    reviews: 67,
    discount: 17,
    featured: false,
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-19T13:30:00Z",
  },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    filterProducts()
  }, [products, searchQuery])

  const filterProducts = () => {
    let filtered = products

    if (searchQuery) {
      filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subsidiary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const filterProductsBySubsidiary = (subsidiary: string) => {
    if (subsidiary === "all") return filteredProducts
    return filteredProducts.filter((product) => product.subsidiary === subsidiary)
  }

  const getSubsidiaryBadgeColor = (subsidiary: string) => {
    switch (subsidiary) {
      case "computers":
        return "bg-blue-500"
      case "books":
        return "bg-green-500"
      case "business":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  const toggleFeatured = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, featured: !product.featured } : product)),
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your product catalog across all subsidiaries</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Search */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, category, or subsidiary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Tabs */}
        <Tabs defaultValue="all" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Products
              <Badge variant="secondary" className="ml-2">
                {filteredProducts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="computers">
              Computers
              <Badge variant="secondary" className="ml-2">
                {filterProductsBySubsidiary("computers").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="books">
              Books
              <Badge variant="secondary" className="ml-2">
                {filterProductsBySubsidiary("books").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="business">
              Business
              <Badge variant="secondary" className="ml-2">
                {filterProductsBySubsidiary("business").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ProductTable
              products={filterProductsBySubsidiary("all")}
              getSubsidiaryBadgeColor={getSubsidiaryBadgeColor}
              handleDeleteProduct={handleDeleteProduct}
              toggleFeatured={toggleFeatured}
            />
          </TabsContent>

          <TabsContent value="computers" className="space-y-4">
            <ProductTable
              products={filterProductsBySubsidiary("computers")}
              getSubsidiaryBadgeColor={getSubsidiaryBadgeColor}
              handleDeleteProduct={handleDeleteProduct}
              toggleFeatured={toggleFeatured}
            />
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <ProductTable
              products={filterProductsBySubsidiary("books")}
              getSubsidiaryBadgeColor={getSubsidiaryBadgeColor}
              handleDeleteProduct={handleDeleteProduct}
              toggleFeatured={toggleFeatured}
            />
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <ProductTable
              products={filterProductsBySubsidiary("business")}
              getSubsidiaryBadgeColor={getSubsidiaryBadgeColor}
              handleDeleteProduct={handleDeleteProduct}
              toggleFeatured={toggleFeatured}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

function ProductTable({
  products,
  getSubsidiaryBadgeColor,
  handleDeleteProduct,
  toggleFeatured,
}: {
  products: any[]
  getSubsidiaryBadgeColor: (subsidiary: string) => string
  handleDeleteProduct: (id: string) => void
  toggleFeatured: (id: string) => void
}) {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or add a new product.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subsidiary</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getSubsidiaryBadgeColor(product.subsidiary)}>{product.subsidiary}</Badge>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">₦{product.price.toLocaleString()}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className={product.inStock ? "text-green-700" : "text-red-700"}>
                    {product.inStock ? `${product.quantity} in stock` : "Out of stock"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {product.featured && <Badge className="bg-yellow-500">Featured</Badge>}
                  {product.discount > 0 && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleFeatured(product.id)}>
                      <Package className="mr-2 h-4 w-4" />
                      {product.featured ? "Remove from Featured" : "Add to Featured"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
