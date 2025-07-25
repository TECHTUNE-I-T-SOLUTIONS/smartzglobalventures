import { type NextRequest, NextResponse } from "next/server"
import { opayService } from "@/lib/opay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { amount, customerEmail, customerName, customerPhone, description } = body

    if (!amount || !customerEmail || !customerName) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
    }

    const paymentData = {
      amount: Number.parseFloat(amount),
      currency: "NGN",
      customerEmail,
      customerName,
      customerPhone: customerPhone || "",
      description: description || "Sm@rtz Global Enterprise Purchase",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    }

    const response = await opayService.initializePayment(paymentData)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}
