const router = require("express").Router();

const {
  handleCreate,
  handleDelete,
  handleGetAll,
  handleGetOne,
  handleUpdate,
} = require("../controllers/table.controller");
const authorize = require("../helpers/middlewares/authorization");

router.post(
  "/",
  authorize(["superadmin"]),
  handleCreate
);
router.put("/:id",
  authorize(["superadmin"]),
  handleUpdate);
router.delete("/:id", authorize(["superadmin"]), handleDelete);
router.get("/:id", authorize(["superadmin"]), handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
