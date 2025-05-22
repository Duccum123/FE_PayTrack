import { PayrollTable } from "@/components/admin/payroll-table"
import { PayrollFilters } from "@/components/admin/payroll-filters"

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
      <PayrollFilters />
      <PayrollTable />
    </div>
  )
}
