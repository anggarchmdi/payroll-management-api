import { z } from "zod";

export const attendanceSchema = z.object({
  employeeId: z.number().int().positive(),
  date: z.string().date(),
  checkIn: z.string().nullable(),
  checkOut: z.string().nullable(),
  status: z.enum([
    "present",
    "absent",
    "late",
    "leave"
  ])
});

export const updateAttendanceSchema = z.object({
  date: z.string().date(),
  checkIn: z.string().nullable(),
  checkOut: z.string().nullable(),
  status: z.enum([
    "present",
    "absent",
    "late",
    "leave"
  ])
});