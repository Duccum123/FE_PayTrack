"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export function EmployeeAttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Example attendance data
  const attendanceData = {
    "2025-05-01": "present",
    "2025-05-02": "present",
    "2025-05-03": "weekend",
    "2025-05-04": "weekend",
    "2025-05-05": "present",
    "2025-05-06": "present",
    "2025-05-07": "present",
    "2025-05-08": "present",
    "2025-05-09": "present",
    "2025-05-10": "weekend",
    "2025-05-11": "weekend",
    "2025-05-12": "present",
    "2025-05-13": "present",
    "2025-05-14": "present",
    "2025-05-15": "present",
    "2025-05-16": "present",
    "2025-05-17": "weekend",
    "2025-05-18": "weekend",
    "2025-05-19": "absent",
    "2025-05-20": "present",
    "2025-05-21": "present",
    "2025-05-22": "present",
    "2025-05-23": "half-day",
    "2025-05-24": "weekend",
    "2025-05-25": "weekend",
    "2025-05-26": "present",
    "2025-05-27": "present",
    "2025-05-28": "present",
    "2025-05-29": "present",
    "2025-05-30": "present",
    "2025-05-31": "weekend",
  }

  // Function to get the status for a specific date
  const getDateStatus = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return attendanceData[dateString as keyof typeof attendanceData] || "future"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex justify-center w-full md:justify-start md:w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border max-w-full"
              modifiers={{
                present: (date) => getDateStatus(date) === "present",
                absent: (date) => getDateStatus(date) === "absent",
                halfDay: (date) => getDateStatus(date) === "half-day",
                weekend: (date) => getDateStatus(date) === "weekend",
              }}
              modifiersClassNames={{
                present: "bg-green-100 text-green-900",
                absent: "bg-red-100 text-red-900",
                halfDay: "bg-yellow-100 text-yellow-900",
                weekend: "bg-gray-100 text-gray-500",
              }}
            />
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-4 md:flex-col md:justify-start">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-red-500" />
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500" />
              <span className="text-sm">Half Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-300" />
              <span className="text-sm">Weekend/Holiday</span>
            </div>
          </div>
        </div>

        {date && (
          <div className="mt-4 rounded-md bg-muted p-4">
            <h4 className="font-medium">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <div className="mt-2 flex items-center gap-2">
              <span>Status:</span>
              {getDateStatus(date) === "present" && <Badge className="bg-green-500">Present</Badge>}
              {getDateStatus(date) === "absent" && <Badge variant="destructive">Absent</Badge>}
              {getDateStatus(date) === "half-day" && (
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                  Half Day
                </Badge>
              )}
              {getDateStatus(date) === "weekend" && <Badge variant="outline">Weekend</Badge>}
              {getDateStatus(date) === "future" && <Badge variant="outline">Upcoming</Badge>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
