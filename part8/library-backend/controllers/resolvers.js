const Query = require("./resolvers/query");
const Mutation = require("./resolvers/mutation");
const { Subscription } = require("./subscription");

const User = require("./resolvers/user");
const Author = require("./resolvers/author");
const Book = require("./resolvers/book");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Author,
  Book,
};

module.exports = resolvers;
