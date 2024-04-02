const mongoose = require("mongoose");
const Dish = require("./dish.model");

// const Autoincrement=require("mongoose-sequence")(mongoose)

const orderSchema = new mongoose.Schema({
  tableNo: Number,
  // totalPrice: Number,
  status: Number,
  items: [
    {
      dish: { type: mongoose?.SchemaTypes?.ObjectId, ref: "Dish" },
      qty: Number,
      status: Number,
      chef: { type: mongoose?.SchemaTypes?.ObjectId, ref: "User" },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", orderSchema);
