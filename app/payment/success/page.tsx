"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Mail, Package } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reference) {
      verifyPayment()
    }
  }, [reference])

  const verifyPayment = async () => {
    try {
      const response = await fetch(`/api/payment/verify?reference=${reference}`)
      const result = await response.json()

      if (result.status === "success") {
        setPaymentDetails(result.data)
      }
    } catch (error) {
      console.error("Payment verification failed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="animate-slide-up">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>Your order has been confirmed and is being processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentDetails && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Order Reference:</span>
                    <Badge variant="outline">{paymentDetails.reference}</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Amount Paid:</span>
                    <span className="font-bold text-lg">₦{paymentDetails.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Payment Method:</span>
                    <span className="capitalize">{paymentDetails.channel}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Transaction Date:</span>
                    <span>{new Date(paymentDetails.paidAt).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm">You'll receive an order confirmation email shortly</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="text-sm">Your order will be processed within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-primary" />
                    <span className="text-sm">Track your order in your dashboard</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild className="flex-1">
                  <Link href="/dashboard/orders">View Order Details</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
