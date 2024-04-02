const router = require("express").Router();
const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");
const {
  handleCreate,
  handleDelete,
  handleGetAll,
  handleGetOne,
  handleUpdate,
} = require("../controllers/dish.controller");
const authorize = require("../helpers/middlewares/authorization");

router.post(
  "/",
  authorize(["superadmin"]),
  fileUploader("dishes").single("picture"),
  updateFileName("picture", "dishes"),
  handleCreate
);
router.put(
  "/:id",
  authorize(["superadmin"]),
  fileUploader("dishes").single("picture"),
  updateFileName("picture", "dishes"),
  handleUpdate
);
router.delete("/:id", authorize(["superadmin"]), handleDelete);
router.get("/:id", authorize(["superadmin"]), handleGetOne);
router.get("/", handleGetAll);

module.exports = router;
