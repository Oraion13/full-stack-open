require("dotenv").config();

const mongoose = require("mongoose");

const server = require("./servers/server")
const { httpServer } = require("./servers/httpServer")
const { app } = require("./servers/httpServer")

console.log("Connecting to MongoDB");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB", error);
  });

const start = async () => {

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  httpServer.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  });
};

start();
