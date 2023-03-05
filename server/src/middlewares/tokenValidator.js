const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.json({ status: "error", error: "Invalid Token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({ status: "error", error: "Unauthorized User" });
  }
};

module.exports = { tokenValidator };
