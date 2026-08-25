import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
  getPayrolls,
  getMyPayrolls,
  getPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll
} from "../controllers/payroll.controller.js";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/payrolls/me:
 *   get:
 *     tags:
 *       - Payroll
 *     summary: Get my payroll
 *     description: Get payroll records belonging to the authenticated employee.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payroll records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payrolls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payroll'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Employee permission required
 */
router.get(
  "/me",
  authorize("employee"),
  getMyPayrolls
);

/**
 * @swagger
 * /api/payrolls:
 *   get:
 *     tags:
 *       - Payroll
 *     summary: Get all payroll records
 *     description: Get all employee payroll records. Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payroll records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payrolls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payroll'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get(
  "/",
  authorize("admin"),
  getPayrolls
);

/**
 * @swagger
 * /api/payrolls/{id}:
 *   get:
 *     tags:
 *       - Payroll
 *     summary: Get payroll by ID
 *     description: Get a specific payroll record. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Payroll retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payroll:
 *                   $ref: '#/components/schemas/Payroll'
 *       404:
 *         description: Payroll not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get(
  "/:id",
  authorize("admin"),
  getPayroll
);

/**
 * @swagger
 * /api/payrolls:
 *   post:
 *     tags:
 *       - Payroll
 *     summary: Create payroll
 *     description: Create monthly payroll for an employee. Net salary is calculated automatically as basic salary plus bonus minus deduction.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - month
 *               - year
 *               - basicSalary
 *               - attendanceDays
 *               - deduction
 *               - bonus
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 8
 *               year:
 *                 type: integer
 *                 example: 2026
 *               basicSalary:
 *                 type: number
 *                 example: 3000000
 *               attendanceDays:
 *                 type: integer
 *                 example: 22
 *               deduction:
 *                 type: number
 *                 example: 100000
 *               bonus:
 *                 type: number
 *                 example: 250000
 *     responses:
 *       201:
 *         description: Payroll created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Payroll for this employee and period already exists
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.post(
  "/",
  authorize("admin"),
  createPayroll
);

/**
 * @swagger
 * /api/payrolls/{id}:
 *   put:
 *     tags:
 *       - Payroll
 *     summary: Update payroll
 *     description: Update payroll information. Net salary is recalculated automatically.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - basicSalary
 *               - attendanceDays
 *               - deduction
 *               - bonus
 *             properties:
 *               basicSalary:
 *                 type: number
 *                 example: 3500000
 *               attendanceDays:
 *                 type: integer
 *                 example: 23
 *               deduction:
 *                 type: number
 *                 example: 50000
 *               bonus:
 *                 type: number
 *                 example: 300000
 *     responses:
 *       200:
 *         description: Payroll updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Payroll not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.put(
  "/:id",
  authorize("admin"),
  updatePayroll
);

/**
 * @swagger
 * /api/payrolls/{id}:
 *   delete:
 *     tags:
 *       - Payroll
 *     summary: Delete payroll
 *     description: Delete a payroll record. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Payroll deleted successfully
 *       404:
 *         description: Payroll not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.delete(
  "/:id",
  authorize("admin"),
  deletePayroll
);

export default router;