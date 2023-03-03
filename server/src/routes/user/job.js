const express = require("express");
const { getAllAppliedJobs, applyToJob } = require("../../controllers/user/job");
const router = express.Router();

router.route("/").get(getAllAppliedJobs).post(applyToJob);

module.exports = router;
