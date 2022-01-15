import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const newAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  }

  const request = axios.post(baseURL, anecdote)
  const response = await request
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, newAnecdote }
