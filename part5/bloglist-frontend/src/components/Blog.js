import Display from './Display'

const Blog = ({ blogs, setBlogs, userName }) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div id='blogs'>
      {blogs.map((blog) => (
        <Display
          key={blog.id}
          id={blog.id}
          blogs={blogs} setBlogs={setBlogs}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          blogUser={blog.user[0]}
          userName={userName}
        />
      ))}
    </div>
  )
}

export default Blog
