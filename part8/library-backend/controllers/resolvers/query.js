const author = require("../../models/author");
const Author = require("../../models/author");
const Book = require("../../models/book");
const User = require("../../models/User");

const Query = {
  allAuthors: async () => {
    return await Author.find({}).populate({
      path: "books",
      populate: [
        { path: "user", populate: [{ path: "books" }] },
        { path: "author", populate: [{ path: "books" }] },
      ],
    });
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
        }).populate([
          { path: "author", populate: [{ path: "books" }] },
          { path: "user", populate: [{ path: "books" }] },
        ])
      : authorID
      ? await Book.find({ author: authorID[0]._id }).populate([
          { path: "author", populate: [{ path: "books" }] },
          { path: "user", populate: [{ path: "books" }] },
        ])
      : args.hasOwnProperty("genre") && args["genre"].length > 0
      ? await Book.find({ genres: { $in: [args["genre"]] } }).populate([
          { path: "author", populate: [{ path: "books" }] },
          { path: "user", populate: [{ path: "books" }] },
        ])
      : await Book.find({}).populate("author user");
  },

  allUsers: async () =>
    await User.find({}).populate({
      path: "books",
      populate: [
        { path: "author", populate: [{ path: "books" }] },
        { path: "user", populate: [{ path: "books" }] },
      ],
    }),

  authorCount: async () => await Author.collection.countDocuments(),

  bookCount: async () => await Book.collection.countDocuments(),

  me: async (root, args, context) => await context.currentUser,
};

module.exports = Query;
