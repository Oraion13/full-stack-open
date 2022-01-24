import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const notification = useSelector((state) => state.notification)
  const blogFormRef = useRef()

  // get all data
  useEffect(() => {
    dispatch(initializeBlogs())
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
        {notification}

        {user === null ? (
          <Togglable buttonLable="Log in">
            <Login loginUser={loginUser} />
          </Togglable>
        ) : (
          <h3>{user.userName} logged in</h3>
        )}

        {user !== null ? (
          <div>
            <Logout
              userName={user.userName}
              setUser={setUser}
            />

            <Togglable buttonLable="Create blog" ref={blogFormRef}>
              <NewBlog />
            </Togglable>
          </div>
        ) : (
          ''
        )}

        <Blog userName={user !== null ? user.userName : ''} />
      </React.StrictMode>
    </div>
  )
}

export default App
