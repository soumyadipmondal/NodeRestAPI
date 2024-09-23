class ErrorHandler extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constuctor);
  }
}

module.exports = ErrorHandler;
