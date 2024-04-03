const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: "./config/.env",
});
const app = express();

app.use(cors());
// upload folder image want to access
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  // allow client to access 'x-token from header
  res.header("Access-Control-Expose-Headers", "x-accesstoken,x-refreshtoken");
  next();
});

// common variable store karu shakto (in environment variable )
const port = process.env.PORT || 9090;

// if any kind if request come pass to v1 (version )
// http://localhost:8888/api/v1
app.use("/api/v1", require("./v1"));

app.get("/", (req, res) => {
  res.status(200).send("welcome to sever");
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
