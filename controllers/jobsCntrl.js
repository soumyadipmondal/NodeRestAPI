/* Get jobs controller */

exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Routes to get all jobs",
  });
};
