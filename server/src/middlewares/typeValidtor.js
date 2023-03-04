const typeValidtor = (req, res, next) => {
  const { type } = req.body;
  console.log(type);
  if (type === "user" || type === "company") {
    next();
  } else {
    return res.json({ status: "error", error: "Invalid type" });
  }
};

module.exports = { typeValidtor };
