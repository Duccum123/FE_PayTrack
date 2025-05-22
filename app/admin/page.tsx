import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { PayrollSummary } from "@/components/admin/payroll-summary"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <PayrollSummary />
      </div>
    </div>
  )
}
