import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      user: "Sarah Johnson",
      action: "marked attendance for 12 employees",
      time: "2 hours ago",
      avatar: "SJ",
    },
    {
      user: "Michael Chen",
      action: "processed payroll for Engineering team",
      time: "4 hours ago",
      avatar: "MC",
    },
    {
      user: "Emily Davis",
      action: "added a new employee: James Wilson",
      time: "Yesterday",
      avatar: "ED",
    },
    {
      user: "Robert Taylor",
      action: "updated salary for 3 employees",
      time: "Yesterday",
      avatar: "RT",
    },
    {
      user: "Lisa Wang",
      action: "generated monthly payroll report",
      time: "2 days ago",
      avatar: "LW",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder-ava.png`} />
                <AvatarFallback>{activity.avatar}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
