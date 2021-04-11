const mongoose = require("mongoose");
const FKHelper = require("../utils/foreign-key-helper");

const schema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: (val) => {
        return FKHelper(mongoose.model("User"), val);
      },
      message: `User doesn't exist`,
    },
  },
  title: String,
  content: String,
});

module.exports = mongoose.model("Post", schema);
