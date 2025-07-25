import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/10 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=40&width=40&text=SG"
                alt="Sm@rtz Global Enterprise"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">Sm@rtz Global</h3>
                <p className="text-sm text-muted-foreground">Enterprise</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for computer accessories, books, and business services. Quality products with
              exceptional customer service.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Subsidiaries */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Our Subsidiaries</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/computers" className="text-sm hover:text-primary transition-colors">
                  Sm@rtz Computers
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-sm hover:text-primary transition-colors">
                  Sm@rtz Bookshop
                </Link>
              </li>
              <li>
                <Link href="/business-center" className="text-sm hover:text-primary transition-colors">
                  Business Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Connected</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@smartzglobal.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="text-sm" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 Sm@rtz Global Enterprise. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">
            CEO: <span className="font-medium">Eneji Daniel Moses</span>
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
