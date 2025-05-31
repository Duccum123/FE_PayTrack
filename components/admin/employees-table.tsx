"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

type Employee = {
  _id: string | number;
  name: string;
  email: string;
  phone: number;
  department: string;
  position: string;
  basicSalary: number;
  allowance: number;
  gender: string;
  dateOfBirth: string;
  startDate: string;
  createdAt: string;
};

export function EmployeesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const [employees, setEmployees] = useState<Employee[]>([]);

  const fectchEmployees = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const managerId = localStorage.getItem("userId")
    const res = await fetch("https://paytrack-m9mp.onrender.com/api/employee/getByManager/" + managerId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if(!res.ok) {
      console.log("Failed to fetch employees: ", res.statusText)
      if (res.status === 401) {
        // Token hết hạn => refresh token
        const refreshRes = await fetch("https://paytrack-m9mp.onrender.com/api/user/refresh-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
        if (!refreshRes.ok) {
          console.log("Failed to refresh token: ", refreshRes.statusText)
          return
        }
        const newAccessToken = await refreshRes.json()
        console.log("res token: ", newAccessToken)
        console.log("New access token: ", newAccessToken.accessToken)
        localStorage.setItem("accessToken", newAccessToken.accessToken)

        // Retry fetching employees with the new access token
        const retryRes = await fetch("https://paytrack-m9mp.onrender.com/api/employee/getByManager/" + managerId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken.accessToken}`,
          },
        })
        if (!retryRes.ok) {
          console.log("Failed to fetch employees after token refresh: ", retryRes.statusText)
          return
        }
        const data = await retryRes.json()
        console.log("data: ", data)
        setEmployees(data)
      }
    }
    const data = await res.json()
    console.log("data: ", data)
    setEmployees(data)
  }
  useEffect(() => {
    fectchEmployees()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhân viên..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-fit">
    <TableHeader>
      <TableRow>
        <TableHead className="whitespace-nowrap">Tên</TableHead>
        <TableHead className="whitespace-nowrap">Số điện thoại</TableHead>
        <TableHead className="whitespace-nowrap">Email</TableHead>
        <TableHead className="whitespace-nowrap">Ngày sinh</TableHead>
        <TableHead className="whitespace-nowrap">Ngày vào làm</TableHead>
        <TableHead className="whitespace-nowrap">Ngày thêm</TableHead>
        <TableHead className="whitespace-nowrap">Giới tính</TableHead>
        <TableHead className="whitespace-nowrap">Phòng ban</TableHead>
        <TableHead className="whitespace-nowrap">Chức vụ</TableHead>
        <TableHead className="whitespace-nowrap">Lương cơ bản</TableHead>
        <TableHead className="whitespace-nowrap">Trợ cấp</TableHead>
        <TableHead className="whitespace-nowrap">Tùy chỉnh</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {employees.length > 0 ? (
        employees.map((employee) => (
        <TableRow key={employee._id}>
          <TableCell className="whitespace-nowrap">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-ava.png" />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{employee.name}</span>
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap">{employee.phone}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.email}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.gender}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.startDate?.slice(0, 10)}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.createdAt?.slice(0, 10)}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.gender}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.department}</TableCell>
          <TableCell className="whitespace-nowrap">{employee.position}</TableCell>
          <TableCell className="text-right whitespace-nowrap">
            {employee.basicSalary?.toLocaleString()} VND
          </TableCell>
          <TableCell className="text-right whitespace-nowrap">
            {employee.allowance?.toLocaleString()} VND
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/employees/${employee._id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Xem</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Thao tác</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/employees/${employee._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/employees/${employee._id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))
      ) : (
        <TableRow>
          <TableCell colSpan={12} className="text-center text-muted-foreground">
            Không có nhân viên nào
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
          <Card key={employee._id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder-ava.png`} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Thao tác</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/employees/${employee._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/employees/${employee._id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Phòng ban</p>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lương cơ bản</p>
                  <p>${employee.basicSalary.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/admin/employees/${employee._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
        ) : (
          <div className="text-center text-muted-foreground">
            Không có nhân viên nào
          </div>
        )}
      </div>
    </div>
  )
}

