export const NotFound = (req, res, next) => {
  res.status(404).json("Page Not Found");
};

export const ErrorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 202 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
