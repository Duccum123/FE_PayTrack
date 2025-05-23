"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Filter } from "lucide-react"

export function PayrollFilters() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Month</Label>
          <Select defaultValue="5">
            <SelectTrigger id="month" className="w-full">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Select defaultValue="2025">
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
          <Label htmlFor="department">Department</Label>
          <Select defaultValue="all">
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Department</SelectItem>
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
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Lọc
        </Button>
        
      </div>
    </div>
  )
}
