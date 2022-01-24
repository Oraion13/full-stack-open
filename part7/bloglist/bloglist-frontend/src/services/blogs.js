import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, blog, config)
  const response = await request

  return response.data
}

const getOneBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const updateBlog = async(id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  const response = await request

  return response
}

const removeBlog = async(id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request

  return response
}

export default { getAll, setToken, postBlog, updateBlog, removeBlog, getOneBlog }