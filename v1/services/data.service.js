const data = require("../helpers/data.json");
const _ = require("lodash");
const dataService = {
  getData(fields) {
    return _.pick(data, fields);
  },
};

module.exports = dataService;
