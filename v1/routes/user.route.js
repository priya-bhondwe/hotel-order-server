const router = require("express").Router();
const fileUploader = require("../helpers/middlewares/fileUploader");
const updateFileName = require("../helpers/middlewares/updateFileName");
const {
  handleCreate,
  handleDelete,
  handleGetAll,
  handleGetOne,
  handleUpdate,
} = require("../controllers/user.controller");
const authorize = require("../helpers/middlewares/authorization");

router.post(
  "/",
  // authorize(["superadmin"]),
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  handleCreate
);
router.put(
  "/:id",
  authorize(["superadmin", "admin"]),
  fileUploader("avatar").single("avatar"),
  updateFileName("avatar", "avatar"),
  handleUpdate
);
router.delete(
  "/:id",
  // authorize(["superadmin", "admin"]),
  handleDelete
);
router.get(
  "/:id",
  // authorize(["superadmin", "admin"]),
  handleGetOne
);
router.get(
  "/",
  // authorize(["superadmin"])
  handleGetAll
);

module.exports = router;
