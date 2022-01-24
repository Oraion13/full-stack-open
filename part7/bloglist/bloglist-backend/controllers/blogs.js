require("dotenv").config();
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware")

//To get all
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { userName: 1, name: 1 });
  response.json(blogs);
});

//To post a blog
blogRouter.post("/", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!(body.title && body.url)) {
    return response.status(400).send({ error: "title/url missing" });
  }

  const token = request.token;
  if (!token) {
    return response.status(400).send({ error: "token missing" });
  }

  const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verified) {
    return response.status(401).send({ error: "invalid token" });
  }

  const user = await request.user;

  if (!user) {
    return response.status(400).send("user not found");
  }

  const blog = !body.likes
    ? new Blog({
        _id: body.id, //Only for test
        title: body.title,
        author: body.author || "no author",
        url: body.url,
        likes: 0,
        user: user._id,
      })
    : new Blog({
        _id: body.id, //Only for test
        title: body.title,
        author: body.author || "no author",
        url: body.url,
        likes: body.likes,
        user: user._id,
      });

  const savedBlog = await blog.save();

  if (savedBlog) {
    user.blogs = user.blogs.concat(savedBlog._id);
    await User.findOneAndUpdate({ _id: user._id }, user);

    response.status(201).json(savedBlog);
  } else {
    response.status(400).json(savedBlog);
  }
});

//To get blog by id
blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).send({ error: "blog not found" });
  }
});

//To delete a blog
blogRouter.delete("/:id", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).send({ error: "blog not found" });
  }

  const decryptedToken = await jwt.verify(
    request.token,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decryptedToken.id || !request.token) {
    return response
      .status(401)
      .send({ error: "token missing or invalid token" });
  }

  if (decryptedToken.id.toString() !== blog.user.toString()) {
    return response.status(403).send({ error: "unauthorized" });
  }

  const result = await Blog.findByIdAndRemove(request.params.id);

  if (result) {
    const user = request.user;
    user.blogs = user.blogs.filter((blog) => request.params.id !== blog.id);
    await User.findOneAndUpdate({ _id: user._id }, user);

    response.status(202).send({success: "blog deleted successfully"});
  } else {
    response.status(404).send({failure: "cannot delete the blog"});
  }
});

//To update a blog
blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).send({ error: "blog not found" }); //Test
  }

  // const decryptedToken = await jwt.verify(
  //   request.token,
  //   process.env.ACCESS_TOKEN_SECRET
  // );

  // if (!decryptedToken.id || !request.token) {
  //   return response
  //     .status(401)
  //     .send({ error: "token missing or invalid token" });
  // }

  // if (decryptedToken.id.toString() !== blog.user.toString()) {
  //   return response.status(403).send({ error: "unauthorized" });
  // }

  const result = await Blog.findOneAndUpdate({ _id: request.params.id }, body, {
    new: true,
  });

  
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
