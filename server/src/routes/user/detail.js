const express = require("express");
const { getDetails, updateDetails } = require("../../controllers/user/detail");
const router = express.Router();

router.route("/").get(getDetails).patch(updateDetails);

module.exports = router;
