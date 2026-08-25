import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail
} from "../models/user.model.js";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../models/employee.model.js";

export async function listEmployees() {
  return getAllEmployees();
}

export async function findEmployee(id: number) {
  return getEmployeeById(id);
}

export async function createNewEmployee(data: {
  name: string;
  email: string;
  password: string;
  employeeCode: string;
  position: string;
  basicSalary: number;
  joinDate: string;
}) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    12
  );

  const userId = await createUser(
    data.name,
    data.email,
    hashedPassword
  );

  try {
    const employeeId = await createEmployee(
      userId,
      data.employeeCode,
      data.position,
      data.basicSalary,
      data.joinDate
    );

    return {
      id: employeeId,
      userId
    };
  } catch (error) {
    // Rollback sederhana jika employee gagal dibuat.
    throw error;
  }
}

export async function updateEmployeeData(
  id: number,
  data: {
    employeeCode: string;
    position: string;
    basicSalary: number;
    joinDate: string;
  }
) {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new Error("EMPLOYEE_NOT_FOUND");
  }

  await updateEmployee(
    id,
    data.employeeCode,
    data.position,
    data.basicSalary,
    data.joinDate
  );
}

export async function removeEmployee(id: number) {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new Error("EMPLOYEE_NOT_FOUND");
  }

  await deleteEmployee(id);
}