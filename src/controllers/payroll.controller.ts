import { Request, Response } from "express";

import {
  listPayrolls,
  findPayroll,
  listMyPayrolls,
  createNewPayroll,
  editPayroll,
  removePayroll
} from "../services/payroll.service.js";

import {
  createPayrollSchema,
  updatePayrollSchema
} from "../schemas/payroll.schema.js";

export async function getPayrolls(
  _req: Request,
  res: Response
) {
  try {
    const payrolls = await listPayrolls();

    return res.json({ payrolls });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getMyPayrolls(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const payrolls = await listMyPayrolls(
      req.user.id
    );

    return res.json({ payrolls });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getPayroll(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid payroll ID"
      });
    }

    const payroll = await findPayroll(id);

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found"
      });
    }

    return res.json({ payroll });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function createPayroll(
  req: Request,
  res: Response
) {
  try {
    const data = createPayrollSchema.parse(req.body);

    const id = await createNewPayroll(data);

    return res.status(201).json({
      message: "Payroll created successfully",
      id
    });
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Payroll for this employee and period already exists"
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

export async function updatePayroll(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid payroll ID"
      });
    }

    const data = updatePayrollSchema.parse(
      req.body
    );

    await editPayroll(id, data);

    return res.json({
      message: "Payroll updated successfully"
    });
  } catch (error: any) {
    if (error?.message === "PAYROLL_NOT_FOUND") {
      return res.status(404).json({
        message: "Payroll not found"
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

export async function deletePayroll(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid payroll ID"
      });
    }

    await removePayroll(id);

    return res.json({
      message: "Payroll deleted successfully"
    });
  } catch (error: any) {
    if (error?.message === "PAYROLL_NOT_FOUND") {
      return res.status(404).json({
        message: "Payroll not found"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}