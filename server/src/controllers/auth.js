require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");

const register = async (req, res) => {
  const { email, password: plainTextPassword, type } = req.body;

  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password should be atleast 6 characters long.",
    });
  }

  const password = await bcrypt.hashSync(plainTextPassword, 5);

  try {
    const response =
      type === "user"
        ? await User.create({
            email,
            password,
          })
        : await Company.create({
            email,
            password,
          });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  }

  res.send("mada");
};

const login = async (req, res) => {
  const { email, password, type } = req.body;

  const user =
    type === "user"
      ? await User.findOne({ email }).lean()
      : await Company.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: `${type}/password is invalid.` });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the email and password combination is successful
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY
    );
    return res.json({ status: "ok", data: token });
  }

  return res.json({ status: "error", error: `${type}/password is invalid.` });
};

// needs to be change to forgot password with all the necessary changes
const forgotPassword = async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (password.length < 6) {
    return res.json({
      status: "error",
      error: "Password should be atleast 6 characters long.",
    });
  }

  const user =
    type === "user"
      ? await User.findOne({ email }).lean()
      : await Company.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: `${type} is invalid.` });
  }

  try {
    const _id = user._id;
    const hashedPassword = await bcrypt.hashSync(password, 5);

    type === "user"
      ? await User.updateOne({ _id }, { password: hashedPassword })
      : await Company.updateOne({ _id }, { password: hashedPassword });
  } catch (err) {
    console.error(err);
    return res.send({ status: "error", error: "Something went wrong." });
  }

  return res.send({ status: "ok", error: "Password changed successfully." });
};

module.exports = {
  register,
  login,
  forgotPassword,
};
