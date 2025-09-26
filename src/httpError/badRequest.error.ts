import { ErrorCode } from "@/types/httpError";
import { HttpError } from "./httpError";

export class BadRequestError extends HttpError {
  constructor(message = "Not Found", details?: Record<string, any>) {
    super(400, ErrorCode.BAD_REQUEST, message, details);
  }
}
