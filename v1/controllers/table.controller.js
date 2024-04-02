const message = require("../helpers/messages");
const tableService = require("../services/table.service");

const tableCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    tableService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: message?.TABLE_CREATED_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.TABLE_CREATED_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;
    tableService
      ?.update(id, data)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.TABLE_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.TABLE_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    tableService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.TABLE_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.TABLE_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    tableService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.TABLE_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(404)
          .send({ message: message?.TABLE_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    tableService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.TABLE_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.TABLE_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = tableCtrl;
