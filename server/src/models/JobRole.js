const mongoose = require("mongoose");
const { requiredErrorMessage } = require("../utils");

const JobRoleSchema = new mongoose.Schema({
  toDate: {
    type: String,
    required: [true, requiredErrorMessage("Job Role")],
  },
});

module.exports = mongoose.model("JobRole", JobRoleSchema);
