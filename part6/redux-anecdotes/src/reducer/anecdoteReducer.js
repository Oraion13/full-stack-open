const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    case 'VOTE':
      return state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          anecdote.votes++
        }
        return anecdote
      })

    case 'INIT_ANECDOTE':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE_ANECDOTE',
    data
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const initializeAnecdote = (data) => {
  return {
    type: 'INIT_ANECDOTE',
    data
  }
}

export default anecdoteReducer
