const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrorHandler = require("./catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");

exports.isAuthenticated = catchAsyncErrorHandler(async (req, res, next) => {
  let token = "";
  const isAuthPresentInHeaders = req.headers.authorization;

  if (isAuthPresentInHeaders && isAuthPresentInHeaders.startsWith("Bearer")) {
    token = isAuthPresentInHeaders.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("User not authorized", 401));
  }
  console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  req.user = await User.findById(decoded.id);
  console.log(req.user.name);
  next();
});

exports.authorizedRoles = (...roles) => {
  return catchAsyncErrorHandler((req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  });
};
