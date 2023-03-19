const mongoose = require("mongoose");

const { requiredErrorMessage, maxLengthErrorMessage } = require("../utils");

const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    required: [true, requiredErrorMessage("Company Id")],
    ref: "Company",
  },
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
  },
  jobDescription: {
    type: String,
    required: [true, requiredErrorMessage("Job Description")],
    maxlength: [200, maxLengthErrorMessage(200, "Job Description")],
  },
  compensation: {
    type: Number,
    required: [true, requiredErrorMessage("Compensation")],
  },
});

module.exports = mongoose.model("Job", JobSchema);
