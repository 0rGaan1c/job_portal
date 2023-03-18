const mongoose = require("mongoose");
const validator = require("validator");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const AppliedJobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    required: [true, requiredErrorMessage("Company Id")],
    ref: "Company",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, requiredErrorMessage("User Id")],
    ref: "User",
  },
  job: {
    type: mongoose.Schema.ObjectId,
    required: [true, requiredErrorMessage("Job Id")],
    ref: "Job",
  },
  jobStatus: {
    type: String,
    enum: ["Pending", "Reviewing", "Accepted", "Rejected"],
    required: [true, requiredErrorMessage("Job Status")],
  },
});

module.exports = mongoose.model("AppliedJob", AppliedJobSchema);
