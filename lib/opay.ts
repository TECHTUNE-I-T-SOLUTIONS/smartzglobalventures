// Opay Payment Integration
export interface OpayPaymentRequest {
  amount: number
  currency: string
  reference: string
  customerEmail: string
  customerName: string
  customerPhone: string
  description: string
  callbackUrl: string
  returnUrl: string
}

export interface OpayPaymentResponse {
  status: string
  message: string
  data: {
    reference: string
    authorizationUrl: string
    accessCode: string
  }
}

export interface OpayVerificationResponse {
  status: string
  message: string
  data: {
    reference: string
    amount: number
    status: string
    paidAt: string
    channel: string
  }
}

class OpayService {
  private baseUrl: string
  private publicKey: string
  private secretKey: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_OPAY_BASE_URL || "https://sandboxapi.opaycheckout.com"
    this.publicKey = process.env.NEXT_PUBLIC_OPAY_PUBLIC_KEY || ""
    this.secretKey = process.env.OPAY_SECRET_KEY || ""
  }

  private generateReference(): string {
    return `smartz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async makeRequest(endpoint: string, data: any, method: "GET" | "POST" = "POST") {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.secretKey}`,
    }

    const config: RequestInit = {
      method,
      headers,
    }

    if (method === "POST") {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, config)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Payment request failed")
      }

      return result
    } catch (error) {
      console.error("Opay API Error:", error)
      throw error
    }
  }

  async initializePayment(paymentData: Omit<OpayPaymentRequest, "reference">): Promise<OpayPaymentResponse> {
    const reference = this.generateReference()

    const requestData = {
      ...paymentData,
      reference,
      amount: Math.round(paymentData.amount * 100), // Convert to kobo
    }

    return this.makeRequest("/api/v1/international/payment/initialize", requestData)
  }

  async verifyPayment(reference: string): Promise<OpayVerificationResponse> {
    return this.makeRequest(`/api/v1/international/payment/status?reference=${reference}`, {}, "GET")
  }

  async processRefund(reference: string, amount?: number): Promise<any> {
    const requestData = {
      reference,
      amount: amount ? Math.round(amount * 100) : undefined,
    }

    return this.makeRequest("/api/v1/international/payment/refund", requestData)
  }

  // Bank Transfer Payment
  async initializeBankTransfer(paymentData: Omit<OpayPaymentRequest, "reference">): Promise<any> {
    const reference = this.generateReference()

    const requestData = {
      ...paymentData,
      reference,
      amount: Math.round(paymentData.amount * 100),
      paymentMethod: "bank_transfer",
    }

    return this.makeRequest("/api/v1/international/payment/bank-transfer", requestData)
  }

  // USSD Payment
  async initializeUSSD(paymentData: Omit<OpayPaymentRequest, "reference">, bankCode: string): Promise<any> {
    const reference = this.generateReference()

    const requestData = {
      ...paymentData,
      reference,
      amount: Math.round(paymentData.amount * 100),
      bankCode,
    }

    return this.makeRequest("/api/v1/international/payment/ussd", requestData)
  }

  // Get supported banks
  async getSupportedBanks(): Promise<any> {
    return this.makeRequest("/api/v1/international/misc/banks", {}, "GET")
  }
}

export const opayService = new OpayService()

// React Hook for Opay Integration
export function useOpayPayment() {
  const initializePayment = async (paymentData: {
    amount: number
    customerEmail: string
    customerName: string
    customerPhone: string
    description: string
  }) => {
    try {
      const response = await opayService.initializePayment({
        ...paymentData,
        currency: "NGN",
        callbackUrl: `${window.location.origin}/api/payment/callback`,
        returnUrl: `${window.location.origin}/payment/success`,
      })

      if (response.status === "success") {
        // Redirect to Opay checkout
        window.location.href = response.data.authorizationUrl
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("Payment initialization failed:", error)
      throw error
    }
  }

  const verifyPayment = async (reference: string) => {
    try {
      return await opayService.verifyPayment(reference)
    } catch (error) {
      console.error("Payment verification failed:", error)
      throw error
    }
  }

  return {
    initializePayment,
    verifyPayment,
  }
}
