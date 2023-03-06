const AppliedJob = require("../../models/AppliedJob");

const getAllAppliedJobs = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await AppliedJob.find({
      user: id,
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const applyToJob = async (req, res) => {
  const { id } = req.decoded;
  const { companyID, jobID, jobStatus } = req.body;
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
      jobStatus,
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
