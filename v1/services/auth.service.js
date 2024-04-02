const { compare } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/token");
const { userModel, pickUser } = require("../models/user.model");

const authService = {
  async userLogin({ origin, email, password }) {
    //validate email
    const result = await userModel.findOne({ email, status: 1 });
    if (result?._id) {
      // email is valid
      // check password
      if (compare(password, result?.password)) {
        //valid password
        //generate token

        // in id card what we have to display name karaycha name, id, role

        //access token we created for login
        const accesstoken = createToken(
          {
            id: result?._id,
            email,
            role: result.role,
            type: "access",
            origin,
          },
          60 * 15
        );

        // refresh token we created for
        const refreshtoken = createToken(
          {
            id: result?._id,
            email,
            role: result.role,
            type: "refresh",
            origin,
          },
          60 * 30
        );

        if (accesstoken) {
          return { accesstoken, refreshtoken, data: pickUser(result) };
        } else {
          return Promise.reject("Internal problem , try again!");
        }
      } else {
        // invalid password
        return Promise.reject("Invalid Password");
      }
    } else {
      // user not available/invalid email
      return Promise.reject("Invalid email or user is disabled");
    }
  }, //userLogin
  async passwordResetLink(email) {
    // check email exists in database
    const result = await userModel?.findOne({ email, status: 1 });
    console.log("Resss:", result);

    return result;
  }, //passwordResetLink
  async validateToken(token) {
    const payload = verifyToken(token);
    console.log("Payll", payload);
    console.log("ser: token,", token);
    console.log("ser: payload:", payload);
    if (payload?.id) {
      //token is valid
      return Promise.resolve(payload);
    } else {
      //token is invalid
      return Promise.reject(null);
    }
  }, //validatetoken
  async refreshToken({ refreshT, clientDomain }) {
    // validate refresh token
    const payload = verifyToken(refreshT);
    if (!payload) return null;
    const { id, email, type, origin } = payload;
    // validate refresh token

    if (type == "refresh" && id && origin == clientDomain) {
      // if vaild then generate accesstoken
      const data = { id, email, origin };

      const accesstoken = createToken({ ...data, type: "access" }, 60 * 15);
      const refreshtoken = createToken({ ...data, type: "refresh" }, 60 * 30);
      return { accesstoken, refreshtoken };
      // return access and refresh token
    } else {
      return null;
    }
  },
};

module.exports = authService;
