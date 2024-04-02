const mongoose = require("mongoose");

const tableModule = new mongoose.Schema({
  tableNo: { type: Number, unique: true },
  capacity: Number,
  status: Number,
  type: String,
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Table", tableModule);
