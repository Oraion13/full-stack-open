import React, { useState } from 'react'
import DetailsOfBlog from './DetailsOfBlog'

const Display = ({
  blog
}) => {
  const [visible, setVisible] = useState(false)
  const [buttonLable, setButtonLable] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLable(!visible ? 'hide' : 'view')
  }

  return (
    <div className="blog">
      {blog.title} by {blog.author}{' '}
      <button className="viewbtn" onClick={toggleVisibility}>
        {buttonLable}
      </button>
      <div style={showWhenVisible}>
        <DetailsOfBlog blog={blog} />
      </div>
    </div>
  )
}

export default Display
