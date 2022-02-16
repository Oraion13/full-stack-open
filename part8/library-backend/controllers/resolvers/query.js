const author = require("../../models/author");
const Author = require("../../models/author");
const Book = require("../../models/book");

const Query = {
  allAuthors: async () => {
    return await Author.find({});
  },

  allBooks: async (root, args) => {
    const authorID = !args.author
      ? ""
      : await Author.find({ name: args.author });
      
      console.log(authorID);
    return args.author && args.genre
      ? await Book.find({
          $and: [{ genres: { $in: [args.genre] } }, { author: authorID }],
        }).populate("author") : !args.author
      ? await Book.find({ genres: { $in: [args.genre] } }).populate("author")
      : !args.genre
      ? await Book.find({ author: authorID }).populate("author") 
      : await Book.find({}).populate("author");
  },

  authorCount: () => Author.collection.countDocuments(),

  bookCount: () => Book.collection.countDocuments(),
};

module.exports = Query;
