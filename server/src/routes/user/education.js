const express = require("express");
const {
  getAllEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../../controllers/user/education");
const { userValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const router = express.Router();

router.get("/:id", getAllEducations);
router
  .route("/")
  // .get(getAllEducations)
  .post(tokenValidator, userValidator, createEducation)
  .delete(tokenValidator, userValidator, deleteEducation)
  .patch(tokenValidator, userValidator, updateEducation);

module.exports = router;
