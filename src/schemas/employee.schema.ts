import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.string().email(),

  password: z.string().min(8).max(100),

  employeeCode: z
    .string()
    .min(2)
    .max(20),

  position: z
    .string()
    .min(2)
    .max(100),

  basicSalary: z
    .number()
    .nonnegative(),

  joinDate: z
    .string()
    .date()
});

export const updateEmployeeSchema = z.object({
  employeeCode: z
    .string()
    .min(2)
    .max(20),

  position: z
    .string()
    .min(2)
    .max(100),

  basicSalary: z
    .number()
    .nonnegative(),

  joinDate: z
    .string()
    .date()
});