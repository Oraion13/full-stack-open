require("dotenv").config();
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.userName || !body.password) {
    return response.status(400).send({ error: "missing userName or password" });
  }
  const user = await User.findOne({ userName: body.userName });

  passwordCorrect = !user
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect))
    return response.status(401).send("Invalid username/password");

  const userToken = {
    userName: user.userName,
    id: user._id,
  };

  const token = await jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET);
  response
    .status(200)
    .send({ userName: user.userName, name: user.name, token });
});

module.exports = loginRouter;
