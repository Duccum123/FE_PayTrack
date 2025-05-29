"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calculator, Save } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"


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


// Danh sách tháng
const months = [
  { value: "1", label: "Tháng 1" },
  { value: "2", label: "Tháng 2" },
  { value: "3", label: "Tháng 3" },
  { value: "4", label: "Tháng 4" },
  { value: "5", label: "Tháng 5" },
  { value: "6", label: "Tháng 6" },
  { value: "7", label: "Tháng 7" },
  { value: "8", label: "Tháng 8" },
  { value: "9", label: "Tháng 9" },
  { value: "10", label: "Tháng 10" },
  { value: "11", label: "Tháng 11" },
  { value: "12", label: "Tháng 12" },
]

// Danh sách năm
const years = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" }
]

export default function CalculateSalaryPage() {
  const { toast } = useToast()
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [workDays, setWorkDays] = useState(22)
  const [actualWorkDays, setActualWorkDays] = useState(22)
  const [bonus, setBonus] = useState(0)
  const [penalty, setPenalty] = useState(0)
  const [bonusNote, setBonusNote] = useState("")
  const [penaltyNote, setPenaltyNote] = useState("")
  const [isCalculated, setIsCalculated] = useState(false)
  const [calculationResult, setCalculationResult] = useState({
    baseSalary: 0,
    workDaysSalary: 0,
    bonusAmount: 0,
    penaltyAmount: 0,
    totalSalary: 0,
    tax: 0,
    insurance: 0,
    netSalary: 0,
  })
  const [employee, setEmployee] = useState<Employee>()
  const [employees, setEmployees] = useState<Employee[]>([])
  const fetchEmployees = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const managerId = localStorage.getItem('userId')
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

  // Cập nhật thông tin nhân viên khi chọn
  useEffect(() => {
    fetchEmployees()
    if (selectedEmployee) {
      const found = employees.find((emp) => emp._id === selectedEmployee)
      setEmployee(found)
    } else {
      setEmployee(undefined)
    }
  }, [selectedEmployee])

  // Tính lương
  const calculateSalary = () => {
    if (!employee) return

    // Lương cơ bản hàng tháng
    const monthlySalary = employee.basicSalary

    // Lương theo ngày công
    const workDaysSalary = employee.allowance

    // Tổng lương trước thuế
    const totalBeforeTax = workDaysSalary + monthlySalary + bonus - penalty

    // Thuế thu nhập (giả định 10%)
    const tax = totalBeforeTax * 0.1

    // Bảo hiểm (giả định 8%)
    const insurance = monthlySalary * 0.08

    // Lương thực lãnh
    const netSalary = totalBeforeTax - tax - insurance

    setCalculationResult({
      baseSalary: monthlySalary,
      workDaysSalary: workDaysSalary,
      bonusAmount: bonus,
      penaltyAmount: penalty,
      totalSalary: totalBeforeTax,
      tax: tax,
      insurance: insurance,
      netSalary: netSalary,
    })

    setIsCalculated(true)
  }

  // Lưu bảng lương
  const saveSalary = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const salaryData = {
      employeeId: selectedEmployee,
      month: selectedMonth,
      year: selectedYear,
      bonus: bonus,
      noteBonus: bonusNote,
      penalty: penalty,
      notePenalty: penaltyNote,
      totalSalary: calculationResult.netSalary,
    }
    console.log("Salary data: ", salaryData)
    const res = await fetch("http://localhost:3001/api/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(salaryData),
    })

    if (!res.ok) {
      console.log("Failed to save salary: ", res.statusText)
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
        // Retry saving salary with the new access token
        const retryRes = await fetch("http://localhost:3001/api/salary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken.accessToken}`,
          },
          body: JSON.stringify(salaryData),
        })
        if (!retryRes.ok) {
          console.log("Failed to save salary: ", retryRes.statusText)
          return
        }
        alert("Lưu bảng lương thành công")
        console.log("Salary saved successfully:", retryRes.json())
      }
      return
    }
    alert("Lưu bảng lương thành công")
    console.log("Salary saved successfully:", res.json())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/payroll">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Tính lương nhân viên</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form tính lương */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin tính lương</CardTitle>
            <CardDescription>Nhập thông tin để tính lương cho nhân viên</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Chọn nhân viên</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {employees.length > 0 ? (
                    employees.map((emp: Employee) => (
                    <SelectItem key={emp._id} value={String(emp._id)}>
                      {emp.name}
                    </SelectItem>
                  ))
                  ) :(
                    <SelectItem value="null" disabled>
                      Không có nhân viên nào
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Tháng</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Chọn tháng" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Năm</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Chọn năm" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actualWorkDays">Số ngày công tiêu chuẩn</Label>
                <Input
                  id="actualWorkDays"
                  type="number"
                  value={actualWorkDays}
                  onChange={(e) => setActualWorkDays(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bonus">Thưởng (VND)</Label>
              <Input
                id="bonus"
                type="number"
                placeholder="0"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bonusNote">Ghi chú thưởng</Label>
              <Textarea
                id="bonusNote"
                placeholder="Lý do thưởng"
                value={bonusNote}
                onChange={(e) => setBonusNote(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penalty">Phạt (VND)</Label>
              <Input
                id="penalty"
                type="number"
                placeholder="0"
                value={penalty}
                onChange={(e) => setPenalty(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penaltyNote">Ghi chú phạt</Label>
              <Textarea
                id="penaltyNote"
                placeholder="Lý do phạt"
                value={penaltyNote}
                onChange={(e) => setPenaltyNote(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={calculateSalary}
              disabled={!selectedEmployee || !selectedMonth}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Tính lương
            </Button>
          </CardFooter>
        </Card>

        {/* Kết quả tính lương */}
        <Card>
          <CardHeader>
            <CardTitle>Kết quả tính lương</CardTitle>
            <CardDescription>Bảng lương chi tiết của nhân viên</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {employee ? (
              <>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-ava.png`} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.position} - {employee.department}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-medium">Thông tin lương</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lương cơ bản hàng tháng:</span>
                      <span className="font-medium">{employee.basicSalary.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trợ cấp hàng tháng:</span>
                      <span className="font-medium">{(employee.allowance).toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>

                {isCalculated && (
                  <>
                    <Separator />

                    <div>
                      <h4 className="mb-4 font-medium">
                        Bảng lương tháng {selectedMonth}/{selectedYear}
                      </h4>

                      <div className="space-y-3">
                        
                        <div className="flex justify-between text-green-600">
                          <span>Thưởng:</span>
                          <span className="font-medium">
                            +
                            {calculationResult.bonusAmount.toLocaleString()} VND
                          </span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Phạt:</span>
                          <span className="font-medium">
                            -
                            {calculationResult.penaltyAmount.toLocaleString()} VND
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Tổng lương trước thuế:</span>
                          <span>
                            
                            {calculationResult.totalSalary.toLocaleString()} VND
                          </span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Thuế thu nhập (10%):</span>
                          <span>
                            -
                            {calculationResult.tax.toLocaleString()} VND
                          </span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Bảo hiểm (8%):</span>
                          <span>
                            -
                            {calculationResult.insurance.toLocaleString()} VND
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Lương thực lãnh:</span>
                          <span className="text-blue-600">
                            
                            {calculationResult.netSalary.toLocaleString()} VND
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={saveSalary}>
                    
                      <Save className="mr-2 h-4 w-4" />
                      Lưu bảng lương
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div className="flex h-[400px] flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">Vui lòng chọn nhân viên và nhập thông tin để tính lương</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
