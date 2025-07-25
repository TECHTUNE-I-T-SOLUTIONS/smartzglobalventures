"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Printer,
  Scan,
  Copy,
  BookMarkedIcon as Binding,
  Camera,
  MessageCircle,
  Upload,
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  Zap,
  Truck,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Package,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BusinessChat } from "@/components/business-chat"
import { useAuth } from "@/hooks/use-auth"

const services = [
  {
    icon: Printer,
    title: "Professional Printing",
    description: "High-quality color and black & white printing services for all your business needs",
    features: ["Color Printing", "Black & White", "Large Format", "Photo Printing", "Business Cards", "Flyers"],
    price: "From ₦50 per page",
    popular: true,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Scan,
    title: "Document Scanning",
    description: "Convert your physical documents to digital format with high precision",
    features: [
      "High Resolution",
      "Multiple Formats",
      "Bulk Scanning",
      "OCR Available",
      "Cloud Storage",
      "Secure Processing",
    ],
    price: "From ₦30 per page",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Copy,
    title: "Photocopying",
    description: "Fast and reliable photocopying services with professional quality",
    features: ["Single/Double Sided", "Collating", "Stapling", "Bulk Orders", "Same Day Service", "Quality Guarantee"],
    price: "From ₦20 per page",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Binding,
    title: "Document Binding",
    description: "Professional binding for reports, presentations, and important documents",
    features: ["Spiral Binding", "Perfect Binding", "Hardcover", "Lamination", "Custom Covers", "Bulk Discounts"],
    price: "From ₦500 per document",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Camera,
    title: "Passport Photos",
    description: "Professional passport and ID photos that meet all official requirements",
    features: ["Instant Printing", "Multiple Copies", "Digital Copies", "Retouching", "All Sizes", "Express Service"],
    price: "₦2,000 for 4 copies",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: FileText,
    title: "Document Services",
    description: "Complete document preparation, typing, and formatting services",
    features: ["CV Writing", "Letter Typing", "Formatting", "Proofreading", "Translation", "Express Delivery"],
    price: "From ₦1,000 per document",
    gradient: "from-indigo-500 to-blue-500",
  },
]

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+", color: "text-blue-500" },
  { icon: CheckCircle, label: "Projects Completed", value: "50,000+", color: "text-green-500" },
  { icon: Award, label: "Years Experience", value: "15+", color: "text-purple-500" },
  { icon: Zap, label: "Average Turnaround", value: "24hrs", color: "text-yellow-500" },
]

const testimonials = [
  {
    name: "Adebayo Johnson",
    role: "Business Owner",
    content:
      "Excellent service! They printed my business cards and flyers with amazing quality. Very professional team and fast delivery.",
    rating: 5,
    avatar: "AJ",
  },
  {
    name: "Sarah Okafor",
    role: "Student",
    content:
      "Perfect for all my academic printing needs. Fast, affordable, and great quality. The express delivery saved my presentation!",
    rating: 5,
    avatar: "SO",
  },
  {
    name: "Michael Chen",
    role: "Consultant",
    content:
      "Their document binding service is top-notch. My presentations always look professional. Highly recommend their services!",
    rating: 5,
    avatar: "MC",
  },
]

const deliveryOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    description: "2-3 business days",
    price: "₦1,500",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description: "Same day delivery",
    price: "₦3,000",
    color: "text-orange-500",
  },
  {
    icon: Package,
    title: "Pickup Service",
    description: "Collect from our office",
    price: "Free",
    color: "text-green-500",
  },
]

export default function BusinessCenterPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const servicesRef = useRef<HTMLDivElement>(null)

  const handleServiceRequest = (serviceTitle: string) => {
    if (!user) {
      router.push("/auth/login?redirect=/business-center")
      return
    }
    setSelectedService(serviceTitle)
    setShowChat(true)
  }

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Professional Business Services</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Business Solution
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Professional printing, scanning, document services, and express delivery - all under one roof
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Instant Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-auto bg-transparent"
                onClick={scrollToServices}
              >
                View Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <motion.div
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Phone className="h-4 w-4" />
                <span>+234 123 456 7890</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Mail className="h-4 w-4" />
                <span>business@smartzglobal.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Business Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to meet all your business document and printing needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-background border">
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  />

                  <CardHeader className="relative">
                    <div
                      className={`bg-gradient-to-br ${service.gradient} text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-primary">{service.price}</span>
                            <p className="text-xs text-muted-foreground">Starting price</p>
                          </div>
                          <Badge variant="outline" className="bg-background">
                            <Clock className="h-3 w-3 mr-1" />
                            24hr delivery
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handleServiceRequest(service.title)}
                          className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all`}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Request Service
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Delivery Options Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Delivery Options</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fast & Reliable Delivery</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our flexible delivery options to get your documents when you need them
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all bg-background border">
                  <CardContent className="p-8">
                    <div
                      className={`${option.color} bg-current/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}
                    >
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    <div className={`text-2xl font-bold ${option.color}`}>{option.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-muted-foreground">Get your documents processed in just a few easy steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload & Chat",
                description: "Share your files through our secure chat system and describe your requirements",
                icon: Upload,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "2",
                title: "Get Quote",
                description: "Receive instant pricing, timeline estimates, and delivery options",
                icon: Clock,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "3",
                title: "Receive Results",
                description: "Get your professionally processed documents via pickup or express delivery",
                icon: CheckCircle,
                color: "from-green-500 to-emerald-500",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-0" />
                )}

                <div className="relative z-10">
                  <div
                    className={`bg-gradient-to-br ${step.color} text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg`}
                  >
                    {step.step}
                  </div>
                  <step.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-all bg-background border">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Contact us today for professional business services with express delivery options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chat Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-auto bg-transparent"
                onClick={() => window.open("tel:+2341234567890")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: +234 123 456 7890
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Business Chat Component */}
      <AnimatePresence>
        {showChat && (
          <BusinessChat isOpen={showChat} onClose={() => setShowChat(false)} selectedService={selectedService} />
        )}
      </AnimatePresence>
    </div>
  )
}
