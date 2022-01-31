import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../../reducers/blogsReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addTitle = (event) => {
    setTitle(event.target.value)
  }

  const addAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const addURL = (event) => {
    setURL(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    dispatch(addNewBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={addTitle}
        name="title"
        required
      />
      <label htmlFor="author">author</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={addAuthor}
        name="author"
        required
      />
      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={addURL}
        name="url"
        required
      />
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlog
