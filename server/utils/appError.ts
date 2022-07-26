export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    // errors we can predict (user not providing required fields)
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    if (stack) {
      this.stack = stack;
    } else {
      // remove AppError from stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
