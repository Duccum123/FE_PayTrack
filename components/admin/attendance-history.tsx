"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type EmployeeByDate = {
  _id: string | number;
  date : string,
  employeeId: {
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
  },
  status: string,
  workingHours: number
};

export function AttendanceHistory() {
  const [employeesByDate, setEmployeesByDate] = useState<EmployeeByDate[]>([])
  const fetchEmployeesByDate = async () => {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")
      const pad = (n: number) => n.toString().padStart(2, "0")
      const today = new Date()
      const date =  `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T00:00:00.000+00:00`
      console.log(date)
      const managerId = localStorage.getItem("userId")
      const data = {
        date: date,
        managerId: managerId
      }
      const res = await fetch("http://localhost:3001/api/attendance/date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        console.log("Failed to fetch employees by date: ", res.statusText)
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
          console.log("res token: ", refreshRes.json())
          console.log("New access token: ", newAccessToken.accessToken)
          localStorage.setItem("accessToken", newAccessToken.accessToken)
          // Retry fetching employees with the new access token
          
          const retryRes = await fetch("http://localhost:3001/api/attendance/date", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newAccessToken.accessToken}`,
            },
            body: JSON.stringify({data})
          })
          if (!retryRes.ok) {
            console.log("Failed to fetch employees: ", retryRes.statusText)
            return
          }
          const employeesData = await retryRes.json()
          console.log(employeesData)
          setEmployeesByDate(employeesData)
        }
        return
      }
      const employeesData = await res.json()
      console.log(employeesData)
      setEmployeesByDate(employeesData)
    }

    useEffect( () => {
      fetchEmployeesByDate()
    }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hôm nay</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employeesByDate.length > 0 ? (
            employeesByDate.map((record) => (
            <div key={record._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder-ava.png`} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{record.employeeId?.name || "null"}</p>
                  <p className="text-xs text-muted-foreground">{record.date.slice(0, 10)}</p>
                </div>
              </div>
              <Badge
                variant={
                  record.status === "Present" ? "default" : record.status === "Absent" ? "destructive" : "outline"
                }
              >
                {record.status === "Half" ? "Part-time" : record.status === "Present" ? "Full-time" : record.status === "Absent" ? "Nghỉ" : "Không xác định"}
              </Badge>
            </div>
          ))
          ) :(
            <p className="text-sm text-muted-foreground">Không có dữ liệu chấm công</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
