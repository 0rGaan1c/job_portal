const express = require("express");
const router = express.Router();
const jobRoleRouter = require("./global/jobrole");
const allJobRouter = require("./global/alljob");

router.use("/", jobRoleRouter);
router.use("/", allJobRouter);

module.exports = router;
