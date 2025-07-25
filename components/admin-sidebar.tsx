"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  MessageCircle,
  Settings,
  User,
  Monitor,
  BookOpen,
  FileText,
  Bell,
  CreditCard,
  Home,
  Layout,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: BarChart3 },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content Management",
    items: [
      { title: "Homepage", url: "/admin/homepage", icon: Layout },
      { title: "Featured Items", url: "/admin/featured", icon: Package },
    ],
  },
  {
    title: "Subsidiaries",
    items: [
      { title: "Computers", url: "/admin/computers", icon: Monitor },
      { title: "Books", url: "/admin/books", icon: BookOpen },
      { title: "Business Center", url: "/admin/business", icon: FileText },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Products", url: "/admin/products", icon: Package },
      { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
      { title: "Customers", url: "/admin/customers", icon: Users },
      { title: "Featured Items", url: "/admin/featured", icon: Package },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Chat Support", url: "/admin/chat", icon: MessageCircle },
      { title: "Notifications", url: "/admin/notifications", icon: Bell },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Profile", url: "/admin/profile", icon: User },
      { title: "System Settings", url: "/admin/settings", icon: Settings },
      { title: "Payments", url: "/admin/payments", icon: CreditCard },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={`${user?.firstName} ${user?.lastName}`} />
            <AvatarFallback>{user ? getInitials(user.firstName, user.lastName) : "A"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <Badge variant="secondary" className="text-xs">
                Admin
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className="text-primary">
                    <Home className="h-4 w-4" />
                    <span>Back to Website</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const IconComponent = item.icon
                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <IconComponent className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          <p>Sm@rtz Global Enterprise</p>
          <p>Admin Dashboard v1.0</p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
