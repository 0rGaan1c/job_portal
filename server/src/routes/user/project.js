const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../../controllers/user/project");
const { tokenValidator } = require("../../middlewares/tokenValidator");
const { userValidator } = require("../../middlewares/roleValidtor");
const router = express.Router();

router.get("/:id", getAllProjects);
router
  .route("/")
  .post(tokenValidator, userValidator, createProject)
  .delete(tokenValidator, userValidator, deleteProject)
  .patch(tokenValidator, userValidator, updateProject);

module.exports = router;
