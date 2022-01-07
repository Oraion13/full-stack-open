import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

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

  const request = axios.post(baseUrl, blog, config);
  const response = await request;
  return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, postBlog }