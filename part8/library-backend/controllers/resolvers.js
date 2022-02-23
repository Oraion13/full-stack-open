const Query = require("./resolvers/query");
const Mutation = require("./resolvers/mutation");
const User = require("./resolvers/user");
const Author = require("./resolvers/author");
const Book = require("./resolvers/book");

const resolvers = {
  Query,
  Mutation,
  User,
  Author,
  Book,
};

module.exports = resolvers;
