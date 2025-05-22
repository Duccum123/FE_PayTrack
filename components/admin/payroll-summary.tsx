import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PayrollSummary() {
  const departments = [
    { name: "Engineering", amount: 98420, employees: 32 },
    { name: "Marketing", amount: 45680, employees: 18 },
    { name: "Sales", amount: 76250, employees: 24 },
    { name: "HR", amount: 32450, employees: 12 },
    { name: "Finance", amount: 31721, employees: 9 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.name} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{dept.name}</p>
                <p className="text-xs text-muted-foreground">{dept.employees} employees</p>
              </div>
              <div className="font-medium">${dept.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
