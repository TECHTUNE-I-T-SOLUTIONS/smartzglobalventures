"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mail, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { getSecurityQuestions, verifySecurityAnswers } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([])
  const [securityAnswers, setSecurityAnswers] = useState(["", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  const handleEmailSubmit = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const questions = await getSecurityQuestions(email)

      if (questions.length === 0) {
        toast({
          title: "Account Not Found",
          description: "No account found with this email address",
          variant: "destructive",
        })
        return
      }

      setSecurityQuestions(questions)
      setCurrentStep(2)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve security questions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSecurityAnswers = async () => {
    if (securityAnswers.some((answer) => !answer.trim())) {
      toast({
        title: "Incomplete Answers",
        description: "Please answer all security questions",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const isValid = await verifySecurityAnswers(email, securityAnswers)

      if (!isValid) {
        toast({
          title: "Incorrect Answers",
          description: "One or more security answers are incorrect",
          variant: "destructive",
        })
        return
      }

      setCurrentStep(3)
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to verify security answers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // In a real implementation, you would update the password in the database
      // For now, we'll simulate success
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully",
      })

      router.push("/auth/login?message=Password reset successful. Please sign in with your new password.")
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold">Enter Your Email</h3>
        <p className="text-sm text-muted-foreground">We'll use this to find your security questions</p>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold">Security Verification</h3>
        <p className="text-sm text-muted-foreground">Answer your security questions to verify your identity</p>
      </div>

      {securityQuestions.map((question, index) => (
        <div key={index}>
          <Label htmlFor={`answer-${index}`}>
            Question {index + 1}: {question}
          </Label>
          <Input
            id={`answer-${index}`}
            value={securityAnswers[index]}
            onChange={(e) => {
              const newAnswers = [...securityAnswers]
              newAnswers[index] = e.target.value
              setSecurityAnswers(newAnswers)
            }}
            placeholder="Your answer"
          />
        </div>
      ))}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Lock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold">Create New Password</h3>
        <p className="text-sm text-muted-foreground">Choose a strong password for your account</p>
      </div>

      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        {confirmPassword && newPassword !== confirmPassword && (
          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Step {currentStep} of 3 - Recover your account</CardDescription>
          <Progress value={(currentStep / 3) * 100} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            <div className="ml-auto">
              {currentStep === 1 && (
                <Button onClick={handleEmailSubmit} disabled={loading}>
                  {loading ? "Searching..." : "Continue"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              {currentStep === 2 && (
                <Button onClick={handleSecurityAnswers} disabled={loading}>
                  {loading ? "Verifying..." : "Verify"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              {currentStep === 3 && (
                <Button onClick={handlePasswordReset} disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              )}
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Remember your password? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
