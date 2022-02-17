const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteGenre: {
      type: String
  }
});

module.exports = mongoose.model("User", schema);
