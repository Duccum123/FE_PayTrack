import { UserAccountsTable } from "@/components/admin/user-accounts-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function UserAccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Accounts</h1>
      </div>
      <UserAccountsTable />
    </div>
  )
}
