import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import loginService from "./services/logins";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // create new note
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // get all data
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // store user credentials and token
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // set username
  const addUserName = (event) => {
    setUserName(event.target.value);
  };

  // set password
  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  // set new title
  const addTitle = (event) => {
    setTitle(event.target.value);
  };

  //set new author
  const addAuthor = (event) => {
    setAuthor(event.target.value);
  };

  // set new URL
  const addURL = (event) => {
    setURL(event.target.value);
  };

  // user login
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

  // handle logout
  const handleLogout = (event) => {
    event.preventDefault();

    if (window.confirm(`Are you sure to logout ? ${user.userName}`)) {
      const uname = user.userName;

      window.localStorage.removeItem("loggedBlogUser");
      setUser(null);

      setErrorMessage(`successfully logged out ${uname}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // handle create new blog
  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.postBlog({ title, author, url });

      console.log(newBlog);
      setErrorMessage(`a new blog ${title} by ${author} is added`);
      setTitle("");
      setAuthor("");
      setURL("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setErrorMessage("cannot add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {errorMessage}
      {user === null ? (
        <Login
          userName={userName}
          addUserName={addUserName}
          password={password}
          addPassword={addPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Home
          blogs={blogs}
          username={user.name}
          handleLogout={handleLogout}
          title={title}
          addTitle={addTitle}
          author={author}
          addAuthor={addAuthor}
          url={url}
          addURL={addURL}
          handleCreateBlog={handleCreateBlog}
        />
      )}
    </div>
  );
};

export default App;
