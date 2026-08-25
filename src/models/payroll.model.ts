import { pool } from "../config/database.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Payroll extends RowDataPacket {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  month: number;
  year: number;
  basic_salary: number;
  attendance_days: number;
  deduction: number;
  bonus: number;
  net_salary: number;
}

export async function getAllPayrolls(): Promise<Payroll[]> {
  const [rows] = await pool.execute<Payroll[]>(
    `SELECT
      p.id,
      p.employee_id,
      e.employee_code,
      u.name AS employee_name,
      p.month,
      p.year,
      p.basic_salary,
      p.attendance_days,
      p.deduction,
      p.bonus,
      p.net_salary
    FROM payrolls p
    INNER JOIN employees e ON e.id = p.employee_id
    INNER JOIN users u ON u.id = e.user_id
    ORDER BY p.year DESC, p.month DESC`
  );

  return rows;
}

export async function getPayrollById(
  id: number
): Promise<Payroll | null> {
  const [rows] = await pool.execute<Payroll[]>(
    `SELECT
      p.id,
      p.employee_id,
      e.employee_code,
      u.name AS employee_name,
      p.month,
      p.year,
      p.basic_salary,
      p.attendance_days,
      p.deduction,
      p.bonus,
      p.net_salary
    FROM payrolls p
    INNER JOIN employees e ON e.id = p.employee_id
    INNER JOIN users u ON u.id = e.user_id
    WHERE p.id = ?
    LIMIT 1`,
    [id]
  );

  return rows.length ? rows[0] : null;
}

export async function getPayrollsByUserId(
  userId: number
): Promise<Payroll[]> {
  const [rows] = await pool.execute<Payroll[]>(
    `SELECT
      p.id,
      p.employee_id,
      e.employee_code,
      u.name AS employee_name,
      p.month,
      p.year,
      p.basic_salary,
      p.attendance_days,
      p.deduction,
      p.bonus,
      p.net_salary
    FROM payrolls p
    INNER JOIN employees e ON e.id = p.employee_id
    INNER JOIN users u ON u.id = e.user_id
    WHERE e.user_id = ?
    ORDER BY p.year DESC, p.month DESC`,
    [userId]
  );

  return rows;
}

export async function createPayroll(
  employeeId: number,
  month: number,
  year: number,
  basicSalary: number,
  attendanceDays: number,
  deduction: number,
  bonus: number,
  netSalary: number
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO payrolls
      (
        employee_id,
        month,
        year,
        basic_salary,
        attendance_days,
        deduction,
        bonus,
        net_salary
      )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      employeeId,
      month,
      year,
      basicSalary,
      attendanceDays,
      deduction,
      bonus,
      netSalary
    ]
  );

  return result.insertId;
}

export async function updatePayroll(
  id: number,
  basicSalary: number,
  attendanceDays: number,
  deduction: number,
  bonus: number,
  netSalary: number
) {
  await pool.execute(
    `UPDATE payrolls
     SET basic_salary = ?,
         attendance_days = ?,
         deduction = ?,
         bonus = ?,
         net_salary = ?
     WHERE id = ?`,
    [
      basicSalary,
      attendanceDays,
      deduction,
      bonus,
      netSalary,
      id
    ]
  );
}

export async function deletePayroll(id: number) {
  await pool.execute(
    "DELETE FROM payrolls WHERE id = ?",
    [id]
  );
}