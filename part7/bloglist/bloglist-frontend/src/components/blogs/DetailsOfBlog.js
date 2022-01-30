import { likeBlog, removeBlog } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const DetailsOfBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state) => state.user ? state.user.userName : '')
  const blog = useSelector((state) => state.blogs.filter(blog => blog.id === useParams().id))[0]

  const updateBlog = () => {
    dispatch(likeBlog(blog.id, { likes: blog.likes+1 }))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      navigate('/blogs')
    }
  }

  return (
    <div>
      <a href={blog.url} target='_blank' rel="noreferrer">{blog.title}</a>
      <br />
      likes: {blog.likes}{' '}
      {userName && <button className="likebtn" onClick={updateBlog}>
        like
      </button>}{' '}
      <br />
      {blog.user[0].name ? blog.user[0].name : ''}
      <br />
      {blog.user[0].userName === userName ? (
        <button className="removebtn" onClick={deleteBlog}>
          remove
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default DetailsOfBlog
