"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallback() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          toast({
            title: "Authentication Error",
            description: "Failed to complete authentication",
            variant: "destructive",
          })
          router.push("/auth/login")
          return
        }

        if (data.session?.user) {
          const user = data.session.user

          // Check if user exists in our users table
          const { data: existingUser, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single()

          if (userError && userError.code !== "PGRST116") {
            console.error("Error checking user:", userError)
            throw userError
          }

          // If user doesn't exist, create them
          if (!existingUser) {
            const userData = {
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(" ")[0] || "",
              last_name:
                user.user_metadata?.last_name || user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
              name:
                user.user_metadata?.full_name ||
                `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim(),
              role: "user",
              auth_provider: user.app_metadata?.provider || "google",
              avatar_url: user.user_metadata?.avatar_url,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }

            const { error: insertError } = await supabase.from("users").insert([userData])

            if (insertError) {
              console.error("Error creating user:", insertError)
              throw insertError
            }

            // Check if user has security questions
            const { data: securityQuestions } = await supabase
              .from("security_questions")
              .select("*")
              .eq("user_id", user.id)

            if (!securityQuestions || securityQuestions.length === 0) {
              // Redirect to security questions setup
              router.push("/auth/security-questions")
              return
            }
          }

          // User exists or was created successfully, redirect to dashboard
          toast({
            title: "Welcome!",
            description: "You have been successfully signed in.",
          })
          router.push("/dashboard")
        } else {
          router.push("/auth/login")
        }
      } catch (error: any) {
        console.error("Auth callback error:", error)
        toast({
          title: "Authentication Error",
          description: error.message || "Something went wrong during authentication",
          variant: "destructive",
        })
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router, toast])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Completing authentication...</p>
        </div>
      </div>
    )
  }

  return null
}
