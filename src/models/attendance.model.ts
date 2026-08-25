import { pool } from "../config/database.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Attendance extends RowDataPacket {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: "present" | "absent" | "late" | "leave";
}

export async function getAllAttendances(): Promise<Attendance[]> {
  const [rows] = await pool.execute<Attendance[]>(
    `SELECT
      a.id,
      a.employee_id,
      e.employee_code,
      u.name AS employee_name,
      a.date,
      a.check_in,
      a.check_out,
      a.status
    FROM attendances a
    INNER JOIN employees e ON e.id = a.employee_id
    INNER JOIN users u ON u.id = e.user_id
    ORDER BY a.date DESC, a.id DESC`
  );

  return rows;
}

export async function getAttendanceById(
  id: number
): Promise<Attendance | null> {
  const [rows] = await pool.execute<Attendance[]>(
    `SELECT
      a.id,
      a.employee_id,
      e.employee_code,
      u.name AS employee_name,
      a.date,
      a.check_in,
      a.check_out,
      a.status
    FROM attendances a
    INNER JOIN employees e ON e.id = a.employee_id
    INNER JOIN users u ON u.id = e.user_id
    WHERE a.id = ?
    LIMIT 1`,
    [id]
  );

  return rows.length ? rows[0] : null;
}

export async function getAttendancesByUserId(
  userId: number
): Promise<Attendance[]> {
  const [rows] = await pool.execute<Attendance[]>(
    `SELECT
      a.id,
      a.employee_id,
      e.employee_code,
      u.name AS employee_name,
      a.date,
      a.check_in,
      a.check_out,
      a.status
    FROM attendances a
    INNER JOIN employees e ON e.id = a.employee_id
    INNER JOIN users u ON u.id = e.user_id
    WHERE e.user_id = ?
    ORDER BY a.date DESC`,
    [userId]
  );

  return rows;
}

export async function createAttendance(
  employeeId: number,
  date: string,
  checkIn: string | null,
  checkOut: string | null,
  status: string
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO attendances
      (employee_id, date, check_in, check_out, status)
     VALUES (?, ?, ?, ?, ?)`,
    [employeeId, date, checkIn, checkOut, status]
  );

  return result.insertId;
}

export async function updateAttendance(
  id: number,
  date: string,
  checkIn: string | null,
  checkOut: string | null,
  status: string
) {
  await pool.execute(
    `UPDATE attendances
     SET date = ?,
         check_in = ?,
         check_out = ?,
         status = ?
     WHERE id = ?`,
    [date, checkIn, checkOut, status, id]
  );
}

export async function deleteAttendance(id: number) {
  await pool.execute(
    "DELETE FROM attendances WHERE id = ?",
    [id]
  );
}