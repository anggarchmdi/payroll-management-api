import { pool } from "./database.js";

async function testDatabase() {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");

    console.log("Database connected:", rows);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

testDatabase();