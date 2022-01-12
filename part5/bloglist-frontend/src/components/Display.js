import React, { useState } from 'react'
import blogService from '../services/blogs'

const Display = ({
  id,
  title,
  blogs,
  setBlogs,
  author,
  url,
  likes,
  blogUser,
  userName,
}) => {
  const [visible, setVisible] = useState(false)
  const [buttonLable, setButtonLable] = useState('view')
  const [updateLikes, setUpdateLikes] = useState(likes)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLable(!visible ? 'hide' : 'view')
  }

  const updateBlog = async () => {
    setUpdateLikes(updateLikes + 1)
    const blog = { likes: updateLikes + 1 }
    const updated = await blogService.updateBlog(id, blog)
    console.log(updated)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      const deleted = await blogService.removeBlog(id)

      if (deleted.status === 202) {
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    }
  }

  return (
    <div className='blog'>
      {title} by {author}{' '}
      <button className='viewbtn' onClick={toggleVisibility}>{buttonLable}</button>
      <div style={showWhenVisible}>
        {url}
        <br />
        likes: {updateLikes} <button className='likebtn' onClick={updateBlog}>like</button> <br />
        {blogUser.name ? blogUser.name : ''}
        <br />
        {blogUser.userName === userName ? (
          <button className='removebtn' onClick={removeBlog}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Display
