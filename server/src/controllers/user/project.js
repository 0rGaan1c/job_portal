const Project = require("../../models/Project");

const getAllProjects = async (req, res) => {
  const userID = req.params.id;
  try {
    const result = await Project.find({ user: userID });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const createProject = async (req, res) => {
  const { id } = req.decoded;
  const {
    projectName,
    projectDescription,
    projectStack,
    projectCodeUrl,
    projectLiveUrl,
  } = req.body;
  try {
    const result = await Project.create({
      user: id,
      projectName,
      projectDescription,
      projectStack,
      projectCodeUrl,
      projectLiveUrl,
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  const { projectID } = req.body;
  const { id } = req.decoded;
  try {
    const result = await Project.deleteOne({ _id: projectID, user: id });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const updateProject = async (req, res) => {
  const {
    projectID,
    projectName,
    projectDescription,
    projectStack,
    projectLiveUrl,
    projectCodeUrl,
  } = req.body;
  const { id } = req.decoded;
  try {
    const result = await Project.updateOne(
      { _id: projectID, user: id },
      {
        projectName,
        projectDescription,
        projectStack,
        projectCodeUrl,
        projectLiveUrl,
      }
    );
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
};
