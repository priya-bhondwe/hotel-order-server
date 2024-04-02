const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: String,
    last: String,
  },
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  status: Number,
  createdAt: { type: Date, default: Date.now() },
  avatar: String,
  role: String,
});

userSchema.plugin(Autoincrement, { inc_field: "userId" });

const userModel = mongoose.model("User", userSchema);

const pickUser = (user) => {
  return _.pick(user, [
    "_id",
    "userId",
    "name",
    "mobile",
    "email",
    "status",
    "createdAt",
    "avatar",
    "role",
  ]);
};

module.exports = { userModel, pickUser };
