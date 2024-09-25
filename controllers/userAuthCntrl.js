const catchAsyncErrorHandler = require("../middlewares/catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");

exports.newUser = catchAsyncErrorHandler(async (req, res, next) => {
  const userData = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "User is created successfully",
    data: userData,
  });
});
