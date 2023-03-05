const express = require("express");
const router = express.Router();
const jobRouter = require("./company/job");
const detailRouter = require("./company/detail");

router.use("/job", jobRouter);
router.use("/detail", detailRouter);

module.exports = router;
