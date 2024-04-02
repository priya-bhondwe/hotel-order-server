const tableModel = require("../models/table.model");

const tableService = {
  async create(table) {
    if (Array.isArray(table)) {
      //multiple tables

      table = [table];
    }
    const result = await tableModel.insertMany(table);
    return result;
  },
  async update(id, table) {
    // console.log("Update data:",table);
    // encrypt the password if avaliable

    // update the table
    const result = await tableModel.updateOne({ _id: id }, table);
    return result;
  },
  async delete(id) {
    const result = await tableModel.deleteOne({ _id: id });
    return result;
  },
  async getOne(id) {
    const result = await tableModel.findOne({ _id: id });
    return result;
  },
  async getAll(query) {
    // only admin showed in table list not superadmin
    const filter = {};
    const result = await tableModel.find(filter);
    return result;
  }, //getAll
};

module.exports = tableService;
