const express = require("express");
const router = express.Router();
const jobRouter = require("./company/job");

router.use("/job", jobRouter);

module.exports = router;
