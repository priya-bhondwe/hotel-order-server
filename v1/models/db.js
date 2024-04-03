const mongoose = require("mongoose");

const url =
  "mongodb+srv://priyabhondwe12:priyabhondwe12@cluster1.8qqzyv5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(url);
const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connected to DB");
});

conn.on("disconnected", () => {
  console.log("Disconnected to DB");
});

conn.on("error", () => {
  console.log("Could not connected to DB");
});

// mongodb+srv://priyabhondwe12:<password>@hotelorder.oxtmfbm.mongodb.net/?retryWrites=true&w=majority&appName=hotelorder
