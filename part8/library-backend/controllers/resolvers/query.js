const author = require("../../models/author");
const Author = require("../../models/author");
const Book = require("../../models/book");

const Query = {
  allAuthors: () => {
    return Author.find({});
  },

  allBooks: () => {
    return Book.find({}).populate("author");
  },

  authorCount: () => Author.collection.countDocuments(),

  bookCount: () => Book.collection.countDocuments(),
};

module.exports = Query;
