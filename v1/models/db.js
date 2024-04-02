const mongoose=require("mongoose")

const url="mongodb://127.0.0.1:27017/hotel-order"

mongoose.connect(url)
const conn=mongoose.connection

conn.on("connected", () => {
  console.log("Connected to DB");
})

conn.on("disconnected", () => {
  console.log("Disconnected to DB");
})

conn.on("error", () => {
  console.log("Could not connected to DB");
})
