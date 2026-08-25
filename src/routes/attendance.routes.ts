import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
  getAttendances,
  getMyAttendances,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendance.controller.js";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/attendances/me:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: Get my attendance
 *     description: Get attendance records belonging to the authenticated employee.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendances:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Employee permission required
 */
router.get(
  "/me",
  authorize("employee"),
  getMyAttendances
);

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: Get all attendance records
 *     description: Get all employee attendance records. Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendances:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get(
  "/",
  authorize("admin"),
  getAttendances
);

/**
 * @swagger
 * /api/attendances/{id}:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: Get attendance by ID
 *     description: Get a specific attendance record. Admin only.
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
 *         description: Attendance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendance:
 *                   $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.get(
  "/:id",
  authorize("admin"),
  getAttendance
);

/**
 * @swagger
 * /api/attendances:
 *   post:
 *     tags:
 *       - Attendance
 *     summary: Create attendance
 *     description: Create an attendance record for an employee. Admin only.
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
 *               - date
 *               - status
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-25
 *               checkIn:
 *                 type: string
 *                 nullable: true
 *                 example: "08:00:00"
 *               checkOut:
 *                 type: string
 *                 nullable: true
 *                 example: "17:00:00"
 *               status:
 *                 type: string
 *                 enum:
 *                   - present
 *                   - absent
 *                   - late
 *                   - leave
 *                 example: present
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Attendance already exists for this employee and date
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.post(
  "/",
  authorize("admin"),
  createAttendance
);

/**
 * @swagger
 * /api/attendances/{id}:
 *   put:
 *     tags:
 *       - Attendance
 *     summary: Update attendance
 *     description: Update an attendance record. Admin only.
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
 *               - date
 *               - status
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-25
 *               checkIn:
 *                 type: string
 *                 nullable: true
 *                 example: "08:00:00"
 *               checkOut:
 *                 type: string
 *                 nullable: true
 *                 example: "17:00:00"
 *               status:
 *                 type: string
 *                 enum:
 *                   - present
 *                   - absent
 *                   - late
 *                   - leave
 *                 example: present
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Attendance not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.put(
  "/:id",
  authorize("admin"),
  updateAttendance
);

/**
 * @swagger
 * /api/attendances/{id}:
 *   delete:
 *     tags:
 *       - Attendance
 *     summary: Delete attendance
 *     description: Delete an attendance record. Admin only.
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
 *         description: Attendance deleted successfully
 *       404:
 *         description: Attendance not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.delete(
  "/:id",
  authorize("admin"),
  deleteAttendance
);

export default router;