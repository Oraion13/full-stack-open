import { likeBlog, removeBlog } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const DetailsOfBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user ? state.user.userName : '')

  const updateBlog = () => {
    dispatch(likeBlog(blog.id, { likes: blog.likes+1 }))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div>
      {blog.url}
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
