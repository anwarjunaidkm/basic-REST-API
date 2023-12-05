const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  Authorname: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
