const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogsArr = helper.blogs.map((blog) => new Blog(blog));
  const promiseArr = blogsArr.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

describe("Fetching resourses", () => {
  test("notes are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("fetching a blog by id", async () => {
    const gotBlog = await api.get("/api/blogs/5a422a851b54a676234d17f7");

    expect(gotBlog).toBeDefined();
  });
});

describe("Posting a new blog", () => {
  test("post a blog", async () => {
    const blog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogs.length + 1);

    const blogTitle = blogs.map((blog) => blog.title);
    expect(blogTitle).toContain("First class tests");
  });

  test("blog without likes have a default value of 0", async () => {
    const blog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      __v: 0,
    };

    await api.post("/api/blogs").send(blog).expect(201);

    const blogs = await helper.blogsInDb();

    expect(blogs).toHaveLength(helper.blogs.length + 1);
  });

  test("blogs without contents have a bad response", async () => {
    const blog = {
      _id: "5a422b891b54a676234d17fa",
      author: "Robert C. Martin",
      __v: 0,
    };

    await api.post("/api/blogs").send(blog).expect(400);

    const blogs = await helper.blogsInDb();

    expect(blogs).toHaveLength(helper.blogs.length);
  });
});

describe("delete blog", () => {
  test("success code 204 if found the blog and deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    //console.log("id:", blogToDelete.id);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtStart.map((blog) => blog.title);

    expect(blogsAtEnd).not.toContain(blogToDelete.title);
  });

  test("failure code 404 if no such blog found", async () => {
    await api.delete(`/api/blogs/5a422b891b54a676234d17fa`).expect(404);
  });
});

//To update a blog
describe("update blog", () => {
  test("success code 204 if found the blog and updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    //console.log("id:", blogToUpdate.id);

    const blogLikes = {
      likes: 100,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogLikes).expect(204);
  });

  test("failure code 404 if no blog found to update", async () => {
    const blogLikes = {
      likes: 100,
    };
    await api
      .put(`/api/blogs/5a422b891b54a676234d17fa`)
      .send(blogLikes)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
