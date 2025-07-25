"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

interface CartIconProps {
  itemCount: number
}

export function CartIcon({ itemCount }: CartIconProps) {
  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
            <Badge className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          </motion.div>
        )}
        <span className="sr-only">Shopping cart</span>
      </Link>
    </Button>
  )
}
