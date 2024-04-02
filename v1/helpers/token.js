const jwt = require("jsonwebtoken");
const createToken = (payload, expiresIn = 60 * 30) => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn });
  } catch (err) {
    console.error(err);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createToken, verifyToken };
