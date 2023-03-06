const Company = require("../../models/Company");

const getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    let result = await Company.find({ _id: id });
    result = {
      companyName: result[0].companyName,
      companyDescription: result[0].companyDescription,
    };
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: err.message });
  }
};

const updateDetails = async (req, res) => {
  const { id } = req.decoded;
  const { companyName, companyDescription } = req.body;
  try {
    const result = await Company.updateOne(
      { _id: id },
      {
        companyName,
        companyDescription,
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
