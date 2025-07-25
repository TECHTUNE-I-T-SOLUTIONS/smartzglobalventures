"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase, saveSecurityQuestions } from "@/lib/supabase"
import { Shield, ArrowRight } from "lucide-react"

const securityQuestionOptions = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favorite book?",
  "What city were you born in?",
  "What was your childhood nickname?",
  "What is the name of your best friend from childhood?",
  "What was the make of your first car?",
  "What is your favorite movie?",
  "What street did you grow up on?",
]

export default function SecurityQuestionsPage() {
  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
    }
    checkUser()
  }, [router])

  const handleQuestionChange = (index: number, question: string) => {
    const newQuestions = [...questions]
    newQuestions[index].question = question
    setQuestions(newQuestions)
  }

  const handleAnswerChange = (index: number, answer: string) => {
    const newQuestions = [...questions]
    newQuestions[index].answer = answer
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Validate all questions are filled
    const isValid = questions.every((q) => q.question && q.answer.trim())
    if (!isValid) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all security questions and answers.",
        variant: "destructive",
      })
      return
    }

    // Check for duplicate questions
    const questionTexts = questions.map((q) => q.question)
    const uniqueQuestions = new Set(questionTexts)
    if (uniqueQuestions.size !== questionTexts.length) {
      toast({
        title: "Duplicate Questions",
        description: "Please select different security questions.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await saveSecurityQuestions(user.id, questions)

      toast({
        title: "Security Questions Set!",
        description: "Your account security has been enhanced.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error saving security questions:", error)
      toast({
        title: "Error",
        description: "Failed to save security questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Secure Your Account</CardTitle>
            <CardDescription className="text-base">
              Set up security questions to help recover your account if needed
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <Label className="text-sm font-medium">Security Question {index + 1}</Label>
                  <Select value={q.question} onValueChange={(value) => handleQuestionChange(index, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a security question" />
                    </SelectTrigger>
                    <SelectContent>
                      {securityQuestionOptions
                        .filter((option) => !questions.some((q, i) => i !== index && q.question === option))
                        .map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="text"
                    placeholder="Your answer"
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="mt-2"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-6"
              >
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Setting up..." : "Complete Setup"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
