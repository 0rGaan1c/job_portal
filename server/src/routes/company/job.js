const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  createJob,
  getAppliedUser,
  updateAppliedJob,
} = require("../../controllers/company/job");

router.route("/").get(getAllJobs).post(createJob);
router.route("/applied").get(getAppliedUser).patch(updateAppliedJob);

module.exports = router;
