"use client"
import React from "react"
import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Trong thực tế, bạn sẽ lấy dữ liệu nhân viên dựa trên params.id
  const { id } = use(params);
type Employee = {
  _id: string | number;
  name: string;
  email: string;
  phone: number;
  department: string;
  position: string;
  salaryCoefficient: number;
  allowance: number;
  gender: string;
  dateOfBirth: string;
  startDate: string;
  createdAt: string;
};
const [employee, setEmployee] = useState<Employee>({
  _id: "",
  name: "",
  email: "",
  phone: 0,
  department: "",
  position: "",
  salaryCoefficient: 0,
  allowance: 0,
  gender: "",
  dateOfBirth: "",
  startDate: "",
  createdAt: "",
})

  const fetchEmployee = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await fetch("https://paytrack-m9mp.onrender.com/api/employee/" + id, {
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
        console.log("res token: ", refreshRes.json())
        console.log("New access token: ", newAccessToken.accessToken)
        localStorage.setItem("accessToken", newAccessToken.accessToken)

        // Retry fetching employees with the new access token
        const retryRes = await fetch("https://paytrack-m9mp.onrender.com/api/employee/" + id, {
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
        setEmployee(data)
      }
    }
    const data = await res.json()
    console.log("data: ", data)
    setEmployee(data)
  }
  useEffect(() => {
    fetchEmployee()
  }, [])


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/employees">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Thông tin nhân viên</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Tải xuống</span>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/employees/${id}/edit`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Link>
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`/placeholder-ava.png`} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.position}</p>
              <Badge className="mt-2">Chính thức</Badge>
              <div className="mt-6 w-full space-y-4 text-left">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phòng ban</p>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                  <p>{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</p>
                  <p>{employee.startDate.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chi tiết nhân viên</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Cá nhân</TabsTrigger>
                <TabsTrigger value="employment">Công việc</TabsTrigger>
                <TabsTrigger value="financial">Tài chính</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Họ và tên</p>
                    <p className="font-medium">{employee.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{employee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                    <p className="font-medium">{employee.phone}</p>
                  </div>
                </div>
                <Separator />
              </TabsContent>
              <TabsContent value="employment" className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vị trí</p>
                    <p className="font-medium">{employee.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phòng ban</p>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</p>
                    <p className="font-medium">{employee.startDate.slice(0, 10)}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financial" className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hệ số lương</p>
                    <p className="font-medium">{employee.salaryCoefficient.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lương cơ bản</p>
                    <p className="font-medium">{(employee.salaryCoefficient * 2340000).toLocaleString()} VND</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tài khoản ngân hàng</p>
                    <p className="font-medium">{employee.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ngân hàng</p>
                    <p className="font-medium">MB Bank</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
