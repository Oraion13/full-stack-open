import React, { useEffect } from 'react'
import Login from './components/login/Login'
import Blog from './components/blogs/Blog'
import Users from './components/users/Users'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  // get all data
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  // store user credentials and token
  useEffect(() => {
    dispatch(setUser())
  }, [])

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
        </div>

        {notification}

        <Routes>
          <Route path="/blogs" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
