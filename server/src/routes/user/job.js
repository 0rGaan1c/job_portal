const express = require("express");
const { getAllAppliedJobs, applyToJob } = require("../../controllers/user/job");
const { userValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const router = express.Router();

router.get("/:id", getAllAppliedJobs);
router.post("/", tokenValidator, userValidator, applyToJob);

module.exports = router;
