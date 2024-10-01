const catchAsyncErrorHandler = require("../middlewares/catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");
const ErrorHandler = require("../utils/errorHandler");
const usersSchema = require("../db-models/usersSchema");
const sendToken = require("../utils/jwtTokenMgmt");

exports.newUser = catchAsyncErrorHandler(async (req, res, next) => {
  console.log(req.trace);

  const userData = await User.create(req.body);

  sendToken(userData, 200, res);
});

/* login user - /api/v1/login */
exports.loginUser = catchAsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    next(new ErrorHandler("Please enter a valid email and password", 401));
  }
  /* Finding user in DB */

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(new ErrorHandler("User Not Found!", 401));
  }
  const isPwdMatched = user.comparePassword(password);

  if (!isPwdMatched) {
    next(new ErrorHandler("Password does not match", 401));
  }

  sendToken(user, 200, res);
});
