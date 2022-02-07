import { likeBlog, removeBlog } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ViewComments from './ViewComments'
import { notification } from '../../reducers/notificationReducer'

const DetailsOfBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state) =>
    state.user ? state.user.userName : ''
  )
  const blog = useSelector((state) =>
    state.blogs.filter((blog) => blog.id === useParams().id)
  )[0]

  const likeThisBlog = () => {
    dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(notification(`${blog.title} by ${blog.author} is removed`))
      navigate('/blogs')
    }
  }

  if(!blog) return null
  else
    return (
      <div id='details-of-blog'>
        <div className='details'>
          <h2>
            {blog.title} by {blog.author}
          </h2>
          <a href={blog.url} target="_blank" rel="noreferrer">
        click here to view blog
          </a>
          <br />
          <div className='like-author'>
            <i className="fas fa-heart">{' '}{blog.likes}</i>
            {userName && (
              <button className="likebtn" onClick={likeThisBlog}>
          like
              </button>
            )}{' '}
            <span className='author'>
            by, {blog.user[0].name ? blog.user[0].name : ''}
            </span>
          </div>

          {blog.user[0].userName === userName ? (
            <button className="removebtn" onClick={deleteBlog}>
          remove
            </button>
          ) : (
            ''
          )}
        </div>
        <ViewComments blog={blog} />
      </div>
    )
}

export default DetailsOfBlog
