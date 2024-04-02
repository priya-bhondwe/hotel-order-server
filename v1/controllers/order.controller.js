const orderService = require("../services/order.service");
const message = require("../helpers/messages");

const orderCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    orderService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: message?.ORDER_CREATED_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.ORDER_CREATED_FAILED, error });
      });
  }, //handleCreate

  handleUpdate(req, res) {
    const { id } = req?.params;
    const { itemId, status } = req?.query;
    const data = req?.body;
    orderService
      ?.update(id, data, itemId, status)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.ORDER_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.ORDER_UPDATE_FAILED, error });
      });
  }, //handleUpdate

  handleDelete(req, res) {
    const { id } = req?.params;
    orderService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.ORDER_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.erroror(error);
        res?.status(500).send({ message: message?.ORDER_DELETE_FAILED, error });
      });
  }, //handleDelete

  handleGetOne(req, res) {
    // const { id,tableNo,status } = req?.query;
    orderService
      ?.getOne(req?.query)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.ORDER_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(404)
          .send({ message: message?.ORDER_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne

  handleGetAll(req, res) {
    orderService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.ORDER_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.ORDER_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = orderCtrl;
