import { Request, Response } from "express";

import {
  listEmployees,
  findEmployee,
  createNewEmployee,
  updateEmployeeData,
  removeEmployee
} from "../services/employee.service.js";

import {
  createEmployeeSchema,
  updateEmployeeSchema
} from "../schemas/employee.schema.js";

export async function getEmployees(
  _req: Request,
  res: Response
) {
  try {
    const employees = await listEmployees();

    return res.status(200).json({
      employees
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getEmployee(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    const employee = await findEmployee(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    return res.status(200).json({
      employee
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function createEmployee(
  req: Request,
  res: Response
) {
  try {
    const data = createEmployeeSchema.parse(req.body);

    const result = await createNewEmployee(data);

    return res.status(201).json({
      message: "Employee created successfully",
      employee: result
    });
  } catch (error: any) {
    if (error?.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        message: "Email already registered"
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

export async function updateEmployee(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    const data = updateEmployeeSchema.parse(req.body);

    await updateEmployeeData(id, data);

    return res.status(200).json({
      message: "Employee updated successfully"
    });
  } catch (error: any) {
    if (error?.message === "EMPLOYEE_NOT_FOUND") {
      return res.status(404).json({
        message: "Employee not found"
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

export async function deleteEmployee(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    await removeEmployee(id);

    return res.status(200).json({
      message: "Employee deleted successfully"
    });
  } catch (error: any) {
    if (error?.message === "EMPLOYEE_NOT_FOUND") {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}