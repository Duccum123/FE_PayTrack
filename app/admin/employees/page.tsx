import { EmployeesTable } from "@/components/admin/employees-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { AddEmployeeForm } from "@/components/admin/add-employee-form"

export default function EmployeesPage() {
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
