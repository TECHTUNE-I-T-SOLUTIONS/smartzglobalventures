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
import { useAuth } from "@/hooks/use-auth"
import { Home, ShoppingBag, Heart, MessageCircle, Settings, User, Bell, CreditCard, HelpCircle } from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Orders", url: "/dashboard/orders", icon: ShoppingBag },
      { title: "Wishlist", url: "/dashboard/wishlist", icon: Heart },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Chat Support", url: "/dashboard/chat", icon: MessageCircle },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    title: "Account",
    items: [
      { title: "Profile", url: "/dashboard/profile", icon: User },
      { title: "Payment Methods", url: "/dashboard/payments", icon: CreditCard },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
  },
  {
    title: "Support",
    items: [{ title: "Help Center", url: "/dashboard/help", icon: HelpCircle }],
  },
]

export function DashboardSidebar() {
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
            <AvatarFallback>{user ? getInitials(user.firstName, user.lastName) : "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
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
          <p>Customer Dashboard</p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
