function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV === "development" ? err.error || err.stack : null,
  });
}

export { errorHandler };
