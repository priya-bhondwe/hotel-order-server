const dishModel = require("../models/dish.model");

const dishService = {
  async create(dish) {
    if (Array.isArray(dish)) {
      //multiple dish
      dish = [dish];
    }
    const result = await dishModel.insertMany(dish);
    return result;
  },
  async update(id, dish) {
    // console.log("Update data:",dish);
    // encrypt the password if avaliable

    // update the dish
    const result = await dishModel.updateOne({ _id: id }, dish);
    return result;
  },
  async delete(id) {
    const result = await dishModel.deleteOne({ _id: id });
    return result;
  },
  async getOne(id) {
    const result = await dishModel.findOne({ _id: id });
    return result;
  },
  async getAll(query) {
    // only admin showed in dish list not superadmin
    const filter = { status: 1 };
    const result = await dishModel.find(filter);
  return result;
  }, //getAll
};

module.exports = dishService;
