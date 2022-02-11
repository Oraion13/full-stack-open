import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Togglable from '../Togglable'

const Blog = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  const userName = useSelector((state) =>
    state.user ? state.user.userName : ''
  )

  const blogRef = useRef()
  return (
    <div id="blogs">
      {!userName ? '' : (
        <Togglable buttonLable={'Create New Blog'} ref={blogRef}>
          <NewBlog blogRef={blogRef} />
        </Togglable>
      )}

      {blogs.map((blog) => (
        <p key={blog.id} style={{ borderStyle: 'inset', padding: 5 }}>
          <Link to={`/blogs/${blog.id}`} className="items">
            {blog.title} by {blog.author}
          </Link>
        </p>
      ))}
    </div>
  )
}

export default Blog
