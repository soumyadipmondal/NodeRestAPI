/* Get jobs controller */

exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    methodName: req.reqMthd,
    url: req.URL,
    message: "Routes to get all jobs",
  });
};
