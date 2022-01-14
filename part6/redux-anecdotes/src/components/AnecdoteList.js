import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducer/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducer/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.anecdoteFilter
      ? state.anecdote.filter((anecdote) =>
          anecdote.content.includes(state.anecdoteFilter)
        )
      : state.anecdote.sort((a, b) => b.votes - a.votes)
  )

  const Vote = (id, content) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(setNotification(`You've voted,  "${content}"`))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => Vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
