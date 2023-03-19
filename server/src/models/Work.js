const mongoose = require("mongoose");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const WorkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, requiredErrorMessage("User Id")],
  },
  companyName: {
    type: String,
    required: [true, requiredErrorMessage("Company Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Company Name")],
  },
  jobTitle: {
    type: String,
    required: [true, requiredErrorMessage("Job Title")],
    maxlength: [50, maxLengthErrorMessage(50, "Job Title")],
  },
  jobDescription: {
    type: String,
    required: [true, requiredErrorMessage("Job Description")],
    maxlength: [200, maxLengthErrorMessage(200, "Job Description")],
  },
  fromDate: {
    required: [true, requiredErrorMessage("From Date")],
    type: Date,
  },
  toDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Work", WorkSchema);
