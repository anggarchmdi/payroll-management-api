import { Router } from "express";

import {
  registerController,
  loginController,
  meController
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register new employee
 *     description: Create a new employee account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already registered
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user and return JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current authenticated user
 *       401:
 *         description: Authentication required
 */
router.get(
  "/me",
  authenticate,
  meController
);

export default router;