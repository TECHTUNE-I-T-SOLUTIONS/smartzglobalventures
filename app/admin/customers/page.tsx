"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Mail, Phone, Users, UserPlus, Ban } from "lucide-react"

// Mock customers data
const mockCustomers = [
  {
    id: "user_1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+234 123 456 7890",
    address: "123 Lagos Street, Lagos, Nigeria",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    totalOrders: 5,
    totalSpent: 125000,
    lastOrderDate: "2024-01-20T10:30:00Z",
    createdAt: "2023-06-15T09:00:00Z",
    status: "active",
  },
  {
    id: "user_2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "+234 987 654 3210",
    address: "456 Abuja Avenue, Abuja, Nigeria",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    totalOrders: 12,
    totalSpent: 340000,
    lastOrderDate: "2024-01-19T09:15:00Z",
    createdAt: "2023-03-10T14:30:00Z",
    status: "active",
  },
  {
    id: "user_3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    phone: "+234 555 123 4567",
    address: "789 Port Harcourt Road, Port Harcourt, Nigeria",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    totalOrders: 3,
    totalSpent: 75000,
    lastOrderDate: "2024-01-18T11:00:00Z",
    createdAt: "2023-11-22T16:45:00Z",
    status: "active",
  },
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    filterCustomers()
  }, [customers, searchQuery])

  const filterCustomers = () => {
    let filtered = customers

    if (searchQuery) {
      filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery),
      )
    }

    setFilteredCustomers(filtered)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: customer.status === "active" ? "banned" : "active" }
          : customer,
      ),
    )
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const avgOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0)

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer base and relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">{activeCustomers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Badge className="bg-green-500">₦</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From all customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <Badge className="bg-blue-500">₦</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{Math.round(avgOrderValue).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>
              {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCustomers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No customers found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={customer.avatar || "/placeholder.svg"}
                              alt={`${customer.firstName} ${customer.lastName}`}
                            />
                            <AvatarFallback>{getInitials(customer.firstName, customer.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {customer.firstName} {customer.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Member since {new Date(customer.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="mr-2 h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.totalOrders}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">₦{customer.totalSpent.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(customer.lastOrderDate).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={customer.status === "active" ? "bg-green-500" : "bg-red-500"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => toggleCustomerStatus(customer.id)}
                              className={customer.status === "active" ? "text-red-600" : "text-green-600"}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              {customer.status === "active" ? "Ban Customer" : "Activate Customer"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
