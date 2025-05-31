"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = ((e.target as HTMLFormElement).elements.namedItem("username") as HTMLInputElement | null)?.value
    const password = ((e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement | null)?.value
    if (!username || !password) {
      alert("Vui lòng điền đầy đủ thông tin.")
      return
    }
    try {
      const loginData = await fetch("https://paytrack-m9mp.onrender.com/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (loginData.ok) {
      const data = await loginData.json()
      console.log(data)
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("userId", data.user.id)
      router.push("/admin")
    } else {
      const data = await loginData.json()
      alert(data.message || "Đăng nhập thất bại.")
    }
    } catch (error) {
      console.error("Error during login:", error)
      alert("Có lỗi xảy ra. Vui lòng thử lại.")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Thực hiện đăng ký ở đây
    const username = ((e.target as HTMLFormElement).elements.namedItem("Username-register") as HTMLInputElement | null)?.value
    const password = ((e.target as HTMLFormElement).elements.namedItem("password-register") as HTMLInputElement | null)?.value
    const confirmPassword = ((e.target as HTMLFormElement).elements.namedItem("confirm-password") as HTMLInputElement | null)?.value
    const termsAccepted = ((e.target as HTMLFormElement).elements.namedItem("terms") as HTMLInputElement | null)?.checked
    if (!username || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.")
      return
    } else if (password !== confirmPassword) {
      alert("Mật khẩu không khớp.")
    }
    try {
        const role = "admin"
        const res = await fetch("https://paytrack-m9mp.onrender.com/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
    })
    if (res.ok) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.")
      setActiveTab("login")
    } else {
      const data = await res.json()
      alert(data.message || "Đăng ký thất bại.")
    }
  } catch (error) {
    console.error("Error during registration:", error)
    alert("Có lỗi xảy ra. Vui lòng thử lại.")
  }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-blue-600">
        <BarChart3 className="h-8 w-8" />
        <span>PayTrack</span>
      </div>

      <Card className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>Nhập thông tin đăng nhập của bạn để truy cập hệ thống.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <Input id="username" type="text" placeholder="Nhập tên đăng nhập" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</span>
                    </Button>
                  </div>
                </div>
                
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Đăng nhập
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Đăng ký</CardTitle>
                <CardDescription>Tạo tài khoản mới để sử dụng hệ thống.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-register">Username</Label>
                  <Input id="Username-register" type="text" placeholder="Nhập tên đăng nhập" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}</span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    Tôi đồng ý với{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      điều khoản và điều kiện
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Đăng ký
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        © 2025 PayTrack. Đã đăng ký bản quyền.
      </p>
    </div>
  )
}
