import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
            +4.3% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Days Worked This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">21</div>
          <p className="text-xs text-muted-foreground">Out of 22 working days</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-500 sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Salaries Paid</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$284,521.00</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
            +2.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
