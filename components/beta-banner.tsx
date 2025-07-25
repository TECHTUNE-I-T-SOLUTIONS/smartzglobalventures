"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Phone, Mail, MapPin, Zap, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Zap, text: "Fast Delivery", color: "text-yellow-400" },
  { icon: Shield, text: "Secure Payment", color: "text-green-400" },
  { icon: Truck, text: "Express Shipping", color: "text-blue-400" },
]

const contactInfo = [
  { icon: Phone, text: "+234 123 456 7890", color: "text-blue-300" },
  { icon: Mail, text: "info@smartzglobal.com", color: "text-purple-300" },
  { icon: MapPin, text: "Ilorin, Nigeria", color: "text-pink-300" },
]

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentContact, setCurrentContact] = useState(0)

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2000)

    const contactInterval = setInterval(() => {
      setCurrentContact((prev) => (prev + 1) % contactInfo.length)
    }, 3000)

    return () => {
      clearInterval(featureInterval)
      clearInterval(contactInterval)
    }
  }, [])

  if (!isVisible) return null

  const CurrentFeatureIcon = features[currentFeature].icon
  const CurrentContactIcon = contactInfo[currentContact].icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0">
            {/* Left Side - Beta Announcement */}
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex-shrink-0"
              >
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <span className="font-bold text-sm lg:text-base">
                  <motion.span
                    animate={{ color: ["#ffffff", "#fbbf24", "#ffffff"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    NEW🎉
                  </motion.span>{" "}
                  We just launched our website!
                </span>
                <span className="hidden sm:inline text-xs lg:text-sm opacity-90 ml-2">
                  Currently in beta - your feedback helps us improve.
                </span>
              </motion.div>
            </div>

            {/* Center - Rotating Contact Info */}
            <div className="flex items-center justify-center flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentContact}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <CurrentContactIcon className={`h-4 w-4 ${contactInfo[currentContact].color}`} />
                  <span className="text-sm font-medium">{contactInfo[currentContact].text}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Rotating Features */}
            <div className="flex items-center space-x-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <CurrentFeatureIcon className={`h-4 w-4 ${features[currentFeature].color}`} />
                  <span className="text-sm font-medium hidden sm:inline">{features[currentFeature].text}</span>
                </motion.div>
              </AnimatePresence>

              {/* Close Button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="sm:hidden mt-2 text-center"
          >
            <span className="text-xs opacity-90">Currently in beta - your feedback helps us improve.</span>
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400"
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
