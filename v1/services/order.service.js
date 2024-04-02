const _ = require("lodash");
// const { encrypt } = require("../helpers/encryption");
const orderModel = require("../models/order.model");

const orderService = {
  async create(order) {
    let orders = [];
    if (!Array.isArray(order)) {
      orders = [order];
    } else {
      orders.push(order);
    }

    //one order create
    const result = await orderModel.insertMany(orders);

    const _id = result[0]._id;
    if (_id) {
      const data = await this.getOne(_id + "");

      return data;
    } else {
      return result;
    }
  }, //create

  async update(id, order, itemId, status) {
    //update the order
    if (itemId && status) {
      return orderModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "items.$[elem].status": status,
            "items.$[elem].chef": order?.chef,
          },
        },
        { arrayFilters: [{ "elem._id": itemId }], new: true }
      );
    } else {
      //update the whole order
      const result = await orderModel.updateOne({ _id: id }, order);
      const data = await this.getOne(id);
      return data;
    }
  }, //update

  async delete(id) {
    const result = await orderModel.deleteOne({ _id: id }, order);
    return result;
  }, //delete

  async getOne({ id, tableNo, status }) {
    const filter = {};
    if (id) filter._id = id;
    if (tableNo) filter.status = tableNo;
    if (status) filter.status = status;

    const result = await orderModel
      .findOne(filter)
      .populate("items.dish")
      .populate("items.chef");
    return result;
  }, //getOne

  async getAll(query) {
    const { status } = query;
    const filter = {};
    if (status) {
      const statusArr = status?.split(",").filter((V) => V);
      filter.status = { $in: statusArr };
    }
    // const result =await orderModel?.find(filter).populate("items.dish")
    const result = await orderModel
      .find(filter)
      .populate("items.dish")
      .populate("items.chef");

    console.log("result:", result);
    return result;
  }, //getAll
};

module.exports = orderService;
