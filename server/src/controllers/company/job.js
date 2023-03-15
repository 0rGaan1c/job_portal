const AppliedJob = require("../../models/AppliedJob");
const Job = require("../../models/Job");
const User = require("../../models/User");

const getAllJobs = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Job.find({ company: id });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const createJob = async (req, res) => {
  const { id } = req.decoded;
  const { jobRole, skills, expRequired, jobDescription, compensation } =
    req.body;
  try {
    const result = await Job.create({
      company: id,
      jobRole,
      skills,
      expRequired,
      jobDescription,
      compensation,
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

// console.log("get list of users who have applied for the job");
// const getAppliedUsers = async (req, res) => {
//   const { id } = req.decoded;
//   const { jobID } = req.body;
//   try {
//     const result = await AppliedJob.find({ company: id, job: jobID });
//     res.json({ status: "ok", data: result });
//   } catch (err) {
//     console.error(err);
//     res.send({ status: "error", error: err.message });
//   }
// };

const getAppliedUsers = async (req, res) => {
  const { id } = req.decoded;
  const { jobID } = req.body;
  try {
    const result = await AppliedJob.find({ company: id, job: jobID });
    const userIds = result.map((appliedJob) => appliedJob.user);
    const users = await User.find({ _id: { $in: userIds } });

    // Combine result data with user data
    const responseData = result.map((job) => {
      const matchingUser = users.find(
        (user) => user._id.toString() === job.user.toString()
      );
      return { ...job.toObject(), user: matchingUser };
    });

    res.json({ status: "ok", data: responseData });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const updateAppliedJob = async (req, res) => {
  const { id } = req.decoded;
  const { jobStatus, jobID, userID } = req.body;
  try {
    const result = await AppliedJob.updateOne(
      { company: id, job: jobID, user: userID },
      { jobStatus }
    );
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const getJobStatus = async (req, res) => {
  const { userID, jobID } = req.body;

  try {
    const result = await AppliedJob.find({ user: userID, job: jobID });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getAppliedUsers,
  updateAppliedJob,
  getJobStatus,
};
