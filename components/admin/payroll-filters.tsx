"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Filter } from "lucide-react"

export function PayrollFilters( {onFilter} : {onFilter: (result: any) => void}) {
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")
  const managerId = localStorage.getItem("userId")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const handleFilter = async () => {
    const data = {
      month: selectedMonth,
      year: selectedYear,
      department: selectedDepartment
    }
    console.log("Filtered Data:", data)
    const res = await fetch("http://localhost:3001/api/salary/getByMonthAndDepartment/" + managerId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      if (res.status === 401) {
        // Handle unauthorized access, e.g., refresh token or redirect to login
        console.error("Unauthorized access.")
        const refreshRes = await fetch("http://localhost:3001/api/user/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        if (refreshRes.ok) {
          const newTokens = await refreshRes.json()
          localStorage.setItem("accessToken", newTokens.accessToken)
          return handleFilter()
        } else {
          console.error("Failed to refresh token:", refreshRes.statusText)
          return
        }
      } else if( res.status === 405) {
        console.log("không có dữ liệu")
        onFilter([])
        return
      }
      console.error("Failed to fetch filtered data:", res.statusText)
      return
    }
    const filteredData = await res.json()
    console.log("Filtered Data Response:", filteredData)
    onFilter(filteredData)
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Tháng</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month" className="w-full">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tháng 1</SelectItem>
              <SelectItem value="2">Tháng 2</SelectItem>
              <SelectItem value="3">Tháng 3</SelectItem>
              <SelectItem value="4">Tháng 4</SelectItem>
              <SelectItem value="5">Tháng 5</SelectItem>
              <SelectItem value="6">Tháng 6</SelectItem>
              <SelectItem value="7">Tháng 7</SelectItem>
              <SelectItem value="8">Tháng 8</SelectItem>
              <SelectItem value="9">Tháng 9</SelectItem>
              <SelectItem value="10">Tháng 10</SelectItem>
              <SelectItem value="11">Tháng 11</SelectItem>
              <SelectItem value="12">Tháng 12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="year">Năm</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year" className="w-full">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2028">2028</SelectItem>
              <SelectItem value="2029">2029</SelectItem>
              <SelectItem value="2030">2030</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="department">Phòng ban</Label>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
              <SelectItem value="Nhân sự">Nhân sự</SelectItem>
              <SelectItem value="Tài chính">Tài chính</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Thiết kế">Thiết kế</SelectItem>
              <SelectItem value="Hỗ trợ">Hỗ trợ</SelectItem>
              <SelectItem value="Chăm sóc khách hàng">Chăm sóc khách hàng</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleFilter}>
          <Filter className="mr-2 h-4 w-4" />
          Lọc
        </Button>
        
      </div>
    </div>
  )
}
