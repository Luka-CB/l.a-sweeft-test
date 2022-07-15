const express = require("express");
require("colors");
require("dotenv").config();
const ConnectDB = require("./config/db");

const port = process.env.PORT || 5000;

const app = express();
ConnectDB();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/calllogs", require("./routes/callLogs"));

app.listen(port, () =>
  console.log(`Server is up and running on port ${port}`.green.bold)
);
