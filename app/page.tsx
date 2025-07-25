import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Subsidiaries } from "@/components/subsidiaries"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="animate-fade-in">
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProducts />
        </Suspense>
        <Subsidiaries />
      </main>
      <Footer />
    </div>
  )
}
