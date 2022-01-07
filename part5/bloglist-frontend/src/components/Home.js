import React from "react";
import Logout from "./Logout";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

const Home = (props) => {
  return (
    <div>
      <h2>Create new</h2>
      <NewBlog
        title={props.title}
        addTitle={props.addTitle}
        author={props.author}
        addAuthor={props.addAuthor}
        url={props.url}
        addURL={props.addURL}
        handleCreateBlog={props.handleCreateBlog}
      />

      <h2>Blogs</h2>
      <h3>{props.username} logged in</h3>
      <Logout handleLogout={props.handleLogout} />

      <Blog blogs={props.blogs} />
    </div>
  );
};

export default Home;
