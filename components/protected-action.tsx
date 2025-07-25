"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProtectedActionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
}

export function ProtectedAction({ children, fallback, requireAuth = true }: ProtectedActionProps) {
  const { user } = useAuth()
  const { toast } = useToast()

  const handleUnauthorizedAction = () => {
    toast({
      title: "Sign in required",
      description: "Please sign in to perform this action.",
      action: (
        <Button asChild size="sm">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      ),
    })
  }

  if (requireAuth && !user) {
    return <div onClick={handleUnauthorizedAction}>{fallback || children}</div>
  }

  return <>{children}</>
}
