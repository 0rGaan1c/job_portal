const Job = require("../../models/Job");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send({ success: "ok", data: jobs });
  } catch (err) {
    console.error(err);
    res.send({ success: "error", error: err.message });
  }
};

module.exports = { getAllJobs };
