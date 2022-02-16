const { UserInputError } = require("apollo-server");
const Book = require("../../models/book");
const Author = require("../../models/author");

const Mutation = {
  addBook: async (root, args) => {
    if (!args.title || !args.author || !args.published || !args.genres) {
      throw new UserInputError("Args missing", {
        invalidArgs: "some args are missing",
      });
    }

    const authorFound = await Author.findOne({ name: args.author });
    let savedAuthor;
    if (!authorFound) {
      const author = new Author({
        name: args.author,
      });

      savedAuthor = await author.save();
    } else {
      savedAuthor = authorFound;
    }

    console.log("author", savedAuthor);

    const book = new Book({
      title: args.title,
      author: savedAuthor._id,
      published: args.published,
      genres: args.genres,
    });
    console.log("book", book);

    const savedBook = await book.save();

    return await Book.findById(savedBook._id).populate("author");
  },
};

module.exports = Mutation;
