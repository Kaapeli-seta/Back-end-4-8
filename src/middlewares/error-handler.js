import {validationResult} from 'express-validator';

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    //const error = new Error('Invalid or missing fields');
    console.log('validation error', errors.array());
    const errorString = errors.array().join(', ');
    return next(customError('validation' + errorString, 400));
  }
};

const customError = (message, status) => {
  const error = new Error(message);
  error.status = status || 500;
  return error;
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export {notFoundHandler, errorHandler, validationErrorHandler, customError};
