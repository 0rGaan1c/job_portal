const express = require("express");
const router = express.Router();
const projectRouter = require("./user/project");
const educationRouter = require("./user/education");
const workExpRouter = require("./user/workexp");
const jobRouter = require("./user/job");
const detailRouter = require("./user/detail");

router.use("/project", projectRouter);
router.use("/education", educationRouter);
router.use("/workexp", workExpRouter);
// for updating jobrole, name, bio, skills
router.use("/detail", detailRouter);
router.use("/job", jobRouter);

module.exports = router;
