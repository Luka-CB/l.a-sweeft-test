const CallLog = require("../models/CallLog");

const createCallLog = async (req, res) => {
  const { name, number } = req.body;

  try {
    const newCallLog = await CallLog.create({
      name,
      number,
      caller: req.user.username,
    });

    if (!newCallLog) throw new Error("Something went wrong!");

    res.status(200).send("success");
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

module.exports = { createCallLog };
