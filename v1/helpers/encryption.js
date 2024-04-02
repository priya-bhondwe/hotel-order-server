const bcrypt = require("bcryptjs");
const { model } = require("mongoose");

const encrypt = (text) => {
  try {
    return bcrypt.hashSync(text);
  } catch (err) {
    console.log(err);
  }
};
const compare = (text, hash) => {
  try {
    return bcrypt.compareSync(text,hash);
  } catch (err) {
    console.log(err);
  }
  return false;
};

module.exports = { encrypt, compare };
