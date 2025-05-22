"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Calculator } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function PayrollTable() {
  const payrollData = [
    {
      id: 1,
      employee: "Alex Johnson",
      department: "Engineering",
      totalDays: 22,
      workDays: 21,
      baseSalary: 85000,
      finalSalary: 7083.33,
      status: "Paid",
    },
    {
      id: 2,
      employee: "Sarah Williams",
      department: "Marketing",
      totalDays: 22,
      workDays: 22,
      baseSalary: 78000,
      finalSalary: 6500,
      status: "Paid",
    },
    {
      id: 3,
      employee: "Michael Brown",
      department: "Sales",
      totalDays: 22,
      workDays: 19,
      baseSalary: 65000,
      finalSalary: 5118.18,
      status: "Paid",
    },
    {
      id: 4,
      employee: "Emily Davis",
      department: "HR",
      totalDays: 22,
      workDays: 22,
      baseSalary: 72000,
      finalSalary: 6000,
      status: "Pending",
    },
    {
      id: 5,
      employee: "David Wilson",
      department: "Engineering",
      totalDays: 22,
      workDays: 20,
      baseSalary: 75000,
      finalSalary: 5681.82,
      status: "Pending",
    },
    {
      id: 6,
      employee: "Jennifer Taylor",
      department: "Finance",
      totalDays: 22,
      workDays: 21,
      baseSalary: 80000,
      finalSalary: 6363.64,
      status: "Paid",
    },
  ]

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead className="text-center">Ngày công</TableHead>
              <TableHead className="text-right">Lương cơ bản</TableHead>
              <TableHead className="text-right">Lương thực lãnh</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell className="text-center">
                  {item.workDays}/{item.totalDays}
                </TableCell>
                <TableCell className="text-right">${item.baseSalary.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.finalSalary.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={item.status === "Paid" ? "default" : "outline"}
                    className={item.status === "Paid" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {item.status === "Paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/payroll/calculate?employee=${item.id}`}>
                        <Calculator className="h-4 w-4" />
                        <span className="sr-only">Tính lương</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Xem</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Tải xuống</span>
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
        {payrollData.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{item.employee}</p>
                  <p className="text-sm text-muted-foreground">{item.department}</p>
                </div>
                <Badge
                  variant={item.status === "Paid" ? "default" : "outline"}
                  className={item.status === "Paid" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {item.status === "Paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Ngày công</p>
                  <p>
                    {item.workDays}/{item.totalDays}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lương cơ bản</p>
                  <p>${item.baseSalary.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Lương thực lãnh</p>
                  <p className="font-medium">${item.finalSalary.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/admin/payroll/calculate?employee=${item.id}`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Tính lương
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Xem
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
