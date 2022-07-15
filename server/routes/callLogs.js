const router = require("express").Router();
const { createCallLog } = require("../controllers/callLogs");
const { auth, checkContactInfo } = require("../config/middlewares");

router.route("/create").post(auth, checkContactInfo, createCallLog);

module.exports = router;
