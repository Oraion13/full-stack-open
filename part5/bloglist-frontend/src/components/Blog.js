import Display from './Display'

const Blog = ({ blogs, userName }) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <>
      {blogs.map((blog) => (
        <Display
          key={blog.id}
          id={blog.id}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          blogUser={blog.user[0]}
          userName={userName}
        />
      ))}
    </>
  )
}

export default Blog
