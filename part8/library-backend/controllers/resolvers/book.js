const User = require("../../models/User");
const Author = require("../../models/author");

const Book = {
  author: async (root) => await Author.findById(root.author),
  user: async (root) => await User.findById(root.user),
};

module.exports = Book;
