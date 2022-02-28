const author = require("../../models/author");
const Author = require("../../models/author");
const Book = require("../../models/book");
const User = require("../../models/User");

const Query = {
  allAuthors: async () => {
    console.log("AUthor.find");
    return await Author.find({});
  },

  allBooks: async (root, args) => {
    console.log("Book.find");
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
        })
      : authorID
      ? await Book.find({ author: authorID[0]._id })
      : args.hasOwnProperty("genre") && args["genre"].length > 0
      ? await Book.find({ genres: { $in: [args["genre"]] } })
      : await Book.find({});
  },

  allUsers: async () => await User.find({}),

  authorCount: async () => await Author.collection.countDocuments(),

  bookCount: async () => await Book.collection.countDocuments(),

  me: async (root, args, context) => await context.currentUser,
};

module.exports = Query;
