"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Home, Monitor, Book, Building, Info, Phone, User, LogIn } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: Array<{ name: string; href: string }>
  user?: any
}

export function MobileMenu({ isOpen, onClose, navigation, user }: MobileMenuProps) {
  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Computers", href: "/computers", icon: Monitor },
    { name: "Books", href: "/books", icon: Book },
    { name: "Business Center", href: "/business-center", icon: Building },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sm@rtz Global
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t">
            {user ? (
              <div className="space-y-3">
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/dashboard" onClick={onClose}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/auth/login" onClick={onClose}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/signup" onClick={onClose}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
