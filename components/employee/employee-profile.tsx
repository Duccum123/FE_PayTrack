import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function EmployeeProfile() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">John Doe</h3>
            <p className="text-muted-foreground">Software Developer</p>
            <p className="text-sm text-muted-foreground">Engineering Department</p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
            <p>EMP-2023-0042</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Date of Joining</p>
            <p>January 15, 2023</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>john.doe@paytrack.com</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Base Salary</p>
            <p>$70,000.00 per year</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Manager</p>
            <p>Alex Johnson</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p>123 Main Street, Apt 4B</p>
          <p>San Francisco, CA 94105</p>
        </div>
      </CardContent>
    </Card>
  )
}
