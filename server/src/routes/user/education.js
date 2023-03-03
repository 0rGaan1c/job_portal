const express = require("express");
const {
  getAllEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../../controllers/user/education");
const router = express.Router();

router.route("/").get(getAllEducations).post(createEducation);
router.route("/:id").delete(deleteEducation).patch(updateEducation);

module.exports = router;
