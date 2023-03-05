require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");

const register = async (req, res) => {
  const { email, password: plainTextPassword, role } = req.body;

  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password should be atleast 6 characters long.",
    });
  }

  const password = await bcrypt.hashSync(plainTextPassword, 5);

  try {
    const result =
      role === "user"
        ? await User.create({
            email,
            password,
            role,
          })
        : await Company.create({
            email,
            password,
            role,
          });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  const user =
    role === "user"
      ? await User.findOne({ email }).lean()
      : await Company.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: `${role}/password is invalid.` });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the email and password combination is successful
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_KEY
    );
    return res.json({ status: "ok", data: token });
  }

  return res.json({ status: "error", error: `${role}/password is invalid.` });
};

const forgotPassword = async (req, res) => {
  const { email, password, role } = req.body;

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
    role === "user"
      ? await User.findOne({ email }).lean()
      : await Company.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: `${role} is invalid.` });
  }

  try {
    const _id = user._id;
    const hashedPassword = await bcrypt.hashSync(password, 5);

    role === "user"
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
