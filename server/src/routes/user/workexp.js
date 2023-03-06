const express = require("express");
const {
  getAllWorkExps,
  createWorkExp,
  updateWorkExp,
  deleteWorkExp,
} = require("../../controllers/user/workexp");
const { userValidator } = require("../../middlewares/roleValidtor");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const router = express.Router();

router.get("/:id", getAllWorkExps);

router
  .route("/")
  .post(tokenValidator, userValidator, createWorkExp)
  .delete(tokenValidator, userValidator, deleteWorkExp)
  .patch(tokenValidator, userValidator, updateWorkExp);

module.exports = router;
