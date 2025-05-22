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
          <Label htmlFor="month">Tháng</Label>
          <Select defaultValue="5">
            <SelectTrigger id="month" className="w-full">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tháng 1</SelectItem>
              <SelectItem value="2">Tháng 2</SelectItem>
              <SelectItem value="3">Tháng 3</SelectItem>
              <SelectItem value="4">Tháng 4</SelectItem>
              <SelectItem value="5">Tháng 5</SelectItem>
              <SelectItem value="6">Tháng 6</SelectItem>
              <SelectItem value="7">Tháng 7</SelectItem>
              <SelectItem value="8">Tháng 8</SelectItem>
              <SelectItem value="9">Tháng 9</SelectItem>
              <SelectItem value="10">Tháng 10</SelectItem>
              <SelectItem value="11">Tháng 11</SelectItem>
              <SelectItem value="12">Tháng 12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="year">Năm</Label>
          <Select defaultValue="2025">
            <SelectTrigger id="year" className="w-full">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="department">Phòng ban</Label>
          <Select defaultValue="all">
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              <SelectItem value="engineering">Kỹ thuật</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Kinh doanh</SelectItem>
              <SelectItem value="hr">Nhân sự</SelectItem>
              <SelectItem value="finance">Tài chính</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Select defaultValue="all">
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="paid">Đã thanh toán</SelectItem>
              <SelectItem value="pending">Chờ thanh toán</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Lọc
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>
    </div>
  )
}
