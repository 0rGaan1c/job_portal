const express = require("express");
const router = express.Router();
const { getAllJobs, getJobRoles } = require("../controllers/global.js");

router.get("/jobrole", getJobRoles);
router.get("/alljob", getAllJobs);

module.exports = router;
