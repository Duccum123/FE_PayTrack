import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function EmployeePayrollSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>May 2025 Payroll Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Salary</p>
            <p className="text-3xl font-bold">$5,833.33</p>
          </div>
          <div className="rounded-md bg-green-50 px-3 py-1 text-green-700">Paid on May 30, 2025</div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Base Salary</p>
              <p className="font-medium">$5,833.33</p>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Overtime</p>
              <p className="font-medium">$250.00</p>
            </div>
            <Progress value={4.3} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Bonus</p>
              <p className="font-medium">$500.00</p>
            </div>
            <Progress value={8.6} className="h-2" />
          </div>
        </div>

        <div className="rounded-md bg-muted p-4">
          <div className="flex items-center justify-between border-b pb-2">
            <p className="font-medium">Gross Pay</p>
            <p className="font-medium">$6,583.33</p>
          </div>

          <div className="flex items-center justify-between border-b py-2">
            <p className="font-medium">Tax Deductions</p>
            <p className="font-medium">-$1,316.67</p>
          </div>

          <div className="flex items-center justify-between border-b py-2">
            <p className="font-medium">Health Insurance</p>
            <p className="font-medium">-$250.00</p>
          </div>

          <div className="flex items-center justify-between border-b py-2">
            <p className="font-medium">Retirement Contribution</p>
            <p className="font-medium">-$400.00</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold">Net Pay</p>
            <p className="text-lg font-bold">$4,616.66</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
