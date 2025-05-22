import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export function EmployeePayrollHistory() {
  const payrollHistory = [
    {
      id: 1,
      period: "May 2025",
      payDate: "May 30, 2025",
      grossPay: 6583.33,
      deductions: 1966.67,
      netPay: 4616.66,
    },
    {
      id: 2,
      period: "April 2025",
      payDate: "April 30, 2025",
      grossPay: 6333.33,
      deductions: 1900.0,
      netPay: 4433.33,
    },
    {
      id: 3,
      period: "March 2025",
      payDate: "March 31, 2025",
      grossPay: 6583.33,
      deductions: 1966.67,
      netPay: 4616.66,
    },
    {
      id: 4,
      period: "February 2025",
      payDate: "February 28, 2025",
      grossPay: 5833.33,
      deductions: 1750.0,
      netPay: 4083.33,
    },
    {
      id: 5,
      period: "January 2025",
      payDate: "January 31, 2025",
      grossPay: 6333.33,
      deductions: 1900.0,
      netPay: 4433.33,
    },
    {
      id: 6,
      period: "December 2024",
      payDate: "December 31, 2024",
      grossPay: 7083.33,
      deductions: 2125.0,
      netPay: 4958.33,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll History</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Pay Date</TableHead>
                <TableHead className="text-right">Gross Pay</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.period}</TableCell>
                  <TableCell>{record.payDate}</TableCell>
                  <TableCell className="text-right">
                    $
                    {record.grossPay.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    $
                    {record.deductions.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    $
                    {record.netPay.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {payrollHistory.map((record) => (
            <div key={record.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{record.period}</p>
                  <p className="text-sm text-muted-foreground">{record.payDate}</p>
                </div>
                <p className="font-bold">
                  $
                  {record.netPay.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-muted-foreground">Gross Pay</p>
                  <p>
                    $
                    {record.grossPay.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deductions</p>
                  <p>
                    $
                    {record.deductions.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
