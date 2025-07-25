import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getProductsByCategory } from "@/lib/supabase"

export default async function ComputersPage() {
  const products = await getProductsByCategory("computers")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Sm@rtz Computers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Premium computer accessories, chargers, cables, and tech solutions for all your computing needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <CategoryFilter category="computers" />
          </aside>

          <div className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
