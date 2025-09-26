import { ErrorCode } from "@/types/httpError";
import { HttpError } from "./httpError";

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", details?: Record<string, any>) {
    super(404, ErrorCode.NOT_FOUND, message, details);
  }
}
