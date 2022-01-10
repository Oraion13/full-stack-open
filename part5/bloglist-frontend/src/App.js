import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = useRef()

  // get all data
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // store user credentials and token
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // add new blog
  const addBlog = async (blogObject) => {
    const blog = await blogService.postBlog(blogObject)

    if (blog) {
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()

      return blog
    }

    return null
  }

  const loginUser = async (credentials) => {
    const user = await loginService.login(credentials)

    if (user) {
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      return user
    }

    return null
  }

  return (
    <div>
      <React.StrictMode>
        {errorMessage}

        {user === null ? (
          <Togglable buttonLable="Log in">
            <Login loginUser={loginUser} setErrorMessage={setErrorMessage} />
          </Togglable>
        ) : (
          <h3>{user.userName} logged in</h3>
        )}

        {user !== null ? (
          <div>
            <Logout
              userName={user.userName}
              setUser={setUser}
              setErrorMessage={setErrorMessage}
            />

            <Togglable buttonLable="Create blog" ref={blogFormRef}>
              <NewBlog setErrorMessage={setErrorMessage} addBlog={addBlog} />
            </Togglable>
          </div>
        ) : (
          ''
        )}

        <Blog blogs={blogs} userName={user !== null ? user.userName : ''} />
      </React.StrictMode>
    </div>
  )
}

export default App
