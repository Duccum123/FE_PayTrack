import { PayrollTable } from "@/components/admin/payroll-table"
import { PayrollFilters } from "@/components/admin/payroll-filters"
import { Button } from "@/components/ui/button"
import { Calculator, Download } from "lucide-react"
import Link from "next/link"

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bảng lương</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/admin/payroll/calculate">
              <Calculator className="mr-2 h-4 w-4" />
              Tính lương
            </Link>
          </Button>
        </div>
      </div>
      <PayrollFilters />
      <PayrollTable />
    </div>
  )
}
