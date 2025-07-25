import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsent } from "@/components/cookie-consent"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sm@rtz Global Enterprise - Your One-Stop Digital Store",
  description:
    "Computer accessories, books, and business services all in one place. Quality products with reliable delivery.",
  keywords: "computer accessories, books, business center, online store, Nigeria",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
              <CookieConsent />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
