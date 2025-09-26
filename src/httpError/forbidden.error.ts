import { ErrorCode } from "@/types/httpError";
import { HttpError } from "./httpError";

export class ForbiddenError extends HttpError {
  constructor(message = "Not Found", details?: Record<string, any>) {
    super(403, ErrorCode.FORBIDDEN, message, details);
  }
}
