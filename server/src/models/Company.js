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
  role: {
    type: String,
    required: [true, requiredErrorMessage("Type")],
    default: "company",
    enum: ["company"],
    immutable: true,
  },
  companyName: {
    type: String,
    required: [true, requiredErrorMessage("Company Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Company Name")],
  },
  companyDescription: {
    type: String,
    required: [true, requiredErrorMessage("Company Description")],
    maxlength: [200, maxLengthErrorMessage(200, "Company Description")],
  },
});

module.exports = mongoose.model("Company", CompanySchema);
