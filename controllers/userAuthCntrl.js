const catchAsyncErrorHandler = require("../middlewares/catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");
const ErrorHandler = require("../utils/errorHandler");
const usersSchema = require("../db-models/usersSchema");

exports.newUser = catchAsyncErrorHandler(async (req, res, next) => {
  console.log(req.trace);
  const userData = await User.create(req.body);
  const token = userData.getJwtToken();

  res.status(200).json({
    success: true,
    message: "User is created successfully",
    token,
    data: userData,
  });
});

/* login user - /api/v1/login */
exports.loginUser = catchAsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

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

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    message: "Logged In successfully",
    token,
  });
});
