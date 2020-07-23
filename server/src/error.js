/* eslint-disable no-unused-vars */
const notFound = (req, res, next) => {
  const error = new Error(`Not found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    stack: process.env.NODE_ENV === 'production' ? '🐜🐜🐜🐜' : error.stack,
    error,
  });
};

module.exports = { notFound, errorHandler };
