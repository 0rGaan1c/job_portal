const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  createJob,
  getAppliedUsers,
  updateAppliedJob,
  getJobStatus,
} = require("../../controllers/company/job");
const { companyValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");

router.get("/:id", getAllJobs);
router.route("/").post(tokenValidator, companyValidator, createJob);
router
  .route("/applied")
  .post(tokenValidator, companyValidator, getAppliedUsers)
  .patch(tokenValidator, companyValidator, updateAppliedJob);
router.post("/status/", tokenValidator, companyValidator, getJobStatus);

module.exports = router;
