"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { Users, Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react"

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.firstName}. Here's your business overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦2,450,000</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,567</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Subsidiary Performance */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Sm@rtz Computers</CardTitle>
              <CardDescription>Computer accessories performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Revenue</span>
                  <span className="font-medium">₦1,200,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Orders</span>
                  <span className="font-medium">567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Products</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">75% of target achieved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Sm@rtz Bookshop</CardTitle>
              <CardDescription>Books and educational materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Revenue</span>
                  <span className="font-medium">₦850,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Orders</span>
                  <span className="font-medium">423</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Products</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">68% of target achieved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle>Business Center</CardTitle>
              <CardDescription>Professional services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Revenue</span>
                  <span className="font-medium">₦400,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Orders</span>
                  <span className="font-medium">244</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Services</span>
                  <span className="font-medium">66</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">82% of target achieved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest orders and customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New order", customer: "John Doe", amount: "₦25,000", time: "2 minutes ago" },
                { action: "Product added", customer: "Admin", amount: "USB-C Charger", time: "15 minutes ago" },
                { action: "Customer inquiry", customer: "Jane Smith", amount: "Chat support", time: "1 hour ago" },
                { action: "Order shipped", customer: "Mike Johnson", amount: "₦15,500", time: "2 hours ago" },
                { action: "New customer", customer: "Sarah Wilson", amount: "Registration", time: "3 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.amount}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
