import { Request, Response } from "express";

import {
  register,
  login,
  getMe
} from "../services/auth.service.js";

import {
  registerSchema,
  loginSchema
} from "../schemas/auth.schema.js";

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const data = registerSchema.parse(req.body);

    const user = await register(
      data.name,
      data.email,
      data.password
    );

    return res.status(201).json({
      message: "Registration successful",
      user
    });
  } catch (error: any) {
    if (error?.code === "VALIDATION_ERROR") {
      return res.status(400).json({
        message: error.message
      });
    }

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

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await login(
      data.email,
      data.password
    );

    return res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (error: any) {
    if (error?.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid email or password"
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

export async function meController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const user = await getMe(req.user.id);

    return res.status(200).json({
      user
    });
  } catch (error: any) {
    if (error?.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}