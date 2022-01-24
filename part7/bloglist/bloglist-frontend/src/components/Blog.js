import Display from './Display'
import { useSelector } from 'react-redux'

const Blog = ({ userName }) => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  console.log(blogs)
  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <Display
          blog={blog}
          key={blog.id}
          userName={userName}
        />
      ))}
    </div>
  )
}

export default Blog
