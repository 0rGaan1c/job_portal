const User = require("../../models/User");

const getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    let result = await User.find({ _id: id });
    result = {
      skills: result[0].skills,
      bio: result[0].bio,
      name: result[0].name,
      jobRole: result[0].jobRole,
    };

    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const updateDetails = async (req, res) => {
  const { name, jobRole, skills, bio } = req.body;
  const { id } = req.decoded;
  try {
    const result = await User.updateOne(
      { _id: id },
      {
        name,
        jobRole,
        skills,
        bio,
      }
    );
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = {
  getDetails,
  updateDetails,
};
