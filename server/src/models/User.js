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
  contactEmail: {
    type: String,
    unique: true,
    required: [true, requiredErrorMessage("Email")],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid contact email",
    },
  },
  password: {
    type: String,
    required: [true, requiredErrorMessage("Password")],
    minlength: [6, minLengthErrorMessage(6, "Password")],
  },
  name: {
    type: String,
    required: [true, requiredErrorMessage("Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Name")],
  },
  role: {
    type: String,
    required: [true, requiredErrorMessage("Type")],
    default: "user",
    enum: ["user"],
    immutable: true,
  },
  jobRole: {
    type: String,
    required: [true, requiredErrorMessage("Job Role")],
  },
  skills: {
    type: String,
    required: [true, requiredErrorMessage("Skill")],
  },
  bio: {
    type: String,
    maxlength: [200, maxLengthErrorMessage(200, "Bio")],
  },
});

module.exports = mongoose.model("User", UserSchema);
