import { ErrorCode } from "@/types/httpError";
import { HttpError } from "./httpError";

export class UnathorizedError extends HttpError {
  constructor(message = "Not Found", details?: Record<string, any>) {
    super(401, ErrorCode.FORBIDDEN, message, details);
  }
}
