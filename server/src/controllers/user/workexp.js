const Work = require("../../models/Work");

const getAllWorkExps = async (req, res) => {
  const userID = req.params.id;
  try {
    const result = await Work.find({ user: userID });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const createWorkExp = async (req, res) => {
  const { id } = req.decoded;
  const { companyName, jobTitle, jobDescription, fromDate, toDate } = req.body;
  try {
    const result = await Work.create({
      user: id,
      companyName,
      jobTitle,
      jobDescription,
      fromDate,
      toDate,
    });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const deleteWorkExp = async (req, res) => {
  const { workID } = req.body;
  const { id } = req.decoded;
  try {
    const result = await Work.deleteOne({ _id: workID, user: id });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const updateWorkExp = async (req, res) => {
  const { workID, companyName, jobTitle, jobDescription, fromDate, toDate } =
    req.body;
  const { id } = req.decoded;
  try {
    const result = await Work.updateOne(
      { _id: workID, user: id },
      {
        companyName,
        jobTitle,
        jobDescription,
        fromDate,
        toDate,
      }
    );
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

module.exports = {
  getAllWorkExps,
  createWorkExp,
  deleteWorkExp,
  updateWorkExp,
};
