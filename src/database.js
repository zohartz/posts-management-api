var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users_posts_db", {
  useNewUrlParser: true,
}); //todo update to env var
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
