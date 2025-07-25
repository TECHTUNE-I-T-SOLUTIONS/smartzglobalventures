
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Facebook } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FacebookAuthButtonProps {
  mode: "signin" | "signup"
  className?: string
}

export function FacebookAuthButton({ mode, className }: FacebookAuthButtonProps) {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const { toast } = useToast()

  const handleFacebookAuth = async () => {
    setShowComingSoon(true)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={handleFacebookAuth}
        disabled={false}
        className={`w-full bg-gray-100 hover:bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-60 ${className}`}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Continue with Facebook
      </Button>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook Login
            </DialogTitle>
            <DialogDescription className="text-center py-4">
              🚀 Facebook authentication is coming soon! 
              <br />
              <br />
              For now, please use Google authentication or create an account with your email.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowComingSoon(false)}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700"
            >
              Got it! 😄
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
