import { RESPONSE_ERRORS } from "@shared/utils";

export class AppError {
  public readonly message: string | typeof RESPONSE_ERRORS;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
