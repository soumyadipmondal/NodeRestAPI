/* Setting jwt in a cookie  */

const sendToken = (user, statusCode, res) => {
  /* getting token from  */

  const token = user.getJwtToken();
  /* setting options for a cookie */

  const options = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXP_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  /* prod mode https */

  if (process.env.NODE_ENV !== "Development") {
    options.secure = true;
  }

  /* Sending token in res */

  //console.log(token);

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
