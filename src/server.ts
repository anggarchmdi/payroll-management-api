import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { pool } from "./config/database.js";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
}

startServer();