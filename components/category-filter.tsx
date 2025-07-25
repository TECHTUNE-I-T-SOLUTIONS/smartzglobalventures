"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CategoryFilterProps {
  category: string
}

const computerCategories = ["Chargers", "Cables", "Accessories", "Storage", "Audio"]

const bookCategories = ["Programming", "Business", "Technology", "Education", "Fiction"]

const businessCategories = ["Printing", "Design", "Editing", "Consultation"]

export function CategoryFilter({ category }: CategoryFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categories =
    category === "computers" ? computerCategories : category === "books" ? bookCategories : businessCategories

  const brands =
    category === "computers"
      ? ["Apple", "Samsung", "Anker", "Belkin", "Generic"]
      : category === "books"
        ? ["Pearson", "McGraw-Hill", "O'Reilly", "Packt", "Manning"]
        : ["Sm@rtz Design", "Premium Print", "Express Service"]

  const handleCategoryChange = (cat: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, cat])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 100000])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={1000} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => handleCategoryChange(cat, checked as boolean)}
                  />
                  <label htmlFor={cat} className="text-sm cursor-pointer">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brands */}
          <div>
            <h3 className="font-medium mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleCategoryChange(cat, false)}
                    >
                      {cat} ×
                    </Badge>
                  ))}
                  {selectedBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      {brand} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
