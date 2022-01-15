import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducer/anecdoteReducer'
import anecdotes from '../services/anecdotes'
import {
  setNotification,
  removeNotification,
} from '../reducer/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = anecdotes.newAnecdote(content)

    if (newAnecdote) {
      dispatch(createAnecdote(newAnecdote))
    } else {
      dispatch(setNotification(`cannot create,  "${content}"`))
      setTimeout(() => {
        dispatch(removeNotification(''))
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
