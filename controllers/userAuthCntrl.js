const catchAsyncErrorHandler = require("../middlewares/catchAsyncErrorHandler");
const User = require("../db-models/usersSchema");

exports.newUser = catchAsyncErrorHandler(async (req, res, next) => {
  const userData = await User.create(req.body);
  const token = userData.getJwtToken();

  res.status(200).json({
    success: true,
    message: "User is created successfully",
    token,
    data: userData,
  });
});
