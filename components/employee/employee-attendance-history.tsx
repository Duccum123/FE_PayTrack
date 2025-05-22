import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EmployeeAttendanceHistory() {
  const attendanceHistory = [
    {
      id: 1,
      date: "May 17, 2025",
      day: "Saturday",
      status: "Weekend",
      hoursWorked: "-",
      notes: "-",
    },
    {
      id: 2,
      date: "May 16, 2025",
      day: "Friday",
      status: "Half Day",
      hoursWorked: "4",
      notes: "Left early for doctor's appointment",
    },
    {
      id: 3,
      date: "May 15, 2025",
      day: "Thursday",
      status: "Present",
      hoursWorked: "8",
      notes: "",
    },
    {
      id: 4,
      date: "May 14, 2025",
      day: "Wednesday",
      status: "Present",
      hoursWorked: "8",
      notes: "",
    },
    {
      id: 5,
      date: "May 13, 2025",
      day: "Tuesday",
      status: "Present",
      hoursWorked: "8",
      notes: "",
    },
    {
      id: 6,
      date: "May 12, 2025",
      day: "Monday",
      status: "Present",
      hoursWorked: "8",
      notes: "",
    },
    {
      id: 7,
      date: "May 11, 2025",
      day: "Sunday",
      status: "Weekend",
      hoursWorked: "-",
      notes: "-",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attendance History</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.day}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Present"
                          ? "default"
                          : record.status === "Absent"
                            ? "destructive"
                            : record.status === "Half Day"
                              ? "outline"
                              : "secondary"
                      }
                      className={
                        record.status === "Present"
                          ? "bg-green-500 hover:bg-green-600"
                          : record.status === "Half Day"
                            ? "border-yellow-500 text-yellow-700"
                            : ""
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.hoursWorked}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{record.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-4">
          {attendanceHistory.map((record) => (
            <div key={record.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{record.date}</p>
                  <p className="text-sm text-muted-foreground">{record.day}</p>
                </div>
                <Badge
                  variant={
                    record.status === "Present"
                      ? "default"
                      : record.status === "Absent"
                        ? "destructive"
                        : record.status === "Half Day"
                          ? "outline"
                          : "secondary"
                  }
                  className={
                    record.status === "Present"
                      ? "bg-green-500 hover:bg-green-600"
                      : record.status === "Half Day"
                        ? "border-yellow-500 text-yellow-700"
                        : ""
                  }
                >
                  {record.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Hours Worked</p>
                  <p>{record.hoursWorked}</p>
                </div>
                {record.notes !== "-" && (
                  <div className="col-span-2 mt-1">
                    <p className="text-muted-foreground">Notes</p>
                    <p>{record.notes || "-"}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
