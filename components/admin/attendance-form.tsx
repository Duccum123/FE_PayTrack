"use client"

import { useState, useEffect, use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { json } from "stream/consumers"


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

export function AttendanceForm() {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [status, setStatus] = useState("present")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeesByDate, setEmployeesByDate] = useState<Employee[]>([])
  const fetchEmployees = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const managerId = localStorage.getItem("userId")
    const res = await fetch("http://localhost:3001/api/employee/getByManager/" + managerId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (!res.ok) {
      console.log("Failed to fetch employees: ", res.statusText)
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
        const retryRes = await fetch("http://localhost:3001/api/employee/getByManager/" + managerId, {
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
        const employeesData = await retryRes.json()
        setEmployees(employeesData)
      }
      return
    }
    const employeesData = await res.json()
    setEmployees(employeesData)
  }
  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAddAttendance = () => async (e: React.FormEvent<HTMLFormElement>) => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    e.preventDefault()
    const pad = (n: number) => n.toString().padStart(2, "0")
    const dateString = date
      ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00Z`
      : ""
    const data = {
      employeeId: selectedEmployee,
      date: dateString,
      status,
    }
    console.log("Attendance data: ", data)
    const res = await fetch("http://localhost:3001/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      console.log("Failed to add attendance: ", res.statusText)
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
        localStorage.setItem("accessToken", newAccessToken.accessToken)
        alert("Failed to mark attendance. Please try again.")
      } else if (res.status === 999) {
            alert("Attendance exited.")
        }
      return
    }
    const attendanceData = await res.json()
    console.log("Attendance added: ", attendanceData)
    alert("Attendance marked successfully!")
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
      </CardHeader>
      <form onSubmit={handleAddAttendance()}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="employee">Select Employee</Label>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger id="employee">
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee._id} value={employee._id.toString()}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Date</Label>
          <div className="flex justify-center sm:justify-start">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border max-w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Attendance Status</Label>
          <RadioGroup value={status} onValueChange={setStatus} className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Present" id="present" />
              <Label htmlFor="present">Present</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Absent" id="absent" />
              <Label htmlFor="absent">Absent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Half" id="half-day" />
              <Label htmlFor="half-day">Half Day</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Mark Attendance</Button>
      </CardContent>
      </form>
    </Card>
  )
}
