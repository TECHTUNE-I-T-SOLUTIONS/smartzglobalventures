"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Check, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase, saveSecurityQuestions } from "@/lib/supabase"

const securityQuestions = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your elementary school?",
  "What is your favorite movie?",
  "What was your childhood nickname?",
  "What is the name of your best friend?",
  "What was your first car?",
  "What is your favorite food?",
  "What was the name of your first teacher?",
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  securityQuestions: Array<{
    question: string
    answer: string
  }>
}

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    securityQuestions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  })

  const router = useRouter()
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateSecurityQuestion = (index: number, field: "question" | "answer", value: string) => {
    setFormData((prev) => ({
      ...prev,
      securityQuestions: prev.securityQuestions.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
    }))
  }

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let score = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    Object.values(checks).forEach((check) => {
      if (check) score += 20
    })

    return { score, checks }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const getStrengthColor = (score: number) => {
    if (score < 40) return "bg-red-500"
    if (score < 60) return "bg-orange-500"
    if (score < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (score: number) => {
    if (score < 40) return "Weak"
    if (score < 60) return "Fair"
    if (score < 80) return "Good"
    return "Strong"
  }

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Validation Error",
        description: "First name is required",
        variant: "destructive",
      })
      return false
    }
    if (!formData.lastName.trim()) {
      toast({
        title: "Validation Error",
        description: "Last name is required",
        variant: "destructive",
      })
      return false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone number is required",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (passwordStrength.score < 60) {
      toast({
        title: "Validation Error",
        description: "Please choose a stronger password",
        variant: "destructive",
      })
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const validateStep3 = () => {
    const questions = formData.securityQuestions

    // Check if all questions are selected and answered
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].answer.trim()) {
        toast({
          title: "Validation Error",
          description: `Please complete security question ${i + 1}`,
          variant: "destructive",
        })
        return false
      }
    }

    // Check for duplicate questions
    const selectedQuestions = questions.map((q) => q.question)
    const uniqueQuestions = new Set(selectedQuestions)
    if (uniqueQuestions.size !== selectedQuestions.length) {
      toast({
        title: "Validation Error",
        description: "Please select different security questions",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return

    try {
      setLoading(true)

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Save security questions
        await saveSecurityQuestions(authData.user.id, formData.securityQuestions)

        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        })

        router.push("/auth/login?message=Please check your email to verify your account")
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            placeholder="Create a strong password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        {formData.password && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password strength:</span>
              <Badge variant={passwordStrength.score >= 80 ? "default" : "secondary"}>
                {getStrengthText(passwordStrength.score)}
              </Badge>
            </div>
            <Progress value={passwordStrength.score} className="h-2" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className={`flex items-center gap-1 ${passwordStrength.checks.length ? "text-green-600" : "text-muted-foreground"}`}
              >
                {passwordStrength.checks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                8+ characters
              </div>
              <div
                className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? "text-green-600" : "text-muted-foreground"}`}
              >
                {passwordStrength.checks.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                Uppercase letter
              </div>
              <div
                className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? "text-green-600" : "text-muted-foreground"}`}
              >
                {passwordStrength.checks.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                Lowercase letter
              </div>
              <div
                className={`flex items-center gap-1 ${passwordStrength.checks.number ? "text-green-600" : "text-muted-foreground"}`}
              >
                {passwordStrength.checks.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                Number
              </div>
              <div
                className={`flex items-center gap-1 ${passwordStrength.checks.special ? "text-green-600" : "text-muted-foreground"}`}
              >
                {passwordStrength.checks.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                Special character
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Security Questions</h3>
        <p className="text-sm text-muted-foreground">
          These questions will help you recover your account if you forget your password
        </p>
      </div>

      {formData.securityQuestions.map((q, index) => (
        <div key={index} className="space-y-2">
          <Label>Security Question {index + 1}</Label>
          <Select value={q.question} onValueChange={(value) => updateSecurityQuestion(index, "question", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a security question" />
            </SelectTrigger>
            <SelectContent>
              {securityQuestions
                .filter(
                  (question) => !formData.securityQuestions.some((sq, i) => i !== index && sq.question === question),
                )
                .map((question) => (
                  <SelectItem key={question} value={question}>
                    {question}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Your answer"
            value={q.answer}
            onChange={(e) => updateSecurityQuestion(index, "answer", e.target.value)}
          />
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join Sm@rtz Global Enterprise - Step {currentStep} of 3</CardDescription>
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
              {currentStep < 3 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              )}
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
