import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
  findUserById
} from "../models/user.model.js";

import { AuthUser } from "../types/auth.types.js";

function createToken(user: AuthUser): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    } as jwt.SignOptions
  );
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const userId = await createUser(
    name,
    email,
    hashedPassword
  );

  return {
    id: userId,
    name,
    email,
    role: "employee" as const
  };
}

export async function login(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const authUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const token = createToken(authUser);

  return {
    user: authUser,
    token
  };
}

export async function getMe(userId: number) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}