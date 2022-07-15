const router = require("express").Router();
const {
  addContact,
  getContacts,
  editContact,
  deleteContact,
} = require("../controllers/contacts");
const { auth, checkContactInfo } = require("../config/middlewares");

router.route("/add").post(auth, checkContactInfo, addContact);
router.route("/get").get(auth, getContacts);
router.route("/edit/:id").put(auth, checkContactInfo, editContact);
router.route("/delete/:id").delete(auth, deleteContact);

module.exports = router;
