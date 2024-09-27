const Job = require("../db-models/jobSchema");
const catchAsyncErrorHandler = require("../middlewares/catchAsyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

/* Get jobs controller */

const notFoud = (res, next) => {
  return next(new ErrorHandler("Error - Job Not Found", 400));
  /* res.status(404).json({
    sucess: false,
    message: "Error - Not Found",
  }); */
};

const successSubmission = (res, job) => {
  res.status(200).json({
    success: true,
    message: "Operation Successful",
    data: job,
  });
};

/* Get all jobs */
exports.getJobs = catchAsyncErrorHandler(async (req, res, next) => {
  console.log(req.trace);
  const allJobs = await Job.find(); //Find

  successSubmission(res, allJobs);
});

/* Creation of jobs */

exports.newJob = catchAsyncErrorHandler(async (req, res, next) => {
  // catch Async will give error
  const newJob = await Job.create(req.body); //creation
  successSubmission(res, newJob);
});

/* Updating a job */

exports.updateJob = catchAsyncErrorHandler(async (req, res, next) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!updateJob) {
    notFoud(res, next);
  } else {
    successSubmission(res, updateJob);
  }
});

/* Deleting a job */

exports.deleteJob = async (req, res, next) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    notFoud(res, next);
  } else {
    successSubmission(res, deletedJob);
  }
};
