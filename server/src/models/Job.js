const mongoose = require("mongoose");
const validator = require("validator");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    required: [true, requiredErrorMessage("Company Id")],
    ref: "Company",
  },
  // jobName: {
  //   type: String,
  //   required: [true, requiredErrorMessage("Job Name")],
  //   minlength: [3, minLengthErrorMessage(3, "Job Name")],
  //   maxlength: [50, maxLengthErrorMessage(50, "Job Name")],
  // },
  jobRole: {
    type: String,
    required: [true, requiredErrorMessage("Job Role")],
  },
  skills: {
    type: String,
    required: [true, requiredErrorMessage("Skill")],
  },
  expRequired: {
    type: Number,
    // required: [true, requiredErrorMessage("Exp")],
  },
  jobDescription: {
    type: String,
    required: [true, requiredErrorMessage("Job Description")],
    minlength: [5, minLengthErrorMessage(5, "Job Description")],
    maxlength: [500, maxLengthErrorMessage(500, "Job Description")],
  },
  compensation: {
    type: Number,
    required: [true, requiredErrorMessage("Compensation")],
  },
});

module.exports = mongoose.model("Job", JobSchema);
