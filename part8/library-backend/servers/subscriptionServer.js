const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const typeDefs = require("../controllers/typedefs");
const resolvers = require("../controllers/resolvers");

const { httpServer } = require("./httpServer");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: "",
  }
);

module.exports = { schema, subscriptionServer };
