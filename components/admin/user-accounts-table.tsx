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

export function UserAccountsTable() {
  const accounts = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@paytrack.com",
      role: "Admin",
      department: "Engineering",
      lastActive: "2 hours ago",
      avatar: "AJ",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@paytrack.com",
      role: "Employee",
      department: "Marketing",
      lastActive: "1 day ago",
      avatar: "SW",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@paytrack.com",
      role: "Employee",
      department: "Sales",
      lastActive: "3 hours ago",
      avatar: "MB",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@paytrack.com",
      role: "Admin",
      department: "HR",
      lastActive: "Just now",
      avatar: "ED",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@paytrack.com",
      role: "Employee",
      department: "Engineering",
      lastActive: "5 days ago",
      avatar: "DW",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-ava.png`} />
                    <AvatarFallback>{account.avatar}</AvatarFallback>
                  </Avatar>
                  <span>{account.name}</span>
                </div>
              </TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>
                <Badge
                  variant={account.role === "Admin" ? "default" : "outline"}
                  className={account.role === "Admin" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  {account.role}
                </Badge>
              </TableCell>
              <TableCell>{account.department}</TableCell>
              <TableCell>{account.lastActive}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
