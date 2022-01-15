import anecdoteServices from '../services/anecdotes'
import { notification } from './notificationReducer'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      )

    case 'INIT_ANECDOTE':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteServices.createAnecdote(content)
    await dispatch({
      type: 'CREATE_ANECDOTE',
      data,
    })

    if (data) await dispatch(notification(`created,  "${content}"`))
    else await dispatch(notification(`cannot create,  "${content}"`))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const data = await anecdoteServices.incrementVotes(id)
    await dispatch({
      type: 'VOTE',
      data,
    })

    await dispatch(notification(`You've voted,  "${data.content}"`))
  }
}

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const data = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data,
    })
  }
}

export default anecdoteReducer
