const author = require("../../models/author");
const Author = require("../../models/author");
const Book = require("../../models/book");

const Query = {
  allAuthors: async () => {
    return await Author.find({});
  },

  allBooks: async (root, args) => {
    const authorID =
      args.hasOwnProperty("author") && args["author"].length > 0
        ? await Author.find({ name: args.author })
        : "";

    return authorID && args.hasOwnProperty("genre") && args["genre"].length > 0
      ? await Book.find({
          $and: [
            { genres: { $in: [args["genre"]] } },
            { author: authorID[0]._id },
          ],
        }).populate("author")
      : authorID
      ? await Book.find({ author: authorID[0]._id }).populate("author")
      : args.hasOwnProperty("genre") && args["genre"].length > 0
      ? await Book.find({ genres: { $in: [args["genre"]] } }).populate("author")
      : await Book.find({}).populate("author");
  },

  authorCount: () => Author.collection.countDocuments(),

  bookCount: () => Book.collection.countDocuments(),
};

module.exports = Query;
