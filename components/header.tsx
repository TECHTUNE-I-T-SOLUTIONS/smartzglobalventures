"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Phone,
  Mail,
  MapPin,
  Home,
  Package,
  Monitor,
  BookOpen,
  Building2,
  Info,
  MessageCircle,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Welcome to Sm@rtz Global",
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    description: "Browse all our products",
    submenu: [
      { name: "All Products", href: "/products", icon: Package },
      { name: "Computers", href: "/computers", icon: Monitor },
      { name: "Books", href: "/books", icon: BookOpen },
      { name: "Accessories", href: "/products?category=accessories", icon: Star },
    ],
  },
  {
    name: "Computers",
    href: "/computers",
    icon: Monitor,
    description: "Latest computers & laptops",
  },
  {
    name: "Books",
    href: "/books",
    icon: BookOpen,
    description: "Educational & professional books",
  },
  {
    name: "Business Center",
    href: "/business-center",
    icon: Building2,
    description: "Professional business services",
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
    description: "Learn about our company",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: MessageCircle,
    description: "Get in touch with us",
  },
]

const features = [
  { icon: Zap, text: "Fast Delivery", color: "text-yellow-500" },
  { icon: Shield, text: "Secure Payment", color: "text-green-500" },
  { icon: Truck, text: "Express Shipping", color: "text-blue-500" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { items } = useCart()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/95 border-b shadow-lg"
          : "bg-background/80 backdrop-blur-sm border-b"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <motion.div
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-4 w-4" />
                <span>+234 123 456 7890</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="h-4 w-4" />
                <span>info@smartzglobal.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </motion.div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center space-x-1 text-xs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <feature.icon className={`h-3 w-3 ${feature.color}`} />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="font-bold text-xl">SG</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Sm@rtz Global
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Enterprise Solutions</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium hover:text-primary transition-colors">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-64 p-2 bg-background border rounded-lg shadow-lg">
                          {item.submenu.map((subItem) => (
                            <NavigationMenuLink key={subItem.name} asChild>
                              <Link
                                href={subItem.href}
                                className="flex items-center space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <subItem.icon className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          pathname === item.href ? "bg-accent text-accent-foreground" : ""
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search products, books, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile Search */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <Search className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto bg-background border-b">
                  <form onSubmit={handleSearch} className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search products, books, services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 w-full"
                    />
                  </form>
                </SheetContent>
              </Sheet>
            </div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {cartItemsCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                        >
                          {cartItemsCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders" className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/wishlist" className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild className="hover:bg-accent">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background border-l">
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile User Info */}
                    {user ? (
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2 border-b pb-4">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                            Sign In
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="bg-transparent">
                          <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                            Sign Up
                          </Link>
                        </Button>
                      </div>
                    )}

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 text-lg font-medium py-3 px-4 rounded-lg hover:bg-accent transition-colors ${
                            pathname === item.href ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile User Menu */}
                    {user && (
                      <>
                        <div className="border-t pt-4">
                          <nav className="flex flex-col space-y-2">
                            <Link
                              href="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 text-sm py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Home className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              href="/dashboard/orders"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 text-sm py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Package className="h-4 w-4" />
                              <span>My Orders</span>
                            </Link>
                            <Link
                              href="/dashboard/wishlist"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 text-sm py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Star className="h-4 w-4" />
                              <span>Wishlist</span>
                            </Link>
                            <Link
                              href="/dashboard/profile"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 text-sm py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                            >
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                            {user.role === "admin" && (
                              <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 text-sm py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                              >
                                <Shield className="h-4 w-4" />
                                <span>Admin Panel</span>
                              </Link>
                            )}
                          </nav>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleSignOut()
                            setIsOpen(false)
                          }}
                          className="mt-4 bg-transparent"
                        >
                          Sign Out
                        </Button>
                      </>
                    )}

                    {/* Mobile Theme Toggle */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
