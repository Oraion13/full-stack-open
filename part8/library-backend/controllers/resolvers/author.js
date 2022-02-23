const Book = require("../../models/book");

const Author = {
  books: (root) => root.books.map(async (book) => await Book.findById(book)),
  bookCount: (root) => root.books.length
};

module.exports = Author;
