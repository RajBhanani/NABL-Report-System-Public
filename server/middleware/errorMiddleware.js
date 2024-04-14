export const notFound = (request, response, next) => {
  const error = new Error(`Not found ${request.originalUrl}`);
  response.status(400);
  next(error);
};

export const errorHandler = (error, request, response, next) => {
  let statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  let message = error.message;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  response.status(statusCode).json({
    message: message,
    stack: process.env.NODE_END === "production" ? null : error.stack,
  });
};
