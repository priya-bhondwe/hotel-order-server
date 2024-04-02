const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);
const dishSchema = new mongoose.Schema({
  dishId: Number,
  name: { type: String, require: true },
  type: String,
  category: String,
  price: Number,
  description: String,
  qty: String,
  status: Number,
  createdAt: { type: Date, default: Date.now() },
  picture: String,
  timeToPrepare: Number,
  ratings: [
    {
      rate: Number,
      review: String,
    },
  ],
});

dishSchema.plugin(Autoincrement, { inc_field: "dishId" });

module.exports = mongoose.model("Dish", dishSchema);
