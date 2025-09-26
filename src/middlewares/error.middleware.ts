import type { Request, Response, NextFunction } from "express";

import { HttpError } from "@/httpError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      error: err.code,         // enum code
      message: err.message,    // user-friendly message
      details: err.details,    // optional context (validation errors, etc.)
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }

  // fallback: unexpected errors
  console.error("Unhandled error:", err);

  return res.status(500).json({
    status: 500,
    error: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong.",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
}