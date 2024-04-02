const dataService = require("../services/data.service");

const dataCtrl = {
  handleData(req, res) {
    console.log("Receives req:", req.url);
    const query = req.query;

    if (query?.q) {
      const data = dataService?.getData(query?.q?.split(","));
      console.log("Data response:", data);
      res.status(200).send({ data, message: "available data" });
    } else {
      res.status(404).send({ message: "data not available", error: null });
    }
  },
};

module.exports = dataCtrl;
