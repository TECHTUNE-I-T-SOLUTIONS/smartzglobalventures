import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Clock, Mail } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full animate-slide-up">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Settings className="h-8 w-8 text-primary animate-spin" />
          </div>
          <CardTitle className="text-2xl">Under Maintenance</CardTitle>
          <CardDescription>We're currently performing scheduled maintenance to improve your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Expected downtime: 2-4 hours</span>
          </div>

          <p className="text-sm text-muted-foreground">
            We apologize for any inconvenience. Our team is working hard to get everything back online as soon as
            possible.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Need immediate assistance?</p>
            <Button variant="outline" className="w-full bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Sm@rtz Global Enterprise</p>
            <p>Follow us on social media for updates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
