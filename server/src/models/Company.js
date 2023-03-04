const mongoose = require("mongoose");
const validator = require("validator");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const CompanySchema = new mongoose.Schema({
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
  companyName: {
    type: String,
    // required: [true, requiredErrorMessage("Company Name")],
    minlength: [3, minLengthErrorMessage(3, "Company Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Company Name")],
  },
  companyDescription: {
    type: String,
    // required: [true, requiredErrorMessage("Company Description")],
    minlength: [0, minLengthErrorMessage(3, "Company Description")],
    maxlength: [200, maxLengthErrorMessage(50, "Company Description")],
  },
});

module.exports = mongoose.model("Company", CompanySchema);
