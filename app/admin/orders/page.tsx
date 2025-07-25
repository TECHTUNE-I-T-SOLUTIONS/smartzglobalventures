"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { OrderTable } from "./OrderTable" // Import OrderTable component

// Mock orders data
const mockOrders = [
  {
    id: "ord_1234567890",
    userId: "user_1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { productName: "USB-C Fast Charger 65W", quantity: 2, price: 15000 },
      { productName: "HDMI Cable 2m", quantity: 1, price: 3500 },
    ],
    total: 33500,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "opay",
    shippingAddress: "123 Lagos Street, Lagos, Nigeria",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "ord_0987654321",
    userId: "user_2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [{ productName: "JavaScript: The Complete Guide", quantity: 1, price: 8500 }],
    total: 8500,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "card",
    shippingAddress: "456 Abuja Avenue, Abuja, Nigeria",
    createdAt: "2024-01-19T09:15:00Z",
    updatedAt: "2024-01-20T16:20:00Z",
  },
  {
    id: "ord_1122334455",
    userId: "user_3",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    items: [{ productName: "Business Card Design & Print", quantity: 1, price: 2500 }],
    total: 2500,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "bank",
    shippingAddress: "789 Port Harcourt Road, Port Harcourt, Nigeria",
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-19T13:30:00Z",
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    filterOrders()
  }, [orders, searchQuery])

  const filterOrders = () => {
    let filtered = orders

    if (searchQuery) {
      filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredOrders(filtered)
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return filteredOrders
    return filteredOrders.filter((order) => order.status === status)
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

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      ),
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Package className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "processing").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer name, email, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              All Orders
              <Badge variant="secondary" className="ml-2">
                {filteredOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("all")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("pending")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("processing")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="shipped" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("shipped")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("delivered")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <OrderTable
              orders={filterOrdersByStatus("cancelled")}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
