const express = require("express");
const { getAllJobs } = require("../../controllers/global/getAllJobs");
const router = express.Router();

router.get("/alljob", getAllJobs);

module.exports = router;
