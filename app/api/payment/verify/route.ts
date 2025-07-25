import { type NextRequest, NextResponse } from "next/server"
import { opayService } from "@/lib/opay"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    const verification = await opayService.verifyPayment(reference)

    return NextResponse.json(verification)
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
