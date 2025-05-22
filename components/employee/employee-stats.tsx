import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, DollarSign } from "lucide-react"

export function EmployeeStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Calendar className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Days Worked</p>
            <p className="text-2xl font-bold">21/22</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Clock className="h-10 w-10 rounded-lg bg-green-100 p-2 text-green-600" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hours This Month</p>
            <p className="text-2xl font-bold">168</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <DollarSign className="h-10 w-10 rounded-lg bg-purple-100 p-2 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Salary</p>
            <p className="text-2xl font-bold">$5,833.33</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
