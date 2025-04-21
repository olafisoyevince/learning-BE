function successResponse({
  res,
  message = "Success",
  data = null,
  statusCode = 200,
}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export { successResponse };
