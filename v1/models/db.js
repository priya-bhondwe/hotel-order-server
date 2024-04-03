const mongoose = require("mongoose");

const url =
  "mongodb+srv://priyabhondwe12:dFCfQVorYv4Rk97u@cluster0.8fcgsup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
