const Job = require("../db-models/jobSchema");

/* Get jobs controller */

const notFoud = (res) => {
  res.status(404).json({
    sucess: false,
    message: "Error - Not Found",
  });
};

const successSubmission = (res, job) => {
  res.status(200).json({
    success: true,
    message: "Operation Successful",
    data: job,
  });
};

/* Get all jobs */
exports.getJobs = async (req, res, next) => {
  const allJobs = await Job.find(); //Find

  successSubmission(res, allJobs);
};

/* Creation of jobs */

exports.newJob = async (req, res, next) => {
  const newJob = await Job.create(req.body); //creation
  successSubmission(res, newJob);
};

/* Updating a job */

exports.updateJob = async (req, res, next) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!updateJob) {
    notFoud(res);
  } else {
    successSubmission(res, updateJob);
  }
};

/* Deleting a job */

exports.deleteJob = async (req, res, next) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    notFoud(res);
  } else {
    successSubmission(res, deletedJob);
  }
};
