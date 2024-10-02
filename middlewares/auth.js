const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrorHandler = require("./catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");

exports.isAuthenticated = catchAsyncErrorHandler((req, res, next) => {
  let token = "";
  const isAuthPresentInHeaders = req.headers.authorization;

  if (isAuthPresentInHeaders && isAuthPresentInHeaders.startsWith("Bearer")) {
    token = isAuthPresentInHeaders.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("User not authorized", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = User.findById(decoded.id);

  next();
});
