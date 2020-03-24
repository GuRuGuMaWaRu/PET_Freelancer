class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // errors we can predict (user not providing required fields)
    this.isOperational = true;

    // Remove AppError from stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
