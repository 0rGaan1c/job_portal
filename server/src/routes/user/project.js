const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../../controllers/user/project");
const router = express.Router();

router.route("/").get(getAllProjects).post(createProject);
router.route("/:id").delete(deleteProject).patch(updateProject);

module.exports = router;
