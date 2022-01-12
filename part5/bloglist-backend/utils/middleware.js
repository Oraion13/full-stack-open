require("dotenv").config();
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    request.token = authHeader.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  const decryptedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!token || !decryptedToken) {
    return response
      .status(401)
      .send({ error: "token missing or invalid token" });
  }

  const user = await User.findById(decryptedToken.id);

  if (user) {
    request.user = user;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
