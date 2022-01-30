import DisplayBlogs from './DisplayBlogs'
import { useSelector } from 'react-redux'

const Blog = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <DisplayBlogs
          blog={blog}
          key={blog.id}
        />
      ))}
    </div>
  )
}

export default Blog
