"use client"
import React, { useState, useEffect } from "react"
import { PayrollTable } from "@/components/admin/payroll-table"
import { PayrollFilters } from "@/components/admin/payroll-filters"
import { Button } from "@/components/ui/button"
import { Calculator, Download } from "lucide-react"
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
export default function PayrollPage() {
  const [data, setData] = useState(null as PayrollData[] | null)
  const [payrollData, setPayrollData] = useState<PayrollData[]>([])
  
    const fetchPayrolls = async () => {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")
      const managerId = localStorage.getItem("userId")
      const res = await fetch("http://localhost:3001/api/salary/getByManager/" + managerId, {
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
          const retryRes = await fetch("http://localhost:3001/api/salary/getByManager/" + managerId, {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bảng lương</h1>
        <div className="flex gap-2">
          
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/admin/payroll/calculate">
              <Calculator className="mr-2 h-4 w-4" />
              Tính bảng lương
            </Link>
          </Button>
        </div>
      </div>
      <PayrollFilters onFilter = {(result) => setData(result)} />
      <PayrollTable payrollData = {data === null ? payrollData : data} />
    </div>
  )
}
