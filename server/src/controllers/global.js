const Job = require("../models/Job");
const JobRole = require("../models/JobRole");

const getJobRoles = async (req, res) => {
  try {
    const jobRoles = await JobRole.find({});
    res.send({ status: "ok", data: jobRoles });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send({ status: "ok", data: jobs });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = { getJobRoles, getAllJobs };
