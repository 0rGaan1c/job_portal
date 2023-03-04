const mongoose = require("mongoose");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const EducationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, requiredErrorMessage("User Id")],
  },
  graduationType: {
    type: String,
    required: [true, requiredErrorMessage("Graduation Type")],
    minlength: [2, minLengthErrorMessage(2, "Graduation Type")],
    maxlength: [20, maxLengthErrorMessage(20, "Graduation Type")],
  },
  degreeName: {
    type: String,
    required: [true, requiredErrorMessage("Degree Name")],
    minlength: [2, minLengthErrorMessage(2, "Degree Name")],
    maxlength: [50, maxLengthErrorMessage(20, "Degree Name")],
  },
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Education", EducationSchema);
