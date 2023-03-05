const roleValidator = (req, res, next) => {
  const { role } = req.body;
  if (role === "user" || role === "company") {
    next();
  } else {
    return res.json({ status: "error", error: "Invalid role" });
  }
};

const userValidator = (req, res, next) => {
  const { role } = req.decoded;
  if (role === "user") {
    next();
  } else {
    return res.json({
      status: "error",
      error: "Only user can access this route.",
    });
  }
};

const companyValidator = (req, res, next) => {
  const { role } = req.decoded;
  if (role === "company") {
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
