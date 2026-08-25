import { pool } from "../config/database.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Employee extends RowDataPacket {
  id: number;
  user_id: number;
  employee_code: string;
  position: string;
  basic_salary: number;
  join_date: string;
  name: string;
  email: string;
  role: "admin" | "employee";
}

export async function getAllEmployees(): Promise<Employee[]> {
  const [rows] = await pool.execute<Employee[]>(
    `SELECT
      e.id,
      e.user_id,
      e.employee_code,
      e.position,
      e.basic_salary,
      e.join_date,
      u.name,
      u.email,
      u.role
    FROM employees e
    INNER JOIN users u ON u.id = e.user_id
    ORDER BY e.id DESC`
  );

  return rows;
}

export async function getEmployeeById(
  id: number
): Promise<Employee | null> {
  const [rows] = await pool.execute<Employee[]>(
    `SELECT
      e.id,
      e.user_id,
      e.employee_code,
      e.position,
      e.basic_salary,
      e.join_date,
      u.name,
      u.email,
      u.role
    FROM employees e
    INNER JOIN users u ON u.id = e.user_id
    WHERE e.id = ?
    LIMIT 1`,
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function getEmployeeByUserId(
  userId: number
): Promise<Employee | null> {
  const [rows] = await pool.execute<Employee[]>(
    `SELECT
      e.id,
      e.user_id,
      e.employee_code,
      e.position,
      e.basic_salary,
      e.join_date,
      u.name,
      u.email,
      u.role
    FROM employees e
    INNER JOIN users u ON u.id = e.user_id
    WHERE e.user_id = ?
    LIMIT 1`,
    [userId]
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function createEmployee(
  userId: number,
  employeeCode: string,
  position: string,
  basicSalary: number,
  joinDate: string
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO employees
      (user_id, employee_code, position, basic_salary, join_date)
     VALUES (?, ?, ?, ?, ?)`,
    [
      userId,
      employeeCode,
      position,
      basicSalary,
      joinDate
    ]
  );

  return result.insertId;
}

export async function updateEmployee(
  id: number,
  employeeCode: string,
  position: string,
  basicSalary: number,
  joinDate: string
): Promise<void> {
  await pool.execute(
    `UPDATE employees
     SET employee_code = ?,
         position = ?,
         basic_salary = ?,
         join_date = ?
     WHERE id = ?`,
    [
      employeeCode,
      position,
      basicSalary,
      joinDate,
      id
    ]
  );
}

export async function deleteEmployee(
  id: number
): Promise<void> {
  await pool.execute(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );
}