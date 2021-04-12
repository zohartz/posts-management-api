const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.mongoUrl, {
  useNewUrlParser: true,
});
db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose: Error: " + err);
});

db.on("open", function () {
  console.log("Mongoose: Connection established");
});

db.on("disconnected", function () {
  console.log("Mongoose: Connection stopped");
});

db.on("reconnected", function () {
  console.info("Mongoose reconnected!");
});
