const express = require("express");
const router = express.Router();
const {
  getDetails,
  updateDetails,
} = require("../../controllers/company/detail");
const { companyValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");

router.get("/:id", getDetails);
router.patch("/", tokenValidator, companyValidator, updateDetails);

module.exports = router;
