"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Calendar, DollarSign, UserCog, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  const routes = [
    {
      title: "Tổng quan",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Nhân viên",
      href: "/admin/employees",
      icon: Users,
    },
    {
      title: "Chấm công",
      href: "/admin/attendance",
      icon: Calendar,
    },
    {
      title: "Bảng lương",
      href: "/admin/payroll",
      icon: DollarSign,
    },
    {
      title: "Tài khoản",
      href: "/admin/accounts",
      icon: UserCog,
    },
  ]

  return (
    <>
      {isMobile && (
        <div className="fixed left-4 top-3 z-50">
          <SidebarTrigger className="bg-white shadow-md rounded-md" />
        </div>
      )}
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2 font-semibold text-lg text-blue-600">
            <BarChart3 className="h-6 w-6" />
            <span>PayTrack</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={() => {
            localStorage.clear()
            window.location.href = "/login"
          }}>
              <LogOut className="mr-2 h-5 w-5" />
              Đăng xuất
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
