const Contact = require("../models/Contact");

const addContact = async (req, res) => {
  const { name, number } = req.body;

  try {
    const newContact = await Contact.create({
      name,
      number,
    });

    if (!newContact) throw new Error("Something went wrong!");

    res.status(200).send("success");
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

const getContacts = async (req, res) => {
  const { q } = req.query;

  const keyword = q
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { number: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  try {
    const contacts = await Contact.find({ ...keyword }).sort({
      createdAt: "desc",
    });

    if (!contacts) throw new Error("Something went wrong!");

    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

const editContact = async (req, res) => {
  const { name, number } = req.body;
  const { id } = req.params;

  try {
    const updatedContact = await Contact.updateOne(
      { _id: id },
      { name, number }
    );

    if (!updatedContact) throw new Error("Something went wrong!");

    res.status(200).send("success");
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.deleteOne({ _id: id });

    if (!deletedContact) throw new Error("Something went wrong!");

    res.status(200).send("success");
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

module.exports = {
  addContact,
  getContacts,
  editContact,
  deleteContact,
};
