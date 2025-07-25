"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Printer,
  Edit3,
  BookOpen,
  Layers,
  PenTool,
  MessageCircle,
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Package,
  GraduationCap,
  Monitor,
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
    title: "Document Printing",
    description: "High-quality printing services for assignments, projects, and academic documents",
    features: [
      "Assignment Printing",
      "Project Documentation",
      "Research Papers",
      "Thesis Printing",
      "Color & B/W Options",
      "Multiple Paper Sizes",
    ],
    price: "From ₦20 per page",
    popular: true,
    gradient: "from-blue-500 to-cyan-500",
    location: "Both Branches",
  },
  {
    icon: Edit3,
    title: "Document Editing",
    description: "Professional editing and proofreading services for academic and business documents",
    features: [
      "Grammar & Spelling Check",
      "Content Restructuring",
      "Academic Formatting",
      "Citation Correction",
      "Language Enhancement",
      "Quick Turnaround",
    ],
    price: "From ₦1,000 per document",
    gradient: "from-green-500 to-emerald-500",
    location: "Main Branch (University)",
  },
  {
    icon: FileText,
    title: "Document Formatting",
    description: "Professional formatting for academic papers, reports, and business documents",
    features: [
      "APA/MLA Formatting",
      "Table of Contents",
      "Reference Lists",
      "Header/Footer Setup",
      "Page Numbering",
      "Professional Layout",
    ],
    price: "From ₦500 per document",
    gradient: "from-purple-500 to-violet-500",
    location: "Main Branch (University)",
  },
  {
    icon: Layers,
    title: "Lamination Services",
    description: "Protect your important documents with professional lamination",
    features: [
      "A4 Lamination",
      "A3 Lamination",
      "ID Card Lamination",
      "Certificate Protection",
      "Glossy & Matte Options",
      "Bulk Discounts",
    ],
    price: "From ₦100 per document",
    gradient: "from-orange-500 to-red-500",
    location: "Both Branches",
  },
  {
    icon: BookOpen,
    title: "Document Binding",
    description: "Professional binding services for projects, reports, and academic work",
    features: [
      "Spiral Binding",
      "Perfect Binding",
      "Hardcover Binding",
      "Thesis Binding",
      "Custom Covers",
      "Same Day Service",
    ],
    price: "From ₦500 per document",
    gradient: "from-pink-500 to-rose-500",
    location: "Both Branches",
  },
  {
    icon: PenTool,
    title: "Project Writing & Analysis",
    description: "Expert assistance with project writing, research, and academic analysis",
    features: [
      "Research Assistance",
      "Data Analysis",
      "Project Proposals",
      "Literature Review",
      "Methodology Design",
      "Academic Writing",
    ],
    price: "Custom Pricing",
    gradient: "from-indigo-500 to-blue-500",
    location: "Main Branch (University)",
  },
]

const locations = [
  {
    name: "Main Branch (Educational Services)",
    address: "Shop 4 & 5, behind the faculty of CIS, University of Ilorin PS, Ilorin, Nigeria",
    services: "Student-focused services: Printing, Editing, Formatting, Project Writing",
    icon: GraduationCap,
    color: "text-blue-500",
    primary: true,
  },
  {
    name: "Second Branch (General Services)",
    address: "Gaa-Akanbi Roundabout, Ilorin, Nigeria",
    services: "Computer accessories, General printing, Business services",
    icon: Monitor,
    color: "text-purple-500",
    primary: false,
  },
]

const stats = [
  { icon: Users, label: "Students Served", value: "5,000+", color: "text-blue-500" },
  { icon: CheckCircle, label: "Projects Completed", value: "15,000+", color: "text-green-500" },
  { icon: Award, label: "Years Experience", value: "8+", color: "text-purple-500" },
  { icon: Zap, label: "Average Turnaround", value: "Same Day", color: "text-yellow-500" },
]

const testimonials = [
  {
    name: "Adebayo Ogundimu",
    role: "Computer Science Student",
    content:
      "Perfect for all my academic needs! They printed and bound my final year project beautifully. The editing service also helped improve my writing significantly.",
    rating: 5,
    avatar: "AO",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Business Student",
    content:
      "Excellent document formatting service! They formatted my thesis according to university standards perfectly. Very professional and fast service.",
    rating: 5,
    avatar: "FA",
  },
  {
    name: "Chinedu Okwu",
    role: "Engineering Student",
    content:
      "Great location right behind CIS faculty. Always reliable for printing assignments and projects. The lamination service keeps my certificates safe too!",
    rating: 5,
    avatar: "CO",
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
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">Educational & Business Services</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Academic
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Success Partner
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Professional printing, editing, formatting, and project services for students and professionals in Ilorin
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Consultation
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
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Our Locations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conveniently Located in Ilorin</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Two strategic locations to serve both university students and the general public
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className={`h-full hover:shadow-lg transition-all ${location.primary ? "ring-2 ring-primary/20" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className={`p-3 rounded-lg bg-primary/10`}>
                        <location.icon className={`h-6 w-6 ${location.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {location.name}
                          {location.primary && <Badge className="ml-2 text-xs">Main</Badge>}
                        </CardTitle>
                        <div className="flex items-start space-x-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{location.services}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
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
      <section ref={servicesRef} className="py-20 bg-muted/30">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic & Professional Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for students and professionals in the educational sector
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
                    <Badge variant="outline" className="w-fit mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </Badge>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
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
                            Same day
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

      {/* Testimonials Section */}
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
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Student Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by thousands of students at University of Ilorin and beyond
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

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Us Today</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to get your academic work done professionally? Visit either of our locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Call Us",
                content: "+234 123 456 7890",
                action: "tel:+2341234567890",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "business@smartzglobal.com",
                action: "mailto:business@smartzglobal.com",
              },
              {
                icon: MessageCircle,
                title: "Live Chat",
                content: "Get instant support",
                action: "#",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <contact.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                {contact.title === "Live Chat" ? (
                  <Button
                    variant="link"
                    onClick={() => setShowChat(true)}
                    className="text-muted-foreground hover:text-primary transition-colors p-0"
                  >
                    {contact.content}
                  </Button>
                ) : (
                  <a href={contact.action} className="text-muted-foreground hover:text-primary transition-colors">
                    {contact.content}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
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
