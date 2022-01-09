import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/logins";

const Login = ({ setUser, setErrorMessage }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const addUserName = (event) => {
    setUserName(event.target.value);
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        userName,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Wrong credentials");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="user">Username</label>
        <input
          type="text"
          id="user"
          value={userName}
          onChange={addUserName}
          name="Username"
          required
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={password}
          onChange={addPassword}
          name="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
