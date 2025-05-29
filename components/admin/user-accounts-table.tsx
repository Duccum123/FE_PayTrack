"use client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type Account = {
  _id: string
  username: string,
  role: string,
  name: string | undefined,
  email: string | undefined
  employeeId : {
    _id: string | number
    name: string
    email: string
    phone: number
    department: string
    position: string
    basicSalary: number
  },
}

export function UserAccountsTable() {
  const [accounts, setAccounts] = useState<Account[]>([])

  const fetchAccounts = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const managerId = localStorage.getItem('userId')
    const res = await fetch("http://localhost:3001/api/user/getByManager/" + managerId,{
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${accessToken}`
      }
    })
    if(!res.ok) {
      console.log("Loi khi fetch account")
      if(res.status == 401) {
        const refreshRes = await fetch("http://localhost:3001/api/user/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({ refreshToken })
        })
        if(!refreshRes.ok) {
          console.log("loi khi refreshToken")
          return
        }
        const newAccessToken = await refreshRes.json()
        localStorage.setItem("accessToken", newAccessToken.accessToken)
        const retryRes = await fetch("http://localhost:3001/api/user/getByManager/" + managerId, {
          method: "GET",
          headers : {
            "Content-Type" : "application/json",
            Authorization :  `Bearer ${newAccessToken.accessToken}`
          }
        })
        const data = await retryRes.json()
        console.log(data)
        setAccounts(data)
      }
      return
    }
    const data = await res.json()
    console.log(data)
    setAccounts(data)
  }
  useEffect(() => {
    fetchAccounts()
  },[])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Phòng ban</TableHead>
            <TableHead>Chức vụ</TableHead>
            <TableHead>Tùy chỉnh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
            <TableRow key={account._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-ava.png`} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span>{account.role === "admin" ? account.name : account.employeeId.name}</span>
                </div>
              </TableCell>
              <TableCell>{account.role === "admin" ? account.email : account.employeeId.email}</TableCell>
              <TableCell>
                <Badge
                  variant={account.role === "admin" ? "default" : "outline"}
                  className={account.role === "admin" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  {account.role === "admin" ? "Admin" : "Employee"}
                </Badge>
              </TableCell>
              <TableCell>{account.role === "admin" ? "Quản trị" : account.employeeId.department}</TableCell>
              <TableCell>{account.role === "admin" ? "Quản trị" : account.employeeId.position}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Tùy chỉnh</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Tùy chỉnh</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Đặt lại mật khẩu</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
          ) :(
            <TableRow>
              <TableCell colSpan={12} className="text-center text-muted-foreground">
                Không có tài khoản nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
