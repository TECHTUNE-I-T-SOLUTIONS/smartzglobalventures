"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-2">We use cookies</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept",
                    you consent to our use of cookies.{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Learn more
                    </Link>
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={acceptCookies} className="text-xs">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={declineCookies} className="text-xs bg-transparent">
                      Decline
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={declineCookies} className="h-6 w-6 flex-shrink-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
