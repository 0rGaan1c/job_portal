const JobRole = require("../models/JobRole");

const getJobRoles = async (req, res) => {
  try {
    const jobRoles = await JobRole.find({});
    res.send({ success: "ok", data: jobRoles });
  } catch (err) {
    console.error(err);
    res.send({ success: "error", error: err.message });
  }
};

module.exports = {
  getJobRoles,
};
