const mongoose = require("mongoose");

const callLogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
    caller: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CallLog", callLogSchema);
