const message = require("../helpers/messages");
const dishService = require("../services/dish.service");

const dishCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    dishService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: message?.DISH_CREATED_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.DISH_CREATED_FAILED, error });
      });
  }, //handleCreate

  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;
    dishService
      ?.update(id, data)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.DISH_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.erroror(error);
        res?.status(500).send({ message: message?.DISH_UPDATE_FAILED, error });
      });
  }, //handleUpdate

  handleDelete(req, res) {
    const { id } = req?.params;
    dishService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.DISH_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.erroror(error);
        res?.status(500).send({ message: message?.DISH_DELETE_FAILED, error });
      });
  }, //handleDelete

  handleGetOne(req, res) {
    const { id } = req?.params;
    dishService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.DISH_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(404)
          .send({ message: message?.DISH_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne

  handleGetAll(req, res) {
    dishService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.DISH_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.DISH_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = dishCtrl;
