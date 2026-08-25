import { Request, Response } from "express";

import {
  listAttendances,
  findAttendance,
  listMyAttendances,
  createNewAttendance,
  editAttendance,
  removeAttendance
} from "../services/attendance.service.js";

import {
  attendanceSchema,
  updateAttendanceSchema
} from "../schemas/attendance.schema.js";

export async function getAttendances(
  _req: Request,
  res: Response
) {
  try {
    const attendances = await listAttendances();

    return res.json({ attendances });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getMyAttendances(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const attendances = await listMyAttendances(
      req.user.id
    );

    return res.json({ attendances });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getAttendance(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid attendance ID"
      });
    }

    const attendance = await findAttendance(id);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    return res.json({ attendance });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function createAttendance(
  req: Request,
  res: Response
) {
  try {
    const data = attendanceSchema.parse(req.body);

    const id = await createNewAttendance(data);

    return res.status(201).json({
      message: "Attendance created successfully",
      id
    });
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Attendance for this employee and date already exists"
      });
    }

    if (error?.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function updateAttendance(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid attendance ID"
      });
    }

    const data = updateAttendanceSchema.parse(
      req.body
    );

    await editAttendance(id, data);

    return res.json({
      message: "Attendance updated successfully"
    });
  } catch (error: any) {
    if (error?.message === "ATTENDANCE_NOT_FOUND") {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    if (error?.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function deleteAttendance(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid attendance ID"
      });
    }

    await removeAttendance(id);

    return res.json({
      message: "Attendance deleted successfully"
    });
  } catch (error: any) {
    if (error?.message === "ATTENDANCE_NOT_FOUND") {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}