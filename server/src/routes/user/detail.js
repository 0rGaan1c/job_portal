const express = require("express");
const { getDetails, updateDetails } = require("../../controllers/user/detail");
const { userValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const router = express.Router();

router.get("/:id", getDetails);
router.patch("/", tokenValidator, userValidator, updateDetails);

module.exports = router;
