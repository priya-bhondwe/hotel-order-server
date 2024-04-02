const _ = require("lodash");
const { encrypt } = require("../helpers/encryption");
const { userModel, pickUser } = require("../models/user.model");

const userService = {
  async create(user) {
    if (Array.isArray(user)) {
      //multiple users

      for (const u of user) {
        if (u?.password) {
          const hash = encrypt(u?.password);
          if (hash) u.password = hash;
          else delete u.password;
        }
      }
    } else {
      //single user
      if (user?.password) {
        const hash = encrypt(user?.password);
        if (hash) user.password = hash;
        else delete user.password;
      }
      user = [user];
    }
    const result = await userModel.insertMany(user);
    return result;
  },
  async update(id, user) {
    // console.log("Update data:",user);
    // encrypt the password if avaliable
    if (user?.password) {
      const hash = encrypt(user?.password);
      if (hash) user.password = hash;
      else delete user.password;
    }
    // update the user  
    const result = await userModel.updateOne({ _id: id }, user);
    return result;
  },
  async delete(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  },
  async getOne(id) {
    const result = await userModel.findOne({ _id: id });
    return pickUser(result);
  },
  async getAll(query) {
    // only admin showed in user list not superadmin 
    const filter = {role:"admin"};
    const result = await userModel.find(filter);
    return _.map(result, pickUser);
  },//getAll
};

module.exports = userService;
