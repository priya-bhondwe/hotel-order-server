const router = require("express").Router();

const {
  handleCreate,
  handleDelete,
  handleGetAll,
  handleGetOne,
  handleUpdate,
} = require("../controllers/order.controller");

const authorize = require("../helpers/middlewares/authorization");

router.post("/", handleCreate);
router.put("/:id", handleUpdate);
router.delete("/:id", authorize(["superadmin"]), handleDelete);
router.get("/getOne", handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
