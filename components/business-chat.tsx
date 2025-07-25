"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Send,
  Paperclip,
  Download,
  FileText,
  ImageIcon,
  File,
  User,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { createChatRoom, getChatMessages, sendChatMessage, uploadFile } from "@/lib/supabase"

interface Message {
  id: string
  message: string
  file_url?: string
  file_type?: string
  file_name?: string
  is_from_admin: boolean
  created_at: string
  sender?: {
    name: string
    email: string
  }
}

interface BusinessChatProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: string | null
}

export function BusinessChat({ isOpen, onClose, selectedService }: BusinessChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [roomId, setRoomId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (isOpen && user) {
      initializeChat()
    }
  }, [isOpen, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const initializeChat = async () => {
    if (!user) {
      router.push("/auth/login?redirect=/business-center")
      return
    }

    try {
      setLoading(true)

      // Create a new chat room for business services
      const room = await createChatRoom(user.id, "business")
      setRoomId(room.id)

      // Load existing messages
      const chatMessages = await getChatMessages(room.id)
      setMessages(chatMessages)

      // Send initial message if service is selected
      if (selectedService && chatMessages.length === 0) {
        const initialMessage = `Hi! I'm interested in your ${selectedService} service. Could you please provide more information and pricing?`

        const userMessage: Message = {
          id: `user-${Date.now()}`,
          message: initialMessage,
          is_from_admin: false,
          created_at: new Date().toISOString(),
          sender: {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
          },
        }

        setMessages([userMessage])
        await sendChatMessage(room.id, user.id, initialMessage)
      }

      // Send welcome message from admin
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const welcomeMessage = selectedService
            ? `Hello ${user.first_name}! 👋 Thank you for your interest in our ${selectedService} service. I'll be happy to help you with your requirements. Please share any documents or details about what you need, and I'll provide you with a detailed quote and timeline.`
            : `Hello ${user.first_name}! 👋 Welcome to Sm@rtz Global Business Center. How can I assist you today? Feel free to share any documents or describe the services you need. We offer express delivery options for urgent requests!`

          const adminMessage: Message = {
            id: `admin-${Date.now()}`,
            message: welcomeMessage,
            is_from_admin: true,
            created_at: new Date().toISOString(),
            sender: {
              name: "Business Support",
              email: "business@smartzglobal.com",
            },
          }

          setMessages((prev) => [...prev, adminMessage])
        }, 2000)
      }, 1000)
    } catch (error) {
      console.error("Error initializing chat:", error)
      toast({
        title: "Connection Error",
        description: "Failed to start chat. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId || !user) return

    try {
      const messageText = newMessage.trim()
      setNewMessage("")

      // Add message to local state immediately
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        message: messageText,
        is_from_admin: false,
        created_at: new Date().toISOString(),
        sender: {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        },
      }
      setMessages((prev) => [...prev, tempMessage])

      // Send message to database
      await sendChatMessage(roomId, user.id, messageText)

      // Simulate admin response after a delay
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const adminResponse = generateAdminResponse(messageText)
          const adminMessage: Message = {
            id: `admin-${Date.now()}`,
            message: adminResponse,
            is_from_admin: true,
            created_at: new Date().toISOString(),
            sender: {
              name: "Business Support",
              email: "business@smartzglobal.com",
            },
          }
          setMessages((prev) => [...prev, adminMessage])
        }, 1500)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Send Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const generateAdminResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("price") || message.includes("cost") || message.includes("quote")) {
      return "I'd be happy to provide you with a detailed quote! 💰 Our pricing depends on several factors like quantity, paper type, and finishing options. Could you please share more details about your specific requirements? You can also upload sample files so I can give you an accurate estimate. We also offer express delivery for urgent orders!"
    }

    if (
      message.includes("urgent") ||
      message.includes("rush") ||
      message.includes("asap") ||
      message.includes("express")
    ) {
      return "I understand you need this urgently! ⚡ We offer same-day express delivery services for rush orders. There's typically a 50% rush fee for express service, but we can definitely accommodate your timeline. What's your deadline, and what type of service do you need? We can have it ready within hours!"
    }

    if (message.includes("delivery") || message.includes("shipping")) {
      return "Great question about delivery! 🚚 We offer three options:\n\n📦 **Standard Delivery** (2-3 days) - ₦1,500\n⚡ **Express Delivery** (Same day) - ₦3,000\n🏢 **Pickup Service** (Free) - Collect from our office\n\nWhich option works best for you?"
    }

    if (message.includes("quality") || message.includes("paper") || message.includes("color")) {
      return "We pride ourselves on high-quality output! ✨ We use professional-grade printers and offer various paper options including premium, glossy, matte, and specialty papers. For color printing, we ensure accurate color reproduction with vibrant results. Would you like me to explain our different quality options and paper types?"
    }

    if (message.includes("pickup") || message.includes("collect") || message.includes("office")) {
      return "Perfect! 🏢 You can pick up your order from our office located in Lagos. Pickup is usually ready within 24-48 hours depending on the service (or same day for express orders). We'll send you a notification when your order is ready. Our office hours are 8 AM - 6 PM, Monday to Saturday. Would you prefer pickup or delivery?"
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "You're very welcome! 😊 I'm here to help make this process as smooth as possible for you. Is there anything else you'd like to know about our services or delivery options?"
    }

    return "Thank you for that information! 📋 I'm reviewing your requirements. To provide you with the best service and accurate pricing, could you please share any relevant files or provide more specific details about what you need? I'm here to help make this as smooth as possible for you. We can also arrange express delivery if you need it urgently!"
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !roomId || !user) return

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)

      // Upload file to Supabase storage
      const fileUrl = await uploadFile(file, "business-files")

      // Send message with file
      const fileMessage = `📎 Uploaded file: ${file.name}`

      // Add to local state
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        message: fileMessage,
        file_url: fileUrl,
        file_type: file.type,
        file_name: file.name,
        is_from_admin: false,
        created_at: new Date().toISOString(),
        sender: {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        },
      }
      setMessages((prev) => [...prev, tempMessage])

      // Send to database
      await sendChatMessage(roomId, user.id, fileMessage, fileUrl, file.type)

      // Admin response
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const adminMessage: Message = {
            id: `admin-${Date.now()}`,
            message: `Perfect! I've received your file "${file.name}" 📄. Let me review it and I'll get back to you with a detailed quote and timeline. Is there anything specific you'd like me to know about how you want this processed? Do you need express delivery for this order?`,
            is_from_admin: true,
            created_at: new Date().toISOString(),
            sender: {
              name: "Business Support",
              email: "business@smartzglobal.com",
            },
          }
          setMessages((prev) => [...prev, adminMessage])
        }, 2000)
      }, 1000)

      toast({
        title: "File uploaded successfully",
        description: "Your file has been shared with our team.",
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return File

    if (fileType.startsWith("image/")) return ImageIcon
    if (fileType.includes("pdf") || fileType.includes("document")) return FileText
    return File
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-background border shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Sign In Required</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="mb-4 text-muted-foreground">
              Please sign in to start a chat with our business team and get personalized quotes.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onClose} className="bg-background">
                Cancel
              </Button>
              <Button
                onClick={() => router.push("/auth/login?redirect=/business-center")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign In
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col p-0 bg-background border shadow-xl">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=BS" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="flex items-center gap-2">
                  Business Support Chat
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </DialogTitle>
                <p className="text-sm text-muted-foreground">Professional printing & document services</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-sm text-muted-foreground">Connecting...</span>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.is_from_admin ? "justify-start" : "justify-end"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`max-w-[80%] ${message.is_from_admin ? "order-2" : "order-1"}`}>
                      <div
                        className={`rounded-lg px-4 py-3 shadow-sm ${
                          message.is_from_admin
                            ? "bg-muted text-foreground border"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        }`}
                      >
                        {message.file_url ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-background/10 rounded border">
                              {React.createElement(getFileIcon(message.file_type), {
                                className: "h-4 w-4",
                              })}
                              <span className="text-sm flex-1">{message.file_name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(message.file_url, "_blank")}
                                className="h-6 w-6 p-0 hover:bg-background/20"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                          message.is_from_admin ? "justify-start" : "justify-end"
                        }`}
                      >
                        {message.is_from_admin ? (
                          <Bot className="h-3 w-3 text-blue-500" />
                        ) : (
                          <User className="h-3 w-3 text-purple-500" />
                        )}
                        <span>{formatTime(message.created_at)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted border rounded-lg px-4 py-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-blue-500" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-background">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message or describe what you need..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[60px] resize-none bg-background border focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                title="Upload file"
                className="bg-background hover:bg-accent"
              >
                {uploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <Paperclip className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || loading}
                size="icon"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">Supported files: PDF, DOC, DOCX, TXT, JPG, PNG (max 10MB)</p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Usually responds in minutes</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
