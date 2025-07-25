import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  By accessing and using the Sm@rtz Global Enterprise website and services, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Permission is granted to temporarily download one copy of the materials on Sm@rtz Global Enterprise's
                  website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                  transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>3. Product Information and Pricing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We strive to provide accurate product descriptions and pricing information. However, we do not warrant
                  that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Prices are subject to change without notice</li>
                  <li>We reserve the right to correct pricing errors</li>
                  <li>Product availability is subject to change</li>
                  <li>Colors and specifications may vary from images shown</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>4. Orders and Payment</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>By placing an order, you agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate and complete information</li>
                  <li>Pay all charges incurred by you or any users of your account</li>
                  <li>Accept responsibility for all orders placed under your account</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to refuse or cancel orders at our discretion, including orders that appear to be
                  placed by dealers, resellers, or distributors.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>5. Shipping and Delivery</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We will make every effort to deliver products within the estimated timeframe. However, delivery dates
                  are estimates and we are not liable for delays caused by:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Weather conditions or natural disasters</li>
                  <li>Carrier delays or issues</li>
                  <li>Incorrect or incomplete shipping information</li>
                  <li>Customs delays for international orders</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle>6. Returns and Refunds</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Our return policy allows for returns within 30 days of purchase, subject to the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Items must be in original condition and packaging</li>
                  <li>Proof of purchase is required</li>
                  <li>Customer is responsible for return shipping costs</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  In no event shall Sm@rtz Global Enterprise or its suppliers be liable for any damages (including,
                  without limitation, damages for loss of data or profit, or due to business interruption) arising out
                  of the use or inability to use the materials on our website, even if we have been notified orally or
                  in writing of the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle>8. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>For questions about these Terms of Service, please contact us:</p>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Email:</strong> legal@smartzglobal.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 (0) 123 456 7890
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Technology Street, Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
