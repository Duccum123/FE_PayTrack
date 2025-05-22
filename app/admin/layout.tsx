import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <div style={{width:"calc(100vw - 16rem)"}} className="flex flex-col flex-1">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
