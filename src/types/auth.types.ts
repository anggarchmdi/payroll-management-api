export type UserRole = "admin" | "employee";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}