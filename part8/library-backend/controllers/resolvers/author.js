const Book = require("../../models/book")

const Author = {
  books: (root) => root.books.map( async (book) => await Book.findById(book))
};

module.exports = Author;