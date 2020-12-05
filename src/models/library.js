const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  bookName: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  author: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  genre: String,
  releaseDate: {
    type: Date,
    default: Date.now
  },
  bookImage: String,
  isActivate: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("library", LibrarySchema);