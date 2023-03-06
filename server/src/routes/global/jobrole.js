const express = require("express");
const { getJobRoles } = require("../../controllers/global/getJobRoles");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const router = express.Router();

router.get("/jobrole", tokenValidator, getJobRoles);

module.exports = router;
