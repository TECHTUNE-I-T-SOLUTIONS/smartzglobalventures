import { Suspense } from "react"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Subsidiaries } from "@/components/subsidiaries"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CustomerSupportBot } from "@/components/customer-support-bot"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Hero />

      <Suspense fallback={<LoadingSpinner />}>
        <div className="space-y-16 py-16">
          <FeaturedProducts />
          <StatsSection />
          <Subsidiaries />
          <TestimonialsSection />
          <NewsletterSection />
        </div>
      </Suspense>

      <CustomerSupportBot />
    </div>
  )
}
