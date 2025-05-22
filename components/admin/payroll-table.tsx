"use client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Calculator } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

type PayrollData = {
  _id: string,
  employeeId : {
    _id: string | number
    name: string
    email: string
    phone: number
    department: string
    position: string
    basicSalary: number
  },
  month: number,
  year: number,
  bonus: number,
  penalty: number,
  noteBonus: string,
  notePenalty: string,
  totalWorkingDays: number,
  totalWorkingHours: number,
  totalSalary: number
}

export function PayrollTable() {
  const [payrollData, setPayrollData] = useState<PayrollData[]>([])

  const fetchPayrolls = async () => {
    const accessToken = localStorage.getItem("access")
    const refreshToken = localStorage.getItem("refreshToken")

    const res = await fetch("http://localhost:3001/api/salary", {
      method : "GET",
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${accessToken}`
      },
    })
    if(!res.ok) {
      console.log("Failed to fetch payrolls: ", res.statusText)
      if (res.status === 401) {
        // Token hết hạn => refresh token
        const refreshRes = await fetch("http://localhost:3001/api/user/refresh-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
        if (!refreshRes.ok) {
          console.log("Failed to refresh token: ", refreshRes.statusText)
          return
        }
        const newAccessToken = await refreshRes.json()
        console.log("New access token: ", newAccessToken.accessToken)
        localStorage.setItem("accessToken", newAccessToken.accessToken)
        // Retry fetching employees with the new access token
        const retryRes = await fetch("http://localhost:3001/api/salary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken.accessToken}`,
          },
        })
        if (!retryRes.ok) {
          console.log("Failed to fetch employees: ", retryRes.statusText)
          return
        }
        const data = await retryRes.json()
        console.log(data)
        setPayrollData(data)
      }
      return
    }
    const data = await res.json()
    console.log(data)
    setPayrollData(data)
  }
  useEffect(() => {
      fetchPayrolls()
    },[])
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Working Day</TableHead>
              <TableHead className="text-right">Basic salary</TableHead>
              <TableHead className="text-right">Take-Home Pay</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.employeeId.name}</TableCell>
                <TableCell>{item.employeeId.department}</TableCell>
                <TableCell className="text-center">
                  {item.totalWorkingDays}/30
                </TableCell>
                <TableCell className="text-right">{item.employeeId.basicSalary.toLocaleString()} VND</TableCell>
                <TableCell className="text-right">{item.totalSalary.toLocaleString()} VND</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/payroll/calculate?employee=${item._id}`}>
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
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{item.employeeId.name}</p>
                  <p className="text-sm text-muted-foreground">{item.employeeId.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Ngày công</p>
                  <p>
                    {item.totalWorkingDays}/30
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lương cơ bản</p>
                  <p>{item.employeeId.basicSalary.toLocaleString()} VND</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Lương thực lãnh</p>
                  <p className="font-medium">{item.totalSalary.toLocaleString()} VND</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/admin/payroll/calculate?employee=${item._id}`}>
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
