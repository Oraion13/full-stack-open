import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  const styles = {
    padding: 5,
    borderStyle: 'inset'
  }
  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <p key={blog.id} style={styles}><Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>{blog.title} by {blog.author}</Link></p>
      ))}
    </div>
  )
}

export default Blog
