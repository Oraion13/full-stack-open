const Book = require("../../models/book")

const User = {
  books: (root) => root.books.map( async (book) => await Book.findById(book))
};

module.exports = User;
