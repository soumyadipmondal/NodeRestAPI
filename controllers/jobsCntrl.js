const Job = require("../db-models/jobSchema");

/* Get jobs controller */

exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    methodName: req.reqMthd,
    url: req.URL,
    message: "Routes to get all jobs",
  });
};

exports.newJob = async (req, res, next) => {
  console.log("params -> ", req.body);
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    methodName: req.reqMthd,
    url: req.URL,
    message: "New job is added",
    data: job,
  });
};
