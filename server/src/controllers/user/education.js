const Education = require("../../models/Education");

const getAllEducations = async (req, res) => {
  const userID = req.params.id;
  try {
    const result = await Education.find({ user: userID });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const createEducation = async (req, res) => {
  const { id } = req.decoded;
  const { graduationType, degreeName, fromDate, toDate } = req.body;

  try {
    const result = await Education.create({
      user: id,
      graduationType,
      degreeName,
      fromDate,
      toDate,
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: err.message });
  }
};

const deleteEducation = async (req, res) => {
  const { educationID } = req.body;
  const { id } = req.decoded;
  try {
    const result = await Education.deleteOne({ _id: educationID, user: id });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: err.message });
  }
};

const updateEducation = async (req, res) => {
  const { educationID, graduationType, degreeName, fromDate, toDate } =
    req.body;
  const { id } = req.decoded;
  try {
    const result = await Education.updateOne(
      { _id: educationID, user: id },
      {
        graduationType,
        degreeName,
        fromDate,
        toDate,
      }
    );
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: err.message });
  }
};

module.exports = {
  getAllEducations,
  createEducation,
  deleteEducation,
  updateEducation,
};
