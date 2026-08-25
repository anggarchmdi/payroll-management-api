import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts. Try again later."
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Payroll API is running"
  });
});

app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/attendances",
  attendanceRoutes
);

app.use(
  "/api/payrolls",
  payrollRoutes
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default app;