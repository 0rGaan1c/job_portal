const mongoose = require("mongoose");
const { requiredErrorMessage, maxLengthErrorMessage } = require("../utils");

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, requiredErrorMessage("User Id")],
  },
  projectName: {
    type: String,
    required: [true, requiredErrorMessage("Project Name")],
    maxlength: [20, maxLengthErrorMessage(20, "Project Name")],
  },
  projectDescription: {
    type: String,
    required: [true, requiredErrorMessage("Project Description")],
    maxlength: [200, maxLengthErrorMessage(200, "Project Description")],
  },
  projectStack: {
    type: String,
    required: [true, requiredErrorMessage("Project Stack")],
    maxlength: [50, maxLengthErrorMessage(50, "Project Stack")],
  },
  projectCodeUrl: {
    type: String,
  },
  projectLiveUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
