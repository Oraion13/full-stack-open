import Display from "./Display";

const Blog = ({ blogs, setBlogs, userName }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Display
          key={blog.id}
          id={blog.id}
          blogs={blogs}
          setBlogs={setBlogs}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          blogUser={blog.user[0]}
          userName={userName}
        />
      ))}
    </>
  );
};

export default Blog;
