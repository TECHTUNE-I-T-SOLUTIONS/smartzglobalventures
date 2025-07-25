import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No products found</p>
          <p>Try adjusting your filters or search terms</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
