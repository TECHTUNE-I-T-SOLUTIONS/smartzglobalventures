"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  Menu,
  LogIn,
  UserPlus,
  Home,
  BookOpen,
  Monitor,
  Phone,
  Building2,
  Sparkles,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { UserMenu } from "./user-menu"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { BetaBanner } from "./beta-banner"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Books", href: "/books", icon: BookOpen },
  { name: "Computers", href: "/computers", icon: Monitor },
  { name: "Business Center", href: "/business-center", icon: Building2 },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, loading } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <BetaBanner />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <motion.div
                    className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Sm@rtz Global
                  </h1>
                  <p className="text-xs text-muted-foreground">Enterprise</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-300"
                          : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 focus:border-blue-500 transition-all duration-200"
                />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="h-9 w-9 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemsCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                      >
                        {cartItemsCount}
                      </motion.div>
                    )}
                  </Button>
                </Link>
              </motion.div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Auth Buttons / User Menu */}
              {loading ? (
                <div className="h-9 w-20 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
              ) : user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/auth/signup">
                      <Button
                        size="sm"
                        className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-gradient-to-b from-background to-muted/20">
                    <div className="flex flex-col space-y-4 mt-8">
                      {/* Mobile Navigation */}
                      <nav className="space-y-2">
                        {navigation.map((item) => {
                          const isActive = pathname === item.href
                          const Icon = item.icon
                          return (
                            <motion.div key={item.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Link
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-300"
                                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                                <span>{item.name}</span>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </nav>

                      {/* Mobile Auth Buttons */}
                      {!user && (
                        <div className="space-y-3 pt-4 border-t">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                              >
                                <LogIn className="h-4 w-4 mr-2" />
                                Sign In
                              </Button>
                            </Link>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Sign Up
                              </Button>
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t py-3"
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 w-full bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
                      autoFocus
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
