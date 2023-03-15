const AppliedJob = require("../../models/AppliedJob");
const Job = require("../../models/Job");

const getAllAppliedJobs = async (req, res) => {
  const id = req.params.id;
  try {
    const appliedJobs = await AppliedJob.find({ user: id });
    const jobs = await Job.find({
      _id: { $in: appliedJobs.map((job) => job.job) },
    });

    const result = appliedJobs.map((appliedJob) => {
      const job = jobs.find(
        (job) => job._id.toString() === appliedJob.job.toString()
      );

      return {
        ...appliedJob._doc,
        job: job,
      };
    });

    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const applyToJob = async (req, res) => {
  const { id } = req.decoded;
  const { companyID, jobID } = req.body;
  try {
    const findJob = await AppliedJob.find({
      user: id,
      job: jobID,
      company: companyID,
    });
    if (findJob.length > 0) {
      return res.send({
        status: "error",
        error: "You have already applied to this job.",
      });
    }

    const result = await AppliedJob.create({
      user: id,
      company: companyID,
      job: jobID,
      jobStatus: "Pending",
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = {
  getAllAppliedJobs,
  applyToJob,
};
