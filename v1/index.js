const router = require("express").Router();
require("./models/db");
router.use("/users", require("./routes/user.route"));
router.use("/dishes", require("./routes/dish.route"));
router.use("/tables", require("./routes/table.route"));
router.use("/auth", require("./routes/auth.route"));
router.use("/data", require("./routes/data.route"));
router.use("/orders", require("./routes/order.route"));
module.exports = router;
