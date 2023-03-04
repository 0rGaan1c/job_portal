const mongoose = require("mongoose");
const validator = require("validator");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, requiredErrorMessage("Email")],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, requiredErrorMessage("Password")],
    minlength: [6, minLengthErrorMessage(6, "Password")],
  },
  name: {
    type: String,
    // required: [true, requiredErrorMessage("Name")],
    minlength: [3, minLengthErrorMessage(3, "Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Name")],
  },
  jobRole: {
    type: String,
    // required: [true, requiredErrorMessage("Job Role")],
  },
  skills: {
    type: [String],
    // required: [true, requiredErrorMessage("Skill")],
    min: [1, "Atleast one skill is required"],
  },
  bio: {
    type: String,
    maxlength: [200, maxLengthErrorMessage(200, "Bio")],
  },
});

module.exports = mongoose.model("User", UserSchema);
