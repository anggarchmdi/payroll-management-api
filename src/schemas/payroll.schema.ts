import { z } from "zod";

export const createPayrollSchema = z.object({
  employeeId: z.number().int().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
  basicSalary: z.number().nonnegative(),
  attendanceDays: z.number().int().nonnegative(),
  deduction: z.number().nonnegative(),
  bonus: z.number().nonnegative()
});

export const updatePayrollSchema = z.object({
  basicSalary: z.number().nonnegative(),
  attendanceDays: z.number().int().nonnegative(),
  deduction: z.number().nonnegative(),
  bonus: z.number().nonnegative()
});