import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, BookOpen, FileText, ArrowRight } from "lucide-react"

const subsidiaries = [
  {
    name: "Sm@rtz Computers",
    description: "Premium computer accessories, chargers, cables, and tech solutions for all your computing needs.",
    icon: Monitor,
    image: "/placeholder.svg?height=300&width=400&text=Computers",
    link: "/computers",
    features: ["Quality Accessories", "Fast Delivery", "Warranty Support", "Competitive Prices"],
  },
  {
    name: "Sm@rtz Bookshop",
    description: "Extensive collection of educational, professional, and recreational books for every reader.",
    icon: BookOpen,
    image: "/placeholder.svg?height=300&width=400&text=Books",
    link: "/books",
    features: ["Wide Selection", "Educational Books", "Digital & Physical", "Author Recommendations"],
  },
  {
    name: "Business Center",
    description: "Professional document editing, printing, and business services to support your ventures.",
    icon: FileText,
    image: "/placeholder.svg?height=300&width=400&text=Business",
    link: "/business-center",
    features: ["Document Editing", "Professional Printing", "Business Cards", "Quick Turnaround"],
  },
]

export function Subsidiaries() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Subsidiaries</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three specialized divisions working together to serve all your digital and business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subsidiaries.map((subsidiary, index) => {
            const IconComponent = subsidiary.icon
            return (
              <Card
                key={subsidiary.name}
                className="group hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={subsidiary.image || "/placeholder.svg"}
                    alt={subsidiary.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <IconComponent className="h-8 w-8 mb-2" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold">{subsidiary.name}</CardTitle>
                  <CardDescription className="text-base">{subsidiary.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {subsidiary.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full group" asChild>
                    <Link href={subsidiary.link}>
                      Explore {subsidiary.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
