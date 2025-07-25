"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { getUserOrders } from "@/lib/supabase"
import { Search, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import type { Order } from "@/lib/types"
import OrderList from "./OrderList" // Declare the OrderList component before using it

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  useEffect(() => {
    filterOrders()
  }, [orders, searchQuery])

  const loadOrders = async () => {
    if (!user) return

    try {
      const ordersData = await getUserOrders(user.id)
      setOrders(ordersData)
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchQuery) {
      filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredOrders(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "processing":
        return <Package className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipped":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      case "pending":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return filteredOrders
    return filteredOrders.filter((order) => order.status === status)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        {/* Search */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <OrderList
              orders={filterOrdersByStatus("all")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <OrderList
              orders={filterOrdersByStatus("pending")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <OrderList
              orders={filterOrdersByStatus("processing")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="shipped" className="space-y-4">
            <OrderList
              orders={filterOrdersByStatus("shipped")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <OrderList
              orders={filterOrdersByStatus("delivered")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
