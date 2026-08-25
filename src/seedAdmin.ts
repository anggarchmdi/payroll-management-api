import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { pool } from "./config/database.js";

dotenv.config();

async function seedAdmin() {
  try {
    const email = "admin@payroll.com";
    const password = "Admin12345";

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const rows = existing as { id: number }[];

    if (rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.execute(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, 'admin')`,
      ["Administrator", email, hashedPassword]
    );

    console.log("Admin created successfully");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error("Failed to seed admin:", error);
  } finally {
    await pool.end();
  }
}

seedAdmin();