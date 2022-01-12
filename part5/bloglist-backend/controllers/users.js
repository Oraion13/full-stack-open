require("dotenv").config();
const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Return all users in DB
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  });
  response.json(users);
});

//Add an user
usersRouter.post("/", async (reqest, respons) => {
  const body = reqest.body;

  if (!body.userName && !body.password) {
    respons.status(400).send("Missing user-name/password");
  } else if (!(body.userName.length >= 3) && !(body.password.length >= 3)) {
    respons.status(400).send("username/password should have minimum length 3");
  } else {
    const passwordHash = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      userName: body.userName,
      name: body.name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    respons.status(201).send(savedUser);
  }
});

module.exports = usersRouter;
