import { commentBlog } from '../../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const AddComment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const comments = blog.comments.concat(comment)
    setComment('')

    dispatch(commentBlog(blog.id, { comments }))
  }

  return(
    <form onSubmit={handleSubmit} className='comments-form'>
      <input name="comment" type="text" id="comment" value={comment} onChange={addComment} placeholder='add a comment' />
      <button type="submit">add</button>
    </form>
  )
}

export default AddComment