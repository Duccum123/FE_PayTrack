import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BarChart3, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function EmployeeHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2 font-semibold text-lg text-blue-600">
        <BarChart3 className="h-6 w-6" />
        <span>PayTrack</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
        <Button asChild variant="ghost">
          <Link href="/employee">Profile</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/employee/attendance">Attendance</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/employee/payroll">Payroll</Link>
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-4 py-4">
              <Link href="/employee" className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-md">
                Profile
              </Link>
              <Link href="/employee/attendance" className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-md">
                Attendance
              </Link>
              <Link href="/employee/payroll" className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-md">
                Payroll
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="hidden text-sm font-medium md:block">John Doe</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
