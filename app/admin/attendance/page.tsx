import { AttendanceForm } from "@/components/admin/attendance-form"
import { AttendanceHistory } from "@/components/admin/attendance-history"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <AttendanceForm />
        <AttendanceHistory />
      </div>
    </div>
  )
}
