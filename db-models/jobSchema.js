const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a job title"],
    trim: true,
    maxLength: [20, "Job title cannot exceeds 20 chars"],
  },
  slug: String,

  description: {
    type: String,
    required: [true, "Please enter job description"],
    maxLength: [1000, "Job description cannot exceeds 1000 chars..."],
  },

  email: {
    type: String,
    required: [true, "Please enter you email"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  address: {
    type: String,
    required: [true, "Please enter your address"],
  },

  company: {
    type: String,
    required: [true, "Please enter company name"],
  },

  industry: {
    type: [String],
    required: true,
    enum: {
      values: ["Business", "IT", "Medical", "Others"],
      message: "Please select correct option for industry",
    },
  },

  jobType: {
    type: String,
    required: true,
    enum: {
      values: ["Permanent", "Contract", "Internship"],
      message: "Please select correct option for Job type",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },

  experience: {
    type: String,
    required: true,
    enum: {
      values: ["NO EXP", "1-2", "3-8", "More that 10 yrs"],
      message: "Please select Correct options for Experience",
    },
  },

  salary: {
    type: Number,
    required: true,
  },

  postingDate: {
    type: String,
    default: Date.now,
  },

  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

module.exports = mongoose.model("Job", jobSchema);
