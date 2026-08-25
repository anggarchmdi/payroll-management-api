import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthUser } from "../types/auth.types.js";

interface JwtPayload {
  id: number;
  role: "admin" | "employee";
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is required"
      });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization format"
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(
      token,
      secret
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: "",
      email: ""
    } satisfies AuthUser;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}