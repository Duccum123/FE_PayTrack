import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { PayrollSummary } from "@/components/admin/payroll-summary"
import { AddEmployeeForm } from "@/components/admin/add-employee-form"
import { EmployeesTable } from "@/components/admin/employees-table"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Nhân viên</h1>
            <div className="flex gap-2">
              <AddEmployeeForm />
            </div>
          </div>
          <EmployeesTable />
        </div>
  )
}
