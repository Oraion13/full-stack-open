const { ApolloServer } = require("apollo-server-express");
const { schema, subscriptionServer } = require("./subscriptionServer");
const { httpServer } = require("./httpServer");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const context = require("../controllers/context");

const server = new ApolloServer({
  schema,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

module.exports = server;
