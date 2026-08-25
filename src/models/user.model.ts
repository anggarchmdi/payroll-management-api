import { pool } from "../config/database.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  created_at: Date;
  updated_at: Date;
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const [rows] = await pool.execute<User[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function findUserById(
  id: number
): Promise<User | null> {
  const [rows] = await pool.execute<User[]>(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, 'employee')`,
    [name, email, password]
  );

  return result.insertId;
}