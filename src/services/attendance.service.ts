import {
  createAttendance,
  deleteAttendance,
  getAllAttendances,
  getAttendanceById,
  getAttendancesByUserId,
  updateAttendance
} from "../models/attendance.model.js";

export async function listAttendances() {
  return getAllAttendances();
}

export async function findAttendance(id: number) {
  return getAttendanceById(id);
}

export async function listMyAttendances(userId: number) {
  return getAttendancesByUserId(userId);
}

export async function createNewAttendance(data: {
  employeeId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
}) {
  return createAttendance(
    data.employeeId,
    data.date,
    data.checkIn,
    data.checkOut,
    data.status
  );
}

export async function editAttendance(
  id: number,
  data: {
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    status: string;
  }
) {
  const existing = await getAttendanceById(id);

  if (!existing) {
    throw new Error("ATTENDANCE_NOT_FOUND");
  }

  await updateAttendance(
    id,
    data.date,
    data.checkIn,
    data.checkOut,
    data.status
  );
}

export async function removeAttendance(id: number) {
  const existing = await getAttendanceById(id);

  if (!existing) {
    throw new Error("ATTENDANCE_NOT_FOUND");
  }

  await deleteAttendance(id);
}