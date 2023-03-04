const express = require("express");
const { getJobRoles } = require("../controllers/getJobRoles");
const router = express.Router();

router.get("/jobrole", getJobRoles);

module.exports = router;
