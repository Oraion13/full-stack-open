require("dotenv").config();
const brcypt = require("bcrypt");
const { UserInputError } = require("apollo-server");
const Book = require("../../models/book");
const Author = require("../../models/author");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const Mutation = {
  addBook: async (root, args, context) => {
    const currentUser = context.currentUser;

    if (!currentUser) {
      throw new AuthenticationError("not authenticated");
    }

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

    const book = new Book({
      title: args.title,
      author: savedAuthor._id,
      published: args.published,
      genres: args.genres,
      user: currentUser.id
    });

    const savedBook = await book.save();
    currentUser.books = currentUser.books.concat(savedBook._id)
    savedAuthor.books = savedAuthor.books.concat(savedBook._id)

    await User.findByIdAndUpdate(currentUser.id, currentUser)
    await Author.findByIdAndUpdate(savedAuthor._id, savedAuthor)

    return await Book.findById(savedBook._id);
  },

  editAuthor: async (root, args, context) => {
    const currentUser = context.currentUser

    if(!currentUser){
      throw new AuthenticationError("not authenticated")
    }

    if (!args.name || !args.setBornAt) {
      throw new UserInputError("args missing", {
        invalidArgs: "author name/born date missing",
      });
    }

    const author = await Author.findOne({ name: args.name });

    if (author) {
      author.born = args.setBornAt;

      return await Author.findByIdAndUpdate({ _id: author._id }, author, {
        new: true,
      });
    } else {
      throw new UserInputError("not found", {
        notfound: "author not found",
      });
    }
  },

  createUser: async (root, args) => {
    if (!args.username || !args.password || !args.favoriteGenre) {
      throw new UserInputError("args missing", {
        invalidArgs: "username/password or favouriteGenre missing",
      });
    }

    const passwordHash = await brcypt.hash(args.password, 10);

    const user = new User({
      username: args.username,
      password: passwordHash,
      favoriteGenre: args.favoriteGenre,
    });

    return await user.save();
  },

  login: async (root, args) => {
    if (!args.username || !args.password) {
      throw new UserInputError("args missing", {
        invalidArgs: "username/password missing",
      });
    }

    const user = await User.findOne({ username: args.username });

    const passwordCorrent = !user
      ? false
      : brcypt.compare(args.password, user.password);

    if (!(user && passwordCorrent)) {
      throw new UserInputError("wrong crediantials", {
        invalid: "invalid username/password",
      });
    }

    const token = {
      username: user.username,
      id: user._id,
      favoriteGenre: user.favoriteGenre,
    };

    return { value: jwt.sign(token, process.env.ACCESS_TOKEN_SECRET) };
  },
};

module.exports = Mutation;
