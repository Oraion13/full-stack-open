import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Display = ({
  blog,
  userName,
}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [buttonLable, setButtonLable] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLable(!visible ? 'hide' : 'view')
  }

  const updateBlog = () => {
    dispatch(likeBlog(blog.id, { likes: blog.likes+1 }))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }
  console.log('my user', blog.user[0].userName, ' user', userName)
  return (
    <div className="blog">
      {blog.title} by {blog.author}{' '}
      <button className="viewbtn" onClick={toggleVisibility}>
        {buttonLable}
      </button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes: {blog.likes}{' '}
        <button className="likebtn" onClick={updateBlog}>
          like
        </button>{' '}
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
    </div>
  )
}

export default Display
