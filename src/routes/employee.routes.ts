import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controller.js";

const router = Router();

router.use(authenticate);
router.use(authorize("admin"));

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Get all employees
 *     description: Get all employees. Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get("/", getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Get employee by ID
 *     description: Get detailed employee information by ID. Admin only.
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
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get("/:id", getEmployee);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Create employee
 *     description: Create a new employee account. Admin only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - employeeCode
 *               - position
 *               - basicSalary
 *               - joinDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Budi
 *               email:
 *                 type: string
 *                 format: email
 *                 example: budi@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Budi12345
 *               employeeCode:
 *                 type: string
 *                 example: EMP001
 *               position:
 *                 type: string
 *                 example: Frontend Developer
 *               basicSalary:
 *                 type: number
 *                 example: 3000000
 *               joinDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-01
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Employee or email already exists
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.post("/", createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     tags:
 *       - Employees
 *     summary: Update employee
 *     description: Update employee information. Admin only.
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Budi Updated
 *               position:
 *                 type: string
 *                 example: Senior Frontend Developer
 *               basicSalary:
 *                 type: number
 *                 example: 4000000
 *               joinDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-01
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.put("/:id", updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: Delete employee
 *     description: Delete an employee. Admin only.
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
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.delete("/:id", deleteEmployee);

export default router;