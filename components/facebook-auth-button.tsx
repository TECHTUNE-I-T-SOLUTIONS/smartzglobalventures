"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Facebook } from "lucide-react"

interface FacebookAuthButtonProps {
  mode: "signin" | "signup"
  className?: string
}

export function FacebookAuthButton({ mode, className }: FacebookAuthButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFacebookAuth = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error("Facebook auth error:", error)
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to authenticate with Facebook",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleFacebookAuth}
      disabled={loading}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600 ${className}`}
    >
      <Facebook className="mr-2 h-4 w-4" />
      {loading ? "Connecting..." : `Continue with Facebook`}
    </Button>
  )
}
