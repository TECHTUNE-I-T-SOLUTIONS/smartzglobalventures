"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Minimize2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

export function CustomerSupportBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! 👋 I'm Sm@rtz CS, your virtual assistant for Sm@rtz Global Enterprise. I can help you with information about our products, services, locations, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: `You are Sm@rtz CS, a helpful customer service assistant for Sm@rtz Global Enterprise. 
          
          Company Information:
          - We are an educational and technology services company
          - We have two locations in Ilorin, Nigeria:
            1. Main Branch (Educational Services): Shop 4 & 5, behind the faculty of CIS, University of Ilorin PS - Specializing in student services
            2. Second Branch (General Services): Gaa-Akanbi Roundabout - Computer accessories and broader services
          
          Services we offer:
          - Document printing (assignments, projects, documents)
          - Document editing and formatting
          - Lamination services
          - Document binding
          - Project analysis and writing
          - Computer accessories
          - Academic document preparation
          
          Contact Information:
          - Phone: +234 123 456 7890
          - Email: info@smartzglobal.com
          - Business Email: business@smartzglobal.com
          
          Business Hours:
          - Monday - Friday: 8:00 AM - 6:00 PM
          - Saturday: 9:00 AM - 5:00 PM
          - Sunday: Closed
          
          Pricing (approximate):
          - Document printing: From ₦20 per page
          - Lamination: From ₦100 per document
          - Binding: From ₦500 per document
          - Document editing: From ₦1,000 per document
          - Project writing: Custom pricing
          
          Always be helpful, professional, and provide accurate information about our services. Use emojis appropriately and keep responses concise but informative.`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini")
      }

      const data = await response.json()
      return (
        data.response ||
        "I apologize, but I'm having trouble processing your request right now. Please try again or contact us directly."
      )
    } catch (error) {
      console.error("Gemini API error:", error)
      return "I'm experiencing some technical difficulties. Please try again later or contact us at +234 123 456 7890 for immediate assistance."
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const botResponse = await generateGeminiResponse(inputMessage)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
                size="icon"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <MessageCircle className="h-7 w-7 relative z-10" />
              </Button>
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="h-5 w-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "60px" : "500px",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden"
          >
            <Card className="h-full border-0">
              <CardHeader className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Bot className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-sm font-bold">Sm@rtz CS</CardTitle>
                      <div className="flex items-center space-x-1">
                        <motion.div
                          className="h-2 w-2 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs opacity-90">AI Assistant Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0 hover:bg-white/20"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[440px]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                        >
                          <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`rounded-lg px-3 py-2 text-sm ${
                                message.isBot
                                  ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border"
                                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{message.content}</div>
                            </motion.div>
                            <div
                              className={`flex items-center mt-1 text-xs text-muted-foreground ${
                                message.isBot ? "justify-start" : "justify-end"
                              }`}
                            >
                              {message.isBot ? <Bot className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg px-3 py-2 max-w-[80%] border">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-purple-500 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-indigo-500 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ask me anything about Sm@rtz Global..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isTyping}
                        className="flex-1 border-2 focus:border-blue-500 transition-colors"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || isTyping}
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
