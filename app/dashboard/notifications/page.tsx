"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { getUserNotifications } from "@/lib/supabase"
import { Bell, CheckCircle, AlertCircle, Info, XCircle, Trash2 } from "lucide-react"
import { BookMarkedIcon as MarkAsUnread } from "lucide-react" // Import declaration for MarkAsUnread
import type { Notification } from "@/lib/types"

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadNotifications()
    }
  }, [user])

  const loadNotifications = async () => {
    if (!user) return

    try {
      const notificationsData = await getUserNotifications(user.id)
      setNotifications(notificationsData)
    } catch (error) {
      console.error("Error loading notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: false } : notification,
      ),
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.read)
      case "read":
        return notifications.filter((n) => n.read)
      default:
        return notifications
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All Notifications
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && <Badge className="ml-2">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <NotificationList
              notifications={filterNotifications("all")}
              getNotificationIcon={getNotificationIcon}
              markAsRead={markAsRead}
              markAsUnread={markAsUnread}
              deleteNotification={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <NotificationList
              notifications={filterNotifications("unread")}
              getNotificationIcon={getNotificationIcon}
              markAsRead={markAsRead}
              markAsUnread={markAsUnread}
              deleteNotification={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            <NotificationList
              notifications={filterNotifications("read")}
              getNotificationIcon={getNotificationIcon}
              markAsRead={markAsRead}
              markAsUnread={markAsUnread}
              deleteNotification={deleteNotification}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function NotificationList({
  notifications,
  getNotificationIcon,
  markAsRead,
  markAsUnread,
  deleteNotification,
}: {
  notifications: Notification[]
  getNotificationIcon: (type: string) => JSX.Element
  markAsRead: (id: string) => void
  markAsUnread: (id: string) => void
  deleteNotification: (id: string) => void
}) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No notifications</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <Card
          key={notification.id}
          className={`animate-slide-up transition-all duration-200 ${
            !notification.read ? "bg-primary/5 border-primary/20" : ""
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{notification.title}</h3>
                    <p className="text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>

                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>}
                </div>
              </div>

              <div className="flex space-x-1">
                {notification.read ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsUnread(notification.id)}
                    title="Mark as unread"
                  >
                    <MarkAsUnread className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)} title="Mark as read">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete notification"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
