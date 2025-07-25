"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Chrome } from "lucide-react"

interface GoogleAuthButtonProps {
  mode: "signin" | "signup"
  className?: string
}

export function GoogleAuthButton({ mode, className }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleGoogleAuth = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error("Google auth error:", error)
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to authenticate with Google",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleAuth}
      disabled={loading}
      className={`w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300 ${className}`}
    >
      <Chrome className="mr-2 h-4 w-4" />
      {loading ? "Connecting..." : `Continue with Google`}
    </Button>
  )
}
