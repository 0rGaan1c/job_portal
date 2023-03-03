const express = require("express");
const router = express.Router();
const {
  getDetails,
  updateDetails,
} = require("../../controllers/company/detail");

router.route("/").get(getDetails).patch(updateDetails);

module.exports = router;
