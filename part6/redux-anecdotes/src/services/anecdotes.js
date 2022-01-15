import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  }

  const request = axios.post(baseURL, anecdote)
  const response = await request
  return response.data
}

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`)
  return response.data
}

const incrementVotes = async (id) => {
  const anecdote = await getAnecdote(id)
  const response = await axios.put(`${baseURL}/${id}`, {...anecdote , votes: anecdote.votes+1})
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createAnecdote, incrementVotes }
