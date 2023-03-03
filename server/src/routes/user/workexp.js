const express = require("express");
const {
  getAllWorkExps,
  createWorkExp,
  updateWorkExp,
  deleteWorkExp,
} = require("../../controllers/user/workexp");
const router = express.Router();

router.route("/").get(getAllWorkExps).post(createWorkExp);
router.route("/:id").delete(deleteWorkExp).patch(updateWorkExp);

module.exports = router;
