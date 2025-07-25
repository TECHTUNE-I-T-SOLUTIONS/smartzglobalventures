"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    // Simulate newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })

    setEmail("")
    setLoading(false)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Mail className="h-8 w-8" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest products, services, and exclusive offers
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
                <Button type="submit" disabled={loading} className="bg-white text-blue-600 hover:bg-blue-50">
                  {loading ? "Subscribing..." : "Subscribe"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-xs text-blue-200 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
