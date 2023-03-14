const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobRoles,
  getJobByID,
} = require("../controllers/global.js");

router.get("/jobrole", getJobRoles);
router.get("/alljob", getAllJobs);
router.get("/job/:id", getJobByID);

module.exports = router;
