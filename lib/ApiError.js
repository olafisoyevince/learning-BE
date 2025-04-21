class ApiError extends Error {
  constructor({ message = "Error", statusCode = 500, error = null } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
