"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddEmployeeForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");

  const validateFormData = (data: any) => {
  const { name, email, gender, dateOfBirth, phone, startDate, department, position, basicSalary, allowance } = data;

  if (!name || !email || !gender || !dateOfBirth || !phone || !startDate || !department || !position || !basicSalary || !allowance) {
    return "Vui lòng điền đầy đủ thông tin.";
  }
  if (isNaN(Number(basicSalary)) || isNaN(Number(allowance))) {
    return "Lương cơ bản và trợ cấp phải là số.";
  }
  if (Number(basicSalary) <= 0 || Number(allowance) < 0) {
    return "Lương cơ bản phải lớn hơn 0 và trợ cấp không được âm.";
  }
  if (new Date(dateOfBirth) >= new Date()) {
    return "Ngày sinh không hợp lệ.";
  }
  if (!/^\d{10}$/.test(phone)) {
    return "Số điện thoại không hợp lệ. Vui lòng nhập lại.";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Email không hợp lệ. Vui lòng nhập lại.";
  }
  return null;
};

const submitWithToken = async (url: string, data: any, managerId: any, token: string) => {
  data.managerId = managerId; // Thêm managerId vào dữ liệu
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res;
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const getValue = (name: string) => (e.currentTarget.elements.namedItem(name) as HTMLInputElement)?.value.trim();
  
  const data = {
    name: getValue("lastName"),
    email: getValue("email"),
    phone: getValue("phone"),
    position: getValue("position"),
    department,
    basicSalary: getValue("salary"),
    allowance: getValue("allowance"),
    gender,
    dateOfBirth: getValue("dateOfBirth"),
    startDate: getValue("startDate"),
  };

  const errorMsg = validateFormData(data);
  if (errorMsg) {
    alert(errorMsg);
    setIsLoading(false);
    return;
  }

  try {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const managerId = localStorage.getItem("userId");
    if (!accessToken || !refreshToken) {
      alert("Vui lòng đăng nhập lại.");
      setIsLoading(false);
      return;
    }

    let response = await submitWithToken("https://paytrack-m9mp.onrender.com/api/employee", data, managerId, accessToken!);

    if (response.status === 401) {
      // Token hết hạn => refresh token
      const refreshRes = await fetch("https://paytrack-m9mp.onrender.com/api/user/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        setIsLoading(false);
        return;
      }

      const { accessToken: newToken } = await refreshRes.json();
      localStorage.setItem("accessToken", newToken);
      accessToken = newToken;

      // Thử lại với token mới
      response = await submitWithToken("https://paytrack-m9mp.onrender.com/api/employee", data, managerId, accessToken!);
      if (!response.ok) {
        alert("Có lỗi xảy ra khi thêm nhân viên mới (sau khi refresh token).");
        setIsLoading(false);
        return;
      }
    } else if (!response.ok) {
      alert("Có lỗi xảy ra khi thêm nhân viên mới.");
      setIsLoading(false);
      return;
    }

    const resData = await response.json();
    console.log("Nhân viên đã được thêm:", resData);
    alert("Thêm nhân viên thành công.");
    setOpen(false);

  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra. Vui lòng thử lại.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm nhân viên</DialogTitle>
            <DialogDescription>Điền đầy đủ thông tin nhân viên. Sau đó nhấn Lưu để hoàn thành.</DialogDescription>
            <DialogDescription>Sau khi lưu, hệ thống sẽ tự động tạo tài khoản đăng nhập cho nhân viên với tên đăng nhập là email, mật khẩu mặc định là "abc123".</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="space-y-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input id="lastName" placeholder="Nguyễn Văn A" required />
              </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nguyenvana@gmail.com" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select onValueChange={(value) => setGender(value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="0912345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày vào làm</Label>
                <Input id="startDate" type="date" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Phòng ban</Label>
                <Select onValueChange={(value) => setDepartment(value)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div className="space-y-2">
                <Label htmlFor="position">Chức vụ</Label>
                <Input id="position" placeholder="Nhân viên" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Lương cơ bản</Label>
                <Input id="salary" type="number" placeholder="10000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowance">Trợ cấp</Label>
                <Input id="allowance" type="number" placeholder="10000000" required />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
