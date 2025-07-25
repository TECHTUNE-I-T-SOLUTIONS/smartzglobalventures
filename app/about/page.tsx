import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sm@rtz Global Enterprise</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your trusted partner for computer accessories, books, and professional business services. We're committed to
            providing quality products and exceptional customer service across Nigeria.
          </p>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=800&text=About+Us+Hero"
              alt="Sm@rtz Global Enterprise Office"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* CEO Section */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Image
                    src="/placeholder.svg?height=400&width=300&text=CEO+Photo"
                    alt="Eneji Daniel Moses - CEO"
                    width={300}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-primary">CEO & Founder</Badge>
                    </div>
                    <CardTitle className="text-2xl">Eneji Daniel Moses</CardTitle>
                    <CardDescription className="text-lg">Visionary Leader & Technology Enthusiast</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground mb-4">
                      With over a decade of experience in technology and business, Eneji Daniel Moses founded Sm@rtz
                      Global Enterprise with a vision to bridge the gap between quality products and accessible services
                      in Nigeria.
                    </p>
                    <p className="text-muted-foreground">
                      Under his leadership, the company has grown to serve thousands of customers across multiple
                      subsidiaries, maintaining a commitment to excellence, innovation, and customer satisfaction.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-slide-up">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide high-quality computer accessories, educational resources, and professional business
                  services that empower individuals and businesses to achieve their goals. We strive to be the most
                  trusted and reliable partner for all your digital and business needs.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading multi-subsidiary enterprise in Nigeria, known for innovation, quality, and
                  exceptional customer service. We envision a future where technology and knowledge are accessible to
                  everyone, driving growth and prosperity across our communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and shape our relationships with customers, partners, and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center animate-slide-up">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quality Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every product and service we offer meets the highest standards of
                  excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. We listen, understand, and deliver solutions that
                  exceed expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We embrace new technologies and innovative approaches to continuously improve our products and
                  services.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <Card className="bg-primary text-primary-foreground animate-slide-up">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
                  <div className="text-sm opacity-90">Subsidiaries</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Customer Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
