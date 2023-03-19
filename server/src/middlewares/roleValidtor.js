const User = require("../models/User");
const Company = require("../models/Company");

const roleValidator = (req, res, next) => {
  const { role } = req.body;
  if (role === "user" || role === "company") {
    next();
  } else {
    return res.json({ status: "error", error: "Invalid role" });
  }
};

const userValidator = async (req, res, next) => {
  const { role, id } = req.decoded;
  if (role === "user") {
    const user = await User.findOne({ _id: id }).lean();
    if (!user) {
      return res.json({
        status: "error",
        error: "Only user can access this route.",
      });
    }
    next();
  } else {
    return res.json({
      status: "error",
      error: "Only user can access this route.",
    });
  }
};

const companyValidator = async (req, res, next) => {
  const { role, id } = req.decoded;
  if (role === "company") {
    const company = await Company.findOne({ _id: id }).lean();
    if (!company) {
      return res.json({
        status: "error",
        error: "Only company can access this route.",
      });
    }
    next();
  } else {
    return res.json({
      status: "error",
      error: "Only company can access this route.",
    });
  }
};

module.exports = {
  roleValidator,
  userValidator,
  companyValidator,
};
