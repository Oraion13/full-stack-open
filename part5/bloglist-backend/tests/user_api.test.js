const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const mongoose = require("mongoose");

// beforeEach(async () => {
//   await User.deleteMany({});

//   const users = helper.users.map((user) => {
//     const passwordHash = await bcrypt.hash(user.password, 10);

//     const newUser = new User({
//       userName: user.userName,
//       name: user.name,
//       passwordHash,
//     });

//     return newUser.save();
//   });

//   await Promise.all(users);
// });

describe("display and add new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ userName: "root", name: "ImRoot", passwordHash });

    await user.save();
  });

  test("display users", async () => {
      await api.get("/api/users").expect(200)
  })

  test("add new user", async () => {
    const usersBefore = await helper.usersInDb();
    console.log("before", usersBefore);

    const newUser = {
      userName: "vicky123",
      name: "Vignesh",
      password: "vignesh123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDb();
    console.log("after", usersAfter);
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    const username = usersAfter.map((user) => user.userName);
    expect(username).toContain(newUser.userName);
  });
});


afterAll(() => {
    mongoose.connection.close();
})