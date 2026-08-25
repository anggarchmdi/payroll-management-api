import {
  createPayroll,
  deletePayroll,
  getAllPayrolls,
  getPayrollById,
  getPayrollsByUserId,
  updatePayroll
} from "../models/payroll.model.js";

export async function listPayrolls() {
  return getAllPayrolls();
}

export async function findPayroll(id: number) {
  return getPayrollById(id);
}

export async function listMyPayrolls(userId: number) {
  return getPayrollsByUserId(userId);
}

export async function createNewPayroll(data: {
  employeeId: number;
  month: number;
  year: number;
  basicSalary: number;
  attendanceDays: number;
  deduction: number;
  bonus: number;
}) {
  const netSalary =
    data.basicSalary +
    data.bonus -
    data.deduction;

  return createPayroll(
    data.employeeId,
    data.month,
    data.year,
    data.basicSalary,
    data.attendanceDays,
    data.deduction,
    data.bonus,
    netSalary
  );
}

export async function editPayroll(
  id: number,
  data: {
    basicSalary: number;
    attendanceDays: number;
    deduction: number;
    bonus: number;
  }
) {
  const payroll = await getPayrollById(id);

  if (!payroll) {
    throw new Error("PAYROLL_NOT_FOUND");
  }

  const netSalary =
    data.basicSalary +
    data.bonus -
    data.deduction;

  await updatePayroll(
    id,
    data.basicSalary,
    data.attendanceDays,
    data.deduction,
    data.bonus,
    netSalary
  );
}

export async function removePayroll(id: number) {
  const payroll = await getPayrollById(id);

  if (!payroll) {
    throw new Error("PAYROLL_NOT_FOUND");
  }

  await deletePayroll(id);
}