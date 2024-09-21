const Job = require("../db-models/jobSchema");

/* Get jobs controller */
/* Get all jobs */
exports.getJobs = async (req, res, next) => {
  const allJobs = await Job.find(); //Find
  res.status(200).json({
    success: true,
    methodName: req.reqMthd,
    url: req.URL,
    message: "All jobs Fetched",
    data: allJobs,
  });
};

/* Creation of jobs */

exports.newJob = async (req, res, next) => {
  console.log("params -> ", req.body);
  const job = await Job.create(req.body); //creation

  res.status(200).json({
    success: true,
    methodName: req.reqMthd,
    url: req.URL,
    message: "New job is added",
    data: job,
  });
};

/* Updating a job */

exports.updateJob = async (req, res, next) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!updateJob) {
    res.status(404).json({
      sucess: false,
      message: "No Relevant job found",
    });
  } else {
    res.status(200).json({
      sucess: true,
      message: "Job details Successfully updated",
      data: updateJob,
    });
  }
};

/* Deleting a job */

exports.deleteJob = async (req, res, next) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);

  if (!deletedJob) {
    res.status(404).json({
      sucess: false,
      message: "No Relevant job found for deletion",
    });
  } else {
    res.status(200).json({
      sucess: true,
      message: "Job details Successfully deleted",
      data: deletedJob,
    });
  }
};
