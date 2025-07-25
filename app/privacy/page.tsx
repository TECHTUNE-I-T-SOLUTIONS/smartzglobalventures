import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  At Sm@rtz Global Enterprise, we collect information you provide directly to us, such as when you
                  create an account, make a purchase, or contact us for support.
                </p>
                <h4 className="font-semibold mt-4 mb-2">Personal Information:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through Opay)</li>
                  <li>Order history and preferences</li>
                </ul>
                <h4 className="font-semibold mt-4 mb-2">Automatically Collected Information:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Improve our products and services</li>
                  <li>Personalize your shopping experience</li>
                  <li>Send promotional emails (with your consent)</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Service Providers:</strong> With trusted partners who help us operate our business
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> With Opay for secure payment processing
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger or acquisition
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@smartzglobal.com" className="text-primary hover:underline">
                    privacy@smartzglobal.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@smartzglobal.com
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
