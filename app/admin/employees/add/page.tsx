import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddEmployeePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thêm nhân viên mới</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin nhân viên</CardTitle>
          <CardDescription>
            Nhập thông tin chi tiết của nhân viên mới. Tất cả các trường có dấu * là bắt buộc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Họ <span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" placeholder="Nguyễn" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Tên <span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" placeholder="Văn A" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" type="email" placeholder="name@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0912345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin công việc</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">
                    Mã nhân viên <span className="text-red-500">*</span>
                  </Label>
                  <Input id="employeeId" placeholder="EMP-2025-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">
                    Phòng ban <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Kỹ thuật</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Kinh doanh</SelectItem>
                      <SelectItem value="hr">Nhân sự</SelectItem>
                      <SelectItem value="finance">Tài chính</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">
                    Vị trí <span className="text-red-500">*</span>
                  </Label>
                  <Input id="position" placeholder="Nhân viên" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Quản lý</Label>
                  <Select>
                    <SelectTrigger id="manager">
                      <SelectValue placeholder="Chọn quản lý" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex-johnson">Alex Johnson</SelectItem>
                      <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                      <SelectItem value="michael-brown">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">
                    Lương cơ bản <span className="text-red-500">*</span>
                  </Label>
                  <Input id="salary" type="number" placeholder="10000000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </Label>
                  <Input id="startDate" type="date" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea id="address" placeholder="Địa chỉ nhà riêng" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input id="city" placeholder="Hà Nội" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Input id="district" placeholder="Cầu Giấy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Mã bưu chính</Label>
                    <Input id="postalCode" placeholder="100000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
                  <Input id="emergencyContact" placeholder="Nguyễn Văn B - 0987654321" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/admin/employees">Hủy</Link>
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Lưu nhân viên
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
